# Evervault Lua SDK Reference

Complete API reference for the Evervault Lua SDK.


## EvervaultSDK

### Constructor

```lua
local sdk = require("evervault_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Acquirer(data)`

Create a new `Acquirer` entity instance. Pass `nil` for no initial data.

#### `BinLookup(data)`

Create a new `BinLookup` entity instance. Pass `nil` for no initial data.

#### `Card(data)`

Create a new `Card` entity instance. Pass `nil` for no initial data.

#### `CardArt(data)`

Create a new `CardArt` entity instance. Pass `nil` for no initial data.

#### `ClientSideToken(data)`

Create a new `ClientSideToken` entity instance. Pass `nil` for no initial data.

#### `Core(data)`

Create a new `Core` entity instance. Pass `nil` for no initial data.

#### `CustomDomain(data)`

Create a new `CustomDomain` entity instance. Pass `nil` for no initial data.

#### `FunctionRun(data)`

Create a new `FunctionRun` entity instance. Pass `nil` for no initial data.

#### `Merchant(data)`

Create a new `Merchant` entity instance. Pass `nil` for no initial data.

#### `NetworkToken(data)`

Create a new `NetworkToken` entity instance. Pass `nil` for no initial data.

#### `NetworkTokenCryptogram(data)`

Create a new `NetworkTokenCryptogram` entity instance. Pass `nil` for no initial data.

#### `Payment(data)`

Create a new `Payment` entity instance. Pass `nil` for no initial data.

#### `Relay(data)`

Create a new `Relay` entity instance. Pass `nil` for no initial data.

#### `ThreeDsSession(data)`

Create a new `ThreeDsSession` entity instance. Pass `nil` for no initial data.

#### `Webhook(data)`

Create a new `Webhook` entity instance. Pass `nil` for no initial data.

#### `WebhookEndpoint(data)`

Create a new `WebhookEndpoint` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AcquirerEntity

