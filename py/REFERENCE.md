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
| `configurations` | `list` | Yes |  |
| `default` | `bool` | Yes |  |
| `description` | `str` | No |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |

### Field Usage by Operation

| Field | load | create | update |
| --- | --- | --- | --- |
| `configurations` | - | - | Yes |
| `default` | - | Yes | Yes |
| `description` | - | - | - |
| `id` | - | - | - |
| `name` | - | - | Yes |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Acquirer().create({
    "configurations": [],  # list
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
| `card` | `dict` | Yes |  |
| `cardholder` | `dict` | No |  |
| `expiry` | `dict` | Yes |  |
| `extensions` | `list` | No |  |
| `month` | `str` | Yes |  |
| `number` | `str` | Yes |  |
| `year` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Card().create({
    "address": {},  # dict
    "card": {},  # dict
    "expiry": {},  # dict
    "month": "example_month",  # str
    "number": "example_number",  # str
    "year": "example_year",  # str
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
| `authentication` | `str | None` | No |  |
| `createdAt` | `int` | No |  |
| `customDomain` | `str` | No |  |
| `destinationDomain` | `str` | Yes |  |
| `encryptEmptyStrings` | `bool` | No |  |
| `evervaultDomain` | `str` | No |  |
| `id` | `str` | No |  |
| `phoneNumber` | `str` | No |  |
| `relay` | `str` | No |  |
| `routes` | `list` | Yes |  |
| `status` | `str` | No |  |
| `token` | `str` | Yes |  |
| `updatedAt` | `int` | No |  |
| `validationRecord` | `str` | No |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Core().create({
    "destinationDomain": "example_destinationDomain",  # str
    "routes": [],  # list
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
| `createdAt` | `int` | No |  |
| `customDomain` | `str` | No |  |
| `id` | `str` | No |  |
| `relay` | `str` | No |  |
| `status` | `str` | No |  |
| `updatedAt` | `int` | No |  |
| `validationRecord` | `str` | No |  |

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
| `createdAt` | `int` | No |  |
| `error` | `dict | None` | No |  |
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
    "payload": {},  # dict
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
| `applePay` | `dict` | No |  |
| `business` | `dict` | No |  |
| `categoryCode` | `str` | No |  |
| `createdAt` | `int` | Yes |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `networkTokens` | `dict` | No |  |
| `shortName` | `str` | No |  |
| `updatedAt` | `int` | No |  |
| `website` | `str` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Merchant().create({
    "createdAt": 1,  # int
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
| `createdAt` | `int` | Yes |  |
| `expiry` | `dict` | Yes |  |
| `id` | `str` | Yes |  |
| `merchant` | `str` | Yes |  |
| `number` | `str` | Yes |  |
| `paymentAccountReference` | `str` | No |  |
| `status` | `str` | Yes |  |
| `tokenRequestorIdentifier` | `str` | Yes |  |
| `tokenServiceProvider` | `str` | Yes |  |
| `updateType` | `str` | No |  |
| `updatedAt` | `int` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.NetworkToken().create({
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
| `createdAt` | `int` | No |  |
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
| `applePay` | `dict` | No |  |
| `business` | `dict` | No |  |
| `categoryCode` | `str` | No |  |
| `configurations` | `list` | Yes |  |
| `createdAt` | `int` | Yes |  |
| `created_at` | `int` | No |  |
| `data` | `dict` | No |  |
| `default` | `bool` | Yes |  |
| `description` | `str` | No |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `networkTokens` | `dict` | No |  |
| `shortName` | `str` | No |  |
| `type` | `str` | No |  |
| `updatedAt` | `int` | No |  |
| `website` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Payment().list({"3ds_session_id": "example"})
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
| `authentication` | `str | None` | No |  |
| `createdAt` | `int` | No |  |
| `destinationDomain` | `str` | No |  |
| `encryptEmptyStrings` | `bool` | No |  |
| `evervaultDomain` | `str` | No |  |
| `id` | `str` | No |  |
| `routes` | `list` | No |  |
| `updatedAt` | `int` | No |  |

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
| `accessControlServer` | `dict` | No |  |
| `acquirer` | `dict` | Yes |  |
| `ares` | `dict` | No |  |
| `authentication` | `dict` | Yes |  |
| `card` | `dict` | Yes |  |
| `challenge` | `dict` | Yes |  |
| `createdAt` | `int` | Yes |  |
| `cres` | `None | dict` | No |  |
| `cryptogram` | `str` | No |  |
| `customer` | `dict` | No |  |
| `directoryServer` | `dict` | No |  |
| `eci` | `dict` | No |  |
| `failureReason` | `str` | No |  |
| `id` | `str` | Yes |  |
| `initiator` | `dict` | No |  |
| `merchant` | `dict` | Yes |  |
| `nextAction` | `dict` | Yes |  |
| `payment` | `dict` | No |  |
| `preferredVersions` | `list` | No |  |
| `rreq` | `None | dict` | No |  |
| `status` | `str` | Yes |  |
| `threeDSServer` | `dict` | No |  |
| `updatedAt` | `int` | No |  |
| `version` | `str` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ThreeDsSession().create({
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
| `createdAt` | `int` | No |  |
| `events` | `list` | Yes |  |
| `id` | `str` | No |  |
| `updatedAt` | `int | None` | No |  |
| `url` | `str` | Yes |  |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `createdAt` | - | - | - |
| `events` | Yes | - | - |
| `id` | - | - | - |
| `updatedAt` | - | - | - |
| `url` | Yes | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Webhook().create({
    "events": [],  # list
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
| `createdAt` | `int` | No |  |
| `events` | `list` | No |  |
| `id` | `str` | No |  |
| `updatedAt` | `int | None` | No |  |
| `url` | `str` | No |  |

### Field Usage by Operation

| Field | load | update |
| --- | --- | --- |
| `createdAt` | - | - |
| `events` | - | Yes |
| `id` | - | - |
| `updatedAt` | - | - |
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

