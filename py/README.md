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
`load()` returns the bare record (a `dict`) and raises on error.

```python
try:
    cardart = client.CardArt().load({"network_token_id": "example_network_token_id"})
    print(cardart)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the bare created record (a dict)
created = client.Acquirer().create({"configuration": [], "default": True, "id": "example_id", "name": "example_name"})

# Update — the created record's id is a plain dict key
client.Acquirer().update({"id": created["id"]})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    acquirer = client.Acquirer().load({"id": "example_id"})
    print(acquirer)
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

# Entity ops return the bare record and raise on error.
acquirer = client.Acquirer().load({"id": "test01"})
# acquirer contains the mock response record
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

Entity operations return the bare result data (a `dict` for single-entity
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
| `configuration` | `list` |  |
| `default` | `bool` |  |
| `description` | `str` |  |
| `id` | `str` |  |
| `name` | `str` |  |

#### Example: Load

```python
acquirer = client.Acquirer().load({"id": "acquirer_id"})
```

#### Example: Create

```python
acquirer = client.Acquirer().create({
    "configuration": [],  # list
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
| `number` | `str` |  |

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
| `address` | `dict` |  |
| `automatic_update` | `str` |  |
| `bin` | `str` |  |
| `brand` | `str` |  |
| `card` | `dict` |  |
| `cardholder` | `dict` |  |
| `country` | `str` |  |
| `created_at` | `int` |  |
| `currency` | `str` |  |
| `expiry` | `dict` |  |
| `extension` | `list` |  |
| `funding` | `str` |  |
| `id` | `str` |  |
| `issuer` | `str` |  |
| `last_four` | `str` |  |
| `number` | `str` |  |
| `replacement` | `Any` |  |
| `segment` | `str` |  |
| `status` | `str` |  |
| `updated_at` | `Any` |  |

#### Example: Load

```python
card = client.Card().load({"id": "card_id"})
```

#### Example: Create

```python
card = client.Card().create({
    "address": {},  # dict
    "bin": "example_bin",  # str
    "card": {},  # dict
    "created_at": 1,  # int
    "expiry": {},  # dict
    "last_four": "example_last_four",  # str
    "number": "example_number",  # str
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
| `data` | `str` |  |
| `height` | `int` |  |
| `type` | `str` |  |
| `width` | `int` |  |

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
| `action` | `str` |  |
| `expiry` | `int` |  |
| `payload` | `dict` |  |

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
| `app` | `str` |  |
| `authentication` | `Any` |  |
| `category` | `str` |  |
| `created_at` | `int` |  |
| `custom_domain` | `str` |  |
| `destination_domain` | `str` |  |
| `encrypt_empty_string` | `bool` |  |
| `encrypted_at` | `int` |  |
| `evervault_domain` | `str` |  |
| `fingerprint` | `str` |  |
| `id` | `str` |  |
| `metadata` | `Any` |  |
| `phone_number` | `str` |  |
| `relay` | `str` |  |
| `role` | `str` |  |
| `route` | `list` |  |
| `status` | `str` |  |
| `token` | `str` |  |
| `type` | `str` |  |
| `updated_at` | `int` |  |
| `validation_record` | `str` |  |

#### Example: List

```python
cores = client.Core().list()
```

#### Example: Create

```python
core = client.Core().create({
    "destination_domain": "example_destination_domain",  # str
    "route": [],  # list
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
| `created_at` | `int` |  |
| `custom_domain` | `str` |  |
| `id` | `str` |  |
| `relay` | `str` |  |
| `status` | `str` |  |
| `updated_at` | `int` |  |
| `validation_record` | `str` |  |

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
| `async` | `bool` |  |
| `created_at` | `int` |  |
| `error` | `Any` |  |
| `id` | `str` |  |
| `payload` | `dict` |  |
| `result` | `dict` |  |
| `status` | `str` |  |

#### Example: Create

```python
function_run = client.FunctionRun().create({
    "function_name": "example_function_name",  # str
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
| `apple_pay` | `dict` |  |
| `business` | `dict` |  |
| `category_code` | `str` |  |
| `created_at` | `int` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `network_token` | `dict` |  |
| `short_name` | `str` |  |
| `updated_at` | `int` |  |
| `website` | `str` |  |

#### Example: Load

```python
merchant = client.Merchant().load({"id": "merchant_id"})
```

#### Example: Create

```python
merchant = client.Merchant().create({
    "created_at": 1,  # int
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
| `card` | `dict` |  |
| `created_at` | `int` |  |
| `expiry` | `dict` |  |
| `id` | `str` |  |
| `merchant` | `str` |  |
| `number` | `str` |  |
| `payment_account_reference` | `str` |  |
| `status` | `str` |  |
| `token_requestor_identifier` | `str` |  |
| `token_service_provider` | `str` |  |
| `update_type` | `str` |  |
| `updated_at` | `int` |  |

#### Example: Load

```python
network_token = client.NetworkToken().load({"id": "network_token_id"})
```

#### Example: Create

```python
network_token = client.NetworkToken().create({
    "card": {},  # dict
    "created_at": 1,  # int
    "expiry": {},  # dict
    "id": "example_id",  # str
    "merchant": "example_merchant",  # str
    "number": "example_number",  # str
    "status": "example_status",  # str
    "token_requestor_identifier": "example_token_requestor_identifier",  # str
    "token_service_provider": "example_token_service_provider",  # str
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
| `created_at` | `int` |  |
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
| `apple_pay` | `dict` |  |
| `business` | `dict` |  |
| `category_code` | `str` |  |
| `configuration` | `list` |  |
| `created_at` | `int` |  |
| `data` | `dict` |  |
| `default` | `bool` |  |
| `description` | `str` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `network_token` | `dict` |  |
| `short_name` | `str` |  |
| `type` | `str` |  |
| `updated_at` | `int` |  |
| `website` | `str` |  |

#### Example: List

```python
payments = client.Payment().list()
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
| `app` | `str` |  |
| `authentication` | `Any` |  |
| `created_at` | `int` |  |
| `destination_domain` | `str` |  |
| `encrypt_empty_string` | `bool` |  |
| `evervault_domain` | `str` |  |
| `id` | `str` |  |
| `route` | `list` |  |
| `updated_at` | `int` |  |

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
| `access_control_server` | `dict` |  |
| `acquirer` | `dict` |  |
| `are` | `dict` |  |
| `authentication` | `dict` |  |
| `card` | `dict` |  |
| `challenge` | `dict` |  |
| `cre` | `Any` |  |
| `created_at` | `int` |  |
| `cryptogram` | `str` |  |
| `customer` | `dict` |  |
| `directory_server` | `dict` |  |
| `eci` | `dict` |  |
| `failure_reason` | `str` |  |
| `id` | `str` |  |
| `initiator` | `dict` |  |
| `merchant` | `dict` |  |
| `next_action` | `dict` |  |
| `payment` | `dict` |  |
| `preferred_version` | `list` |  |
| `rreq` | `Any` |  |
| `status` | `str` |  |
| `three_ds_server` | `dict` |  |
| `updated_at` | `int` |  |
| `version` | `str` |  |

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
    "created_at": 1,  # int
    "id": "example_id",  # str
    "merchant": {},  # dict
    "next_action": {},  # dict
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
| `created_at` | `int` |  |
| `event` | `list` |  |
| `id` | `str` |  |
| `updated_at` | `Any` |  |
| `url` | `str` |  |

#### Example: List

```python
webhooks = client.Webhook().list()
```

#### Example: Create

```python
webhook = client.Webhook().create({
    "event": [],  # list
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
| `created_at` | `int` |  |
| `event` | `list` |  |
| `id` | `str` |  |
| `updated_at` | `Any` |  |
| `url` | `str` |  |

#### Example: Load

```python
webhook_endpoint = client.WebhookEndpoint().load({"id": "webhook_endpoint_id"})
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
acquirer = client.Acquirer()
acquirer.load({"id": "example_id"})

# acquirer.data_get() now returns the acquirer data from the last load
# acquirer.match_get() returns the last match criteria
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
