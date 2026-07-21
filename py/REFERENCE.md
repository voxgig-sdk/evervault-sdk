# Evervault Python SDK Reference

Complete API reference for the Evervault Python SDK.


## EvervaultSDK

### Constructor

```python
from evervault_sdk import EvervaultSDK

client = EvervaultSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `EvervaultSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = EvervaultSDK.test()
```


### Instance Methods

#### `Acquirer(data=None)`

Create a new `AcquirerEntity` instance. Pass `None` for no initial data.

#### `BinLookup(data=None)`

Create a new `BinLookupEntity` instance. Pass `None` for no initial data.

#### `Card(data=None)`

Create a new `CardEntity` instance. Pass `None` for no initial data.

#### `CardArt(data=None)`

Create a new `CardArtEntity` instance. Pass `None` for no initial data.

#### `ClientSideToken(data=None)`

Create a new `ClientSideTokenEntity` instance. Pass `None` for no initial data.

#### `Core(data=None)`

Create a new `CoreEntity` instance. Pass `None` for no initial data.

#### `CustomDomain(data=None)`

Create a new `CustomDomainEntity` instance. Pass `None` for no initial data.

#### `FunctionRun(data=None)`

Create a new `FunctionRunEntity` instance. Pass `None` for no initial data.

#### `Merchant(data=None)`

Create a new `MerchantEntity` instance. Pass `None` for no initial data.

#### `NetworkToken(data=None)`

Create a new `NetworkTokenEntity` instance. Pass `None` for no initial data.

#### `NetworkTokenCryptogram(data=None)`

Create a new `NetworkTokenCryptogramEntity` instance. Pass `None` for no initial data.

#### `Payment(data=None)`

Create a new `PaymentEntity` instance. Pass `None` for no initial data.

#### `Relay(data=None)`

Create a new `RelayEntity` instance. Pass `None` for no initial data.

#### `ThreeDsSession(data=None)`

Create a new `ThreeDsSessionEntity` instance. Pass `None` for no initial data.

#### `Webhook(data=None)`

Create a new `WebhookEntity` instance. Pass `None` for no initial data.

#### `WebhookEndpoint(data=None)`

Create a new `WebhookEndpointEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AcquirerEntity

