-- Core entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("evervault_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("CoreEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Core(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:Core(nil):list({ ["relay_id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = core_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "core." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live then
      for _, _live_key in ipairs({"relay01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via EVERVAULT_TEST_CORE_ENTID")
        end
      end
    end
    local client = setup.client

    -- CREATE
    local core_ref01_ent = client:Core(nil)
    local core_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.core"), "core_ref01"))
    core_ref01_data["relay_id"] = setup.idmap["relay01"]

    local core_ref01_data_result, err = core_ref01_ent:create(core_ref01_data, nil)
    assert.is_nil(err)
    core_ref01_data = helpers.to_map(type(core_ref01_data_result) == 'table' and core_ref01_data_result.data_get and core_ref01_data_result:data_get() or core_ref01_data_result)
    assert.is_not_nil(core_ref01_data)
    assert.is_not_nil(core_ref01_data["id"])

    -- LIST
    local core_ref01_match = {
      ["relay_id"] = setup.idmap["relay01"],
    }

    local core_ref01_list_result, err = core_ref01_ent:list(core_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(core_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(core_ref01_list_result),
      { id = core_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    -- REMOVE
    local core_ref01_match_rm0 = {
      id = core_ref01_data["id"],
    }
    local _, err = core_ref01_ent:remove(core_ref01_match_rm0, nil)
    assert.is_nil(err)

    -- LIST
    local core_ref01_match_rt0 = {
      ["relay_id"] = setup.idmap["relay01"],
    }

    local core_ref01_list_rt0_result, err = core_ref01_ent:list(core_ref01_match_rt0, nil)
    assert.is_nil(err)
    assert.is_table(core_ref01_list_rt0_result)

    local not_found_item = vs.select(
      runner.entity_list_to_data(core_ref01_list_rt0_result),
      { id = core_ref01_data["id"] })
    assert.is_true(vs.isempty(not_found_item))

  end)
end)

function core_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/core/CoreTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read core test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "core01", "core02", "core03", "relay01", "relay02", "relay03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("EVERVAULT_TEST_CORE_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["EVERVAULT_TEST_CORE_ENTID"] = idmap,
    ["EVERVAULT_TEST_LIVE"] = "FALSE",
    ["EVERVAULT_TEST_EXPLAIN"] = "FALSE",
    ["EVERVAULT_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["EVERVAULT_TEST_CORE_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["EVERVAULT_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["EVERVAULT_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["EVERVAULT_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["EVERVAULT_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
