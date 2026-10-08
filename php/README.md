# Evervault PHP SDK



The PHP SDK for the Evervault API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Acquirer()` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/evervault-sdk/tags)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/evervault-sdk
composer config repositories.evervault-sdk path ./evervault-sdk/php
composer require voxgig-sdk/evervault-sdk:@dev
```


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

### 2. List acquirer records

```php
try {
    // list() returns entity instances; data_get() reads each record.
    $acquirers = $client->Acquirer()->list();
    foreach ($acquirers as $record) {
        $item = $record->data_get();
        echo $item["id"] . " " . $item["configurations"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a cardart

CardArt is nested under network_token, so provide the `network_token_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the CardArt record (throws on error).
    $cardart = $client->CardArt()->load(["network_token_id" => "example_network_token_id"]);
    print_r($cardart->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Acquirer record.
$created = $client->Acquirer()->create(["configurations" => [], "default" => true, "id" => "example_id", "name" => "example_name"]);

// Update — index the record via data_get() ($created->data_get()["id"]).
$client->Acquirer()->update(["id" => $created->data_get()["id"], "configurations" => [], "default" => true]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $merchants = $client->Merchant()->list();
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

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$merchant = $client->Merchant()->list();
print_r(array_map(fn($item) => $item->data_get(), $merchant));
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
| `load` | `($reqmatch, $ctrl): mixed` | Load a single entity by match criteria, and return it. |
| `list` | `(?array $reqmatch = null, $ctrl): mixed` | List entities matching the criteria (call with no argument to list all), one per record. |
| `create` | `($reqdata, $ctrl): mixed` | Create a new entity, and return it. |
| `update` | `($reqdata, $ctrl): mixed` | Update an existing entity, and return it. |
| `remove` | `($reqmatch, $ctrl): mixed` | Remove an entity, and return it marked as deleted. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `array` of entities, one
per record; an entity's `data_get()` reads its record (an `array`). They
throw on error, so wrap calls in `try`/`catch` to handle failures.

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

Create an instance: `$acquirer = $client->Acquirer();`

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
| `configurations` | `array` | The acquirer configuration settings. |
| `default` | `bool` | Specifies whether this Acquirer is the default. |
| `description` | `string` | The description of the acquirer configuration. |
| `id` | `string` | The unique identifier of the acquirer configuration. |
| `name` | `string` | The name of the acquirer configuration. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Acquirer record (throws on error).
$acquirer = $client->Acquirer()->load(["id" => "acquirer_id"]);
```

#### Example: List

```php
// list() returns an array of Acquirer entities, one per record (throws on error).
$acquirers = $client->Acquirer()->list();
```

#### Example: Create

```php
$acquirer = $client->Acquirer()->create([
    "configurations" => null, // array
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
| `number` | `string` | The card number for which the BIN lookup is being requested. |

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
| `address` | `array` | Details about the cardholder's address that the address verification (AVS) is for. |
| `automaticUpdates` | `string` | The status of Card Account Updater on this card. |
| `bin` | `string` | The first 6 or 8 digits of the card number. |
| `brand` | `string` | The card brand associated with the payment card. |
| `card` | `array` | The card details. |
| `cardholder` | `array` | Details about the cardholder that the name verification (ANI) is for. |
| `country` | `string` | The country where the card was issued. |
| `createdAt` | `int` | The Unix timestamp of when the card was created. |
| `currency` | `string` | The currency of the card. |
| `expiry` | `array` | The expiry date of the card. |
| `extensions` | `array` | The extensions to the card insight request. |
| `funding` | `string` | The card funding type specifies the method by which transactions are financed. |
| `id` | `string` | The unique identifier for the card. |
| `issuer` | `string` | The name of the card issuer. |
| `lastFour` | `string` | The last 4 digits of the card number. |
| `number` | `string` | The Evervault encrypted card number. |
| `replacement` | `mixed` | The ID of the replacement card. |
| `segment` | `string` | The card segment indicates the primary market or usage category of the card. |
| `status` | `string` | The current status of the card. |
| `updatedAt` | `mixed` | The Unix timestamp of when the card was last updated. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Card record (throws on error).
$card = $client->Card()->load(["id" => "card_id"]);
```

#### Example: Create

```php
$card = $client->Card()->create([
    "address" => null, // array
    "bin" => null, // string
    "card" => null, // array
    "createdAt" => null, // int
    "expiry" => null, // array
    "lastFour" => null, // string
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
| `data` | `string` | The base64-encoded image data of the card art. |
| `height` | `int` | The height of the card art image in pixels. |
| `type` | `string` | The MIME type of the card art image. |
| `width` | `int` | The width of the card art image in pixels. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the CardArt record (throws on error).
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
| `action` | `string` | The action that the token should permit |
| `expiry` | `int` | The expiry of the token in milliseconds format. |
| `payload` | `array` | The payload that the token must be used with |

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
| `category` | `string` | The category or specific nature of the encrypted value. |
| `core_list` | `mixed` | A JSON value or file to be encrypted. |
| `cores` | `mixed` | A JSON value or file to be decrypted. |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `string` | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `encryptedAt` | `int` | The date and time when the value was encrypted. |
| `fingerprint` | `string` | A unique identifier for the encrypted value. |
| `id` | `string` | The unique identifier for the custom domain. |
| `metadata` | `mixed` | Further metadata about the encrypted value. |
| `phoneNumber` | `string` |  |
| `relay` | `string` | The ID of the Relay with which this custom domain is associated. |
| `role` | `string` | The data role of the encrypted value. |
| `status` | `string` | The status of the domains DNS verification. |
| `token` | `string` | The encrypted data to be inspected. |
| `type` | `string` | The type of the encrypted value. |
| `updatedAt` | `int` | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `string` | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

#### Example: List

```php
// list() returns an array of Core entities, one per record (throws on error).
$cores = $client->Core()->list(["relay_id" => "example"]);
```

#### Example: Create

```php
$core = $client->Core()->create([
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
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `string` | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `id` | `string` | The unique identifier for the custom domain. |
| `relay` | `string` | The ID of the Relay with which this custom domain is associated. |
| `status` | `string` | The status of the domains DNS verification. |
| `updatedAt` | `int` | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `string` | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the CustomDomain record (throws on error).
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
| `async` | `bool` | If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code. |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this Function execution was triggered. |
| `error` | `mixed` | This field details any error that occurred during Function execution. |
| `id` | `string` | A unique identifier representing this specific Function execution instance. |
| `payload` | `array` | The data payload that the Function will use during its execution. |
| `result` | `array` | This field represents the output returned by the Function. |
| `status` | `string` | The outcome of the Function execution. |

#### Example: Create

```php
$function_run = $client->FunctionRun()->create([
    "function_name" => null, // string
    "payload" => null, // array
]);
```


### Merchant

Create an instance: `$merchant = $client->Merchant();`

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
| `applePay` | `array` | The Merchant's Apple Pay configuration. |
| `business` | `array` | The business details of the Merchant. |
| `categoryCode` | `string` | The 4-digit Merchant Category Code (MCC). |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this Merchant was created. |
| `id` | `string` | A unique identifier assigned to each Merchant. |
| `name` | `string` | The official name of the Merchant as recognized in transactions and communications. |
| `networkTokens` | `array` | The Merchant's Network Token configuration. |
| `shortName` | `string` | A shorter version of the Merchant's name. |
| `updatedAt` | `int` | The exact time, in epoch milliseconds, when this Merchant was last updated. |
| `website` | `string` | The official website URL of the Merchant. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Merchant record (throws on error).
$merchant = $client->Merchant()->load(["id" => "merchant_id"]);
```

#### Example: List

```php
// list() returns an array of Merchant entities, one per record (throws on error).
$merchants = $client->Merchant()->list();
```

#### Example: Create

```php
$merchant = $client->Merchant()->create([
    "createdAt" => null, // int
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
| `card` | `array` | The details of the underlying encrypted card. |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this Network Token was created. |
| `expiry` | `array` | The expiry details of the Network Token. |
| `id` | `string` | A unique identifier representing a specific Network Token. |
| `merchant` | `string` | The unique identifier of the Merchant associated with this Network Token. |
| `number` | `string` | The unique number of the Network Token. |
| `paymentAccountReference` | `string` | The unique identifier of the Payment Account associated with this Network Token. |
| `status` | `string` | The status of the Network Token. |
| `tokenRequestorIdentifier` | `string` | The identifier of the Token Requestor (TRID) that requested the Network Token. |
| `tokenServiceProvider` | `string` | The Token Service Provider (TSP) that issued the Network Token. |
| `updatedAt` | `int` | The exact time, in epoch milliseconds, when this Network Token was last updated. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the NetworkToken record (throws on error).
$network_token = $client->NetworkToken()->load(["id" => "network_token_id"]);
```

#### Example: Create

```php
$network_token = $client->NetworkToken()->create([
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


### NetworkTokenCryptogram

Create an instance: `$network_token_cryptogram = $client->NetworkTokenCryptogram();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `int` |  |
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
| `created_at` | `int` | Timestamp when the message was created |
| `data` | `array` | The message data payload |
| `type` | `string` | The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes) |

#### Example: List

```php
// list() returns an array of Payment entities, one per record (throws on error).
$payments = $client->Payment()->list(["3ds_session_id" => "example"]);
```


### Relay

Create an instance: `$relay = $client->Relay();`

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
| `authentication` | `mixed` | The type of authentication required for the Relay |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this Relay was created. |
| `destinationDomain` | `string` | The domain in front of which the Relay should be configured. |
| `encryptEmptyStrings` | `bool` | Whether or not empty strings should be encrypted. |
| `evervaultDomain` | `string` | The Evervault managed domain to which requests to be relayed to the destination domain should be sent. |
| `id` | `string` | The unique identifier for the Relay. |
| `routes` | `array` | A collection of route configurations for the Relay. |
| `updatedAt` | `int` | The exact time, in epoch milliseconds, when this Relay was updated. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Relay record (throws on error).
$relay = $client->Relay()->load(["id" => "relay_id"]);
```

#### Example: List

```php
// list() returns an array of Relay entities, one per record (throws on error).
$relays = $client->Relay()->list();
```

#### Example: Create

```php
$relay = $client->Relay()->create([
]);
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
| `accessControlServer` | `array` | Details about the Access Control Server involved in the 3DS transaction. |
| `acquirer` | `array` | The acquirer of the payment. |
| `ares` | `array` | The details of the 3DS Authentication Response (ARes). |
| `authentication` | `array` | The details of the 3DS Authentication. |
| `card` | `array` | The card details. |
| `challenge` | `array` | Details about the 3DS challenge. |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this 3DS-Session was created. |
| `cres` | `mixed` | The details of the 3DS Challenge Response (CRes). |
| `cryptogram` | `string` | The 3DS cryptogram (also called Authentication Value). |
| `customer` | `array` | The details of the customer who initiated the transaction. |
| `directoryServer` | `array` | Details about the Directory Server involved in the 3DS transaction. |
| `eci` | `array` | The details of the Electronic Commerce Indicator. |
| `failureReason` | `string` | The reason for the 3DS Authentication failure. |
| `id` | `string` | A unique identifier assigned to each 3DS Authentication. |
| `initiator` | `array` | Details about the transaction initiation process. |
| `merchant` | `array` | The merchant details. |
| `nextAction` | `array` | The next action required to complete the 3DS Authentication. |
| `payment` | `array` | The payment details of the 3D Secure Authentication. |
| `preferredVersions` | `array` | A prioritized list of preferred 3D Secure versions. |
| `rreq` | `mixed` | The result of the 3DS authentication when a challenge has occurred. |
| `status` | `string` | The status of the 3DS Authentication. |
| `threeDSServer` | `array` | Details about the 3DS Server involved in the 3DS transaction. |
| `updatedAt` | `int` | The exact time, in epoch milliseconds, when this 3DS-Session was last updated. |
| `version` | `string` | The 3D Secure version used to authenticate the session. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ThreeDsSession record (throws on error).
$three_ds_session = $client->ThreeDsSession()->load(["3ds_session_id" => "3ds_session_id"]);
```

#### Example: Create

```php
$three_ds_session = $client->ThreeDsSession()->create([
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


### Webhook

Create an instance: `$webhook = $client->Webhook();`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### WebhookEndpoint

Create an instance: `$webhook_endpoint = $client->WebhookEndpoint();`

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
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this Webhook Endpoint was created. |
| `events` | `array` | A list of Events that the Webhook Endpoint is subscribed to. |
| `id` | `string` | A unique identifier representing a specific Webhook Endpoint. |
| `updatedAt` | `mixed` | The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated. |
| `url` | `string` | The URL of the Webhook Endpoint. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the WebhookEndpoint record (throws on error).
$webhook_endpoint = $client->WebhookEndpoint()->load(["id" => "webhook_endpoint_id"]);
```

#### Example: List

```php
// list() returns an array of WebhookEndpoint entities, one per record (throws on error).
$webhook_endpoints = $client->WebhookEndpoint()->list();
```

#### Example: Create

```php
$webhook_endpoint = $client->WebhookEndpoint()->create([
]);
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

Features are the extension mechanism. A feature is a PHP class
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
├── schema.php                     -- Generated option + entity specs
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$merchant = $client->Merchant();
$merchant->list();

// $merchant->data_get() now returns the merchant data from the last list
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
