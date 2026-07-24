# Evervault PHP SDK



The PHP SDK for the Evervault API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Acquirer()` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/evervault-sdk/releases](https://github.com/voxgig-sdk/evervault-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'evervault_sdk.php';

$client = new EvervaultSDK([
    "apikey" => getenv("EVERVAULT_APIKEY"),
]);
```

### 3. Load a cardart

CardArt is nested under network_token, so provide the `network_token_id`.

```php
try {
    // load() returns the bare CardArt record (throws on error).
    $cardart = $client->CardArt()->load(["network_token_id" => "example_network_token_id"]);
    print_r($cardart);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the bare created Acquirer record.
$created = $client->Acquirer()->create(["configuration" => [], "default" => true, "id" => "example_id", "name" => "example_name"]);

// Update — index the bare record directly ($created["id"]).
$client->Acquirer()->update(["id" => $created["id"]]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $merchant = $client->Merchant()->load(["id" => "example_id"]);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = EvervaultSDK::test([
    "entity" => ["merchant" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the bare mock record (throws on error).
$merchant = $client->Merchant()->load(["id" => "test01"]);
print_r($merchant);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new EvervaultSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
EVERVAULT_TEST_LIVE=TRUE
EVERVAULT_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### EvervaultSDK

```php
require_once 'evervault_sdk.php';
$client = new EvervaultSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = EvervaultSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### EvervaultSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Acquirer` | `($data): AcquirerEntity` | Create an Acquirer entity instance. |
| `BinLookup` | `($data): BinLookupEntity` | Create a BinLookup entity instance. |
| `Card` | `($data): CardEntity` | Create a Card entity instance. |
| `CardArt` | `($data): CardArtEntity` | Create a CardArt entity instance. |
| `ClientSideToken` | `($data): ClientSideTokenEntity` | Create a ClientSideToken entity instance. |
| `Core` | `($data): CoreEntity` | Create a Core entity instance. |
| `CustomDomain` | `($data): CustomDomainEntity` | Create a CustomDomain entity instance. |
| `FunctionRun` | `($data): FunctionRunEntity` | Create a FunctionRun entity instance. |
| `Merchant` | `($data): MerchantEntity` | Create a Merchant entity instance. |
| `NetworkToken` | `($data): NetworkTokenEntity` | Create a NetworkToken entity instance. |
| `NetworkTokenCryptogram` | `($data): NetworkTokenCryptogramEntity` | Create a NetworkTokenCryptogram entity instance. |
| `Payment` | `($data): PaymentEntity` | Create a Payment entity instance. |
| `Relay` | `($data): RelayEntity` | Create a Relay entity instance. |
| `ThreeDsSession` | `($data): ThreeDsSessionEntity` | Create a ThreeDsSession entity instance. |
| `Webhook` | `($data): WebhookEntity` | Create a Webhook entity instance. |
| `WebhookEndpoint` | `($data): WebhookEndpointEntity` | Create a WebhookEndpoint entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$acquirer = $client->Acquirer();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configuration` | `array` |  |
| `default` | `bool` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |

#### Example: Load

```php
// load() returns the bare Acquirer record (throws on error).
$acquirer = $client->Acquirer()->load(["id" => "acquirer_id"]);
```

#### Example: Create

```php
$acquirer = $client->Acquirer()->create([
    "configuration" => null, // array
    "default" => null, // bool
    "id" => null, // string
    "name" => null, // string
]);
```


### BinLookup

Create an instance: `$bin_lookup = $client->BinLookup();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `number` | `string` |  |

#### Example: Create

```php
$bin_lookup = $client->BinLookup()->create([
    "number" => null, // string
]);
```


### Card

Create an instance: `$card = $client->Card();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `array` |  |
| `automatic_update` | `string` |  |
| `bin` | `string` |  |
| `brand` | `string` |  |
| `card` | `array` |  |
| `cardholder` | `array` |  |
| `country` | `string` |  |
| `created_at` | `int` |  |
| `currency` | `string` |  |
| `expiry` | `array` |  |
| `extension` | `array` |  |
| `funding` | `string` |  |
| `id` | `string` |  |
| `issuer` | `string` |  |
| `last_four` | `string` |  |
| `number` | `string` |  |
| `replacement` | `mixed` |  |
| `segment` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `mixed` |  |

#### Example: Load

```php
// load() returns the bare Card record (throws on error).
$card = $client->Card()->load(["id" => "card_id"]);
```

#### Example: Create

```php
$card = $client->Card()->create([
    "address" => null, // array
    "bin" => null, // string
    "card" => null, // array
    "created_at" => null, // int
    "expiry" => null, // array
    "last_four" => null, // string
    "number" => null, // string
]);
```


### CardArt

Create an instance: `$card_art = $client->CardArt();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `string` |  |
| `height` | `int` |  |
| `type` | `string` |  |
| `width` | `int` |  |

