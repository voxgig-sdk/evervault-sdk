# Evervault Ruby SDK



The Ruby SDK for the Evervault API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Acquirer` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/evervault-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/evervault-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-evervault-sdk", path: "./evervault-sdk/rb"
```


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

### 2. List acquirer records

```ruby
begin
  # list returns an Array of Acquirer entities, one per record; data_get reads the record.
  acquirers = client.Acquirer.list
  acquirers.each do |item|
    record = item.data_get
    puts "#{record["id"]} #{record["configurations"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a cardart

CardArt is nested under network_token, so provide the `network_token_id`.

```ruby
begin
  # load returns the ENTITY — call data_get for the CardArt record (raises on error).
  cardart = client.CardArt.load({ "network_token_id" => "example_network_token_id" })
  puts cardart.data_get
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# create returns the ENTITY — call data_get for the created Acquirer record.
created = client.Acquirer.create({ "configurations" => [], "default" => true, "id" => "example_id", "name" => "example_name" })

# Update — index the record via data_get (created.data_get["id"]).
client.Acquirer.update({ "id" => created.data_get["id"], "configurations" => [], "default" => true })

```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  merchants = client.Merchant.list()
rescue => err
  warn "list failed: #{err}"
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

# list returns an Array of Merchant entities, one per mock record (raises on
# error); data_get reads each record.
merchants = client.Merchant.list()
merchants.each { |item| puts item.data_get }
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity, and return it. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity, and return it marked as deleted. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`EvervaultError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

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

