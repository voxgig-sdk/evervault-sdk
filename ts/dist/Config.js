"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const DebugFeature_1 = require("./feature/debug/DebugFeature");
const IdempotencyFeature_1 = require("./feature/idempotency/IdempotencyFeature");
const MetricsFeature_1 = require("./feature/metrics/MetricsFeature");
const PagingFeature_1 = require("./feature/paging/PagingFeature");
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    debug: DebugFeature_1.DebugFeature,
    idempotency: IdempotencyFeature_1.IdempotencyFeature,
    metrics: MetricsFeature_1.MetricsFeature,
    paging: PagingFeature_1.PagingFeature,
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Evervault',
        slug: "evervault",
        version: "0.1.1",
        target: "ts",
    };
    feature = {
        debug: {
            "options": {
                "active": false,
                "max": 100,
                "redact": [
                    "authorization",
                    "cookie",
                    "set-cookie",
                    "api-key",
                    "apikey",
                    "x-api-key",
                    "idempotency-key"
                ]
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "onEntry": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        idempotency: {
            "options": {
                "active": false,
                "header": "Idempotency-Key",
                "methods": [
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE"
                ],
                "ops": [
                    "create",
                    "update",
                    "remove"
                ]
            },
            "optspec": {
                "keygen": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        metrics: {
            "options": {
                "active": false
            },
            "optspec": {
                "now": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        paging: {
            "options": {
                "active": false,
                "afterVar": "after",
                "cursorParam": "cursor",
                "firstVar": "first",
                "limitParam": "limit",
                "pageParam": "page",
                "startPage": 1
            },
            "optspec": {
                "limit": "`$NUMBER`",
                "ops": "`$LIST`"
            },
            "strict": false,
            "transport": "none"
        },
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "now": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.evervault.com",
        auth: {
            prefix: 'Basic',
            basic: true,
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            acquirer: {},
            bin_lookup: {},
            card: {},
            card_art: {},
            client_side_token: {},
            core: {},
            custom_domain: {},
            function_run: {},
            merchant: {},
            network_token: {},
            network_token_cryptogram: {},
            payment: {},
            relay: {},
            three_ds_session: {},
            webhook: {},
            webhook_endpoint: {},
        }
    };
    entity = {
        "acquirer": {
            "fields": [
                {
                    "name": "configurations",
                    "title": "Configurations",
                    "type": "`$ARRAY`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$ARRAY`"
                        }
                    },
                    "short": "The acquirer configuration settings."
                },
                {
                    "name": "default",
                    "title": "Default",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$BOOLEAN`"
                        }
                    },
                    "short": "Specifies whether this Acquirer is the default."
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "The description of the acquirer configuration."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The unique identifier of the acquirer configuration."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The name of the acquirer configuration."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "acquirer",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/payments/acquirers",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "acquirers"
                                }
                            ],
                            "parts": [
                                "payments",
                                "acquirers"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {
                                "$action": "acquirer"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/payments/acquirers",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "acquirers"
                                }
                            ],
                            "parts": [
                                "payments",
                                "acquirers"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "page_size",
                                        "orig": "pageSize",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    }
                                ]
                            },
                            "select": {
                                "$action": "acquirer"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/payments/acquirers/{acquirer_id}",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "acquirers"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "payments",
                                "acquirers",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "acquirer_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "acquirer_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/payments/acquirers/{acquirer_id}",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "acquirers"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "payments",
                                "acquirers",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "acquirer_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "acquirer_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "bin_lookup": {
            "fields": [
                {
                    "name": "number",
                    "title": "Number",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The card number for which the BIN lookup is being requested."
                }
            ],
            "name": "bin_lookup",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/payments/bin-lookups",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "bin-lookups"
                                }
                            ],
                            "parts": [
                                "payments",
                                "bin-lookups"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "card": {
            "fields": [
                {
                    "name": "address",
                    "title": "Address",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "Details about the cardholder's address that the address verification (AVS) is for."
                },
                {
                    "name": "automaticUpdates",
                    "title": "Automatic Updates",
                    "type": "`$STRING`",
                    "short": "The status of Card Account Updater on this card."
                },
                {
                    "name": "bin",
                    "title": "Bin",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The first 6 or 8 digits of the card number."
                },
                {
                    "name": "brand",
                    "title": "Brand",
                    "type": "`$STRING`",
                    "short": "The card brand associated with the payment card."
                },
                {
                    "name": "card",
                    "title": "Card",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The card details."
                },
                {
                    "name": "cardholder",
                    "title": "Cardholder",
                    "type": "`$OBJECT`",
                    "short": "Details about the cardholder that the name verification (ANI) is for."
                },
                {
                    "name": "country",
                    "title": "Country",
                    "type": "`$STRING`",
                    "short": "The country where the card was issued.",
                    "format": "iso-3166-1-alpha-2"
                },
                {
                    "name": "createdAt",
                    "title": "Created At",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "The Unix timestamp of when the card was created."
                },
                {
                    "name": "currency",
                    "title": "Currency",
                    "type": "`$STRING`",
                    "short": "The currency of the card.",
                    "format": "iso-4217-alphabetic"
                },
                {
                    "name": "expiry",
                    "title": "Expiry",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The expiry date of the card."
                },
                {
                    "name": "extensions",
                    "title": "Extensions",
                    "type": "`$ARRAY`",
                    "short": "The extensions to the card insight request."
                },
                {
                    "name": "funding",
                    "title": "Funding",
                    "type": "`$STRING`",
                    "short": "The card funding type specifies the method by which transactions are financed."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "The unique identifier for the card."
                },
                {
                    "name": "issuer",
                    "title": "Issuer",
                    "type": "`$STRING`",
                    "short": "The name of the card issuer."
                },
                {
                    "name": "lastFour",
                    "title": "Last Four",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The last 4 digits of the card number."
                },
                {
                    "name": "number",
                    "title": "Number",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The Evervault encrypted card number."
                },
                {
                    "name": "replacement",
                    "title": "Replacement",
                    "type": [
                        "`$ONE`",
                        [
                            "`$STRING`",
                            "`$NULL`"
                        ]
                    ],
                    "short": "The ID of the replacement card."
                },
                {
                    "name": "segment",
                    "title": "Segment",
                    "type": "`$STRING`",
                    "short": "The card segment indicates the primary market or usage category of the card."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "The current status of the card."
                },
                {
                    "name": "updatedAt",
                    "title": "Updated At",
                    "type": [
                        "`$ONE`",
                        [
                            "`$INTEGER`",
                            "`$NULL`"
                        ]
                    ],
                    "short": "The Unix timestamp of when the card was last updated."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "card",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/payments/cards/{card_id}/simulate",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "cards"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "simulate"
                                }
                            ],
                            "parts": [
                                "payments",
                                "cards",
                                "{id}",
                                "simulate"
                            ],
                            "rename": {
                                "param": {
                                    "card_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "card_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "simulate",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/insights/cards",
                            "segments": [
                                {
                                    "lit": "insights"
                                },
                                {
                                    "lit": "cards"
                                }
                            ],
                            "parts": [
                                "insights",
                                "cards"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/payments/cards",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "cards"
                                }
                            ],
                            "parts": [
                                "payments",
                                "cards"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/payments/cards/{card_id}",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "cards"
                                },
                                {
                                    "var": "id"
                                }
                            ],
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
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "card_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "card_art": {
            "fields": [
                {
                    "name": "data",
                    "title": "Data",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The base64-encoded image data of the card art."
                },
                {
                    "name": "height",
                    "title": "Height",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "The height of the card art image in pixels."
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The MIME type of the card art image."
                },
                {
                    "name": "width",
                    "title": "Width",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "The width of the card art image in pixels."
                }
            ],
            "name": "card_art",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/payments/network-tokens/{network_token_id}/card-art",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "network-tokens"
                                },
                                {
                                    "var": "network_token_id"
                                },
                                {
                                    "lit": "card-art"
                                }
                            ],
                            "parts": [
                                "payments",
                                "network-tokens",
                                "{network_token_id}",
                                "card-art"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "network_token_id",
                                        "orig": "network_token_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "network_token_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.network_token"
                    ]
                ]
            }
        },
        "client_side_token": {
            "fields": [
                {
                    "name": "action",
                    "title": "Action",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The action that the token should permit"
                },
                {
                    "name": "expiry",
                    "title": "Expiry",
                    "type": "`$INTEGER`",
                    "short": "The expiry of the token in milliseconds format."
                },
                {
                    "name": "payload",
                    "title": "Payload",
                    "type": "`$OBJECT`",
                    "short": "The payload that the token must be used with"
                }
            ],
            "name": "client_side_token",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/client-side-tokens",
                            "segments": [
                                {
                                    "lit": "client-side-tokens"
                                }
                            ],
                            "parts": [
                                "client-side-tokens"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "core": {
            "fields": [
                {
                    "name": "category",
                    "title": "Category",
                    "type": "`$STRING`",
                    "short": "The category or specific nature of the encrypted value."
                },
                {
                    "name": "core_list",
                    "title": "Core List",
                    "type": [
                        "`$ONE`",
                        [
                            "`$OBJECT`",
                            "`$ARRAY`",
                            "`$STRING`",
                            "`$NUMBER`",
                            "`$BOOLEAN`"
                        ]
                    ],
                    "short": "A JSON value or file to be encrypted."
                },
                {
                    "name": "cores",
                    "title": "Cores",
                    "type": [
                        "`$ONE`",
                        [
                            "`$OBJECT`",
                            "`$ARRAY`",
                            "`$STRING`"
                        ]
                    ],
                    "short": "A JSON value or file to be decrypted."
                },
                {
                    "name": "createdAt",
                    "title": "Created At",
                    "type": "`$INTEGER`",
                    "short": "The exact time, in epoch milliseconds, when this custom domain was created.",
                    "format": "int64"
                },
                {
                    "name": "customDomain",
                    "title": "Custom Domain",
                    "type": "`$STRING`",
                    "short": "The customer managed domain to which requests to be relayed to your domain should be sent."
                },
                {
                    "name": "encryptedAt",
                    "title": "Encrypted At",
                    "type": "`$INTEGER`",
                    "short": "The date and time when the value was encrypted."
                },
                {
                    "name": "fingerprint",
                    "title": "Fingerprint",
                    "type": "`$STRING`",
                    "short": "A unique identifier for the encrypted value."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "The unique identifier for the custom domain."
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$ANY`",
                    "short": "Further metadata about the encrypted value."
                },
                {
                    "name": "phoneNumber",
                    "title": "Phone Number",
                    "type": "`$STRING`"
                },
                {
                    "name": "relay",
                    "title": "Relay",
                    "type": "`$STRING`",
                    "short": "The ID of the Relay with which this custom domain is associated."
                },
                {
                    "name": "role",
                    "title": "Role",
                    "type": "`$STRING`",
                    "short": "The data role of the encrypted value."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "The status of the domains DNS verification."
                },
                {
                    "name": "token",
                    "title": "Token",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The encrypted data to be inspected."
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`",
                    "short": "The type of the encrypted value."
                },
                {
                    "name": "updatedAt",
                    "title": "Updated At",
                    "type": "`$INTEGER`",
                    "short": "The exact time, in epoch milliseconds, when this custom domain was last updated.",
                    "format": "int64"
                },
                {
                    "name": "validationRecord",
                    "title": "Validation Record",
                    "type": "`$STRING`",
                    "short": "Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain",
                    "format": "uuidv4"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "core",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/decrypt",
                            "segments": [
                                {
                                    "lit": "decrypt"
                                }
                            ],
                            "parts": [
                                "decrypt"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata.cores`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "body": {
                                "alternatives": [
                                    {
                                        "binary": true,
                                        "kind": "raw",
                                        "media": "application/octet-stream"
                                    }
                                ],
                                "kind": "json",
                                "media": "application/json"
                            },
                            "response": {
                                "alternatives": [
                                    {
                                        "binary": true,
                                        "kind": "raw",
                                        "media": "application/octet-stream"
                                    }
                                ],
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/encrypt",
                            "segments": [
                                {
                                    "lit": "encrypt"
                                }
                            ],
                            "parts": [
                                "encrypt"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata.core_list`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "body": {
                                "alternatives": [
                                    {
                                        "binary": true,
                                        "kind": "raw",
                                        "media": "application/octet-stream"
                                    }
                                ],
                                "kind": "json",
                                "media": "application/json"
                            },
                            "response": {
                                "alternatives": [
                                    {
                                        "binary": true,
                                        "kind": "raw",
                                        "media": "application/octet-stream"
                                    }
                                ],
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/inspect",
                            "segments": [
                                {
                                    "lit": "inspect"
                                }
                            ],
                            "parts": [
                                "inspect"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/relays/{relay_id}/custom-domains",
                            "segments": [
                                {
                                    "lit": "relays"
                                },
                                {
                                    "var": "relay_id"
                                },
                                {
                                    "lit": "custom-domains"
                                }
                            ],
                            "parts": [
                                "relays",
                                "{relay_id}",
                                "custom-domains"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "relay_id",
                                        "orig": "relay_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "relay_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/relays/{relay_id}/custom-domains/{id}",
                            "segments": [
                                {
                                    "lit": "relays"
                                },
                                {
                                    "var": "relay_id"
                                },
                                {
                                    "lit": "custom-domains"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "relays",
                                "{relay_id}",
                                "custom-domains",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "relay_id",
                                        "orig": "relay_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "relay_id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/relays/{id}",
                            "segments": [
                                {
                                    "lit": "relays"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "relays",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.relay"
                    ]
                ]
            }
        },
        "custom_domain": {
            "fields": [
                {
                    "name": "createdAt",
                    "title": "Created At",
                    "type": "`$INTEGER`",
                    "short": "The exact time, in epoch milliseconds, when this custom domain was created.",
                    "format": "int64"
                },
                {
                    "name": "customDomain",
                    "title": "Custom Domain",
                    "type": "`$STRING`",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The customer managed domain to which requests to be relayed to your domain should be sent."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "The unique identifier for the custom domain."
                },
                {
                    "name": "relay",
                    "title": "Relay",
                    "type": "`$STRING`",
                    "short": "The ID of the Relay with which this custom domain is associated."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "The status of the domains DNS verification."
                },
                {
                    "name": "updatedAt",
                    "title": "Updated At",
                    "type": "`$INTEGER`",
                    "short": "The exact time, in epoch milliseconds, when this custom domain was last updated.",
                    "format": "int64"
                },
                {
                    "name": "validationRecord",
                    "title": "Validation Record",
                    "type": "`$STRING`",
                    "short": "Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain",
                    "format": "uuidv4"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "custom_domain",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/relays/{relay_id}/custom-domains",
                            "segments": [
                                {
                                    "lit": "relays"
                                },
                                {
                                    "var": "relay_id"
                                },
                                {
                                    "lit": "custom-domains"
                                }
                            ],
                            "parts": [
                                "relays",
                                "{relay_id}",
                                "custom-domains"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "relay_id",
                                        "orig": "relay_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "relay_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/relays/{relay_id}/custom-domains/{id}",
                            "segments": [
                                {
                                    "lit": "relays"
                                },
                                {
                                    "var": "relay_id"
                                },
                                {
                                    "lit": "custom-domains"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "relays",
                                "{relay_id}",
                                "custom-domains",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "relay_id",
                                        "orig": "relay_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "relay_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.relay"
                    ]
                ]
            }
        },
        "function_run": {
            "fields": [
                {
                    "name": "async",
                    "title": "Async",
                    "type": "`$BOOLEAN`",
                    "short": "If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code."
                },
                {
                    "name": "createdAt",
                    "title": "Created At",
                    "type": "`$INTEGER`",
                    "short": "The exact time, in epoch milliseconds, when this Function execution was triggered.",
                    "format": "int64"
                },
                {
                    "name": "error",
                    "title": "Error",
                    "type": [
                        "`$ONE`",
                        [
                            "`$OBJECT`",
                            "`$NULL`"
                        ]
                    ],
                    "short": "This field details any error that occurred during Function execution."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "A unique identifier representing this specific Function execution instance."
                },
                {
                    "name": "payload",
                    "title": "Payload",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The data payload that the Function will use during its execution."
                },
                {
                    "name": "result",
                    "title": "Result",
                    "type": "`$OBJECT`",
                    "short": "This field represents the output returned by the Function."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "The outcome of the Function execution."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "function_run",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/functions/{function_name}/runs",
                            "segments": [
                                {
                                    "lit": "functions"
                                },
                                {
                                    "var": "function_name"
                                },
                                {
                                    "lit": "runs"
                                }
                            ],
                            "parts": [
                                "functions",
                                "{function_name}",
                                "runs"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "function_name",
                                        "orig": "function_name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "function_name"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "merchant": {
            "fields": [
                {
                    "name": "applePay",
                    "title": "Apple Pay",
                    "type": "`$OBJECT`",
                    "short": "The Merchant's Apple Pay configuration."
                },
                {
                    "name": "business",
                    "title": "Business",
                    "type": "`$OBJECT`",
                    "short": "The business details of the Merchant."
                },
                {
                    "name": "categoryCode",
                    "title": "Category Code",
                    "type": "`$STRING`",
                    "short": "The 4-digit Merchant Category Code (MCC)."
                },
                {
                    "name": "createdAt",
                    "title": "Created At",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "The exact time, in epoch milliseconds, when this Merchant was created.",
                    "format": "int64"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "A unique identifier assigned to each Merchant."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The official name of the Merchant as recognized in transactions and communications."
                },
                {
                    "name": "networkTokens",
                    "title": "Network Tokens",
                    "type": "`$OBJECT`",
                    "short": "The Merchant's Network Token configuration."
                },
                {
                    "name": "shortName",
                    "title": "Short Name",
                    "type": "`$STRING`",
                    "short": "A shorter version of the Merchant's name."
                },
                {
                    "name": "updatedAt",
                    "title": "Updated At",
                    "type": "`$INTEGER`",
                    "short": "The exact time, in epoch milliseconds, when this Merchant was last updated.",
                    "format": "int64"
                },
                {
                    "name": "website",
                    "title": "Website",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The official website URL of the Merchant."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "merchant",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/payments/merchants",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "merchants"
                                }
                            ],
                            "parts": [
                                "payments",
                                "merchants"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {
                                "$action": "merchant"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/payments/merchants",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "merchants"
                                }
                            ],
                            "parts": [
                                "payments",
                                "merchants"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "page_size",
                                        "orig": "pageSize",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "q",
                                        "orig": "q",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "merchant"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/payments/merchants/{merchant_id}",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "merchants"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "payments",
                                "merchants",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "merchant_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "merchant_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/payments/merchants/{merchant_id}",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "merchants"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "payments",
                                "merchants",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "merchant_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "merchant_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "network_token": {
            "fields": [
                {
                    "name": "card",
                    "title": "Card",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The details of the underlying encrypted card."
                },
                {
                    "name": "createdAt",
                    "title": "Created At",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "The exact time, in epoch milliseconds, when this Network Token was created.",
                    "format": "int64"
                },
                {
                    "name": "expiry",
                    "title": "Expiry",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The expiry details of the Network Token."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "A unique identifier representing a specific Network Token."
                },
                {
                    "name": "merchant",
                    "title": "Merchant",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The unique identifier of the Merchant associated with this Network Token."
                },
                {
                    "name": "number",
                    "title": "Number",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The unique number of the Network Token."
                },
                {
                    "name": "paymentAccountReference",
                    "title": "Payment Account Reference",
                    "type": "`$STRING`",
                    "short": "The unique identifier of the Payment Account associated with this Network Token."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The status of the Network Token."
                },
                {
                    "name": "tokenRequestorIdentifier",
                    "title": "Token Requestor Identifier",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The identifier of the Token Requestor (TRID) that requested the Network Token."
                },
                {
                    "name": "tokenServiceProvider",
                    "title": "Token Service Provider",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The Token Service Provider (TSP) that issued the Network Token."
                },
                {
                    "name": "updatedAt",
                    "title": "Updated At",
                    "type": "`$INTEGER`",
                    "short": "The exact time, in epoch milliseconds, when this Network Token was last updated.",
                    "format": "int64"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "network_token",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/payments/network-tokens/{network_token_id}/simulate",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "network-tokens"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "simulate"
                                }
                            ],
                            "parts": [
                                "payments",
                                "network-tokens",
                                "{id}",
                                "simulate"
                            ],
                            "rename": {
                                "param": {
                                    "network_token_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "network_token_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "simulate",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/payments/network-tokens",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "network-tokens"
                                }
                            ],
                            "parts": [
                                "payments",
                                "network-tokens"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/payments/network-tokens/{network_token_id}",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "network-tokens"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "payments",
                                "network-tokens",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "network_token_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "network_token_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "network_token_cryptogram": {
            "fields": [
                {
                    "name": "createdAt",
                    "title": "Created At",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "cryptogram",
                    "title": "Cryptogram",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "network_token_cryptogram",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/payments/network-tokens/{network_token_id}/cryptograms",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "network-tokens"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "cryptograms"
                                }
                            ],
                            "parts": [
                                "payments",
                                "network-tokens",
                                "{id}",
                                "cryptograms"
                            ],
                            "rename": {
                                "param": {
                                    "network_token_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "network_token_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
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
            "fields": [
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$INTEGER`",
                    "short": "Timestamp when the message was created"
                },
                {
                    "name": "data",
                    "title": "Data",
                    "type": "`$OBJECT`",
                    "short": "The message data payload"
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`",
                    "short": "The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes)"
                }
            ],
            "name": "payment",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/payments/3ds-sessions/{3ds_session_id}/messages",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "3ds-sessions"
                                },
                                {
                                    "var": "3ds_session_id"
                                },
                                {
                                    "lit": "messages"
                                }
                            ],
                            "parts": [
                                "payments",
                                "3ds-sessions",
                                "{3ds_session_id}",
                                "messages"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.messages`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "3ds_session_id",
                                        "orig": "3ds_session_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "3ds_session_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/payments/acquirers/{acquirer_id}",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "acquirers"
                                },
                                {
                                    "var": "acquirer_id"
                                }
                            ],
                            "parts": [
                                "payments",
                                "acquirers",
                                "{acquirer_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "acquirer_id",
                                        "orig": "acquirer_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "acquirer_id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/payments/cards/{card_id}",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "cards"
                                },
                                {
                                    "var": "card_id"
                                }
                            ],
                            "parts": [
                                "payments",
                                "cards",
                                "{card_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "card_id",
                                        "orig": "card_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "card_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/payments/merchants/{merchant_id}",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "merchants"
                                },
                                {
                                    "var": "merchant_id"
                                }
                            ],
                            "parts": [
                                "payments",
                                "merchants",
                                "{merchant_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "merchant_id",
                                        "orig": "merchant_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "merchant_id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/payments/network-tokens/{network_token_id}",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "network-tokens"
                                },
                                {
                                    "var": "network_token_id"
                                }
                            ],
                            "parts": [
                                "payments",
                                "network-tokens",
                                "{network_token_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "network_token_id",
                                        "orig": "network_token_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "network_token_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.acquirer"
                    ],
                    [
                        "$.main.kit.entity.card"
                    ],
                    [
                        "$.main.kit.entity.merchant"
                    ],
                    [
                        "$.main.kit.entity.network_token"
                    ]
                ]
            }
        },
        "relay": {
            "fields": [
                {
                    "name": "app",
                    "title": "App",
                    "type": "`$STRING`",
                    "short": "The unique identifier for the app to which the Relay belongs."
                },
                {
                    "name": "authentication",
                    "title": "Authentication",
                    "type": [
                        "`$ONE`",
                        [
                            "`$STRING`",
                            "`$NULL`"
                        ]
                    ],
                    "short": "The type of authentication required for the Relay"
                },
                {
                    "name": "createdAt",
                    "title": "Created At",
                    "type": "`$INTEGER`",
                    "short": "The exact time, in epoch milliseconds, when this Relay was created.",
                    "format": "int64"
                },
                {
                    "name": "destinationDomain",
                    "title": "Destination Domain",
                    "type": "`$STRING`",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The domain in front of which the Relay should be configured."
                },
                {
                    "name": "encryptEmptyStrings",
                    "title": "Encrypt Empty Strings",
                    "type": "`$BOOLEAN`",
                    "short": "Whether or not empty strings should be encrypted."
                },
                {
                    "name": "evervaultDomain",
                    "title": "Evervault Domain",
                    "type": "`$STRING`",
                    "short": "The Evervault managed domain to which requests to be relayed to the destination domain should be sent."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "The unique identifier for the Relay."
                },
                {
                    "name": "routes",
                    "title": "Routes",
                    "type": "`$ARRAY`",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$ARRAY`"
                        }
                    },
                    "short": "A collection of route configurations for the Relay."
                },
                {
                    "name": "updatedAt",
                    "title": "Updated At",
                    "type": "`$INTEGER`",
                    "short": "The exact time, in epoch milliseconds, when this Relay was updated.",
                    "format": "int64"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "relay",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/relays",
                            "segments": [
                                {
                                    "lit": "relays"
                                }
                            ],
                            "parts": [
                                "relays"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/relays",
                            "segments": [
                                {
                                    "lit": "relays"
                                }
                            ],
                            "parts": [
                                "relays"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/relays/{id}",
                            "segments": [
                                {
                                    "lit": "relays"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "relays",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/relays/{id}",
                            "segments": [
                                {
                                    "lit": "relays"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "relays",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "three_ds_session": {
            "fields": [
                {
                    "name": "accessControlServer",
                    "title": "Access Control Server",
                    "type": "`$OBJECT`",
                    "short": "Details about the Access Control Server involved in the 3DS transaction."
                },
                {
                    "name": "acquirer",
                    "title": "Acquirer",
                    "type": "`$OBJECT`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ANY`"
                        }
                    },
                    "short": "The acquirer of the payment."
                },
                {
                    "name": "ares",
                    "title": "Ares",
                    "type": "`$OBJECT`",
                    "short": "The details of the 3DS Authentication Response (ARes)."
                },
                {
                    "name": "authentication",
                    "title": "Authentication",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The details of the 3DS Authentication."
                },
                {
                    "name": "card",
                    "title": "Card",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The card details."
                },
                {
                    "name": "challenge",
                    "title": "Challenge",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "Details about the 3DS challenge."
                },
                {
                    "name": "createdAt",
                    "title": "Created At",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "The exact time, in epoch milliseconds, when this 3DS-Session was created.",
                    "format": "int64"
                },
                {
                    "name": "cres",
                    "title": "Cres",
                    "type": [
                        "`$ONE`",
                        [
                            "`$NULL`",
                            "`$OBJECT`"
                        ]
                    ],
                    "short": "The details of the 3DS Challenge Response (CRes)."
                },
                {
                    "name": "cryptogram",
                    "title": "Cryptogram",
                    "type": "`$STRING`",
                    "short": "The 3DS cryptogram (also called Authentication Value)."
                },
                {
                    "name": "customer",
                    "title": "Customer",
                    "type": "`$OBJECT`",
                    "short": "The details of the customer who initiated the transaction."
                },
                {
                    "name": "directoryServer",
                    "title": "Directory Server",
                    "type": "`$OBJECT`",
                    "short": "Details about the Directory Server involved in the 3DS transaction."
                },
                {
                    "name": "eci",
                    "title": "Eci",
                    "type": "`$OBJECT`",
                    "short": "The details of the Electronic Commerce Indicator."
                },
                {
                    "name": "failureReason",
                    "title": "Failure Reason",
                    "type": "`$STRING`",
                    "short": "The reason for the 3DS Authentication failure."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "A unique identifier assigned to each 3DS Authentication."
                },
                {
                    "name": "initiator",
                    "title": "Initiator",
                    "type": "`$OBJECT`",
                    "short": "Details about the transaction initiation process."
                },
                {
                    "name": "merchant",
                    "title": "Merchant",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The merchant details."
                },
                {
                    "name": "nextAction",
                    "title": "Next Action",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The next action required to complete the 3DS Authentication."
                },
                {
                    "name": "payment",
                    "title": "Payment",
                    "type": "`$OBJECT`",
                    "short": "The payment details of the 3D Secure Authentication."
                },
                {
                    "name": "preferredVersions",
                    "title": "Preferred Versions",
                    "type": "`$ARRAY`",
                    "short": "A prioritized list of preferred 3D Secure versions."
                },
                {
                    "name": "rreq",
                    "title": "Rreq",
                    "type": [
                        "`$ONE`",
                        [
                            "`$NULL`",
                            "`$OBJECT`"
                        ]
                    ],
                    "short": "The result of the 3DS authentication when a challenge has occurred."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The status of the 3DS Authentication."
                },
                {
                    "name": "threeDSServer",
                    "title": "Three Ds Server",
                    "type": "`$OBJECT`",
                    "short": "Details about the 3DS Server involved in the 3DS transaction."
                },
                {
                    "name": "updatedAt",
                    "title": "Updated At",
                    "type": "`$INTEGER`",
                    "short": "The exact time, in epoch milliseconds, when this 3DS-Session was last updated.",
                    "format": "int64"
                },
                {
                    "name": "version",
                    "title": "Version",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The 3D Secure version used to authenticate the session."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "three_ds_session",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/payments/3ds-sessions",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "3ds-sessions"
                                }
                            ],
                            "parts": [
                                "payments",
                                "3ds-sessions"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/payments/3ds-sessions/{3ds_session_id}",
                            "segments": [
                                {
                                    "lit": "payments"
                                },
                                {
                                    "lit": "3ds-sessions"
                                },
                                {
                                    "var": "3ds_session_id"
                                }
                            ],
                            "parts": [
                                "payments",
                                "3ds-sessions",
                                "{3ds_session_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "3ds_session_id",
                                        "orig": "3ds_session_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "3ds_session_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "webhook": {
            "fields": [],
            "name": "webhook",
            "op": {
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/webhook-endpoints/{webhook_endpoint_id}",
                            "segments": [
                                {
                                    "lit": "webhook-endpoints"
                                },
                                {
                                    "var": "webhook_endpoint_id"
                                }
                            ],
                            "parts": [
                                "webhook-endpoints",
                                "{webhook_endpoint_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "webhook_endpoint_id",
                                        "orig": "webhook_endpoint_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "webhook_endpoint_eead1d640d7c"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "webhook_endpoint_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.webhook_endpoint"
                    ]
                ]
            }
        },
        "webhook_endpoint": {
            "fields": [
                {
                    "name": "createdAt",
                    "title": "Created At",
                    "type": "`$INTEGER`",
                    "short": "The exact time, in epoch milliseconds, when this Webhook Endpoint was created.",
                    "format": "int64"
                },
                {
                    "name": "events",
                    "title": "Events",
                    "type": "`$ARRAY`",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$ARRAY`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$ARRAY`"
                        }
                    },
                    "short": "A list of Events that the Webhook Endpoint is subscribed to."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "A unique identifier representing a specific Webhook Endpoint."
                },
                {
                    "name": "updatedAt",
                    "title": "Updated At",
                    "type": [
                        "`$ONE`",
                        [
                            "`$INTEGER`",
                            "`$NULL`"
                        ]
                    ],
                    "short": "The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated.",
                    "format": "int64"
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The URL of the Webhook Endpoint."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "webhook_endpoint",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/webhook-endpoints",
                            "segments": [
                                {
                                    "lit": "webhook-endpoints"
                                }
                            ],
                            "parts": [
                                "webhook-endpoints"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/webhook-endpoints",
                            "segments": [
                                {
                                    "lit": "webhook-endpoints"
                                }
                            ],
                            "parts": [
                                "webhook-endpoints"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "starting_after",
                                        "orig": "startingAfter",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "webhook_endpoint_wd7c640d1daee"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/webhook-endpoints/{webhook_endpoint_id}",
                            "segments": [
                                {
                                    "lit": "webhook-endpoints"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "webhook-endpoints",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "webhook_endpoint_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "webhook_endpoint_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "webhook_endpoint_eead1d640d7c"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/webhook-endpoints/{webhook_endpoint_id}",
                            "segments": [
                                {
                                    "lit": "webhook-endpoints"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "webhook-endpoints",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "webhook_endpoint_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "webhook_endpoint_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "webhook_endpoint_eead1d640d7c"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map