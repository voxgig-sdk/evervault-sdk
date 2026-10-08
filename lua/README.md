# Evervault Lua SDK



The Lua SDK for the Evervault API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Acquirer()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/evervault-sdk/tags)),
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

### 2. List acquirer records

Entity operations return `(value, err)`. For `list`, `value` is an
array of entities, one per record — iterate it directly (there is no
wrapper), and read each record with `data_get()`.

```lua
local acquirers, err = client:Acquirer():list()
if err then error(err) end

for _, item in ipairs(acquirers) do
  local rec = item:data_get()
  print(rec["id"])
end
```

### 3. Load a cardart

CardArt is nested under network_token, so provide the `network_token_id`.

`load` returns the entity; `data_get()` reads its record.

```lua
local cardart, err = client:CardArt():load({ network_token_id = "example_network_token_id" })
if err then error(err) end
for k, val in pairs(cardart:data_get()) do print(k, val) end
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Acquirer():create({ configurations = {}, default = true, id = "example_id", name = "example_name" })
if err then error(err) end

-- Update
client:Acquirer():update({ id = created:data_get()["id"], configurations = {}, default = true })

```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local merchants, err = client:Merchant():list()
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

local result, err = client:Merchant():list()
-- result is an array of entities, one per mock record; err is set on failure
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria, and return it. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria, one per record. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity, and return it. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity, and return it. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity, and return it marked as deleted. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity, whose `data_get()` reads its record (a `table`) |
| `list` | an array (`table`) of entities, one per record |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local acquirer, err = client:Acquirer():load({ id = "example_id" })
    if err then error(err) end
    -- acquirer is the loaded entity

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Acquirer

| Field | Description |
| --- | --- |
| `configurations` | The acquirer configuration settings. |
| `default` | Specifies whether this Acquirer is the default. |
| `description` | The description of the acquirer configuration. |
| `id` | The unique identifier of the acquirer configuration. |
| `name` | The name of the acquirer configuration. |

Operations: Create, List, Load, Update.

API path: `/payments/acquirers`

#### BinLookup

| Field | Description |
| --- | --- |
| `number` | The card number for which the BIN lookup is being requested. |

Operations: Create.

API path: `/payments/bin-lookups`

#### Card

| Field | Description |
| --- | --- |
| `address` | Details about the cardholder's address that the address verification (AVS) is for. |
| `automaticUpdates` | The status of Card Account Updater on this card. |
| `bin` | The first 6 or 8 digits of the card number. |
| `brand` | The card brand associated with the payment card. |
| `card` | The card details. |
| `cardholder` | Details about the cardholder that the name verification (ANI) is for. |
| `country` | The country where the card was issued. |
| `createdAt` | The Unix timestamp of when the card was created. |
| `currency` | The currency of the card. |
| `expiry` | The expiry date of the card. |
| `extensions` | The extensions to the card insight request. |
| `funding` | The card funding type specifies the method by which transactions are financed. |
| `id` | The unique identifier for the card. |
| `issuer` | The name of the card issuer. |
| `lastFour` | The last 4 digits of the card number. |
| `number` | The Evervault encrypted card number. |
| `replacement` | The ID of the replacement card. |
| `segment` | The card segment indicates the primary market or usage category of the card. |
| `status` | The current status of the card. |
| `updatedAt` | The Unix timestamp of when the card was last updated. |

Operations: Create, Load.

API path: `/payments/cards/{card_id}/simulate`

#### CardArt

| Field | Description |
| --- | --- |
| `data` | The base64-encoded image data of the card art. |
| `height` | The height of the card art image in pixels. |
| `type` | The MIME type of the card art image. |
| `width` | The width of the card art image in pixels. |

Operations: Load.

API path: `/payments/network-tokens/{network_token_id}/card-art`

#### ClientSideToken

| Field | Description |
| --- | --- |
| `action` | The action that the token should permit |
| `expiry` | The expiry of the token in milliseconds format. |
| `payload` | The payload that the token must be used with |

Operations: Create.

API path: `/client-side-tokens`

#### Core

| Field | Description |
| --- | --- |
| `category` | The category or specific nature of the encrypted value. |
| `core_list` | A JSON value or file to be encrypted. |
| `cores` | A JSON value or file to be decrypted. |
| `createdAt` | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `encryptedAt` | The date and time when the value was encrypted. |
| `fingerprint` | A unique identifier for the encrypted value. |
| `id` | The unique identifier for the custom domain. |
| `metadata` | Further metadata about the encrypted value. |
| `phoneNumber` |  |
| `relay` | The ID of the Relay with which this custom domain is associated. |
| `role` | The data role of the encrypted value. |
| `status` | The status of the domains DNS verification. |
| `token` | The encrypted data to be inspected. |
| `type` | The type of the encrypted value. |
| `updatedAt` | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

