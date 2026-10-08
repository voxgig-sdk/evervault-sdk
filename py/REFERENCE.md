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

| Field | load | list | create | update |
| --- | --- | --- | --- | --- |
| `configurations` | - | - | - | Yes |
| `default` | - | - | - | Yes |
| `description` | - | - | - | - |
| `id` | - | - | - | - |
| `name` | - | - | - | Yes |

### Operations

#### `create(reqdata, ctrl=None) -> AcquirerEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Acquirer().create({
    "configurations": [],  # list
    "default": True,  # bool
    "id": "example_id",  # str
    "name": "example_name",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AcquirerEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Acquirer().list()
for acquirer in results:
    print(acquirer.data_get())
```

#### `load(reqmatch, ctrl=None) -> AcquirerEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Acquirer().load({"id": "acquirer_id"})
```

#### `update(reqdata, ctrl=None) -> AcquirerEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

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

#### `create(reqdata, ctrl=None) -> BinLookupEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

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
| `automaticUpdates` | `str` | No | The status of Card Account Updater on this card. |
| `bin` | `str` | Yes | The first 6 or 8 digits of the card number. |
| `brand` | `str` | No | The card brand associated with the payment card. |
| `card` | `dict` | Yes | The card details. |
| `cardholder` | `dict` | No | Details about the cardholder that the name verification (ANI) is for. |
| `country` | `str` | No | The country where the card was issued. |
| `createdAt` | `int` | Yes | The Unix timestamp of when the card was created. |
| `currency` | `str` | No | The currency of the card. |
| `expiry` | `dict` | Yes | The expiry date of the card. |
| `extensions` | `list` | No | The extensions to the card insight request. |
| `funding` | `str` | No | The card funding type specifies the method by which transactions are financed. |
| `id` | `str` | No | The unique identifier for the card. |
| `issuer` | `str` | No | The name of the card issuer. |
| `lastFour` | `str` | Yes | The last 4 digits of the card number. |
| `number` | `str` | Yes | The Evervault encrypted card number. |
| `replacement` | `str | None` | No | The ID of the replacement card. |
| `segment` | `str` | No | The card segment indicates the primary market or usage category of the card. |
| `status` | `str` | No | The current status of the card. |
| `updatedAt` | `int | None` | No | The Unix timestamp of when the card was last updated. |

### Operations

#### `create(reqdata, ctrl=None) -> CardEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Card().create({
    "address": {},  # dict
    "bin": "example_bin",  # str
    "card": {},  # dict
    "createdAt": 1,  # int
    "expiry": {},  # dict
    "lastFour": "example_lastFour",  # str
    "number": "example_number",  # str
})
```

#### `load(reqmatch, ctrl=None) -> CardEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

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

#### `load(reqmatch, ctrl=None) -> CardArtEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

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

#### `create(reqdata, ctrl=None) -> ClientSideTokenEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

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
| `category` | `str` | No | The category or specific nature of the encrypted value. |
| `core_list` | `dict | list | str | float | bool` | No | A JSON value or file to be encrypted. |
| `cores` | `dict | list | str` | No | A JSON value or file to be decrypted. |
| `createdAt` | `int` | No | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `str` | No | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `encryptedAt` | `int` | No | The date and time when the value was encrypted. |
| `fingerprint` | `str` | No | A unique identifier for the encrypted value. |
| `id` | `str` | No | The unique identifier for the custom domain. |
| `metadata` | `Any` | No | Further metadata about the encrypted value. |
| `phoneNumber` | `str` | No |  |
| `relay` | `str` | No | The ID of the Relay with which this custom domain is associated. |
| `role` | `str` | No | The data role of the encrypted value. |
| `status` | `str` | No | The status of the domains DNS verification. |
| `token` | `str` | Yes | The encrypted data to be inspected. |
| `type` | `str` | No | The type of the encrypted value. |
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `str` | No | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

### Operations

#### `create(reqdata, ctrl=None) -> CoreEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Core().create({
    "token": "example_token",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[CoreEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Core().list({"relay_id": "example"})
for core in results:
    print(core.data_get())
```

#### `remove(reqmatch, ctrl=None) -> CoreEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

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

#### `create(reqdata, ctrl=None) -> CustomDomainEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CustomDomain().create({
    "relay_id": "example_relay_id",  # str
})
```

#### `load(reqmatch, ctrl=None) -> CustomDomainEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

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

#### `create(reqdata, ctrl=None) -> FunctionRunEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

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

### Operations

#### `create(reqdata, ctrl=None) -> MerchantEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Merchant().create({
    "createdAt": 1,  # int
    "id": "example_id",  # str
    "name": "example_name",  # str
    "website": "example_website",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[MerchantEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Merchant().list()
for merchant in results:
    print(merchant.data_get())
```

#### `load(reqmatch, ctrl=None) -> MerchantEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Merchant().load({"id": "merchant_id"})
```

#### `update(reqdata, ctrl=None) -> MerchantEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

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
| `updatedAt` | `int` | No | The exact time, in epoch milliseconds, when this Network Token was last updated. |

### Operations

#### `create(reqdata, ctrl=None) -> NetworkTokenEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

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

#### `load(reqmatch, ctrl=None) -> NetworkTokenEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

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

#### `create(reqdata, ctrl=None) -> NetworkTokenCryptogramEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

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
| `created_at` | `int` | No | Timestamp when the message was created |
| `data` | `dict` | No | The message data payload |
| `type` | `str` | No | The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes) |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PaymentEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Payment().list({"3ds_session_id": "example"})
for payment in results:
    print(payment.data_get())
```

#### `remove(reqmatch, ctrl=None) -> PaymentEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

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

#### `create(reqdata, ctrl=None) -> RelayEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Relay().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list[RelayEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Relay().list()
for relay in results:
    print(relay.data_get())
```

#### `load(reqmatch, ctrl=None) -> RelayEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Relay().load({"id": "relay_id"})
```

#### `update(reqdata, ctrl=None) -> RelayEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

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

#### `create(reqdata, ctrl=None) -> ThreeDsSessionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

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

#### `load(reqmatch, ctrl=None) -> ThreeDsSessionEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

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

### Operations

#### `remove(reqmatch, ctrl=None) -> WebhookEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

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

| Field | load | list | create | update |
| --- | --- | --- | --- | --- |
| `createdAt` | - | - | - | - |
| `events` | - | - | Yes | Yes |
| `id` | - | - | - | - |
| `updatedAt` | - | - | - | - |
| `url` | - | - | Yes | - |

### Operations

#### `create(reqdata, ctrl=None) -> WebhookEndpointEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.WebhookEndpoint().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list[WebhookEndpointEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.WebhookEndpoint().list()
for webhook_endpoint in results:
    print(webhook_endpoint.data_get())
```

#### `load(reqmatch, ctrl=None) -> WebhookEndpointEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.WebhookEndpoint().load({"id": "webhook_endpoint_id"})
```

#### `update(reqdata, ctrl=None) -> WebhookEndpointEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

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
| `debug` | 0.0.1 | Debug capture |
| `idempotency` | 0.0.1 | Idempotency |
| `metrics` | 0.0.1 | Metrics |
| `paging` | 0.0.1 | Paging |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```python
client = EvervaultSDK({
    "feature": {
        "debug": {"active": True},
        "idempotency": {"active": True},
        "metrics": {"active": True},
        "paging": {"active": True},
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

