-- Evervault SDK exists test

local sdk = require("evervault_sdk")

describe("EvervaultSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
