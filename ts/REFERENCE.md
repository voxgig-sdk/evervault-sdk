# Evervault TypeScript SDK Reference

Complete API reference for the Evervault TypeScript SDK.


## EvervaultSDK

### Constructor

```ts
new EvervaultSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `EvervaultSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = EvervaultSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `EvervaultSDK` instance in test mode.


### Instance Methods

#### `Acquirer(data?: object)`

Create a new `Acquirer` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AcquirerEntity` instance.

#### `BinLookup(data?: object)`

Create a new `BinLookup` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BinLookupEntity` instance.

#### `Card(data?: object)`

Create a new `Card` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CardEntity` instance.

#### `CardArt(data?: object)`

Create a new `CardArt` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CardArtEntity` instance.

#### `ClientSideToken(data?: object)`

Create a new `ClientSideToken` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ClientSideTokenEntity` instance.

#### `Core(data?: object)`

Create a new `Core` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CoreEntity` instance.

#### `CustomDomain(data?: object)`

Create a new `CustomDomain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CustomDomainEntity` instance.

#### `FunctionRun(data?: object)`

Create a new `FunctionRun` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FunctionRunEntity` instance.

#### `Merchant(data?: object)`

Create a new `Merchant` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MerchantEntity` instance.

#### `NetworkToken(data?: object)`

Create a new `NetworkToken` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NetworkTokenEntity` instance.

#### `NetworkTokenCryptogram(data?: object)`

Create a new `NetworkTokenCryptogram` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NetworkTokenCryptogramEntity` instance.

#### `Payment(data?: object)`

Create a new `Payment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PaymentEntity` instance.

#### `Relay(data?: object)`

Create a new `Relay` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RelayEntity` instance.

#### `ThreeDsSession(data?: object)`

Create a new `ThreeDsSession` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ThreeDsSessionEntity` instance.

#### `Webhook(data?: object)`