#### Example: Load

```php
// load() returns the bare CardArt record (throws on error).
$card_art = $client->CardArt()->load(["network_token_id" => "network_token_id"]);
```


### ClientSideToken

Create an instance: `$client_side_token = $client->ClientSideToken();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `expiry` | `int` |  |
| `payload` | `array` |  |

#### Example: Create

```php
$client_side_token = $client->ClientSideToken()->create([
    "action" => null, // string
]);
```


### Core

Create an instance: `$core = $client->Core();`

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
| `authentication` | `mixed` |  |
| `category` | `string` |  |
| `created_at` | `int` |  |
| `custom_domain` | `string` |  |
| `destination_domain` | `string` |  |
| `encrypt_empty_string` | `bool` |  |
| `encrypted_at` | `int` |  |
| `evervault_domain` | `string` |  |
| `fingerprint` | `string` |  |
| `id` | `string` |  |
| `metadata` | `mixed` |  |
| `phone_number` | `string` |  |
| `relay` | `string` |  |
| `role` | `string` |  |
| `route` | `array` |  |
| `status` | `string` |  |
| `token` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `int` |  |
| `validation_record` | `string` |  |

#### Example: List

```php
// list() returns an array of Core records (throws on error).
$cores = $client->Core()->list();
```

#### Example: Create

```php
$core = $client->Core()->create([
    "destination_domain" => null, // string
    "route" => null, // array
    "token" => null, // string
]);
```


### CustomDomain

Create an instance: `$custom_domain = $client->CustomDomain();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `int` |  |
| `custom_domain` | `string` |  |
| `id` | `string` |  |
| `relay` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `int` |  |
| `validation_record` | `string` |  |

#### Example: Load

```php
// load() returns the bare CustomDomain record (throws on error).
$custom_domain = $client->CustomDomain()->load(["id" => "custom_domain_id", "relay_id" => "relay_id"]);
```

#### Example: Create

```php
$custom_domain = $client->CustomDomain()->create([
    "relay_id" => null, // string
]);
```


### FunctionRun

Create an instance: `$function_run = $client->FunctionRun();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `async` | `bool` |  |
| `created_at` | `int` |  |
| `error` | `mixed` |  |
| `id` | `string` |  |
| `payload` | `array` |  |
| `result` | `array` |  |
| `status` | `string` |  |

#### Example: Create

```php
$function_run = $client->FunctionRun()->create([
    "function_name" => null, // string
]);
```


### Merchant

Create an instance: `$merchant = $client->Merchant();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apple_pay` | `array` |  |
| `business` | `array` |  |
| `category_code` | `string` |  |
| `created_at` | `int` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `network_token` | `array` |  |
| `short_name` | `string` |  |
| `updated_at` | `int` |  |
| `website` | `string` |  |

#### Example: Load

```php
// load() returns the bare Merchant record (throws on error).
$merchant = $client->Merchant()->load(["id" => "merchant_id"]);
```

#### Example: Create

```php
$merchant = $client->Merchant()->create([
    "created_at" => null, // int
    "id" => null, // string
    "name" => null, // string
    "website" => null, // string
]);
```


### NetworkToken

Create an instance: `$network_token = $client->NetworkToken();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `card` | `array` |  |
| `created_at` | `int` |  |
| `expiry` | `array` |  |
| `id` | `string` |  |
| `merchant` | `string` |  |
| `number` | `string` |  |
| `payment_account_reference` | `string` |  |
| `status` | `string` |  |
| `token_requestor_identifier` | `string` |  |
| `token_service_provider` | `string` |  |
| `update_type` | `string` |  |
| `updated_at` | `int` |  |

#### Example: Load

```php
// load() returns the bare NetworkToken record (throws on error).
$network_token = $client->NetworkToken()->load(["id" => "network_token_id"]);
```

#### Example: Create