```python
acquirer = client.Acquirer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `configuration` | `list` | Yes |  |
| `default` | `bool` | Yes |  |
| `description` | `str` | No |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | create | update |
| --- | --- | --- | --- |
| `configuration` | - | - | Yes |
| `default` | - | Yes | Yes |
| `description` | - | - | - |
| `id` | - | - | - |
| `name` | - | - | Yes |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Acquirer().create({
    "configuration": [],  # list
    "default": True,  # bool
    "id": "example_id",  # str
    "name": "example_name",  # str
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Acquirer().load({"id": "acquirer_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Acquirer().update({
    "id": "acquirer_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AcquirerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BinLookupEntity

```python
bin_lookup = client.BinLookup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `number` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.BinLookup().create({
    "number": "example_number",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BinLookupEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CardEntity

```python
card = client.Card()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `dict` | Yes |  |
| `automatic_update` | `str` | No |  |
| `bin` | `str` | Yes |  |
| `brand` | `str` | No |  |
| `card` | `dict` | Yes |  |
| `cardholder` | `dict` | No |  |
| `country` | `str` | No |  |
| `created_at` | `int` | Yes |  |
| `currency` | `str` | No |  |
| `expiry` | `dict` | Yes |  |
| `extension` | `list` | No |  |
| `funding` | `str` | No |  |
| `id` | `str` | No |  |
| `issuer` | `str` | No |  |
| `last_four` | `str` | Yes |  |
| `number` | `str` | Yes |  |
| `replacement` | `Any` | No |  |
| `segment` | `str` | No |  |
| `status` | `str` | No |  |
| `updated_at` | `Any` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Card().create({
    "address": {},  # dict
    "bin": "example_bin",  # str
    "card": {},  # dict
    "created_at": 1,  # int
    "expiry": {},  # dict
    "last_four": "example_last_four",  # str
    "number": "example_number",  # str
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Card().load({"id": "card_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CardArtEntity

```python
card_art = client.CardArt()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `str` | Yes |  |
| `height` | `int` | Yes |  |
| `type` | `str` | Yes |  |
| `width` | `int` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.CardArt().load({"network_token_id": "network_token_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardArtEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ClientSideTokenEntity

```python
client_side_token = client.ClientSideToken()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `str` | Yes |  |
| `expiry` | `int` | No |  |
| `payload` | `dict` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ClientSideToken().create({
    "action": "example_action",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ClientSideTokenEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CoreEntity

```python
core = client.Core()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `str` | No |  |
| `authentication` | `Any` | No |  |
| `category` | `str` | No |  |
| `created_at` | `int` | No |  |
| `custom_domain` | `str` | No |  |
| `destination_domain` | `str` | Yes |  |
| `encrypt_empty_string` | `bool` | No |  |
| `encrypted_at` | `int` | No |  |
| `evervault_domain` | `str` | No |  |
| `fingerprint` | `str` | No |  |
| `id` | `str` | No |  |
| `metadata` | `Any` | No |  |
| `phone_number` | `str` | No |  |
| `relay` | `str` | No |  |
| `role` | `str` | No |  |
| `route` | `list` | Yes |  |
| `status` | `str` | No |  |
| `token` | `str` | Yes |  |
| `type` | `str` | No |  |
| `updated_at` | `int` | No |  |
| `validation_record` | `str` | No |  |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `app` | - | - | - |
| `authentication` | - | - | - |
| `category` | - | - | - |
| `created_at` | - | - | - |
| `custom_domain` | - | - | - |
| `destination_domain` | Yes | - | - |
| `encrypt_empty_string` | - | - | - |
| `encrypted_at` | - | - | - |
| `evervault_domain` | - | - | - |
| `fingerprint` | - | - | - |
| `id` | - | - | - |
| `metadata` | - | - | - |
| `phone_number` | - | - | - |
| `relay` | - | - | - |
| `role` | - | - | - |
| `route` | Yes | - | - |
| `status` | - | - | - |
| `token` | - | - | - |
| `type` | - | - | - |
| `updated_at` | - | - | - |
| `validation_record` | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Core().create({
    "destination_domain": "example_destination_domain",  # str
    "route": [],  # list
    "token": "example_token",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Core().list()
for core in results:
    print(core)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Core().remove({"id": "id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CoreEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CustomDomainEntity

```python
custom_domain = client.CustomDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `int` | No |  |
| `custom_domain` | `str` | No |  |
| `id` | `str` | No |  |
| `relay` | `str` | No |  |
| `status` | `str` | No |  |
| `updated_at` | `int` | No |  |
| `validation_record` | `str` | No |  |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `created_at` | - | - |
| `custom_domain` | - | Yes |
| `id` | - | - |
| `relay` | - | - |
| `status` | - | - |
| `updated_at` | - | - |
| `validation_record` | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.CustomDomain().create({
    "relay_id": "example_relay_id",  # str
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.CustomDomain().load({"id": "custom_domain_id", "relay_id": "relay_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CustomDomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FunctionRunEntity

```python
function_run = client.FunctionRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `async` | `bool` | No |  |
| `created_at` | `int` | No |  |
| `error` | `Any` | No |  |
| `id` | `str` | No |  |
| `payload` | `dict` | Yes |  |
| `result` | `dict` | No |  |
| `status` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.FunctionRun().create({
    "function_name": "example_function_name",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FunctionRunEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MerchantEntity

```python
merchant = client.Merchant()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apple_pay` | `dict` | No |  |
| `business` | `dict` | No |  |
| `category_code` | `str` | No |  |
| `created_at` | `int` | Yes |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `network_token` | `dict` | No |  |
| `short_name` | `str` | No |  |
| `updated_at` | `int` | No |  |
| `website` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | create | update |
| --- | --- | --- | --- |
| `apple_pay` | - | - | - |
| `business` | - | Yes | - |
| `category_code` | - | Yes | - |
| `created_at` | - | - | - |
| `id` | - | - | - |
| `name` | - | - | - |
| `network_token` | - | - | - |
| `short_name` | - | - | - |
| `updated_at` | - | - | - |
| `website` | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Merchant().create({
    "created_at": 1,  # int
    "id": "example_id",  # str
    "name": "example_name",  # str
    "website": "example_website",  # str
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Merchant().load({"id": "merchant_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Merchant().update({
    "id": "merchant_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MerchantEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NetworkTokenEntity

```python
network_token = client.NetworkToken()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | `dict` | Yes |  |
| `created_at` | `int` | Yes |  |
| `expiry` | `dict` | Yes |  |
| `id` | `str` | Yes |  |
| `merchant` | `str` | Yes |  |
| `number` | `str` | Yes |  |
| `payment_account_reference` | `str` | No |  |
| `status` | `str` | Yes |  |
| `token_requestor_identifier` | `str` | Yes |  |
| `token_service_provider` | `str` | Yes |  |
| `update_type` | `str` | No |  |
| `updated_at` | `int` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.NetworkToken().create({
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

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.NetworkToken().load({"id": "network_token_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NetworkTokenEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NetworkTokenCryptogramEntity

```python
network_token_cryptogram = client.NetworkTokenCryptogram()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `int` | No |  |
| `cryptogram` | `str` | No |  |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.NetworkTokenCryptogram().create({
    "id": "example_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NetworkTokenCryptogramEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PaymentEntity

```python
payment = client.Payment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apple_pay` | `dict` | No |  |
| `business` | `dict` | No |  |
| `category_code` | `str` | No |  |
| `configuration` | `list` | Yes |  |
| `created_at` | `int` | Yes |  |
| `data` | `dict` | No |  |
| `default` | `bool` | Yes |  |
| `description` | `str` | No |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `network_token` | `dict` | No |  |
| `short_name` | `str` | No |  |
| `type` | `str` | No |  |
| `updated_at` | `int` | No |  |
| `website` | `str` | Yes |  |

### Field Usage by Operation

| Field | list | remove |
| --- | --- | --- |
| `apple_pay` | - | - |
| `business` | - | - |
| `category_code` | - | - |
| `configuration` | - | - |
| `created_at` | Yes | - |
| `data` | - | - |
| `default` | - | - |
| `description` | - | - |
| `id` | - | - |
| `name` | - | - |
| `network_token` | - | - |
| `short_name` | - | - |
| `type` | - | - |
| `updated_at` | - | - |
| `website` | - | - |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Payment().list()
for payment in results:
    print(payment)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Payment().remove()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaymentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RelayEntity

```python
relay = client.Relay()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `str` | No |  |
| `authentication` | `Any` | No |  |
| `created_at` | `int` | No |  |
| `destination_domain` | `str` | No |  |
| `encrypt_empty_string` | `bool` | No |  |
| `evervault_domain` | `str` | No |  |
| `id` | `str` | No |  |
| `route` | `list` | No |  |
| `updated_at` | `int` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Relay().load({"id": "relay_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Relay().update({
    "id": "relay_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RelayEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ThreeDsSessionEntity

```python
three_ds_session = client.ThreeDsSession()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_control_server` | `dict` | No |  |
| `acquirer` | `dict` | Yes |  |
| `are` | `dict` | No |  |
| `authentication` | `dict` | Yes |  |
| `card` | `dict` | Yes |  |
| `challenge` | `dict` | Yes |  |
| `cre` | `Any` | No |  |
| `created_at` | `int` | Yes |  |
| `cryptogram` | `str` | No |  |
| `customer` | `dict` | No |  |
| `directory_server` | `dict` | No |  |
| `eci` | `dict` | No |  |
| `failure_reason` | `str` | No |  |
| `id` | `str` | Yes |  |
| `initiator` | `dict` | No |  |
| `merchant` | `dict` | Yes |  |
| `next_action` | `dict` | Yes |  |
| `payment` | `dict` | No |  |
| `preferred_version` | `list` | No |  |
| `rreq` | `Any` | No |  |
| `status` | `str` | Yes |  |
| `three_ds_server` | `dict` | No |  |
| `updated_at` | `int` | No |  |
| `version` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `access_control_server` | - | - |
| `acquirer` | - | Yes |
| `are` | - | - |
| `authentication` | - | - |
| `card` | - | - |
| `challenge` | - | - |
| `cre` | - | - |
| `created_at` | - | - |
| `cryptogram` | - | - |
| `customer` | - | - |
| `directory_server` | - | - |
| `eci` | - | - |
| `failure_reason` | - | - |
| `id` | - | - |
| `initiator` | - | - |
| `merchant` | - | - |
| `next_action` | - | - |
| `payment` | - | - |
| `preferred_version` | - | - |
| `rreq` | - | - |
| `status` | - | - |
| `three_ds_server` | - | - |
| `updated_at` | - | - |
| `version` | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ThreeDsSession().create({
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

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ThreeDsSession().load({"3ds_session_id": "3ds_session_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ThreeDsSessionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WebhookEntity

```python
webhook = client.Webhook()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `int` | No |  |
| `event` | `list` | Yes |  |
| `id` | `str` | No |  |
| `updated_at` | `Any` | No |  |
| `url` | `str` | Yes |  |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `created_at` | - | - | - |
| `event` | Yes | - | - |
| `id` | - | - | - |
| `updated_at` | - | - | - |
| `url` | Yes | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Webhook().create({
    "event": [],  # list
    "url": "example_url",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Webhook().list()
for webhook in results:
    print(webhook)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Webhook().remove({"webhook_endpoint_id": "webhook_endpoint_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebhookEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WebhookEndpointEntity

```python
webhook_endpoint = client.WebhookEndpoint()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `int` | No |  |
| `event` | `list` | No |  |
| `id` | `str` | No |  |
| `updated_at` | `Any` | No |  |
| `url` | `str` | No |  |

### Field Usage by Operation

| Field | load | update |
| --- | --- | --- |
| `created_at` | - | - |
| `event` | - | Yes |
| `id` | - | - |
| `updated_at` | - | - |
| `url` | - | - |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.WebhookEndpoint().load({"id": "webhook_endpoint_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.WebhookEndpoint().update({
    "id": "webhook_endpoint_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebhookEndpointEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = EvervaultSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

