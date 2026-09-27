# Evervault API

The Evervault API allows developers to interact programmatically with their Evervault apps using HTTP requests.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 16 entities and 44 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Acquirer](docs/api/acquirer.html)

Results: Returns the created Acquirer object.; Returns an Acquirer object.; Returns the updated Acquirer object.

SDK operations: `create`, `load`, `update`.

Key fields to recognise:

- `configurations`: The acquirer configuration settings.
- `default`: Specifies whether this Acquirer is the default.
- `description`: The description of the acquirer configuration.
- `id`: The unique identifier of the acquirer configuration.
- `name`: The name of the acquirer configuration.

### [BinLookup](docs/api/bin_lookup.html)

Results: Returns BIN details for the provided card number.

SDK operations: `create`.

Key fields to recognise:

- `number`: The card number for which the BIN lookup is being requested.

### [Card](docs/api/card.html)

Results: Returns the updated Card object.; Returns the Card Insight object; Returns an existing Card object. If the card number is already registered but with a different expiry date, the date is updated to the value in the request before the Card object is returned.; Returns a new Card object.; Returns an existing Card object.

SDK operations: `create`, `load`.

Key fields to recognise:

- `address`: The match code for the address portion of the AVS (excludes zip code)
- `card`: The card details.
- `cardholder`: Details about the cardholder that the name verification (ANI) is for.
- `expiry`: The expiry date of the card.
- `extensions`: The extensions to the card insight request.

### [CardArt](docs/api/card_art.html)

Results: Returns the card art for the Network Token.

SDK operations: `load`.

Key fields to recognise:

- `data`: The base64-encoded image data of the card art.
- `height`: The height of the card art image in pixels.
- `type`: The MIME type of the card art image.
- `width`: The width of the card art image in pixels.

### [ClientSideToken](docs/api/client_side_token.html)

Results: A client side token and its expiry.

SDK operations: `create`.

Key fields to recognise:

- `action`: The action that the token should permit
- `expiry`: The expiry of the token in unix millis format
- `payload`: The payload that the token must be used with

### [Core](docs/api/core.html)

Results: A decrypted JSON value or file.; An encrypted JSON object or file; The metadata of the encrypted data that was submitted for inspection.; The Relay has been created; The Relay&#39;s custom domains have been fetched.; The App&#39;s Relays have been fetched.; The custom domain has been deleted; The Relay has been deleted.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `app`: The unique identifier for the app to which the Relay belongs.
- `authentication`: The type of authentication required for the Relay
- `createdAt`: The exact time, in epoch milliseconds, when this Relay was created.
- `customDomain`: The customer managed domain to which requests to be relayed to your domain should be sent.
- `destinationDomain`: The domain in front of which the Relay should be configured.

### [CustomDomain](docs/api/custom_domain.html)

Results: The custom domain has been created; The custom domain has been fetched.

SDK operations: `create`, `load`.

Key fields to recognise:

- `createdAt`: The exact time, in epoch milliseconds, when this custom domain was created.
- `customDomain`: The customer managed domain to which requests to be relayed to your domain should be sent.
- `id`: The unique identifier for the custom domain.
- `relay`: The ID of the Relay with which this custom domain is associated.
- `status`: The status of the domains DNS verification.

### [FunctionRun](docs/api/function_run.html)

Results: The Function run has completed; The asynchronous Function invocation has been queued.

SDK operations: `create`.

Key fields to recognise:

- `async`: If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code.
- `createdAt`: The exact time, in epoch milliseconds, when this Function execution was triggered.
- `error`: This field details any error that occurred during Function execution. This is present only if the status is &#39;failure&#39;.
- `id`: A unique identifier representing this specific Function execution instance.
- `payload`: The data payload that the Function will use during its execution.

### [Merchant](docs/api/merchant.html)

Results: Returns a Merchant object.; Returns the updated Merchant object.

SDK operations: `create`, `load`, `update`.

Key fields to recognise:

- `applePay`: The Merchant&#39;s Apple Pay configuration.
- `business`: The business details of the Merchant.
- `categoryCode`: The 4-digit Merchant Category Code (MCC).
- `createdAt`: The exact time, in epoch milliseconds, when this Merchant was created.
- `id`: A unique identifier assigned to each Merchant.

### [NetworkToken](docs/api/network_token.html)

Results: Returns the updated Network Token object.; Returns a Network Token object.

SDK operations: `create`, `load`.

Key fields to recognise:

- `card`: The details of the underlying encrypted card.
- `createdAt`: The exact time, in epoch milliseconds, when this Network Token was created.
- `expiry`: The expiry details of the Network Token.
- `id`: A unique identifier representing a specific Network Token.
- `merchant`: The unique identifier of the Merchant associated with this Network Token.

