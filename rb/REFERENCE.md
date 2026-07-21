# Evervault Ruby SDK Reference

Complete API reference for the Evervault Ruby SDK.


## EvervaultSDK

### Constructor

```ruby
require_relative 'Evervault_sdk'

client = EvervaultSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `EvervaultSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = EvervaultSDK.test
```


### Instance Methods

#### `Acquirer(data = nil)`

Create a new `Acquirer` entity instance. Pass `nil` for no initial data.

#### `BinLookup(data = nil)`

Create a new `BinLookup` entity instance. Pass `nil` for no initial data.

#### `Card(data = nil)`

Create a new `Card` entity instance. Pass `nil` for no initial data.

#### `CardArt(data = nil)`

Create a new `CardArt` entity instance. Pass `nil` for no initial data.

#### `ClientSideToken(data = nil)`

Create a new `ClientSideToken` entity instance. Pass `nil` for no initial data.

#### `Core(data = nil)`

Create a new `Core` entity instance. Pass `nil` for no initial data.

#### `CustomDomain(data = nil)`

Create a new `CustomDomain` entity instance. Pass `nil` for no initial data.

#### `FunctionRun(data = nil)`

Create a new `FunctionRun` entity instance. Pass `nil` for no initial data.

#### `Merchant(data = nil)`

Create a new `Merchant` entity instance. Pass `nil` for no initial data.

#### `NetworkToken(data = nil)`

Create a new `NetworkToken` entity instance. Pass `nil` for no initial data.

#### `NetworkTokenCryptogram(data = nil)`

Create a new `NetworkTokenCryptogram` entity instance. Pass `nil` for no initial data.

#### `Payment(data = nil)`

Create a new `Payment` entity instance. Pass `nil` for no initial data.

#### `Relay(data = nil)`

Create a new `Relay` entity instance. Pass `nil` for no initial data.

#### `ThreeDsSession(data = nil)`

Create a new `ThreeDsSession` entity instance. Pass `nil` for no initial data.

#### `Webhook(data = nil)`

Create a new `Webhook` entity instance. Pass `nil` for no initial data.

#### `WebhookEndpoint(data = nil)`

Create a new `WebhookEndpoint` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AcquirerEntity

```ruby
acquirer = client.Acquirer
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `configuration` | `Array` | Yes |  |
| `default` | `Boolean` | Yes |  |
| `description` | `String` | No |  |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |

### Field Usage by Operation

