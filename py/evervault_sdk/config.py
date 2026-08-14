# Evervault SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Evervault",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.evervault.com",
            "auth": {
                "prefix": "Basic",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "acquirer": {},
                "bin_lookup": {},
                "card": {},
                "card_art": {},
                "client_side_token": {},
                "core": {},
                "custom_domain": {},
                "function_run": {},
                "merchant": {},
                "network_token": {},
                "network_token_cryptogram": {},
                "payment": {},
                "relay": {},
                "three_ds_session": {},
                "webhook": {},
                "webhook_endpoint": {},
            },
        },
        "entity": {
      "acquirer": {
        "fields": [
          {
            "name": "configurations",
            "op": {
              "update": {
                "type": "`$ARRAY`",
              },
            },
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "default",
            "op": {
              "create": {
                "type": "`$BOOLEAN`",
              },
              "update": {
                "type": "`$BOOLEAN`",
              },
            },
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "acquirer",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/payments/acquirers",
                "parts": [
                  "payments",
                  "acquirers",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "acquirer_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/payments/acquirers/{acquirer_id}",
                "parts": [
                  "payments",
                  "acquirers",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "acquirer_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "acquirer_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/payments/acquirers/{acquirer_id}",
                "parts": [
                  "payments",
                  "acquirers",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "acquirer_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "bin_lookup": {
        "fields": [
          {
            "name": "number",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "bin_lookup",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/payments/bin-lookups",
                "parts": [
                  "payments",
                  "bin-lookups",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "card": {
        "fields": [
          {
            "name": "address",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "card",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "cardholder",
            "type": "`$OBJECT`",
          },
          {
            "name": "expiry",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "extensions",
            "type": "`$ARRAY`",
          },
          {
            "name": "month",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "number",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "year",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "card",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "card_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/payments/cards/{card_id}/simulate",
                "parts": [
                  "payments",
                  "cards",
                  "{id}",
                  "simulate",
                ],
                "rename": {
                  "param": {
                    "card_id": "id",
                  },
                },
                "select": {
                  "$action": "simulate",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.expiry`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/insights/cards",
                "parts": [
                  "insights",
                  "cards",
                ],
                "select": {},
                "transform": {
                  "req": {
                    "card": "`reqdata`",
                  },
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/payments/cards",
                "parts": [
                  "payments",
                  "cards",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.expiry`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "card_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/payments/cards/{card_id}",
                "parts": [
                  "payments",
                  "cards",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "card_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.expiry`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "card_art": {
        "fields": [
          {
            "name": "data",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "height",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "type",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "width",
            "req": True,
            "type": "`$INTEGER`",
          },
        ],
        "name": "card_art",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "network_token_id",
                      "orig": "network_token_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/payments/network-tokens/{network_token_id}/card-art",
                "parts": [
                  "payments",
                  "network-tokens",
                  "{network_token_id}",
                  "card-art",
                ],
                "select": {
                  "exist": [
                    "network_token_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "network_token",
            ],
          ],
        },
      },
      "client_side_token": {
        "fields": [
          {
            "name": "action",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "expiry",
            "type": "`$INTEGER`",
          },
          {
            "name": "payload",
            "type": "`$OBJECT`",
          },
        ],
        "name": "client_side_token",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/client-side-tokens",
                "parts": [
                  "client-side-tokens",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "core": {
        "fields": [
          {
            "name": "app",
            "type": "`$STRING`",
          },
          {
            "name": "authentication",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
          },
          {
            "name": "createdAt",
            "type": "`$INTEGER`",
          },
          {
            "name": "customDomain",
            "type": "`$STRING`",
          },
          {
            "name": "destinationDomain",
            "op": {
              "list": {
                "type": "`$STRING`",
              },
            },
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "encryptEmptyStrings",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "evervaultDomain",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "phoneNumber",
            "type": "`$STRING`",
          },
          {
            "name": "relay",
            "type": "`$STRING`",
          },
          {
            "name": "routes",
            "op": {
              "list": {
                "type": "`$ARRAY`",
              },
            },
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
          {
            "name": "token",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "updatedAt",
            "type": "`$INTEGER`",
          },
          {
            "name": "validationRecord",
            "type": "`$STRING`",
          },
        ],
        "name": "core",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/decrypt",
                "parts": [
                  "decrypt",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/encrypt",
                "parts": [
                  "encrypt",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/inspect",
                "parts": [
                  "inspect",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.metadata`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/relays",
                "parts": [
                  "relays",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "relay_id",
                      "orig": "relay_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/relays/{relay_id}/custom-domains",
                "parts": [
                  "relays",
                  "{relay_id}",
                  "custom-domains",
                ],
                "select": {
                  "exist": [
                    "relay_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/relays",
                "parts": [
                  "relays",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "relay_id",
                      "orig": "relay_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/relays/{relay_id}/custom-domains/{id}",
                "parts": [
                  "relays",
                  "{relay_id}",
                  "custom-domains",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                    "relay_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/relays/{id}",
                "parts": [
                  "relays",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "relay",
            ],
          ],
        },
      },
      "custom_domain": {
        "fields": [
          {
            "name": "createdAt",
            "type": "`$INTEGER`",
          },
          {
            "name": "customDomain",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "relay",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
          {
            "name": "updatedAt",
            "type": "`$INTEGER`",
          },
          {
            "name": "validationRecord",
            "type": "`$STRING`",
          },
        ],
        "name": "custom_domain",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "relay_id",
                      "orig": "relay_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/relays/{relay_id}/custom-domains",
                "parts": [
                  "relays",
                  "{relay_id}",
                  "custom-domains",
                ],
                "select": {
                  "exist": [
                    "relay_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "relay_id",
                      "orig": "relay_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/relays/{relay_id}/custom-domains/{id}",
                "parts": [
                  "relays",
                  "{relay_id}",
                  "custom-domains",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                    "relay_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "relay",
            ],
          ],
        },
      },
      "function_run": {
        "fields": [
          {
            "name": "async",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "createdAt",
            "type": "`$INTEGER`",
          },
          {
            "name": "error",
            "type": [
              "`$ONE`",
              [
                "`$OBJECT`",
                "`$NULL`",
              ],
            ],
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "payload",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "result",
            "type": "`$OBJECT`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
        ],
        "name": "function_run",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "function_name",
                      "orig": "function_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/functions/{function_name}/runs",
                "parts": [
                  "functions",
                  "{function_name}",
                  "runs",
                ],
                "select": {
                  "exist": [
                    "function_name",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "function",
            ],
          ],
        },
      },
      "merchant": {
        "fields": [
          {
            "name": "applePay",
            "type": "`$OBJECT`",
          },
          {
            "name": "business",
            "op": {
              "create": {
                "req": True,
                "type": "`$OBJECT`",
              },
            },
            "type": "`$OBJECT`",
          },
          {
            "name": "categoryCode",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "type": "`$STRING`",
          },
          {
            "name": "createdAt",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "networkTokens",
            "type": "`$OBJECT`",
          },
          {
            "name": "shortName",
            "type": "`$STRING`",
          },
          {
            "name": "updatedAt",
            "type": "`$INTEGER`",
          },
          {
            "name": "website",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "merchant",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/payments/merchants",
                "parts": [
                  "payments",
                  "merchants",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "merchant_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/payments/merchants/{merchant_id}",
                "parts": [
                  "payments",
                  "merchants",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "merchant_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "merchant_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/payments/merchants/{merchant_id}",
                "parts": [
                  "payments",
                  "merchants",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "merchant_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "network_token": {
        "fields": [
          {
            "name": "card",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "createdAt",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "expiry",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "merchant",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "number",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "paymentAccountReference",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "tokenRequestorIdentifier",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "tokenServiceProvider",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "updateType",
            "type": "`$STRING`",
          },
          {
            "name": "updatedAt",
            "type": "`$INTEGER`",
          },
        ],
        "name": "network_token",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "network_token_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/payments/network-tokens/{network_token_id}/simulate",
                "parts": [
                  "payments",
                  "network-tokens",
                  "{id}",
                  "simulate",
                ],
                "rename": {
                  "param": {
                    "network_token_id": "id",
                  },
                },
                "select": {
                  "$action": "simulate",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/payments/network-tokens",
                "parts": [
                  "payments",
                  "network-tokens",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "network_token_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/payments/network-tokens/{network_token_id}",
                "parts": [
                  "payments",
                  "network-tokens",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "network_token_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "network_token_cryptogram": {
        "fields": [
          {
            "name": "createdAt",
            "type": "`$INTEGER`",
          },
          {
            "name": "cryptogram",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
        ],
        "name": "network_token_cryptogram",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "network_token_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/payments/network-tokens/{network_token_id}/cryptograms",
                "parts": [
                  "payments",
                  "network-tokens",
                  "{id}",
                  "cryptograms",
                ],
                "rename": {
                  "param": {
                    "network_token_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "payment": {
        "fields": [
          {
            "name": "applePay",
            "type": "`$OBJECT`",
          },
          {
            "name": "business",
            "type": "`$OBJECT`",
          },
          {
            "name": "categoryCode",
            "type": "`$STRING`",
          },
          {
            "name": "configurations",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "createdAt",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "created_at",
            "type": "`$INTEGER`",
          },
          {
            "name": "data",
            "type": "`$OBJECT`",
          },
          {
            "name": "default",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "networkTokens",
            "type": "`$OBJECT`",
          },
          {
            "name": "shortName",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
          {
            "name": "updatedAt",
            "type": "`$INTEGER`",
          },
          {
            "name": "website",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "payment",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "page_size",
                      "orig": "page_size",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/payments/merchants",
                "parts": [
                  "payments",
                  "merchants",
                ],
                "select": {
                  "$action": "merchant",
                  "exist": [
                    "page",
                    "page_size",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
              {
                "args": {
                  "query": [
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "page_size",
                      "orig": "page_size",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/payments/acquirers",
                "parts": [
                  "payments",
                  "acquirers",
                ],
                "select": {
                  "$action": "acquirer",
                  "exist": [
                    "page",
                    "page_size",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "3ds_session_id",
                      "orig": "3ds_session_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/payments/3ds-sessions/{3ds_session_id}/messages",
                "parts": [
                  "payments",
                  "3ds-sessions",
                  "{3ds_session_id}",
                  "messages",
                ],
                "select": {
                  "exist": [
                    "3ds_session_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.messages`",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "acquirer_id",
                      "orig": "acquirer_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/payments/acquirers/{acquirer_id}",
                "parts": [
                  "payments",
                  "acquirers",
                  "{acquirer_id}",
                ],
                "select": {
                  "exist": [
                    "acquirer_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "card_id",
                      "orig": "card_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/payments/cards/{card_id}",
                "parts": [
                  "payments",
                  "cards",
                  "{card_id}",
                ],
                "select": {
                  "exist": [
                    "card_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "merchant_id",
                      "orig": "merchant_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/payments/merchants/{merchant_id}",
                "parts": [
                  "payments",
                  "merchants",
                  "{merchant_id}",
                ],
                "select": {
                  "exist": [
                    "merchant_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "network_token_id",
                      "orig": "network_token_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/payments/network-tokens/{network_token_id}",
                "parts": [
                  "payments",
                  "network-tokens",
                  "{network_token_id}",
                ],
                "select": {
                  "exist": [
                    "network_token_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
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
      "relay": {
        "fields": [
          {
            "name": "app",
            "type": "`$STRING`",
          },
          {
            "name": "authentication",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
          },
          {
            "name": "createdAt",
            "type": "`$INTEGER`",
          },
          {
            "name": "destinationDomain",
            "type": "`$STRING`",
          },
          {
            "name": "encryptEmptyStrings",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "evervaultDomain",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "routes",
            "type": "`$ARRAY`",
          },
          {
            "name": "updatedAt",
            "type": "`$INTEGER`",
          },
        ],
        "name": "relay",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/relays/{id}",
                "parts": [
                  "relays",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/relays/{id}",
                "parts": [
                  "relays",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "three_ds_session": {
        "fields": [
          {
            "name": "accessControlServer",
            "type": "`$OBJECT`",
          },
          {
            "name": "acquirer",
            "op": {
              "create": {
                "type": "`$ANY`",
              },
            },
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "ares",
            "type": "`$OBJECT`",
          },
          {
            "name": "authentication",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "card",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "challenge",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "createdAt",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "cres",
            "type": [
              "`$ONE`",
              [
                "`$NULL`",
                "`$OBJECT`",
              ],
            ],
          },
          {
            "name": "cryptogram",
            "type": "`$STRING`",
          },
          {
            "name": "customer",
            "type": "`$OBJECT`",
          },
          {
            "name": "directoryServer",
            "type": "`$OBJECT`",
          },
          {
            "name": "eci",
            "type": "`$OBJECT`",
          },
          {
            "name": "failureReason",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "initiator",
            "type": "`$OBJECT`",
            "union": {
              "branches": 2,
              "count": 1,
              "depth": 0,
            },
          },
          {
            "name": "merchant",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "nextAction",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "payment",
            "type": "`$OBJECT`",
            "union": {
              "branches": 3,
              "count": 1,
              "depth": 0,
            },
          },
          {
            "name": "preferredVersions",
            "type": "`$ARRAY`",
          },
          {
            "name": "rreq",
            "type": [
              "`$ONE`",
              [
                "`$NULL`",
                "`$OBJECT`",
              ],
            ],
          },
          {
            "name": "status",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "threeDSServer",
            "type": "`$OBJECT`",
          },
          {
            "name": "updatedAt",
            "type": "`$INTEGER`",
          },
          {
            "name": "version",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "three_ds_session",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/payments/3ds-sessions",
                "parts": [
                  "payments",
                  "3ds-sessions",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "3ds_session_id",
                      "orig": "3ds_session_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/payments/3ds-sessions/{3ds_session_id}",
                "parts": [
                  "payments",
                  "3ds-sessions",
                  "{3ds_session_id}",
                ],
                "select": {
                  "exist": [
                    "3ds_session_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "3ds_session",
            ],
          ],
        },
      },
      "webhook": {
        "fields": [
          {
            "name": "createdAt",
            "type": "`$INTEGER`",
          },
          {
            "name": "events",
            "op": {
              "list": {
                "type": "`$ARRAY`",
              },
            },
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "updatedAt",
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
          },
          {
            "name": "url",
            "op": {
              "list": {
                "type": "`$STRING`",
              },
            },
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "webhook",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/webhook-endpoints",
                "parts": [
                  "webhook-endpoints",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "webhook_endpoint_wd7c640d1daee",
                      "kind": "query",
                      "name": "starting_after",
                      "orig": "starting_after",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/webhook-endpoints",
                "parts": [
                  "webhook-endpoints",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "starting_after",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "webhook_endpoint_eead1d640d7c",
                      "kind": "param",
                      "name": "webhook_endpoint_id",
                      "orig": "webhook_endpoint_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/webhook-endpoints/{webhook_endpoint_id}",
                "parts": [
                  "webhook-endpoints",
                  "{webhook_endpoint_id}",
                ],
                "select": {
                  "exist": [
                    "webhook_endpoint_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "webhook_endpoint",
            ],
          ],
        },
      },
      "webhook_endpoint": {
        "fields": [
          {
            "name": "createdAt",
            "type": "`$INTEGER`",
          },
          {
            "name": "events",
            "op": {
              "update": {
                "req": True,
                "type": "`$ARRAY`",
              },
            },
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "updatedAt",
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "webhook_endpoint",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "webhook_endpoint_eead1d640d7c",
                      "kind": "param",
                      "name": "id",
                      "orig": "webhook_endpoint_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/webhook-endpoints/{webhook_endpoint_id}",
                "parts": [
                  "webhook-endpoints",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "webhook_endpoint_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "webhook_endpoint_eead1d640d7c",
                      "kind": "param",
                      "name": "id",
                      "orig": "webhook_endpoint_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/webhook-endpoints/{webhook_endpoint_id}",
                "parts": [
                  "webhook-endpoints",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "webhook_endpoint_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
