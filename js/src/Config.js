
const { BaseFeature } = require('./feature/base/BaseFeature')
const { TestFeature } = require('./feature/test/TestFeature')



const FEATURE_CLASS = {
   test: TestFeature,

}


class Config {

  makeFeature(fn) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(fn) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Evervault',
        slug: "evervault",
    version: "0.0.1",
    target: "js",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.evervault.com",

    auth: {
      prefix: 'Basic',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      card: {
      },

      payment: {
      },

    }
  }


  entity = {
    "card": {
      "fields": [
        {
          "name": "expiry",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "month",
          "req": true,
          "short": "The card expiry month, in MM format (e.g.",
          "type": "`$STRING`"
        },
        {
          "name": "number",
          "req": true,
          "short": "The card number.",
          "type": "`$STRING`"
        },
        {
          "name": "year",
          "req": true,
          "short": "The card expiry year, in YY format (e.g.",
          "type": "`$STRING`"
        }
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
                "cards"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.expiry`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/payments/cards/{card_id}",
              "parts": [
                "payments",
                "cards",
                "{id}"
              ],
              "rename": {
                "param": {
                  "card_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.expiry`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/payments/cards/{card_id}",
              "parts": [
                "payments",
                "cards",
                "{card_id}"
              ],
              "select": {
                "exist": [
                  "card_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "card"
          ]
        ]
      }
    }
  }
}


const config = new Config()

module.exports = {
  config
}

