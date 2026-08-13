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
| `configurations` | `any[]` | Yes |  |
| `default` | `boolean` | Yes |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Acquirer().create({
  configurations: [],
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
| `card` | `Record<string, any>` | Yes |  |
| `cardholder` | `Record<string, any>` | No |  |
| `expiry` | `Record<string, any>` | Yes |  |
| `extensions` | `any[]` | No |  |
| `month` | `string` | Yes |  |
| `number` | `string` | Yes |  |
| `year` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `simulate` | `/payments/cards/{card_id}/simulate` | `client.Card().create({ $action: 'simulate', ... })` |

An action returns that action's OWN response, which is not necessarily a
Card record — check the API definition for its shape.

```ts
const result = await client.Card().create({
  $action: 'simulate',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Card().create({
  address: {},
  card: {},
  expiry: {},
  month: 'example_month',
  number: 'example_number',
  year: 'example_year',
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
| `authentication` | `string | null` | No |  |
| `createdAt` | `number` | No |  |
| `customDomain` | `string` | No |  |
| `destinationDomain` | `string` | Yes |  |
| `encryptEmptyStrings` | `boolean` | No |  |
| `evervaultDomain` | `string` | No |  |
| `id` | `string` | No |  |
| `phoneNumber` | `string` | No |  |
| `relay` | `string` | No |  |
| `routes` | `any[]` | Yes |  |
| `status` | `string` | No |  |
| `token` | `string` | Yes |  |
| `updatedAt` | `number` | No |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Core().create({
  destinationDomain: 'example_destinationDomain',
  routes: [],
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
| `createdAt` | `number` | No |  |
| `customDomain` | `string` | No |  |
| `id` | `string` | No |  |
| `relay` | `string` | No |  |
| `status` | `string` | No |  |
| `updatedAt` | `number` | No |  |
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
| `createdAt` | `number` | No |  |
| `error` | `Record<string, any> | null` | No |  |
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
  payload: {},
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
| `applePay` | `Record<string, any>` | No |  |
| `business` | `Record<string, any>` | No |  |
| `categoryCode` | `string` | No |  |
| `createdAt` | `number` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `networkTokens` | `Record<string, any>` | No |  |
| `shortName` | `string` | No |  |
| `updatedAt` | `number` | No |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Merchant().create({
  createdAt: 1,
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
| `createdAt` | `number` | Yes |  |
| `expiry` | `Record<string, any>` | Yes |  |
| `id` | `string` | Yes |  |
| `merchant` | `string` | Yes |  |
| `number` | `string` | Yes |  |
| `paymentAccountReference` | `string` | No |  |
| `status` | `string` | Yes |  |
| `tokenRequestorIdentifier` | `string` | Yes |  |
| `tokenServiceProvider` | `string` | Yes |  |
| `updateType` | `string` | No |  |
| `updatedAt` | `number` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `simulate` | `/payments/network-tokens/{network_token_id}/simulate` | `client.NetworkToken().create({ $action: 'simulate', ... })` |

An action returns that action's OWN response, which is not necessarily a
NetworkToken record — check the API definition for its shape.

```ts
const result = await client.NetworkToken().create({
  $action: 'simulate',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.NetworkToken().create({
  card: {},
  createdAt: 1,
  expiry: {},
  id: 'example_id',
  merchant: 'example_merchant',
  number: 'example_number',
  status: 'example_status',
  tokenRequestorIdentifier: 'example_tokenRequestorIdentifier',
  tokenServiceProvider: 'example_tokenServiceProvider',
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
| `createdAt` | `number` | No |  |
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
| `applePay` | `Record<string, any>` | No |  |
| `business` | `Record<string, any>` | No |  |
| `categoryCode` | `string` | No |  |
| `configurations` | `any[]` | Yes |  |
| `createdAt` | `number` | Yes |  |
| `created_at` | `number` | No |  |
| `data` | `Record<string, any>` | No |  |
| `default` | `boolean` | Yes |  |
| `description` | `string` | No |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `networkTokens` | `Record<string, any>` | No |  |
| `shortName` | `string` | No |  |
| `type` | `string` | No |  |
| `updatedAt` | `number` | No |  |
| `website` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `acquirer` | `/payments/acquirers` | `client.Payment().list({ $action: 'acquirer', ... })` |
| `merchant` | `/payments/merchants` | `client.Payment().list({ $action: 'merchant', ... })` |

An action returns that action's OWN response, which is not necessarily a
Payment record — check the API definition for its shape.

```ts
const result = await client.Payment().list({
  $action: 'acquirer',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Payment().list({ '3ds_session_id': "example" })
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
| `authentication` | `string | null` | No |  |
| `createdAt` | `number` | No |  |
| `destinationDomain` | `string` | No |  |
| `encryptEmptyStrings` | `boolean` | No |  |
| `evervaultDomain` | `string` | No |  |
| `id` | `string` | No |  |
| `routes` | `any[]` | No |  |
| `updatedAt` | `number` | No |  |

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
| `accessControlServer` | `Record<string, any>` | No |  |
| `acquirer` | `Record<string, any>` | Yes |  |
| `ares` | `Record<string, any>` | No |  |
| `authentication` | `Record<string, any>` | Yes |  |
| `card` | `Record<string, any>` | Yes |  |
| `challenge` | `Record<string, any>` | Yes |  |
| `createdAt` | `number` | Yes |  |
| `cres` | `null | Record<string, any>` | No |  |
| `cryptogram` | `string` | No |  |
| `customer` | `Record<string, any>` | No |  |
| `directoryServer` | `Record<string, any>` | No |  |
| `eci` | `Record<string, any>` | No |  |
| `failureReason` | `string` | No |  |
| `id` | `string` | Yes |  |
| `initiator` | `Record<string, any>` | No |  |
| `merchant` | `Record<string, any>` | Yes |  |
| `nextAction` | `Record<string, any>` | Yes |  |
| `payment` | `Record<string, any>` | No |  |
| `preferredVersions` | `any[]` | No |  |
| `rreq` | `null | Record<string, any>` | No |  |
| `status` | `string` | Yes |  |
| `threeDSServer` | `Record<string, any>` | No |  |
| `updatedAt` | `number` | No |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ThreeDsSession().create({
  acquirer: {},
  authentication: {},
  card: {},
  challenge: {},
  createdAt: 1,
  id: 'example_id',
  merchant: {},
  nextAction: {},
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
| `createdAt` | `number` | No |  |
| `events` | `any[]` | Yes |  |
| `id` | `string` | No |  |
| `updatedAt` | `number | null` | No |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Webhook().create({
  events: [],
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
| `createdAt` | `number` | No |  |
| `events` | `any[]` | No |  |
| `id` | `string` | No |  |
| `updatedAt` | `number | null` | No |  |
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

