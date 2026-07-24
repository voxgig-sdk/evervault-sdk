# Evervault Ruby SDK



The Ruby SDK for the Evervault API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Acquirer` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/evervault-sdk/releases](https://github.com/voxgig-sdk/evervault-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Evervault_sdk"

client = EvervaultSDK.new({
  "apikey" => ENV["EVERVAULT_APIKEY"],
})
```

### 3. Load a cardart

CardArt is nested under network_token, so provide the `network_token_id`.

```ruby
begin
  # load returns the bare CardArt record (raises on error).
  cardart = client.CardArt.load({ "network_token_id" => "example_network_token_id" })
  puts cardart
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# create returns the bare created Acquirer record.
created = client.Acquirer.create({ "configuration" => [], "default" => true, "id" => "example_id", "name" => "example_name" })

# Update — index the bare record directly (created["id"]).
client.Acquirer.update({ "id" => created["id"] })

```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  merchant = client.Merchant.load({ "id" => "example_id" })
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = EvervaultSDK.test({
  "entity" => { "merchant" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the bare mock record (raises on error).
merchant = client.Merchant.load({ "id" => "test01" })
puts merchant
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = EvervaultSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### EvervaultSDK

```ruby
require_relative "Evervault_sdk"
client = EvervaultSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = EvervaultSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### EvervaultSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Acquirer` | `(data) -> AcquirerEntity` | Create an Acquirer entity instance. |
| `BinLookup` | `(data) -> BinLookupEntity` | Create a BinLookup entity instance. |
| `Card` | `(data) -> CardEntity` | Create a Card entity instance. |
| `CardArt` | `(data) -> CardArtEntity` | Create a CardArt entity instance. |
| `ClientSideToken` | `(data) -> ClientSideTokenEntity` | Create a ClientSideToken entity instance. |
| `Core` | `(data) -> CoreEntity` | Create a Core entity instance. |
| `CustomDomain` | `(data) -> CustomDomainEntity` | Create a CustomDomain entity instance. |
| `FunctionRun` | `(data) -> FunctionRunEntity` | Create a FunctionRun entity instance. |
| `Merchant` | `(data) -> MerchantEntity` | Create a Merchant entity instance. |
| `NetworkToken` | `(data) -> NetworkTokenEntity` | Create a NetworkToken entity instance. |
| `NetworkTokenCryptogram` | `(data) -> NetworkTokenCryptogramEntity` | Create a NetworkTokenCryptogram entity instance. |
| `Payment` | `(data) -> PaymentEntity` | Create a Payment entity instance. |
| `Relay` | `(data) -> RelayEntity` | Create a Relay entity instance. |
| `ThreeDsSession` | `(data) -> ThreeDsSessionEntity` | Create a ThreeDsSession entity instance. |
| `Webhook` | `(data) -> WebhookEntity` | Create a Webhook entity instance. |
| `WebhookEndpoint` | `(data) -> WebhookEndpointEntity` | Create a WebhookEndpoint entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `EvervaultError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Acquirer

| Field | Description |
| --- | --- |
| `configuration` |  |
| `default` |  |
| `description` |  |
| `id` |  |
| `name` |  |

Operations: Create, Load, Update.

API path: `/payments/acquirers`

#### BinLookup

| Field | Description |
| --- | --- |
| `number` |  |

Operations: Create.

API path: `/payments/bin-lookups`

#### Card

| Field | Description |
| --- | --- |
| `address` |  |
| `automatic_update` |  |
| `bin` |  |
| `brand` |  |
| `card` |  |
| `cardholder` |  |
| `country` |  |
| `created_at` |  |
| `currency` |  |
| `expiry` |  |
| `extension` |  |
| `funding` |  |
| `id` |  |
| `issuer` |  |
| `last_four` |  |
| `number` |  |
| `replacement` |  |
| `segment` |  |
| `status` |  |
| `updated_at` |  |

Operations: Create, Load.

API path: `/payments/cards/{card_id}/simulate`

#### CardArt

| Field | Description |
| --- | --- |
| `data` |  |
| `height` |  |
| `type` |  |
| `width` |  |

Operations: Load.

API path: `/payments/network-tokens/{network_token_id}/card-art`

#### ClientSideToken

| Field | Description |
| --- | --- |
| `action` |  |
| `expiry` |  |
| `payload` |  |

Operations: Create.

API path: `/client-side-tokens`

#### Core

| Field | Description |
| --- | --- |
| `app` |  |
| `authentication` |  |
| `category` |  |
| `created_at` |  |
| `custom_domain` |  |
| `destination_domain` |  |
| `encrypt_empty_string` |  |
| `encrypted_at` |  |
| `evervault_domain` |  |
| `fingerprint` |  |
| `id` |  |
| `metadata` |  |
| `phone_number` |  |
| `relay` |  |
| `role` |  |
| `route` |  |
| `status` |  |
| `token` |  |
| `type` |  |
| `updated_at` |  |
| `validation_record` |  |

Operations: Create, List, Remove.

API path: `/decrypt`

#### CustomDomain

| Field | Description |
| --- | --- |
| `created_at` |  |
| `custom_domain` |  |
| `id` |  |
| `relay` |  |
| `status` |  |
| `updated_at` |  |
| `validation_record` |  |

Operations: Create, Load.

API path: `/relays/{relay_id}/custom-domains`

#### FunctionRun

| Field | Description |
| --- | --- |
| `async` |  |
| `created_at` |  |
| `error` |  |
| `id` |  |
| `payload` |  |
| `result` |  |
| `status` |  |

Operations: Create.

API path: `/functions/{function_name}/runs`

#### Merchant

| Field | Description |
| --- | --- |
| `apple_pay` |  |
| `business` |  |
| `category_code` |  |
| `created_at` |  |
| `id` |  |
| `name` |  |
| `network_token` |  |
| `short_name` |  |
| `updated_at` |  |
| `website` |  |

Operations: Create, Load, Update.

API path: `/payments/merchants`

#### NetworkToken

| Field | Description |
| --- | --- |
| `card` |  |
| `created_at` |  |
| `expiry` |  |
| `id` |  |
| `merchant` |  |
| `number` |  |
| `payment_account_reference` |  |
| `status` |  |
| `token_requestor_identifier` |  |
| `token_service_provider` |  |
| `update_type` |  |
| `updated_at` |  |

Operations: Create, Load.

API path: `/payments/network-tokens/{network_token_id}/simulate`

#### NetworkTokenCryptogram

| Field | Description |
| --- | --- |
| `created_at` |  |
| `cryptogram` |  |
| `id` |  |

Operations: Create.

API path: `/payments/network-tokens/{network_token_id}/cryptograms`

#### Payment

| Field | Description |
| --- | --- |
| `apple_pay` |  |
| `business` |  |
| `category_code` |  |
| `configuration` |  |
| `created_at` |  |
| `data` |  |
| `default` |  |
| `description` |  |
| `id` |  |
| `name` |  |
| `network_token` |  |
| `short_name` |  |
| `type` |  |
| `updated_at` |  |
| `website` |  |

Operations: List, Remove.

API path: `/payments/merchants`

#### Relay

| Field | Description |
| --- | --- |
| `app` |  |
| `authentication` |  |
| `created_at` |  |
| `destination_domain` |  |
| `encrypt_empty_string` |  |
| `evervault_domain` |  |
| `id` |  |
| `route` |  |
| `updated_at` |  |

Operations: Load, Update.

API path: `/relays/{id}`

#### ThreeDsSession

| Field | Description |
| --- | --- |
| `access_control_server` |  |
| `acquirer` |  |
| `are` |  |
| `authentication` |  |
| `card` |  |
| `challenge` |  |
| `cre` |  |
| `created_at` |  |
| `cryptogram` |  |
| `customer` |  |
| `directory_server` |  |
| `eci` |  |
| `failure_reason` |  |
| `id` |  |
| `initiator` |  |
| `merchant` |  |
| `next_action` |  |
| `payment` |  |
| `preferred_version` |  |
| `rreq` |  |
| `status` |  |
| `three_ds_server` |  |
| `updated_at` |  |
| `version` |  |

Operations: Create, Load.

API path: `/payments/3ds-sessions`

#### Webhook

| Field | Description |
| --- | --- |
| `created_at` |  |
| `event` |  |
| `id` |  |
| `updated_at` |  |
| `url` |  |

Operations: Create, List, Remove.

API path: `/webhook-endpoints`

#### WebhookEndpoint

| Field | Description |
| --- | --- |
| `created_at` |  |
| `event` |  |
| `id` |  |
| `updated_at` |  |
| `url` |  |

Operations: Load, Update.

API path: `/webhook-endpoints/{webhook_endpoint_id}`



## Entities


### Acquirer

Create an instance: `acquirer = client.Acquirer`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configuration` | `Array` |  |
| `default` | `Boolean` |  |
| `description` | `String` |  |
| `id` | `String` |  |
| `name` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Acquirer record (raises on error).
acquirer = client.Acquirer.load({ "id" => "acquirer_id" })
```

#### Example: Create

```ruby
acquirer = client.Acquirer.create({
  "configuration" => [], # Array
  "default" => true, # Boolean
  "id" => "example_id", # String
  "name" => "example_name", # String
})
```


### BinLookup

Create an instance: `bin_lookup = client.BinLookup`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `number` | `String` |  |

#### Example: Create

```ruby
bin_lookup = client.BinLookup.create({
  "number" => "example_number", # String
})
```


### Card

Create an instance: `card = client.Card`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `Hash` |  |
| `automatic_update` | `String` |  |
| `bin` | `String` |  |
| `brand` | `String` |  |
| `card` | `Hash` |  |
| `cardholder` | `Hash` |  |
| `country` | `String` |  |
| `created_at` | `Integer` |  |
| `currency` | `String` |  |
| `expiry` | `Hash` |  |
| `extension` | `Array` |  |
| `funding` | `String` |  |
| `id` | `String` |  |
| `issuer` | `String` |  |
| `last_four` | `String` |  |
| `number` | `String` |  |
| `replacement` | `Object` |  |
| `segment` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `Object` |  |

#### Example: Load

```ruby
# load returns the bare Card record (raises on error).
card = client.Card.load({ "id" => "card_id" })
```

#### Example: Create

```ruby
card = client.Card.create({
  "address" => {}, # Hash
  "bin" => "example_bin", # String
  "card" => {}, # Hash
  "created_at" => 1, # Integer
  "expiry" => {}, # Hash
  "last_four" => "example_last_four", # String
  "number" => "example_number", # String
})
```


### CardArt

Create an instance: `card_art = client.CardArt`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `String` |  |
| `height` | `Integer` |  |
| `type` | `String` |  |
| `width` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare CardArt record (raises on error).
card_art = client.CardArt.load({ "network_token_id" => "network_token_id" })
```


### ClientSideToken

Create an instance: `client_side_token = client.ClientSideToken`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `String` |  |
| `expiry` | `Integer` |  |
| `payload` | `Hash` |  |

#### Example: Create

```ruby
client_side_token = client.ClientSideToken.create({
  "action" => "example_action", # String
})
```


### Core

Create an instance: `core = client.Core`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `String` |  |
| `authentication` | `Object` |  |
| `category` | `String` |  |
| `created_at` | `Integer` |  |
| `custom_domain` | `String` |  |
| `destination_domain` | `String` |  |
| `encrypt_empty_string` | `Boolean` |  |
| `encrypted_at` | `Integer` |  |
| `evervault_domain` | `String` |  |
| `fingerprint` | `String` |  |
| `id` | `String` |  |
| `metadata` | `Object` |  |
| `phone_number` | `String` |  |
| `relay` | `String` |  |
| `role` | `String` |  |
| `route` | `Array` |  |
| `status` | `String` |  |
| `token` | `String` |  |
| `type` | `String` |  |
| `updated_at` | `Integer` |  |
| `validation_record` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Core records (raises on error).
cores = client.Core.list
```

#### Example: Create

```ruby
core = client.Core.create({
  "destination_domain" => "example_destination_domain", # String
  "route" => [], # Array
  "token" => "example_token", # String
})
```


### CustomDomain

Create an instance: `custom_domain = client.CustomDomain`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `Integer` |  |
| `custom_domain` | `String` |  |
| `id` | `String` |  |
| `relay` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `Integer` |  |
| `validation_record` | `String` |  |

#### Example: Load

```ruby
# load returns the bare CustomDomain record (raises on error).
custom_domain = client.CustomDomain.load({ "id" => "custom_domain_id", "relay_id" => "relay_id" })
```

#### Example: Create

```ruby
custom_domain = client.CustomDomain.create({
  "relay_id" => "example_relay_id", # String
})
```


### FunctionRun

Create an instance: `function_run = client.FunctionRun`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `async` | `Boolean` |  |
| `created_at` | `Integer` |  |
| `error` | `Object` |  |
| `id` | `String` |  |
| `payload` | `Hash` |  |
| `result` | `Hash` |  |
| `status` | `String` |  |

#### Example: Create

```ruby
function_run = client.FunctionRun.create({
  "function_name" => "example_function_name", # String
})
```


### Merchant

Create an instance: `merchant = client.Merchant`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apple_pay` | `Hash` |  |
| `business` | `Hash` |  |
| `category_code` | `String` |  |
| `created_at` | `Integer` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `network_token` | `Hash` |  |
| `short_name` | `String` |  |
| `updated_at` | `Integer` |  |
| `website` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Merchant record (raises on error).
merchant = client.Merchant.load({ "id" => "merchant_id" })
```

#### Example: Create

```ruby
merchant = client.Merchant.create({
  "created_at" => 1, # Integer
  "id" => "example_id", # String
  "name" => "example_name", # String
  "website" => "example_website", # String
})
```


### NetworkToken

Create an instance: `network_token = client.NetworkToken`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `card` | `Hash` |  |
| `created_at` | `Integer` |  |
| `expiry` | `Hash` |  |
| `id` | `String` |  |
| `merchant` | `String` |  |
| `number` | `String` |  |
| `payment_account_reference` | `String` |  |
| `status` | `String` |  |
| `token_requestor_identifier` | `String` |  |
| `token_service_provider` | `String` |  |
| `update_type` | `String` |  |
| `updated_at` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare NetworkToken record (raises on error).
network_token = client.NetworkToken.load({ "id" => "network_token_id" })
```

#### Example: Create

```ruby
network_token = client.NetworkToken.create({
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


### NetworkTokenCryptogram

Create an instance: `network_token_cryptogram = client.NetworkTokenCryptogram`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `Integer` |  |
| `cryptogram` | `String` |  |
| `id` | `String` |  |

#### Example: Create

```ruby
network_token_cryptogram = client.NetworkTokenCryptogram.create({
  "id" => "example_id", # String
})
```


### Payment

Create an instance: `payment = client.Payment`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apple_pay` | `Hash` |  |
| `business` | `Hash` |  |
| `category_code` | `String` |  |
| `configuration` | `Array` |  |
| `created_at` | `Integer` |  |
| `data` | `Hash` |  |
| `default` | `Boolean` |  |
| `description` | `String` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `network_token` | `Hash` |  |
| `short_name` | `String` |  |
| `type` | `String` |  |
| `updated_at` | `Integer` |  |
| `website` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Payment records (raises on error).
payments = client.Payment.list
```


### Relay

Create an instance: `relay = client.Relay`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `String` |  |
| `authentication` | `Object` |  |
| `created_at` | `Integer` |  |
| `destination_domain` | `String` |  |
| `encrypt_empty_string` | `Boolean` |  |
| `evervault_domain` | `String` |  |
| `id` | `String` |  |
| `route` | `Array` |  |
| `updated_at` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare Relay record (raises on error).
relay = client.Relay.load({ "id" => "relay_id" })
```


### ThreeDsSession

Create an instance: `three_ds_session = client.ThreeDsSession`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_control_server` | `Hash` |  |
| `acquirer` | `Hash` |  |
| `are` | `Hash` |  |
| `authentication` | `Hash` |  |
| `card` | `Hash` |  |
| `challenge` | `Hash` |  |
| `cre` | `Object` |  |
| `created_at` | `Integer` |  |
| `cryptogram` | `String` |  |
| `customer` | `Hash` |  |
| `directory_server` | `Hash` |  |
| `eci` | `Hash` |  |
| `failure_reason` | `String` |  |
| `id` | `String` |  |
| `initiator` | `Hash` |  |
| `merchant` | `Hash` |  |
| `next_action` | `Hash` |  |
| `payment` | `Hash` |  |
| `preferred_version` | `Array` |  |
| `rreq` | `Object` |  |
| `status` | `String` |  |
| `three_ds_server` | `Hash` |  |
| `updated_at` | `Integer` |  |
| `version` | `String` |  |

#### Example: Load

```ruby
# load returns the bare ThreeDsSession record (raises on error).
three_ds_session = client.ThreeDsSession.load({ "3ds_session_id" => "3ds_session_id" })
```

#### Example: Create

```ruby
three_ds_session = client.ThreeDsSession.create({
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


### Webhook

Create an instance: `webhook = client.Webhook`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `Integer` |  |
| `event` | `Array` |  |
| `id` | `String` |  |
| `updated_at` | `Object` |  |
| `url` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Webhook records (raises on error).
webhooks = client.Webhook.list
```

#### Example: Create

```ruby
webhook = client.Webhook.create({
  "event" => [], # Array
  "url" => "example_url", # String
})
```


### WebhookEndpoint

Create an instance: `webhook_endpoint = client.WebhookEndpoint`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `Integer` |  |
| `event` | `Array` |  |
| `id` | `String` |  |
| `updated_at` | `Object` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the bare WebhookEndpoint record (raises on error).
webhook_endpoint = client.WebhookEndpoint.load({ "id" => "webhook_endpoint_id" })
```


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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Evervault_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Evervault_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
merchant = client.Merchant
merchant.load({ "id" => "example_id" })

# merchant.data_get now returns the merchant data from the last load
# merchant.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
