# Evervault API

The Evervault API allows developers to interact programmatically with their Evervault apps using HTTP requests.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 16 entities and 44 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Acquirer

Results: Returns the created Acquirer object.; Returns a list of Acquirer objects.; Returns an Acquirer object.; Returns the updated Acquirer object.

SDK operations: `create`, `list`, `load`, `update`.

Key fields to recognise:

- `configurations`: The acquirer configuration settings.
- `default`: Specifies whether this Acquirer is the default.
- `description`: The description of the acquirer configuration.
- `id`: The unique identifier of the acquirer configuration.
- `name`: The name of the acquirer configuration.

### BinLookup

Results: Returns BIN details for the provided card number.

SDK operations: `create`.

Key fields to recognise:

- `number`: The card number for which the BIN lookup is being requested.

### Card

Results: Returns the updated Card object.; Returns the Card Insight object; Returns an existing Card object. If the card number is already registered but with a different expiry date, the date is updated to the value in the request before the Card object is returned.; Returns a new Card object.; Returns an existing Card object.

SDK operations: `create`, `load`.

Key fields to recognise:

- `address`: The match code for the address portion of the AVS (excludes zip code)
- `automaticUpdates`: The status of Card Account Updater on this card. Evervault currently supports Card Account Updates for Visa, Mastercard and American Express cards.
- `bin`: The first 6 or 8 digits of the card number.
- `brand`: The card brand associated with the payment card.
- `card`: The card details.

### CardArt

Results: Returns the card art for the Network Token.

SDK operations: `load`.

Key fields to recognise:

- `data`: The base64-encoded image data of the card art.
- `height`: The height of the card art image in pixels.
- `type`: The MIME type of the card art image.
- `width`: The width of the card art image in pixels.

### ClientSideToken

Results: A client side token and its expiry.

SDK operations: `create`.

Key fields to recognise:

- `action`: The action that the token should permit
- `expiry`: The expiry of the token in unix millis format
- `payload`: The payload that the token must be used with

### Core

Results: A decrypted JSON value or file.; An encrypted JSON object or file; The metadata of the encrypted data that was submitted for inspection.; The Relay&#39;s custom domains have been fetched.; The custom domain has been deleted; The Relay has been deleted.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `category`: The category or specific nature of the encrypted value.
- `core_list`: A JSON value or file to be encrypted.
- `cores`: A JSON value or file to be decrypted.
- `createdAt`: The exact time, in epoch milliseconds, when this custom domain was created.
- `customDomain`: The customer managed domain to which requests to be relayed to your domain should be sent.

### CustomDomain

Results: The custom domain has been created; The custom domain has been fetched.

SDK operations: `create`, `load`.

Key fields to recognise:

- `createdAt`: The exact time, in epoch milliseconds, when this custom domain was created.
- `customDomain`: The customer managed domain to which requests to be relayed to your domain should be sent.
- `id`: The unique identifier for the custom domain.
- `relay`: The ID of the Relay with which this custom domain is associated.
- `status`: The status of the domains DNS verification.

### FunctionRun

Results: The Function run has completed; The asynchronous Function invocation has been queued.

SDK operations: `create`.

Key fields to recognise:

- `async`: If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code.
- `createdAt`: The exact time, in epoch milliseconds, when this Function execution was triggered.
- `error`: This field details any error that occurred during Function execution. This is present only if the status is &#39;failure&#39;.
- `id`: A unique identifier representing this specific Function execution instance.
- `payload`: The data payload that the Function will use during its execution.

### Merchant

Results: Returns a Merchant object.; Returns a list of Merchant objects.; Returns the updated Merchant object.

SDK operations: `create`, `list`, `load`, `update`.

Key fields to recognise:

- `applePay`: The Merchant&#39;s Apple Pay configuration.
- `business`: The business details of the Merchant.
- `categoryCode`: The 4-digit Merchant Category Code (MCC).
- `createdAt`: The exact time, in epoch milliseconds, when this Merchant was created.
- `id`: A unique identifier assigned to each Merchant.

### NetworkToken

Results: Returns the updated Network Token object.; Returns a Network Token object.

SDK operations: `create`, `load`.

Key fields to recognise:

- `card`: The details of the underlying encrypted card.
- `createdAt`: The exact time, in epoch milliseconds, when this Network Token was created.
- `expiry`: The expiry details of the Network Token.
- `id`: A unique identifier representing a specific Network Token.
- `merchant`: The unique identifier of the Merchant associated with this Network Token.

### NetworkTokenCryptogram

Results: Returns a Network Token Cryptogram object.

SDK operations: `create`.

Key fields to recognise:

- `createdAt`: The exact time, in epoch milliseconds, when this Network Token Cryptogram was created.
- `cryptogram`: The value of the Network Token Cryptogram. This is the value that is used embedded in the Authorization request.
- `id`: A unique identifier representing a specific Network Token Cryptogram.

### Payment

Results: Returns 3DS messages for the session.; Acquirer successfully deleted.; Deletes a Card object.; Merchant successfully deleted.; Deletes a Network Token object.

SDK operations: `list`, `remove`.

Key fields to recognise:

- `created_at`: Timestamp when the message was created
- `data`: The message data payload
- `type`: The type of 3DS message (for example, AReq, ARes, CReq, CRes, RReq, RRes)

### Relay

Results: The Relay has been created; The App&#39;s Relays have been fetched.; The Relay has been fetched.; The Relay has been updated.

SDK operations: `create`, `list`, `load`, `update`.

