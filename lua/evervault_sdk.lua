-- Evervault SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local EvervaultSDK = {}
EvervaultSDK.__index = EvervaultSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

EvervaultSDK._make_feature = _make_feature


function EvervaultSDK.new(options)
  local self = setmetatable({}, EvervaultSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function EvervaultSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function EvervaultSDK:get_utility()
  return Utility.copy(self._utility)
end


function EvervaultSDK:get_root_ctx()
  return self._rootctx
end


function EvervaultSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function EvervaultSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:Acquirer():list() / client:Acquirer():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EvervaultSDK:Acquirer(data)
  local EntityMod = require("entity.acquirer_entity")
  if data == nil then
    if self._acquirer == nil then
      self._acquirer = EntityMod.new(self, nil)
    end
    return self._acquirer
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BinLookup():list() / client:BinLookup():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EvervaultSDK:BinLookup(data)
  local EntityMod = require("entity.bin_lookup_entity")
  if data == nil then
    if self._bin_lookup == nil then
      self._bin_lookup = EntityMod.new(self, nil)
    end
    return self._bin_lookup
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Card():list() / client:Card():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EvervaultSDK:Card(data)
  local EntityMod = require("entity.card_entity")
  if data == nil then
    if self._card == nil then
      self._card = EntityMod.new(self, nil)
    end
    return self._card
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CardArt():list() / client:CardArt():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EvervaultSDK:CardArt(data)
  local EntityMod = require("entity.card_art_entity")
  if data == nil then
    if self._card_art == nil then
      self._card_art = EntityMod.new(self, nil)
    end
    return self._card_art
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ClientSideToken():list() / client:ClientSideToken():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EvervaultSDK:ClientSideToken(data)
  local EntityMod = require("entity.client_side_token_entity")
  if data == nil then
    if self._client_side_token == nil then
      self._client_side_token = EntityMod.new(self, nil)
    end
    return self._client_side_token
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Core():list() / client:Core():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EvervaultSDK:Core(data)
  local EntityMod = require("entity.core_entity")
  if data == nil then
    if self._core == nil then
      self._core = EntityMod.new(self, nil)
    end
    return self._core
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CustomDomain():list() / client:CustomDomain():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EvervaultSDK:CustomDomain(data)
  local EntityMod = require("entity.custom_domain_entity")
  if data == nil then
    if self._custom_domain == nil then
      self._custom_domain = EntityMod.new(self, nil)
    end
    return self._custom_domain
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:FunctionRun():list() / client:FunctionRun():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EvervaultSDK:FunctionRun(data)
  local EntityMod = require("entity.function_run_entity")
  if data == nil then
    if self._function_run == nil then
      self._function_run = EntityMod.new(self, nil)
    end
    return self._function_run
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Merchant():list() / client:Merchant():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EvervaultSDK:Merchant(data)
  local EntityMod = require("entity.merchant_entity")
  if data == nil then
    if self._merchant == nil then
      self._merchant = EntityMod.new(self, nil)
    end
    return self._merchant
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:NetworkToken():list() / client:NetworkToken():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EvervaultSDK:NetworkToken(data)
  local EntityMod = require("entity.network_token_entity")
  if data == nil then
    if self._network_token == nil then
      self._network_token = EntityMod.new(self, nil)
    end
    return self._network_token
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:NetworkTokenCryptogram():list() / client:NetworkTokenCryptogram():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EvervaultSDK:NetworkTokenCryptogram(data)
  local EntityMod = require("entity.network_token_cryptogram_entity")
  if data == nil then
    if self._network_token_cryptogram == nil then
      self._network_token_cryptogram = EntityMod.new(self, nil)
    end
    return self._network_token_cryptogram
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Payment():list() / client:Payment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EvervaultSDK:Payment(data)
  local EntityMod = require("entity.payment_entity")
  if data == nil then
    if self._payment == nil then
      self._payment = EntityMod.new(self, nil)
    end
    return self._payment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Relay():list() / client:Relay():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EvervaultSDK:Relay(data)
  local EntityMod = require("entity.relay_entity")
  if data == nil then
    if self._relay == nil then
      self._relay = EntityMod.new(self, nil)
    end
    return self._relay
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ThreeDsSession():list() / client:ThreeDsSession():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EvervaultSDK:ThreeDsSession(data)
  local EntityMod = require("entity.three_ds_session_entity")
  if data == nil then
    if self._three_ds_session == nil then
      self._three_ds_session = EntityMod.new(self, nil)
    end
    return self._three_ds_session
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Webhook():list() / client:Webhook():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EvervaultSDK:Webhook(data)
  local EntityMod = require("entity.webhook_entity")
  if data == nil then
    if self._webhook == nil then
      self._webhook = EntityMod.new(self, nil)
    end
    return self._webhook
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WebhookEndpoint():list() / client:WebhookEndpoint():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EvervaultSDK:WebhookEndpoint(data)
  local EntityMod = require("entity.webhook_endpoint_entity")
  if data == nil then
    if self._webhook_endpoint == nil then
      self._webhook_endpoint = EntityMod.new(self, nil)
    end
    return self._webhook_endpoint
  end
  return EntityMod.new(self, data)
end




function EvervaultSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = EvervaultSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return EvervaultSDK
