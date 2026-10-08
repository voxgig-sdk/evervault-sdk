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
| `configurations` | `[]any` | Yes | The acquirer configuration settings. |
| `default` | `bool` | Yes | Specifies whether this Acquirer is the default. |
| `description` | `string` | No | The description of the acquirer configuration. |
| `id` | `string` | Yes | The unique identifier of the acquirer configuration. |
| `name` | `string` | Yes | The name of the acquirer configuration. |

### Field Usage by Operation

| Field | load | list | create | update |
| --- | --- | --- | --- | --- |
| `configurations` | - | - | - | Yes |
| `default` | - | - | - | Yes |
| `description` | - | - | - | - |
| `id` | - | - | - | - |
| `name` | - | - | - | Yes |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Acquirer(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Acquirer(nil).Load(map[string]any{"id": "acquirer_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

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
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Acquirer(nil).Update(map[string]any{
    "id": "acquirer_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

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
| `number` | `string` | Yes | The card number for which the BIN lookup is being requested. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.BinLookup(nil).Create(map[string]any{
    "number": "example_number",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

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
| `address` | `map[string]any` | Yes | Details about the cardholder's address that the address verification (AVS) is for. |
| `automaticUpdates` | `string` | No | The status of Card Account Updater on this card. |
| `bin` | `string` | Yes | The first 6 or 8 digits of the card number. |
| `brand` | `string` | No | The card brand associated with the payment card. |
| `card` | `map[string]any` | Yes | The card details. |
| `cardholder` | `map[string]any` | No | Details about the cardholder that the name verification (ANI) is for. |
| `country` | `string` | No | The country where the card was issued. |
| `createdAt` | `int` | Yes | The Unix timestamp of when the card was created. |
| `currency` | `string` | No | The currency of the card. |
| `expiry` | `map[string]any` | Yes | The expiry date of the card. |
| `extensions` | `[]any` | No | The extensions to the card insight request. |
| `funding` | `string` | No | The card funding type specifies the method by which transactions are financed. |
| `id` | `string` | No | The unique identifier for the card. |
| `issuer` | `string` | No | The name of the card issuer. |
| `lastFour` | `string` | Yes | The last 4 digits of the card number. |
| `number` | `string` | Yes | The Evervault encrypted card number. |
| `replacement` | `any` | No | The ID of the replacement card. |
| `segment` | `string` | No | The card segment indicates the primary market or usage category of the card. |
| `status` | `string` | No | The current status of the card. |
| `updatedAt` | `any` | No | The Unix timestamp of when the card was last updated. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Card(nil).Load(map[string]any{"id": "card_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

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
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

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
| `data` | `string` | Yes | The base64-encoded image data of the card art. |
| `height` | `int` | Yes | The height of the card art image in pixels. |
| `type` | `string` | Yes | The MIME type of the card art image. |
| `width` | `int` | Yes | The width of the card art image in pixels. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.CardArt(nil).Load(map[string]any{"network_token_id": "network_token_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

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
| `action` | `string` | Yes | The action that the token should permit |
| `expiry` | `int` | No | The expiry of the token in milliseconds format. |
| `payload` | `map[string]any` | No | The payload that the token must be used with |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ClientSideToken(nil).Create(map[string]any{
    "action": "example_action",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

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
| `category` | `string` | No | The category or specific nature of the encrypted value. |
| `core_list` | `any` | No | A JSON value or file to be encrypted. |
| `cores` | `any` | No | A JSON value or file to be decrypted. |
| `createdAt` | `int` | No | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `string` | No | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `encryptedAt` | `int` | No | The date and time when the value was encrypted. |
| `fingerprint` | `string` | No | A unique identifier for the encrypted value. |
| `id` | `string` | No | The unique identifier for the custom domain. |
| `metadata` | `any` | No | Further metadata about the encrypted value. |
| `phoneNumber` | `string` | No |  |
| `relay` | `string` | No | The ID of the Relay with which this custom domain is associated. |
| `role` | `string` | No | The data role of the encrypted value. |
| `status` | `string` | No | The status of the domains DNS verification. |
| `token` | `string` | Yes | The encrypted data to be inspected. |
| `type` | `string` | No | The type of the encrypted value. |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `string` | No | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Core(nil).List(map[string]any{"relay_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Core(nil).Create(map[string]any{
    "token": "example_token",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Core(nil).Remove(map[string]any{"id": "id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

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
| `createdAt` | `int` | No | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `string` | No | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `id` | `string` | No | The unique identifier for the custom domain. |
| `relay` | `string` | No | The ID of the Relay with which this custom domain is associated. |
| `status` | `string` | No | The status of the domains DNS verification. |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `string` | No | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

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

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.CustomDomain(nil).Load(map[string]any{"id": "custom_domain_id", "relay_id": "relay_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.CustomDomain(nil).Create(map[string]any{
    "relay_id": "example_relay_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

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
| `async` | `bool` | No | If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code. |
| `createdAt` | `int` | No | The exact time, in epoch milliseconds, when this Function execution was triggered. |
| `error` | `any` | No | This field details any error that occurred during Function execution. |
| `id` | `string` | No | A unique identifier representing this specific Function execution instance. |
| `payload` | `map[string]any` | Yes | The data payload that the Function will use during its execution. |
| `result` | `map[string]any` | No | This field represents the output returned by the Function. |
| `status` | `string` | No | The outcome of the Function execution. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.FunctionRun(nil).Create(map[string]any{
    "function_name": "example_function_name",
    "payload": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

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
| `applePay` | `map[string]any` | No | The Merchant's Apple Pay configuration. |
| `business` | `map[string]any` | No | The business details of the Merchant. |
| `categoryCode` | `string` | No | The 4-digit Merchant Category Code (MCC). |
| `createdAt` | `int` | Yes | The exact time, in epoch milliseconds, when this Merchant was created. |
| `id` | `string` | Yes | A unique identifier assigned to each Merchant. |
| `name` | `string` | Yes | The official name of the Merchant as recognized in transactions and communications. |
| `networkTokens` | `map[string]any` | No | The Merchant's Network Token configuration. |
| `shortName` | `string` | No | A shorter version of the Merchant's name. |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this Merchant was last updated. |
| `website` | `string` | Yes | The official website URL of the Merchant. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Merchant(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Merchant(nil).Load(map[string]any{"id": "merchant_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

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
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Merchant(nil).Update(map[string]any{
    "id": "merchant_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

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
| `card` | `map[string]any` | Yes | The details of the underlying encrypted card. |
| `createdAt` | `int` | Yes | The exact time, in epoch milliseconds, when this Network Token was created. |
| `expiry` | `map[string]any` | Yes | The expiry details of the Network Token. |
| `id` | `string` | Yes | A unique identifier representing a specific Network Token. |
| `merchant` | `string` | Yes | The unique identifier of the Merchant associated with this Network Token. |
| `number` | `string` | Yes | The unique number of the Network Token. |
| `paymentAccountReference` | `string` | No | The unique identifier of the Payment Account associated with this Network Token. |
| `status` | `string` | Yes | The status of the Network Token. |
| `tokenRequestorIdentifier` | `string` | Yes | The identifier of the Token Requestor (TRID) that requested the Network Token. |
| `tokenServiceProvider` | `string` | Yes | The Token Service Provider (TSP) that issued the Network Token. |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this Network Token was last updated. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.NetworkToken(nil).Load(map[string]any{"id": "network_token_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

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
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

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

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.NetworkTokenCryptogram(nil).Create(map[string]any{
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

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
| `created_at` | `int` | No | Timestamp when the message was created |
| `data` | `map[string]any` | No | The message data payload |
| `type` | `string` | No | The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes) |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Payment(nil).List(map[string]any{"3ds_session_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Payment(nil).Remove(map[string]any{"acquirer_id": "acquirer_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

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
| `app` | `string` | No | The unique identifier for the app to which the Relay belongs. |
| `authentication` | `any` | No | The type of authentication required for the Relay |
| `createdAt` | `int` | No | The exact time, in epoch milliseconds, when this Relay was created. |
| `destinationDomain` | `string` | No | The domain in front of which the Relay should be configured. |
| `encryptEmptyStrings` | `bool` | No | Whether or not empty strings should be encrypted. |
| `evervaultDomain` | `string` | No | The Evervault managed domain to which requests to be relayed to the destination domain should be sent. |
| `id` | `string` | No | The unique identifier for the Relay. |
| `routes` | `[]any` | No | A collection of route configurations for the Relay. |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this Relay was updated. |

### Field Usage by Operation

| Field | load | list | create | update |
| --- | --- | --- | --- | --- |
| `app` | - | - | - | - |
| `authentication` | - | - | - | - |
| `createdAt` | - | - | - | - |
| `destinationDomain` | - | - | Yes | - |
| `encryptEmptyStrings` | - | - | - | - |
| `evervaultDomain` | - | - | - | - |
| `id` | - | - | - | - |
| `routes` | - | - | Yes | - |
| `updatedAt` | - | - | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Relay(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Relay(nil).Load(map[string]any{"id": "relay_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Relay(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Relay(nil).Update(map[string]any{
    "id": "relay_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

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
| `accessControlServer` | `map[string]any` | No | Details about the Access Control Server involved in the 3DS transaction. |
| `acquirer` | `map[string]any` | Yes | The acquirer of the payment. |
| `ares` | `map[string]any` | No | The details of the 3DS Authentication Response (ARes). |
| `authentication` | `map[string]any` | Yes | The details of the 3DS Authentication. |
| `card` | `map[string]any` | Yes | The card details. |
| `challenge` | `map[string]any` | Yes | Details about the 3DS challenge. |
| `createdAt` | `int` | Yes | The exact time, in epoch milliseconds, when this 3DS-Session was created. |
| `cres` | `any` | No | The details of the 3DS Challenge Response (CRes). |
| `cryptogram` | `string` | No | The 3DS cryptogram (also called Authentication Value). |
| `customer` | `map[string]any` | No | The details of the customer who initiated the transaction. |
| `directoryServer` | `map[string]any` | No | Details about the Directory Server involved in the 3DS transaction. |
| `eci` | `map[string]any` | No | The details of the Electronic Commerce Indicator. |
| `failureReason` | `string` | No | The reason for the 3DS Authentication failure. |
| `id` | `string` | Yes | A unique identifier assigned to each 3DS Authentication. |
| `initiator` | `map[string]any` | No | Details about the transaction initiation process. |
| `merchant` | `map[string]any` | Yes | The merchant details. |
| `nextAction` | `map[string]any` | Yes | The next action required to complete the 3DS Authentication. |
| `payment` | `map[string]any` | No | The payment details of the 3D Secure Authentication. |
| `preferredVersions` | `[]any` | No | A prioritized list of preferred 3D Secure versions. |
| `rreq` | `any` | No | The result of the 3DS authentication when a challenge has occurred. |
| `status` | `string` | Yes | The status of the 3DS Authentication. |
| `threeDSServer` | `map[string]any` | No | Details about the 3DS Server involved in the 3DS transaction. |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this 3DS-Session was last updated. |
| `version` | `string` | Yes | The 3D Secure version used to authenticate the session. |

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

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.ThreeDsSession(nil).Load(map[string]any{"3ds_session_id": "3ds_session_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

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
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## WebhookEntity

```go
webhook := client.Webhook(nil)
fmt.Println(webhook.GetName()) // "webhook"
```

### Operations

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Webhook(nil).Remove(map[string]any{"webhook_endpoint_id": "webhook_endpoint_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

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
| `createdAt` | `int` | No | The exact time, in epoch milliseconds, when this Webhook Endpoint was created. |
| `events` | `[]any` | No | A list of Events that the Webhook Endpoint is subscribed to. |
| `id` | `string` | No | A unique identifier representing a specific Webhook Endpoint. |
| `updatedAt` | `any` | No | The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated. |
| `url` | `string` | No | The URL of the Webhook Endpoint. |

### Field Usage by Operation

| Field | load | list | create | update |
| --- | --- | --- | --- | --- |
| `createdAt` | - | - | - | - |
| `events` | - | - | Yes | Yes |
| `id` | - | - | - | - |
| `updatedAt` | - | - | - | - |
| `url` | - | - | Yes | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.WebhookEndpoint(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.WebhookEndpoint(nil).Load(map[string]any{"id": "webhook_endpoint_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.WebhookEndpoint(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.WebhookEndpoint(nil).Update(map[string]any{
    "id": "webhook_endpoint_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
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

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Debug capture |
| `idempotency` | 0.0.1 | Idempotency |
| `metrics` | 0.0.1 | Metrics |
| `paging` | 0.0.1 | Paging |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```go
client := sdk.NewEvervaultSDK(map[string]any{
    "feature": map[string]any{
        "debug": map[string]any{"active": true},
        "idempotency": map[string]any{"active": true},
        "metrics": map[string]any{"active": true},
        "paging": map[string]any{"active": true},
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `debug`

Debug capture.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

| Option | Type |
|---|---|
| `now` | function |
| `onEntry` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.debug.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `idempotency`

Idempotency.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

| Option | Type |
|---|---|
| `keygen` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.idempotency.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `metrics`

Metrics.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.metrics.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `paging`

Paging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

