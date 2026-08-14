# Evervault Golang SDK



The Golang SDK for the Evervault API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Acquirer(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/evervault-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/evervault-sdk/releases) for the available versions.

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
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

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

    // Load a single acquirer — the value is the loaded record.
    acquirer, err := client.Acquirer(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(acquirer)

    // Create a acquirer.
    created, err := client.Acquirer(nil).Create(map[string]any{"configurations": []any{}, "default": true, "id": "example_id", "name": "example_name"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)

    // Update a acquirer.
    updated, err := client.Acquirer(nil).Update(map[string]any{"id": "example_id", "configurations": []any{}, "default": true}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(updated)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
merchant, err := client.Merchant(nil).Load(map[string]any{"id": "example_id"}, nil)
if err != nil {
    // handle err
    return
}
_ = merchant
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

merchant, err := client.Merchant(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(merchant) // the returned mock data
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
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    acquirer, err := client.Acquirer(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // acquirer is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Acquirer

| Field | Description |
| --- | --- |
| `"configurations"` |  |
| `"default"` |  |
| `"description"` |  |
| `"id"` |  |
| `"name"` |  |

Operations: Create, Load, Update.

API path: `/payments/acquirers`

#### BinLookup

| Field | Description |
| --- | --- |
| `"number"` |  |

Operations: Create.

API path: `/payments/bin-lookups`

#### Card

| Field | Description |
| --- | --- |
| `"address"` |  |
| `"card"` |  |
| `"cardholder"` |  |
| `"expiry"` |  |
| `"extensions"` |  |
| `"month"` |  |
| `"number"` |  |
| `"year"` |  |

Operations: Create, Load.

API path: `/payments/cards/{card_id}/simulate`

#### CardArt

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"height"` |  |
| `"type"` |  |
| `"width"` |  |

Operations: Load.

API path: `/payments/network-tokens/{network_token_id}/card-art`

#### ClientSideToken

| Field | Description |
| --- | --- |
| `"action"` |  |
| `"expiry"` |  |
| `"payload"` |  |

Operations: Create.

API path: `/client-side-tokens`

#### Core

| Field | Description |
| --- | --- |
| `"app"` |  |
| `"authentication"` |  |
| `"createdAt"` |  |
| `"customDomain"` |  |
| `"destinationDomain"` |  |
| `"encryptEmptyStrings"` |  |
| `"evervaultDomain"` |  |
| `"id"` |  |
| `"phoneNumber"` |  |
| `"relay"` |  |
| `"routes"` |  |
| `"status"` |  |
| `"token"` |  |
| `"updatedAt"` |  |
| `"validationRecord"` |  |

Operations: Create, List, Remove.

API path: `/decrypt`

#### CustomDomain

| Field | Description |
| --- | --- |
| `"createdAt"` |  |
| `"customDomain"` |  |
| `"id"` |  |
| `"relay"` |  |
| `"status"` |  |
| `"updatedAt"` |  |
| `"validationRecord"` |  |

Operations: Create, Load.

API path: `/relays/{relay_id}/custom-domains`

#### FunctionRun

| Field | Description |
| --- | --- |
| `"async"` |  |
| `"createdAt"` |  |
| `"error"` |  |
| `"id"` |  |
| `"payload"` |  |
| `"result"` |  |
| `"status"` |  |

Operations: Create.

API path: `/functions/{function_name}/runs`

#### Merchant

| Field | Description |
| --- | --- |
| `"applePay"` |  |
| `"business"` |  |
| `"categoryCode"` |  |
| `"createdAt"` |  |
| `"id"` |  |
| `"name"` |  |
| `"networkTokens"` |  |
| `"shortName"` |  |
| `"updatedAt"` |  |
| `"website"` |  |

Operations: Create, Load, Update.

API path: `/payments/merchants`

#### NetworkToken

| Field | Description |
| --- | --- |
| `"card"` |  |
| `"createdAt"` |  |
| `"expiry"` |  |
| `"id"` |  |
| `"merchant"` |  |
| `"number"` |  |
| `"paymentAccountReference"` |  |
| `"status"` |  |
| `"tokenRequestorIdentifier"` |  |
| `"tokenServiceProvider"` |  |
| `"updateType"` |  |
| `"updatedAt"` |  |

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
| `"applePay"` |  |
| `"business"` |  |
| `"categoryCode"` |  |
| `"configurations"` |  |
| `"createdAt"` |  |
| `"created_at"` |  |
| `"data"` |  |
| `"default"` |  |
| `"description"` |  |
| `"id"` |  |
| `"name"` |  |
| `"networkTokens"` |  |
| `"shortName"` |  |
| `"type"` |  |
| `"updatedAt"` |  |
| `"website"` |  |

Operations: List, Remove.

API path: `/payments/merchants`

#### Relay

| Field | Description |
| --- | --- |
| `"app"` |  |
| `"authentication"` |  |
| `"createdAt"` |  |
| `"destinationDomain"` |  |
| `"encryptEmptyStrings"` |  |
| `"evervaultDomain"` |  |
| `"id"` |  |
| `"routes"` |  |
| `"updatedAt"` |  |

Operations: Load, Update.

API path: `/relays/{id}`

#### ThreeDsSession

| Field | Description |
| --- | --- |
| `"accessControlServer"` |  |
| `"acquirer"` |  |
| `"ares"` |  |
| `"authentication"` |  |
| `"card"` |  |
| `"challenge"` |  |
| `"createdAt"` |  |
| `"cres"` |  |
| `"cryptogram"` |  |
| `"customer"` |  |
| `"directoryServer"` |  |
| `"eci"` |  |
| `"failureReason"` |  |
| `"id"` |  |
| `"initiator"` |  |
| `"merchant"` |  |
| `"nextAction"` |  |
| `"payment"` |  |
| `"preferredVersions"` |  |
| `"rreq"` |  |
| `"status"` |  |
| `"threeDSServer"` |  |
| `"updatedAt"` |  |
| `"version"` |  |

Operations: Create, Load.

API path: `/payments/3ds-sessions`

#### Webhook

| Field | Description |
| --- | --- |
| `"createdAt"` |  |
| `"events"` |  |
| `"id"` |  |
| `"updatedAt"` |  |
| `"url"` |  |

Operations: Create, List, Remove.

API path: `/webhook-endpoints`

#### WebhookEndpoint

| Field | Description |
| --- | --- |
| `"createdAt"` |  |
| `"events"` |  |
| `"id"` |  |
| `"updatedAt"` |  |
| `"url"` |  |

Operations: Load, Update.

API path: `/webhook-endpoints/{webhook_endpoint_id}`



## Entities


### Acquirer

Create an instance: `acquirer := client.Acquirer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configurations` | `[]any` |  |
| `default` | `bool` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |

#### Example: Load

```go
acquirer, err := client.Acquirer(nil).Load(map[string]any{"id": "acquirer_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(acquirer) // the loaded record
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
fmt.Println(result)
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
| `number` | `string` |  |

#### Example: Create

```go
result, err := client.BinLookup(nil).Create(map[string]any{
    "number": "example_number",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
| `address` | `map[string]any` |  |
| `card` | `map[string]any` |  |
| `cardholder` | `map[string]any` |  |
| `expiry` | `map[string]any` |  |
| `extensions` | `[]any` |  |
| `month` | `string` |  |
| `number` | `string` |  |
| `year` | `string` |  |

#### Example: Load

```go
card, err := client.Card(nil).Load(map[string]any{"id": "card_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(card) // the loaded record
```

#### Example: Create

```go
result, err := client.Card(nil).Create(map[string]any{
    "address": map[string]any{},
    "card": map[string]any{},
    "expiry": map[string]any{},
    "month": "example_month",
    "number": "example_number",
    "year": "example_year",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
| `data` | `string` |  |
| `height` | `int` |  |
| `type` | `string` |  |
| `width` | `int` |  |

#### Example: Load

```go
cardArt, err := client.CardArt(nil).Load(map[string]any{"network_token_id": "network_token_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(cardArt) // the loaded record
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
| `action` | `string` |  |
| `expiry` | `int` |  |
| `payload` | `map[string]any` |  |

#### Example: Create

```go
result, err := client.ClientSideToken(nil).Create(map[string]any{
    "action": "example_action",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
| `app` | `string` |  |
| `authentication` | `any` |  |
| `createdAt` | `int` |  |
| `customDomain` | `string` |  |
| `destinationDomain` | `string` |  |
| `encryptEmptyStrings` | `bool` |  |
| `evervaultDomain` | `string` |  |
| `id` | `string` |  |
| `phoneNumber` | `string` |  |
| `relay` | `string` |  |
| `routes` | `[]any` |  |
| `status` | `string` |  |
| `token` | `string` |  |
| `updatedAt` | `int` |  |
| `validationRecord` | `string` |  |

#### Example: List

```go
cores, err := client.Core(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(cores) // the array of records
```

#### Example: Create

```go
result, err := client.Core(nil).Create(map[string]any{
    "destinationDomain": "example_destinationDomain",
    "routes": []any{},
    "token": "example_token",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
| `createdAt` | `int` |  |
| `customDomain` | `string` |  |
| `id` | `string` |  |
| `relay` | `string` |  |
| `status` | `string` |  |
| `updatedAt` | `int` |  |
| `validationRecord` | `string` |  |

#### Example: Load

```go
customDomain, err := client.CustomDomain(nil).Load(map[string]any{"id": "custom_domain_id", "relay_id": "relay_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(customDomain) // the loaded record
```

#### Example: Create

```go
result, err := client.CustomDomain(nil).Create(map[string]any{
    "relay_id": "example_relay_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
| `async` | `bool` |  |
| `createdAt` | `int` |  |
| `error` | `any` |  |
| `id` | `string` |  |
| `payload` | `map[string]any` |  |
| `result` | `map[string]any` |  |
| `status` | `string` |  |

#### Example: Create

```go
result, err := client.FunctionRun(nil).Create(map[string]any{
    "function_name": "example_function_name",
    "payload": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Merchant

Create an instance: `merchant := client.Merchant(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `applePay` | `map[string]any` |  |
| `business` | `map[string]any` |  |
| `categoryCode` | `string` |  |
| `createdAt` | `int` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `networkTokens` | `map[string]any` |  |
| `shortName` | `string` |  |
| `updatedAt` | `int` |  |
| `website` | `string` |  |

#### Example: Load

```go
merchant, err := client.Merchant(nil).Load(map[string]any{"id": "merchant_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(merchant) // the loaded record
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
fmt.Println(result)
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
| `card` | `map[string]any` |  |
| `createdAt` | `int` |  |
| `expiry` | `map[string]any` |  |
| `id` | `string` |  |
| `merchant` | `string` |  |
| `number` | `string` |  |
| `paymentAccountReference` | `string` |  |
| `status` | `string` |  |
| `tokenRequestorIdentifier` | `string` |  |
| `tokenServiceProvider` | `string` |  |
| `updateType` | `string` |  |
| `updatedAt` | `int` |  |

#### Example: Load

```go
networkToken, err := client.NetworkToken(nil).Load(map[string]any{"id": "network_token_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(networkToken) // the loaded record
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
fmt.Println(result)
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
fmt.Println(result)
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
| `applePay` | `map[string]any` |  |
| `business` | `map[string]any` |  |
| `categoryCode` | `string` |  |
| `configurations` | `[]any` |  |
| `createdAt` | `int` |  |
| `created_at` | `int` |  |
| `data` | `map[string]any` |  |
| `default` | `bool` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `networkTokens` | `map[string]any` |  |
| `shortName` | `string` |  |
| `type` | `string` |  |
| `updatedAt` | `int` |  |
| `website` | `string` |  |

#### Example: List

```go
payments, err := client.Payment(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(payments) // the array of records
```


### Relay

Create an instance: `relay := client.Relay(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `string` |  |
| `authentication` | `any` |  |
| `createdAt` | `int` |  |
| `destinationDomain` | `string` |  |
| `encryptEmptyStrings` | `bool` |  |
| `evervaultDomain` | `string` |  |
| `id` | `string` |  |
| `routes` | `[]any` |  |
| `updatedAt` | `int` |  |

#### Example: Load

```go
relay, err := client.Relay(nil).Load(map[string]any{"id": "relay_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(relay) // the loaded record
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
| `accessControlServer` | `map[string]any` |  |
| `acquirer` | `map[string]any` |  |
| `ares` | `map[string]any` |  |
| `authentication` | `map[string]any` |  |
| `card` | `map[string]any` |  |
| `challenge` | `map[string]any` |  |
| `createdAt` | `int` |  |
| `cres` | `any` |  |
| `cryptogram` | `string` |  |
| `customer` | `map[string]any` |  |
| `directoryServer` | `map[string]any` |  |
| `eci` | `map[string]any` |  |
| `failureReason` | `string` |  |
| `id` | `string` |  |
| `initiator` | `map[string]any` |  |
| `merchant` | `map[string]any` |  |
| `nextAction` | `map[string]any` |  |
| `payment` | `map[string]any` |  |
| `preferredVersions` | `[]any` |  |
| `rreq` | `any` |  |
| `status` | `string` |  |
| `threeDSServer` | `map[string]any` |  |
| `updatedAt` | `int` |  |
| `version` | `string` |  |

#### Example: Load

```go
threeDsSession, err := client.ThreeDsSession(nil).Load(map[string]any{"3ds_session_id": "3ds_session_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(threeDsSession) // the loaded record
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
fmt.Println(result)
```


### Webhook

Create an instance: `webhook := client.Webhook(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `int` |  |
| `events` | `[]any` |  |
| `id` | `string` |  |
| `updatedAt` | `any` |  |
| `url` | `string` |  |

#### Example: List

```go
webhooks, err := client.Webhook(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(webhooks) // the array of records
```

#### Example: Create

```go
result, err := client.Webhook(nil).Create(map[string]any{
    "events": []any{},
    "url": "example_url",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### WebhookEndpoint

Create an instance: `webhookEndpoint := client.WebhookEndpoint(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `int` |  |
| `events` | `[]any` |  |
| `id` | `string` |  |
| `updatedAt` | `any` |  |
| `url` | `string` |  |

#### Example: Load

```go
webhookEndpoint, err := client.WebhookEndpoint(nil).Load(map[string]any{"id": "webhook_endpoint_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(webhookEndpoint) // the loaded record
```


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

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

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

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
merchant := client.Merchant(nil)
merchant.Load(map[string]any{"id": "example_id"}, nil)

// merchant.Data() now returns the merchant data from the last load
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
