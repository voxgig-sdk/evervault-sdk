# Evervault Golang SDK Reference

Complete API reference for the Evervault Golang SDK.


## EvervaultSDK

### Constructor

```go
func NewEvervaultSDK(options map[string]any) *EvervaultSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *EvervaultSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *EvervaultSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Acquirer(data map[string]any) EvervaultEntity`

Create a new `Acquirer` entity instance. Pass `nil` for no initial data.

#### `BinLookup(data map[string]any) EvervaultEntity`

Create a new `BinLookup` entity instance. Pass `nil` for no initial data.

#### `Card(data map[string]any) EvervaultEntity`

Create a new `Card` entity instance. Pass `nil` for no initial data.

#### `CardArt(data map[string]any) EvervaultEntity`

Create a new `CardArt` entity instance. Pass `nil` for no initial data.

#### `ClientSideToken(data map[string]any) EvervaultEntity`

Create a new `ClientSideToken` entity instance. Pass `nil` for no initial data.

#### `Core(data map[string]any) EvervaultEntity`

Create a new `Core` entity instance. Pass `nil` for no initial data.

#### `CustomDomain(data map[string]any) EvervaultEntity`

Create a new `CustomDomain` entity instance. Pass `nil` for no initial data.

#### `FunctionRun(data map[string]any) EvervaultEntity`

Create a new `FunctionRun` entity instance. Pass `nil` for no initial data.

#### `Merchant(data map[string]any) EvervaultEntity`

Create a new `Merchant` entity instance. Pass `nil` for no initial data.

#### `NetworkToken(data map[string]any) EvervaultEntity`

Create a new `NetworkToken` entity instance. Pass `nil` for no initial data.

#### `NetworkTokenCryptogram(data map[string]any) EvervaultEntity`

Create a new `NetworkTokenCryptogram` entity instance. Pass `nil` for no initial data.

#### `Payment(data map[string]any) EvervaultEntity`

Create a new `Payment` entity instance. Pass `nil` for no initial data.

#### `Relay(data map[string]any) EvervaultEntity`

Create a new `Relay` entity instance. Pass `nil` for no initial data.

#### `ThreeDsSession(data map[string]any) EvervaultEntity`

Create a new `ThreeDsSession` entity instance. Pass `nil` for no initial data.

#### `Webhook(data map[string]any) EvervaultEntity`

Create a new `Webhook` entity instance. Pass `nil` for no initial data.

#### `WebhookEndpoint(data map[string]any) EvervaultEntity`

Create a new `WebhookEndpoint` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AcquirerEntity

```go
acquirer := client.Acquirer(nil)
fmt.Println(acquirer.GetName()) // "acquirer"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `configurations` | `[]any` | Yes |  |
| `default` | `bool` | Yes |  |
| `description` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | create | update |
| --- | --- | --- | --- |
| `configurations` | - | - | Yes |
| `default` | - | Yes | Yes |
| `description` | - | - | - |
| `id` | - | - | - |
| `name` | - | - | Yes |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Acquirer(nil).Load(map[string]any{"id": "acquirer_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Acquirer(nil).Update(map[string]any{
    "id": "acquirer_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AcquirerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BinLookupEntity

```go
binLookup := client.BinLookup(nil)
fmt.Println(binLookup.GetName()) // "bin_lookup"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `number` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.BinLookup(nil).Create(map[string]any{
    "number": "example_number",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BinLookupEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CardEntity

