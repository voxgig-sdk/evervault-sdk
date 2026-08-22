# Evervault Python SDK



The Python SDK for the Evervault API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Acquirer()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/evervault-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from evervault_sdk import EvervaultSDK

client = EvervaultSDK({
    "apikey": os.environ.get("EVERVAULT_APIKEY"),
})
```

### 3. Load a cardart

CardArt is nested under network_token, so provide the `network_token_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    cardart = client.CardArt().load({"network_token_id": "example_network_token_id"})
    print(cardart)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.Acquirer().create({"configurations": [], "default": True, "id": "example_id", "name": "example_name"})

# Update — the created record's id is a plain dict key
client.Acquirer().update({"id": created.data_get()["id"], "configurations": [], "default": True})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    merchant = client.Merchant().load({"id": "example_id"})
    print(merchant)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = EvervaultSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
merchant = client.Merchant().load({"id": "test01"})
# merchant contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = EvervaultSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### EvervaultSDK

```python
from evervault_sdk import EvervaultSDK

client = EvervaultSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = EvervaultSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### EvervaultSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Acquirer

| Field | Description |
| --- | --- |
| `configurations` | The acquirer configuration settings. |
| `default` | Specifies whether this Acquirer is the default. |
| `description` | The description of the acquirer configuration. |
| `id` | The unique identifier of the acquirer configuration. |
| `name` | The name of the acquirer configuration. |

Operations: Create, Load, Update.

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
| `card` | The card details. |
| `cardholder` | Details about the cardholder that the name verification (ANI) is for. |
| `expiry` |  |
| `extensions` | The extensions to the card insight request. |
| `month` | The card expiry month, in MM format (e.g. |
| `number` | The card number. |
| `year` | The card expiry year, in YY format (e.g. |

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
| `app` | The unique identifier for the app to which the Relay belongs. |
| `authentication` | The type of authentication required for the Relay |
| `createdAt` | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `destinationDomain` | The domain in front of which you would like to configure a Relay |
| `encryptEmptyStrings` | Whether or not empty strings should be encrypted. |
| `evervaultDomain` | The Evervault managed domain to which requests to be relayed to the destination domain should be sent. |
| `id` | The unique identifier for the custom domain. |
| `phoneNumber` |  |
| `relay` | The ID of the Relay with which this custom domain is associated. |
| `routes` | A collection of route configurations for the Relay. |
| `status` | The status of the domains DNS verification. |
| `token` | The encrypted data to be inspected. |
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

Operations: Create, Load, Update.

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
| `updateType` | The type of update to simulate. |
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
| `applePay` | The Merchant's Apple Pay configuration. |
| `business` | The business details of the Merchant. |
| `categoryCode` | The 4-digit Merchant Category Code (MCC). |
| `configurations` | The acquirer configuration settings. |
| `createdAt` | The exact time, in epoch milliseconds, when this Merchant was created. |
| `created_at` | Timestamp when the message was created |
| `data` | The message data payload |
| `default` |  |
| `description` | The description of the acquirer configuration. |
| `id` | A unique identifier assigned to each Merchant. |
| `name` | The official name of the Merchant as recognized in transactions and communications. |
| `networkTokens` | The Merchant's Network Token configuration. |
| `shortName` | A shorter version of the Merchant's name. |
| `type` | The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes) |
| `updatedAt` | The exact time, in epoch milliseconds, when this Merchant was last updated. |
| `website` | The official website URL of the Merchant. |

Operations: List, Remove.

API path: `/payments/merchants`

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

Operations: Load, Update.

API path: `/relays/{id}`

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
| `createdAt` | The exact time, in epoch milliseconds, when this Webhook Endpoint was created. |
| `events` | A list of Events that the Webhook Endpoint should subscribe to. |
| `id` | A unique identifier representing a specific Webhook Endpoint. |
| `updatedAt` | The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated. |
| `url` | The URL of the Webhook Endpoint. |

Operations: Create, List, Remove.

API path: `/webhook-endpoints`

#### WebhookEndpoint

| Field | Description |
| --- | --- |
| `createdAt` | The exact time, in epoch milliseconds, when this Webhook Endpoint was created. |
| `events` | A list of Events that the Webhook Endpoint is subscribed to. |
| `id` | A unique identifier representing a specific Webhook Endpoint. |
| `updatedAt` | The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated. |
| `url` | The URL of the Webhook Endpoint. |

Operations: Load, Update.

API path: `/webhook-endpoints/{webhook_endpoint_id}`



## Entities


### Acquirer

Create an instance: `acquirer = client.Acquirer()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configurations` | `list` | The acquirer configuration settings. |
| `default` | `bool` | Specifies whether this Acquirer is the default. |
| `description` | `str` | The description of the acquirer configuration. |
| `id` | `str` | The unique identifier of the acquirer configuration. |
| `name` | `str` | The name of the acquirer configuration. |

#### Example: Load

```python
acquirer = client.Acquirer().load({"id": "acquirer_id"})
```

#### Example: Create

```python
acquirer = client.Acquirer().create({
    "configurations": [],  # list
    "default": True,  # bool
    "id": "example_id",  # str
    "name": "example_name",  # str
})
```


### BinLookup

Create an instance: `bin_lookup = client.BinLookup()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `number` | `str` | The card number for which the BIN lookup is being requested. |

