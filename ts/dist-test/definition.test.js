"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "acquirer",
        "accessor": "Acquirer",
        "op": "create",
        "method": "POST",
        "path": "/payments/acquirers",
        "action": "acquirer",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "acquirer_adk3kdljc3",
            "name": "Ollivanders Wand Shop Production Configuration",
            "description": "Ollivanders Wand Shop Production Configuration",
            "default": true,
            "configurations": [
                {
                    "network": "mastercard",
                    "bin": "424242",
                    "acquirerMerchantIdentifier": "38191048173",
                    "state": "active",
                    "country": "ie"
                },
                {
                    "network": "visa",
                    "bin": "424242",
                    "acquirerMerchantIdentifier": "38191048173",
                    "state": "active",
                    "country": "ie"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "acquirer",
        "accessor": "Acquirer",
        "op": "list",
        "method": "GET",
        "path": "/payments/acquirers",
        "action": "acquirer",
        "args": [],
        "select": {
            "page": 0,
            "page_size": 50
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "pageSize"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "page_size",
                "wire": "pageSize"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "acquirer_adk3kdljc3",
                    "name": "Ollivanders Wand Shop Production Configuration",
                    "description": "Ollivanders Wand Shop Production Configuration",
                    "default": true,
                    "configurations": [
                        {
                            "network": "mastercard",
                            "bin": "424242",
                            "acquirerMerchantIdentifier": "38191048173",
                            "state": "active",
                            "country": "ie"
                        },
                        {
                            "network": "visa",
                            "bin": "424242",
                            "acquirerMerchantIdentifier": "38191048173",
                            "state": "active",
                            "country": "ie"
                        }
                    ]
                }
            ],
            "pageSize": 50,
            "nextPage": null,
            "total": 1
        },
        "idField": "id"
    },
    {
        "entity": "acquirer",
        "accessor": "Acquirer",
        "op": "load",
        "method": "GET",
        "path": "/payments/acquirers/{acquirer_id}",
        "args": [
            {
                "name": "id",
                "wire": "acquirer_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "acquirer_adk3kdljc3",
            "name": "Ollivanders Wand Shop Production Configuration",
            "description": "Ollivanders Wand Shop Production Configuration",
            "default": true,
            "configurations": [
                {
                    "network": "mastercard",
                    "bin": "424242",
                    "acquirerMerchantIdentifier": "38191048173",
                    "state": "active",
                    "country": "ie"
                },
                {
                    "network": "visa",
                    "bin": "424242",
                    "acquirerMerchantIdentifier": "38191048173",
                    "state": "active",
                    "country": "ie"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "acquirer",
        "accessor": "Acquirer",
        "op": "update",
        "method": "PATCH",
        "path": "/payments/acquirers/{acquirer_id}",
        "args": [
            {
                "name": "id",
                "wire": "acquirer_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "acquirer_adk3kdljc3",
            "name": "Ollivanders Wand Shop Production Configuration",
            "description": "Ollivanders Wand Shop Production Configuration",
            "default": true,
            "configurations": [
                {
                    "network": "mastercard",
                    "bin": "424242",
                    "acquirerMerchantIdentifier": "38191048173",
                    "state": "active",
                    "country": "ie"
                },
                {
                    "network": "visa",
                    "bin": "424242",
                    "acquirerMerchantIdentifier": "38191048173",
                    "state": "active",
                    "country": "ie"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "bin_lookup",
        "accessor": "BinLookup",
        "op": "create",
        "method": "POST",
        "path": "/payments/bin-lookups",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "bin_lookup_1234567890",
            "brand": "visa",
            "funding": "credit",
            "segment": "consumer",
            "country": "gb",
            "currency": "gbp",
            "issuer": "Gringotts Wizarding Bank and Trust Company",
            "productName": "Visa Debit",
            "fastFunds": {
                "domestic": true,
                "crossBorder": true
            },
            "threeDS": {
                "supportedVersions": {
                    "accessControlServer": [
                        "2.2.0"
                    ],
                    "directoryServer": [
                        "2.2.0",
                        "2.3.1"
                    ]
                },
                "acsInfoIndicators": [
                    {
                        "code": "acs-auth-available",
                        "indicator": "01",
                        "description": "Authentication Available at ACS"
                    }
                ]
            },
            "type": "card",
            "createdAt": 169297262323
        },
        "idField": "id"
    },
    {
        "entity": "card",
        "accessor": "Card",
        "op": "create",
        "method": "POST",
        "path": "/payments/cards/{card_id}/simulate",
        "action": "simulate",
        "args": [
            {
                "name": "id",
                "wire": "card_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "card_eead1d640d7c",
            "number": "ev:debug:Tk9D:number:nTepvAI585M7lUVp:AkJ6Brzat0E7ui8DSKCSXO7AopU/+GFuBekQ6cGx7eTl:sfihK53itmHp+URxomnTITUpwQwM5nnRrnQ0qdIOUlA=:$",
            "expiry": {
                "month": "09",
                "year": "26"
            },
            "bin": "424242",
            "lastFour": "4242",
            "brand": "visa",
            "funding": "credit",
            "segment": "consumer",
            "country": "gb",
            "currency": "gbp",
            "issuer": "Gringotts Wizarding Bank and Trust Company",
            "status": "replaced",
            "replacement": "card_eead1d640d7c",
            "automaticUpdates": "enabled",
            "createdAt": 169297262323,
            "updatedAt": 169297262376
        },
        "idField": "id"
    },
    {
        "entity": "card",
        "accessor": "Card",
        "op": "load",
        "method": "GET",
        "path": "/payments/cards/{card_id}",
        "args": [
            {
                "name": "id",
                "wire": "card_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "card_eead1d640d7c",
            "number": "ev:debug:Tk9D:number:nTepvAI585M7lUVp:AkJ6Brzat0E7ui8DSKCSXO7AopU/+GFuBekQ6cGx7eTl:sfihK53itmHp+URxomnTITUpwQwM5nnRrnQ0qdIOUlA=:$",
            "expiry": {
                "month": "09",
                "year": "26"
            },
            "bin": "424242",
            "lastFour": "4242",
            "brand": "visa",
            "funding": "credit",
            "segment": "consumer",
            "country": "gb",
            "currency": "gbp",
            "issuer": "Gringotts Wizarding Bank and Trust Company",
            "status": "active",
            "replacement": null,
            "automaticUpdates": "enabled",
            "createdAt": 169297262323,
            "updatedAt": null
        },
        "idField": "id"
    },
    {
        "entity": "card_art",
        "accessor": "CardArt",
        "op": "load",
        "method": "GET",
        "path": "/payments/network-tokens/{network_token_id}/card-art",
        "args": [
            {
                "name": "network_token_id",
                "wire": "network_token_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "type": "image/png",
            "data": "dGhlIGJhc2U2NCBlbmNvZGVkIGltYWdlIGRhdGE=",
            "width": 1536,
            "height": 969
        },
        "idField": "id"
    },
    {
        "entity": "client_side_token",
        "accessor": "ClientSideToken",
        "op": "create",
        "method": "POST",
        "path": "/client-side-tokens",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "client_side_token_TDbEef6lgIs",
            "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJhcHBfdXVpZCI6ImFwcF82YWJlZDM1ZDc2YjkiLCJ0ZWFtX3V1aWQiOiJ0ZWFtX2FiZjU1YTk5MTY0NSIsImp0aSI6ImNsaWVudF9zaWRlX3Rva2VuX1REYkVlZjZsZ0lzIiwiZXhwIjoxNzA3MjMzODQxOTgxLCJhY3Rpb24iOiJhcGk6ZGVjcnlwdCIsInJlc291cmNlIjpudWxsLCJoYXNoZWRfYm9keSI6IlJCTnZvMVd6WjRvUlJxMFc5LWhrbnBUN1Q4SWY1MzZERU1CZzloeXFfNG8iLCJjbGllbnRfaXAiOm51bGx9.ea1w3TlZ7p-OLVs-NOAUMij4V5w-9vMAD8W2WEoklsDwwgy8HANXP4e8eAjTA0CkELoUL2FgNesS6S77Z-coG1Yw9TGnkEchgkA6RAXqF65t1bLrW0rvl2AzwFZNwJpEbJc37YqyC2xGeermmYKZCu6in97_fe4rAXSYQiuVtN6V8uLSlAgP9Mr0BmNIf49fnskbc0y2-2qewvZfRM7mPQ6NXcQE_jhUjy3OhaohdvU1FpaLs3OrzW2Ej8wE1hOjc5hRtT2cslaY4Bl2x4YNMRVObWg7GYCdETG280ilXTUu9jIPmkXt8QBzouZOP5nuhCjYxFJ2fYZMLj7vYukwdiyBtiUADXDzmnFyh7icAWib76z_hW3VLRjQSlq-fgvQJfM71j5RGBEmLrQNAPRREYjCiM8cwmOh5sFaLdmu4wM6-lgPn8dvHSqENwggs_nfxPyavHChNn8KOo4FS64YYeB28hqSvBAMT-umCdv7n2I-YF6fJOpgJrQOK35MPt4kKfqULJ45wpSnzsSpT9kTrLw0-9-6JpMtsQio0UJ27aXHMPErFcNMcW2hEhPdNsjSfIEmK7lCaUOed-wETkkfIaoTe5ly051baj-VWbAbNXH2jduia2rCZoofXTABADRzeBrFyDNRZXNQ205n0xh3PpIcazKw_vCAD_EDXmcCsFo",
            "expiry": 1707233841981,
            "createdAt": 1707233541981
        },
        "idField": "id"
    },
    {
        "entity": "core",
        "accessor": "Core",
        "op": "list",
        "method": "GET",
        "path": "/relays/{relay_id}/custom-domains",
        "args": [
            {
                "name": "relay_id",
                "wire": "relay_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "custom_domain_j3od9Bl0WV1n",
                    "customDomain": "subdomain.example.com",
                    "status": "active",
                    "validationRecord": "986f3008-86e7-4caf-bd8b-a5d312844153",
                    "relay": "relay_destination_d4ja57js9lnh",
                    "createdAt": 1692972623233,
                    "updatedAt": 1692972623234
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "core",
        "accessor": "Core",
        "op": "remove",
        "method": "DELETE",
        "path": "/relays/{relay_id}/custom-domains/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            },
            {
                "name": "relay_id",
                "wire": "relay_id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 202,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "core",
        "accessor": "Core",
        "op": "remove",
        "method": "DELETE",
        "path": "/relays/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 202,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "custom_domain",
        "accessor": "CustomDomain",
        "op": "create",
        "method": "POST",
        "path": "/relays/{relay_id}/custom-domains",
        "args": [
            {
                "name": "relay_id",
                "wire": "relay_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "custom_domain_j3od9Bl0WV1n",
            "customDomain": "subdomain.example.com",
            "status": "active",
            "validationRecord": "986f3008-86e7-4caf-bd8b-a5d312844153",
            "relay": "relay_destination_d4ja57js9lnh",
            "createdAt": 1692972623233,
            "updatedAt": 1692972623233
        },
        "idField": "id"
    },
    {
        "entity": "custom_domain",
        "accessor": "CustomDomain",
        "op": "load",
        "method": "GET",
        "path": "/relays/{relay_id}/custom-domains/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            },
            {
                "name": "relay_id",
                "wire": "relay_id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "custom_domain_j3od9Bl0WV1n",
            "customDomain": "subdomain.example.com",
            "status": "active",
            "validationRecord": "986f3008-86e7-4caf-bd8b-a5d312844153",
            "relay": "relay_destination_d4ja57js9lnh",
            "createdAt": 1692972623233,
            "updatedAt": 1692972623233
        },
        "idField": "id"
    },
    {
        "entity": "function_run",
        "accessor": "FunctionRun",
        "op": "create",
        "method": "POST",
        "path": "/functions/{function_name}/runs",
        "args": [
            {
                "name": "function_name",
                "wire": "function_name",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "func_run_eead1d640d7c",
            "status": "success",
            "result": {
                "message": "Hello from a Function! It seems you have 14 letters in your name"
            },
            "createdAt": 1692972623233
        },
        "idField": "id"
    },
    {
        "entity": "merchant",
        "accessor": "Merchant",
        "op": "create",
        "method": "POST",
        "path": "/payments/merchants",
        "action": "merchant",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "merchant_eead1d640d7c",
            "name": "Ollivanders Wand Shop",
            "website": "https://www.ollivanders.co.uk",
            "categoryCode": "5945",
            "business": {
                "legalName": "Ollivanders Wand Shop Ltd",
                "address": {
                    "line1": "Diagon Alley",
                    "city": "London",
                    "postalCode": "WD1 1AA",
                    "country": "gb"
                }
            },
            "networkTokens": {
                "enrolment": [
                    {
                        "cardBrand": "mastercard",
                        "tokenRequestorIdentifier": "50165156978",
                        "status": "active"
                    },
                    {
                        "cardBrand": "visa",
                        "tokenRequestorIdentifier": "40238123804",
                        "status": "active"
                    },
                    {
                        "cardBrand": "american-express",
                        "tokenRequestorIdentifier": null,
                        "status": "inactive"
                    }
                ]
            },
            "applePay": {
                "domains": [
                    {
                        "domain": "ollivanders.co.uk",
                        "status": "pending"
                    }
                ]
            },
            "createdAt": 1692972623233,
            "updatedAt": 1692972623768
        },
        "idField": "id"
    },
    {
        "entity": "merchant",
        "accessor": "Merchant",
        "op": "list",
        "method": "GET",
        "path": "/payments/merchants",
        "action": "merchant",
        "args": [],
        "select": {
            "page": 0,
            "page_size": 50,
            "q": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "pageSize",
            "q"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "page_size",
                "wire": "pageSize"
            },
            {
                "name": "q",
                "wire": "q"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "merchant_eead1d640d7c",
                    "name": "Ollivanders Wand Shop",
                    "website": "https://www.ollivanders.co.uk",
                    "categoryCode": "5945",
                    "business": {
                        "legalName": "Ollivanders Wand Shop Ltd",
                        "address": {
                            "line1": "Diagon Alley",
                            "city": "London",
                            "postalCode": "WD1 1AA",
                            "country": "gb"
                        }
                    },
                    "networkTokens": {
                        "enrolment": [
                            {
                                "cardBrand": "mastercard",
                                "tokenRequestorIdentifier": "50165156978",
                                "status": "active"
                            },
                            {
                                "cardBrand": "visa",
                                "tokenRequestorIdentifier": "40238123804",
                                "status": "active"
                            },
                            {
                                "cardBrand": "american-express",
                                "tokenRequestorIdentifier": null,
                                "status": "inactive"
                            }
                        ]
                    },
                    "createdAt": 1692972623233,
                    "updatedAt": 1692972623768
                }
            ],
            "pageSize": 50,
            "nextPage": null,
            "total": 1
        },
        "idField": "id"
    },
    {
        "entity": "merchant",
        "accessor": "Merchant",
        "op": "load",
        "method": "GET",
        "path": "/payments/merchants/{merchant_id}",
        "args": [
            {
                "name": "id",
                "wire": "merchant_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "merchant_eead1d640d7c",
            "name": "Ollivanders Wand Shop",
            "website": "https://www.ollivanders.co.uk",
            "categoryCode": "5945",
            "business": {
                "legalName": "Ollivanders Wand Shop Ltd.",
                "address": {
                    "line1": "Diagon Alley",
                    "city": "London",
                    "postalCode": "WD1 1AA",
                    "country": "gb"
                }
            },
            "networkTokens": {
                "enrolment": [
                    {
                        "cardBrand": "mastercard",
                        "tokenRequestorIdentifier": "50165156978",
                        "status": "active"
                    },
                    {
                        "cardBrand": "visa",
                        "tokenRequestorIdentifier": "40238123804",
                        "status": "active"
                    },
                    {
                        "cardBrand": "american-express",
                        "tokenRequestorIdentifier": null,
                        "status": "inactive"
                    }
                ]
            },
            "applePay": {
                "domains": [
                    {
                        "domain": "ollivanders.co.uk",
                        "status": "active"
                    }
                ]
            },
            "createdAt": 1692972623233,
            "updatedAt": 1692972623768
        },
        "idField": "id"
    },
    {
        "entity": "merchant",
        "accessor": "Merchant",
        "op": "update",
        "method": "PATCH",
        "path": "/payments/merchants/{merchant_id}",
        "args": [
            {
                "name": "id",
                "wire": "merchant_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "merchant_eead1d640d7c",
            "name": "Ollivanders Wand Shop",
            "shortName": "Ollivanders",
            "website": "https://www.ollivanders.co.uk",
            "categoryCode": "5945",
            "business": {
                "legalName": "Ollivanders Wand Shop Ltd.",
                "address": {
                    "line1": "Diagon Alley",
                    "city": "London",
                    "postalCode": "WD1 1AA",
                    "country": "gb"
                }
            },
            "networkTokens": {
                "enrolment": [
                    {
                        "cardBrand": "mastercard",
                        "tokenRequestorIdentifier": "50165156978",
                        "status": "active"
                    },
                    {
                        "cardBrand": "visa",
                        "tokenRequestorIdentifier": "402338123804",
                        "status": "active"
                    },
                    {
                        "cardBrand": "american-express",
                        "tokenRequestorIdentifier": null,
                        "status": "inactive"
                    }
                ]
            },
            "applePay": {
                "domains": [
                    {
                        "domain": "ollivanders.co.uk",
                        "status": "pending"
                    }
                ]
            },
            "createdAt": 1692972623233,
            "updatedAt": 1692972623768
        },
        "idField": "id"
    },
    {
        "entity": "network_token",
        "accessor": "NetworkToken",
        "op": "create",
        "method": "POST",
        "path": "/payments/network-tokens/{network_token_id}/simulate",
        "action": "simulate",
        "args": [
            {
                "name": "id",
                "wire": "network_token_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "network_token_eead1d640d7c",
            "number": "4498004918463434",
            "expiry": {
                "month": "13",
                "year": "25"
            },
            "card": {
                "lastFour": "4242",
                "expiry": {
                    "month": "09",
                    "year": "26"
                },
                "brand": "visa",
                "country": "us",
                "currency": "usd",
                "funding": "debit",
                "segment": "consumer",
                "issuer": "Gringotts Wizarding Bank and Trust Company"
            },
            "paymentAccountReference": "512381d9f8e0629211e3949a08002",
            "tokenRequestorIdentifier": "40020248564",
            "tokenServiceProvider": "vts",
            "merchant": "merchant_ddsaJsda9d86",
            "status": "active",
            "createdAt": 1692972623233,
            "updatedAt": 1692972623768
        },
        "idField": "id"
    },
    {
        "entity": "network_token",
        "accessor": "NetworkToken",
        "op": "create",
        "method": "POST",
        "path": "/payments/network-tokens",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "network_token_eead1d640d7c",
            "number": "4498004918463434",
            "expiry": {
                "month": "13",
                "year": "25"
            },
            "card": {
                "lastFour": "4242",
                "expiry": {
                    "month": "09",
                    "year": "26"
                },
                "brand": "visa",
                "country": "us",
                "currency": "usd",
                "funding": "debit",
                "segment": "consumer",
                "issuer": "Gringotts Wizarding Bank and Trust Company"
            },
            "paymentAccountReference": "512381d9f8e0629211e3949a08002",
            "tokenRequestorIdentifier": "40020248564",
            "tokenServiceProvider": "vts",
            "merchant": "merchant_ddsaJsda9d86",
            "status": "active",
            "createdAt": 1692972623233,
            "updatedAt": 1692972623768
        },
        "idField": "id"
    },
    {
        "entity": "network_token",
        "accessor": "NetworkToken",
        "op": "load",
        "method": "GET",
        "path": "/payments/network-tokens/{network_token_id}",
        "args": [
            {
                "name": "id",
                "wire": "network_token_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "network_token_eead1d640d7c",
            "number": "4498004918463434",
            "expiry": {
                "month": "13",
                "year": "25"
            },
            "card": {
                "lastFour": "4242",
                "expiry": {
                    "month": "09",
                    "year": "26"
                },
                "brand": "visa",
                "country": "us",
                "currency": "usd",
                "funding": "debit",
                "segment": "consumer",
                "issuer": "Gringotts Wizarding Bank and Trust Company"
            },
            "paymentAccountReference": "512381d9f8e0629211e3949a08002",
            "tokenRequestorIdentifier": "40020248564",
            "tokenServiceProvider": "vts",
            "merchant": "merchant_ddsaJsda9d86",
            "status": "active",
            "createdAt": 1692972623233,
            "updatedAt": 1692972623768
        },
        "idField": "id"
    },
    {
        "entity": "network_token_cryptogram",
        "accessor": "NetworkTokenCryptogram",
        "op": "create",
        "method": "POST",
        "path": "/payments/network-tokens/{network_token_id}/cryptograms",
        "args": [
            {
                "name": "id",
                "wire": "network_token_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "network_token_cryptogram_eead1d640d7c",
            "cryptogram": "NTk0ZjM5M2QyNDMwNDE1MjkzMjg1ZTg5Y2NiZjdmNjE=",
            "createdAt": 1692972623233
        },
        "idField": "id"
    },
    {
        "entity": "payment",
        "accessor": "Payment",
        "op": "list",
        "method": "GET",
        "path": "/payments/3ds-sessions/{3ds_session_id}/messages",
        "args": [
            {
                "name": "3ds_session_id",
                "wire": "3ds_session_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "messages": [
                {
                    "type": "AReq",
                    "created_at": 1751039450228,
                    "data": {
                        "type": "AReq",
                        "threeDSCompInd": "N",
                        "threeDSRequestorAuthenticationInd": "01",
                        "threeDSRequestorChallengeInd": "82",
                        "threeDSRequestorID": "10085939*Example",
                        "threeDSRequestorName": "Example 3DSS_Merchant",
                        "threeDSRequestorURL": "https://example.com/",
                        "threeDSServerRefNumber": "EXAMPLE_3DS_REF_NUMBER",
                        "threeDSServerOperatorID": "10085939",
                        "threeDSServerTransID": "274af11d-2f5a-4050-b70e-8eda1e76f782",
                        "threeDSServerURL": "https://example.3ds.com/result",
                        "acctType": "03",
                        "acquirerBIN": "123456",
                        "acquirerMerchantID": "123456789012",
                        "browserAcceptHeader": "*/*",
                        "browserIP": "192.168.1.1",
                        "browserJavaEnabled": false,
                        "browserJavascriptEnabled": true,
                        "browserLanguage": "en-GB",
                        "browserColorDepth": "24",
                        "browserScreenHeight": "1080",
                        "browserScreenWidth": "1920",
                        "browserTZ": "0",
                        "browserUserAgent": "Mozilla/5.0 (Example Browser)",
                        "cardExpiryDate": "2712",
                        "acctNumber": "************1234",
                        "deviceChannel": "02",
                        "mcc": "1234",
                        "merchantCountryCode": "372",
                        "merchantName": "Example Merchant",
                        "messageCategory": "01",
                        "notificationURL": "https://example.3ds.com/notification",
                        "purchaseAmount": "100000",
                        "purchaseCurrency": "978",
                        "purchaseExponent": "2",
                        "purchaseDate": "20250627155050",
                        "transType": "01"
                    }
                },
                {
                    "type": "ARes",
                    "created_at": 1751039450626,
                    "data": {
                        "type": "ARes",
                        "threeDSServerTransID": "274af11d-2f5a-4050-b70e-8eda1e76f782",
                        "acsChallengeMandated": "Y",
                        "acsOperatorID": "123456789",
                        "acsReferenceNumber": "EXAMPLE_ACS_REF_NUMBER",
                        "acsTransID": "123456789012",
                        "acsURL": "https://example.3ds.com/creq",
                        "authenticationType": "02",
                        "dsReferenceNumber": "EXAMPLE_DS_REF_NUMBER",
                        "dsTransID": "4912cee8-3c89-4504-ac5b-0b2a3ef9489d",
                        "transStatus": "Y",
                        "eci": "05"
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "payment",
        "accessor": "Payment",
        "op": "remove",
        "method": "DELETE",
        "path": "/payments/acquirers/{acquirer_id}",
        "args": [
            {
                "name": "acquirer_id",
                "wire": "acquirer_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "payment",
        "accessor": "Payment",
        "op": "remove",
        "method": "DELETE",
        "path": "/payments/cards/{card_id}",
        "args": [
            {
                "name": "card_id",
                "wire": "card_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 204,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "payment",
        "accessor": "Payment",
        "op": "remove",
        "method": "DELETE",
        "path": "/payments/merchants/{merchant_id}",
        "args": [
            {
                "name": "merchant_id",
                "wire": "merchant_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "payment",
        "accessor": "Payment",
        "op": "remove",
        "method": "DELETE",
        "path": "/payments/network-tokens/{network_token_id}",
        "args": [
            {
                "name": "network_token_id",
                "wire": "network_token_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 204,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "relay",
        "accessor": "Relay",
        "op": "create",
        "method": "POST",
        "path": "/relays",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "relay_destination_d4ja57js9lnh",
            "destinationDomain": "example.com",
            "evervaultDomain": "example-com.app-12345.relay.evervault.app",
            "encryptEmptyStrings": true,
            "routes": [
                {
                    "method": "POST",
                    "path": "/checkout",
                    "request": [
                        {
                            "action": "encrypt",
                            "selections": [
                                {
                                    "type": "json",
                                    "role": "pci",
                                    "selector": "$.cardNumber"
                                }
                            ]
                        }
                    ],
                    "response": [
                        {
                            "action": "decrypt",
                            "selections": [
                                {
                                    "type": "json",
                                    "selector": "$..*"
                                }
                            ]
                        }
                    ]
                }
            ],
            "app": "app_cc7fcd533649",
            "createdAt": 1692972623233,
            "updatedAt": 1692972623234
        },
        "idField": "id"
    },
    {
        "entity": "relay",
        "accessor": "Relay",
        "op": "list",
        "method": "GET",
        "path": "/relays",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "relay_destination_d4ja57js9lnh",
                    "destinationDomain": "example.com",
                    "evervaultDomain": "example-com.app-12345.relay.evervault.app",
                    "encryptEmptyStrings": true,
                    "authentication": "api-key",
                    "routes": [
                        {
                            "method": "POST",
                            "path": "/checkout",
                            "request": [
                                {
                                    "action": "encrypt",
                                    "selections": [
                                        {
                                            "type": "json",
                                            "role": "pci",
                                            "selector": "$.cardNumber"
                                        }
                                    ]
                                }
                            ],
                            "response": [
                                {
                                    "action": "decrypt",
                                    "selections": [
                                        {
                                            "type": "json",
                                            "selector": "$..*"
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "app": "app_cc7fcd533649",
                    "createdAt": 1692972623233,
                    "updatedAt": 1692972623234
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "relay",
        "accessor": "Relay",
        "op": "load",
        "method": "GET",
        "path": "/relays/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "relay_destination_d4ja57js9lnh",
            "destinationDomain": "example.com",
            "evervaultDomain": "example-com.app-12345.relay.evervault.app",
            "encryptEmptyStrings": true,
            "authentication": "api-key",
            "routes": [
                {
                    "method": "POST",
                    "path": "/checkout",
                    "request": [
                        {
                            "action": "encrypt",
                            "selections": [
                                {
                                    "type": "json",
                                    "role": "pci",
                                    "selector": "$.cardNumber"
                                }
                            ]
                        }
                    ],
                    "response": []
                }
            ],
            "app": "app_cc7fcd533649",
            "createdAt": 1692972623233
        },
        "idField": "id"
    },
    {
        "entity": "relay",
        "accessor": "Relay",
        "op": "update",
        "method": "PATCH",
        "path": "/relays/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "relay_destination_d4ja57js9lnh",
            "destinationDomain": "example.com",
            "evervaultDomain": "example-com.app-12345.relay.evervault.app",
            "encryptEmptyStrings": true,
            "authentication": null,
            "routes": [
                {
                    "method": "POST",
                    "path": "/checkout",
                    "request": [
                        {
                            "action": "encrypt",
                            "selections": [
                                {
                                    "type": "json",
                                    "role": "pci",
                                    "selector": "$.cardNumber"
                                }
                            ]
                        }
                    ],
                    "response": []
                }
            ],
            "app": "app_cc7fcd533649",
            "createdAt": 1692972623233,
            "updatedAt": 1692972623234
        },
        "idField": "id"
    },
    {
        "entity": "three_ds_session",
        "accessor": "ThreeDsSession",
        "op": "create",
        "method": "POST",
        "path": "/payments/3ds-sessions",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "tds_57aa862f8bf7",
            "merchant": {
                "name": "Ollivanders Wand Shop",
                "website": "https://www.ollivanders.co.uk",
                "categoryCode": "5945",
                "country": "gb"
            },
            "card": {
                "lastFour": "4242",
                "expiry": {
                    "month": "09",
                    "year": "26"
                },
                "brand": "visa",
                "funding": "debit",
                "segment": "consumer",
                "country": "gb",
                "currency": "gbp"
            },
            "initiator": {
                "type": "customer"
            },
            "challenge": {
                "preference": "no-preference",
                "reason": null
            },
            "acquirer": {
                "bin": "567834",
                "merchantIdentifier": "530249576123943",
                "country": "gb"
            },
            "payment": {
                "type": "one-off",
                "amount": 1000,
                "currency": "eur"
            },
            "version": "2.2.0",
            "status": "action-required",
            "nextAction": {
                "type": "use-sdk"
            },
            "ares": {
                "transStatus": {
                    "value": "C",
                    "detail": "Challenge Required; Additional authentication is required using the CReq/CRes"
                },
                "transStatusReason": null
            },
            "cres": null,
            "rreq": null,
            "accessControlServer": {
                "transactionIdentifier": "0f651348-c519-4cfb-b349-0b302af9861f",
                "referenceNumber": "3DS_LOA_ACS_STIN_020200_00417"
            },
            "directoryServer": {
                "transactionIdentifier": "71c5d726-5d4b-426c-9d7d-131970f41c5c",
                "referenceNumber": "3DS_LOA_DIS_VISA_020200_00828",
                "network": "visa"
            },
            "threeDSServer": {
                "transactionIdentifier": "a623edc1-54bc-455d-9dea-c909783a37c3"
            },
            "createdAt": 1692972623233,
            "updatedAt": 1692972623768
        },
        "idField": "id"
    },
    {
        "entity": "three_ds_session",
        "accessor": "ThreeDsSession",
        "op": "load",
        "method": "GET",
        "path": "/payments/3ds-sessions/{3ds_session_id}",
        "args": [
            {
                "name": "3ds_session_id",
                "wire": "3ds_session_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "tds_57aa862f8bf7",
            "merchant": {
                "name": "Ollivanders Wand Shop",
                "website": "https://www.ollivanders.co.uk",
                "categoryCode": "5945",
                "country": "gb"
            },
            "card": {
                "lastFour": "4242",
                "expiry": {
                    "month": "09",
                    "year": "26"
                },
                "brand": "visa",
                "funding": "debit",
                "segment": "consumer",
                "country": "gb",
                "currency": "gbp"
            },
            "initiator": {
                "type": "customer"
            },
            "challenge": {
                "preference": "no-preference",
                "reason": null
            },
            "acquirer": {
                "bin": "567834",
                "merchantIdentifier": "530249576123943",
                "country": "gb"
            },
            "payment": {
                "type": "one-off",
                "amount": 1000,
                "currency": "eur"
            },
            "version": "2.2.0",
            "status": "action-required",
            "nextAction": {
                "type": "use-sdk"
            },
            "threeDSServer": {
                "transactionIdentifier": "a623edc1-54bc-455d-9dea-c909783a37c3"
            },
            "createdAt": 1692972623233,
            "updatedAt": 1692972623768
        },
        "idField": "id"
    },
    {
        "entity": "webhook",
        "accessor": "Webhook",
        "op": "remove",
        "method": "DELETE",
        "path": "/webhook-endpoints/{webhook_endpoint_id}",
        "args": [
            {
                "name": "webhook_endpoint_id",
                "wire": "webhook_endpoint_id",
                "value": "webhook_endpoint_eead1d640d7c"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "webhook_endpoint",
        "accessor": "WebhookEndpoint",
        "op": "create",
        "method": "POST",
        "path": "/webhook-endpoints",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "webhook_endpoint_eead1d640d7c",
            "url": "https://example.com/webhook",
            "events": [
                "payments.merchant.updated",
                "payments.network-token.updated"
            ],
            "createdAt": 169297262323,
            "updatedAt": null
        },
        "idField": "id"
    },
    {
        "entity": "webhook_endpoint",
        "accessor": "WebhookEndpoint",
        "op": "list",
        "method": "GET",
        "path": "/webhook-endpoints",
        "args": [],
        "select": {
            "limit": 10,
            "starting_after": "webhook_endpoint_wd7c640d1daee"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "startingAfter"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "starting_after",
                "wire": "startingAfter"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "webhook_endpoint_eead1d640d7c",
                    "url": "https://example.com/webhook",
                    "events": [
                        "payments.merchant.updated",
                        "payments.network-token.updated"
                    ],
                    "createdAt": 169297262323,
                    "updatedAt": null
                }
            ],
            "hasMore": true
        },
        "idField": "id"
    },
    {
        "entity": "webhook_endpoint",
        "accessor": "WebhookEndpoint",
        "op": "load",
        "method": "GET",
        "path": "/webhook-endpoints/{webhook_endpoint_id}",
        "args": [
            {
                "name": "id",
                "wire": "webhook_endpoint_id",
                "value": "webhook_endpoint_eead1d640d7c"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "webhook_endpoint_eead1d640d7c",
            "url": "https://example.com/webhook",
            "events": [
                "payments.merchant.updated",
                "payments.network-token.updated"
            ],
            "createdAt": 169297262323,
            "updatedAt": null
        },
        "idField": "id"
    },
    {
        "entity": "webhook_endpoint",
        "accessor": "WebhookEndpoint",
        "op": "update",
        "method": "PATCH",
        "path": "/webhook-endpoints/{webhook_endpoint_id}",
        "args": [
            {
                "name": "id",
                "wire": "webhook_endpoint_id",
                "value": "webhook_endpoint_eead1d640d7c"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "webhook_endpoint_eead1d640d7c",
            "url": "https://example.com/webhook",
            "events": [
                "payments.merchant.updated"
            ],
            "createdAt": 169297262323,
            "updatedAt": 169297269867
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map