Create a new `Webhook` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WebhookEntity` instance.

#### `WebhookEndpoint(data?: object)`

Create a new `WebhookEndpoint` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WebhookEndpointEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `EvervaultSDK.test()`.

**Returns:** `EvervaultSDK` instance in test mode.


---

## AcquirerEntity

```ts
const acquirer = client.Acquirer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `configuration` | `any[]` | Yes |  |
| `default` | `boolean` | Yes |  |
| `description` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | create | update |
| --- | --- | --- | --- |
| `configuration` | - | - | Yes |
| `default` | - | Yes | Yes |
| `description` | - | - | - |
| `id` | - | - | - |
| `name` | - | - | Yes |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Acquirer().create({
  configuration: [],
  default: true,
  id: 'example_id',
  name: 'example_name',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Acquirer().load({ id: 'acquirer_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Acquirer().update({
  id: 'acquirer_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AcquirerEntity` instance with the same client and
options.

#### `client()`

Return the parent `EvervaultSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BinLookupEntity

```ts
const bin_lookup = client.BinLookup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `number` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.BinLookup().create({
  number: 'example_number',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BinLookupEntity` instance with the same client and
options.

#### `client()`

Return the parent `EvervaultSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CardEntity

```ts
const card = client.Card()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `Record<string, any>` | Yes |  |
| `automatic_update` | `string` | No |  |
| `bin` | `string` | Yes |  |
| `brand` | `string` | No |  |
| `card` | `Record<string, any>` | Yes |  |
| `cardholder` | `Record<string, any>` | No |  |
| `country` | `string` | No |  |
| `created_at` | `number` | Yes |  |
| `currency` | `string` | No |  |
| `expiry` | `Record<string, any>` | Yes |  |
| `extension` | `any[]` | No |  |
| `funding` | `string` | No |  |
| `id` | `string` | No |  |
| `issuer` | `string` | No |  |
| `last_four` | `string` | Yes |  |
| `number` | `string` | Yes |  |
| `replacement` | `any` | No |  |
| `segment` | `string` | No |  |
| `status` | `string` | No |  |
| `updated_at` | `any` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Card().create({
  address: {},
  bin: 'example_bin',
  card: {},
  created_at: 1,
  expiry: {},
  last_four: 'example_last_four',
  number: 'example_number',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Card().load({ id: 'card_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CardEntity` instance with the same client and
options.

#### `client()`

Return the parent `EvervaultSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CardArtEntity

```ts
const card_art = client.CardArt()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `string` | Yes |  |
| `height` | `number` | Yes |  |
| `type` | `string` | Yes |  |
| `width` | `number` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.CardArt().load({ network_token_id: 'network_token_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CardArtEntity` instance with the same client and
options.

#### `client()`

Return the parent `EvervaultSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ClientSideTokenEntity

```ts
const client_side_token = client.ClientSideToken()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  |
| `expiry` | `number` | No |  |
| `payload` | `Record<string, any>` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ClientSideToken().create({
  action: 'example_action',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ClientSideTokenEntity` instance with the same client and
options.

#### `client()`

Return the parent `EvervaultSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CoreEntity

```ts
const core = client.Core()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `string` | No |  |
| `authentication` | `any` | No |  |
| `category` | `string` | No |  |
| `created_at` | `number` | No |  |
| `custom_domain` | `string` | No |  |
| `destination_domain` | `string` | Yes |  |
| `encrypt_empty_string` | `boolean` | No |  |
| `encrypted_at` | `number` | No |  |
| `evervault_domain` | `string` | No |  |
| `fingerprint` | `string` | No |  |
| `id` | `string` | No |  |
| `metadata` | `any` | No |  |
| `phone_number` | `string` | No |  |
| `relay` | `string` | No |  |
| `role` | `string` | No |  |
| `route` | `any[]` | Yes |  |
| `status` | `string` | No |  |
| `token` | `string` | Yes |  |
| `type` | `string` | No |  |
| `updated_at` | `number` | No |  |
| `validation_record` | `string` | No |  |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Core().create({
  destination_domain: 'example_destination_domain',
  route: [],
  token: 'example_token',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Core().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Core().remove({ id: 'id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CoreEntity` instance with the same client and
options.

#### `client()`

Return the parent `EvervaultSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CustomDomainEntity

```ts
const custom_domain = client.CustomDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `number` | No |  |
| `custom_domain` | `string` | No |  |
| `id` | `string` | No |  |
| `relay` | `string` | No |  |
| `status` | `string` | No |  |
| `updated_at` | `number` | No |  |
| `validation_record` | `string` | No |  |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.CustomDomain().create({
  relay_id: 'example_relay_id',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.CustomDomain().load({ id: 'custom_domain_id', relay_id: 'relay_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CustomDomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `EvervaultSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FunctionRunEntity

```ts
const function_run = client.FunctionRun()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `async` | `boolean` | No |  |
| `created_at` | `number` | No |  |
| `error` | `any` | No |  |
| `id` | `string` | No |  |
| `payload` | `Record<string, any>` | Yes |  |
| `result` | `Record<string, any>` | No |  |
| `status` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.FunctionRun().create({
  function_name: 'example_function_name',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FunctionRunEntity` instance with the same client and
options.

#### `client()`

Return the parent `EvervaultSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MerchantEntity

```ts
const merchant = client.Merchant()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apple_pay` | `Record<string, any>` | No |  |
| `business` | `Record<string, any>` | No |  |
| `category_code` | `string` | No |  |
| `created_at` | `number` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `network_token` | `Record<string, any>` | No |  |
| `short_name` | `string` | No |  |
| `updated_at` | `number` | No |  |
| `website` | `string` | Yes |  |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Merchant().create({
  created_at: 1,
  id: 'example_id',
  name: 'example_name',
  website: 'example_website',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Merchant().load({ id: 'merchant_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Merchant().update({
  id: 'merchant_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MerchantEntity` instance with the same client and
options.

#### `client()`

Return the parent `EvervaultSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NetworkTokenEntity

```ts
const network_token = client.NetworkToken()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | `Record<string, any>` | Yes |  |
| `created_at` | `number` | Yes |  |
| `expiry` | `Record<string, any>` | Yes |  |
| `id` | `string` | Yes |  |
| `merchant` | `string` | Yes |  |
| `number` | `string` | Yes |  |
| `payment_account_reference` | `string` | No |  |
| `status` | `string` | Yes |  |
| `token_requestor_identifier` | `string` | Yes |  |
| `token_service_provider` | `string` | Yes |  |
| `update_type` | `string` | No |  |
| `updated_at` | `number` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.NetworkToken().create({
  card: {},
  created_at: 1,
  expiry: {},
  id: 'example_id',
  merchant: 'example_merchant',
  number: 'example_number',
  status: 'example_status',
  token_requestor_identifier: 'example_token_requestor_identifier',
  token_service_provider: 'example_token_service_provider',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.NetworkToken().load({ id: 'network_token_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NetworkTokenEntity` instance with the same client and
options.

#### `client()`

Return the parent `EvervaultSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NetworkTokenCryptogramEntity

```ts
const network_token_cryptogram = client.NetworkTokenCryptogram()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `number` | No |  |
| `cryptogram` | `string` | No |  |
| `id` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.NetworkTokenCryptogram().create({
  id: 'example_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NetworkTokenCryptogramEntity` instance with the same client and
options.

#### `client()`

Return the parent `EvervaultSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PaymentEntity

```ts
const payment = client.Payment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apple_pay` | `Record<string, any>` | No |  |
| `business` | `Record<string, any>` | No |  |
| `category_code` | `string` | No |  |
| `configuration` | `any[]` | Yes |  |
| `created_at` | `number` | Yes |  |
| `data` | `Record<string, any>` | No |  |
| `default` | `boolean` | Yes |  |
| `description` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `network_token` | `Record<string, any>` | No |  |
| `short_name` | `string` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `number` | No |  |
| `website` | `string` | Yes |  |

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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Payment().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Payment().remove()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PaymentEntity` instance with the same client and
options.

#### `client()`

Return the parent `EvervaultSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RelayEntity

```ts
const relay = client.Relay()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app` | `string` | No |  |
| `authentication` | `any` | No |  |
| `created_at` | `number` | No |  |
| `destination_domain` | `string` | No |  |
| `encrypt_empty_string` | `boolean` | No |  |
| `evervault_domain` | `string` | No |  |
| `id` | `string` | No |  |
| `route` | `any[]` | No |  |
| `updated_at` | `number` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Relay().load({ id: 'relay_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Relay().update({
  id: 'relay_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RelayEntity` instance with the same client and
options.

#### `client()`

Return the parent `EvervaultSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ThreeDsSessionEntity

```ts
const three_ds_session = client.ThreeDsSession()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_control_server` | `Record<string, any>` | No |  |
| `acquirer` | `Record<string, any>` | Yes |  |
| `are` | `Record<string, any>` | No |  |
| `authentication` | `Record<string, any>` | Yes |  |
| `card` | `Record<string, any>` | Yes |  |
| `challenge` | `Record<string, any>` | Yes |  |
| `cre` | `any` | No |  |
| `created_at` | `number` | Yes |  |
| `cryptogram` | `string` | No |  |
| `customer` | `Record<string, any>` | No |  |
| `directory_server` | `Record<string, any>` | No |  |
| `eci` | `Record<string, any>` | No |  |
| `failure_reason` | `string` | No |  |
| `id` | `string` | Yes |  |
| `initiator` | `Record<string, any>` | No |  |
| `merchant` | `Record<string, any>` | Yes |  |
| `next_action` | `Record<string, any>` | Yes |  |
| `payment` | `Record<string, any>` | No |  |
| `preferred_version` | `any[]` | No |  |
| `rreq` | `any` | No |  |
| `status` | `string` | Yes |  |
| `three_ds_server` | `Record<string, any>` | No |  |
| `updated_at` | `number` | No |  |
| `version` | `string` | Yes |  |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ThreeDsSession().create({
  acquirer: {},
  authentication: {},
  card: {},
  challenge: {},
  created_at: 1,
  id: 'example_id',
  merchant: {},
  next_action: {},
  status: 'example_status',
  version: 'example_version',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ThreeDsSession().load({ '3ds_session_id': '3ds_session_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ThreeDsSessionEntity` instance with the same client and
options.

#### `client()`

Return the parent `EvervaultSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WebhookEntity

```ts
const webhook = client.Webhook()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `number` | No |  |
| `event` | `any[]` | Yes |  |
| `id` | `string` | No |  |
| `updated_at` | `any` | No |  |
| `url` | `string` | Yes |  |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `created_at` | - | - | - |
| `event` | Yes | - | - |
| `id` | - | - | - |
| `updated_at` | - | - | - |
| `url` | Yes | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Webhook().create({
  event: [],
  url: 'example_url',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Webhook().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Webhook().remove({ webhook_endpoint_id: 'webhook_endpoint_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WebhookEntity` instance with the same client and
options.

#### `client()`

Return the parent `EvervaultSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WebhookEndpointEntity

```ts
const webhook_endpoint = client.WebhookEndpoint()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `number` | No |  |
| `event` | `any[]` | No |  |
| `id` | `string` | No |  |
| `updated_at` | `any` | No |  |
| `url` | `string` | No |  |

### Field Usage by Operation

| Field | load | update |
| --- | --- | --- |
| `created_at` | - | - |
| `event` | - | Yes |
| `id` | - | - |
| `updated_at` | - | - |
| `url` | - | - |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.WebhookEndpoint().load({ id: 'webhook_endpoint_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.WebhookEndpoint().update({
  id: 'webhook_endpoint_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WebhookEndpointEntity` instance with the same client and
options.

#### `client()`

Return the parent `EvervaultSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new EvervaultSDK({
  feature: {
    test: { active: true },
  }
})
```