Operations: Create, List, Remove.

API path: `/decrypt`

#### CustomDomain

| Field | Description |
| --- | --- |
| `createdAt` | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `id` | The unique identifier for the custom domain. |
| `relay` | The ID of the Relay with which this custom domain is associated. |
| `status` | The status of the domains DNS verification. |
| `updatedAt` | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

Operations: Create, Load.

API path: `/relays/{relay_id}/custom-domains`

#### FunctionRun

| Field | Description |
| --- | --- |
| `async` | If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code. |
| `createdAt` | The exact time, in epoch milliseconds, when this Function execution was triggered. |
| `error` | This field details any error that occurred during Function execution. |
| `id` | A unique identifier representing this specific Function execution instance. |
| `payload` | The data payload that the Function will use during its execution. |
| `result` | This field represents the output returned by the Function. |
| `status` | The outcome of the Function execution. |

Operations: Create.

API path: `/functions/{function_name}/runs`

#### Merchant

| Field | Description |
| --- | --- |
| `applePay` | The Merchant's Apple Pay configuration. |
| `business` | The business details of the Merchant. |
| `categoryCode` | The 4-digit Merchant Category Code (MCC). |
| `createdAt` | The exact time, in epoch milliseconds, when this Merchant was created. |
| `id` | A unique identifier assigned to each Merchant. |
| `name` | The official name of the Merchant as recognized in transactions and communications. |
| `networkTokens` | The Merchant's Network Token configuration. |
| `shortName` | A shorter version of the Merchant's name. |
| `updatedAt` | The exact time, in epoch milliseconds, when this Merchant was last updated. |
| `website` | The official website URL of the Merchant. |

Operations: Create, List, Load, Update.

API path: `/payments/merchants`

#### NetworkToken

| Field | Description |
| --- | --- |
| `card` | The details of the underlying encrypted card. |
| `createdAt` | The exact time, in epoch milliseconds, when this Network Token was created. |
| `expiry` | The expiry details of the Network Token. |
| `id` | A unique identifier representing a specific Network Token. |
| `merchant` | The unique identifier of the Merchant associated with this Network Token. |
| `number` | The unique number of the Network Token. |
| `paymentAccountReference` | The unique identifier of the Payment Account associated with this Network Token. |
| `status` | The status of the Network Token. |
| `tokenRequestorIdentifier` | The identifier of the Token Requestor (TRID) that requested the Network Token. |
| `tokenServiceProvider` | The Token Service Provider (TSP) that issued the Network Token. |
| `updatedAt` | The exact time, in epoch milliseconds, when this Network Token was last updated. |

Operations: Create, Load.

API path: `/payments/network-tokens/{network_token_id}/simulate`

#### NetworkTokenCryptogram

| Field | Description |
| --- | --- |
| `createdAt` |  |
| `cryptogram` |  |
| `id` |  |

Operations: Create.

API path: `/payments/network-tokens/{network_token_id}/cryptograms`

#### Payment

| Field | Description |
| --- | --- |
| `created_at` | Timestamp when the message was created |
| `data` | The message data payload |
| `type` | The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes) |

Operations: List, Remove.

API path: `/payments/3ds-sessions/{3ds_session_id}/messages`

#### Relay

| Field | Description |
| --- | --- |
| `app` | The unique identifier for the app to which the Relay belongs. |
| `authentication` | The type of authentication required for the Relay |
| `createdAt` | The exact time, in epoch milliseconds, when this Relay was created. |
| `destinationDomain` | The domain in front of which the Relay should be configured. |
| `encryptEmptyStrings` | Whether or not empty strings should be encrypted. |
| `evervaultDomain` | The Evervault managed domain to which requests to be relayed to the destination domain should be sent. |
| `id` | The unique identifier for the Relay. |
| `routes` | A collection of route configurations for the Relay. |
| `updatedAt` | The exact time, in epoch milliseconds, when this Relay was updated. |

Operations: Create, List, Load, Update.

API path: `/relays`

#### ThreeDsSession