#### Example: Create

```python
bin_lookup = client.BinLookup().create({
    "number": "example_number",  # str
})
```


### Card

Create an instance: `card = client.Card()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `dict` | Details about the cardholder's address that the address verification (AVS) is for. |
| `card` | `dict` | The card details. |
| `cardholder` | `dict` | Details about the cardholder that the name verification (ANI) is for. |
| `expiry` | `dict` |  |
| `extensions` | `list` | The extensions to the card insight request. |
| `month` | `str` | The card expiry month, in MM format (e.g. |
| `number` | `str` | The card number. |
| `year` | `str` | The card expiry year, in YY format (e.g. |

#### Example: Load

```python
card = client.Card().load({"id": "card_id"})
```

#### Example: Create

```python
card = client.Card().create({
    "address": {},  # dict
    "card": {},  # dict
    "expiry": {},  # dict
    "month": "example_month",  # str
    "number": "example_number",  # str
    "year": "example_year",  # str
})
```


### CardArt

Create an instance: `card_art = client.CardArt()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `str` | The base64-encoded image data of the card art. |
| `height` | `int` | The height of the card art image in pixels. |
| `type` | `str` | The MIME type of the card art image. |
| `width` | `int` | The width of the card art image in pixels. |

#### Example: Load

```python
card_art = client.CardArt().load({"network_token_id": "network_token_id"})
```


### ClientSideToken

Create an instance: `client_side_token = client.ClientSideToken()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `str` | The action that the token should permit |
| `expiry` | `int` | The expiry of the token in milliseconds format. |
| `payload` | `dict` | The payload that the token must be used with |

#### Example: Create

```python
client_side_token = client.ClientSideToken().create({
    "action": "example_action",  # str
})
```


### Core

Create an instance: `core = client.Core()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `str` | The unique identifier for the app to which the Relay belongs. |
| `authentication` | `str | None` | The type of authentication required for the Relay |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `str` | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `destinationDomain` | `str` | The domain in front of which you would like to configure a Relay |
| `encryptEmptyStrings` | `bool` | Whether or not empty strings should be encrypted. |
| `evervaultDomain` | `str` | The Evervault managed domain to which requests to be relayed to the destination domain should be sent. |
| `id` | `str` | The unique identifier for the custom domain. |
| `phoneNumber` | `str` |  |
| `relay` | `str` | The ID of the Relay with which this custom domain is associated. |
| `routes` | `list` | A collection of route configurations for the Relay. |
| `status` | `str` | The status of the domains DNS verification. |
| `token` | `str` | The encrypted data to be inspected. |
| `updatedAt` | `int` | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `str` | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

#### Example: List

```python
cores = client.Core().list()
```

#### Example: Create

```python
core = client.Core().create({
    "destinationDomain": "example_destinationDomain",  # str
    "routes": [],  # list
    "token": "example_token",  # str
})
```


### CustomDomain

Create an instance: `custom_domain = client.CustomDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `str` | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `id` | `str` | The unique identifier for the custom domain. |
| `relay` | `str` | The ID of the Relay with which this custom domain is associated. |
| `status` | `str` | The status of the domains DNS verification. |
| `updatedAt` | `int` | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `str` | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

#### Example: Load

```python
custom_domain = client.CustomDomain().load({"id": "custom_domain_id", "relay_id": "relay_id"})
```

#### Example: Create

```python
custom_domain = client.CustomDomain().create({
    "relay_id": "example_relay_id",  # str
})
```


### FunctionRun

Create an instance: `function_run = client.FunctionRun()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `async` | `bool` | If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code. |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this Function execution was triggered. |
| `error` | `dict | None` | This field details any error that occurred during Function execution. |
| `id` | `str` | A unique identifier representing this specific Function execution instance. |
| `payload` | `dict` | The data payload that the Function will use during its execution. |
| `result` | `dict` | This field represents the output returned by the Function. |
| `status` | `str` | The outcome of the Function execution. |

