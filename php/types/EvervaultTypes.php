<?php
declare(strict_types=1);

// Typed models for the Evervault SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Acquirer entity data model. */
class Acquirer
{
    public array $configurations;
    public bool $default;
    public ?string $description = null;
    public string $id;
    public string $name;
}

/** Request payload for Acquirer#load. */
class AcquirerLoadMatch
{
    public string $id;
}

/** Request payload for Acquirer#create. */
class AcquirerCreateData
{
    public array $configurations;
    public bool $default;
    public ?string $description = null;
    public string $id;
    public string $name;
}

/** Request payload for Acquirer#update. */
class AcquirerUpdateData
{
    public string $id;
    public ?array $configurations = null;
    public ?bool $default = null;
    public ?string $description = null;
    public ?string $name = null;
}

/** BinLookup entity data model. */
class BinLookup
{
    public string $number;
}

/** Request payload for BinLookup#create. */
class BinLookupCreateData
{
    public string $number;
}

/** Card entity data model. */
class Card
{
    public array $address;
    public array $card;
    public ?array $cardholder = null;
    public array $expiry;
    public ?array $extensions = null;
    public string $month;
    public string $number;
    public string $year;
}

/** Request payload for Card#load. */
class CardLoadMatch
{
    public string $id;
}

/** Request payload for Card#create. */
class CardCreateData
{
    public array $address;
    public array $card;
    public ?array $cardholder = null;
    public array $expiry;
    public ?array $extensions = null;
    public string $month;
    public string $number;
    public string $year;
}

/** CardArt entity data model. */
class CardArt
{
    public string $data;
    public int $height;
    public string $type;
    public int $width;
}

/** Request payload for CardArt#load. */
class CardArtLoadMatch
{
    public string $network_token_id;
}

/** ClientSideToken entity data model. */
class ClientSideToken
{
    public string $action;
    public ?int $expiry = null;
    public ?array $payload = null;
}

/** Request payload for ClientSideToken#create. */
class ClientSideTokenCreateData
{
    public string $action;
    public ?int $expiry = null;
    public ?array $payload = null;
}

/** Core entity data model. */
class Core
{
    public ?string $app = null;
    public mixed $authentication = null;
    public ?int $createdAt = null;
    public ?string $customDomain = null;
    public string $destinationDomain;
    public ?bool $encryptEmptyStrings = null;
    public ?string $evervaultDomain = null;
    public ?string $id = null;
    public ?string $phoneNumber = null;
    public ?string $relay = null;
    public array $routes;
    public ?string $status = null;
    public string $token;
    public ?int $updatedAt = null;
    public ?string $validationRecord = null;
}

/** Request payload for Core#list. */
class CoreListMatch
{
    public ?string $app = null;
    public mixed $authentication = null;
    public ?int $createdAt = null;
    public ?string $customDomain = null;
    public ?string $destinationDomain = null;
    public ?bool $encryptEmptyStrings = null;
    public ?string $evervaultDomain = null;
    public ?string $id = null;
    public ?string $phoneNumber = null;
    public ?string $relay = null;
    public ?array $routes = null;
    public ?string $status = null;
    public ?string $token = null;
    public ?int $updatedAt = null;
    public ?string $validationRecord = null;
}

/** Request payload for Core#create. */
class CoreCreateData
{
    public ?string $app = null;
    public mixed $authentication = null;
    public ?int $createdAt = null;
    public ?string $customDomain = null;
    public string $destinationDomain;
    public ?bool $encryptEmptyStrings = null;
    public ?string $evervaultDomain = null;
    public ?string $id = null;
    public ?string $phoneNumber = null;
    public ?string $relay = null;
    public array $routes;
    public ?string $status = null;
    public string $token;
    public ?int $updatedAt = null;
    public ?string $validationRecord = null;
}

/** Request payload for Core#remove. */
class CoreRemoveMatch
{
    public string $id;
    public ?string $relay_id = null;
}

/** CustomDomain entity data model. */
class CustomDomain
{
    public ?int $createdAt = null;
    public ?string $customDomain = null;
    public ?string $id = null;
    public ?string $relay = null;
    public ?string $status = null;
    public ?int $updatedAt = null;
    public ?string $validationRecord = null;
}

