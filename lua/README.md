# Evervault Lua SDK



The Lua SDK for the Evervault API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Acquirer()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/evervault-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("evervault_sdk")

local client = sdk.new({
  apikey = os.getenv("EVERVAULT_APIKEY"),
})
```

### 3. Load a cardart

CardArt is nested under network_token, so provide the `network_token_id`.

```lua
local cardart, err = client:CardArt():load({ network_token_id = "example_network_token_id" })
if err then error(err) end
print(cardart)
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Acquirer():create({ configuration = {}, default = true, id = "example_id", name = "example_name" })
if err then error(err) end

-- Update
client:Acquirer():update({ id = created["id"] })

```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local merchant, err = client:Merchant():load({ id = "example_id" })
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Merchant():load({ id = "test01" })
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### EvervaultSDK

```lua
local sdk = require("evervault_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### EvervaultSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local acquirer, err = client:Acquirer():load({ id = "example_id" })
    if err then error(err) end
    -- acquirer is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local acquirer = client:Acquirer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configuration` | `table` |  |
| `default` | `boolean` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |

#### Example: Load

```lua
local acquirer, err = client:Acquirer():load({ id = "acquirer_id" })
```

#### Example: Create

```lua
local acquirer, err = client:Acquirer():create({
  configuration = {}, -- table
  default = true, -- boolean
  id = "example_id", -- string
  name = "example_name", -- string
})
```


### BinLookup

Create an instance: `local bin_lookup = client:BinLookup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `number` | `string` |  |

#### Example: Create

```lua
local bin_lookup, err = client:BinLookup():create({
  number = "example_number", -- string
})
```


### Card

Create an instance: `local card = client:Card(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `table` |  |
| `automatic_update` | `string` |  |
| `bin` | `string` |  |
| `brand` | `string` |  |
| `card` | `table` |  |
| `cardholder` | `table` |  |
| `country` | `string` |  |
| `created_at` | `number` |  |
| `currency` | `string` |  |
| `expiry` | `table` |  |
| `extension` | `table` |  |
| `funding` | `string` |  |
| `id` | `string` |  |
| `issuer` | `string` |  |
| `last_four` | `string` |  |
| `number` | `string` |  |
| `replacement` | `string|nil` |  |
| `segment` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `number|nil` |  |

#### Example: Load

```lua
local card, err = client:Card():load({ id = "card_id" })
```

#### Example: Create

```lua
local card, err = client:Card():create({
  address = {}, -- table
  bin = "example_bin", -- string
  card = {}, -- table
  created_at = 1, -- number
  expiry = {}, -- table
  last_four = "example_last_four", -- string
  number = "example_number", -- string
})
```


### CardArt

Create an instance: `local card_art = client:CardArt(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `string` |  |
| `height` | `number` |  |
| `type` | `string` |  |
| `width` | `number` |  |

#### Example: Load

```lua
local card_art, err = client:CardArt():load({ network_token_id = "network_token_id" })
```


### ClientSideToken

Create an instance: `local client_side_token = client:ClientSideToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `expiry` | `number` |  |
| `payload` | `table` |  |

#### Example: Create

```lua
local client_side_token, err = client:ClientSideToken():create({
  action = "example_action", -- string
})
```


### Core

Create an instance: `local core = client:Core(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `string` |  |
| `authentication` | `string|nil` |  |
| `category` | `string` |  |
| `created_at` | `number` |  |
| `custom_domain` | `string` |  |
| `destination_domain` | `string` |  |
| `encrypt_empty_string` | `boolean` |  |
| `encrypted_at` | `number` |  |
| `evervault_domain` | `string` |  |
| `fingerprint` | `string` |  |
| `id` | `string` |  |
| `metadata` | `any` |  |
| `phone_number` | `string` |  |
| `relay` | `string` |  |
| `role` | `string` |  |
| `route` | `table` |  |
| `status` | `string` |  |
| `token` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `number` |  |
| `validation_record` | `string` |  |

#### Example: List

```lua
local cores, err = client:Core():list()
```

#### Example: Create

```lua
local core, err = client:Core():create({
  destination_domain = "example_destination_domain", -- string
  route = {}, -- table
  token = "example_token", -- string
})
```


### CustomDomain

Create an instance: `local custom_domain = client:CustomDomain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `number` |  |
| `custom_domain` | `string` |  |
| `id` | `string` |  |
| `relay` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `number` |  |
| `validation_record` | `string` |  |

#### Example: Load

```lua
local custom_domain, err = client:CustomDomain():load({ id = "custom_domain_id", relay_id = "relay_id" })
```

#### Example: Create

```lua
local custom_domain, err = client:CustomDomain():create({
  relay_id = "example_relay_id", -- string
})
```


### FunctionRun

Create an instance: `local function_run = client:FunctionRun(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `async` | `boolean` |  |
| `created_at` | `number` |  |
| `error` | `table|nil` |  |
| `id` | `string` |  |
| `payload` | `table` |  |
| `result` | `table` |  |
| `status` | `string` |  |

#### Example: Create

```lua
local function_run, err = client:FunctionRun():create({
  function_name = "example_function_name", -- string
})
```


### Merchant

Create an instance: `local merchant = client:Merchant(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apple_pay` | `table` |  |
| `business` | `table` |  |
| `category_code` | `string` |  |
| `created_at` | `number` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `network_token` | `table` |  |
| `short_name` | `string` |  |
| `updated_at` | `number` |  |
| `website` | `string` |  |

#### Example: Load

```lua
local merchant, err = client:Merchant():load({ id = "merchant_id" })
```

#### Example: Create

```lua
local merchant, err = client:Merchant():create({
  created_at = 1, -- number
  id = "example_id", -- string
  name = "example_name", -- string
  website = "example_website", -- string
})
```


### NetworkToken

Create an instance: `local network_token = client:NetworkToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `card` | `table` |  |
| `created_at` | `number` |  |
| `expiry` | `table` |  |
| `id` | `string` |  |
| `merchant` | `string` |  |
| `number` | `string` |  |
| `payment_account_reference` | `string` |  |
| `status` | `string` |  |
| `token_requestor_identifier` | `string` |  |
| `token_service_provider` | `string` |  |
| `update_type` | `string` |  |
| `updated_at` | `number` |  |

#### Example: Load

```lua
local network_token, err = client:NetworkToken():load({ id = "network_token_id" })
```

#### Example: Create

```lua
local network_token, err = client:NetworkToken():create({
  card = {}, -- table
  created_at = 1, -- number
  expiry = {}, -- table
  id = "example_id", -- string
  merchant = "example_merchant", -- string
  number = "example_number", -- string
  status = "example_status", -- string
  token_requestor_identifier = "example_token_requestor_identifier", -- string
  token_service_provider = "example_token_service_provider", -- string
})
```


### NetworkTokenCryptogram

Create an instance: `local network_token_cryptogram = client:NetworkTokenCryptogram(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `number` |  |
| `cryptogram` | `string` |  |
| `id` | `string` |  |

#### Example: Create

```lua
local network_token_cryptogram, err = client:NetworkTokenCryptogram():create({
  id = "example_id", -- string
})
```


### Payment

Create an instance: `local payment = client:Payment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apple_pay` | `table` |  |
| `business` | `table` |  |
| `category_code` | `string` |  |
| `configuration` | `table` |  |
| `created_at` | `number` |  |
| `data` | `table` |  |
| `default` | `boolean` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `network_token` | `table` |  |
| `short_name` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `number` |  |
| `website` | `string` |  |

#### Example: List

```lua
local payments, err = client:Payment():list()
```


### Relay

Create an instance: `local relay = client:Relay(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `string` |  |
| `authentication` | `string|nil` |  |
| `created_at` | `number` |  |
| `destination_domain` | `string` |  |
| `encrypt_empty_string` | `boolean` |  |
| `evervault_domain` | `string` |  |
| `id` | `string` |  |
| `route` | `table` |  |
| `updated_at` | `number` |  |

#### Example: Load

```lua
local relay, err = client:Relay():load({ id = "relay_id" })
```


### ThreeDsSession

Create an instance: `local three_ds_session = client:ThreeDsSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_control_server` | `table` |  |
| `acquirer` | `table` |  |
| `are` | `table` |  |
| `authentication` | `table` |  |
| `card` | `table` |  |
| `challenge` | `table` |  |
| `cre` | `nil|table` |  |
| `created_at` | `number` |  |
| `cryptogram` | `string` |  |
| `customer` | `table` |  |
| `directory_server` | `table` |  |
| `eci` | `table` |  |
| `failure_reason` | `string` |  |
| `id` | `string` |  |
| `initiator` | `table` |  |
| `merchant` | `table` |  |
| `next_action` | `table` |  |
| `payment` | `table` |  |
| `preferred_version` | `table` |  |
| `rreq` | `nil|table` |  |
| `status` | `string` |  |
| `three_ds_server` | `table` |  |
| `updated_at` | `number` |  |
| `version` | `string` |  |

#### Example: Load

```lua
local three_ds_session, err = client:ThreeDsSession():load({ ["3ds_session_id"] = "3ds_session_id" })
```

#### Example: Create

```lua
local three_ds_session, err = client:ThreeDsSession():create({
  acquirer = {}, -- table
  authentication = {}, -- table
  card = {}, -- table
  challenge = {}, -- table
  created_at = 1, -- number
  id = "example_id", -- string
  merchant = {}, -- table
  next_action = {}, -- table
  status = "example_status", -- string
  version = "example_version", -- string
})
```


### Webhook

Create an instance: `local webhook = client:Webhook(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `number` |  |
| `event` | `table` |  |
| `id` | `string` |  |
| `updated_at` | `number|nil` |  |
| `url` | `string` |  |

#### Example: List

```lua
local webhooks, err = client:Webhook():list()
```

#### Example: Create

```lua
local webhook, err = client:Webhook():create({
  event = {}, -- table
  url = "example_url", -- string
})
```


### WebhookEndpoint

Create an instance: `local webhook_endpoint = client:WebhookEndpoint(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `number` |  |
| `event` | `table` |  |
| `id` | `string` |  |
| `updated_at` | `number|nil` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local webhook_endpoint, err = client:WebhookEndpoint():load({ id = "webhook_endpoint_id" })
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── evervault_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`evervault_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local merchant = client:Merchant()
merchant:load({ id = "example_id" })

-- merchant:data_get() now returns the merchant data from the last load
-- merchant:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
