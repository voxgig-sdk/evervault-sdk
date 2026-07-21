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
    public array $configuration;
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
    public array $configuration;
    public bool $default;
    public ?string $description = null;
    public string $id;
    public string $name;
}

/** Request payload for Acquirer#update. */
class AcquirerUpdateData
{
    public string $id;
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
    public ?string $automatic_update = null;
    public string $bin;
    public ?string $brand = null;
    public array $card;
    public ?array $cardholder = null;
    public ?string $country = null;
    public int $created_at;
    public ?string $currency = null;
    public array $expiry;
    public ?array $extension = null;
    public ?string $funding = null;
    public ?string $id = null;
    public ?string $issuer = null;
    public string $last_four;
    public string $number;
    public mixed $replacement = null;
    public ?string $segment = null;
    public ?string $status = null;
    public mixed $updated_at = null;
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
    public ?string $automatic_update = null;
    public string $bin;
    public ?string $brand = null;
    public array $card;
    public ?array $cardholder = null;
    public ?string $country = null;
    public int $created_at;
    public ?string $currency = null;
    public array $expiry;
    public ?array $extension = null;
    public ?string $funding = null;
    public ?string $id = null;
    public ?string $issuer = null;
    public string $last_four;
    public string $number;
    public mixed $replacement = null;
    public ?string $segment = null;
    public ?string $status = null;
    public mixed $updated_at = null;
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
    public ?string $category = null;
    public ?int $created_at = null;
    public ?string $custom_domain = null;
    public string $destination_domain;
    public ?bool $encrypt_empty_string = null;
    public ?int $encrypted_at = null;
    public ?string $evervault_domain = null;
    public ?string $fingerprint = null;
    public ?string $id = null;
    public mixed $metadata = null;
    public ?string $phone_number = null;
    public ?string $relay = null;
    public ?string $role = null;
    public array $route;
    public ?string $status = null;
    public string $token;
    public ?string $type = null;
    public ?int $updated_at = null;
    public ?string $validation_record = null;
}

/** Request payload for Core#list. */
class CoreListMatch
{
    public ?string $relay_id = null;
}

/** Request payload for Core#create. */
class CoreCreateData
{
    public ?string $app = null;
    public mixed $authentication = null;
    public ?string $category = null;
    public ?int $created_at = null;
    public ?string $custom_domain = null;
    public string $destination_domain;
    public ?bool $encrypt_empty_string = null;
    public ?int $encrypted_at = null;
    public ?string $evervault_domain = null;
    public ?string $fingerprint = null;
    public ?string $id = null;
    public mixed $metadata = null;
    public ?string $phone_number = null;
    public ?string $relay = null;
    public ?string $role = null;
    public array $route;
    public ?string $status = null;
    public string $token;
    public ?string $type = null;
    public ?int $updated_at = null;
    public ?string $validation_record = null;
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
    public ?int $created_at = null;
    public ?string $custom_domain = null;
    public ?string $id = null;
    public ?string $relay = null;
    public ?string $status = null;
    public ?int $updated_at = null;
    public ?string $validation_record = null;
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
}

/** FunctionRun entity data model. */
class FunctionRun
{
    public ?bool $async = null;
    public ?int $created_at = null;
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
}

/** Merchant entity data model. */
class Merchant
{
    public ?array $apple_pay = null;
    public ?array $business = null;
    public ?string $category_code = null;
    public int $created_at;
    public string $id;
    public string $name;
    public ?array $network_token = null;
    public ?string $short_name = null;
    public ?int $updated_at = null;
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
    public ?array $apple_pay = null;
    public ?array $business = null;
    public ?string $category_code = null;
    public int $created_at;
    public string $id;
    public string $name;
    public ?array $network_token = null;
    public ?string $short_name = null;
    public ?int $updated_at = null;
    public string $website;
}

/** Request payload for Merchant#update. */
class MerchantUpdateData
{
    public string $id;
}