### [NetworkTokenCryptogram](docs/api/network_token_cryptogram.html)

Results: Returns a Network Token Cryptogram object.

SDK operations: `create`.

Key fields to recognise:

- `createdAt`: The exact time, in epoch milliseconds, when this Network Token Cryptogram was created.
- `cryptogram`: The value of the Network Token Cryptogram. This is the value that is used embedded in the Authorization request.
- `id`: A unique identifier representing a specific Network Token Cryptogram.

### [Payment](docs/api/payment.html)

Results: Returns a list of Merchant objects.; Returns a list of Acquirer objects.; Returns 3DS messages for the session.; Acquirer successfully deleted.; Deletes a Card object.; Merchant successfully deleted.; Deletes a Network Token object.

SDK operations: `list`, `remove`.

Key fields to recognise:

- `created_at`: Timestamp when the message was created
- `data`: The message data payload
- `type`: The type of 3DS message (for example, AReq, ARes, CReq, CRes, RReq, RRes)

### [Relay](docs/api/relay.html)

Results: The Relay has been fetched.; The Relay has been updated.

SDK operations: `load`, `update`.

Key fields to recognise:

- `app`: The unique identifier for the app to which the Relay belongs.
- `authentication`: The type of authentication required for the Relay
- `createdAt`: The exact time, in epoch milliseconds, when this Relay was created.
- `destinationDomain`: The domain in front of which the Relay should be configured.
- `encryptEmptyStrings`: Whether or not empty strings should be encrypted.

### [ThreeDsSession](docs/api/three_ds_session.html)

Results: Returns a 3DS Session object.

SDK operations: `create`, `load`.

Key fields to recognise:

- `accessControlServer`: Details about the Access Control Server involved in the 3DS transaction.
- `acquirer`: The acquirer of the payment.
- `ares`: The details of the 3DS Authentication Response (ARes).
- `authentication`: The details of the 3DS Authentication. This field is present when the status is `success`.
- `card`: The card details.

### [Webhook](docs/api/webhook.html)

Results: The Webhook Endpoint was created successfully.; The Webhook Endpoints were retrieved successfully.; The Webhook Endpoint was successfully deleted.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `createdAt`: The exact time, in epoch milliseconds, when this Webhook Endpoint was created.
- `events`: A list of Events that the Webhook Endpoint is subscribed to. The Webhook will receive a POST request when any of these Events occur.
- `id`: A unique identifier representing a specific Webhook Endpoint.
- `updatedAt`: The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated.
- `url`: The URL of the Webhook Endpoint.

### [WebhookEndpoint](docs/api/webhook_endpoint.html)

Results: The Webhook Endpoint was retrieved successfully.; The Webhook Endpoint was updated successfully.

SDK operations: `load`, `update`.

Key fields to recognise:

