package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Evervault",
			"slug": "evervault",
			"version": "0.1.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.evervault.com",
			"auth": map[string]any{
				"prefix": "Basic",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"acquirer": map[string]any{},
				"bin_lookup": map[string]any{},
				"card": map[string]any{},
				"card_art": map[string]any{},
				"client_side_token": map[string]any{},
				"core": map[string]any{},
				"custom_domain": map[string]any{},
				"function_run": map[string]any{},
				"merchant": map[string]any{},
				"network_token": map[string]any{},
				"network_token_cryptogram": map[string]any{},
				"payment": map[string]any{},
				"relay": map[string]any{},
				"three_ds_session": map[string]any{},
				"webhook": map[string]any{},
				"webhook_endpoint": map[string]any{},
			},
		},
		"entity": map[string]any{
			"acquirer": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "configurations",
						"title": "Configurations",
						"type": "`$ARRAY`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$ARRAY`",
							},
						},
						"short": "The acquirer configuration settings.",
					},
					map[string]any{
						"name": "default",
						"title": "Default",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
						"short": "Specifies whether this Acquirer is the default.",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "The description of the acquirer configuration.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The unique identifier of the acquirer configuration.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The name of the acquirer configuration.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "acquirer",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/payments/acquirers",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "acquirers",
									},
								},
								"parts": []any{
									"payments",
									"acquirers",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "acquirer",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/payments/acquirers",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "acquirers",
									},
								},
								"parts": []any{
									"payments",
									"acquirers",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "page_size",
											"orig": "pageSize",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
									},
								},
								"select": map[string]any{
									"$action": "acquirer",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/payments/acquirers/{acquirer_id}",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "acquirers",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"payments",
									"acquirers",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"acquirer_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "acquirer_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/payments/acquirers/{acquirer_id}",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "acquirers",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"payments",
									"acquirers",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"acquirer_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "acquirer_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"bin_lookup": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "number",
						"title": "Number",
						"type": "`$STRING`",
						"req": true,
						"short": "The card number for which the BIN lookup is being requested.",
					},
				},
				"name": "bin_lookup",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/payments/bin-lookups",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "bin-lookups",
									},
								},
								"parts": []any{
									"payments",
									"bin-lookups",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"card": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address",
						"title": "Address",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Details about the cardholder's address that the address verification (AVS) is for.",
					},
					map[string]any{
						"name": "automaticUpdates",
						"title": "Automatic Updates",
						"type": "`$STRING`",
						"short": "The status of Card Account Updater on this card.",
					},
					map[string]any{
						"name": "bin",
						"title": "Bin",
						"type": "`$STRING`",
						"req": true,
						"short": "The first 6 or 8 digits of the card number.",
					},
					map[string]any{
						"name": "brand",
						"title": "Brand",
						"type": "`$STRING`",
						"short": "The card brand associated with the payment card.",
					},
					map[string]any{
						"name": "card",
						"title": "Card",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The card details.",
					},
					map[string]any{
						"name": "cardholder",
						"title": "Cardholder",
						"type": "`$OBJECT`",
						"short": "Details about the cardholder that the name verification (ANI) is for.",
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
						"short": "The country where the card was issued.",
						"format": "iso-3166-1-alpha-2",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The Unix timestamp of when the card was created.",
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
						"short": "The currency of the card.",
						"format": "iso-4217-alphabetic",
					},
					map[string]any{
						"name": "expiry",
						"title": "Expiry",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The expiry date of the card.",
					},
					map[string]any{
						"name": "extensions",
						"title": "Extensions",
						"type": "`$ARRAY`",
						"short": "The extensions to the card insight request.",
					},
					map[string]any{
						"name": "funding",
						"title": "Funding",
						"type": "`$STRING`",
						"short": "The card funding type specifies the method by which transactions are financed.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "The unique identifier for the card.",
					},
					map[string]any{
						"name": "issuer",
						"title": "Issuer",
						"type": "`$STRING`",
						"short": "The name of the card issuer.",
					},
					map[string]any{
						"name": "lastFour",
						"title": "Last Four",
						"type": "`$STRING`",
						"req": true,
						"short": "The last 4 digits of the card number.",
					},
					map[string]any{
						"name": "number",
						"title": "Number",
						"type": "`$STRING`",
						"req": true,
						"short": "The Evervault encrypted card number.",
					},
					map[string]any{
						"name": "replacement",
						"title": "Replacement",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The ID of the replacement card.",
					},
					map[string]any{
						"name": "segment",
						"title": "Segment",
						"type": "`$STRING`",
						"short": "The card segment indicates the primary market or usage category of the card.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "The current status of the card.",
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"short": "The Unix timestamp of when the card was last updated.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "card",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/payments/cards/{card_id}/simulate",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "cards",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "simulate",
									},
								},
								"parts": []any{
									"payments",
									"cards",
									"{id}",
									"simulate",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"card_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "card_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "simulate",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/insights/cards",
								"segments": []any{
									map[string]any{
										"lit": "insights",
									},
									map[string]any{
										"lit": "cards",
									},
								},
								"parts": []any{
									"insights",
									"cards",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/payments/cards",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "cards",
									},
								},
								"parts": []any{
									"payments",
									"cards",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/payments/cards/{card_id}",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "cards",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"payments",
									"cards",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"card_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "card_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"card_art": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$STRING`",
						"req": true,
						"short": "The base64-encoded image data of the card art.",
					},
					map[string]any{
						"name": "height",
						"title": "Height",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The height of the card art image in pixels.",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
						"short": "The MIME type of the card art image.",
					},
					map[string]any{
						"name": "width",
						"title": "Width",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The width of the card art image in pixels.",
					},
				},
				"name": "card_art",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/payments/network-tokens/{network_token_id}/card-art",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "network-tokens",
									},
									map[string]any{
										"var": "network_token_id",
									},
									map[string]any{
										"lit": "card-art",
									},
								},
								"parts": []any{
									"payments",
									"network-tokens",
									"{network_token_id}",
									"card-art",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "network_token_id",
											"orig": "network_token_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"network_token_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.network_token",
						},
					},
				},
			},
			"client_side_token": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "action",
						"title": "Action",
						"type": "`$STRING`",
						"req": true,
						"short": "The action that the token should permit",
					},
					map[string]any{
						"name": "expiry",
						"title": "Expiry",
						"type": "`$INTEGER`",
						"short": "The expiry of the token in milliseconds format.",
					},
					map[string]any{
						"name": "payload",
						"title": "Payload",
						"type": "`$OBJECT`",
						"short": "The payload that the token must be used with",
					},
				},
				"name": "client_side_token",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/client-side-tokens",
								"segments": []any{
									map[string]any{
										"lit": "client-side-tokens",
									},
								},
								"parts": []any{
									"client-side-tokens",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"core": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "category",
						"title": "Category",
						"type": "`$STRING`",
						"short": "The category or specific nature of the encrypted value.",
					},
					map[string]any{
						"name": "core_list",
						"title": "Core List",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$ARRAY`",
								"`$STRING`",
								"`$NUMBER`",
								"`$BOOLEAN`",
							},
						},
						"short": "A JSON value or file to be encrypted.",
					},
					map[string]any{
						"name": "cores",
						"title": "Cores",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$ARRAY`",
								"`$STRING`",
							},
						},
						"short": "A JSON value or file to be decrypted.",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$INTEGER`",
						"short": "The exact time, in epoch milliseconds, when this custom domain was created.",
						"format": "int64",
					},
					map[string]any{
						"name": "customDomain",
						"title": "Custom Domain",
						"type": "`$STRING`",
						"short": "The customer managed domain to which requests to be relayed to your domain should be sent.",
					},
					map[string]any{
						"name": "encryptedAt",
						"title": "Encrypted At",
						"type": "`$INTEGER`",
						"short": "The date and time when the value was encrypted.",
					},
					map[string]any{
						"name": "fingerprint",
						"title": "Fingerprint",
						"type": "`$STRING`",
						"short": "A unique identifier for the encrypted value.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "The unique identifier for the custom domain.",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$ANY`",
						"short": "Further metadata about the encrypted value.",
					},
					map[string]any{
						"name": "phoneNumber",
						"title": "Phone Number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "relay",
						"title": "Relay",
						"type": "`$STRING`",
						"short": "The ID of the Relay with which this custom domain is associated.",
					},
					map[string]any{
						"name": "role",
						"title": "Role",
						"type": "`$STRING`",
						"short": "The data role of the encrypted value.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "The status of the domains DNS verification.",
					},
					map[string]any{
						"name": "token",
						"title": "Token",
						"type": "`$STRING`",
						"req": true,
						"short": "The encrypted data to be inspected.",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "The type of the encrypted value.",
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$INTEGER`",
						"short": "The exact time, in epoch milliseconds, when this custom domain was last updated.",
						"format": "int64",
					},
					map[string]any{
						"name": "validationRecord",
						"title": "Validation Record",
						"type": "`$STRING`",
						"short": "Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain",
						"format": "uuidv4",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "core",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/decrypt",
								"segments": []any{
									map[string]any{
										"lit": "decrypt",
									},
								},
								"parts": []any{
									"decrypt",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata.cores`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"body": map[string]any{
									"alternatives": []any{
										map[string]any{
											"binary": true,
											"kind": "raw",
											"media": "application/octet-stream",
										},
									},
									"kind": "json",
									"media": "application/json",
								},
								"response": map[string]any{
									"alternatives": []any{
										map[string]any{
											"binary": true,
											"kind": "raw",
											"media": "application/octet-stream",
										},
									},
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/encrypt",
								"segments": []any{
									map[string]any{
										"lit": "encrypt",
									},
								},
								"parts": []any{
									"encrypt",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata.core_list`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"body": map[string]any{
									"alternatives": []any{
										map[string]any{
											"binary": true,
											"kind": "raw",
											"media": "application/octet-stream",
										},
									},
									"kind": "json",
									"media": "application/json",
								},
								"response": map[string]any{
									"alternatives": []any{
										map[string]any{
											"binary": true,
											"kind": "raw",
											"media": "application/octet-stream",
										},
									},
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/inspect",
								"segments": []any{
									map[string]any{
										"lit": "inspect",
									},
								},
								"parts": []any{
									"inspect",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/relays/{relay_id}/custom-domains",
								"segments": []any{
									map[string]any{
										"lit": "relays",
									},
									map[string]any{
										"var": "relay_id",
									},
									map[string]any{
										"lit": "custom-domains",
									},
								},
								"parts": []any{
									"relays",
									"{relay_id}",
									"custom-domains",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "relay_id",
											"orig": "relay_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"relay_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/relays/{relay_id}/custom-domains/{id}",
								"segments": []any{
									map[string]any{
										"lit": "relays",
									},
									map[string]any{
										"var": "relay_id",
									},
									map[string]any{
										"lit": "custom-domains",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"relays",
									"{relay_id}",
									"custom-domains",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "relay_id",
											"orig": "relay_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"relay_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/relays/{id}",
								"segments": []any{
									map[string]any{
										"lit": "relays",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"relays",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.relay",
						},
					},
				},
			},
			"custom_domain": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$INTEGER`",
						"short": "The exact time, in epoch milliseconds, when this custom domain was created.",
						"format": "int64",
					},
					map[string]any{
						"name": "customDomain",
						"title": "Custom Domain",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "The customer managed domain to which requests to be relayed to your domain should be sent.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "The unique identifier for the custom domain.",
					},
					map[string]any{
						"name": "relay",
						"title": "Relay",
						"type": "`$STRING`",
						"short": "The ID of the Relay with which this custom domain is associated.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "The status of the domains DNS verification.",
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$INTEGER`",
						"short": "The exact time, in epoch milliseconds, when this custom domain was last updated.",
						"format": "int64",
					},
					map[string]any{
						"name": "validationRecord",
						"title": "Validation Record",
						"type": "`$STRING`",
						"short": "Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain",
						"format": "uuidv4",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "custom_domain",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/relays/{relay_id}/custom-domains",
								"segments": []any{
									map[string]any{
										"lit": "relays",
									},
									map[string]any{
										"var": "relay_id",
									},
									map[string]any{
										"lit": "custom-domains",
									},
								},
								"parts": []any{
									"relays",
									"{relay_id}",
									"custom-domains",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "relay_id",
											"orig": "relay_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"relay_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/relays/{relay_id}/custom-domains/{id}",
								"segments": []any{
									map[string]any{
										"lit": "relays",
									},
									map[string]any{
										"var": "relay_id",
									},
									map[string]any{
										"lit": "custom-domains",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"relays",
									"{relay_id}",
									"custom-domains",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "relay_id",
											"orig": "relay_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"relay_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.relay",
						},
					},
				},
			},
			"function_run": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "async",
						"title": "Async",
						"type": "`$BOOLEAN`",
						"short": "If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code.",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$INTEGER`",
						"short": "The exact time, in epoch milliseconds, when this Function execution was triggered.",
						"format": "int64",
					},
					map[string]any{
						"name": "error",
						"title": "Error",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"short": "This field details any error that occurred during Function execution.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "A unique identifier representing this specific Function execution instance.",
					},
					map[string]any{
						"name": "payload",
						"title": "Payload",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The data payload that the Function will use during its execution.",
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$OBJECT`",
						"short": "This field represents the output returned by the Function.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "The outcome of the Function execution.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "function_run",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/functions/{function_name}/runs",
								"segments": []any{
									map[string]any{
										"lit": "functions",
									},
									map[string]any{
										"var": "function_name",
									},
									map[string]any{
										"lit": "runs",
									},
								},
								"parts": []any{
									"functions",
									"{function_name}",
									"runs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "function_name",
											"orig": "function_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"function_name",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"merchant": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "applePay",
						"title": "Apple Pay",
						"type": "`$OBJECT`",
						"short": "The Merchant's Apple Pay configuration.",
					},
					map[string]any{
						"name": "business",
						"title": "Business",
						"type": "`$OBJECT`",
						"short": "The business details of the Merchant.",
					},
					map[string]any{
						"name": "categoryCode",
						"title": "Category Code",
						"type": "`$STRING`",
						"short": "The 4-digit Merchant Category Code (MCC).",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The exact time, in epoch milliseconds, when this Merchant was created.",
						"format": "int64",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "A unique identifier assigned to each Merchant.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The official name of the Merchant as recognized in transactions and communications.",
					},
					map[string]any{
						"name": "networkTokens",
						"title": "Network Tokens",
						"type": "`$OBJECT`",
						"short": "The Merchant's Network Token configuration.",
					},
					map[string]any{
						"name": "shortName",
						"title": "Short Name",
						"type": "`$STRING`",
						"short": "A shorter version of the Merchant's name.",
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$INTEGER`",
						"short": "The exact time, in epoch milliseconds, when this Merchant was last updated.",
						"format": "int64",
					},
					map[string]any{
						"name": "website",
						"title": "Website",
						"type": "`$STRING`",
						"req": true,
						"short": "The official website URL of the Merchant.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "merchant",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/payments/merchants",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "merchants",
									},
								},
								"parts": []any{
									"payments",
									"merchants",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "merchant",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/payments/merchants",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "merchants",
									},
								},
								"parts": []any{
									"payments",
									"merchants",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "page_size",
											"orig": "pageSize",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "merchant",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/payments/merchants/{merchant_id}",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "merchants",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"payments",
									"merchants",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"merchant_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "merchant_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/payments/merchants/{merchant_id}",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "merchants",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"payments",
									"merchants",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"merchant_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "merchant_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"network_token": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "card",
						"title": "Card",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The details of the underlying encrypted card.",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The exact time, in epoch milliseconds, when this Network Token was created.",
						"format": "int64",
					},
					map[string]any{
						"name": "expiry",
						"title": "Expiry",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The expiry details of the Network Token.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "A unique identifier representing a specific Network Token.",
					},
					map[string]any{
						"name": "merchant",
						"title": "Merchant",
						"type": "`$STRING`",
						"req": true,
						"short": "The unique identifier of the Merchant associated with this Network Token.",
					},
					map[string]any{
						"name": "number",
						"title": "Number",
						"type": "`$STRING`",
						"req": true,
						"short": "The unique number of the Network Token.",
					},
					map[string]any{
						"name": "paymentAccountReference",
						"title": "Payment Account Reference",
						"type": "`$STRING`",
						"short": "The unique identifier of the Payment Account associated with this Network Token.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
						"short": "The status of the Network Token.",
					},
					map[string]any{
						"name": "tokenRequestorIdentifier",
						"title": "Token Requestor Identifier",
						"type": "`$STRING`",
						"req": true,
						"short": "The identifier of the Token Requestor (TRID) that requested the Network Token.",
					},
					map[string]any{
						"name": "tokenServiceProvider",
						"title": "Token Service Provider",
						"type": "`$STRING`",
						"req": true,
						"short": "The Token Service Provider (TSP) that issued the Network Token.",
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$INTEGER`",
						"short": "The exact time, in epoch milliseconds, when this Network Token was last updated.",
						"format": "int64",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "network_token",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/payments/network-tokens/{network_token_id}/simulate",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "network-tokens",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "simulate",
									},
								},
								"parts": []any{
									"payments",
									"network-tokens",
									"{id}",
									"simulate",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"network_token_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "network_token_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "simulate",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/payments/network-tokens",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "network-tokens",
									},
								},
								"parts": []any{
									"payments",
									"network-tokens",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/payments/network-tokens/{network_token_id}",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "network-tokens",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"payments",
									"network-tokens",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"network_token_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "network_token_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"network_token_cryptogram": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "cryptogram",
						"title": "Cryptogram",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "network_token_cryptogram",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/payments/network-tokens/{network_token_id}/cryptograms",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "network-tokens",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "cryptograms",
									},
								},
								"parts": []any{
									"payments",
									"network-tokens",
									"{id}",
									"cryptograms",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"network_token_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "network_token_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"payment": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$INTEGER`",
						"short": "Timestamp when the message was created",
					},
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$OBJECT`",
						"short": "The message data payload",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes)",
					},
				},
				"name": "payment",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/payments/3ds-sessions/{3ds_session_id}/messages",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "3ds-sessions",
									},
									map[string]any{
										"var": "3ds_session_id",
									},
									map[string]any{
										"lit": "messages",
									},
								},
								"parts": []any{
									"payments",
									"3ds-sessions",
									"{3ds_session_id}",
									"messages",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.messages`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "3ds_session_id",
											"orig": "3ds_session_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"3ds_session_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/payments/acquirers/{acquirer_id}",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "acquirers",
									},
									map[string]any{
										"var": "acquirer_id",
									},
								},
								"parts": []any{
									"payments",
									"acquirers",
									"{acquirer_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "acquirer_id",
											"orig": "acquirer_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"acquirer_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/payments/cards/{card_id}",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "cards",
									},
									map[string]any{
										"var": "card_id",
									},
								},
								"parts": []any{
									"payments",
									"cards",
									"{card_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "card_id",
											"orig": "card_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"card_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/payments/merchants/{merchant_id}",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "merchants",
									},
									map[string]any{
										"var": "merchant_id",
									},
								},
								"parts": []any{
									"payments",
									"merchants",
									"{merchant_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "merchant_id",
											"orig": "merchant_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"merchant_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/payments/network-tokens/{network_token_id}",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "network-tokens",
									},
									map[string]any{
										"var": "network_token_id",
									},
								},
								"parts": []any{
									"payments",
									"network-tokens",
									"{network_token_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "network_token_id",
											"orig": "network_token_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"network_token_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.acquirer",
						},
						[]any{
							"$.main.kit.entity.card",
						},
						[]any{
							"$.main.kit.entity.merchant",
						},
						[]any{
							"$.main.kit.entity.network_token",
						},
					},
				},
			},
			"relay": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "app",
						"title": "App",
						"type": "`$STRING`",
						"short": "The unique identifier for the app to which the Relay belongs.",
					},
					map[string]any{
						"name": "authentication",
						"title": "Authentication",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The type of authentication required for the Relay",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$INTEGER`",
						"short": "The exact time, in epoch milliseconds, when this Relay was created.",
						"format": "int64",
					},
					map[string]any{
						"name": "destinationDomain",
						"title": "Destination Domain",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "The domain in front of which the Relay should be configured.",
					},
					map[string]any{
						"name": "encryptEmptyStrings",
						"title": "Encrypt Empty Strings",
						"type": "`$BOOLEAN`",
						"short": "Whether or not empty strings should be encrypted.",
					},
					map[string]any{
						"name": "evervaultDomain",
						"title": "Evervault Domain",
						"type": "`$STRING`",
						"short": "The Evervault managed domain to which requests to be relayed to the destination domain should be sent.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "The unique identifier for the Relay.",
					},
					map[string]any{
						"name": "routes",
						"title": "Routes",
						"type": "`$ARRAY`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$ARRAY`",
							},
						},
						"short": "A collection of route configurations for the Relay.",
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$INTEGER`",
						"short": "The exact time, in epoch milliseconds, when this Relay was updated.",
						"format": "int64",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "relay",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/relays",
								"segments": []any{
									map[string]any{
										"lit": "relays",
									},
								},
								"parts": []any{
									"relays",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/relays",
								"segments": []any{
									map[string]any{
										"lit": "relays",
									},
								},
								"parts": []any{
									"relays",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/relays/{id}",
								"segments": []any{
									map[string]any{
										"lit": "relays",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"relays",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/relays/{id}",
								"segments": []any{
									map[string]any{
										"lit": "relays",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"relays",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"three_ds_session": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "accessControlServer",
						"title": "Access Control Server",
						"type": "`$OBJECT`",
						"short": "Details about the Access Control Server involved in the 3DS transaction.",
					},
					map[string]any{
						"name": "acquirer",
						"title": "Acquirer",
						"type": "`$OBJECT`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ANY`",
							},
						},
						"short": "The acquirer of the payment.",
					},
					map[string]any{
						"name": "ares",
						"title": "Ares",
						"type": "`$OBJECT`",
						"short": "The details of the 3DS Authentication Response (ARes).",
					},
					map[string]any{
						"name": "authentication",
						"title": "Authentication",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The details of the 3DS Authentication.",
					},
					map[string]any{
						"name": "card",
						"title": "Card",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The card details.",
					},
					map[string]any{
						"name": "challenge",
						"title": "Challenge",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Details about the 3DS challenge.",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The exact time, in epoch milliseconds, when this 3DS-Session was created.",
						"format": "int64",
					},
					map[string]any{
						"name": "cres",
						"title": "Cres",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NULL`",
								"`$OBJECT`",
							},
						},
						"short": "The details of the 3DS Challenge Response (CRes).",
					},
					map[string]any{
						"name": "cryptogram",
						"title": "Cryptogram",
						"type": "`$STRING`",
						"short": "The 3DS cryptogram (also called Authentication Value).",
					},
					map[string]any{
						"name": "customer",
						"title": "Customer",
						"type": "`$OBJECT`",
						"short": "The details of the customer who initiated the transaction.",
					},
					map[string]any{
						"name": "directoryServer",
						"title": "Directory Server",
						"type": "`$OBJECT`",
						"short": "Details about the Directory Server involved in the 3DS transaction.",
					},
					map[string]any{
						"name": "eci",
						"title": "Eci",
						"type": "`$OBJECT`",
						"short": "The details of the Electronic Commerce Indicator.",
					},
					map[string]any{
						"name": "failureReason",
						"title": "Failure Reason",
						"type": "`$STRING`",
						"short": "The reason for the 3DS Authentication failure.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "A unique identifier assigned to each 3DS Authentication.",
					},
					map[string]any{
						"name": "initiator",
						"title": "Initiator",
						"type": "`$OBJECT`",
						"short": "Details about the transaction initiation process.",
					},
					map[string]any{
						"name": "merchant",
						"title": "Merchant",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The merchant details.",
					},
					map[string]any{
						"name": "nextAction",
						"title": "Next Action",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The next action required to complete the 3DS Authentication.",
					},
					map[string]any{
						"name": "payment",
						"title": "Payment",
						"type": "`$OBJECT`",
						"short": "The payment details of the 3D Secure Authentication.",
					},
					map[string]any{
						"name": "preferredVersions",
						"title": "Preferred Versions",
						"type": "`$ARRAY`",
						"short": "A prioritized list of preferred 3D Secure versions.",
					},
					map[string]any{
						"name": "rreq",
						"title": "Rreq",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NULL`",
								"`$OBJECT`",
							},
						},
						"short": "The result of the 3DS authentication when a challenge has occurred.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
						"short": "The status of the 3DS Authentication.",
					},
					map[string]any{
						"name": "threeDSServer",
						"title": "Three Ds Server",
						"type": "`$OBJECT`",
						"short": "Details about the 3DS Server involved in the 3DS transaction.",
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$INTEGER`",
						"short": "The exact time, in epoch milliseconds, when this 3DS-Session was last updated.",
						"format": "int64",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
						"req": true,
						"short": "The 3D Secure version used to authenticate the session.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "three_ds_session",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/payments/3ds-sessions",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "3ds-sessions",
									},
								},
								"parts": []any{
									"payments",
									"3ds-sessions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/payments/3ds-sessions/{3ds_session_id}",
								"segments": []any{
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "3ds-sessions",
									},
									map[string]any{
										"var": "3ds_session_id",
									},
								},
								"parts": []any{
									"payments",
									"3ds-sessions",
									"{3ds_session_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "3ds_session_id",
											"orig": "3ds_session_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"3ds_session_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"webhook": map[string]any{
				"fields": []any{},
				"name": "webhook",
				"op": map[string]any{
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/webhook-endpoints/{webhook_endpoint_id}",
								"segments": []any{
									map[string]any{
										"lit": "webhook-endpoints",
									},
									map[string]any{
										"var": "webhook_endpoint_id",
									},
								},
								"parts": []any{
									"webhook-endpoints",
									"{webhook_endpoint_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "webhook_endpoint_id",
											"orig": "webhook_endpoint_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "webhook_endpoint_eead1d640d7c",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"webhook_endpoint_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.webhook_endpoint",
						},
					},
				},
			},
			"webhook_endpoint": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$INTEGER`",
						"short": "The exact time, in epoch milliseconds, when this Webhook Endpoint was created.",
						"format": "int64",
					},
					map[string]any{
						"name": "events",
						"title": "Events",
						"type": "`$ARRAY`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$ARRAY`",
							},
							"update": map[string]any{
								"req": true,
								"type": "`$ARRAY`",
							},
						},
						"short": "A list of Events that the Webhook Endpoint is subscribed to.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "A unique identifier representing a specific Webhook Endpoint.",
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"short": "The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated.",
						"format": "int64",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "The URL of the Webhook Endpoint.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "webhook_endpoint",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/webhook-endpoints",
								"segments": []any{
									map[string]any{
										"lit": "webhook-endpoints",
									},
								},
								"parts": []any{
									"webhook-endpoints",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/webhook-endpoints",
								"segments": []any{
									map[string]any{
										"lit": "webhook-endpoints",
									},
								},
								"parts": []any{
									"webhook-endpoints",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "starting_after",
											"orig": "startingAfter",
											"type": "`$STRING`",
											"kind": "query",
											"example": "webhook_endpoint_wd7c640d1daee",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/webhook-endpoints/{webhook_endpoint_id}",
								"segments": []any{
									map[string]any{
										"lit": "webhook-endpoints",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"webhook-endpoints",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webhook_endpoint_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webhook_endpoint_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "webhook_endpoint_eead1d640d7c",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/webhook-endpoints/{webhook_endpoint_id}",
								"segments": []any{
									map[string]any{
										"lit": "webhook-endpoints",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"webhook-endpoints",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webhook_endpoint_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webhook_endpoint_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "webhook_endpoint_eead1d640d7c",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
