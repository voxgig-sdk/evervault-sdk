-- Evervault SDK error

local EvervaultError = {}
EvervaultError.__index = EvervaultError


function EvervaultError.new(code, msg, ctx)
  local self = setmetatable({}, EvervaultError)
  self.is_sdk_error = true
  self.sdk = "Evervault"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function EvervaultError:error()
  return self.msg
end


function EvervaultError:__tostring()
  return self.msg
end


return EvervaultError