#### Example: Create

```python
function_run = client.FunctionRun().create({
    "function_name": "example_function_name",  # str
    "payload": {},  # dict
})
```


### Merchant

Create an instance: `merchant = client.Merchant()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `applePay` | `dict` | The Merchant's Apple Pay configuration. |
| `business` | `dict` | The business details of the Merchant. |
| `categoryCode` | `str` | The 4-digit Merchant Category Code (MCC). |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this Merchant was created. |
| `id` | `str` | A unique identifier assigned to each Merchant. |
| `name` | `str` | The official name of the Merchant as recognized in transactions and communications. |
| `networkTokens` | `dict` | The Merchant's Network Token configuration. |
| `shortName` | `str` | A shorter version of the Merchant's name. |
| `updatedAt` | `int` | The exact time, in epoch milliseconds, when this Merchant was last updated. |
| `website` | `str` | The official website URL of the Merchant. |

#### Example: Load

```python
merchant = client.Merchant().load({"id": "merchant_id"})
```

#### Example: Create

```python
merchant = client.Merchant().create({
    "createdAt": 1,  # int
    "id": "example_id",  # str
    "name": "example_name",  # str
    "website": "example_website",  # str
})
```


### NetworkToken

Create an instance: `network_token = client.NetworkToken()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `card` | `dict` | The details of the underlying encrypted card. |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this Network Token was created. |
| `expiry` | `dict` | The expiry details of the Network Token. |
| `id` | `str` | A unique identifier representing a specific Network Token. |
| `merchant` | `str` | The unique identifier of the Merchant associated with this Network Token. |
| `number` | `str` | The unique number of the Network Token. |
| `paymentAccountReference` | `str` | The unique identifier of the Payment Account associated with this Network Token. |
| `status` | `str` | The status of the Network Token. |
| `tokenRequestorIdentifier` | `str` | The identifier of the Token Requestor (TRID) that requested the Network Token. |
| `tokenServiceProvider` | `str` | The Token Service Provider (TSP) that issued the Network Token. |
| `updateType` | `str` | The type of update to simulate. |
| `updatedAt` | `int` | The exact time, in epoch milliseconds, when this Network Token was last updated. |

#### Example: Load

```python
network_token = client.NetworkToken().load({"id": "network_token_id"})
```

#### Example: Create

```python
network_token = client.NetworkToken().create({
    "card": {},  # dict
    "createdAt": 1,  # int
    "expiry": {},  # dict
    "id": "example_id",  # str
    "merchant": "example_merchant",  # str
    "number": "example_number",  # str
    "status": "example_status",  # str
    "tokenRequestorIdentifier": "example_tokenRequestorIdentifier",  # str
    "tokenServiceProvider": "example_tokenServiceProvider",  # str
})
```


### NetworkTokenCryptogram

Create an instance: `network_token_cryptogram = client.NetworkTokenCryptogram()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `int` |  |
| `cryptogram` | `str` |  |
| `id` | `str` |  |

#### Example: Create

```python
network_token_cryptogram = client.NetworkTokenCryptogram().create({
    "id": "example_id",  # str
})
```


### Payment

Create an instance: `payment = client.Payment()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `applePay` | `dict` | The Merchant's Apple Pay configuration. |
| `business` | `dict` | The business details of the Merchant. |
| `categoryCode` | `str` | The 4-digit Merchant Category Code (MCC). |
| `configurations` | `list` | The acquirer configuration settings. |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this Merchant was created. |
| `created_at` | `int` | Timestamp when the message was created |
| `data` | `dict` | The message data payload |
| `default` | `bool` |  |
| `description` | `str` | The description of the acquirer configuration. |
| `id` | `str` | A unique identifier assigned to each Merchant. |
| `name` | `str` | The official name of the Merchant as recognized in transactions and communications. |
| `networkTokens` | `dict` | The Merchant's Network Token configuration. |
| `shortName` | `str` | A shorter version of the Merchant's name. |
| `type` | `str` | The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes) |
| `updatedAt` | `int` | The exact time, in epoch milliseconds, when this Merchant was last updated. |
| `website` | `str` | The official website URL of the Merchant. |

#### Example: List

```python
payments = client.Payment().list({"3ds_session_id": "example"})
```


### Relay