/** NetworkToken entity data model. */
class NetworkToken
{
    public array $card;
    public int $created_at;
    public array $expiry;
    public string $id;
    public string $merchant;
    public string $number;
    public ?string $payment_account_reference = null;
    public string $status;
    public string $token_requestor_identifier;
    public string $token_service_provider;
    public ?string $update_type = null;
    public ?int $updated_at = null;
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
    public int $created_at;
    public array $expiry;
    public string $id;
    public string $merchant;
    public string $number;
    public ?string $payment_account_reference = null;
    public string $status;
    public string $token_requestor_identifier;
    public string $token_service_provider;
    public ?string $update_type = null;
    public ?int $updated_at = null;
}

/** NetworkTokenCryptogram entity data model. */
class NetworkTokenCryptogram
{
    public ?int $created_at = null;
    public ?string $cryptogram = null;
    public ?string $id = null;
}

/** Request payload for NetworkTokenCryptogram#create. */
class NetworkTokenCryptogramCreateData
{
    public string $id;
}

/** Payment entity data model. */
class Payment
{
    public ?array $apple_pay = null;
    public ?array $business = null;
    public ?string $category_code = null;
    public array $configuration;
    public int $created_at;
    public ?array $data = null;
    public bool $default;
    public ?string $description = null;
    public string $id;
    public string $name;
    public ?array $network_token = null;
    public ?string $short_name = null;
    public ?string $type = null;
    public ?int $updated_at = null;
    public string $website;
}

/** Request payload for Payment#list. */
class PaymentListMatch
{
}

/** Request payload for Payment#remove. */
class PaymentRemoveMatch
{
    public ?string $acquirer_id = null;
    public ?string $card_id = null;
    public ?string $merchant_id = null;
    public ?string $network_token_id = null;
}

/** Relay entity data model. */
class Relay
{
    public ?string $app = null;
    public mixed $authentication = null;
    public ?int $created_at = null;
    public ?string $destination_domain = null;
    public ?bool $encrypt_empty_string = null;
    public ?string $evervault_domain = null;
    public ?string $id = null;
    public ?array $route = null;
    public ?int $updated_at = null;
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
}

/** ThreeDsSession entity data model. */
class ThreeDsSession
{
    public ?array $access_control_server = null;
    public array $acquirer;
    public ?array $are = null;
    public array $authentication;
    public array $card;
    public array $challenge;
    public mixed $cre = null;
    public int $created_at;
    public ?string $cryptogram = null;
    public ?array $customer = null;
    public ?array $directory_server = null;
    public ?array $eci = null;
    public ?string $failure_reason = null;
    public string $id;
    public ?array $initiator = null;
    public array $merchant;
    public array $next_action;
    public ?array $payment = null;
    public ?array $preferred_version = null;
    public mixed $rreq = null;
    public string $status;
    public ?array $three_ds_server = null;
    public ?int $updated_at = null;
    public string $version;
}

/** Request payload for ThreeDsSession#load. */
class ThreeDsSessionLoadMatch
{
}

/** Request payload for ThreeDsSession#create. */
class ThreeDsSessionCreateData
{
    public ?array $access_control_server = null;
    public array $acquirer;
    public ?array $are = null;
    public array $authentication;
    public array $card;
    public array $challenge;
    public mixed $cre = null;
    public int $created_at;
    public ?string $cryptogram = null;
    public ?array $customer = null;
    public ?array $directory_server = null;
    public ?array $eci = null;
    public ?string $failure_reason = null;
    public string $id;
    public ?array $initiator = null;
    public array $merchant;
    public array $next_action;
    public ?array $payment = null;
    public ?array $preferred_version = null;
    public mixed $rreq = null;
    public string $status;
    public ?array $three_ds_server = null;
    public ?int $updated_at = null;
    public string $version;
}

/** Webhook entity data model. */
class Webhook
{
    public ?int $created_at = null;
    public array $event;
    public ?string $id = null;
    public mixed $updated_at = null;
    public string $url;
}

/** Request payload for Webhook#list. */
class WebhookListMatch
{
    public ?int $created_at = null;
    public ?array $event = null;
    public ?string $id = null;
    public mixed $updated_at = null;
    public ?string $url = null;
}

/** Request payload for Webhook#create. */
class WebhookCreateData
{
    public ?int $created_at = null;
    public array $event;
    public ?string $id = null;
    public mixed $updated_at = null;
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
    public ?int $created_at = null;
    public ?array $event = null;
    public ?string $id = null;
    public mixed $updated_at = null;
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
}