| Field | load | create | update |
| --- | --- | --- | --- |
| `configuration` | - | - | Yes |
| `default` | - | Yes | Yes |
| `description` | - | - | - |
| `id` | - | - | - |
| `name` | - | - | Yes |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Acquirer.create({
  "configuration" => [], # Array
  "default" => true, # Boolean
  "id" => "example_id", # String
  "name" => "example_name", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Acquirer.load({ "id" => "acquirer_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Acquirer.update({
  "id" => "acquirer_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AcquirerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BinLookupEntity

```ruby
bin_lookup = client.BinLookup
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `number` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.BinLookup.create({
  "number" => "example_number", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BinLookupEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CardEntity

```ruby
card = client.Card
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `Hash` | Yes |  |
| `automatic_update` | `String` | No |  |
| `bin` | `String` | Yes |  |
| `brand` | `String` | No |  |
| `card` | `Hash` | Yes |  |
| `cardholder` | `Hash` | No |  |
| `country` | `String` | No |  |
| `created_at` | `Integer` | Yes |  |
| `currency` | `String` | No |  |
| `expiry` | `Hash` | Yes |  |
| `extension` | `Array` | No |  |
| `funding` | `String` | No |  |
| `id` | `String` | No |  |
| `issuer` | `String` | No |  |
| `last_four` | `String` | Yes |  |
| `number` | `String` | Yes |  |
| `replacement` | `Object` | No |  |
| `segment` | `String` | No |  |
| `status` | `String` | No |  |
| `updated_at` | `Object` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Card.create({
  "address" => {}, # Hash
  "bin" => "example_bin", # String
  "card" => {}, # Hash
  "created_at" => 1, # Integer
  "expiry" => {}, # Hash
  "last_four" => "example_last_four", # String
  "number" => "example_number", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Card.load({ "id" => "card_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CardEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CardArtEntity

```ruby
card_art = client.CardArt
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `String` | Yes |  |
| `height` | `Integer` | Yes |  |
| `type` | `String` | Yes |  |
| `width` | `Integer` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.CardArt.load({ "network_token_id" => "network_token_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CardArtEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ClientSideTokenEntity

```ruby
client_side_token = client.ClientSideToken
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `String` | Yes |  |
| `expiry` | `Integer` | No |  |
| `payload` | `Hash` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.ClientSideToken.create({
  "action" => "example_action", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ClientSideTokenEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CoreEntity

```ruby
core = client.Core
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `String` | No |  |
| `authentication` | `Object` | No |  |
| `category` | `String` | No |  |
| `created_at` | `Integer` | No |  |
| `custom_domain` | `String` | No |  |
| `destination_domain` | `String` | Yes |  |
| `encrypt_empty_string` | `Boolean` | No |  |
| `encrypted_at` | `Integer` | No |  |
| `evervault_domain` | `String` | No |  |
| `fingerprint` | `String` | No |  |
| `id` | `String` | No |  |
| `metadata` | `Object` | No |  |
| `phone_number` | `String` | No |  |
| `relay` | `String` | No |  |
| `role` | `String` | No |  |
| `route` | `Array` | Yes |  |
| `status` | `String` | No |  |
| `token` | `String` | Yes |  |
| `type` | `String` | No |  |
| `updated_at` | `Integer` | No |  |
| `validation_record` | `String` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Core.create({
  "destination_domain" => "example_destination_domain", # String
  "route" => [], # Array
  "token" => "example_token", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Core.list
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Core.remove({ "id" => "id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CoreEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CustomDomainEntity

```ruby
custom_domain = client.CustomDomain
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `Integer` | No |  |
| `custom_domain` | `String` | No |  |
| `id` | `String` | No |  |
| `relay` | `String` | No |  |
| `status` | `String` | No |  |
| `updated_at` | `Integer` | No |  |
| `validation_record` | `String` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.CustomDomain.create({
  "relay_id" => "example_relay_id", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.CustomDomain.load({ "id" => "custom_domain_id", "relay_id" => "relay_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CustomDomainEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FunctionRunEntity

```ruby
function_run = client.FunctionRun
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `async` | `Boolean` | No |  |
| `created_at` | `Integer` | No |  |
| `error` | `Object` | No |  |
| `id` | `String` | No |  |
| `payload` | `Hash` | Yes |  |
| `result` | `Hash` | No |  |
| `status` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.FunctionRun.create({
  "function_name" => "example_function_name", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FunctionRunEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MerchantEntity

```ruby
merchant = client.Merchant
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apple_pay` | `Hash` | No |  |
| `business` | `Hash` | No |  |
| `category_code` | `String` | No |  |
| `created_at` | `Integer` | Yes |  |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `network_token` | `Hash` | No |  |
| `short_name` | `String` | No |  |
| `updated_at` | `Integer` | No |  |
| `website` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Merchant.create({
  "created_at" => 1, # Integer
  "id" => "example_id", # String
  "name" => "example_name", # String
  "website" => "example_website", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Merchant.load({ "id" => "merchant_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Merchant.update({
  "id" => "merchant_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MerchantEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## NetworkTokenEntity

```ruby
network_token = client.NetworkToken
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | `Hash` | Yes |  |
| `created_at` | `Integer` | Yes |  |
| `expiry` | `Hash` | Yes |  |
| `id` | `String` | Yes |  |
| `merchant` | `String` | Yes |  |
| `number` | `String` | Yes |  |
| `payment_account_reference` | `String` | No |  |
| `status` | `String` | Yes |  |
| `token_requestor_identifier` | `String` | Yes |  |
| `token_service_provider` | `String` | Yes |  |
| `update_type` | `String` | No |  |
| `updated_at` | `Integer` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.NetworkToken.create({
  "card" => {}, # Hash
  "created_at" => 1, # Integer
  "expiry" => {}, # Hash
  "id" => "example_id", # String
  "merchant" => "example_merchant", # String
  "number" => "example_number", # String
  "status" => "example_status", # String
  "token_requestor_identifier" => "example_token_requestor_identifier", # String
  "token_service_provider" => "example_token_service_provider", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.NetworkToken.load({ "id" => "network_token_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `NetworkTokenEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## NetworkTokenCryptogramEntity

```ruby
network_token_cryptogram = client.NetworkTokenCryptogram
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `Integer` | No |  |
| `cryptogram` | `String` | No |  |
| `id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.NetworkTokenCryptogram.create({
  "id" => "example_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `NetworkTokenCryptogramEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PaymentEntity

```ruby
payment = client.Payment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apple_pay` | `Hash` | No |  |
| `business` | `Hash` | No |  |
| `category_code` | `String` | No |  |
| `configuration` | `Array` | Yes |  |
| `created_at` | `Integer` | Yes |  |
| `data` | `Hash` | No |  |
| `default` | `Boolean` | Yes |  |
| `description` | `String` | No |  |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `network_token` | `Hash` | No |  |
| `short_name` | `String` | No |  |
| `type` | `String` | No |  |
| `updated_at` | `Integer` | No |  |
| `website` | `String` | Yes |  |

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

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Payment.list
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Payment.remove()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PaymentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RelayEntity

```ruby
relay = client.Relay
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `String` | No |  |
| `authentication` | `Object` | No |  |
| `created_at` | `Integer` | No |  |
| `destination_domain` | `String` | No |  |
| `encrypt_empty_string` | `Boolean` | No |  |
| `evervault_domain` | `String` | No |  |
| `id` | `String` | No |  |
| `route` | `Array` | No |  |
| `updated_at` | `Integer` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Relay.load({ "id" => "relay_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Relay.update({
  "id" => "relay_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RelayEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ThreeDsSessionEntity

```ruby
three_ds_session = client.ThreeDsSession
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_control_server` | `Hash` | No |  |
| `acquirer` | `Hash` | Yes |  |
| `are` | `Hash` | No |  |
| `authentication` | `Hash` | Yes |  |
| `card` | `Hash` | Yes |  |
| `challenge` | `Hash` | Yes |  |
| `cre` | `Object` | No |  |
| `created_at` | `Integer` | Yes |  |
| `cryptogram` | `String` | No |  |
| `customer` | `Hash` | No |  |
| `directory_server` | `Hash` | No |  |
| `eci` | `Hash` | No |  |
| `failure_reason` | `String` | No |  |
| `id` | `String` | Yes |  |
| `initiator` | `Hash` | No |  |
| `merchant` | `Hash` | Yes |  |
| `next_action` | `Hash` | Yes |  |
| `payment` | `Hash` | No |  |
| `preferred_version` | `Array` | No |  |
| `rreq` | `Object` | No |  |
| `status` | `String` | Yes |  |
| `three_ds_server` | `Hash` | No |  |
| `updated_at` | `Integer` | No |  |
| `version` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.ThreeDsSession.create({
  "acquirer" => {}, # Hash
  "authentication" => {}, # Hash
  "card" => {}, # Hash
  "challenge" => {}, # Hash
  "created_at" => 1, # Integer
  "id" => "example_id", # String
  "merchant" => {}, # Hash
  "next_action" => {}, # Hash
  "status" => "example_status", # String
  "version" => "example_version", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ThreeDsSession.load({ "3ds_session_id" => "3ds_session_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ThreeDsSessionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WebhookEntity

```ruby
webhook = client.Webhook
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `Integer` | No |  |
| `event` | `Array` | Yes |  |
| `id` | `String` | No |  |
| `updated_at` | `Object` | No |  |
| `url` | `String` | Yes |  |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `created_at` | - | - | - |
| `event` | Yes | - | - |
| `id` | - | - | - |
| `updated_at` | - | - | - |
| `url` | Yes | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Webhook.create({
  "event" => [], # Array
  "url" => "example_url", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Webhook.list
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Webhook.remove({ "webhook_endpoint_id" => "webhook_endpoint_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WebhookEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WebhookEndpointEntity

```ruby
webhook_endpoint = client.WebhookEndpoint
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `Integer` | No |  |
| `event` | `Array` | No |  |
| `id` | `String` | No |  |
| `updated_at` | `Object` | No |  |
| `url` | `String` | No |  |

### Field Usage by Operation

| Field | load | update |
| --- | --- | --- |
| `created_at` | - | - |
| `event` | - | Yes |
| `id` | - | - |
| `updated_at` | - | - |
| `url` | - | - |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.WebhookEndpoint.load({ "id" => "webhook_endpoint_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.WebhookEndpoint.update({
  "id" => "webhook_endpoint_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WebhookEndpointEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = EvervaultSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

