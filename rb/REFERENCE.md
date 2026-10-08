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
| `configurations` | `Array` | Yes | The acquirer configuration settings. |
| `default` | `Boolean` | Yes | Specifies whether this Acquirer is the default. |
| `description` | `String` | No | The description of the acquirer configuration. |
| `id` | `String` | Yes | The unique identifier of the acquirer configuration. |
| `name` | `String` | Yes | The name of the acquirer configuration. |

### Field Usage by Operation

| Field | load | list | create | update |
| --- | --- | --- | --- | --- |
| `configurations` | - | - | - | Yes |
| `default` | - | - | - | Yes |
| `description` | - | - | - | - |
| `id` | - | - | - | - |
| `name` | - | - | - | Yes |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Acquirer.create({
  "configurations" => [], # Array
  "default" => true, # Boolean
  "id" => "example_id", # String
  "name" => "example_name", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Acquirer.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Acquirer.load({ "id" => "acquirer_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

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
| `number` | `String` | Yes | The card number for which the BIN lookup is being requested. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

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
| `address` | `Hash` | Yes | Details about the cardholder's address that the address verification (AVS) is for. |
| `automaticUpdates` | `String` | No | The status of Card Account Updater on this card. |
| `bin` | `String` | Yes | The first 6 or 8 digits of the card number. |
| `brand` | `String` | No | The card brand associated with the payment card. |
| `card` | `Hash` | Yes | The card details. |
| `cardholder` | `Hash` | No | Details about the cardholder that the name verification (ANI) is for. |
| `country` | `String` | No | The country where the card was issued. |
| `createdAt` | `Integer` | Yes | The Unix timestamp of when the card was created. |
| `currency` | `String` | No | The currency of the card. |
| `expiry` | `Hash` | Yes | The expiry date of the card. |
| `extensions` | `Array` | No | The extensions to the card insight request. |
| `funding` | `String` | No | The card funding type specifies the method by which transactions are financed. |
| `id` | `String` | No | The unique identifier for the card. |
| `issuer` | `String` | No | The name of the card issuer. |
| `lastFour` | `String` | Yes | The last 4 digits of the card number. |
| `number` | `String` | Yes | The Evervault encrypted card number. |
| `replacement` | `Object` | No | The ID of the replacement card. |
| `segment` | `String` | No | The card segment indicates the primary market or usage category of the card. |
| `status` | `String` | No | The current status of the card. |
| `updatedAt` | `Object` | No | The Unix timestamp of when the card was last updated. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Card.create({
  "address" => {}, # Hash
  "bin" => "example_bin", # String
  "card" => {}, # Hash
  "createdAt" => 1, # Integer
  "expiry" => {}, # Hash
  "lastFour" => "example_lastFour", # String
  "number" => "example_number", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

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
| `data` | `String` | Yes | The base64-encoded image data of the card art. |
| `height` | `Integer` | Yes | The height of the card art image in pixels. |
| `type` | `String` | Yes | The MIME type of the card art image. |
| `width` | `Integer` | Yes | The width of the card art image in pixels. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

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
| `action` | `String` | Yes | The action that the token should permit |
| `expiry` | `Integer` | No | The expiry of the token in milliseconds format. |
| `payload` | `Hash` | No | The payload that the token must be used with |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

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
| `category` | `String` | No | The category or specific nature of the encrypted value. |
| `core_list` | `Object` | No | A JSON value or file to be encrypted. |
| `cores` | `Object` | No | A JSON value or file to be decrypted. |
| `createdAt` | `Integer` | No | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `String` | No | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `encryptedAt` | `Integer` | No | The date and time when the value was encrypted. |
| `fingerprint` | `String` | No | A unique identifier for the encrypted value. |
| `id` | `String` | No | The unique identifier for the custom domain. |
| `metadata` | `Object` | No | Further metadata about the encrypted value. |
| `phoneNumber` | `String` | No |  |
| `relay` | `String` | No | The ID of the Relay with which this custom domain is associated. |
| `role` | `String` | No | The data role of the encrypted value. |
| `status` | `String` | No | The status of the domains DNS verification. |
| `token` | `String` | Yes | The encrypted data to be inspected. |
| `type` | `String` | No | The type of the encrypted value. |
| `updatedAt` | `Integer` | No | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `String` | No | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Core.create({
  "token" => "example_token", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Core.list({ "relay_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

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
| `createdAt` | `Integer` | No | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `String` | No | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `id` | `String` | No | The unique identifier for the custom domain. |
| `relay` | `String` | No | The ID of the Relay with which this custom domain is associated. |
| `status` | `String` | No | The status of the domains DNS verification. |
| `updatedAt` | `Integer` | No | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `String` | No | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.CustomDomain.create({
  "relay_id" => "example_relay_id", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

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
| `async` | `Boolean` | No | If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code. |
| `createdAt` | `Integer` | No | The exact time, in epoch milliseconds, when this Function execution was triggered. |
| `error` | `Object` | No | This field details any error that occurred during Function execution. |
| `id` | `String` | No | A unique identifier representing this specific Function execution instance. |
| `payload` | `Hash` | Yes | The data payload that the Function will use during its execution. |
| `result` | `Hash` | No | This field represents the output returned by the Function. |
| `status` | `String` | No | The outcome of the Function execution. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.FunctionRun.create({
  "function_name" => "example_function_name", # String
  "payload" => {}, # Hash
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
| `applePay` | `Hash` | No | The Merchant's Apple Pay configuration. |
| `business` | `Hash` | No | The business details of the Merchant. |
| `categoryCode` | `String` | No | The 4-digit Merchant Category Code (MCC). |
| `createdAt` | `Integer` | Yes | The exact time, in epoch milliseconds, when this Merchant was created. |
| `id` | `String` | Yes | A unique identifier assigned to each Merchant. |
| `name` | `String` | Yes | The official name of the Merchant as recognized in transactions and communications. |
| `networkTokens` | `Hash` | No | The Merchant's Network Token configuration. |
| `shortName` | `String` | No | A shorter version of the Merchant's name. |
| `updatedAt` | `Integer` | No | The exact time, in epoch milliseconds, when this Merchant was last updated. |
| `website` | `String` | Yes | The official website URL of the Merchant. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Merchant.create({
  "createdAt" => 1, # Integer
  "id" => "example_id", # String
  "name" => "example_name", # String
  "website" => "example_website", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Merchant.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Merchant.load({ "id" => "merchant_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

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
| `card` | `Hash` | Yes | The details of the underlying encrypted card. |
| `createdAt` | `Integer` | Yes | The exact time, in epoch milliseconds, when this Network Token was created. |
| `expiry` | `Hash` | Yes | The expiry details of the Network Token. |
| `id` | `String` | Yes | A unique identifier representing a specific Network Token. |
| `merchant` | `String` | Yes | The unique identifier of the Merchant associated with this Network Token. |
| `number` | `String` | Yes | The unique number of the Network Token. |
| `paymentAccountReference` | `String` | No | The unique identifier of the Payment Account associated with this Network Token. |
| `status` | `String` | Yes | The status of the Network Token. |
| `tokenRequestorIdentifier` | `String` | Yes | The identifier of the Token Requestor (TRID) that requested the Network Token. |
| `tokenServiceProvider` | `String` | Yes | The Token Service Provider (TSP) that issued the Network Token. |
| `updatedAt` | `Integer` | No | The exact time, in epoch milliseconds, when this Network Token was last updated. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.NetworkToken.create({
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

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

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
| `createdAt` | `Integer` | No |  |
| `cryptogram` | `String` | No |  |
| `id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

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
| `created_at` | `Integer` | No | Timestamp when the message was created |
| `data` | `Hash` | No | The message data payload |
| `type` | `String` | No | The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes) |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Payment.list({ "3ds_session_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Payment.remove({ "acquirer_id" => "acquirer_id" })
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
| `app` | `String` | No | The unique identifier for the app to which the Relay belongs. |
| `authentication` | `Object` | No | The type of authentication required for the Relay |
| `createdAt` | `Integer` | No | The exact time, in epoch milliseconds, when this Relay was created. |
| `destinationDomain` | `String` | No | The domain in front of which the Relay should be configured. |
| `encryptEmptyStrings` | `Boolean` | No | Whether or not empty strings should be encrypted. |
| `evervaultDomain` | `String` | No | The Evervault managed domain to which requests to be relayed to the destination domain should be sent. |
| `id` | `String` | No | The unique identifier for the Relay. |
| `routes` | `Array` | No | A collection of route configurations for the Relay. |
| `updatedAt` | `Integer` | No | The exact time, in epoch milliseconds, when this Relay was updated. |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Relay.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Relay.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Relay.load({ "id" => "relay_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

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
| `accessControlServer` | `Hash` | No | Details about the Access Control Server involved in the 3DS transaction. |
| `acquirer` | `Hash` | Yes | The acquirer of the payment. |
| `ares` | `Hash` | No | The details of the 3DS Authentication Response (ARes). |
| `authentication` | `Hash` | Yes | The details of the 3DS Authentication. |
| `card` | `Hash` | Yes | The card details. |
| `challenge` | `Hash` | Yes | Details about the 3DS challenge. |
| `createdAt` | `Integer` | Yes | The exact time, in epoch milliseconds, when this 3DS-Session was created. |
| `cres` | `Object` | No | The details of the 3DS Challenge Response (CRes). |
| `cryptogram` | `String` | No | The 3DS cryptogram (also called Authentication Value). |
| `customer` | `Hash` | No | The details of the customer who initiated the transaction. |
| `directoryServer` | `Hash` | No | Details about the Directory Server involved in the 3DS transaction. |
| `eci` | `Hash` | No | The details of the Electronic Commerce Indicator. |
| `failureReason` | `String` | No | The reason for the 3DS Authentication failure. |
| `id` | `String` | Yes | A unique identifier assigned to each 3DS Authentication. |
| `initiator` | `Hash` | No | Details about the transaction initiation process. |
| `merchant` | `Hash` | Yes | The merchant details. |
| `nextAction` | `Hash` | Yes | The next action required to complete the 3DS Authentication. |
| `payment` | `Hash` | No | The payment details of the 3D Secure Authentication. |
| `preferredVersions` | `Array` | No | A prioritized list of preferred 3D Secure versions. |
| `rreq` | `Object` | No | The result of the 3DS authentication when a challenge has occurred. |
| `status` | `String` | Yes | The status of the 3DS Authentication. |
| `threeDSServer` | `Hash` | No | Details about the 3DS Server involved in the 3DS transaction. |
| `updatedAt` | `Integer` | No | The exact time, in epoch milliseconds, when this 3DS-Session was last updated. |
| `version` | `String` | Yes | The 3D Secure version used to authenticate the session. |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ThreeDsSession.create({
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

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

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

### Operations

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

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
| `createdAt` | `Integer` | No | The exact time, in epoch milliseconds, when this Webhook Endpoint was created. |
| `events` | `Array` | No | A list of Events that the Webhook Endpoint is subscribed to. |
| `id` | `String` | No | A unique identifier representing a specific Webhook Endpoint. |
| `updatedAt` | `Object` | No | The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated. |
| `url` | `String` | No | The URL of the Webhook Endpoint. |

### Field Usage by Operation

| Field | load | list | create | update |
| --- | --- | --- | --- | --- |
| `createdAt` | - | - | - | - |
| `events` | - | - | Yes | Yes |
| `id` | - | - | - | - |
| `updatedAt` | - | - | - | - |
| `url` | - | - | Yes | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.WebhookEndpoint.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.WebhookEndpoint.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.WebhookEndpoint.load({ "id" => "webhook_endpoint_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

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
| `debug` | 0.0.1 | Debug capture |
| `idempotency` | 0.0.1 | Idempotency |
| `metrics` | 0.0.1 | Metrics |
| `paging` | 0.0.1 | Paging |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ruby
client = EvervaultSDK.new({
  "feature" => {
    "debug" => { "active" => true },
    "idempotency" => { "active" => true },
    "metrics" => { "active" => true },
    "paging" => { "active" => true },
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
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