Key fields to recognise:

- `app`: The unique identifier for the app to which the Relay belongs.
- `authentication`: The type of authentication required for the Relay
- `createdAt`: The exact time, in epoch milliseconds, when this Relay was created.
- `destinationDomain`: The domain in front of which the Relay should be configured.
- `encryptEmptyStrings`: Whether or not empty strings should be encrypted.

### ThreeDsSession

Results: Returns a 3DS Session object.

SDK operations: `create`, `load`.

Key fields to recognise:

- `accessControlServer`: Details about the Access Control Server involved in the 3DS transaction.
- `acquirer`: The acquirer of the payment.
- `ares`: The details of the 3DS Authentication Response (ARes).
- `authentication`: The details of the 3DS Authentication. This field is present when the status is `success`.
- `card`: The card details.

### Webhook

Results: The Webhook Endpoint was successfully deleted.

SDK operations: `remove`.

### WebhookEndpoint

Results: The Webhook Endpoint was created successfully.; The Webhook Endpoints were retrieved successfully.; The Webhook Endpoint was retrieved successfully.; The Webhook Endpoint was updated successfully.

SDK operations: `create`, `list`, `load`, `update`.

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
| Acquirer | `create` | `POST /payments/acquirers` | Required |
| Acquirer | `list` | `GET /payments/acquirers` | Required |
| Acquirer | `load` | `GET /payments/acquirers/{acquirer_id}` | Required |
| Acquirer | `update` | `PATCH /payments/acquirers/{acquirer_id}` | Required |
| BinLookup | `create` | `POST /payments/bin-lookups` | Required |
| Card | `create` | `POST /payments/cards/{card_id}/simulate` | Required |
| Card | `create` | `POST /insights/cards` | Required |
| Card | `create` | `POST /payments/cards` | Required |
| Card | `load` | `GET /payments/cards/{card_id}` | Required |
| CardArt | `load` | `GET /payments/network-tokens/{network_token_id}/card-art` | Required |
| ClientSideToken | `create` | `POST /client-side-tokens` | Required |
| Core | `create` | `POST /decrypt` | Required |
| Core | `create` | `POST /encrypt` | Required |
| Core | `create` | `POST /inspect` | Required |
| Core | `list` | `GET /relays/{relay_id}/custom-domains` | Required |
| Core | `remove` | `DELETE /relays/{relay_id}/custom-domains/{id}` | Required |
| Core | `remove` | `DELETE /relays/{id}` | Required |
| CustomDomain | `create` | `POST /relays/{relay_id}/custom-domains` | Required |
| CustomDomain | `load` | `GET /relays/{relay_id}/custom-domains/{id}` | Required |
| FunctionRun | `create` | `POST /functions/{function_name}/runs` | Required |
| Merchant | `create` | `POST /payments/merchants` | Required |
| Merchant | `list` | `GET /payments/merchants` | Required |
| Merchant | `load` | `GET /payments/merchants/{merchant_id}` | Required |
| Merchant | `update` | `PATCH /payments/merchants/{merchant_id}` | Required |
| NetworkToken | `create` | `POST /payments/network-tokens/{network_token_id}/simulate` | Required |
| NetworkToken | `create` | `POST /payments/network-tokens` | Required |
| NetworkToken | `load` | `GET /payments/network-tokens/{network_token_id}` | Required |
| NetworkTokenCryptogram | `create` | `POST /payments/network-tokens/{network_token_id}/cryptograms` | Required |
| Payment | `list` | `GET /payments/3ds-sessions/{3ds_session_id}/messages` | Required |
| Payment | `remove` | `DELETE /payments/acquirers/{acquirer_id}` | Required |
| Payment | `remove` | `DELETE /payments/cards/{card_id}` | Required |
| Payment | `remove` | `DELETE /payments/merchants/{merchant_id}` | Required |
| Payment | `remove` | `DELETE /payments/network-tokens/{network_token_id}` | Required |
| Relay | `create` | `POST /relays` | Required |
| Relay | `list` | `GET /relays` | Required |
| Relay | `load` | `GET /relays/{id}` | Required |
| Relay | `update` | `PATCH /relays/{id}` | Required |
| ThreeDsSession | `create` | `POST /payments/3ds-sessions` | Required |
| ThreeDsSession | `load` | `GET /payments/3ds-sessions/{3ds_session_id}` | Required |
| Webhook | `remove` | `DELETE /webhook-endpoints/{webhook_endpoint_id}` | Required |
| WebhookEndpoint | `create` | `POST /webhook-endpoints` | Required |
| WebhookEndpoint | `list` | `GET /webhook-endpoints` | Required |
| WebhookEndpoint | `load` | `GET /webhook-endpoints/{webhook_endpoint_id}` | Required |
| WebhookEndpoint | `update` | `PATCH /webhook-endpoints/{webhook_endpoint_id}` | Required |

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
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `evervault_list`: List records for an entity. Supported entities: `acquirer`, `core`, `merchant`, `payment`, `relay`, `webhook_endpoint`.
- `evervault_load`: Load one record for an entity. Supported entities: `acquirer`, `card`, `card_art`, `custom_domain`, `merchant`, `network_token`, `relay`, `three_ds_session`, `webhook_endpoint`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `debug`: Request/response capture ring buffer for debugging
- `idempotency`: Idempotency keys for safe retries of mutating operations
- `metrics`: Statistics capture: per-operation counters and latency
- `paging`: Pagination signals for list operations
- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

