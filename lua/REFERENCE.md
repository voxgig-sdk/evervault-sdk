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
| `configuration` | `table` | Yes |  |
| `default` | `boolean` | Yes |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Acquirer():create({
  configuration = --[[ table ]],
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
| `automatic_update` | `string` | No |  |
| `bin` | `string` | Yes |  |
| `brand` | `string` | No |  |
| `card` | `table` | Yes |  |
| `cardholder` | `table` | No |  |
| `country` | `string` | No |  |
| `created_at` | `number` | Yes |  |
| `currency` | `string` | No |  |
| `expiry` | `table` | Yes |  |
| `extension` | `table` | No |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Card():create({
  address = --[[ table ]],
  bin = --[[ string ]],
  card = --[[ table ]],
  created_at = --[[ number ]],
  expiry = --[[ table ]],
  last_four = --[[ string ]],
  number = --[[ string ]],
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
| `authentication` | `any` | No |  |
| `category` | `string` | No |  |
| `created_at` | `number` | No |  |
| `custom_domain` | `string` | No |  |
| `destination_domain` | `string` | Yes |  |
| `encrypt_empty_string` | `boolean` | No |  |
| `encrypted_at` | `number` | No |  |
| `evervault_domain` | `string` | No |  |
| `fingerprint` | `string` | No |  |
| `id` | `string` | No |  |
| `metadata` | `any` | No |  |
| `phone_number` | `string` | No |  |
| `relay` | `string` | No |  |
| `role` | `string` | No |  |
| `route` | `table` | Yes |  |
| `status` | `string` | No |  |
| `token` | `string` | Yes |  |
| `type` | `string` | No |  |
| `updated_at` | `number` | No |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Core():create({
  destination_domain = --[[ string ]],
  route = --[[ table ]],
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
| `created_at` | `number` | No |  |
| `custom_domain` | `string` | No |  |
| `id` | `string` | No |  |
| `relay` | `string` | No |  |
| `status` | `string` | No |  |
| `updated_at` | `number` | No |  |
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
| `created_at` | `number` | No |  |
| `error` | `any` | No |  |
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
| `apple_pay` | `table` | No |  |
| `business` | `table` | No |  |
| `category_code` | `string` | No |  |
| `created_at` | `number` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `network_token` | `table` | No |  |
| `short_name` | `string` | No |  |
| `updated_at` | `number` | No |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Merchant():create({
  created_at = --[[ number ]],
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
| `created_at` | `number` | Yes |  |
| `expiry` | `table` | Yes |  |
| `id` | `string` | Yes |  |
| `merchant` | `string` | Yes |  |
| `number` | `string` | Yes |  |
| `payment_account_reference` | `string` | No |  |
| `status` | `string` | Yes |  |
| `token_requestor_identifier` | `string` | Yes |  |
| `token_service_provider` | `string` | Yes |  |
| `update_type` | `string` | No |  |
| `updated_at` | `number` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:NetworkToken():create({
  card = --[[ table ]],
  created_at = --[[ number ]],
  expiry = --[[ table ]],
  id = --[[ string ]],
  merchant = --[[ string ]],
  number = --[[ string ]],
  status = --[[ string ]],
  token_requestor_identifier = --[[ string ]],
  token_service_provider = --[[ string ]],
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
| `created_at` | `number` | No |  |
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
| `apple_pay` | `table` | No |  |
| `business` | `table` | No |  |
| `category_code` | `string` | No |  |
| `configuration` | `table` | Yes |  |
| `created_at` | `number` | Yes |  |
| `data` | `table` | No |  |
| `default` | `boolean` | Yes |  |
| `description` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `network_token` | `table` | No |  |
| `short_name` | `string` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `number` | No |  |
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
| `authentication` | `any` | No |  |
| `created_at` | `number` | No |  |
| `destination_domain` | `string` | No |  |
| `encrypt_empty_string` | `boolean` | No |  |
| `evervault_domain` | `string` | No |  |
| `id` | `string` | No |  |
| `route` | `table` | No |  |
| `updated_at` | `number` | No |  |

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
| `access_control_server` | `table` | No |  |
| `acquirer` | `table` | Yes |  |
| `are` | `table` | No |  |
| `authentication` | `table` | Yes |  |
| `card` | `table` | Yes |  |
| `challenge` | `table` | Yes |  |
| `cre` | `any` | No |  |
| `created_at` | `number` | Yes |  |
| `cryptogram` | `string` | No |  |
| `customer` | `table` | No |  |
| `directory_server` | `table` | No |  |
| `eci` | `table` | No |  |
| `failure_reason` | `string` | No |  |
| `id` | `string` | Yes |  |
| `initiator` | `table` | No |  |
| `merchant` | `table` | Yes |  |
| `next_action` | `table` | Yes |  |
| `payment` | `table` | No |  |
| `preferred_version` | `table` | No |  |
| `rreq` | `any` | No |  |
| `status` | `string` | Yes |  |
| `three_ds_server` | `table` | No |  |
| `updated_at` | `number` | No |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:ThreeDsSession():create({
  acquirer = --[[ table ]],
  authentication = --[[ table ]],
  card = --[[ table ]],
  challenge = --[[ table ]],
  created_at = --[[ number ]],
  id = --[[ string ]],
  merchant = --[[ table ]],
  next_action = --[[ table ]],
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
| `created_at` | `number` | No |  |
| `event` | `table` | Yes |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Webhook():create({
  event = --[[ table ]],
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
| `created_at` | `number` | No |  |
| `event` | `table` | No |  |
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

