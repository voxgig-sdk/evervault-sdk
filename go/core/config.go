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
			"version": "0.0.1",
			"target": "go",
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
						"short": "The acquirer configuration settings.",
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
						"short": "Specifies whether this Acquirer is the default.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "description",
						"short": "The description of the acquirer configuration.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "The unique identifier of the acquirer configuration.",
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
						"short": "The name of the acquirer configuration.",
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
						"short": "The card number for which the BIN lookup is being requested.",
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
						"short": "Details about the cardholder's address that the address verification (AVS) is for.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "card",
						"req": true,
						"short": "The card details.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "cardholder",
						"short": "Details about the cardholder that the name verification (ANI) is for.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "expiry",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "extensions",
						"short": "The extensions to the card insight request.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "month",
						"req": true,
						"short": "The card expiry month, in MM format (e.g.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "number",
						"req": true,
						"short": "The card number.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "year",
						"req": true,
						"short": "The card expiry year, in YY format (e.g.",
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
						"short": "The base64-encoded image data of the card art.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "height",
						"req": true,
						"short": "The height of the card art image in pixels.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "type",
						"req": true,
						"short": "The MIME type of the card art image.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "width",
						"req": true,
						"short": "The width of the card art image in pixels.",
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
						"short": "The action that the token should permit",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expiry",
						"short": "The expiry of the token in milliseconds format.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "payload",
						"short": "The payload that the token must be used with",
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
						"short": "The unique identifier for the app to which the Relay belongs.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "authentication",
						"short": "The type of authentication required for the Relay",
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
						"short": "The exact time, in epoch milliseconds, when this custom domain was created.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "customDomain",
						"short": "The customer managed domain to which requests to be relayed to your domain should be sent.",
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
						"short": "The domain in front of which you would like to configure a Relay",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "encryptEmptyStrings",
						"short": "Whether or not empty strings should be encrypted.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "evervaultDomain",
						"short": "The Evervault managed domain to which requests to be relayed to the destination domain should be sent.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "The unique identifier for the custom domain.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phoneNumber",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "relay",
						"short": "The ID of the Relay with which this custom domain is associated.",
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
						"short": "A collection of route configurations for the Relay.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "status",
						"short": "The status of the domains DNS verification.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "token",
						"req": true,
						"short": "The encrypted data to be inspected.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updatedAt",
						"short": "The exact time, in epoch milliseconds, when this custom domain was last updated.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "validationRecord",
						"short": "Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain",
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
						"short": "The exact time, in epoch milliseconds, when this custom domain was created.",
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
						"short": "The customer managed domain to which requests to be relayed to your domain should be sent.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "The unique identifier for the custom domain.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "relay",
						"short": "The ID of the Relay with which this custom domain is associated.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"short": "The status of the domains DNS verification.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updatedAt",
						"short": "The exact time, in epoch milliseconds, when this custom domain was last updated.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "validationRecord",
						"short": "Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain",
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
						"short": "If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "createdAt",
						"short": "The exact time, in epoch milliseconds, when this Function execution was triggered.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "error",
						"short": "This field details any error that occurred during Function execution.",
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
						"short": "A unique identifier representing this specific Function execution instance.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "payload",
						"req": true,
						"short": "The data payload that the Function will use during its execution.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "result",
						"short": "This field represents the output returned by the Function.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "status",
						"short": "The outcome of the Function execution.",
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
						"short": "The Merchant's Apple Pay configuration.",
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
						"short": "The business details of the Merchant.",
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
						"short": "The 4-digit Merchant Category Code (MCC).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "createdAt",
						"req": true,
						"short": "The exact time, in epoch milliseconds, when this Merchant was created.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "A unique identifier assigned to each Merchant.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "The official name of the Merchant as recognized in transactions and communications.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "networkTokens",
						"short": "The Merchant's Network Token configuration.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "shortName",
						"short": "A shorter version of the Merchant's name.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updatedAt",
						"short": "The exact time, in epoch milliseconds, when this Merchant was last updated.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "website",
						"req": true,
						"short": "The official website URL of the Merchant.",
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
						"short": "The details of the underlying encrypted card.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "createdAt",
						"req": true,
						"short": "The exact time, in epoch milliseconds, when this Network Token was created.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "expiry",
						"req": true,
						"short": "The expiry details of the Network Token.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "A unique identifier representing a specific Network Token.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "merchant",
						"req": true,
						"short": "The unique identifier of the Merchant associated with this Network Token.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "number",
						"req": true,
						"short": "The unique number of the Network Token.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "paymentAccountReference",
						"short": "The unique identifier of the Payment Account associated with this Network Token.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"short": "The status of the Network Token.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tokenRequestorIdentifier",
						"req": true,
						"short": "The identifier of the Token Requestor (TRID) that requested the Network Token.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tokenServiceProvider",
						"req": true,
						"short": "The Token Service Provider (TSP) that issued the Network Token.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updateType",
						"short": "The type of update to simulate.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updatedAt",
						"short": "The exact time, in epoch milliseconds, when this Network Token was last updated.",
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
						"short": "The Merchant's Apple Pay configuration.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "business",
						"short": "The business details of the Merchant.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "categoryCode",
						"short": "The 4-digit Merchant Category Code (MCC).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "configurations",
						"req": true,
						"short": "The acquirer configuration settings.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "createdAt",
						"req": true,
						"short": "The exact time, in epoch milliseconds, when this Merchant was created.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "created_at",
						"short": "Timestamp when the message was created",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "data",
						"short": "The message data payload",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "default",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "description",
						"short": "The description of the acquirer configuration.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "A unique identifier assigned to each Merchant.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "The official name of the Merchant as recognized in transactions and communications.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "networkTokens",
						"short": "The Merchant's Network Token configuration.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "shortName",
						"short": "A shorter version of the Merchant's name.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updatedAt",
						"short": "The exact time, in epoch milliseconds, when this Merchant was last updated.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "website",
						"req": true,
						"short": "The official website URL of the Merchant.",
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
						"short": "The unique identifier for the app to which the Relay belongs.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "authentication",
						"short": "The type of authentication required for the Relay",
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
						"short": "The exact time, in epoch milliseconds, when this Relay was created.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "destinationDomain",
						"short": "The domain in front of which the Relay should be configured.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "encryptEmptyStrings",
						"short": "Whether or not empty strings should be encrypted.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "evervaultDomain",
						"short": "The Evervault managed domain to which requests to be relayed to the destination domain should be sent.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "The unique identifier for the Relay.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "routes",
						"short": "A collection of route configurations for the Relay.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "updatedAt",
						"short": "The exact time, in epoch milliseconds, when this Relay was updated.",
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
						"short": "Details about the Access Control Server involved in the 3DS transaction.",
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
						"short": "The acquirer of the payment.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "ares",
						"short": "The details of the 3DS Authentication Response (ARes).",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "authentication",
						"req": true,
						"short": "The details of the 3DS Authentication.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "card",
						"req": true,
						"short": "The card details.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "challenge",
						"req": true,
						"short": "Details about the 3DS challenge.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "createdAt",
						"req": true,
						"short": "The exact time, in epoch milliseconds, when this 3DS-Session was created.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "cres",
						"short": "The details of the 3DS Challenge Response (CRes).",
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
						"short": "The 3DS cryptogram (also called Authentication Value).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "customer",
						"short": "The details of the customer who initiated the transaction.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "directoryServer",
						"short": "Details about the Directory Server involved in the 3DS transaction.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "eci",
						"short": "The details of the Electronic Commerce Indicator.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "failureReason",
						"short": "The reason for the 3DS Authentication failure.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "A unique identifier assigned to each 3DS Authentication.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "initiator",
						"short": "Details about the transaction initiation process.",
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
						"short": "The merchant details.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "nextAction",
						"req": true,
						"short": "The next action required to complete the 3DS Authentication.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "payment",
						"short": "The payment details of the 3D Secure Authentication.",
						"type": "`$OBJECT`",
						"union": map[string]any{
							"branches": 3,
							"count": 1,
							"depth": 0,
						},
					},
					map[string]any{
						"name": "preferredVersions",
						"short": "A prioritized list of preferred 3D Secure versions.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "rreq",
						"short": "The result of the 3DS authentication when a challenge has occurred.",
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
						"short": "The status of the 3DS Authentication.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "threeDSServer",
						"short": "Details about the 3DS Server involved in the 3DS transaction.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "updatedAt",
						"short": "The exact time, in epoch milliseconds, when this 3DS-Session was last updated.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "version",
						"req": true,
						"short": "The 3D Secure version used to authenticate the session.",
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
						"short": "The exact time, in epoch milliseconds, when this Webhook Endpoint was created.",
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
						"short": "A list of Events that the Webhook Endpoint should subscribe to.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"short": "A unique identifier representing a specific Webhook Endpoint.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updatedAt",
						"short": "The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated.",
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
						"short": "The URL of the Webhook Endpoint.",
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
						"short": "The exact time, in epoch milliseconds, when this Webhook Endpoint was created.",
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
						"short": "A list of Events that the Webhook Endpoint is subscribed to.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"short": "A unique identifier representing a specific Webhook Endpoint.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updatedAt",
						"short": "The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated.",
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
						"short": "The URL of the Webhook Endpoint.",
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
