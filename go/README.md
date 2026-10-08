# Evervault Golang SDK



The Golang SDK for the Evervault API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Acquirer(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/evervault-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/evervault-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/evervault-sdk/go=../evervault-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/evervault-sdk/go"
)

func main() {
    client := sdk.NewEvervaultSDK(map[string]any{
        "apikey": os.Getenv("EVERVAULT_APIKEY"),
    })

    // List acquirer records — the value is a []any of entities, one per record.
    acquirers, err := client.Acquirer(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range acquirers.([]any) {
        fmt.Println(item.(sdk.Entity).Data())
    }

    // Load a single acquirer — the value is the entity; Data() reads its record.
    acquirer, err := client.Acquirer(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(acquirer.(sdk.Entity).Data())

    // Create a acquirer.
    created, err := client.Acquirer(nil).Create(map[string]any{"configurations": []any{}, "default": true, "id": "example_id", "name": "example_name"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created.(sdk.Entity).Data())

    // Update a acquirer.
    updated, err := client.Acquirer(nil).Update(map[string]any{"id": "example_id", "configurations": []any{}, "default": true}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(updated.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
merchants, err := client.Merchant(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = merchants
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

merchants, err := client.Merchant(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
// A []any of entities, one per mock record.
for _, item := range merchants.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewEvervaultSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
EVERVAULT_TEST_LIVE=TRUE
EVERVAULT_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewEvervaultSDK

```go
func NewEvervaultSDK(options map[string]any) *EvervaultSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *EvervaultSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### EvervaultSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Acquirer` | `(data map[string]any) EvervaultEntity` | Create an Acquirer entity instance. |
| `BinLookup` | `(data map[string]any) EvervaultEntity` | Create a BinLookup entity instance. |
| `Card` | `(data map[string]any) EvervaultEntity` | Create a Card entity instance. |
| `CardArt` | `(data map[string]any) EvervaultEntity` | Create a CardArt entity instance. |
| `ClientSideToken` | `(data map[string]any) EvervaultEntity` | Create a ClientSideToken entity instance. |
| `Core` | `(data map[string]any) EvervaultEntity` | Create a Core entity instance. |
| `CustomDomain` | `(data map[string]any) EvervaultEntity` | Create a CustomDomain entity instance. |
| `FunctionRun` | `(data map[string]any) EvervaultEntity` | Create a FunctionRun entity instance. |
| `Merchant` | `(data map[string]any) EvervaultEntity` | Create a Merchant entity instance. |
| `NetworkToken` | `(data map[string]any) EvervaultEntity` | Create a NetworkToken entity instance. |
| `NetworkTokenCryptogram` | `(data map[string]any) EvervaultEntity` | Create a NetworkTokenCryptogram entity instance. |
| `Payment` | `(data map[string]any) EvervaultEntity` | Create a Payment entity instance. |
| `Relay` | `(data map[string]any) EvervaultEntity` | Create a Relay entity instance. |
| `ThreeDsSession` | `(data map[string]any) EvervaultEntity` | Create a ThreeDsSession entity instance. |
| `Webhook` | `(data map[string]any) EvervaultEntity` | Create a Webhook entity instance. |
| `WebhookEndpoint` | `(data map[string]any) EvervaultEntity` | Create a WebhookEndpoint entity instance. |

### Entity interface (EvervaultEntity)

All entities implement the `EvervaultEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity, and return it. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity, and return it. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity, and return it marked as deleted. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    acquirer, err := client.Acquirer(nil).List(nil, nil)
    if err != nil { /* handle */ }
    // acquirer is a []any of entities, one per record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Acquirer

| Field | Description |
| --- | --- |
| `"configurations"` | The acquirer configuration settings. |
| `"default"` | Specifies whether this Acquirer is the default. |
| `"description"` | The description of the acquirer configuration. |
| `"id"` | The unique identifier of the acquirer configuration. |
| `"name"` | The name of the acquirer configuration. |

Operations: Create, List, Load, Update.

API path: `/payments/acquirers`

#### BinLookup

| Field | Description |
| --- | --- |
| `"number"` | The card number for which the BIN lookup is being requested. |

Operations: Create.

API path: `/payments/bin-lookups`

#### Card

| Field | Description |
| --- | --- |
| `"address"` | Details about the cardholder's address that the address verification (AVS) is for. |
| `"automaticUpdates"` | The status of Card Account Updater on this card. |
| `"bin"` | The first 6 or 8 digits of the card number. |
| `"brand"` | The card brand associated with the payment card. |
| `"card"` | The card details. |
| `"cardholder"` | Details about the cardholder that the name verification (ANI) is for. |
| `"country"` | The country where the card was issued. |
| `"createdAt"` | The Unix timestamp of when the card was created. |
| `"currency"` | The currency of the card. |
| `"expiry"` | The expiry date of the card. |
| `"extensions"` | The extensions to the card insight request. |
| `"funding"` | The card funding type specifies the method by which transactions are financed. |
| `"id"` | The unique identifier for the card. |
| `"issuer"` | The name of the card issuer. |
| `"lastFour"` | The last 4 digits of the card number. |
| `"number"` | The Evervault encrypted card number. |
| `"replacement"` | The ID of the replacement card. |
| `"segment"` | The card segment indicates the primary market or usage category of the card. |
| `"status"` | The current status of the card. |
| `"updatedAt"` | The Unix timestamp of when the card was last updated. |

Operations: Create, Load.

API path: `/payments/cards/{card_id}/simulate`

#### CardArt

| Field | Description |
| --- | --- |
| `"data"` | The base64-encoded image data of the card art. |
| `"height"` | The height of the card art image in pixels. |
| `"type"` | The MIME type of the card art image. |
| `"width"` | The width of the card art image in pixels. |

Operations: Load.

API path: `/payments/network-tokens/{network_token_id}/card-art`

#### ClientSideToken

| Field | Description |
| --- | --- |
| `"action"` | The action that the token should permit |
| `"expiry"` | The expiry of the token in milliseconds format. |
| `"payload"` | The payload that the token must be used with |

Operations: Create.

API path: `/client-side-tokens`

#### Core

| Field | Description |
| --- | --- |
| `"category"` | The category or specific nature of the encrypted value. |
| `"core_list"` | A JSON value or file to be encrypted. |
| `"cores"` | A JSON value or file to be decrypted. |
| `"createdAt"` | The exact time, in epoch milliseconds, when this custom domain was created. |
| `"customDomain"` | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `"encryptedAt"` | The date and time when the value was encrypted. |
| `"fingerprint"` | A unique identifier for the encrypted value. |
| `"id"` | The unique identifier for the custom domain. |
| `"metadata"` | Further metadata about the encrypted value. |
| `"phoneNumber"` |  |
| `"relay"` | The ID of the Relay with which this custom domain is associated. |
| `"role"` | The data role of the encrypted value. |
| `"status"` | The status of the domains DNS verification. |
| `"token"` | The encrypted data to be inspected. |
| `"type"` | The type of the encrypted value. |
| `"updatedAt"` | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `"validationRecord"` | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

Operations: Create, List, Remove.

API path: `/decrypt`

#### CustomDomain

| Field | Description |
| --- | --- |
| `"createdAt"` | The exact time, in epoch milliseconds, when this custom domain was created. |
| `"customDomain"` | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `"id"` | The unique identifier for the custom domain. |
| `"relay"` | The ID of the Relay with which this custom domain is associated. |
| `"status"` | The status of the domains DNS verification. |
| `"updatedAt"` | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `"validationRecord"` | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

Operations: Create, Load.

API path: `/relays/{relay_id}/custom-domains`

#### FunctionRun

| Field | Description |
| --- | --- |
| `"async"` | If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code. |
| `"createdAt"` | The exact time, in epoch milliseconds, when this Function execution was triggered. |
| `"error"` | This field details any error that occurred during Function execution. |
| `"id"` | A unique identifier representing this specific Function execution instance. |
| `"payload"` | The data payload that the Function will use during its execution. |
| `"result"` | This field represents the output returned by the Function. |
| `"status"` | The outcome of the Function execution. |

Operations: Create.

API path: `/functions/{function_name}/runs`

#### Merchant

| Field | Description |
| --- | --- |
| `"applePay"` | The Merchant's Apple Pay configuration. |
| `"business"` | The business details of the Merchant. |
| `"categoryCode"` | The 4-digit Merchant Category Code (MCC). |
| `"createdAt"` | The exact time, in epoch milliseconds, when this Merchant was created. |
| `"id"` | A unique identifier assigned to each Merchant. |
| `"name"` | The official name of the Merchant as recognized in transactions and communications. |
| `"networkTokens"` | The Merchant's Network Token configuration. |
| `"shortName"` | A shorter version of the Merchant's name. |
| `"updatedAt"` | The exact time, in epoch milliseconds, when this Merchant was last updated. |
| `"website"` | The official website URL of the Merchant. |

Operations: Create, List, Load, Update.

API path: `/payments/merchants`

#### NetworkToken

| Field | Description |
| --- | --- |
| `"card"` | The details of the underlying encrypted card. |
| `"createdAt"` | The exact time, in epoch milliseconds, when this Network Token was created. |
| `"expiry"` | The expiry details of the Network Token. |
| `"id"` | A unique identifier representing a specific Network Token. |
| `"merchant"` | The unique identifier of the Merchant associated with this Network Token. |
| `"number"` | The unique number of the Network Token. |
| `"paymentAccountReference"` | The unique identifier of the Payment Account associated with this Network Token. |
| `"status"` | The status of the Network Token. |
| `"tokenRequestorIdentifier"` | The identifier of the Token Requestor (TRID) that requested the Network Token. |
| `"tokenServiceProvider"` | The Token Service Provider (TSP) that issued the Network Token. |
| `"updatedAt"` | The exact time, in epoch milliseconds, when this Network Token was last updated. |

Operations: Create, Load.

API path: `/payments/network-tokens/{network_token_id}/simulate`

#### NetworkTokenCryptogram

| Field | Description |
| --- | --- |
| `"createdAt"` |  |
| `"cryptogram"` |  |
| `"id"` |  |

Operations: Create.

API path: `/payments/network-tokens/{network_token_id}/cryptograms`

#### Payment

| Field | Description |
| --- | --- |
| `"created_at"` | Timestamp when the message was created |
| `"data"` | The message data payload |
| `"type"` | The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes) |

Operations: List, Remove.

API path: `/payments/3ds-sessions/{3ds_session_id}/messages`

#### Relay

| Field | Description |
| --- | --- |
| `"app"` | The unique identifier for the app to which the Relay belongs. |
| `"authentication"` | The type of authentication required for the Relay |
| `"createdAt"` | The exact time, in epoch milliseconds, when this Relay was created. |
| `"destinationDomain"` | The domain in front of which the Relay should be configured. |
| `"encryptEmptyStrings"` | Whether or not empty strings should be encrypted. |
| `"evervaultDomain"` | The Evervault managed domain to which requests to be relayed to the destination domain should be sent. |
| `"id"` | The unique identifier for the Relay. |
| `"routes"` | A collection of route configurations for the Relay. |
| `"updatedAt"` | The exact time, in epoch milliseconds, when this Relay was updated. |

Operations: Create, List, Load, Update.

API path: `/relays`

#### ThreeDsSession

| Field | Description |
| --- | --- |
| `"accessControlServer"` | Details about the Access Control Server involved in the 3DS transaction. |
| `"acquirer"` | The acquirer of the payment. |
| `"ares"` | The details of the 3DS Authentication Response (ARes). |
| `"authentication"` | The details of the 3DS Authentication. |
| `"card"` | The card details. |
| `"challenge"` | Details about the 3DS challenge. |
| `"createdAt"` | The exact time, in epoch milliseconds, when this 3DS-Session was created. |
| `"cres"` | The details of the 3DS Challenge Response (CRes). |
| `"cryptogram"` | The 3DS cryptogram (also called Authentication Value). |
| `"customer"` | The details of the customer who initiated the transaction. |
| `"directoryServer"` | Details about the Directory Server involved in the 3DS transaction. |
| `"eci"` | The details of the Electronic Commerce Indicator. |
| `"failureReason"` | The reason for the 3DS Authentication failure. |
| `"id"` | A unique identifier assigned to each 3DS Authentication. |
| `"initiator"` | Details about the transaction initiation process. |
| `"merchant"` | The merchant details. |
| `"nextAction"` | The next action required to complete the 3DS Authentication. |
| `"payment"` | The payment details of the 3D Secure Authentication. |
| `"preferredVersions"` | A prioritized list of preferred 3D Secure versions. |
| `"rreq"` | The result of the 3DS authentication when a challenge has occurred. |
| `"status"` | The status of the 3DS Authentication. |
| `"threeDSServer"` | Details about the 3DS Server involved in the 3DS transaction. |
| `"updatedAt"` | The exact time, in epoch milliseconds, when this 3DS-Session was last updated. |
| `"version"` | The 3D Secure version used to authenticate the session. |

Operations: Create, Load.

API path: `/payments/3ds-sessions`

#### Webhook

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/webhook-endpoints/{webhook_endpoint_id}`

#### WebhookEndpoint

| Field | Description |
| --- | --- |
| `"createdAt"` | The exact time, in epoch milliseconds, when this Webhook Endpoint was created. |
| `"events"` | A list of Events that the Webhook Endpoint is subscribed to. |
| `"id"` | A unique identifier representing a specific Webhook Endpoint. |
| `"updatedAt"` | The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated. |
| `"url"` | The URL of the Webhook Endpoint. |

Operations: Create, List, Load, Update.

API path: `/webhook-endpoints`



## Entities


### Acquirer

Create an instance: `acquirer := client.Acquirer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configurations` | `[]any` | The acquirer configuration settings. |
| `default` | `bool` | Specifies whether this Acquirer is the default. |
| `description` | `string` | The description of the acquirer configuration. |
| `id` | `string` | The unique identifier of the acquirer configuration. |
| `name` | `string` | The name of the acquirer configuration. |

#### Example: Load

```go
acquirer, err := client.Acquirer(nil).Load(map[string]any{"id": "acquirer_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(acquirer.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
acquirers, err := client.Acquirer(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range acquirers.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Acquirer(nil).Create(map[string]any{
    "configurations": []any{},
    "default": true,
    "id": "example_id",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BinLookup

Create an instance: `binLookup := client.BinLookup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `number` | `string` | The card number for which the BIN lookup is being requested. |

#### Example: Create

```go
result, err := client.BinLookup(nil).Create(map[string]any{
    "number": "example_number",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Card

Create an instance: `card := client.Card(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `map[string]any` | Details about the cardholder's address that the address verification (AVS) is for. |
| `automaticUpdates` | `string` | The status of Card Account Updater on this card. |
| `bin` | `string` | The first 6 or 8 digits of the card number. |
| `brand` | `string` | The card brand associated with the payment card. |
| `card` | `map[string]any` | The card details. |
| `cardholder` | `map[string]any` | Details about the cardholder that the name verification (ANI) is for. |
| `country` | `string` | The country where the card was issued. |
| `createdAt` | `int` | The Unix timestamp of when the card was created. |
| `currency` | `string` | The currency of the card. |
| `expiry` | `map[string]any` | The expiry date of the card. |
| `extensions` | `[]any` | The extensions to the card insight request. |
| `funding` | `string` | The card funding type specifies the method by which transactions are financed. |
| `id` | `string` | The unique identifier for the card. |
| `issuer` | `string` | The name of the card issuer. |
| `lastFour` | `string` | The last 4 digits of the card number. |
| `number` | `string` | The Evervault encrypted card number. |
| `replacement` | `any` | The ID of the replacement card. |
| `segment` | `string` | The card segment indicates the primary market or usage category of the card. |
| `status` | `string` | The current status of the card. |
| `updatedAt` | `any` | The Unix timestamp of when the card was last updated. |

#### Example: Load

```go
card, err := client.Card(nil).Load(map[string]any{"id": "card_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(card.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.Card(nil).Create(map[string]any{
    "address": map[string]any{},
    "bin": "example_bin",
    "card": map[string]any{},
    "createdAt": 1,
    "expiry": map[string]any{},
    "lastFour": "example_lastFour",
    "number": "example_number",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CardArt

Create an instance: `cardArt := client.CardArt(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `string` | The base64-encoded image data of the card art. |
| `height` | `int` | The height of the card art image in pixels. |
| `type` | `string` | The MIME type of the card art image. |
| `width` | `int` | The width of the card art image in pixels. |

#### Example: Load

```go
cardArt, err := client.CardArt(nil).Load(map[string]any{"network_token_id": "network_token_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(cardArt.(sdk.Entity).Data()) // the loaded entity's record
```


### ClientSideToken

Create an instance: `clientSideToken := client.ClientSideToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` | The action that the token should permit |
| `expiry` | `int` | The expiry of the token in milliseconds format. |
| `payload` | `map[string]any` | The payload that the token must be used with |

#### Example: Create

```go
result, err := client.ClientSideToken(nil).Create(map[string]any{
    "action": "example_action",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Core

Create an instance: `core := client.Core(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` | The category or specific nature of the encrypted value. |
| `core_list` | `any` | A JSON value or file to be encrypted. |
| `cores` | `any` | A JSON value or file to be decrypted. |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `string` | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `encryptedAt` | `int` | The date and time when the value was encrypted. |
| `fingerprint` | `string` | A unique identifier for the encrypted value. |
| `id` | `string` | The unique identifier for the custom domain. |
| `metadata` | `any` | Further metadata about the encrypted value. |
| `phoneNumber` | `string` |  |
| `relay` | `string` | The ID of the Relay with which this custom domain is associated. |
| `role` | `string` | The data role of the encrypted value. |
| `status` | `string` | The status of the domains DNS verification. |
| `token` | `string` | The encrypted data to be inspected. |
| `type` | `string` | The type of the encrypted value. |
| `updatedAt` | `int` | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `string` | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

#### Example: List

```go
cores, err := client.Core(nil).List(map[string]any{"relay_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range cores.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Core(nil).Create(map[string]any{
    "token": "example_token",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CustomDomain

Create an instance: `customDomain := client.CustomDomain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `string` | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `id` | `string` | The unique identifier for the custom domain. |
| `relay` | `string` | The ID of the Relay with which this custom domain is associated. |
| `status` | `string` | The status of the domains DNS verification. |
| `updatedAt` | `int` | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `string` | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

#### Example: Load

```go
customDomain, err := client.CustomDomain(nil).Load(map[string]any{"id": "custom_domain_id", "relay_id": "relay_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(customDomain.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.CustomDomain(nil).Create(map[string]any{
    "relay_id": "example_relay_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### FunctionRun

Create an instance: `functionRun := client.FunctionRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `async` | `bool` | If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code. |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this Function execution was triggered. |
| `error` | `any` | This field details any error that occurred during Function execution. |
| `id` | `string` | A unique identifier representing this specific Function execution instance. |
| `payload` | `map[string]any` | The data payload that the Function will use during its execution. |
| `result` | `map[string]any` | This field represents the output returned by the Function. |
| `status` | `string` | The outcome of the Function execution. |

#### Example: Create

```go
result, err := client.FunctionRun(nil).Create(map[string]any{
    "function_name": "example_function_name",
    "payload": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Merchant

Create an instance: `merchant := client.Merchant(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `applePay` | `map[string]any` | The Merchant's Apple Pay configuration. |
| `business` | `map[string]any` | The business details of the Merchant. |
| `categoryCode` | `string` | The 4-digit Merchant Category Code (MCC). |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this Merchant was created. |
| `id` | `string` | A unique identifier assigned to each Merchant. |
| `name` | `string` | The official name of the Merchant as recognized in transactions and communications. |
| `networkTokens` | `map[string]any` | The Merchant's Network Token configuration. |
| `shortName` | `string` | A shorter version of the Merchant's name. |
| `updatedAt` | `int` | The exact time, in epoch milliseconds, when this Merchant was last updated. |
| `website` | `string` | The official website URL of the Merchant. |

#### Example: Load

```go
merchant, err := client.Merchant(nil).Load(map[string]any{"id": "merchant_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(merchant.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
merchants, err := client.Merchant(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range merchants.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Merchant(nil).Create(map[string]any{
    "createdAt": 1,
    "id": "example_id",
    "name": "example_name",
    "website": "example_website",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### NetworkToken

Create an instance: `networkToken := client.NetworkToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `card` | `map[string]any` | The details of the underlying encrypted card. |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this Network Token was created. |
| `expiry` | `map[string]any` | The expiry details of the Network Token. |
| `id` | `string` | A unique identifier representing a specific Network Token. |
| `merchant` | `string` | The unique identifier of the Merchant associated with this Network Token. |
| `number` | `string` | The unique number of the Network Token. |
| `paymentAccountReference` | `string` | The unique identifier of the Payment Account associated with this Network Token. |
| `status` | `string` | The status of the Network Token. |
| `tokenRequestorIdentifier` | `string` | The identifier of the Token Requestor (TRID) that requested the Network Token. |
| `tokenServiceProvider` | `string` | The Token Service Provider (TSP) that issued the Network Token. |
| `updatedAt` | `int` | The exact time, in epoch milliseconds, when this Network Token was last updated. |

#### Example: Load

```go
networkToken, err := client.NetworkToken(nil).Load(map[string]any{"id": "network_token_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(networkToken.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.NetworkToken(nil).Create(map[string]any{
    "card": map[string]any{},
    "createdAt": 1,
    "expiry": map[string]any{},
    "id": "example_id",
    "merchant": "example_merchant",
    "number": "example_number",
    "status": "example_status",
    "tokenRequestorIdentifier": "example_tokenRequestorIdentifier",
    "tokenServiceProvider": "example_tokenServiceProvider",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### NetworkTokenCryptogram

Create an instance: `networkTokenCryptogram := client.NetworkTokenCryptogram(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `int` |  |
| `cryptogram` | `string` |  |
| `id` | `string` |  |

#### Example: Create

```go
result, err := client.NetworkTokenCryptogram(nil).Create(map[string]any{
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Payment

Create an instance: `payment := client.Payment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `int` | Timestamp when the message was created |
| `data` | `map[string]any` | The message data payload |
| `type` | `string` | The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes) |

#### Example: List

```go
payments, err := client.Payment(nil).List(map[string]any{"3ds_session_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range payments.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Relay

Create an instance: `relay := client.Relay(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `string` | The unique identifier for the app to which the Relay belongs. |
| `authentication` | `any` | The type of authentication required for the Relay |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this Relay was created. |
| `destinationDomain` | `string` | The domain in front of which the Relay should be configured. |
| `encryptEmptyStrings` | `bool` | Whether or not empty strings should be encrypted. |
| `evervaultDomain` | `string` | The Evervault managed domain to which requests to be relayed to the destination domain should be sent. |
| `id` | `string` | The unique identifier for the Relay. |
| `routes` | `[]any` | A collection of route configurations for the Relay. |
| `updatedAt` | `int` | The exact time, in epoch milliseconds, when this Relay was updated. |

#### Example: Load

```go
relay, err := client.Relay(nil).Load(map[string]any{"id": "relay_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(relay.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
relays, err := client.Relay(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range relays.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Relay(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ThreeDsSession

Create an instance: `threeDsSession := client.ThreeDsSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accessControlServer` | `map[string]any` | Details about the Access Control Server involved in the 3DS transaction. |
| `acquirer` | `map[string]any` | The acquirer of the payment. |
| `ares` | `map[string]any` | The details of the 3DS Authentication Response (ARes). |
| `authentication` | `map[string]any` | The details of the 3DS Authentication. |
| `card` | `map[string]any` | The card details. |
| `challenge` | `map[string]any` | Details about the 3DS challenge. |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this 3DS-Session was created. |
| `cres` | `any` | The details of the 3DS Challenge Response (CRes). |
| `cryptogram` | `string` | The 3DS cryptogram (also called Authentication Value). |
| `customer` | `map[string]any` | The details of the customer who initiated the transaction. |
| `directoryServer` | `map[string]any` | Details about the Directory Server involved in the 3DS transaction. |
| `eci` | `map[string]any` | The details of the Electronic Commerce Indicator. |
| `failureReason` | `string` | The reason for the 3DS Authentication failure. |
| `id` | `string` | A unique identifier assigned to each 3DS Authentication. |
| `initiator` | `map[string]any` | Details about the transaction initiation process. |
| `merchant` | `map[string]any` | The merchant details. |
| `nextAction` | `map[string]any` | The next action required to complete the 3DS Authentication. |
| `payment` | `map[string]any` | The payment details of the 3D Secure Authentication. |
| `preferredVersions` | `[]any` | A prioritized list of preferred 3D Secure versions. |
| `rreq` | `any` | The result of the 3DS authentication when a challenge has occurred. |
| `status` | `string` | The status of the 3DS Authentication. |
| `threeDSServer` | `map[string]any` | Details about the 3DS Server involved in the 3DS transaction. |
| `updatedAt` | `int` | The exact time, in epoch milliseconds, when this 3DS-Session was last updated. |
| `version` | `string` | The 3D Secure version used to authenticate the session. |

#### Example: Load

```go
threeDsSession, err := client.ThreeDsSession(nil).Load(map[string]any{"3ds_session_id": "3ds_session_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(threeDsSession.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.ThreeDsSession(nil).Create(map[string]any{
    "acquirer": map[string]any{},
    "authentication": map[string]any{},
    "card": map[string]any{},
    "challenge": map[string]any{},
    "createdAt": 1,
    "id": "example_id",
    "merchant": map[string]any{},
    "nextAction": map[string]any{},
    "status": "example_status",
    "version": "example_version",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Webhook

Create an instance: `webhook := client.Webhook(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match, ctrl)` | Remove the matching entity. |


### WebhookEndpoint

Create an instance: `webhookEndpoint := client.WebhookEndpoint(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this Webhook Endpoint was created. |
| `events` | `[]any` | A list of Events that the Webhook Endpoint is subscribed to. |
| `id` | `string` | A unique identifier representing a specific Webhook Endpoint. |
| `updatedAt` | `any` | The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated. |
| `url` | `string` | The URL of the Webhook Endpoint. |

#### Example: Load

```go
webhookEndpoint, err := client.WebhookEndpoint(nil).Load(map[string]any{"id": "webhook_endpoint_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(webhookEndpoint.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
webhookEndpoints, err := client.WebhookEndpoint(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range webhookEndpoints.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.WebhookEndpoint(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Debug capture |
| [`idempotency`](#idempotency) | Idempotency |
| [`metrics`](#metrics) | Metrics |
| [`paging`](#paging) | Paging |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Debug capture.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Metrics.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Paging.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Open types

1 field is carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes it with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `three_ds_session` | `payment` | 3 | 0 levels |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/evervault-sdk/go/
├── evervault.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/evervault-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
merchant := client.Merchant(nil)
merchant.List(nil, nil)

// merchant.Data() now returns the merchant data from the last list
// merchant.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
