# Evervault TypeScript SDK



The TypeScript SDK for the Evervault API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Acquirer()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/evervault-sdk/releases](https://github.com/voxgig-sdk/evervault-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { EvervaultSDK } from '@voxgig-sdk/evervault'

const client = new EvervaultSDK({
  apikey: process.env.EVERVAULT_APIKEY,
})
```

### 3. Load a cardart

CardArt is nested under network_token, so provide the `network_token_id`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const cardart = await client.CardArt().load({
    network_token_id: 'example_network_token_id',
  })
  console.log(cardart)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created Acquirer
const created = await client.Acquirer().create({
  configuration: [],
  default: true,
  id: 'example_id',
  name: 'example_name',
})

// Update — the id comes straight off the returned entity
const updated = await client.Acquirer().update({
  id: created.id!,
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const merchant = await client.Merchant().load({ id: "example_id" })
  console.log(merchant)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = EvervaultSDK.test()

const merchant = await client.Merchant().load({ id: 'test01' })
// merchant is a bare entity populated with mock response data
console.log(merchant)
```

You can also use the instance method:

```ts
const client = new EvervaultSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Merchant()

// First call runs the operation and stores its result
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new EvervaultSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```


## Reference

### EvervaultSDK

#### Constructor

```ts
new EvervaultSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Acquirer(data?)` | `AcquirerEntity` | Create an Acquirer entity instance. |
| `BinLookup(data?)` | `BinLookupEntity` | Create a BinLookup entity instance. |
| `Card(data?)` | `CardEntity` | Create a Card entity instance. |
| `CardArt(data?)` | `CardArtEntity` | Create a CardArt entity instance. |
| `ClientSideToken(data?)` | `ClientSideTokenEntity` | Create a ClientSideToken entity instance. |
| `Core(data?)` | `CoreEntity` | Create a Core entity instance. |
| `CustomDomain(data?)` | `CustomDomainEntity` | Create a CustomDomain entity instance. |
| `FunctionRun(data?)` | `FunctionRunEntity` | Create a FunctionRun entity instance. |
| `Merchant(data?)` | `MerchantEntity` | Create a Merchant entity instance. |
| `NetworkToken(data?)` | `NetworkTokenEntity` | Create a NetworkToken entity instance. |
| `NetworkTokenCryptogram(data?)` | `NetworkTokenCryptogramEntity` | Create a NetworkTokenCryptogram entity instance. |
| `Payment(data?)` | `PaymentEntity` | Create a Payment entity instance. |
| `Relay(data?)` | `RelayEntity` | Create a Relay entity instance. |
| `ThreeDsSession(data?)` | `ThreeDsSessionEntity` | Create a ThreeDsSession entity instance. |
| `Webhook(data?)` | `WebhookEntity` | Create a Webhook entity instance. |
| `WebhookEndpoint(data?)` | `WebhookEndpointEntity` | Create a WebhookEndpoint entity instance. |
| `tester(testopts?, sdkopts?)` | `EvervaultSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `EvervaultSDK.test(testopts?, sdkopts?)` | `EvervaultSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): EvervaultSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Acquirer

| Field | Description |
| --- | --- |
| `configuration` |  |
| `default` |  |
| `description` |  |
| `id` |  |
| `name` |  |

Operations: create, load, update.

API path: `/payments/acquirers`

#### BinLookup

| Field | Description |
| --- | --- |
| `number` |  |

Operations: create.

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

Operations: create, load.

API path: `/payments/cards/{card_id}/simulate`

#### CardArt

| Field | Description |
| --- | --- |
| `data` |  |
| `height` |  |
| `type` |  |
| `width` |  |

Operations: load.

API path: `/payments/network-tokens/{network_token_id}/card-art`

#### ClientSideToken

| Field | Description |
| --- | --- |
| `action` |  |
| `expiry` |  |
| `payload` |  |

Operations: create.

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

Operations: create, list, remove.

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

Operations: create, load.

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

Operations: create.

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

Operations: create, load, update.

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

Operations: create, load.

API path: `/payments/network-tokens/{network_token_id}/simulate`

#### NetworkTokenCryptogram

| Field | Description |
| --- | --- |
| `created_at` |  |
| `cryptogram` |  |
| `id` |  |

Operations: create.

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

Operations: list, remove.

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

Operations: load, update.

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

Operations: create, load.

API path: `/payments/3ds-sessions`

#### Webhook

| Field | Description |
| --- | --- |
| `created_at` |  |
| `event` |  |
| `id` |  |
| `updated_at` |  |
| `url` |  |

Operations: create, list, remove.

API path: `/webhook-endpoints`

#### WebhookEndpoint

| Field | Description |
| --- | --- |
| `created_at` |  |
| `event` |  |
| `id` |  |
| `updated_at` |  |
| `url` |  |

