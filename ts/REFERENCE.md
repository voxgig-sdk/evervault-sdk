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
| `options.secret` | `string` | API secret for authentication. |
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
| `configurations` | `any[]` | Yes | The acquirer configuration settings. |
| `default` | `boolean` | Yes | Specifies whether this Acquirer is the default. |
| `description` | `string` | No | The description of the acquirer configuration. |
| `id` | `string` | Yes | The unique identifier of the acquirer configuration. |
| `name` | `string` | Yes | The name of the acquirer configuration. |

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
| `number` | `string` | Yes | The card number for which the BIN lookup is being requested. |

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
| `address` | `Record<string, any>` | Yes | Details about the cardholder's address that the address verification (AVS) is for. |
| `card` | `Record<string, any>` | Yes | The card details. |
| `cardholder` | `Record<string, any>` | No | Details about the cardholder that the name verification (ANI) is for. |
| `expiry` | `Record<string, any>` | Yes |  |
| `extensions` | `any[]` | No | The extensions to the card insight request. |
| `id` | `string` | No |  |
| `month` | `string` | Yes | The card expiry month, in MM format (e.g. |
| `number` | `string` | Yes | The card number. |
| `year` | `string` | Yes | The card expiry year, in YY format (e.g. |

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
| `data` | `string` | Yes | The base64-encoded image data of the card art. |
| `height` | `number` | Yes | The height of the card art image in pixels. |
| `type` | `string` | Yes | The MIME type of the card art image. |
| `width` | `number` | Yes | The width of the card art image in pixels. |

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
| `action` | `string` | Yes | The action that the token should permit |
| `expiry` | `number` | No | The expiry of the token in milliseconds format. |
| `payload` | `Record<string, any>` | No | The payload that the token must be used with |

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
| `app` | `string` | No | The unique identifier for the app to which the Relay belongs. |
| `authentication` | `string | null` | No | The type of authentication required for the Relay |
| `createdAt` | `number` | No | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `string` | No | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `destinationDomain` | `string` | Yes | The domain in front of which you would like to configure a Relay |
| `encryptEmptyStrings` | `boolean` | No | Whether or not empty strings should be encrypted. |
| `evervaultDomain` | `string` | No | The Evervault managed domain to which requests to be relayed to the destination domain should be sent. |
| `id` | `string` | No | The unique identifier for the custom domain. |
| `phoneNumber` | `string` | No |  |
| `relay` | `string` | No | The ID of the Relay with which this custom domain is associated. |
| `routes` | `any[]` | Yes | A collection of route configurations for the Relay. |
| `status` | `string` | No | The status of the domains DNS verification. |
| `token` | `string` | Yes | The encrypted data to be inspected. |
| `updatedAt` | `number` | No | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `string` | No | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

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
| `createdAt` | `number` | No | The exact time, in epoch milliseconds, when this custom domain was created. |
| `customDomain` | `string` | No | The customer managed domain to which requests to be relayed to your domain should be sent. |
| `id` | `string` | No | The unique identifier for the custom domain. |
| `relay` | `string` | No | The ID of the Relay with which this custom domain is associated. |
| `status` | `string` | No | The status of the domains DNS verification. |
| `updatedAt` | `number` | No | The exact time, in epoch milliseconds, when this custom domain was last updated. |
| `validationRecord` | `string` | No | Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain |

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
| `async` | `boolean` | No | If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code. |
| `createdAt` | `number` | No | The exact time, in epoch milliseconds, when this Function execution was triggered. |
| `error` | `Record<string, any> | null` | No | This field details any error that occurred during Function execution. |
| `id` | `string` | No | A unique identifier representing this specific Function execution instance. |
| `payload` | `Record<string, any>` | Yes | The data payload that the Function will use during its execution. |
| `result` | `Record<string, any>` | No | This field represents the output returned by the Function. |
| `status` | `string` | No | The outcome of the Function execution. |

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
| `applePay` | `Record<string, any>` | No | The Merchant's Apple Pay configuration. |
| `business` | `Record<string, any>` | No | The business details of the Merchant. |
| `categoryCode` | `string` | No | The 4-digit Merchant Category Code (MCC). |
| `createdAt` | `number` | Yes | The exact time, in epoch milliseconds, when this Merchant was created. |
| `id` | `string` | Yes | A unique identifier assigned to each Merchant. |
| `name` | `string` | Yes | The official name of the Merchant as recognized in transactions and communications. |
| `networkTokens` | `Record<string, any>` | No | The Merchant's Network Token configuration. |
| `shortName` | `string` | No | A shorter version of the Merchant's name. |
| `updatedAt` | `number` | No | The exact time, in epoch milliseconds, when this Merchant was last updated. |
| `website` | `string` | Yes | The official website URL of the Merchant. |

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
| `card` | `Record<string, any>` | Yes | The details of the underlying encrypted card. |
| `createdAt` | `number` | Yes | The exact time, in epoch milliseconds, when this Network Token was created. |
| `expiry` | `Record<string, any>` | Yes | The expiry details of the Network Token. |
| `id` | `string` | Yes | A unique identifier representing a specific Network Token. |
| `merchant` | `string` | Yes | The unique identifier of the Merchant associated with this Network Token. |
| `number` | `string` | Yes | The unique number of the Network Token. |
| `paymentAccountReference` | `string` | No | The unique identifier of the Payment Account associated with this Network Token. |
| `status` | `string` | Yes | The status of the Network Token. |
| `tokenRequestorIdentifier` | `string` | Yes | The identifier of the Token Requestor (TRID) that requested the Network Token. |
| `tokenServiceProvider` | `string` | Yes | The Token Service Provider (TSP) that issued the Network Token. |
| `updateType` | `string` | No | The type of update to simulate. |
| `updatedAt` | `number` | No | The exact time, in epoch milliseconds, when this Network Token was last updated. |

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
| `applePay` | `Record<string, any>` | No | The Merchant's Apple Pay configuration. |
| `business` | `Record<string, any>` | No | The business details of the Merchant. |
| `categoryCode` | `string` | No | The 4-digit Merchant Category Code (MCC). |
| `configurations` | `any[]` | Yes | The acquirer configuration settings. |
| `createdAt` | `number` | Yes | The exact time, in epoch milliseconds, when this Merchant was created. |
| `created_at` | `number` | No | Timestamp when the message was created |
| `data` | `Record<string, any>` | No | The message data payload |
| `default` | `boolean` | Yes |  |
| `description` | `string` | No | The description of the acquirer configuration. |
| `id` | `string` | Yes | A unique identifier assigned to each Merchant. |
| `name` | `string` | Yes | The official name of the Merchant as recognized in transactions and communications. |
| `networkTokens` | `Record<string, any>` | No | The Merchant's Network Token configuration. |
| `shortName` | `string` | No | A shorter version of the Merchant's name. |
| `type` | `string` | No | The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes) |
| `updatedAt` | `number` | No | The exact time, in epoch milliseconds, when this Merchant was last updated. |
| `website` | `string` | Yes | The official website URL of the Merchant. |

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
const result = await client.Payment().remove({ acquirer_id: 'acquirer_id' })
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
| `app` | `string` | No | The unique identifier for the app to which the Relay belongs. |
| `authentication` | `string | null` | No | The type of authentication required for the Relay |
| `createdAt` | `number` | No | The exact time, in epoch milliseconds, when this Relay was created. |
| `destinationDomain` | `string` | No | The domain in front of which the Relay should be configured. |
| `encryptEmptyStrings` | `boolean` | No | Whether or not empty strings should be encrypted. |
| `evervaultDomain` | `string` | No | The Evervault managed domain to which requests to be relayed to the destination domain should be sent. |
| `id` | `string` | No | The unique identifier for the Relay. |
| `routes` | `any[]` | No | A collection of route configurations for the Relay. |
| `updatedAt` | `number` | No | The exact time, in epoch milliseconds, when this Relay was updated. |

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
| `accessControlServer` | `Record<string, any>` | No | Details about the Access Control Server involved in the 3DS transaction. |
| `acquirer` | `Record<string, any>` | Yes | The acquirer of the payment. |
| `ares` | `Record<string, any>` | No | The details of the 3DS Authentication Response (ARes). |
| `authentication` | `Record<string, any>` | Yes | The details of the 3DS Authentication. |
| `card` | `Record<string, any>` | Yes | The card details. |
| `challenge` | `Record<string, any>` | Yes | Details about the 3DS challenge. |
| `createdAt` | `number` | Yes | The exact time, in epoch milliseconds, when this 3DS-Session was created. |
| `cres` | `null | Record<string, any>` | No | The details of the 3DS Challenge Response (CRes). |
| `cryptogram` | `string` | No | The 3DS cryptogram (also called Authentication Value). |
| `customer` | `Record<string, any>` | No | The details of the customer who initiated the transaction. |
| `directoryServer` | `Record<string, any>` | No | Details about the Directory Server involved in the 3DS transaction. |
| `eci` | `Record<string, any>` | No | The details of the Electronic Commerce Indicator. |
| `failureReason` | `string` | No | The reason for the 3DS Authentication failure. |
| `id` | `string` | Yes | A unique identifier assigned to each 3DS Authentication. |
| `initiator` | `Record<string, any>` | No | Details about the transaction initiation process. |
| `merchant` | `Record<string, any>` | Yes | The merchant details. |
| `nextAction` | `Record<string, any>` | Yes | The next action required to complete the 3DS Authentication. |
| `payment` | `Record<string, any>` | No | The payment details of the 3D Secure Authentication. |
| `preferredVersions` | `any[]` | No | A prioritized list of preferred 3D Secure versions. |
| `rreq` | `null | Record<string, any>` | No | The result of the 3DS authentication when a challenge has occurred. |
| `status` | `string` | Yes | The status of the 3DS Authentication. |
| `threeDSServer` | `Record<string, any>` | No | Details about the 3DS Server involved in the 3DS transaction. |
| `updatedAt` | `number` | No | The exact time, in epoch milliseconds, when this 3DS-Session was last updated. |
| `version` | `string` | Yes | The 3D Secure version used to authenticate the session. |

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
| `createdAt` | `number` | No | The exact time, in epoch milliseconds, when this Webhook Endpoint was created. |
| `events` | `any[]` | Yes | A list of Events that the Webhook Endpoint should subscribe to. |
| `id` | `string` | No | A unique identifier representing a specific Webhook Endpoint. |
| `updatedAt` | `number | null` | No | The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated. |
| `url` | `string` | Yes | The URL of the Webhook Endpoint. |

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
| `createdAt` | `number` | No | The exact time, in epoch milliseconds, when this Webhook Endpoint was created. |
| `events` | `any[]` | No | A list of Events that the Webhook Endpoint is subscribed to. |
| `id` | `string` | No | A unique identifier representing a specific Webhook Endpoint. |
| `updatedAt` | `number | null` | No | The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated. |
| `url` | `string` | No | The URL of the Webhook Endpoint. |

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