/** Request payload for CustomDomain#load. */
class CustomDomainLoadMatch
{
    public string $id;
    public string $relay_id;
}

/** Request payload for CustomDomain#create. */
class CustomDomainCreateData
{
    public string $relay_id;
    public ?int $createdAt = null;
    public ?string $customDomain = null;
    public ?string $id = null;
    public ?string $relay = null;
    public ?string $status = null;
    public ?int $updatedAt = null;
    public ?string $validationRecord = null;
}

/** FunctionRun entity data model. */
class FunctionRun
{
    public ?bool $async = null;
    public ?int $createdAt = null;
    public mixed $error = null;
    public ?string $id = null;
    public array $payload;
    public ?array $result = null;
    public ?string $status = null;
}

/** Request payload for FunctionRun#create. */
class FunctionRunCreateData
{
    public string $function_name;
    public ?bool $async = null;
    public ?int $createdAt = null;
    public mixed $error = null;
    public ?string $id = null;
    public array $payload;
    public ?array $result = null;
    public ?string $status = null;
}

/** Merchant entity data model. */
class Merchant
{
    public ?array $applePay = null;
    public ?array $business = null;
    public ?string $categoryCode = null;
    public int $createdAt;
    public string $id;
    public string $name;
    public ?array $networkTokens = null;
    public ?string $shortName = null;
    public ?int $updatedAt = null;
    public string $website;
}

/** Request payload for Merchant#load. */
class MerchantLoadMatch
{
    public string $id;
}

/** Request payload for Merchant#create. */
class MerchantCreateData
{
    public ?array $applePay = null;
    public ?array $business = null;
    public ?string $categoryCode = null;
    public int $createdAt;
    public string $id;
    public string $name;
    public ?array $networkTokens = null;
    public ?string $shortName = null;
    public ?int $updatedAt = null;
    public string $website;
}

/** Request payload for Merchant#update. */
class MerchantUpdateData
{
    public string $id;
    public ?array $applePay = null;
    public ?array $business = null;
    public ?string $categoryCode = null;
    public ?int $createdAt = null;
    public ?string $name = null;
    public ?array $networkTokens = null;
    public ?string $shortName = null;
    public ?int $updatedAt = null;
    public ?string $website = null;
}

/** NetworkToken entity data model. */
class NetworkToken
{
    public array $card;
    public int $createdAt;
    public array $expiry;
    public string $id;
    public string $merchant;
    public string $number;
    public ?string $paymentAccountReference = null;
    public string $status;
    public string $tokenRequestorIdentifier;
    public string $tokenServiceProvider;
    public ?string $updateType = null;
    public ?int $updatedAt = null;
}

/** Request payload for NetworkToken#load. */
class NetworkTokenLoadMatch
{
    public string $id;
}

/** Request payload for NetworkToken#create. */
class NetworkTokenCreateData
{
    public array $card;
    public int $createdAt;
    public array $expiry;
    public string $id;
    public string $merchant;
    public string $number;
    public ?string $paymentAccountReference = null;
    public string $status;
    public string $tokenRequestorIdentifier;
    public string $tokenServiceProvider;
    public ?string $updateType = null;
    public ?int $updatedAt = null;
}

/** NetworkTokenCryptogram entity data model. */
class NetworkTokenCryptogram
{
    public ?int $createdAt = null;
    public ?string $cryptogram = null;
    public ?string $id = null;
}

/** Request payload for NetworkTokenCryptogram#create. */
class NetworkTokenCryptogramCreateData
{
    public string $id;
    public ?int $createdAt = null;
    public ?string $cryptogram = null;
}

/** Payment entity data model. */
class Payment
{
    public ?array $applePay = null;
    public ?array $business = null;
    public ?string $categoryCode = null;
    public array $configurations;
    public int $createdAt;
    public ?int $created_at = null;
    public ?array $data = null;
    public bool $default;
    public ?string $description = null;
    public string $id;
    public string $name;
    public ?array $networkTokens = null;
    public ?string $shortName = null;
    public ?string $type = null;
    public ?int $updatedAt = null;
    public string $website;
}