- `createdAt`: The exact time, in epoch milliseconds, when this Webhook Endpoint was created.
- `events`: A list of Events that the Webhook Endpoint is subscribed to. The Webhook will receive a POST request when any of these Events occur.
- `id`: A unique identifier representing a specific Webhook Endpoint.
- `updatedAt`: The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated.
- `url`: The URL of the Webhook Endpoint.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Acquirer](docs/api/acquirer.html) | `create` | `POST /payments/acquirers` | Required |
| [Acquirer](docs/api/acquirer.html) | `load` | `GET /payments/acquirers/{acquirer_id}` | Required |
| [Acquirer](docs/api/acquirer.html) | `update` | `PATCH /payments/acquirers/{acquirer_id}` | Required |
| [BinLookup](docs/api/bin_lookup.html) | `create` | `POST /payments/bin-lookups` | Required |
| [Card](docs/api/card.html) | `create` | `POST /payments/cards/{card_id}/simulate` | Required |
| [Card](docs/api/card.html) | `create` | `POST /insights/cards` | Required |
| [Card](docs/api/card.html) | `create` | `POST /payments/cards` | Required |
| [Card](docs/api/card.html) | `load` | `GET /payments/cards/{card_id}` | Required |
| [CardArt](docs/api/card_art.html) | `load` | `GET /payments/network-tokens/{network_token_id}/card-art` | Required |
| [ClientSideToken](docs/api/client_side_token.html) | `create` | `POST /client-side-tokens` | Required |
| [Core](docs/api/core.html) | `create` | `POST /decrypt` | Required |
| [Core](docs/api/core.html) | `create` | `POST /encrypt` | Required |
| [Core](docs/api/core.html) | `create` | `POST /inspect` | Required |
| [Core](docs/api/core.html) | `create` | `POST /relays` | Required |
| [Core](docs/api/core.html) | `list` | `GET /relays/{relay_id}/custom-domains` | Required |
| [Core](docs/api/core.html) | `list` | `GET /relays` | Required |
| [Core](docs/api/core.html) | `remove` | `DELETE /relays/{relay_id}/custom-domains/{id}` | Required |
| [Core](docs/api/core.html) | `remove` | `DELETE /relays/{id}` | Required |
| [CustomDomain](docs/api/custom_domain.html) | `create` | `POST /relays/{relay_id}/custom-domains` | Required |
| [CustomDomain](docs/api/custom_domain.html) | `load` | `GET /relays/{relay_id}/custom-domains/{id}` | Required |
| [FunctionRun](docs/api/function_run.html) | `create` | `POST /functions/{function_name}/runs` | Required |
| [Merchant](docs/api/merchant.html) | `create` | `POST /payments/merchants` | Required |
| [Merchant](docs/api/merchant.html) | `load` | `GET /payments/merchants/{merchant_id}` | Required |
| [Merchant](docs/api/merchant.html) | `update` | `PATCH /payments/merchants/{merchant_id}` | Required |
| [NetworkToken](docs/api/network_token.html) | `create` | `POST /payments/network-tokens/{network_token_id}/simulate` | Required |
| [NetworkToken](docs/api/network_token.html) | `create` | `POST /payments/network-tokens` | Required |
| [NetworkToken](docs/api/network_token.html) | `load` | `GET /payments/network-tokens/{network_token_id}` | Required |
| [NetworkTokenCryptogram](docs/api/network_token_cryptogram.html) | `create` | `POST /payments/network-tokens/{network_token_id}/cryptograms` | Required |
| [Payment](docs/api/payment.html) | `list` | `GET /payments/merchants` | Required |
| [Payment](docs/api/payment.html) | `list` | `GET /payments/acquirers` | Required |
| [Payment](docs/api/payment.html) | `list` | `GET /payments/3ds-sessions/{3ds_session_id}/messages` | Required |
| [Payment](docs/api/payment.html) | `remove` | `DELETE /payments/acquirers/{acquirer_id}` | Required |
| [Payment](docs/api/payment.html) | `remove` | `DELETE /payments/cards/{card_id}` | Required |
| [Payment](docs/api/payment.html) | `remove` | `DELETE /payments/merchants/{merchant_id}` | Required |
| [Payment](docs/api/payment.html) | `remove` | `DELETE /payments/network-tokens/{network_token_id}` | Required |
| [Relay](docs/api/relay.html) | `load` | `GET /relays/{id}` | Required |
| [Relay](docs/api/relay.html) | `update` | `PATCH /relays/{id}` | Required |
| [ThreeDsSession](docs/api/three_ds_session.html) | `create` | `POST /payments/3ds-sessions` | Required |
| [ThreeDsSession](docs/api/three_ds_session.html) | `load` | `GET /payments/3ds-sessions/{3ds_session_id}` | Required |
| [Webhook](docs/api/webhook.html) | `create` | `POST /webhook-endpoints` | Required |
| [Webhook](docs/api/webhook.html) | `list` | `GET /webhook-endpoints` | Required |
| [Webhook](docs/api/webhook.html) | `remove` | `DELETE /webhook-endpoints/{webhook_endpoint_id}` | Required |
| [WebhookEndpoint](docs/api/webhook_endpoint.html) | `load` | `GET /webhook-endpoints/{webhook_endpoint_id}` | Required |
| [WebhookEndpoint](docs/api/webhook_endpoint.html) | `update` | `PATCH /webhook-endpoints/{webhook_endpoint_id}` | Required |

## Connect to the API

- The Evervault API server: `https://api.evervault.com`

The default credential is sent in the `Authorization` header with the `Basic` prefix.

Authentication using an API key. The username is the App ID and the password is the Api Key.

Authentication using a short lived run token that you can share with clients. The Authorization header must be formatted as follow: &quot;RunToken &lt;Function Run Token&gt;&quot;

Authentication using a short lived token that you can share with clients. The Authorization header must be formatted as follow: &quot;Token &lt;Client-Side Token&gt;&quot;

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [Ruby](docs/sdks/rb.html) | `rb/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `evervault_list`: List records for an entity. Supported entities: `core`, `payment`, `webhook`.
- `evervault_load`: Load one record for an entity. Supported entities: `acquirer`, `card`, `card_art`, `custom_domain`, `merchant`, `network_token`, `relay`, `three_ds_session`, `webhook_endpoint`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