Create an instance: `acquirer = client.Acquirer`

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
| `configurations` | `Array` | The acquirer configuration settings. |
| `default` | `Boolean` | Specifies whether this Acquirer is the default. |
| `description` | `String` | The description of the acquirer configuration. |
| `id` | `String` | The unique identifier of the acquirer configuration. |
| `name` | `String` | The name of the acquirer configuration. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Acquirer record (raises on error).
acquirer = client.Acquirer.load({ "id" => "acquirer_id" })
```

#### Example: List

```ruby
# list returns an Array of Acquirer entities, one per record (raises on error).
acquirers = client.Acquirer.list
acquirers.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
acquirer = client.Acquirer.create({
  "configurations" => [], # Array
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
| `number` | `String` | The card number for which the BIN lookup is being requested. |

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
| `address` | `Hash` | Details about the cardholder's address that the address verification (AVS) is for. |
| `automaticUpdates` | `String` | The status of Card Account Updater on this card. |
| `bin` | `String` | The first 6 or 8 digits of the card number. |
| `brand` | `String` | The card brand associated with the payment card. |
| `card` | `Hash` | The card details. |
| `cardholder` | `Hash` | Details about the cardholder that the name verification (ANI) is for. |
| `country` | `String` | The country where the card was issued. |
| `createdAt` | `Integer` | The Unix timestamp of when the card was created. |
| `currency` | `String` | The currency of the card. |
| `expiry` | `Hash` | The expiry date of the card. |
| `extensions` | `Array` | The extensions to the card insight request. |
| `funding` | `String` | The card funding type specifies the method by which transactions are financed. |
| `id` | `String` | The unique identifier for the card. |
| `issuer` | `String` | The name of the card issuer. |
| `lastFour` | `String` | The last 4 digits of the card number. |
| `number` | `String` | The Evervault encrypted card number. |
| `replacement` | `Object` | The ID of the replacement card. |
| `segment` | `String` | The card segment indicates the primary market or usage category of the card. |
| `status` | `String` | The current status of the card. |
| `updatedAt` | `Object` | The Unix timestamp of when the card was last updated. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Card record (raises on error).
card = client.Card.load({ "id" => "card_id" })
```

#### Example: Create

```ruby
card = client.Card.create({
  "address" => {}, # Hash
  "bin" => "example_bin", # String
  "card" => {}, # Hash
  "createdAt" => 1, # Integer
  "expiry" => {}, # Hash
  "lastFour" => "example_lastFour", # String
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
| `data` | `String` | The base64-encoded image data of the card art. |
| `height` | `Integer` | The height of the card art image in pixels. |
| `type` | `String` | The MIME type of the card art image. |
| `width` | `Integer` | The width of the card art image in pixels. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CardArt record (raises on error).
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
| `action` | `String` | The action that the token should permit |
| `expiry` | `Integer` | The expiry of the token in milliseconds format. |
| `payload` | `Hash` | The payload that the token must be used with |

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
| `category` | `String` | The category or specific nature of the encrypted value. |
| `core_list` | `Object` | A JSON value or file to be encrypted. |
| `cores` | `Object` | A JSON value or file to be decrypted. |
| `createdAt` | `Integer` | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `String` | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `encryptedAt` | `Integer` | The date and time when the value was encrypted. |
| `fingerprint` | `String` | A unique identifier for the encrypted value. |
| `id` | `String` | The unique identifier for the custom domain. |
| `metadata` | `Object` | Further metadata about the encrypted value. |
| `phoneNumber` | `String` |  |
| `relay` | `String` | The ID of the Relay with which this custom domain is associated. |
| `role` | `String` | The data role of the encrypted value. |
| `status` | `String` | The status of the domains DNS verification. |
| `token` | `String` | The encrypted data to be inspected. |
| `type` | `String` | The type of the encrypted value. |
| `updatedAt` | `Integer` | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `String` | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

#### Example: List

```ruby
# list returns an Array of Core entities, one per record (raises on error).
cores = client.Core.list({ "relay_id" => "example" })
cores.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
core = client.Core.create({
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
| `createdAt` | `Integer` | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `String` | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `id` | `String` | The unique identifier for the custom domain. |
| `relay` | `String` | The ID of the Relay with which this custom domain is associated. |
| `status` | `String` | The status of the domains DNS verification. |
| `updatedAt` | `Integer` | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `String` | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CustomDomain record (raises on error).
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
| `async` | `Boolean` | If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code. |
| `createdAt` | `Integer` | The exact time, in epoch milliseconds, when this Function execution was triggered. |
| `error` | `Object` | This field details any error that occurred during Function execution. |
| `id` | `String` | A unique identifier representing this specific Function execution instance. |
| `payload` | `Hash` | The data payload that the Function will use during its execution. |
| `result` | `Hash` | This field represents the output returned by the Function. |
| `status` | `String` | The outcome of the Function execution. |

#### Example: Create

```ruby
function_run = client.FunctionRun.create({
  "function_name" => "example_function_name", # String
  "payload" => {}, # Hash
})
```


### Merchant

Create an instance: `merchant = client.Merchant`

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
| `applePay` | `Hash` | The Merchant's Apple Pay configuration. |
| `business` | `Hash` | The business details of the Merchant. |
| `categoryCode` | `String` | The 4-digit Merchant Category Code (MCC). |
| `createdAt` | `Integer` | The exact time, in epoch milliseconds, when this Merchant was created. |
| `id` | `String` | A unique identifier assigned to each Merchant. |
| `name` | `String` | The official name of the Merchant as recognized in transactions and communications. |
| `networkTokens` | `Hash` | The Merchant's Network Token configuration. |
| `shortName` | `String` | A shorter version of the Merchant's name. |
| `updatedAt` | `Integer` | The exact time, in epoch milliseconds, when this Merchant was last updated. |
| `website` | `String` | The official website URL of the Merchant. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Merchant record (raises on error).
merchant = client.Merchant.load({ "id" => "merchant_id" })
```

#### Example: List

```ruby
# list returns an Array of Merchant entities, one per record (raises on error).
merchants = client.Merchant.list
merchants.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
merchant = client.Merchant.create({
  "createdAt" => 1, # Integer
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
| `card` | `Hash` | The details of the underlying encrypted card. |
| `createdAt` | `Integer` | The exact time, in epoch milliseconds, when this Network Token was created. |
| `expiry` | `Hash` | The expiry details of the Network Token. |
| `id` | `String` | A unique identifier representing a specific Network Token. |
| `merchant` | `String` | The unique identifier of the Merchant associated with this Network Token. |
| `number` | `String` | The unique number of the Network Token. |
| `paymentAccountReference` | `String` | The unique identifier of the Payment Account associated with this Network Token. |
| `status` | `String` | The status of the Network Token. |
| `tokenRequestorIdentifier` | `String` | The identifier of the Token Requestor (TRID) that requested the Network Token. |
| `tokenServiceProvider` | `String` | The Token Service Provider (TSP) that issued the Network Token. |
| `updatedAt` | `Integer` | The exact time, in epoch milliseconds, when this Network Token was last updated. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the NetworkToken record (raises on error).
network_token = client.NetworkToken.load({ "id" => "network_token_id" })
```

#### Example: Create

```ruby
network_token = client.NetworkToken.create({
  "card" => {}, # Hash
  "createdAt" => 1, # Integer
  "expiry" => {}, # Hash
  "id" => "example_id", # String
  "merchant" => "example_merchant", # String
  "number" => "example_number", # String
  "status" => "example_status", # String
  "tokenRequestorIdentifier" => "example_tokenRequestorIdentifier", # String
  "tokenServiceProvider" => "example_tokenServiceProvider", # String
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
| `createdAt` | `Integer` |  |
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
| `created_at` | `Integer` | Timestamp when the message was created |
| `data` | `Hash` | The message data payload |
| `type` | `String` | The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes) |

#### Example: List

```ruby
# list returns an Array of Payment entities, one per record (raises on error).
payments = client.Payment.list({ "3ds_session_id" => "example" })
payments.each { |item| puts item.data_get }
```


### Relay

Create an instance: `relay = client.Relay`

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
| `app` | `String` | The unique identifier for the app to which the Relay belongs. |
| `authentication` | `Object` | The type of authentication required for the Relay |
| `createdAt` | `Integer` | The exact time, in epoch milliseconds, when this Relay was created. |
| `destinationDomain` | `String` | The domain in front of which the Relay should be configured. |
| `encryptEmptyStrings` | `Boolean` | Whether or not empty strings should be encrypted. |
| `evervaultDomain` | `String` | The Evervault managed domain to which requests to be relayed to the destination domain should be sent. |
| `id` | `String` | The unique identifier for the Relay. |
| `routes` | `Array` | A collection of route configurations for the Relay. |
| `updatedAt` | `Integer` | The exact time, in epoch milliseconds, when this Relay was updated. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Relay record (raises on error).
relay = client.Relay.load({ "id" => "relay_id" })
```

#### Example: List

```ruby
# list returns an Array of Relay entities, one per record (raises on error).
relays = client.Relay.list
relays.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
relay = client.Relay.create({
})
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
| `accessControlServer` | `Hash` | Details about the Access Control Server involved in the 3DS transaction. |
| `acquirer` | `Hash` | The acquirer of the payment. |
| `ares` | `Hash` | The details of the 3DS Authentication Response (ARes). |
| `authentication` | `Hash` | The details of the 3DS Authentication. |
| `card` | `Hash` | The card details. |
| `challenge` | `Hash` | Details about the 3DS challenge. |
| `createdAt` | `Integer` | The exact time, in epoch milliseconds, when this 3DS-Session was created. |
| `cres` | `Object` | The details of the 3DS Challenge Response (CRes). |
| `cryptogram` | `String` | The 3DS cryptogram (also called Authentication Value). |
| `customer` | `Hash` | The details of the customer who initiated the transaction. |
| `directoryServer` | `Hash` | Details about the Directory Server involved in the 3DS transaction. |
| `eci` | `Hash` | The details of the Electronic Commerce Indicator. |
| `failureReason` | `String` | The reason for the 3DS Authentication failure. |
| `id` | `String` | A unique identifier assigned to each 3DS Authentication. |
| `initiator` | `Hash` | Details about the transaction initiation process. |
| `merchant` | `Hash` | The merchant details. |
| `nextAction` | `Hash` | The next action required to complete the 3DS Authentication. |
| `payment` | `Hash` | The payment details of the 3D Secure Authentication. |
| `preferredVersions` | `Array` | A prioritized list of preferred 3D Secure versions. |
| `rreq` | `Object` | The result of the 3DS authentication when a challenge has occurred. |
| `status` | `String` | The status of the 3DS Authentication. |
| `threeDSServer` | `Hash` | Details about the 3DS Server involved in the 3DS transaction. |
| `updatedAt` | `Integer` | The exact time, in epoch milliseconds, when this 3DS-Session was last updated. |
| `version` | `String` | The 3D Secure version used to authenticate the session. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ThreeDsSession record (raises on error).
three_ds_session = client.ThreeDsSession.load({ "3ds_session_id" => "3ds_session_id" })
```

#### Example: Create

```ruby
three_ds_session = client.ThreeDsSession.create({
  "acquirer" => {}, # Hash
  "authentication" => {}, # Hash
  "card" => {}, # Hash
  "challenge" => {}, # Hash
  "createdAt" => 1, # Integer
  "id" => "example_id", # String
  "merchant" => {}, # Hash
  "nextAction" => {}, # Hash
  "status" => "example_status", # String
  "version" => "example_version", # String
})
```


### Webhook

Create an instance: `webhook = client.Webhook`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### WebhookEndpoint

Create an instance: `webhook_endpoint = client.WebhookEndpoint`

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
| `createdAt` | `Integer` | The exact time, in epoch milliseconds, when this Webhook Endpoint was created. |
| `events` | `Array` | A list of Events that the Webhook Endpoint is subscribed to. |
| `id` | `String` | A unique identifier representing a specific Webhook Endpoint. |
| `updatedAt` | `Object` | The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated. |
| `url` | `String` | The URL of the Webhook Endpoint. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the WebhookEndpoint record (raises on error).
webhook_endpoint = client.WebhookEndpoint.load({ "id" => "webhook_endpoint_id" })
```

#### Example: List

```ruby
# list returns an Array of WebhookEndpoint entities, one per record (raises on error).
webhook_endpoints = client.WebhookEndpoint.list
webhook_endpoints.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
webhook_endpoint = client.WebhookEndpoint.create({
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

Features are the extension mechanism. A feature is a Ruby class
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
├── schema.rb                  -- Generated option + entity specs
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
merchant = client.Merchant
merchant.list()

# merchant.data_get now returns the merchant data from the last list
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