| Field | Description |
| --- | --- |
| `accessControlServer` | Details about the Access Control Server involved in the 3DS transaction. |
| `acquirer` | The acquirer of the payment. |
| `ares` | The details of the 3DS Authentication Response (ARes). |
| `authentication` | The details of the 3DS Authentication. |
| `card` | The card details. |
| `challenge` | Details about the 3DS challenge. |
| `createdAt` | The exact time, in epoch milliseconds, when this 3DS-Session was created. |
| `cres` | The details of the 3DS Challenge Response (CRes). |
| `cryptogram` | The 3DS cryptogram (also called Authentication Value). |
| `customer` | The details of the customer who initiated the transaction. |
| `directoryServer` | Details about the Directory Server involved in the 3DS transaction. |
| `eci` | The details of the Electronic Commerce Indicator. |
| `failureReason` | The reason for the 3DS Authentication failure. |
| `id` | A unique identifier assigned to each 3DS Authentication. |
| `initiator` | Details about the transaction initiation process. |
| `merchant` | The merchant details. |
| `nextAction` | The next action required to complete the 3DS Authentication. |
| `payment` | The payment details of the 3D Secure Authentication. |
| `preferredVersions` | A prioritized list of preferred 3D Secure versions. |
| `rreq` | The result of the 3DS authentication when a challenge has occurred. |
| `status` | The status of the 3DS Authentication. |
| `threeDSServer` | Details about the 3DS Server involved in the 3DS transaction. |
| `updatedAt` | The exact time, in epoch milliseconds, when this 3DS-Session was last updated. |
| `version` | The 3D Secure version used to authenticate the session. |

Operations: Create, Load.

API path: `/payments/3ds-sessions`

