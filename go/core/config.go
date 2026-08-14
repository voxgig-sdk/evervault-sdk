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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$ARRAY`",
							},
						},
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "default",
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$BOOLEAN`",
							},
							"update": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "acquirer",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/payments/acquirers",
								"parts": []any{
									"payments",
									"acquirers",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "acquirer_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/payments/acquirers/{acquirer_id}",
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "acquirer_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/payments/acquirers/{acquirer_id}",
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "bin_lookup",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/payments/bin-lookups",
								"parts": []any{
									"payments",
									"bin-lookups",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "card",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "cardholder",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "expiry",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "extensions",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "month",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "number",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "year",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "card",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "card_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/payments/cards/{card_id}/simulate",
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
								"select": map[string]any{
									"$action": "simulate",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.expiry`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/insights/cards",
								"parts": []any{
									"insights",
									"cards",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
										"card": "`reqdata`",
									},
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/payments/cards",
								"parts": []any{
									"payments",
									"cards",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.expiry`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "card_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/payments/cards/{card_id}",
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.expiry`",
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
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "height",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "type",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "width",
						"req": true,
						"type": "`$INTEGER`",
					},
				},
				"name": "card_art",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "network_token_id",
											"orig": "network_token_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/payments/network-tokens/{network_token_id}/card-art",
								"parts": []any{
									"payments",
									"network-tokens",
									"{network_token_id}",
									"card-art",
								},
								"select": map[string]any{
									"exist": []any{
										"network_token_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"network_token",
						},
					},
				},
			},
			"client_side_token": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "action",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expiry",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "payload",
						"type": "`$OBJECT`",
					},
				},
				"name": "client_side_token",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/client-side-tokens",
								"parts": []any{
									"client-side-tokens",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"name": "app",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "authentication",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "createdAt",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "customDomain",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "destinationDomain",
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "encryptEmptyStrings",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "evervaultDomain",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phoneNumber",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "relay",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "routes",
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$ARRAY`",
							},
						},
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "token",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updatedAt",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "validationRecord",
						"type": "`$STRING`",
					},
				},
				"name": "core",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/decrypt",
								"parts": []any{
									"decrypt",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/encrypt",
								"parts": []any{
									"encrypt",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/inspect",
								"parts": []any{
									"inspect",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.metadata`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/relays",
								"parts": []any{
									"relays",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "relay_id",
											"orig": "relay_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/relays/{relay_id}/custom-domains",
								"parts": []any{
									"relays",
									"{relay_id}",
									"custom-domains",
								},
								"select": map[string]any{
									"exist": []any{
										"relay_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/relays",
								"parts": []any{
									"relays",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "relay_id",
											"orig": "relay_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/relays/{relay_id}/custom-domains/{id}",
								"parts": []any{
									"relays",
									"{relay_id}",
									"custom-domains",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"relay_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/relays/{id}",
								"parts": []any{
									"relays",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"relay",
						},
					},
				},
			},
			"custom_domain": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "customDomain",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "relay",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updatedAt",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "validationRecord",
						"type": "`$STRING`",
					},
				},
				"name": "custom_domain",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "relay_id",
											"orig": "relay_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/relays/{relay_id}/custom-domains",
								"parts": []any{
									"relays",
									"{relay_id}",
									"custom-domains",
								},
								"select": map[string]any{
									"exist": []any{
										"relay_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "relay_id",
											"orig": "relay_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/relays/{relay_id}/custom-domains/{id}",
								"parts": []any{
									"relays",
									"{relay_id}",
									"custom-domains",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"relay_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"relay",
						},
					},
				},
			},
			"function_run": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "async",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "createdAt",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "error",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "payload",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "result",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
				},
				"name": "function_run",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "function_name",
											"orig": "function_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/functions/{function_name}/runs",
								"parts": []any{
									"functions",
									"{function_name}",
									"runs",
								},
								"select": map[string]any{
									"exist": []any{
										"function_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"function",
						},
					},
				},
			},
			"merchant": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "applePay",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "business",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$OBJECT`",
							},
						},
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "categoryCode",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "createdAt",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "networkTokens",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "shortName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updatedAt",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "website",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "merchant",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/payments/merchants",
								"parts": []any{
									"payments",
									"merchants",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "merchant_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/payments/merchants/{merchant_id}",
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "merchant_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/payments/merchants/{merchant_id}",
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "createdAt",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "expiry",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "merchant",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "number",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "paymentAccountReference",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tokenRequestorIdentifier",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tokenServiceProvider",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updateType",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updatedAt",
						"type": "`$INTEGER`",
					},
				},
				"name": "network_token",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "network_token_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/payments/network-tokens/{network_token_id}/simulate",
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
								"select": map[string]any{
									"$action": "simulate",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/payments/network-tokens",
								"parts": []any{
									"payments",
									"network-tokens",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "network_token_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/payments/network-tokens/{network_token_id}",
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "cryptogram",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"name": "network_token_cryptogram",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "network_token_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/payments/network-tokens/{network_token_id}/cryptograms",
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"name": "applePay",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "business",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "categoryCode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "configurations",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "createdAt",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "created_at",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "data",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "default",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "networkTokens",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "shortName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updatedAt",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "website",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "payment",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/payments/merchants",
								"parts": []any{
									"payments",
									"merchants",
								},
								"select": map[string]any{
									"$action": "merchant",
									"exist": []any{
										"page",
										"page_size",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/payments/acquirers",
								"parts": []any{
									"payments",
									"acquirers",
								},
								"select": map[string]any{
									"$action": "acquirer",
									"exist": []any{
										"page",
										"page_size",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "3ds_session_id",
											"orig": "3ds_session_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/payments/3ds-sessions/{3ds_session_id}/messages",
								"parts": []any{
									"payments",
									"3ds-sessions",
									"{3ds_session_id}",
									"messages",
								},
								"select": map[string]any{
									"exist": []any{
										"3ds_session_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.messages`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "acquirer_id",
											"orig": "acquirer_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/payments/acquirers/{acquirer_id}",
								"parts": []any{
									"payments",
									"acquirers",
									"{acquirer_id}",
								},
								"select": map[string]any{
									"exist": []any{
										"acquirer_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "card_id",
											"orig": "card_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/payments/cards/{card_id}",
								"parts": []any{
									"payments",
									"cards",
									"{card_id}",
								},
								"select": map[string]any{
									"exist": []any{
										"card_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "merchant_id",
											"orig": "merchant_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/payments/merchants/{merchant_id}",
								"parts": []any{
									"payments",
									"merchants",
									"{merchant_id}",
								},
								"select": map[string]any{
									"exist": []any{
										"merchant_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "network_token_id",
											"orig": "network_token_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/payments/network-tokens/{network_token_id}",
								"parts": []any{
									"payments",
									"network-tokens",
									"{network_token_id}",
								},
								"select": map[string]any{
									"exist": []any{
										"network_token_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"3ds_session",
						},
						[]any{
							"acquirer",
						},
						[]any{
							"card",
						},
						[]any{
							"merchant",
						},
						[]any{
							"network_token",
						},
					},
				},
			},
			"relay": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "app",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "authentication",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "createdAt",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "destinationDomain",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "encryptEmptyStrings",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "evervaultDomain",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "routes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "updatedAt",
						"type": "`$INTEGER`",
					},
				},
				"name": "relay",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/relays/{id}",
								"parts": []any{
									"relays",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/relays/{id}",
								"parts": []any{
									"relays",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "acquirer",
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ANY`",
							},
						},
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "ares",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "authentication",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "card",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "challenge",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "createdAt",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "cres",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NULL`",
								"`$OBJECT`",
							},
						},
					},
					map[string]any{
						"name": "cryptogram",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "customer",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "directoryServer",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "eci",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "failureReason",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "initiator",
						"type": "`$OBJECT`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 0,
						},
					},
					map[string]any{
						"name": "merchant",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "nextAction",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "payment",
						"type": "`$OBJECT`",
						"union": map[string]any{
							"branches": 3,
							"count": 1,
							"depth": 0,
						},
					},
					map[string]any{
						"name": "preferredVersions",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "rreq",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NULL`",
								"`$OBJECT`",
							},
						},
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "threeDSServer",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "updatedAt",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "version",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "three_ds_session",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/payments/3ds-sessions",
								"parts": []any{
									"payments",
									"3ds-sessions",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "3ds_session_id",
											"orig": "3ds_session_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/payments/3ds-sessions/{3ds_session_id}",
								"parts": []any{
									"payments",
									"3ds-sessions",
									"{3ds_session_id}",
								},
								"select": map[string]any{
									"exist": []any{
										"3ds_session_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"3ds_session",
						},
					},
				},
			},
			"webhook": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "events",
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$ARRAY`",
							},
						},
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updatedAt",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "url",
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "webhook",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/webhook-endpoints",
								"parts": []any{
									"webhook-endpoints",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "webhook_endpoint_wd7c640d1daee",
											"kind": "query",
											"name": "starting_after",
											"orig": "starting_after",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/webhook-endpoints",
								"parts": []any{
									"webhook-endpoints",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"starting_after",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "webhook_endpoint_eead1d640d7c",
											"kind": "param",
											"name": "webhook_endpoint_id",
											"orig": "webhook_endpoint_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/webhook-endpoints/{webhook_endpoint_id}",
								"parts": []any{
									"webhook-endpoints",
									"{webhook_endpoint_id}",
								},
								"select": map[string]any{
									"exist": []any{
										"webhook_endpoint_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"webhook_endpoint",
						},
					},
				},
			},
			"webhook_endpoint": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "events",
						"op": map[string]any{
							"update": map[string]any{
								"req": true,
								"type": "`$ARRAY`",
							},
						},
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updatedAt",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"name": "webhook_endpoint",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "webhook_endpoint_eead1d640d7c",
											"kind": "param",
											"name": "id",
											"orig": "webhook_endpoint_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/webhook-endpoints/{webhook_endpoint_id}",
								"parts": []any{
									"webhook-endpoints",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webhook_endpoint_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "webhook_endpoint_eead1d640d7c",
											"kind": "param",
											"name": "id",
											"orig": "webhook_endpoint_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/webhook-endpoints/{webhook_endpoint_id}",
								"parts": []any{
									"webhook-endpoints",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webhook_endpoint_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