```go
card := client.Card(nil)
fmt.Println(card.GetName()) // "card"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `map[string]any` | Yes |  |
| `card` | `map[string]any` | Yes |  |
| `cardholder` | `map[string]any` | No |  |
| `expiry` | `map[string]any` | Yes |  |
| `extensions` | `[]any` | No |  |
| `month` | `string` | Yes |  |
| `number` | `string` | Yes |  |
| `year` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Card(nil).Load(map[string]any{"id": "card_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CardEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CardArtEntity

```go
cardArt := client.CardArt(nil)
fmt.Println(cardArt.GetName()) // "card_art"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `string` | Yes |  |
| `height` | `int` | Yes |  |
| `type` | `string` | Yes |  |
| `width` | `int` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.CardArt(nil).Load(map[string]any{"network_token_id": "network_token_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CardArtEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ClientSideTokenEntity

```go
clientSideToken := client.ClientSideToken(nil)
fmt.Println(clientSideToken.GetName()) // "client_side_token"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `expiry` | `int` | No |  |
| `payload` | `map[string]any` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.ClientSideToken(nil).Create(map[string]any{
    "action": "example_action",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ClientSideTokenEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CoreEntity

```go
core := client.Core(nil)
fmt.Println(core.GetName()) // "core"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `string` | No |  |
| `authentication` | `any` | No |  |
| `createdAt` | `int` | No |  |
| `customDomain` | `string` | No |  |
| `destinationDomain` | `string` | Yes |  |
| `encryptEmptyStrings` | `bool` | No |  |
| `evervaultDomain` | `string` | No |  |
| `id` | `string` | No |  |
| `phoneNumber` | `string` | No |  |
| `relay` | `string` | No |  |
| `routes` | `[]any` | Yes |  |
| `status` | `string` | No |  |
| `token` | `string` | Yes |  |
| `updatedAt` | `int` | No |  |
| `validationRecord` | `string` | No |  |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `app` | - | - | - |
| `authentication` | - | - | - |
| `createdAt` | - | - | - |
| `customDomain` | - | - | - |
| `destinationDomain` | Yes | - | - |
| `encryptEmptyStrings` | - | - | - |
| `evervaultDomain` | - | - | - |
| `id` | - | - | - |
| `phoneNumber` | - | - | - |
| `relay` | - | - | - |
| `routes` | Yes | - | - |
| `status` | - | - | - |
| `token` | - | - | - |
| `updatedAt` | - | - | - |
| `validationRecord` | - | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Core(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Core(nil).Remove(map[string]any{"id": "id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CoreEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CustomDomainEntity

```go
customDomain := client.CustomDomain(nil)
fmt.Println(customDomain.GetName()) // "custom_domain"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `int` | No |  |
| `customDomain` | `string` | No |  |
| `id` | `string` | No |  |
| `relay` | `string` | No |  |
| `status` | `string` | No |  |
| `updatedAt` | `int` | No |  |
| `validationRecord` | `string` | No |  |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `createdAt` | - | - |
| `customDomain` | - | Yes |
| `id` | - | - |
| `relay` | - | - |
| `status` | - | - |
| `updatedAt` | - | - |
| `validationRecord` | - | - |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.CustomDomain(nil).Load(map[string]any{"id": "custom_domain_id", "relay_id": "relay_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.CustomDomain(nil).Create(map[string]any{
    "relay_id": "example_relay_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CustomDomainEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FunctionRunEntity

```go
functionRun := client.FunctionRun(nil)
fmt.Println(functionRun.GetName()) // "function_run"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `async` | `bool` | No |  |
| `createdAt` | `int` | No |  |
| `error` | `any` | No |  |
| `id` | `string` | No |  |
| `payload` | `map[string]any` | Yes |  |
| `result` | `map[string]any` | No |  |
| `status` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FunctionRunEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MerchantEntity

```go
merchant := client.Merchant(nil)
fmt.Println(merchant.GetName()) // "merchant"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `applePay` | `map[string]any` | No |  |
| `business` | `map[string]any` | No |  |
| `categoryCode` | `string` | No |  |
| `createdAt` | `int` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `networkTokens` | `map[string]any` | No |  |
| `shortName` | `string` | No |  |
| `updatedAt` | `int` | No |  |
| `website` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | create | update |
| --- | --- | --- | --- |
| `applePay` | - | - | - |
| `business` | - | Yes | - |
| `categoryCode` | - | Yes | - |
| `createdAt` | - | - | - |
| `id` | - | - | - |
| `name` | - | - | - |
| `networkTokens` | - | - | - |
| `shortName` | - | - | - |
| `updatedAt` | - | - | - |
| `website` | - | - | - |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Merchant(nil).Load(map[string]any{"id": "merchant_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Merchant(nil).Update(map[string]any{
    "id": "merchant_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MerchantEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## NetworkTokenEntity

```go
networkToken := client.NetworkToken(nil)
fmt.Println(networkToken.GetName()) // "network_token"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | `map[string]any` | Yes |  |
| `createdAt` | `int` | Yes |  |
| `expiry` | `map[string]any` | Yes |  |
| `id` | `string` | Yes |  |
| `merchant` | `string` | Yes |  |
| `number` | `string` | Yes |  |
| `paymentAccountReference` | `string` | No |  |
| `status` | `string` | Yes |  |
| `tokenRequestorIdentifier` | `string` | Yes |  |
| `tokenServiceProvider` | `string` | Yes |  |
| `updateType` | `string` | No |  |
| `updatedAt` | `int` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.NetworkToken(nil).Load(map[string]any{"id": "network_token_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `NetworkTokenEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## NetworkTokenCryptogramEntity

```go
networkTokenCryptogram := client.NetworkTokenCryptogram(nil)
fmt.Println(networkTokenCryptogram.GetName()) // "network_token_cryptogram"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `int` | No |  |
| `cryptogram` | `string` | No |  |
| `id` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.NetworkTokenCryptogram(nil).Create(map[string]any{
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `NetworkTokenCryptogramEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PaymentEntity

```go
payment := client.Payment(nil)
fmt.Println(payment.GetName()) // "payment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `applePay` | `map[string]any` | No |  |
| `business` | `map[string]any` | No |  |
| `categoryCode` | `string` | No |  |
| `configurations` | `[]any` | Yes |  |
| `createdAt` | `int` | Yes |  |
| `created_at` | `int` | No |  |
| `data` | `map[string]any` | No |  |
| `default` | `bool` | Yes |  |
| `description` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `networkTokens` | `map[string]any` | No |  |
| `shortName` | `string` | No |  |
| `type` | `string` | No |  |
| `updatedAt` | `int` | No |  |
| `website` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Payment(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Payment(nil).Remove(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PaymentEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RelayEntity

```go
relay := client.Relay(nil)
fmt.Println(relay.GetName()) // "relay"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `string` | No |  |
| `authentication` | `any` | No |  |
| `createdAt` | `int` | No |  |
| `destinationDomain` | `string` | No |  |
| `encryptEmptyStrings` | `bool` | No |  |
| `evervaultDomain` | `string` | No |  |
| `id` | `string` | No |  |
| `routes` | `[]any` | No |  |
| `updatedAt` | `int` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Relay(nil).Load(map[string]any{"id": "relay_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Relay(nil).Update(map[string]any{
    "id": "relay_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RelayEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ThreeDsSessionEntity

```go
threeDsSession := client.ThreeDsSession(nil)
fmt.Println(threeDsSession.GetName()) // "three_ds_session"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accessControlServer` | `map[string]any` | No |  |
| `acquirer` | `map[string]any` | Yes |  |
| `ares` | `map[string]any` | No |  |
| `authentication` | `map[string]any` | Yes |  |
| `card` | `map[string]any` | Yes |  |
| `challenge` | `map[string]any` | Yes |  |
| `createdAt` | `int` | Yes |  |
| `cres` | `any` | No |  |
| `cryptogram` | `string` | No |  |
| `customer` | `map[string]any` | No |  |
| `directoryServer` | `map[string]any` | No |  |
| `eci` | `map[string]any` | No |  |
| `failureReason` | `string` | No |  |
| `id` | `string` | Yes |  |
| `initiator` | `map[string]any` | No |  |
| `merchant` | `map[string]any` | Yes |  |
| `nextAction` | `map[string]any` | Yes |  |
| `payment` | `map[string]any` | No |  |
| `preferredVersions` | `[]any` | No |  |
| `rreq` | `any` | No |  |
| `status` | `string` | Yes |  |
| `threeDSServer` | `map[string]any` | No |  |
| `updatedAt` | `int` | No |  |
| `version` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `accessControlServer` | - | - |
| `acquirer` | - | Yes |
| `ares` | - | - |
| `authentication` | - | - |
| `card` | - | - |
| `challenge` | - | - |
| `createdAt` | - | - |
| `cres` | - | - |
| `cryptogram` | - | - |
| `customer` | - | - |
| `directoryServer` | - | - |
| `eci` | - | - |
| `failureReason` | - | - |
| `id` | - | - |
| `initiator` | - | - |
| `merchant` | - | - |
| `nextAction` | - | - |
| `payment` | - | - |
| `preferredVersions` | - | - |
| `rreq` | - | - |
| `status` | - | - |
| `threeDSServer` | - | - |
| `updatedAt` | - | - |
| `version` | - | - |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ThreeDsSession(nil).Load(map[string]any{"3ds_session_id": "3ds_session_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ThreeDsSessionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WebhookEntity

```go
webhook := client.Webhook(nil)
fmt.Println(webhook.GetName()) // "webhook"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `int` | No |  |
| `events` | `[]any` | Yes |  |
| `id` | `string` | No |  |
| `updatedAt` | `any` | No |  |
| `url` | `string` | Yes |  |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `createdAt` | - | - | - |
| `events` | Yes | - | - |
| `id` | - | - | - |
| `updatedAt` | - | - | - |
| `url` | Yes | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Webhook(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Webhook(nil).Remove(map[string]any{"webhook_endpoint_id": "webhook_endpoint_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WebhookEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WebhookEndpointEntity

```go
webhookEndpoint := client.WebhookEndpoint(nil)
fmt.Println(webhookEndpoint.GetName()) // "webhook_endpoint"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `int` | No |  |
| `events` | `[]any` | No |  |
| `id` | `string` | No |  |
| `updatedAt` | `any` | No |  |
| `url` | `string` | No |  |

### Field Usage by Operation

| Field | load | update |
| --- | --- | --- |
| `createdAt` | - | - |
| `events` | - | Yes |
| `id` | - | - |
| `updatedAt` | - | - |
| `url` | - | - |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.WebhookEndpoint(nil).Load(map[string]any{"id": "webhook_endpoint_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.WebhookEndpoint(nil).Update(map[string]any{
    "id": "webhook_endpoint_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WebhookEndpointEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewEvervaultSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

