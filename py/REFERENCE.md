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
| `configurations` | `list` | Yes | The acquirer configuration settings. |
| `default` | `bool` | Yes | Specifies whether this Acquirer is the default. |
| `description` | `str` | No | The description of the acquirer configuration. |
| `id` | `str` | Yes | The unique identifier of the acquirer configuration. |
| `name` | `str` | Yes | The name of the acquirer configuration. |

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
| `number` | `str` | Yes | The card number for which the BIN lookup is being requested. |

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
| `address` | `dict` | Yes | Details about the cardholder's address that the address verification (AVS) is for. |
| `card` | `dict` | Yes | The card details. |
| `cardholder` | `dict` | No | Details about the cardholder that the name verification (ANI) is for. |
| `expiry` | `dict` | Yes |  |
| `extensions` | `list` | No | The extensions to the card insight request. |
| `id` | `str` | No |  |
| `month` | `str` | Yes | The card expiry month, in MM format (e.g. |
| `number` | `str` | Yes | The card number. |
| `year` | `str` | Yes | The card expiry year, in YY format (e.g. |

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
| `data` | `str` | Yes | The base64-encoded image data of the card art. |
| `height` | `int` | Yes | The height of the card art image in pixels. |
| `type` | `str` | Yes | The MIME type of the card art image. |
| `width` | `int` | Yes | The width of the card art image in pixels. |

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
| `action` | `str` | Yes | The action that the token should permit |
| `expiry` | `int` | No | The expiry of the token in milliseconds format. |
| `payload` | `dict` | No | The payload that the token must be used with |

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
| `app` | `str` | No | The unique identifier for the app to which the Relay belongs. |
| `authentication` | `str | None` | No | The type of authentication required for the Relay |
| `createdAt` | `int` | No | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `str` | No | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `destinationDomain` | `str` | Yes | The domain in front of which you would like to configure a Relay |
| `encryptEmptyStrings` | `bool` | No | Whether or not empty strings should be encrypted. |
| `evervaultDomain` | `str` | No | The Evervault managed domain to which requests to be relayed to the destination domain should be sent. |
| `id` | `str` | No | The unique identifier for the custom domain. |
| `phoneNumber` | `str` | No |  |
| `relay` | `str` | No | The ID of the Relay with which this custom domain is associated. |
| `routes` | `list` | Yes | A collection of route configurations for the Relay. |
| `status` | `str` | No | The status of the domains DNS verification. |
| `token` | `str` | Yes | The encrypted data to be inspected. |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `str` | No | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

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
| `createdAt` | `int` | No | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `str` | No | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `id` | `str` | No | The unique identifier for the custom domain. |
| `relay` | `str` | No | The ID of the Relay with which this custom domain is associated. |
| `status` | `str` | No | The status of the domains DNS verification. |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `str` | No | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

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
| `async` | `bool` | No | If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code. |
| `createdAt` | `int` | No | The exact time, in epoch milliseconds, when this Function execution was triggered. |
| `error` | `dict | None` | No | This field details any error that occurred during Function execution. |
| `id` | `str` | No | A unique identifier representing this specific Function execution instance. |
| `payload` | `dict` | Yes | The data payload that the Function will use during its execution. |
| `result` | `dict` | No | This field represents the output returned by the Function. |
| `status` | `str` | No | The outcome of the Function execution. |

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
| `applePay` | `dict` | No | The Merchant's Apple Pay configuration. |
| `business` | `dict` | No | The business details of the Merchant. |
| `categoryCode` | `str` | No | The 4-digit Merchant Category Code (MCC). |
| `createdAt` | `int` | Yes | The exact time, in epoch milliseconds, when this Merchant was created. |
| `id` | `str` | Yes | A unique identifier assigned to each Merchant. |
| `name` | `str` | Yes | The official name of the Merchant as recognized in transactions and communications. |
| `networkTokens` | `dict` | No | The Merchant's Network Token configuration. |
| `shortName` | `str` | No | A shorter version of the Merchant's name. |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this Merchant was last updated. |
| `website` | `str` | Yes | The official website URL of the Merchant. |

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
| `card` | `dict` | Yes | The details of the underlying encrypted card. |
| `createdAt` | `int` | Yes | The exact time, in epoch milliseconds, when this Network Token was created. |
| `expiry` | `dict` | Yes | The expiry details of the Network Token. |
| `id` | `str` | Yes | A unique identifier representing a specific Network Token. |
| `merchant` | `str` | Yes | The unique identifier of the Merchant associated with this Network Token. |
| `number` | `str` | Yes | The unique number of the Network Token. |
| `paymentAccountReference` | `str` | No | The unique identifier of the Payment Account associated with this Network Token. |
| `status` | `str` | Yes | The status of the Network Token. |
| `tokenRequestorIdentifier` | `str` | Yes | The identifier of the Token Requestor (TRID) that requested the Network Token. |
| `tokenServiceProvider` | `str` | Yes | The Token Service Provider (TSP) that issued the Network Token. |
| `updateType` | `str` | No | The type of update to simulate. |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this Network Token was last updated. |

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
| `applePay` | `dict` | No | The Merchant's Apple Pay configuration. |
| `business` | `dict` | No | The business details of the Merchant. |
| `categoryCode` | `str` | No | The 4-digit Merchant Category Code (MCC). |
| `configurations` | `list` | Yes | The acquirer configuration settings. |
| `createdAt` | `int` | Yes | The exact time, in epoch milliseconds, when this Merchant was created. |
| `created_at` | `int` | No | Timestamp when the message was created |
| `data` | `dict` | No | The message data payload |
| `default` | `bool` | Yes |  |
| `description` | `str` | No | The description of the acquirer configuration. |
| `id` | `str` | Yes | A unique identifier assigned to each Merchant. |
| `name` | `str` | Yes | The official name of the Merchant as recognized in transactions and communications. |
| `networkTokens` | `dict` | No | The Merchant's Network Token configuration. |
| `shortName` | `str` | No | A shorter version of the Merchant's name. |
| `type` | `str` | No | The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes) |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this Merchant was last updated. |
| `website` | `str` | Yes | The official website URL of the Merchant. |

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
result = client.Payment().remove({"acquirer_id": "acquirer_id"})
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
| `app` | `str` | No | The unique identifier for the app to which the Relay belongs. |
| `authentication` | `str | None` | No | The type of authentication required for the Relay |
| `createdAt` | `int` | No | The exact time, in epoch milliseconds, when this Relay was created. |
| `destinationDomain` | `str` | No | The domain in front of which the Relay should be configured. |
| `encryptEmptyStrings` | `bool` | No | Whether or not empty strings should be encrypted. |
| `evervaultDomain` | `str` | No | The Evervault managed domain to which requests to be relayed to the destination domain should be sent. |
| `id` | `str` | No | The unique identifier for the Relay. |
| `routes` | `list` | No | A collection of route configurations for the Relay. |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this Relay was updated. |

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
| `accessControlServer` | `dict` | No | Details about the Access Control Server involved in the 3DS transaction. |
| `acquirer` | `dict` | Yes | The acquirer of the payment. |
| `ares` | `dict` | No | The details of the 3DS Authentication Response (ARes). |
| `authentication` | `dict` | Yes | The details of the 3DS Authentication. |
| `card` | `dict` | Yes | The card details. |
| `challenge` | `dict` | Yes | Details about the 3DS challenge. |
| `createdAt` | `int` | Yes | The exact time, in epoch milliseconds, when this 3DS-Session was created. |
| `cres` | `None | dict` | No | The details of the 3DS Challenge Response (CRes). |
| `cryptogram` | `str` | No | The 3DS cryptogram (also called Authentication Value). |
| `customer` | `dict` | No | The details of the customer who initiated the transaction. |
| `directoryServer` | `dict` | No | Details about the Directory Server involved in the 3DS transaction. |
| `eci` | `dict` | No | The details of the Electronic Commerce Indicator. |
| `failureReason` | `str` | No | The reason for the 3DS Authentication failure. |
| `id` | `str` | Yes | A unique identifier assigned to each 3DS Authentication. |
| `initiator` | `dict` | No | Details about the transaction initiation process. |
| `merchant` | `dict` | Yes | The merchant details. |
| `nextAction` | `dict` | Yes | The next action required to complete the 3DS Authentication. |
| `payment` | `dict` | No | The payment details of the 3D Secure Authentication. |
| `preferredVersions` | `list` | No | A prioritized list of preferred 3D Secure versions. |
| `rreq` | `None | dict` | No | The result of the 3DS authentication when a challenge has occurred. |
| `status` | `str` | Yes | The status of the 3DS Authentication. |
| `threeDSServer` | `dict` | No | Details about the 3DS Server involved in the 3DS transaction. |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this 3DS-Session was last updated. |
| `version` | `str` | Yes | The 3D Secure version used to authenticate the session. |

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
| `createdAt` | `int` | No | The exact time, in epoch milliseconds, when this Webhook Endpoint was created. |
| `events` | `list` | Yes | A list of Events that the Webhook Endpoint should subscribe to. |
| `id` | `str` | No | A unique identifier representing a specific Webhook Endpoint. |
| `updatedAt` | `int | None` | No | The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated. |
| `url` | `str` | Yes | The URL of the Webhook Endpoint. |

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
| `createdAt` | `int` | No | The exact time, in epoch milliseconds, when this Webhook Endpoint was created. |
| `events` | `list` | No | A list of Events that the Webhook Endpoint is subscribed to. |
| `id` | `str` | No | A unique identifier representing a specific Webhook Endpoint. |
| `updatedAt` | `int | None` | No | The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated. |
| `url` | `str` | No | The URL of the Webhook Endpoint. |

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


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