Create an instance: `relay = client.Relay()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `str` | The unique identifier for the app to which the Relay belongs. |
| `authentication` | `str | None` | The type of authentication required for the Relay |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this Relay was created. |
| `destinationDomain` | `str` | The domain in front of which the Relay should be configured. |
| `encryptEmptyStrings` | `bool` | Whether or not empty strings should be encrypted. |
| `evervaultDomain` | `str` | The Evervault managed domain to which requests to be relayed to the destination domain should be sent. |
| `id` | `str` | The unique identifier for the Relay. |
| `routes` | `list` | A collection of route configurations for the Relay. |
| `updatedAt` | `int` | The exact time, in epoch milliseconds, when this Relay was updated. |

#### Example: Load

```python
relay = client.Relay().load({"id": "relay_id"})
```


### ThreeDsSession

Create an instance: `three_ds_session = client.ThreeDsSession()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accessControlServer` | `dict` | Details about the Access Control Server involved in the 3DS transaction. |
| `acquirer` | `dict` | The acquirer of the payment. |
| `ares` | `dict` | The details of the 3DS Authentication Response (ARes). |
| `authentication` | `dict` | The details of the 3DS Authentication. |
| `card` | `dict` | The card details. |
| `challenge` | `dict` | Details about the 3DS challenge. |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this 3DS-Session was created. |
| `cres` | `None | dict` | The details of the 3DS Challenge Response (CRes). |
| `cryptogram` | `str` | The 3DS cryptogram (also called Authentication Value). |
| `customer` | `dict` | The details of the customer who initiated the transaction. |
| `directoryServer` | `dict` | Details about the Directory Server involved in the 3DS transaction. |
| `eci` | `dict` | The details of the Electronic Commerce Indicator. |
| `failureReason` | `str` | The reason for the 3DS Authentication failure. |
| `id` | `str` | A unique identifier assigned to each 3DS Authentication. |
| `initiator` | `dict` | Details about the transaction initiation process. |
| `merchant` | `dict` | The merchant details. |
| `nextAction` | `dict` | The next action required to complete the 3DS Authentication. |
| `payment` | `dict` | The payment details of the 3D Secure Authentication. |
| `preferredVersions` | `list` | A prioritized list of preferred 3D Secure versions. |
| `rreq` | `None | dict` | The result of the 3DS authentication when a challenge has occurred. |
| `status` | `str` | The status of the 3DS Authentication. |
| `threeDSServer` | `dict` | Details about the 3DS Server involved in the 3DS transaction. |
| `updatedAt` | `int` | The exact time, in epoch milliseconds, when this 3DS-Session was last updated. |
| `version` | `str` | The 3D Secure version used to authenticate the session. |

#### Example: Load

```python
three_ds_session = client.ThreeDsSession().load({"3ds_session_id": "3ds_session_id"})
```

#### Example: Create

```python
three_ds_session = client.ThreeDsSession().create({
    "acquirer": {},  # dict
    "authentication": {},  # dict
    "card": {},  # dict
    "challenge": {},  # dict
    "createdAt": 1,  # int
    "id": "example_id",  # str
    "merchant": {},  # dict
    "nextAction": {},  # dict
    "status": "example_status",  # str
    "version": "example_version",  # str
})
```


### Webhook

Create an instance: `webhook = client.Webhook()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this Webhook Endpoint was created. |
| `events` | `list` | A list of Events that the Webhook Endpoint should subscribe to. |
| `id` | `str` | A unique identifier representing a specific Webhook Endpoint. |
| `updatedAt` | `int | None` | The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated. |
| `url` | `str` | The URL of the Webhook Endpoint. |

#### Example: List

```python
webhooks = client.Webhook().list()
```

#### Example: Create

```python
webhook = client.Webhook().create({
    "events": [],  # list
    "url": "example_url",  # str
})
```


### WebhookEndpoint

Create an instance: `webhook_endpoint = client.WebhookEndpoint()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `int` | The exact time, in epoch milliseconds, when this Webhook Endpoint was created. |
| `events` | `list` | A list of Events that the Webhook Endpoint is subscribed to. |
| `id` | `str` | A unique identifier representing a specific Webhook Endpoint. |
| `updatedAt` | `int | None` | The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated. |
| `url` | `str` | The URL of the Webhook Endpoint. |

#### Example: Load

```python
webhook_endpoint = client.WebhookEndpoint().load({"id": "webhook_endpoint_id"})
```


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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── evervault_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`evervault_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
merchant = client.Merchant()
merchant.load({"id": "example_id"})

# merchant.data_get() now returns the merchant data from the last load
# merchant.match_get() returns the last match criteria
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
