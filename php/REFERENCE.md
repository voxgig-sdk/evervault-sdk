# Evervault PHP SDK Reference

Complete API reference for the Evervault PHP SDK.


## EvervaultSDK

### Constructor

```php
require_once __DIR__ . '/evervault_sdk.php';

$client = new EvervaultSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `EvervaultSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = EvervaultSDK::test();
```


### Instance Methods

#### `Acquirer($data = null)`

Create a new `AcquirerEntity` instance. Pass `null` for no initial data.

#### `BinLookup($data = null)`

Create a new `BinLookupEntity` instance. Pass `null` for no initial data.

#### `Card($data = null)`

Create a new `CardEntity` instance. Pass `null` for no initial data.

#### `CardArt($data = null)`

Create a new `CardArtEntity` instance. Pass `null` for no initial data.

#### `ClientSideToken($data = null)`

Create a new `ClientSideTokenEntity` instance. Pass `null` for no initial data.

#### `Core($data = null)`

Create a new `CoreEntity` instance. Pass `null` for no initial data.

#### `CustomDomain($data = null)`

Create a new `CustomDomainEntity` instance. Pass `null` for no initial data.

#### `FunctionRun($data = null)`

Create a new `FunctionRunEntity` instance. Pass `null` for no initial data.

#### `Merchant($data = null)`

Create a new `MerchantEntity` instance. Pass `null` for no initial data.

#### `NetworkToken($data = null)`

Create a new `NetworkTokenEntity` instance. Pass `null` for no initial data.

#### `NetworkTokenCryptogram($data = null)`

Create a new `NetworkTokenCryptogramEntity` instance. Pass `null` for no initial data.

#### `Payment($data = null)`

Create a new `PaymentEntity` instance. Pass `null` for no initial data.

#### `Relay($data = null)`

Create a new `RelayEntity` instance. Pass `null` for no initial data.

#### `ThreeDsSession($data = null)`

Create a new `ThreeDsSessionEntity` instance. Pass `null` for no initial data.

#### `Webhook($data = null)`

Create a new `WebhookEntity` instance. Pass `null` for no initial data.

#### `WebhookEndpoint($data = null)`

Create a new `WebhookEndpointEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): EvervaultUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AcquirerEntity

```php
$acquirer = $client->Acquirer();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `configurations` | `array` | Yes | The acquirer configuration settings. |
| `default` | `bool` | Yes | Specifies whether this Acquirer is the default. |
| `description` | `string` | No | The description of the acquirer configuration. |
| `id` | `string` | Yes | The unique identifier of the acquirer configuration. |
| `name` | `string` | Yes | The name of the acquirer configuration. |

### Field Usage by Operation

| Field | load | create | update |
| --- | --- | --- | --- |
| `configurations` | - | - | Yes |
| `default` | - | Yes | Yes |
| `description` | - | - | - |
| `id` | - | - | - |
| `name` | - | - | Yes |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Acquirer()->create([
  "configurations" => null, // array
  "default" => null, // bool
  "id" => null, // string
  "name" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Acquirer()->load(["id" => "acquirer_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Acquirer()->update([
  "id" => "acquirer_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AcquirerEntity`

