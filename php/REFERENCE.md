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
| `configurations` | `array` | Yes |  |
| `default` | `bool` | Yes |  |
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
| `number` | `string` | Yes |  |

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
| `address` | `array` | Yes |  |
| `card` | `array` | Yes |  |
| `cardholder` | `array` | No |  |
| `expiry` | `array` | Yes |  |
| `extensions` | `array` | No |  |
| `month` | `string` | Yes |  |
| `number` | `string` | Yes |  |
| `year` | `string` | Yes |  |

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
| `data` | `string` | Yes |  |
| `height` | `int` | Yes |  |
| `type` | `string` | Yes |  |
| `width` | `int` | Yes |  |

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
| `action` | `string` | Yes |  |
| `expiry` | `int` | No |  |
| `payload` | `array` | No |  |

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
| `app` | `string` | No |  |
| `authentication` | `mixed` | No |  |
| `createdAt` | `int` | No |  |
| `customDomain` | `string` | No |  |
| `destinationDomain` | `string` | Yes |  |
| `encryptEmptyStrings` | `bool` | No |  |
| `evervaultDomain` | `string` | No |  |
| `id` | `string` | No |  |
| `phoneNumber` | `string` | No |  |
| `relay` | `string` | No |  |
| `routes` | `array` | Yes |  |
| `status` | `string` | No |  |
| `token` | `string` | Yes |  |
| `updatedAt` | `int` | No |  |
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
| `createdAt` | `int` | No |  |
| `customDomain` | `string` | No |  |
| `id` | `string` | No |  |
| `relay` | `string` | No |  |
| `status` | `string` | No |  |
| `updatedAt` | `int` | No |  |
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
| `async` | `bool` | No |  |
| `createdAt` | `int` | No |  |
| `error` | `mixed` | No |  |
| `id` | `string` | No |  |
| `payload` | `array` | Yes |  |
| `result` | `array` | No |  |
| `status` | `string` | No |  |

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
| `applePay` | `array` | No |  |
| `business` | `array` | No |  |
| `categoryCode` | `string` | No |  |
| `createdAt` | `int` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `networkTokens` | `array` | No |  |
| `shortName` | `string` | No |  |
| `updatedAt` | `int` | No |  |
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
| `card` | `array` | Yes |  |
| `createdAt` | `int` | Yes |  |
| `expiry` | `array` | Yes |  |
| `id` | `string` | Yes |  |
| `merchant` | `string` | Yes |  |
| `number` | `string` | Yes |  |
| `paymentAccountReference` | `string` | No |  |
| `status` | `string` | Yes |  |
| `tokenRequestorIdentifier` | `string` | Yes |  |
| `tokenServiceProvider` | `string` | Yes |  |
| `updateType` | `string` | No |  |
| `updatedAt` | `int` | No |  |

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
| `applePay` | `array` | No |  |
| `business` | `array` | No |  |
| `categoryCode` | `string` | No |  |
| `configurations` | `array` | Yes |  |
| `createdAt` | `int` | Yes |  |
| `created_at` | `int` | No |  |
| `data` | `array` | No |  |
| `default` | `bool` | Yes |  |
| `description` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `networkTokens` | `array` | No |  |
| `shortName` | `string` | No |  |
| `type` | `string` | No |  |
| `updatedAt` | `int` | No |  |
| `website` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Payment()->list();
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Payment()->remove();
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
| `app` | `string` | No |  |
| `authentication` | `mixed` | No |  |
| `createdAt` | `int` | No |  |
| `destinationDomain` | `string` | No |  |
| `encryptEmptyStrings` | `bool` | No |  |
| `evervaultDomain` | `string` | No |  |
| `id` | `string` | No |  |
| `routes` | `array` | No |  |
| `updatedAt` | `int` | No |  |

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
| `accessControlServer` | `array` | No |  |
| `acquirer` | `array` | Yes |  |
| `ares` | `array` | No |  |
| `authentication` | `array` | Yes |  |
| `card` | `array` | Yes |  |
| `challenge` | `array` | Yes |  |
| `createdAt` | `int` | Yes |  |
| `cres` | `mixed` | No |  |
| `cryptogram` | `string` | No |  |
| `customer` | `array` | No |  |
| `directoryServer` | `array` | No |  |
| `eci` | `array` | No |  |
| `failureReason` | `string` | No |  |
| `id` | `string` | Yes |  |
| `initiator` | `array` | No |  |
| `merchant` | `array` | Yes |  |
| `nextAction` | `array` | Yes |  |
| `payment` | `array` | No |  |
| `preferredVersions` | `array` | No |  |
| `rreq` | `mixed` | No |  |
| `status` | `string` | Yes |  |
| `threeDSServer` | `array` | No |  |
| `updatedAt` | `int` | No |  |
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
| `createdAt` | `int` | No |  |
| `events` | `array` | Yes |  |
| `id` | `string` | No |  |
| `updatedAt` | `mixed` | No |  |
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
| `createdAt` | `int` | No |  |
| `events` | `array` | No |  |
| `id` | `string` | No |  |
| `updatedAt` | `mixed` | No |  |
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

