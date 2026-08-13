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
| `configurations` | `table` | Yes |  |
| `default` | `boolean` | Yes |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Acquirer():create({
  configurations = --[[ table ]],
  default = --[[ boolean ]],
  id = --[[ string ]],
  name = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Acquirer():load({ id = "acquirer_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

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
| `number` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

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
| `address` | `table` | Yes |  |
| `card` | `table` | Yes |  |
| `cardholder` | `table` | No |  |
| `expiry` | `table` | Yes |  |
| `extensions` | `table` | No |  |
| `month` | `string` | Yes |  |
| `number` | `string` | Yes |  |
| `year` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Card():create({
  address = --[[ table ]],
  card = --[[ table ]],
  expiry = --[[ table ]],
  month = --[[ string ]],
  number = --[[ string ]],
  year = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

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
| `data` | `string` | Yes |  |
| `height` | `number` | Yes |  |
| `type` | `string` | Yes |  |
| `width` | `number` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

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
| `action` | `string` | Yes |  |
| `expiry` | `number` | No |  |
| `payload` | `table` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

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
| `app` | `string` | No |  |
| `authentication` | `string|nil` | No |  |
| `createdAt` | `number` | No |  |
| `customDomain` | `string` | No |  |
| `destinationDomain` | `string` | Yes |  |
| `encryptEmptyStrings` | `boolean` | No |  |
| `evervaultDomain` | `string` | No |  |
| `id` | `string` | No |  |
| `phoneNumber` | `string` | No |  |
| `relay` | `string` | No |  |
| `routes` | `table` | Yes |  |
| `status` | `string` | No |  |
| `token` | `string` | Yes |  |
| `updatedAt` | `number` | No |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Core():create({
  destinationDomain = --[[ string ]],
  routes = --[[ table ]],
  token = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Core():list()
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

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
| `createdAt` | `number` | No |  |
| `customDomain` | `string` | No |  |
| `id` | `string` | No |  |
| `relay` | `string` | No |  |
| `status` | `string` | No |  |
| `updatedAt` | `number` | No |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:CustomDomain():create({
  relay_id = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

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
| `async` | `boolean` | No |  |
| `createdAt` | `number` | No |  |
| `error` | `table|nil` | No |  |
| `id` | `string` | No |  |
| `payload` | `table` | Yes |  |
| `result` | `table` | No |  |
| `status` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

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
| `applePay` | `table` | No |  |
| `business` | `table` | No |  |
| `categoryCode` | `string` | No |  |
| `createdAt` | `number` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `networkTokens` | `table` | No |  |
| `shortName` | `string` | No |  |
| `updatedAt` | `number` | No |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Merchant():create({
  createdAt = --[[ number ]],
  id = --[[ string ]],
  name = --[[ string ]],
  website = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Merchant():load({ id = "merchant_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

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
| `card` | `table` | Yes |  |
| `createdAt` | `number` | Yes |  |
| `expiry` | `table` | Yes |  |
| `id` | `string` | Yes |  |
| `merchant` | `string` | Yes |  |
| `number` | `string` | Yes |  |
| `paymentAccountReference` | `string` | No |  |
| `status` | `string` | Yes |  |
| `tokenRequestorIdentifier` | `string` | Yes |  |
| `tokenServiceProvider` | `string` | Yes |  |
| `updateType` | `string` | No |  |
| `updatedAt` | `number` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

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

Load a single entity matching the given criteria.

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

Create a new entity with the given data.

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
| `applePay` | `table` | No |  |
| `business` | `table` | No |  |
| `categoryCode` | `string` | No |  |
| `configurations` | `table` | Yes |  |
| `createdAt` | `number` | Yes |  |
| `created_at` | `number` | No |  |
| `data` | `table` | No |  |
| `default` | `boolean` | Yes |  |
| `description` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `networkTokens` | `table` | No |  |
| `shortName` | `string` | No |  |
| `type` | `string` | No |  |
| `updatedAt` | `number` | No |  |
| `website` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Payment():list()
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Payment():remove()
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
| `app` | `string` | No |  |
| `authentication` | `string|nil` | No |  |
| `createdAt` | `number` | No |  |
| `destinationDomain` | `string` | No |  |
| `encryptEmptyStrings` | `boolean` | No |  |
| `evervaultDomain` | `string` | No |  |
| `id` | `string` | No |  |
| `routes` | `table` | No |  |
| `updatedAt` | `number` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Relay():load({ id = "relay_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

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
| `accessControlServer` | `table` | No |  |
| `acquirer` | `table` | Yes |  |
| `ares` | `table` | No |  |
| `authentication` | `table` | Yes |  |
| `card` | `table` | Yes |  |
| `challenge` | `table` | Yes |  |
| `createdAt` | `number` | Yes |  |
| `cres` | `nil|table` | No |  |
| `cryptogram` | `string` | No |  |
| `customer` | `table` | No |  |
| `directoryServer` | `table` | No |  |
| `eci` | `table` | No |  |
| `failureReason` | `string` | No |  |
| `id` | `string` | Yes |  |
| `initiator` | `table` | No |  |
| `merchant` | `table` | Yes |  |
| `nextAction` | `table` | Yes |  |
| `payment` | `table` | No |  |
| `preferredVersions` | `table` | No |  |
| `rreq` | `nil|table` | No |  |
| `status` | `string` | Yes |  |
| `threeDSServer` | `table` | No |  |
| `updatedAt` | `number` | No |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

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

Load a single entity matching the given criteria.

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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `number` | No |  |
| `events` | `table` | Yes |  |
| `id` | `string` | No |  |
| `updatedAt` | `number|nil` | No |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Webhook():create({
  events = --[[ table ]],
  url = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Webhook():list()
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

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
| `createdAt` | `number` | No |  |
| `events` | `table` | No |  |
| `id` | `string` | No |  |
| `updatedAt` | `number|nil` | No |  |
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:WebhookEndpoint():load({ id = "webhook_endpoint_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

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
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