```lua
local acquirer = client:Acquirer(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `configurations` | `table` | Yes | The acquirer configuration settings. |
| `default` | `boolean` | Yes | Specifies whether this Acquirer is the default. |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Acquirer():create({
  configurations = --[[ table ]],
  default = --[[ boolean ]],
  id = --[[ string ]],
  name = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Acquirer():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Acquirer():load({ id = "acquirer_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Acquirer():update({
  id = "acquirer_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AcquirerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BinLookupEntity

```lua
local bin_lookup = client:BinLookup(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `number` | `string` | Yes | The card number for which the BIN lookup is being requested. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:BinLookup():create({
  number = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BinLookupEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CardEntity

```lua
local card = client:Card(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `table` | Yes | Details about the cardholder's address that the address verification (AVS) is for. |
| `automaticUpdates` | `string` | No | The status of Card Account Updater on this card. |
| `bin` | `string` | Yes | The first 6 or 8 digits of the card number. |
| `brand` | `string` | No | The card brand associated with the payment card. |
| `card` | `table` | Yes | The card details. |
| `cardholder` | `table` | No | Details about the cardholder that the name verification (ANI) is for. |
| `country` | `string` | No | The country where the card was issued. |
| `createdAt` | `number` | Yes | The Unix timestamp of when the card was created. |
| `currency` | `string` | No | The currency of the card. |
| `expiry` | `table` | Yes | The expiry date of the card. |
| `extensions` | `table` | No | The extensions to the card insight request. |
| `funding` | `string` | No | The card funding type specifies the method by which transactions are financed. |
| `id` | `string` | No | The unique identifier for the card. |
| `issuer` | `string` | No | The name of the card issuer. |
| `lastFour` | `string` | Yes | The last 4 digits of the card number. |
| `number` | `string` | Yes | The Evervault encrypted card number. |
| `replacement` | `string|nil` | No | The ID of the replacement card. |
| `segment` | `string` | No | The card segment indicates the primary market or usage category of the card. |
| `status` | `string` | No | The current status of the card. |
| `updatedAt` | `number|nil` | No | The Unix timestamp of when the card was last updated. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Card():create({
  address = --[[ table ]],
  bin = --[[ string ]],
  card = --[[ table ]],
  createdAt = --[[ number ]],
  expiry = --[[ table ]],
  lastFour = --[[ string ]],
  number = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Card():load({ id = "card_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CardArtEntity

```lua
local card_art = client:CardArt(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `string` | Yes | The base64-encoded image data of the card art. |
| `height` | `number` | Yes | The height of the card art image in pixels. |
| `type` | `string` | Yes | The MIME type of the card art image. |
| `width` | `number` | Yes | The width of the card art image in pixels. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:CardArt():load({ network_token_id = "network_token_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardArtEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ClientSideTokenEntity

```lua
local client_side_token = client:ClientSideToken(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes | The action that the token should permit |
| `expiry` | `number` | No | The expiry of the token in milliseconds format. |
| `payload` | `table` | No | The payload that the token must be used with |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ClientSideToken():create({
  action = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ClientSideTokenEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CoreEntity

```lua
local core = client:Core(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | No | The category or specific nature of the encrypted value. |
| `core_list` | `table|string|number|boolean` | No | A JSON value or file to be encrypted. |
| `cores` | `table|string` | No | A JSON value or file to be decrypted. |
| `createdAt` | `number` | No | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `string` | No | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `encryptedAt` | `number` | No | The date and time when the value was encrypted. |
| `fingerprint` | `string` | No | A unique identifier for the encrypted value. |
| `id` | `string` | No | The unique identifier for the custom domain. |
| `metadata` | `any` | No | Further metadata about the encrypted value. |
| `phoneNumber` | `string` | No |  |
| `relay` | `string` | No | The ID of the Relay with which this custom domain is associated. |
| `role` | `string` | No | The data role of the encrypted value. |
| `status` | `string` | No | The status of the domains DNS verification. |
| `token` | `string` | Yes | The encrypted data to be inspected. |
| `type` | `string` | No | The type of the encrypted value. |
| `updatedAt` | `number` | No | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `string` | No | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Core():create({
  token = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Core():list({ relay_id = "example" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Core():remove({ id = "id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CoreEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CustomDomainEntity

```lua
local custom_domain = client:CustomDomain(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `number` | No | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `string` | No | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `id` | `string` | No | The unique identifier for the custom domain. |
| `relay` | `string` | No | The ID of the Relay with which this custom domain is associated. |
| `status` | `string` | No | The status of the domains DNS verification. |
| `updatedAt` | `number` | No | The exact time, in epoch milliseconds, when this custom domain was last updated. |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:CustomDomain():create({
  relay_id = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:CustomDomain():load({ id = "custom_domain_id", relay_id = "relay_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CustomDomainEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FunctionRunEntity

```lua
local function_run = client:FunctionRun(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `async` | `boolean` | No | If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code. |
| `createdAt` | `number` | No | The exact time, in epoch milliseconds, when this Function execution was triggered. |
| `error` | `table|nil` | No | This field details any error that occurred during Function execution. |
| `id` | `string` | No | A unique identifier representing this specific Function execution instance. |
| `payload` | `table` | Yes | The data payload that the Function will use during its execution. |
| `result` | `table` | No | This field represents the output returned by the Function. |
| `status` | `string` | No | The outcome of the Function execution. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:FunctionRun():create({
  function_name = --[[ string ]],
  payload = --[[ table ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FunctionRunEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MerchantEntity

```lua
local merchant = client:Merchant(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `applePay` | `table` | No | The Merchant's Apple Pay configuration. |
| `business` | `table` | No | The business details of the Merchant. |
| `categoryCode` | `string` | No | The 4-digit Merchant Category Code (MCC). |
| `createdAt` | `number` | Yes | The exact time, in epoch milliseconds, when this Merchant was created. |
| `id` | `string` | Yes | A unique identifier assigned to each Merchant. |
| `name` | `string` | Yes | The official name of the Merchant as recognized in transactions and communications. |
| `networkTokens` | `table` | No | The Merchant's Network Token configuration. |
| `shortName` | `string` | No | A shorter version of the Merchant's name. |
| `updatedAt` | `number` | No | The exact time, in epoch milliseconds, when this Merchant was last updated. |
| `website` | `string` | Yes | The official website URL of the Merchant. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Merchant():create({
  createdAt = --[[ number ]],
  id = --[[ string ]],
  name = --[[ string ]],
  website = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Merchant():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Merchant():load({ id = "merchant_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Merchant():update({
  id = "merchant_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MerchantEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## NetworkTokenEntity

```lua
local network_token = client:NetworkToken(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | `table` | Yes | The details of the underlying encrypted card. |
| `createdAt` | `number` | Yes | The exact time, in epoch milliseconds, when this Network Token was created. |
| `expiry` | `table` | Yes | The expiry details of the Network Token. |
| `id` | `string` | Yes | A unique identifier representing a specific Network Token. |
| `merchant` | `string` | Yes | The unique identifier of the Merchant associated with this Network Token. |
| `number` | `string` | Yes | The unique number of the Network Token. |
| `paymentAccountReference` | `string` | No | The unique identifier of the Payment Account associated with this Network Token. |
| `status` | `string` | Yes | The status of the Network Token. |
| `tokenRequestorIdentifier` | `string` | Yes | The identifier of the Token Requestor (TRID) that requested the Network Token. |
| `tokenServiceProvider` | `string` | Yes | The Token Service Provider (TSP) that issued the Network Token. |
| `updatedAt` | `number` | No | The exact time, in epoch milliseconds, when this Network Token was last updated. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:NetworkToken():create({
  card = --[[ table ]],
  createdAt = --[[ number ]],
  expiry = --[[ table ]],
  id = --[[ string ]],
  merchant = --[[ string ]],
  number = --[[ string ]],
  status = --[[ string ]],
  tokenRequestorIdentifier = --[[ string ]],
  tokenServiceProvider = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:NetworkToken():load({ id = "network_token_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NetworkTokenEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## NetworkTokenCryptogramEntity

```lua
local network_token_cryptogram = client:NetworkTokenCryptogram(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `number` | No |  |
| `cryptogram` | `string` | No |  |
| `id` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:NetworkTokenCryptogram():create({
  id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NetworkTokenCryptogramEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PaymentEntity

```lua
local payment = client:Payment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `number` | No | Timestamp when the message was created |
| `data` | `table` | No | The message data payload |
| `type` | `string` | No | The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes) |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Payment():list({ ["3ds_session_id"] = "example" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Payment():remove({ acquirer_id = "acquirer_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaymentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RelayEntity

```lua
local relay = client:Relay(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `string` | No | The unique identifier for the app to which the Relay belongs. |
| `authentication` | `string|nil` | No | The type of authentication required for the Relay |
| `createdAt` | `number` | No | The exact time, in epoch milliseconds, when this Relay was created. |
| `destinationDomain` | `string` | No | The domain in front of which the Relay should be configured. |
| `encryptEmptyStrings` | `boolean` | No | Whether or not empty strings should be encrypted. |
| `evervaultDomain` | `string` | No | The Evervault managed domain to which requests to be relayed to the destination domain should be sent. |
| `id` | `string` | No | The unique identifier for the Relay. |
| `routes` | `table` | No | A collection of route configurations for the Relay. |
| `updatedAt` | `number` | No | The exact time, in epoch milliseconds, when this Relay was updated. |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Relay():create({
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Relay():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Relay():load({ id = "relay_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Relay():update({
  id = "relay_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RelayEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ThreeDsSessionEntity

```lua
local three_ds_session = client:ThreeDsSession(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accessControlServer` | `table` | No | Details about the Access Control Server involved in the 3DS transaction. |
| `acquirer` | `table` | Yes | The acquirer of the payment. |
| `ares` | `table` | No | The details of the 3DS Authentication Response (ARes). |
| `authentication` | `table` | Yes | The details of the 3DS Authentication. |
| `card` | `table` | Yes | The card details. |
| `challenge` | `table` | Yes | Details about the 3DS challenge. |
| `createdAt` | `number` | Yes | The exact time, in epoch milliseconds, when this 3DS-Session was created. |
| `cres` | `nil|table` | No | The details of the 3DS Challenge Response (CRes). |
| `cryptogram` | `string` | No | The 3DS cryptogram (also called Authentication Value). |
| `customer` | `table` | No | The details of the customer who initiated the transaction. |
| `directoryServer` | `table` | No | Details about the Directory Server involved in the 3DS transaction. |
| `eci` | `table` | No | The details of the Electronic Commerce Indicator. |
| `failureReason` | `string` | No | The reason for the 3DS Authentication failure. |
| `id` | `string` | Yes | A unique identifier assigned to each 3DS Authentication. |
| `initiator` | `table` | No | Details about the transaction initiation process. |
| `merchant` | `table` | Yes | The merchant details. |
| `nextAction` | `table` | Yes | The next action required to complete the 3DS Authentication. |
| `payment` | `table` | No | The payment details of the 3D Secure Authentication. |
| `preferredVersions` | `table` | No | A prioritized list of preferred 3D Secure versions. |
| `rreq` | `nil|table` | No | The result of the 3DS authentication when a challenge has occurred. |
| `status` | `string` | Yes | The status of the 3DS Authentication. |
| `threeDSServer` | `table` | No | Details about the 3DS Server involved in the 3DS transaction. |
| `updatedAt` | `number` | No | The exact time, in epoch milliseconds, when this 3DS-Session was last updated. |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ThreeDsSession():create({
  acquirer = --[[ table ]],
  authentication = --[[ table ]],
  card = --[[ table ]],
  challenge = --[[ table ]],
  createdAt = --[[ number ]],
  id = --[[ string ]],
  merchant = --[[ table ]],
  nextAction = --[[ table ]],
  status = --[[ string ]],
  version = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ThreeDsSession():load({ ["3ds_session_id"] = "3ds_session_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ThreeDsSessionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WebhookEntity

```lua
local webhook = client:Webhook(nil)
```

### Operations

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Webhook():remove({ webhook_endpoint_id = "webhook_endpoint_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebhookEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WebhookEndpointEntity

```lua
local webhook_endpoint = client:WebhookEndpoint(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `number` | No | The exact time, in epoch milliseconds, when this Webhook Endpoint was created. |
| `events` | `table` | No | A list of Events that the Webhook Endpoint is subscribed to. |
| `id` | `string` | No | A unique identifier representing a specific Webhook Endpoint. |
| `updatedAt` | `number|nil` | No | The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated. |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:WebhookEndpoint():create({
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:WebhookEndpoint():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:WebhookEndpoint():load({ id = "webhook_endpoint_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:WebhookEndpoint():update({
  id = "webhook_endpoint_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebhookEndpointEntity` instance with the same client and
options.

#### `get_name() -> string`

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

```lua
local client = sdk.new({
  feature = {
    debug = { active = true },
    idempotency = { active = true },
    metrics = { active = true },
    paging = { active = true },
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
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

