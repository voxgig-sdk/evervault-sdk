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
| `configuration` | `[]any` | Yes |  |
| `default` | `bool` | Yes |  |
| `description` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | create | update |
| --- | --- | --- | --- |
| `configuration` | - | - | Yes |
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
    "configuration": []any{},
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
| `automatic_update` | `string` | No |  |
| `bin` | `string` | Yes |  |
| `brand` | `string` | No |  |
| `card` | `map[string]any` | Yes |  |
| `cardholder` | `map[string]any` | No |  |
| `country` | `string` | No |  |
| `created_at` | `int` | Yes |  |
| `currency` | `string` | No |  |
| `expiry` | `map[string]any` | Yes |  |
| `extension` | `[]any` | No |  |
| `funding` | `string` | No |  |
| `id` | `string` | No |  |
| `issuer` | `string` | No |  |
| `last_four` | `string` | Yes |  |
| `number` | `string` | Yes |  |
| `replacement` | `any` | No |  |
| `segment` | `string` | No |  |
| `status` | `string` | No |  |
| `updated_at` | `any` | No |  |

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
    "bin": "example_bin",
    "card": map[string]any{},
    "created_at": 1,
    "expiry": map[string]any{},
    "last_four": "example_last_four",
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
| `category` | `string` | No |  |
| `created_at` | `int` | No |  |
| `custom_domain` | `string` | No |  |
| `destination_domain` | `string` | Yes |  |
| `encrypt_empty_string` | `bool` | No |  |
| `encrypted_at` | `int` | No |  |
| `evervault_domain` | `string` | No |  |
| `fingerprint` | `string` | No |  |
| `id` | `string` | No |  |
| `metadata` | `any` | No |  |
| `phone_number` | `string` | No |  |
| `relay` | `string` | No |  |
| `role` | `string` | No |  |
| `route` | `[]any` | Yes |  |
| `status` | `string` | No |  |
| `token` | `string` | Yes |  |
| `type` | `string` | No |  |
| `updated_at` | `int` | No |  |
| `validation_record` | `string` | No |  |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `app` | - | - | - |
| `authentication` | - | - | - |
| `category` | - | - | - |
| `created_at` | - | - | - |
| `custom_domain` | - | - | - |
| `destination_domain` | Yes | - | - |
| `encrypt_empty_string` | - | - | - |
| `encrypted_at` | - | - | - |
| `evervault_domain` | - | - | - |
| `fingerprint` | - | - | - |
| `id` | - | - | - |
| `metadata` | - | - | - |
| `phone_number` | - | - | - |
| `relay` | - | - | - |
| `role` | - | - | - |
| `route` | Yes | - | - |
| `status` | - | - | - |
| `token` | - | - | - |
| `type` | - | - | - |
| `updated_at` | - | - | - |
| `validation_record` | - | - | - |

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
    "destination_domain": "example_destination_domain",
    "route": []any{},
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
| `created_at` | `int` | No |  |
| `custom_domain` | `string` | No |  |
| `id` | `string` | No |  |
| `relay` | `string` | No |  |
| `status` | `string` | No |  |
| `updated_at` | `int` | No |  |
| `validation_record` | `string` | No |  |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `created_at` | - | - |
| `custom_domain` | - | Yes |
| `id` | - | - |
| `relay` | - | - |
| `status` | - | - |
| `updated_at` | - | - |
| `validation_record` | - | - |

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
| `created_at` | `int` | No |  |
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
| `apple_pay` | `map[string]any` | No |  |
| `business` | `map[string]any` | No |  |
| `category_code` | `string` | No |  |
| `created_at` | `int` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `network_token` | `map[string]any` | No |  |
| `short_name` | `string` | No |  |
| `updated_at` | `int` | No |  |
| `website` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | create | update |
| --- | --- | --- | --- |
| `apple_pay` | - | - | - |
| `business` | - | Yes | - |
| `category_code` | - | Yes | - |
| `created_at` | - | - | - |
| `id` | - | - | - |
| `name` | - | - | - |
| `network_token` | - | - | - |
| `short_name` | - | - | - |
| `updated_at` | - | - | - |
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
    "created_at": 1,
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
| `created_at` | `int` | Yes |  |
| `expiry` | `map[string]any` | Yes |  |
| `id` | `string` | Yes |  |
| `merchant` | `string` | Yes |  |
| `number` | `string` | Yes |  |
| `payment_account_reference` | `string` | No |  |
| `status` | `string` | Yes |  |
| `token_requestor_identifier` | `string` | Yes |  |
| `token_service_provider` | `string` | Yes |  |
| `update_type` | `string` | No |  |
| `updated_at` | `int` | No |  |

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
    "created_at": 1,
    "expiry": map[string]any{},
    "id": "example_id",
    "merchant": "example_merchant",
    "number": "example_number",
    "status": "example_status",
    "token_requestor_identifier": "example_token_requestor_identifier",
    "token_service_provider": "example_token_service_provider",
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
| `created_at` | `int` | No |  |
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
| `apple_pay` | `map[string]any` | No |  |
| `business` | `map[string]any` | No |  |
| `category_code` | `string` | No |  |
| `configuration` | `[]any` | Yes |  |
| `created_at` | `int` | Yes |  |
| `data` | `map[string]any` | No |  |
| `default` | `bool` | Yes |  |
| `description` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `network_token` | `map[string]any` | No |  |
| `short_name` | `string` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `int` | No |  |
| `website` | `string` | Yes |  |

