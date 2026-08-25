# Evervault SDK configuration

module EvervaultConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Evervault",
        "slug" => "evervault",
        "version" => "0.1.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://api.evervault.com",
        "auth" => {
          "prefix" => "Basic",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "acquirer" => {},
          "bin_lookup" => {},
          "card" => {},
          "card_art" => {},
          "client_side_token" => {},
          "core" => {},
          "custom_domain" => {},
          "function_run" => {},
          "merchant" => {},
          "network_token" => {},
          "network_token_cryptogram" => {},
          "payment" => {},
          "relay" => {},
          "three_ds_session" => {},
          "webhook" => {},
          "webhook_endpoint" => {},
        },
      },
      "entity" => {
        "acquirer" => {
          "fields" => [
            {
              "name" => "configurations",
              "op" => {
                "update" => {
                  "type" => "`$ARRAY`",
                },
              },
              "req" => true,
              "short" => "The acquirer configuration settings.",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "default",
              "op" => {
                "create" => {
                  "type" => "`$BOOLEAN`",
                },
                "update" => {
                  "type" => "`$BOOLEAN`",
                },
              },
              "req" => true,
              "short" => "Specifies whether this Acquirer is the default.",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "description",
              "short" => "The description of the acquirer configuration.",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "short" => "The unique identifier of the acquirer configuration.",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "op" => {
                "update" => {
                  "type" => "`$STRING`",
                },
              },
              "req" => true,
              "short" => "The name of the acquirer configuration.",
              "type" => "`$STRING`",
            },
          ],
          "name" => "acquirer",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/payments/acquirers",
                  "parts" => [
                    "payments",
                    "acquirers",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "acquirer_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/payments/acquirers/{acquirer_id}",
                  "parts" => [
                    "payments",
                    "acquirers",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "acquirer_id" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "acquirer_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PATCH",
                  "orig" => "/payments/acquirers/{acquirer_id}",
                  "parts" => [
                    "payments",
                    "acquirers",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "acquirer_id" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "bin_lookup" => {
          "fields" => [
            {
              "name" => "number",
              "req" => true,
              "short" => "The card number for which the BIN lookup is being requested.",
              "type" => "`$STRING`",
            },
          ],
          "name" => "bin_lookup",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/payments/bin-lookups",
                  "parts" => [
                    "payments",
                    "bin-lookups",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "card" => {
          "fields" => [
            {
              "name" => "address",
              "req" => true,
              "short" => "Details about the cardholder's address that the address verification (AVS) is for.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "card",
              "req" => true,
              "short" => "The card details.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "cardholder",
              "short" => "Details about the cardholder that the name verification (ANI) is for.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "expiry",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "extensions",
              "short" => "The extensions to the card insight request.",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "month",
              "req" => true,
              "short" => "The card expiry month, in MM format (e.g.",
              "type" => "`$STRING`",
            },
            {
              "name" => "number",
              "req" => true,
              "short" => "The card number.",
              "type" => "`$STRING`",
            },
            {
              "name" => "year",
              "req" => true,
              "short" => "The card expiry year, in YY format (e.g.",
              "type" => "`$STRING`",
            },
          ],
          "name" => "card",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "card_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/payments/cards/{card_id}/simulate",
                  "parts" => [
                    "payments",
                    "cards",
                    "{id}",
                    "simulate",
                  ],
                  "rename" => {
                    "param" => {
                      "card_id" => "id",
                    },
                  },
                  "select" => {
                    "$action" => "simulate",
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.expiry`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/insights/cards",
                  "parts" => [
                    "insights",
                    "cards",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => {
                      "card" => "`reqdata`",
                    },
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/payments/cards",
                  "parts" => [
                    "payments",
                    "cards",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.expiry`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "card_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/payments/cards/{card_id}",
                  "parts" => [
                    "payments",
                    "cards",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "card_id" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.expiry`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "card_art" => {
          "fields" => [
            {
              "name" => "data",
              "req" => true,
              "short" => "The base64-encoded image data of the card art.",
              "type" => "`$STRING`",
            },
            {
              "name" => "height",
              "req" => true,
              "short" => "The height of the card art image in pixels.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "type",
              "req" => true,
              "short" => "The MIME type of the card art image.",
              "type" => "`$STRING`",
            },
            {
              "name" => "width",
              "req" => true,
              "short" => "The width of the card art image in pixels.",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "card_art",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "network_token_id",
                        "orig" => "network_token_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/payments/network-tokens/{network_token_id}/card-art",
                  "parts" => [
                    "payments",
                    "network-tokens",
                    "{network_token_id}",
                    "card-art",
                  ],
                  "select" => {
                    "exist" => [
                      "network_token_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "network_token",
              ],
            ],
          },
        },
        "client_side_token" => {
          "fields" => [
            {
              "name" => "action",
              "req" => true,
              "short" => "The action that the token should permit",
              "type" => "`$STRING`",
            },
            {
              "name" => "expiry",
              "short" => "The expiry of the token in milliseconds format.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "payload",
              "short" => "The payload that the token must be used with",
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "client_side_token",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/client-side-tokens",
                  "parts" => [
                    "client-side-tokens",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "core" => {
          "fields" => [
            {
              "name" => "app",
              "short" => "The unique identifier for the app to which the Relay belongs.",
              "type" => "`$STRING`",
            },
            {
              "name" => "authentication",
              "short" => "The type of authentication required for the Relay",
              "type" => [
                "`$ONE`",
                [
                  "`$STRING`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "createdAt",
              "short" => "The exact time, in epoch milliseconds, when this custom domain was created.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "customDomain",
              "short" => "The customer managed domain to which requests to be relayed to your domain should be sent.",
              "type" => "`$STRING`",
            },
            {
              "name" => "destinationDomain",
              "op" => {
                "list" => {
                  "type" => "`$STRING`",
                },
              },
              "req" => true,
              "short" => "The domain in front of which you would like to configure a Relay",
              "type" => "`$STRING`",
            },
            {
              "name" => "encryptEmptyStrings",
              "short" => "Whether or not empty strings should be encrypted.",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "evervaultDomain",
              "short" => "The Evervault managed domain to which requests to be relayed to the destination domain should be sent.",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "The unique identifier for the custom domain.",
              "type" => "`$STRING`",
            },
            {
              "name" => "phoneNumber",
              "type" => "`$STRING`",
            },
            {
              "name" => "relay",
              "short" => "The ID of the Relay with which this custom domain is associated.",
              "type" => "`$STRING`",
            },
            {
              "name" => "routes",
              "op" => {
                "list" => {
                  "type" => "`$ARRAY`",
                },
              },
              "req" => true,
              "short" => "A collection of route configurations for the Relay.",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "status",
              "short" => "The status of the domains DNS verification.",
              "type" => "`$STRING`",
            },
            {
              "name" => "token",
              "req" => true,
              "short" => "The encrypted data to be inspected.",
              "type" => "`$STRING`",
            },
            {
              "name" => "updatedAt",
              "short" => "The exact time, in epoch milliseconds, when this custom domain was last updated.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "validationRecord",
              "short" => "Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain",
              "type" => "`$STRING`",
            },
          ],
          "name" => "core",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/decrypt",
                  "parts" => [
                    "decrypt",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/encrypt",
                  "parts" => [
                    "encrypt",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/inspect",
                  "parts" => [
                    "inspect",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.metadata`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/relays",
                  "parts" => [
                    "relays",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "relay_id",
                        "orig" => "relay_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/relays/{relay_id}/custom-domains",
                  "parts" => [
                    "relays",
                    "{relay_id}",
                    "custom-domains",
                  ],
                  "select" => {
                    "exist" => [
                      "relay_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/relays",
                  "parts" => [
                    "relays",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "relay_id",
                        "orig" => "relay_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/relays/{relay_id}/custom-domains/{id}",
                  "parts" => [
                    "relays",
                    "{relay_id}",
                    "custom-domains",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                      "relay_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/relays/{id}",
                  "parts" => [
                    "relays",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "relay",
              ],
            ],
          },
        },
        "custom_domain" => {
          "fields" => [
            {
              "name" => "createdAt",
              "short" => "The exact time, in epoch milliseconds, when this custom domain was created.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "customDomain",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "short" => "The customer managed domain to which requests to be relayed to your domain should be sent.",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "The unique identifier for the custom domain.",
              "type" => "`$STRING`",
            },
            {
              "name" => "relay",
              "short" => "The ID of the Relay with which this custom domain is associated.",
              "type" => "`$STRING`",
            },
            {
              "name" => "status",
              "short" => "The status of the domains DNS verification.",
              "type" => "`$STRING`",
            },
            {
              "name" => "updatedAt",
              "short" => "The exact time, in epoch milliseconds, when this custom domain was last updated.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "validationRecord",
              "short" => "Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain",
              "type" => "`$STRING`",
            },
          ],
          "name" => "custom_domain",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "relay_id",
                        "orig" => "relay_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/relays/{relay_id}/custom-domains",
                  "parts" => [
                    "relays",
                    "{relay_id}",
                    "custom-domains",
                  ],
                  "select" => {
                    "exist" => [
                      "relay_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "relay_id",
                        "orig" => "relay_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/relays/{relay_id}/custom-domains/{id}",
                  "parts" => [
                    "relays",
                    "{relay_id}",
                    "custom-domains",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                      "relay_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "relay",
              ],
            ],
          },
        },
        "function_run" => {
          "fields" => [
            {
              "name" => "async",
              "short" => "If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code.",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "createdAt",
              "short" => "The exact time, in epoch milliseconds, when this Function execution was triggered.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "error",
              "short" => "This field details any error that occurred during Function execution.",
              "type" => [
                "`$ONE`",
                [
                  "`$OBJECT`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "id",
              "short" => "A unique identifier representing this specific Function execution instance.",
              "type" => "`$STRING`",
            },
            {
              "name" => "payload",
              "req" => true,
              "short" => "The data payload that the Function will use during its execution.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "result",
              "short" => "This field represents the output returned by the Function.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "status",
              "short" => "The outcome of the Function execution.",
              "type" => "`$STRING`",
            },
          ],
          "name" => "function_run",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "function_name",
                        "orig" => "function_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/functions/{function_name}/runs",
                  "parts" => [
                    "functions",
                    "{function_name}",
                    "runs",
                  ],
                  "select" => {
                    "exist" => [
                      "function_name",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "function",
              ],
            ],
          },
        },
        "merchant" => {
          "fields" => [
            {
              "name" => "applePay",
              "short" => "The Merchant's Apple Pay configuration.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "business",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$OBJECT`",
                },
              },
              "short" => "The business details of the Merchant.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "categoryCode",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "short" => "The 4-digit Merchant Category Code (MCC).",
              "type" => "`$STRING`",
            },
            {
              "name" => "createdAt",
              "req" => true,
              "short" => "The exact time, in epoch milliseconds, when this Merchant was created.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "req" => true,
              "short" => "A unique identifier assigned to each Merchant.",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "req" => true,
              "short" => "The official name of the Merchant as recognized in transactions and communications.",
              "type" => "`$STRING`",
            },
            {
              "name" => "networkTokens",
              "short" => "The Merchant's Network Token configuration.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "shortName",
              "short" => "A shorter version of the Merchant's name.",
              "type" => "`$STRING`",
            },
            {
              "name" => "updatedAt",
              "short" => "The exact time, in epoch milliseconds, when this Merchant was last updated.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "website",
              "req" => true,
              "short" => "The official website URL of the Merchant.",
              "type" => "`$STRING`",
            },
          ],
          "name" => "merchant",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/payments/merchants",
                  "parts" => [
                    "payments",
                    "merchants",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "merchant_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/payments/merchants/{merchant_id}",
                  "parts" => [
                    "payments",
                    "merchants",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "merchant_id" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "merchant_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PATCH",
                  "orig" => "/payments/merchants/{merchant_id}",
                  "parts" => [
                    "payments",
                    "merchants",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "merchant_id" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "network_token" => {
          "fields" => [
            {
              "name" => "card",
              "req" => true,
              "short" => "The details of the underlying encrypted card.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "createdAt",
              "req" => true,
              "short" => "The exact time, in epoch milliseconds, when this Network Token was created.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "expiry",
              "req" => true,
              "short" => "The expiry details of the Network Token.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "id",
              "req" => true,
              "short" => "A unique identifier representing a specific Network Token.",
              "type" => "`$STRING`",
            },
            {
              "name" => "merchant",
              "req" => true,
              "short" => "The unique identifier of the Merchant associated with this Network Token.",
              "type" => "`$STRING`",
            },
            {
              "name" => "number",
              "req" => true,
              "short" => "The unique number of the Network Token.",
              "type" => "`$STRING`",
            },
            {
              "name" => "paymentAccountReference",
              "short" => "The unique identifier of the Payment Account associated with this Network Token.",
              "type" => "`$STRING`",
            },
            {
              "name" => "status",
              "req" => true,
              "short" => "The status of the Network Token.",
              "type" => "`$STRING`",
            },
            {
              "name" => "tokenRequestorIdentifier",
              "req" => true,
              "short" => "The identifier of the Token Requestor (TRID) that requested the Network Token.",
              "type" => "`$STRING`",
            },
            {
              "name" => "tokenServiceProvider",
              "req" => true,
              "short" => "The Token Service Provider (TSP) that issued the Network Token.",
              "type" => "`$STRING`",
            },
            {
              "name" => "updateType",
              "short" => "The type of update to simulate.",
              "type" => "`$STRING`",
            },
            {
              "name" => "updatedAt",
              "short" => "The exact time, in epoch milliseconds, when this Network Token was last updated.",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "network_token",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "network_token_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/payments/network-tokens/{network_token_id}/simulate",
                  "parts" => [
                    "payments",
                    "network-tokens",
                    "{id}",
                    "simulate",
                  ],
                  "rename" => {
                    "param" => {
                      "network_token_id" => "id",
                    },
                  },
                  "select" => {
                    "$action" => "simulate",
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/payments/network-tokens",
                  "parts" => [
                    "payments",
                    "network-tokens",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "network_token_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/payments/network-tokens/{network_token_id}",
                  "parts" => [
                    "payments",
                    "network-tokens",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "network_token_id" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "network_token_cryptogram" => {
          "fields" => [
            {
              "name" => "createdAt",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "cryptogram",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
          ],
          "name" => "network_token_cryptogram",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "network_token_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/payments/network-tokens/{network_token_id}/cryptograms",
                  "parts" => [
                    "payments",
                    "network-tokens",
                    "{id}",
                    "cryptograms",
                  ],
                  "rename" => {
                    "param" => {
                      "network_token_id" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "payment" => {
          "fields" => [
            {
              "name" => "applePay",
              "short" => "The Merchant's Apple Pay configuration.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "business",
              "short" => "The business details of the Merchant.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "categoryCode",
              "short" => "The 4-digit Merchant Category Code (MCC).",
              "type" => "`$STRING`",
            },
            {
              "name" => "configurations",
              "req" => true,
              "short" => "The acquirer configuration settings.",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "createdAt",
              "req" => true,
              "short" => "The exact time, in epoch milliseconds, when this Merchant was created.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "created_at",
              "short" => "Timestamp when the message was created",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "data",
              "short" => "The message data payload",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "default",
              "req" => true,
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "description",
              "short" => "The description of the acquirer configuration.",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "short" => "A unique identifier assigned to each Merchant.",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "req" => true,
              "short" => "The official name of the Merchant as recognized in transactions and communications.",
              "type" => "`$STRING`",
            },
            {
              "name" => "networkTokens",
              "short" => "The Merchant's Network Token configuration.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "shortName",
              "short" => "A shorter version of the Merchant's name.",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "short" => "The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes)",
              "type" => "`$STRING`",
            },
            {
              "name" => "updatedAt",
              "short" => "The exact time, in epoch milliseconds, when this Merchant was last updated.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "website",
              "req" => true,
              "short" => "The official website URL of the Merchant.",
              "type" => "`$STRING`",
            },
          ],
          "name" => "payment",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "page_size",
                        "orig" => "page_size",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "q",
                        "orig" => "q",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/payments/merchants",
                  "parts" => [
                    "payments",
                    "merchants",
                  ],
                  "select" => {
                    "$action" => "merchant",
                    "exist" => [
                      "page",
                      "page_size",
                      "q",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "page_size",
                        "orig" => "page_size",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/payments/acquirers",
                  "parts" => [
                    "payments",
                    "acquirers",
                  ],
                  "select" => {
                    "$action" => "acquirer",
                    "exist" => [
                      "page",
                      "page_size",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "3ds_session_id",
                        "orig" => "3ds_session_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/payments/3ds-sessions/{3ds_session_id}/messages",
                  "parts" => [
                    "payments",
                    "3ds-sessions",
                    "{3ds_session_id}",
                    "messages",
                  ],
                  "select" => {
                    "exist" => [
                      "3ds_session_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.messages`",
                  },
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "acquirer_id",
                        "orig" => "acquirer_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/payments/acquirers/{acquirer_id}",
                  "parts" => [
                    "payments",
                    "acquirers",
                    "{acquirer_id}",
                  ],
                  "select" => {
                    "exist" => [
                      "acquirer_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "card_id",
                        "orig" => "card_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/payments/cards/{card_id}",
                  "parts" => [
                    "payments",
                    "cards",
                    "{card_id}",
                  ],
                  "select" => {
                    "exist" => [
                      "card_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "merchant_id",
                        "orig" => "merchant_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/payments/merchants/{merchant_id}",
                  "parts" => [
                    "payments",
                    "merchants",
                    "{merchant_id}",
                  ],
                  "select" => {
                    "exist" => [
                      "merchant_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "network_token_id",
                        "orig" => "network_token_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/payments/network-tokens/{network_token_id}",
                  "parts" => [
                    "payments",
                    "network-tokens",
                    "{network_token_id}",
                  ],
                  "select" => {
                    "exist" => [
                      "network_token_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "3ds_session",
              ],
              [
                "acquirer",
              ],
              [
                "card",
              ],
              [
                "merchant",
              ],
              [
                "network_token",
              ],
            ],
          },
        },
        "relay" => {
          "fields" => [
            {
              "name" => "app",
              "short" => "The unique identifier for the app to which the Relay belongs.",
              "type" => "`$STRING`",
            },
            {
              "name" => "authentication",
              "short" => "The type of authentication required for the Relay",
              "type" => [
                "`$ONE`",
                [
                  "`$STRING`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "createdAt",
              "short" => "The exact time, in epoch milliseconds, when this Relay was created.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "destinationDomain",
              "short" => "The domain in front of which the Relay should be configured.",
              "type" => "`$STRING`",
            },
            {
              "name" => "encryptEmptyStrings",
              "short" => "Whether or not empty strings should be encrypted.",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "evervaultDomain",
              "short" => "The Evervault managed domain to which requests to be relayed to the destination domain should be sent.",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "The unique identifier for the Relay.",
              "type" => "`$STRING`",
            },
            {
              "name" => "routes",
              "short" => "A collection of route configurations for the Relay.",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "updatedAt",
              "short" => "The exact time, in epoch milliseconds, when this Relay was updated.",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "relay",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/relays/{id}",
                  "parts" => [
                    "relays",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PATCH",
                  "orig" => "/relays/{id}",
                  "parts" => [
                    "relays",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "three_ds_session" => {
          "fields" => [
            {
              "name" => "accessControlServer",
              "short" => "Details about the Access Control Server involved in the 3DS transaction.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "acquirer",
              "op" => {
                "create" => {
                  "type" => "`$ANY`",
                },
              },
              "req" => true,
              "short" => "The acquirer of the payment.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "ares",
              "short" => "The details of the 3DS Authentication Response (ARes).",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "authentication",
              "req" => true,
              "short" => "The details of the 3DS Authentication.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "card",
              "req" => true,
              "short" => "The card details.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "challenge",
              "req" => true,
              "short" => "Details about the 3DS challenge.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "createdAt",
              "req" => true,
              "short" => "The exact time, in epoch milliseconds, when this 3DS-Session was created.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "cres",
              "short" => "The details of the 3DS Challenge Response (CRes).",
              "type" => [
                "`$ONE`",
                [
                  "`$NULL`",
                  "`$OBJECT`",
                ],
              ],
            },
            {
              "name" => "cryptogram",
              "short" => "The 3DS cryptogram (also called Authentication Value).",
              "type" => "`$STRING`",
            },
            {
              "name" => "customer",
              "short" => "The details of the customer who initiated the transaction.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "directoryServer",
              "short" => "Details about the Directory Server involved in the 3DS transaction.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "eci",
              "short" => "The details of the Electronic Commerce Indicator.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "failureReason",
              "short" => "The reason for the 3DS Authentication failure.",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "short" => "A unique identifier assigned to each 3DS Authentication.",
              "type" => "`$STRING`",
            },
            {
              "name" => "initiator",
              "short" => "Details about the transaction initiation process.",
              "type" => "`$OBJECT`",
              "union" => {
                "branches" => 2,
                "count" => 1,
                "depth" => 0,
              },
            },
            {
              "name" => "merchant",
              "req" => true,
              "short" => "The merchant details.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "nextAction",
              "req" => true,
              "short" => "The next action required to complete the 3DS Authentication.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "payment",
              "short" => "The payment details of the 3D Secure Authentication.",
              "type" => "`$OBJECT`",
              "union" => {
                "branches" => 3,
                "count" => 1,
                "depth" => 0,
              },
            },
            {
              "name" => "preferredVersions",
              "short" => "A prioritized list of preferred 3D Secure versions.",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "rreq",
              "short" => "The result of the 3DS authentication when a challenge has occurred.",
              "type" => [
                "`$ONE`",
                [
                  "`$NULL`",
                  "`$OBJECT`",
                ],
              ],
            },
            {
              "name" => "status",
              "req" => true,
              "short" => "The status of the 3DS Authentication.",
              "type" => "`$STRING`",
            },
            {
              "name" => "threeDSServer",
              "short" => "Details about the 3DS Server involved in the 3DS transaction.",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "updatedAt",
              "short" => "The exact time, in epoch milliseconds, when this 3DS-Session was last updated.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "version",
              "req" => true,
              "short" => "The 3D Secure version used to authenticate the session.",
              "type" => "`$STRING`",
            },
          ],
          "name" => "three_ds_session",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/payments/3ds-sessions",
                  "parts" => [
                    "payments",
                    "3ds-sessions",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "3ds_session_id",
                        "orig" => "3ds_session_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/payments/3ds-sessions/{3ds_session_id}",
                  "parts" => [
                    "payments",
                    "3ds-sessions",
                    "{3ds_session_id}",
                  ],
                  "select" => {
                    "exist" => [
                      "3ds_session_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "3ds_session",
              ],
            ],
          },
        },
        "webhook" => {
          "fields" => [
            {
              "name" => "createdAt",
              "short" => "The exact time, in epoch milliseconds, when this Webhook Endpoint was created.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "events",
              "op" => {
                "list" => {
                  "type" => "`$ARRAY`",
                },
              },
              "req" => true,
              "short" => "A list of Events that the Webhook Endpoint should subscribe to.",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "id",
              "short" => "A unique identifier representing a specific Webhook Endpoint.",
              "type" => "`$STRING`",
            },
            {
              "name" => "updatedAt",
              "short" => "The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated.",
              "type" => [
                "`$ONE`",
                [
                  "`$INTEGER`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "url",
              "op" => {
                "list" => {
                  "type" => "`$STRING`",
                },
              },
              "req" => true,
              "short" => "The URL of the Webhook Endpoint.",
              "type" => "`$STRING`",
            },
          ],
          "name" => "webhook",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/webhook-endpoints",
                  "parts" => [
                    "webhook-endpoints",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => "webhook_endpoint_wd7c640d1daee",
                        "kind" => "query",
                        "name" => "starting_after",
                        "orig" => "starting_after",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/webhook-endpoints",
                  "parts" => [
                    "webhook-endpoints",
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                      "starting_after",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "webhook_endpoint_eead1d640d7c",
                        "kind" => "param",
                        "name" => "webhook_endpoint_id",
                        "orig" => "webhook_endpoint_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/webhook-endpoints/{webhook_endpoint_id}",
                  "parts" => [
                    "webhook-endpoints",
                    "{webhook_endpoint_id}",
                  ],
                  "select" => {
                    "exist" => [
                      "webhook_endpoint_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "webhook_endpoint",
              ],
            ],
          },
        },
        "webhook_endpoint" => {
          "fields" => [
            {
              "name" => "createdAt",
              "short" => "The exact time, in epoch milliseconds, when this Webhook Endpoint was created.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "events",
              "op" => {
                "update" => {
                  "req" => true,
                  "type" => "`$ARRAY`",
                },
              },
              "short" => "A list of Events that the Webhook Endpoint is subscribed to.",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "id",
              "short" => "A unique identifier representing a specific Webhook Endpoint.",
              "type" => "`$STRING`",
            },
            {
              "name" => "updatedAt",
              "short" => "The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated.",
              "type" => [
                "`$ONE`",
                [
                  "`$INTEGER`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "url",
              "short" => "The URL of the Webhook Endpoint.",
              "type" => "`$STRING`",
            },
          ],
          "name" => "webhook_endpoint",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "webhook_endpoint_eead1d640d7c",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "webhook_endpoint_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/webhook-endpoints/{webhook_endpoint_id}",
                  "parts" => [
                    "webhook-endpoints",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "webhook_endpoint_id" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "webhook_endpoint_eead1d640d7c",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "webhook_endpoint_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PATCH",
                  "orig" => "/webhook-endpoints/{webhook_endpoint_id}",
                  "parts" => [
                    "webhook-endpoints",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "webhook_endpoint_id" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    EvervaultFeatures.make_feature(name)
  end
end
