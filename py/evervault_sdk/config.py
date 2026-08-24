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
            "slug": "evervault",
            "version": "0.0.1",
            "target": "py",
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
                "card": {},
                "payment": {},
            },
        },
        "entity": {
      "card": {
        "fields": [
          {
            "name": "expiry",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "month",
            "req": True,
            "short": "The card expiry month, in MM format (e.g.",
            "type": "`$STRING`",
          },
          {
            "name": "number",
            "req": True,
            "short": "The card number.",
            "type": "`$STRING`",
          },
          {
            "name": "year",
            "req": True,
            "short": "The card expiry year, in YY format (e.g.",
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
      "payment": {
        "fields": [],
        "name": "payment",
        "op": {
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
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
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "card",
            ],
          ],
        },
      },
    },
    }