### Field Usage by Operation

| Field | list | remove |
| --- | --- | --- |
| `apple_pay` | - | - |
| `business` | - | - |
| `category_code` | - | - |
| `configuration` | - | - |
| `created_at` | Yes | - |
| `data` | - | - |
| `default` | - | - |
| `description` | - | - |
| `id` | - | - |
| `name` | - | - |
| `network_token` | - | - |
| `short_name` | - | - |
| `type` | - | - |
| `updated_at` | - | - |
| `website` | - | - |

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
| `created_at` | `int` | No |  |
| `destination_domain` | `string` | No |  |
| `encrypt_empty_string` | `bool` | No |  |
| `evervault_domain` | `string` | No |  |
| `id` | `string` | No |  |
| `route` | `[]any` | No |  |
| `updated_at` | `int` | No |  |

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
| `access_control_server` | `map[string]any` | No |  |
| `acquirer` | `map[string]any` | Yes |  |
| `are` | `map[string]any` | No |  |
| `authentication` | `map[string]any` | Yes |  |
| `card` | `map[string]any` | Yes |  |
| `challenge` | `map[string]any` | Yes |  |
| `cre` | `any` | No |  |
| `created_at` | `int` | Yes |  |
| `cryptogram` | `string` | No |  |
| `customer` | `map[string]any` | No |  |
| `directory_server` | `map[string]any` | No |  |
| `eci` | `map[string]any` | No |  |
| `failure_reason` | `string` | No |  |
| `id` | `string` | Yes |  |
| `initiator` | `map[string]any` | No |  |
| `merchant` | `map[string]any` | Yes |  |
| `next_action` | `map[string]any` | Yes |  |
| `payment` | `map[string]any` | No |  |
| `preferred_version` | `[]any` | No |  |
| `rreq` | `any` | No |  |
| `status` | `string` | Yes |  |
| `three_ds_server` | `map[string]any` | No |  |
| `updated_at` | `int` | No |  |
| `version` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `access_control_server` | - | - |
| `acquirer` | - | Yes |
| `are` | - | - |
| `authentication` | - | - |
| `card` | - | - |
| `challenge` | - | - |
| `cre` | - | - |
| `created_at` | - | - |
| `cryptogram` | - | - |
| `customer` | - | - |
| `directory_server` | - | - |
| `eci` | - | - |
| `failure_reason` | - | - |
| `id` | - | - |
| `initiator` | - | - |
| `merchant` | - | - |
| `next_action` | - | - |
| `payment` | - | - |
| `preferred_version` | - | - |
| `rreq` | - | - |
| `status` | - | - |
| `three_ds_server` | - | - |
| `updated_at` | - | - |
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
    "created_at": 1,
    "id": "example_id",
    "merchant": map[string]any{},
    "next_action": map[string]any{},
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
| `created_at` | `int` | No |  |
| `event` | `[]any` | Yes |  |
| `id` | `string` | No |  |
| `updated_at` | `any` | No |  |
| `url` | `string` | Yes |  |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `created_at` | - | - | - |
| `event` | Yes | - | - |
| `id` | - | - | - |
| `updated_at` | - | - | - |
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
    "event": []any{},
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
| `created_at` | `int` | No |  |
| `event` | `[]any` | No |  |
| `id` | `string` | No |  |
| `updated_at` | `any` | No |  |
| `url` | `string` | No |  |

### Field Usage by Operation

| Field | load | update |
| --- | --- | --- |
| `created_at` | - | - |
| `event` | - | Yes |
| `id` | - | - |
| `updated_at` | - | - |
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