```php
$network_token = $client->NetworkToken()->create([
    "card" => null, // array
    "created_at" => null, // int
    "expiry" => null, // array
    "id" => null, // string
    "merchant" => null, // string
    "number" => null, // string
    "status" => null, // string
    "token_requestor_identifier" => null, // string
    "token_service_provider" => null, // string
]);
```


### NetworkTokenCryptogram

Create an instance: `$network_token_cryptogram = $client->NetworkTokenCryptogram();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `int` |  |
| `cryptogram` | `string` |  |
| `id` | `string` |  |

#### Example: Create

```php
$network_token_cryptogram = $client->NetworkTokenCryptogram()->create([
    "id" => null, // string
]);
```


### Payment

Create an instance: `$payment = $client->Payment();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apple_pay` | `array` |  |
| `business` | `array` |  |
| `category_code` | `string` |  |
| `configuration` | `array` |  |
| `created_at` | `int` |  |
| `data` | `array` |  |
| `default` | `bool` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `network_token` | `array` |  |
| `short_name` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `int` |  |
| `website` | `string` |  |

#### Example: List

```php
// list() returns an array of Payment records (throws on error).
$payments = $client->Payment()->list();
```


### Relay

Create an instance: `$relay = $client->Relay();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `string` |  |
| `authentication` | `mixed` |  |
| `created_at` | `int` |  |
| `destination_domain` | `string` |  |
| `encrypt_empty_string` | `bool` |  |
| `evervault_domain` | `string` |  |
| `id` | `string` |  |
| `route` | `array` |  |
| `updated_at` | `int` |  |

#### Example: Load

```php
// load() returns the bare Relay record (throws on error).
$relay = $client->Relay()->load(["id" => "relay_id"]);
```


### ThreeDsSession

Create an instance: `$three_ds_session = $client->ThreeDsSession();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_control_server` | `array` |  |
| `acquirer` | `array` |  |
| `are` | `array` |  |
| `authentication` | `array` |  |
| `card` | `array` |  |
| `challenge` | `array` |  |
| `cre` | `mixed` |  |
| `created_at` | `int` |  |
| `cryptogram` | `string` |  |
| `customer` | `array` |  |
| `directory_server` | `array` |  |
| `eci` | `array` |  |
| `failure_reason` | `string` |  |
| `id` | `string` |  |
| `initiator` | `array` |  |
| `merchant` | `array` |  |
| `next_action` | `array` |  |
| `payment` | `array` |  |
| `preferred_version` | `array` |  |
| `rreq` | `mixed` |  |
| `status` | `string` |  |
| `three_ds_server` | `array` |  |
| `updated_at` | `int` |  |
| `version` | `string` |  |

#### Example: Load

```php
// load() returns the bare ThreeDsSession record (throws on error).
$three_ds_session = $client->ThreeDsSession()->load(["3ds_session_id" => "3ds_session_id"]);
```

#### Example: Create

```php
$three_ds_session = $client->ThreeDsSession()->create([
    "acquirer" => null, // array
    "authentication" => null, // array
    "card" => null, // array
    "challenge" => null, // array
    "created_at" => null, // int
    "id" => null, // string
    "merchant" => null, // array
    "next_action" => null, // array
    "status" => null, // string
    "version" => null, // string
]);
```


### Webhook

Create an instance: `$webhook = $client->Webhook();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `int` |  |
| `event` | `array` |  |
| `id` | `string` |  |
| `updated_at` | `mixed` |  |
| `url` | `string` |  |

#### Example: List

```php
// list() returns an array of Webhook records (throws on error).
$webhooks = $client->Webhook()->list();
```

#### Example: Create

```php
$webhook = $client->Webhook()->create([
    "event" => null, // array
    "url" => null, // string
]);
```


### WebhookEndpoint

Create an instance: `$webhook_endpoint = $client->WebhookEndpoint();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `int` |  |
| `event` | `array` |  |
| `id` | `string` |  |
| `updated_at` | `mixed` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the bare WebhookEndpoint record (throws on error).
$webhook_endpoint = $client->WebhookEndpoint()->load(["id" => "webhook_endpoint_id"]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── evervault_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`evervault_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$merchant = $client->Merchant();
$merchant->load(["id" => "example_id"]);

// $merchant->data_get() now returns the merchant data from the last load
// $merchant->match_get() returns the last match criteria
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