Create a new `AcquirerEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BinLookupEntity

```php
$bin_lookup = $client->BinLookup();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `number` | `string` | Yes | The card number for which the BIN lookup is being requested. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->BinLookup()->create([
  "number" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BinLookupEntity`

Create a new `BinLookupEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CardEntity

```php
$card = $client->Card();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `array` | Yes | Details about the cardholder's address that the address verification (AVS) is for. |
| `card` | `array` | Yes | The card details. |
| `cardholder` | `array` | No | Details about the cardholder that the name verification (ANI) is for. |
| `expiry` | `array` | Yes |  |
| `extensions` | `array` | No | The extensions to the card insight request. |
| `id` | `string` | No |  |
| `month` | `string` | Yes | The card expiry month, in MM format (e.g. |
| `number` | `string` | Yes | The card number. |
| `year` | `string` | Yes | The card expiry year, in YY format (e.g. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Card()->create([
  "address" => null, // array
  "card" => null, // array
  "expiry" => null, // array
  "month" => null, // string
  "number" => null, // string
  "year" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Card()->load(["id" => "card_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CardEntity`

Create a new `CardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CardArtEntity

```php
$card_art = $client->CardArt();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `string` | Yes | The base64-encoded image data of the card art. |
| `height` | `int` | Yes | The height of the card art image in pixels. |
| `type` | `string` | Yes | The MIME type of the card art image. |
| `width` | `int` | Yes | The width of the card art image in pixels. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->CardArt()->load(["network_token_id" => "network_token_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CardArtEntity`

Create a new `CardArtEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ClientSideTokenEntity

```php
$client_side_token = $client->ClientSideToken();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes | The action that the token should permit |
| `expiry` | `int` | No | The expiry of the token in milliseconds format. |
| `payload` | `array` | No | The payload that the token must be used with |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->ClientSideToken()->create([
  "action" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ClientSideTokenEntity`

Create a new `ClientSideTokenEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CoreEntity

```php
$core = $client->Core();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `string` | No | The unique identifier for the app to which the Relay belongs. |
| `authentication` | `mixed` | No | The type of authentication required for the Relay |
| `createdAt` | `int` | No | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `string` | No | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `destinationDomain` | `string` | Yes | The domain in front of which you would like to configure a Relay |
| `encryptEmptyStrings` | `bool` | No | Whether or not empty strings should be encrypted. |
| `evervaultDomain` | `string` | No | The Evervault managed domain to which requests to be relayed to the destination domain should be sent. |
| `id` | `string` | No | The unique identifier for the custom domain. |
| `phoneNumber` | `string` | No |  |
| `relay` | `string` | No | The ID of the Relay with which this custom domain is associated. |
| `routes` | `array` | Yes | A collection of route configurations for the Relay. |
| `status` | `string` | No | The status of the domains DNS verification. |
| `token` | `string` | Yes | The encrypted data to be inspected. |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `string` | No | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Core()->create([
  "destinationDomain" => null, // string
  "routes" => null, // array
  "token" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Core()->list();
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Core()->remove(["id" => "id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CoreEntity`

Create a new `CoreEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CustomDomainEntity

```php
$custom_domain = $client->CustomDomain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `int` | No | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `string` | No | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `id` | `string` | No | The unique identifier for the custom domain. |
| `relay` | `string` | No | The ID of the Relay with which this custom domain is associated. |
| `status` | `string` | No | The status of the domains DNS verification. |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this custom domain was last updated. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->CustomDomain()->create([
  "relay_id" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->CustomDomain()->load(["id" => "custom_domain_id", "relay_id" => "relay_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CustomDomainEntity`

Create a new `CustomDomainEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FunctionRunEntity

```php
$function_run = $client->FunctionRun();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `async` | `bool` | No | If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code. |
| `createdAt` | `int` | No | The exact time, in epoch milliseconds, when this Function execution was triggered. |
| `error` | `mixed` | No | This field details any error that occurred during Function execution. |
| `id` | `string` | No | A unique identifier representing this specific Function execution instance. |
| `payload` | `array` | Yes | The data payload that the Function will use during its execution. |
| `result` | `array` | No | This field represents the output returned by the Function. |
| `status` | `string` | No | The outcome of the Function execution. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->FunctionRun()->create([
  "function_name" => null, // string
  "payload" => null, // array
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FunctionRunEntity`

Create a new `FunctionRunEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MerchantEntity

```php
$merchant = $client->Merchant();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `applePay` | `array` | No | The Merchant's Apple Pay configuration. |
| `business` | `array` | No | The business details of the Merchant. |
| `categoryCode` | `string` | No | The 4-digit Merchant Category Code (MCC). |
| `createdAt` | `int` | Yes | The exact time, in epoch milliseconds, when this Merchant was created. |
| `id` | `string` | Yes | A unique identifier assigned to each Merchant. |
| `name` | `string` | Yes | The official name of the Merchant as recognized in transactions and communications. |
| `networkTokens` | `array` | No | The Merchant's Network Token configuration. |
| `shortName` | `string` | No | A shorter version of the Merchant's name. |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this Merchant was last updated. |
| `website` | `string` | Yes | The official website URL of the Merchant. |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Merchant()->create([
  "createdAt" => null, // int
  "id" => null, // string
  "name" => null, // string
  "website" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Merchant()->load(["id" => "merchant_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Merchant()->update([
  "id" => "merchant_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MerchantEntity`

Create a new `MerchantEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## NetworkTokenEntity

```php
$network_token = $client->NetworkToken();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | `array` | Yes | The details of the underlying encrypted card. |
| `createdAt` | `int` | Yes | The exact time, in epoch milliseconds, when this Network Token was created. |
| `expiry` | `array` | Yes | The expiry details of the Network Token. |
| `id` | `string` | Yes | A unique identifier representing a specific Network Token. |
| `merchant` | `string` | Yes | The unique identifier of the Merchant associated with this Network Token. |
| `number` | `string` | Yes | The unique number of the Network Token. |
| `paymentAccountReference` | `string` | No | The unique identifier of the Payment Account associated with this Network Token. |
| `status` | `string` | Yes | The status of the Network Token. |
| `tokenRequestorIdentifier` | `string` | Yes | The identifier of the Token Requestor (TRID) that requested the Network Token. |
| `tokenServiceProvider` | `string` | Yes | The Token Service Provider (TSP) that issued the Network Token. |
| `updateType` | `string` | No | The type of update to simulate. |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this Network Token was last updated. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->NetworkToken()->create([
  "card" => null, // array
  "createdAt" => null, // int
  "expiry" => null, // array
  "id" => null, // string
  "merchant" => null, // string
  "number" => null, // string
  "status" => null, // string
  "tokenRequestorIdentifier" => null, // string
  "tokenServiceProvider" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->NetworkToken()->load(["id" => "network_token_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): NetworkTokenEntity`

Create a new `NetworkTokenEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## NetworkTokenCryptogramEntity

```php
$network_token_cryptogram = $client->NetworkTokenCryptogram();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `int` | No |  |
| `cryptogram` | `string` | No |  |
| `id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->NetworkTokenCryptogram()->create([
  "id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): NetworkTokenCryptogramEntity`

Create a new `NetworkTokenCryptogramEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PaymentEntity

```php
$payment = $client->Payment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `applePay` | `array` | No | The Merchant's Apple Pay configuration. |
| `business` | `array` | No | The business details of the Merchant. |
| `categoryCode` | `string` | No | The 4-digit Merchant Category Code (MCC). |
| `configurations` | `array` | Yes | The acquirer configuration settings. |
| `createdAt` | `int` | Yes | The exact time, in epoch milliseconds, when this Merchant was created. |
| `created_at` | `int` | No | Timestamp when the message was created |
| `data` | `array` | No | The message data payload |
| `default` | `bool` | Yes |  |
| `description` | `string` | No | The description of the acquirer configuration. |
| `id` | `string` | Yes | A unique identifier assigned to each Merchant. |
| `name` | `string` | Yes | The official name of the Merchant as recognized in transactions and communications. |
| `networkTokens` | `array` | No | The Merchant's Network Token configuration. |
| `shortName` | `string` | No | A shorter version of the Merchant's name. |
| `type` | `string` | No | The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes) |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this Merchant was last updated. |
| `website` | `string` | Yes | The official website URL of the Merchant. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Payment()->list();
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Payment()->remove(["acquirer_id" => "acquirer_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PaymentEntity`

Create a new `PaymentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RelayEntity

```php
$relay = $client->Relay();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `string` | No | The unique identifier for the app to which the Relay belongs. |
| `authentication` | `mixed` | No | The type of authentication required for the Relay |
| `createdAt` | `int` | No | The exact time, in epoch milliseconds, when this Relay was created. |
| `destinationDomain` | `string` | No | The domain in front of which the Relay should be configured. |
| `encryptEmptyStrings` | `bool` | No | Whether or not empty strings should be encrypted. |
| `evervaultDomain` | `string` | No | The Evervault managed domain to which requests to be relayed to the destination domain should be sent. |
| `id` | `string` | No | The unique identifier for the Relay. |
| `routes` | `array` | No | A collection of route configurations for the Relay. |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this Relay was updated. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Relay()->load(["id" => "relay_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Relay()->update([
  "id" => "relay_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RelayEntity`

Create a new `RelayEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ThreeDsSessionEntity

```php
$three_ds_session = $client->ThreeDsSession();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accessControlServer` | `array` | No | Details about the Access Control Server involved in the 3DS transaction. |
| `acquirer` | `array` | Yes | The acquirer of the payment. |
| `ares` | `array` | No | The details of the 3DS Authentication Response (ARes). |
| `authentication` | `array` | Yes | The details of the 3DS Authentication. |
| `card` | `array` | Yes | The card details. |
| `challenge` | `array` | Yes | Details about the 3DS challenge. |
| `createdAt` | `int` | Yes | The exact time, in epoch milliseconds, when this 3DS-Session was created. |
| `cres` | `mixed` | No | The details of the 3DS Challenge Response (CRes). |
| `cryptogram` | `string` | No | The 3DS cryptogram (also called Authentication Value). |
| `customer` | `array` | No | The details of the customer who initiated the transaction. |
| `directoryServer` | `array` | No | Details about the Directory Server involved in the 3DS transaction. |
| `eci` | `array` | No | The details of the Electronic Commerce Indicator. |
| `failureReason` | `string` | No | The reason for the 3DS Authentication failure. |
| `id` | `string` | Yes | A unique identifier assigned to each 3DS Authentication. |
| `initiator` | `array` | No | Details about the transaction initiation process. |
| `merchant` | `array` | Yes | The merchant details. |
| `nextAction` | `array` | Yes | The next action required to complete the 3DS Authentication. |
| `payment` | `array` | No | The payment details of the 3D Secure Authentication. |
| `preferredVersions` | `array` | No | A prioritized list of preferred 3D Secure versions. |
| `rreq` | `mixed` | No | The result of the 3DS authentication when a challenge has occurred. |
| `status` | `string` | Yes | The status of the 3DS Authentication. |
| `threeDSServer` | `array` | No | Details about the 3DS Server involved in the 3DS transaction. |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this 3DS-Session was last updated. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->ThreeDsSession()->create([
  "acquirer" => null, // array
  "authentication" => null, // array
  "card" => null, // array
  "challenge" => null, // array
  "createdAt" => null, // int
  "id" => null, // string
  "merchant" => null, // array
  "nextAction" => null, // array
  "status" => null, // string
  "version" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ThreeDsSession()->load(["3ds_session_id" => "3ds_session_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ThreeDsSessionEntity`

Create a new `ThreeDsSessionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WebhookEntity

```php
$webhook = $client->Webhook();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `int` | No | The exact time, in epoch milliseconds, when this Webhook Endpoint was created. |
| `events` | `array` | Yes | A list of Events that the Webhook Endpoint should subscribe to. |
| `id` | `string` | No | A unique identifier representing a specific Webhook Endpoint. |
| `updatedAt` | `mixed` | No | The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated. |
| `url` | `string` | Yes | The URL of the Webhook Endpoint. |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `createdAt` | - | - | - |
| `events` | Yes | - | - |
| `id` | - | - | - |
| `updatedAt` | - | - | - |
| `url` | Yes | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Webhook()->create([
  "events" => null, // array
  "url" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Webhook()->list();
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Webhook()->remove(["webhook_endpoint_id" => "webhook_endpoint_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WebhookEntity`

Create a new `WebhookEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WebhookEndpointEntity

```php
$webhook_endpoint = $client->WebhookEndpoint();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `int` | No | The exact time, in epoch milliseconds, when this Webhook Endpoint was created. |
| `events` | `array` | No | A list of Events that the Webhook Endpoint is subscribed to. |
| `id` | `string` | No | A unique identifier representing a specific Webhook Endpoint. |
| `updatedAt` | `mixed` | No | The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated. |
| `url` | `string` | No | The URL of the Webhook Endpoint. |

### Field Usage by Operation

| Field | load | update |
| --- | --- | --- |
| `createdAt` | - | - |
| `events` | - | Yes |
| `id` | - | - |
| `updatedAt` | - | - |
| `url` | - | - |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->WebhookEndpoint()->load(["id" => "webhook_endpoint_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->WebhookEndpoint()->update([
  "id" => "webhook_endpoint_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WebhookEndpointEntity`

Create a new `WebhookEndpointEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new EvervaultSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