/** Request payload for Payment#list. */
class PaymentListMatch
{
}

/** Request payload for Payment#remove. */
class PaymentRemoveMatch
{
    public string $acquirer_id;
}

/** Relay entity data model. */
class Relay
{
    public ?string $app = null;
    public mixed $authentication = null;
    public ?int $createdAt = null;
    public ?string $destinationDomain = null;
    public ?bool $encryptEmptyStrings = null;
    public ?string $evervaultDomain = null;
    public ?string $id = null;
    public ?array $routes = null;
    public ?int $updatedAt = null;
}

/** Request payload for Relay#load. */
class RelayLoadMatch
{
    public string $id;
}

/** Request payload for Relay#update. */
class RelayUpdateData
{
    public string $id;
    public ?string $app = null;
    public mixed $authentication = null;
    public ?int $createdAt = null;
    public ?string $destinationDomain = null;
    public ?bool $encryptEmptyStrings = null;
    public ?string $evervaultDomain = null;
    public ?array $routes = null;
    public ?int $updatedAt = null;
}

/** ThreeDsSession entity data model. */
class ThreeDsSession
{
    public ?array $accessControlServer = null;
    public array $acquirer;
    public ?array $ares = null;
    public array $authentication;
    public array $card;
    public array $challenge;
    public int $createdAt;
    public mixed $cres = null;
    public ?string $cryptogram = null;
    public ?array $customer = null;
    public ?array $directoryServer = null;
    public ?array $eci = null;
    public ?string $failureReason = null;
    public string $id;
    public ?array $initiator = null;
    public array $merchant;
    public array $nextAction;
    public ?array $payment = null;
    public ?array $preferredVersions = null;
    public mixed $rreq = null;
    public string $status;
    public ?array $threeDSServer = null;
    public ?int $updatedAt = null;
    public string $version;
}

/** Request payload for ThreeDsSession#load. */
class ThreeDsSessionLoadMatch
{
}

/** Request payload for ThreeDsSession#create. */
class ThreeDsSessionCreateData
{
    public ?array $accessControlServer = null;
    public array $acquirer;
    public ?array $ares = null;
    public array $authentication;
    public array $card;
    public array $challenge;
    public int $createdAt;
    public mixed $cres = null;
    public ?string $cryptogram = null;
    public ?array $customer = null;
    public ?array $directoryServer = null;
    public ?array $eci = null;
    public ?string $failureReason = null;
    public string $id;
    public ?array $initiator = null;
    public array $merchant;
    public array $nextAction;
    public ?array $payment = null;
    public ?array $preferredVersions = null;
    public mixed $rreq = null;
    public string $status;
    public ?array $threeDSServer = null;
    public ?int $updatedAt = null;
    public string $version;
}

/** Webhook entity data model. */
class Webhook
{
    public ?int $createdAt = null;
    public array $events;
    public ?string $id = null;
    public mixed $updatedAt = null;
    public string $url;
}

/** Request payload for Webhook#list. */
class WebhookListMatch
{
    public ?int $createdAt = null;
    public ?array $events = null;
    public ?string $id = null;
    public mixed $updatedAt = null;
    public ?string $url = null;
}

/** Request payload for Webhook#create. */
class WebhookCreateData
{
    public ?int $createdAt = null;
    public array $events;
    public ?string $id = null;
    public mixed $updatedAt = null;
    public string $url;
}

/** Request payload for Webhook#remove. */
class WebhookRemoveMatch
{
    public string $webhook_endpoint_id;
}

/** WebhookEndpoint entity data model. */
class WebhookEndpoint
{
    public ?int $createdAt = null;
    public ?array $events = null;
    public ?string $id = null;
    public mixed $updatedAt = null;
    public ?string $url = null;
}

/** Request payload for WebhookEndpoint#load. */
class WebhookEndpointLoadMatch
{
    public string $id;
}

/** Request payload for WebhookEndpoint#update. */
class WebhookEndpointUpdateData
{
    public string $id;
    public ?int $createdAt = null;
    public ?array $events = null;
    public mixed $updatedAt = null;
    public ?string $url = null;
}