Operations: load, update.

API path: `/webhook-endpoints/{webhook_endpoint_id}`



## Entities


### Acquirer

Create an instance: `const acquirer = client.Acquirer()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configuration` | `any[]` |  |
| `default` | `boolean` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |

#### Example: Load

```ts
const acquirer = await client.Acquirer().load({ id: 'acquirer_id' })
```

#### Example: Create

```ts
const acquirer = await client.Acquirer().create({
  configuration: [],
  default: true,
  id: 'example_id',
  name: 'example_name',
})
```


### BinLookup

Create an instance: `const bin_lookup = client.BinLookup()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `number` | `string` |  |

#### Example: Create

```ts
const bin_lookup = await client.BinLookup().create({
  number: 'example_number',
})
```


### Card

Create an instance: `const card = client.Card()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `Record<string, any>` |  |
| `automatic_update` | `string` |  |
| `bin` | `string` |  |
| `brand` | `string` |  |
| `card` | `Record<string, any>` |  |
| `cardholder` | `Record<string, any>` |  |
| `country` | `string` |  |
| `created_at` | `number` |  |
| `currency` | `string` |  |
| `expiry` | `Record<string, any>` |  |
| `extension` | `any[]` |  |
| `funding` | `string` |  |
| `id` | `string` |  |
| `issuer` | `string` |  |
| `last_four` | `string` |  |
| `number` | `string` |  |
| `replacement` | `string | null` |  |
| `segment` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `number | null` |  |

#### Example: Load

```ts
const card = await client.Card().load({ id: 'card_id' })
```

#### Example: Create

```ts
const card = await client.Card().create({
  address: {},
  bin: 'example_bin',
  card: {},
  created_at: 1,
  expiry: {},
  last_four: 'example_last_four',
  number: 'example_number',
})
```


### CardArt

Create an instance: `const card_art = client.CardArt()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `string` |  |
| `height` | `number` |  |
| `type` | `string` |  |
| `width` | `number` |  |

#### Example: Load

```ts
const card_art = await client.CardArt().load({ network_token_id: 'network_token_id' })
```


### ClientSideToken

Create an instance: `const client_side_token = client.ClientSideToken()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` |  |
| `expiry` | `number` |  |
| `payload` | `Record<string, any>` |  |

#### Example: Create

```ts
const client_side_token = await client.ClientSideToken().create({
  action: 'example_action',
})
```


### Core

Create an instance: `const core = client.Core()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `string` |  |
| `authentication` | `string | null` |  |
| `category` | `string` |  |
| `created_at` | `number` |  |
| `custom_domain` | `string` |  |
| `destination_domain` | `string` |  |
| `encrypt_empty_string` | `boolean` |  |
| `encrypted_at` | `number` |  |
| `evervault_domain` | `string` |  |
| `fingerprint` | `string` |  |
| `id` | `string` |  |
| `metadata` | `any` |  |
| `phone_number` | `string` |  |
| `relay` | `string` |  |
| `role` | `string` |  |
| `route` | `any[]` |  |
| `status` | `string` |  |
| `token` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `number` |  |
| `validation_record` | `string` |  |

#### Example: List

```ts
const cores = await client.Core().list()
```

#### Example: Create

```ts
const core = await client.Core().create({
  destination_domain: 'example_destination_domain',
  route: [],
  token: 'example_token',
})
```


### CustomDomain

Create an instance: `const custom_domain = client.CustomDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `number` |  |
| `custom_domain` | `string` |  |
| `id` | `string` |  |
| `relay` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `number` |  |
| `validation_record` | `string` |  |

#### Example: Load

```ts
const custom_domain = await client.CustomDomain().load({ id: 'custom_domain_id', relay_id: 'relay_id' })
```

#### Example: Create

```ts
const custom_domain = await client.CustomDomain().create({
  relay_id: 'example_relay_id',
})
```


### FunctionRun

Create an instance: `const function_run = client.FunctionRun()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `async` | `boolean` |  |
| `created_at` | `number` |  |
| `error` | `Record<string, any> | null` |  |
| `id` | `string` |  |
| `payload` | `Record<string, any>` |  |
| `result` | `Record<string, any>` |  |
| `status` | `string` |  |

#### Example: Create

```ts
const function_run = await client.FunctionRun().create({
  function_name: 'example_function_name',
})
```


### Merchant

Create an instance: `const merchant = client.Merchant()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apple_pay` | `Record<string, any>` |  |
| `business` | `Record<string, any>` |  |
| `category_code` | `string` |  |
| `created_at` | `number` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `network_token` | `Record<string, any>` |  |
| `short_name` | `string` |  |
| `updated_at` | `number` |  |
| `website` | `string` |  |

#### Example: Load