#### Webhook

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/webhook-endpoints/{webhook_endpoint_id}`

#### WebhookEndpoint

| Field | Description |
| --- | --- |
| `createdAt` | The exact time, in epoch milliseconds, when this Webhook Endpoint was created. |
| `events` | A list of Events that the Webhook Endpoint is subscribed to. |
| `id` | A unique identifier representing a specific Webhook Endpoint. |
| `updatedAt` | The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated. |
| `url` | The URL of the Webhook Endpoint. |

Operations: Create, List, Load, Update.

API path: `/webhook-endpoints`



## Entities


### Acquirer

Create an instance: `local acquirer = client:Acquirer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configurations` | `table` | The acquirer configuration settings. |
| `default` | `boolean` | Specifies whether this Acquirer is the default. |
| `description` | `string` | The description of the acquirer configuration. |
| `id` | `string` | The unique identifier of the acquirer configuration. |
| `name` | `string` | The name of the acquirer configuration. |

#### Example: Load

```lua
local acquirer, err = client:Acquirer():load({ id = "acquirer_id" })
```

#### Example: List

```lua
local acquirers, err = client:Acquirer():list()
```

#### Example: Create

```lua
local acquirer, err = client:Acquirer():create({
  configurations = {}, -- table
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
| `number` | `string` | The card number for which the BIN lookup is being requested. |

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
| `address` | `table` | Details about the cardholder's address that the address verification (AVS) is for. |
| `automaticUpdates` | `string` | The status of Card Account Updater on this card. |
| `bin` | `string` | The first 6 or 8 digits of the card number. |
| `brand` | `string` | The card brand associated with the payment card. |
| `card` | `table` | The card details. |
| `cardholder` | `table` | Details about the cardholder that the name verification (ANI) is for. |
| `country` | `string` | The country where the card was issued. |
| `createdAt` | `number` | The Unix timestamp of when the card was created. |
| `currency` | `string` | The currency of the card. |
| `expiry` | `table` | The expiry date of the card. |
| `extensions` | `table` | The extensions to the card insight request. |
| `funding` | `string` | The card funding type specifies the method by which transactions are financed. |
| `id` | `string` | The unique identifier for the card. |
| `issuer` | `string` | The name of the card issuer. |
| `lastFour` | `string` | The last 4 digits of the card number. |
| `number` | `string` | The Evervault encrypted card number. |
| `replacement` | `string|nil` | The ID of the replacement card. |
| `segment` | `string` | The card segment indicates the primary market or usage category of the card. |
| `status` | `string` | The current status of the card. |
| `updatedAt` | `number|nil` | The Unix timestamp of when the card was last updated. |

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
  createdAt = 1, -- number
  expiry = {}, -- table
  lastFour = "example_lastFour", -- string
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
| `data` | `string` | The base64-encoded image data of the card art. |
| `height` | `number` | The height of the card art image in pixels. |
| `type` | `string` | The MIME type of the card art image. |
| `width` | `number` | The width of the card art image in pixels. |

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
| `action` | `string` | The action that the token should permit |
| `expiry` | `number` | The expiry of the token in milliseconds format. |
| `payload` | `table` | The payload that the token must be used with |

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
| `category` | `string` | The category or specific nature of the encrypted value. |
| `core_list` | `table|string|number|boolean` | A JSON value or file to be encrypted. |
| `cores` | `table|string` | A JSON value or file to be decrypted. |
| `createdAt` | `number` | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `string` | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `encryptedAt` | `number` | The date and time when the value was encrypted. |
| `fingerprint` | `string` | A unique identifier for the encrypted value. |
| `id` | `string` | The unique identifier for the custom domain. |
| `metadata` | `any` | Further metadata about the encrypted value. |
| `phoneNumber` | `string` |  |
| `relay` | `string` | The ID of the Relay with which this custom domain is associated. |
| `role` | `string` | The data role of the encrypted value. |
| `status` | `string` | The status of the domains DNS verification. |
| `token` | `string` | The encrypted data to be inspected. |
| `type` | `string` | The type of the encrypted value. |
| `updatedAt` | `number` | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `string` | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

#### Example: List

```lua
local cores, err = client:Core():list({ relay_id = "example" })
```

#### Example: Create

```lua
local core, err = client:Core():create({
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
| `createdAt` | `number` | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `string` | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `id` | `string` | The unique identifier for the custom domain. |
| `relay` | `string` | The ID of the Relay with which this custom domain is associated. |
| `status` | `string` | The status of the domains DNS verification. |
| `updatedAt` | `number` | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `string` | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

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
| `async` | `boolean` | If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code. |
| `createdAt` | `number` | The exact time, in epoch milliseconds, when this Function execution was triggered. |
| `error` | `table|nil` | This field details any error that occurred during Function execution. |
| `id` | `string` | A unique identifier representing this specific Function execution instance. |
| `payload` | `table` | The data payload that the Function will use during its execution. |
| `result` | `table` | This field represents the output returned by the Function. |
| `status` | `string` | The outcome of the Function execution. |

#### Example: Create

```lua
local function_run, err = client:FunctionRun():create({
  function_name = "example_function_name", -- string
  payload = {}, -- table
})
```


### Merchant

Create an instance: `local merchant = client:Merchant(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `applePay` | `table` | The Merchant's Apple Pay configuration. |
| `business` | `table` | The business details of the Merchant. |
| `categoryCode` | `string` | The 4-digit Merchant Category Code (MCC). |
| `createdAt` | `number` | The exact time, in epoch milliseconds, when this Merchant was created. |
| `id` | `string` | A unique identifier assigned to each Merchant. |
| `name` | `string` | The official name of the Merchant as recognized in transactions and communications. |
| `networkTokens` | `table` | The Merchant's Network Token configuration. |
| `shortName` | `string` | A shorter version of the Merchant's name. |
| `updatedAt` | `number` | The exact time, in epoch milliseconds, when this Merchant was last updated. |
| `website` | `string` | The official website URL of the Merchant. |

#### Example: Load

```lua
local merchant, err = client:Merchant():load({ id = "merchant_id" })
```

#### Example: List

```lua
local merchants, err = client:Merchant():list()
```

#### Example: Create

```lua
local merchant, err = client:Merchant():create({
  createdAt = 1, -- number
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
| `card` | `table` | The details of the underlying encrypted card. |
| `createdAt` | `number` | The exact time, in epoch milliseconds, when this Network Token was created. |
| `expiry` | `table` | The expiry details of the Network Token. |
| `id` | `string` | A unique identifier representing a specific Network Token. |
| `merchant` | `string` | The unique identifier of the Merchant associated with this Network Token. |
| `number` | `string` | The unique number of the Network Token. |
| `paymentAccountReference` | `string` | The unique identifier of the Payment Account associated with this Network Token. |
| `status` | `string` | The status of the Network Token. |
| `tokenRequestorIdentifier` | `string` | The identifier of the Token Requestor (TRID) that requested the Network Token. |
| `tokenServiceProvider` | `string` | The Token Service Provider (TSP) that issued the Network Token. |
| `updatedAt` | `number` | The exact time, in epoch milliseconds, when this Network Token was last updated. |

#### Example: Load

```lua
local network_token, err = client:NetworkToken():load({ id = "network_token_id" })
```

#### Example: Create

```lua
local network_token, err = client:NetworkToken():create({
  card = {}, -- table
  createdAt = 1, -- number
  expiry = {}, -- table
  id = "example_id", -- string
  merchant = "example_merchant", -- string
  number = "example_number", -- string
  status = "example_status", -- string
  tokenRequestorIdentifier = "example_tokenRequestorIdentifier", -- string
  tokenServiceProvider = "example_tokenServiceProvider", -- string
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
| `createdAt` | `number` |  |
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
| `created_at` | `number` | Timestamp when the message was created |
| `data` | `table` | The message data payload |
| `type` | `string` | The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes) |

#### Example: List

```lua
local payments, err = client:Payment():list({ ["3ds_session_id"] = "example" })
```


### Relay

Create an instance: `local relay = client:Relay(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `string` | The unique identifier for the app to which the Relay belongs. |
| `authentication` | `string|nil` | The type of authentication required for the Relay |
| `createdAt` | `number` | The exact time, in epoch milliseconds, when this Relay was created. |
| `destinationDomain` | `string` | The domain in front of which the Relay should be configured. |
| `encryptEmptyStrings` | `boolean` | Whether or not empty strings should be encrypted. |
| `evervaultDomain` | `string` | The Evervault managed domain to which requests to be relayed to the destination domain should be sent. |
| `id` | `string` | The unique identifier for the Relay. |
| `routes` | `table` | A collection of route configurations for the Relay. |
| `updatedAt` | `number` | The exact time, in epoch milliseconds, when this Relay was updated. |

#### Example: Load

```lua
local relay, err = client:Relay():load({ id = "relay_id" })
```

#### Example: List

```lua
local relays, err = client:Relay():list()
```

#### Example: Create

```lua
local relay, err = client:Relay():create({
})
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
| `accessControlServer` | `table` | Details about the Access Control Server involved in the 3DS transaction. |
| `acquirer` | `table` | The acquirer of the payment. |
| `ares` | `table` | The details of the 3DS Authentication Response (ARes). |
| `authentication` | `table` | The details of the 3DS Authentication. |
| `card` | `table` | The card details. |
| `challenge` | `table` | Details about the 3DS challenge. |
| `createdAt` | `number` | The exact time, in epoch milliseconds, when this 3DS-Session was created. |
| `cres` | `nil|table` | The details of the 3DS Challenge Response (CRes). |
| `cryptogram` | `string` | The 3DS cryptogram (also called Authentication Value). |
| `customer` | `table` | The details of the customer who initiated the transaction. |
| `directoryServer` | `table` | Details about the Directory Server involved in the 3DS transaction. |
| `eci` | `table` | The details of the Electronic Commerce Indicator. |
| `failureReason` | `string` | The reason for the 3DS Authentication failure. |
| `id` | `string` | A unique identifier assigned to each 3DS Authentication. |
| `initiator` | `table` | Details about the transaction initiation process. |
| `merchant` | `table` | The merchant details. |
| `nextAction` | `table` | The next action required to complete the 3DS Authentication. |
| `payment` | `table` | The payment details of the 3D Secure Authentication. |
| `preferredVersions` | `table` | A prioritized list of preferred 3D Secure versions. |
| `rreq` | `nil|table` | The result of the 3DS authentication when a challenge has occurred. |
| `status` | `string` | The status of the 3DS Authentication. |
| `threeDSServer` | `table` | Details about the 3DS Server involved in the 3DS transaction. |
| `updatedAt` | `number` | The exact time, in epoch milliseconds, when this 3DS-Session was last updated. |
| `version` | `string` | The 3D Secure version used to authenticate the session. |

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
  createdAt = 1, -- number
  id = "example_id", -- string
  merchant = {}, -- table
  nextAction = {}, -- table
  status = "example_status", -- string
  version = "example_version", -- string
})
```


### Webhook

Create an instance: `local webhook = client:Webhook(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### WebhookEndpoint

Create an instance: `local webhook_endpoint = client:WebhookEndpoint(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `number` | The exact time, in epoch milliseconds, when this Webhook Endpoint was created. |
| `events` | `table` | A list of Events that the Webhook Endpoint is subscribed to. |
| `id` | `string` | A unique identifier representing a specific Webhook Endpoint. |
| `updatedAt` | `number|nil` | The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated. |
| `url` | `string` | The URL of the Webhook Endpoint. |

#### Example: Load

```lua
local webhook_endpoint, err = client:WebhookEndpoint():load({ id = "webhook_endpoint_id" })
```

#### Example: List

```lua
local webhook_endpoints, err = client:WebhookEndpoint():list()
```

#### Example: Create

```lua
local webhook_endpoint, err = client:WebhookEndpoint():create({
})
```

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Debug capture |
| [`idempotency`](#idempotency) | Idempotency |
| [`metrics`](#metrics) | Metrics |
| [`paging`](#paging) | Paging |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Debug capture.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Metrics.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Paging.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

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
├── schema.lua               -- Generated option + entity specs
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local merchant = client:Merchant()
merchant:list()

-- merchant:data_get() now returns the merchant data from the last list
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
