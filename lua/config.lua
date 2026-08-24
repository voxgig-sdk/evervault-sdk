-- Evervault SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Evervault",
      slug = "evervault",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.evervault.com",
      auth = {
        prefix = "Basic",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["card"] = {},
        ["payment"] = {},
      },
    },
    entity = {
      ["card"] = {
        ["fields"] = {
          {
            ["name"] = "expiry",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "month",
            ["req"] = true,
            ["short"] = "The card expiry month, in MM format (e.g.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "number",
            ["req"] = true,
            ["short"] = "The card number.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "year",
            ["req"] = true,
            ["short"] = "The card expiry year, in YY format (e.g.",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "card",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/payments/cards",
                ["parts"] = {
                  "payments",
                  "cards",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.expiry`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "card_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/payments/cards/{card_id}",
                ["parts"] = {
                  "payments",
                  "cards",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["card_id"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.expiry`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["payment"] = {
        ["fields"] = {},
        ["name"] = "payment",
        ["op"] = {
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "card_id",
                      ["orig"] = "card_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/payments/cards/{card_id}",
                ["parts"] = {
                  "payments",
                  "cards",
                  "{card_id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "card_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "card",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