```ts
const merchant = await client.Merchant().load({ id: 'merchant_id' })
```

#### Example: Create

```ts
const merchant = await client.Merchant().create({
  created_at: 1,
  id: 'example_id',
  name: 'example_name',
  website: 'example_website',
})
```


### NetworkToken

Create an instance: `const network_token = client.NetworkToken()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `card` | `Record<string, any>` |  |
| `created_at` | `number` |  |
| `expiry` | `Record<string, any>` |  |
| `id` | `string` |  |
| `merchant` | `string` |  |
| `number` | `string` |  |
| `payment_account_reference` | `string` |  |
| `status` | `string` |  |
| `token_requestor_identifier` | `string` |  |
| `token_service_provider` | `string` |  |
| `update_type` | `string` |  |
| `updated_at` | `number` |  |

#### Example: Load

```ts
const network_token = await client.NetworkToken().load({ id: 'network_token_id' })
```

#### Example: Create

```ts
const network_token = await client.NetworkToken().create({
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


### NetworkTokenCryptogram

Create an instance: `const network_token_cryptogram = client.NetworkTokenCryptogram()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `number` |  |
| `cryptogram` | `string` |  |
| `id` | `string` |  |

#### Example: Create

```ts
const network_token_cryptogram = await client.NetworkTokenCryptogram().create({
  id: 'example_id',
})
```


### Payment

Create an instance: `const payment = client.Payment()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apple_pay` | `Record<string, any>` |  |
| `business` | `Record<string, any>` |  |
| `category_code` | `string` |  |
| `configuration` | `any[]` |  |
| `created_at` | `number` |  |
| `data` | `Record<string, any>` |  |
| `default` | `boolean` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `network_token` | `Record<string, any>` |  |
| `short_name` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `number` |  |
| `website` | `string` |  |

#### Example: List

```ts
const payments = await client.Payment().list()
```


### Relay

Create an instance: `const relay = client.Relay()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app` | `string` |  |
| `authentication` | `string | null` |  |
| `created_at` | `number` |  |
| `destination_domain` | `string` |  |
| `encrypt_empty_string` | `boolean` |  |
| `evervault_domain` | `string` |  |
| `id` | `string` |  |
| `route` | `any[]` |  |
| `updated_at` | `number` |  |

#### Example: Load

```ts
const relay = await client.Relay().load({ id: 'relay_id' })
```


### ThreeDsSession

Create an instance: `const three_ds_session = client.ThreeDsSession()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_control_server` | `Record<string, any>` |  |
| `acquirer` | `Record<string, any>` |  |
| `are` | `Record<string, any>` |  |
| `authentication` | `Record<string, any>` |  |
| `card` | `Record<string, any>` |  |
| `challenge` | `Record<string, any>` |  |
| `cre` | `null | Record<string, any>` |  |
| `created_at` | `number` |  |
| `cryptogram` | `string` |  |
| `customer` | `Record<string, any>` |  |
| `directory_server` | `Record<string, any>` |  |
| `eci` | `Record<string, any>` |  |
| `failure_reason` | `string` |  |
| `id` | `string` |  |
| `initiator` | `Record<string, any>` |  |
| `merchant` | `Record<string, any>` |  |
| `next_action` | `Record<string, any>` |  |
| `payment` | `Record<string, any>` |  |
| `preferred_version` | `any[]` |  |
| `rreq` | `null | Record<string, any>` |  |
| `status` | `string` |  |
| `three_ds_server` | `Record<string, any>` |  |
| `updated_at` | `number` |  |
| `version` | `string` |  |

#### Example: Load

```ts
const three_ds_session = await client.ThreeDsSession().load({ '3ds_session_id': '3ds_session_id' })
```

#### Example: Create

```ts
const three_ds_session = await client.ThreeDsSession().create({
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


### Webhook

Create an instance: `const webhook = client.Webhook()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `number` |  |
| `event` | `any[]` |  |
| `id` | `string` |  |
| `updated_at` | `number | null` |  |
| `url` | `string` |  |

#### Example: List

```ts
const webhooks = await client.Webhook().list()
```

#### Example: Create

```ts
const webhook = await client.Webhook().create({
  event: [],
  url: 'example_url',
})
```


### WebhookEndpoint

Create an instance: `const webhook_endpoint = client.WebhookEndpoint()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `number` |  |
| `event` | `any[]` |  |
| `id` | `string` |  |
| `updated_at` | `number | null` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const webhook_endpoint = await client.WebhookEndpoint().load({ id: 'webhook_endpoint_id' })
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
evervault/
├── src/
│   ├── EvervaultSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { EvervaultSDK } from '@voxgig-sdk/evervault'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const merchant = client.Merchant()
await merchant.load({ id: "example_id" })

// merchant.data() now returns the merchant data from the last `load`
// merchant.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
