# Typed models for the Evervault SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AcquirerRequired(TypedDict):
    configuration: list
    default: bool
    id: str
    name: str


class Acquirer(AcquirerRequired, total=False):
    description: str


class AcquirerLoadMatch(TypedDict):
    id: str


class AcquirerCreateDataRequired(TypedDict):
    configuration: list
    default: bool
    id: str
    name: str


class AcquirerCreateData(AcquirerCreateDataRequired, total=False):
    description: str


class AcquirerUpdateData(TypedDict):
    id: str


class BinLookup(TypedDict):
    number: str


class BinLookupCreateData(TypedDict):
    number: str


class CardRequired(TypedDict):
    address: dict
    bin: str
    card: dict
    created_at: int
    expiry: dict
    last_four: str
    number: str


class Card(CardRequired, total=False):
    automatic_update: str
    brand: str
    cardholder: dict
    country: str
    currency: str
    extension: list
    funding: str
    id: str
    issuer: str
    replacement: str | None
    segment: str
    status: str
    updated_at: int | None


class CardLoadMatch(TypedDict):
    id: str


class CardCreateDataRequired(TypedDict):
    address: dict
    bin: str
    card: dict
    created_at: int
    expiry: dict
    last_four: str
    number: str


class CardCreateData(CardCreateDataRequired, total=False):
    automatic_update: str
    brand: str
    cardholder: dict
    country: str
    currency: str
    extension: list
    funding: str
    id: str
    issuer: str
    replacement: str | None
    segment: str
    status: str
    updated_at: int | None


class CardArt(TypedDict):
    data: str
    height: int
    type: str
    width: int


class CardArtLoadMatch(TypedDict):
    network_token_id: str


class ClientSideTokenRequired(TypedDict):
    action: str


class ClientSideToken(ClientSideTokenRequired, total=False):
    expiry: int
    payload: dict


class ClientSideTokenCreateDataRequired(TypedDict):
    action: str


class ClientSideTokenCreateData(ClientSideTokenCreateDataRequired, total=False):
    expiry: int
    payload: dict


class CoreRequired(TypedDict):
    destination_domain: str
    route: list
    token: str


class Core(CoreRequired, total=False):
    app: str
    authentication: str | None
    category: str
    created_at: int
    custom_domain: str
    encrypt_empty_string: bool
    encrypted_at: int
    evervault_domain: str
    fingerprint: str
    id: str
    metadata: Any
    phone_number: str
    relay: str
    role: str
    status: str
    type: str
    updated_at: int
    validation_record: str


class CoreListMatch(TypedDict, total=False):
    relay_id: str


class CoreCreateDataRequired(TypedDict):
    destination_domain: str
    route: list
    token: str


class CoreCreateData(CoreCreateDataRequired, total=False):
    app: str
    authentication: str | None
    category: str
    created_at: int
    custom_domain: str
    encrypt_empty_string: bool
    encrypted_at: int
    evervault_domain: str
    fingerprint: str
    id: str
    metadata: Any
    phone_number: str
    relay: str
    role: str
    status: str
    type: str
    updated_at: int
    validation_record: str


class CoreRemoveMatchRequired(TypedDict):
    id: str


class CoreRemoveMatch(CoreRemoveMatchRequired, total=False):
    relay_id: str


class CustomDomain(TypedDict, total=False):
    created_at: int
    custom_domain: str
    id: str
    relay: str
    status: str
    updated_at: int
    validation_record: str


class CustomDomainLoadMatch(TypedDict):
    id: str
    relay_id: str


class CustomDomainCreateData(TypedDict):
    relay_id: str


class FunctionRunRequired(TypedDict):
    payload: dict


class FunctionRun(FunctionRunRequired, total=False):
    created_at: int
    error: dict | None
    id: str
    result: dict
    status: str


class FunctionRunCreateData(TypedDict):
    function_name: str


class MerchantRequired(TypedDict):
    created_at: int
    id: str
    name: str
    website: str


class Merchant(MerchantRequired, total=False):
    apple_pay: dict
    business: dict
    category_code: str
    network_token: dict
    short_name: str
    updated_at: int


class MerchantLoadMatch(TypedDict):
    id: str


class MerchantCreateDataRequired(TypedDict):
    created_at: int
    id: str
    name: str
    website: str


class MerchantCreateData(MerchantCreateDataRequired, total=False):
    apple_pay: dict
    business: dict
    category_code: str
    network_token: dict
    short_name: str
    updated_at: int


class MerchantUpdateData(TypedDict):
    id: str


class NetworkTokenRequired(TypedDict):
    card: dict
    created_at: int
    expiry: dict
    id: str
    merchant: str
    number: str
    status: str
    token_requestor_identifier: str
    token_service_provider: str


class NetworkToken(NetworkTokenRequired, total=False):
    payment_account_reference: str
    update_type: str
    updated_at: int


class NetworkTokenLoadMatch(TypedDict):
    id: str


class NetworkTokenCreateDataRequired(TypedDict):
    card: dict
    created_at: int
    expiry: dict
    id: str
    merchant: str
    number: str
    status: str
    token_requestor_identifier: str
    token_service_provider: str


class NetworkTokenCreateData(NetworkTokenCreateDataRequired, total=False):
    payment_account_reference: str
    update_type: str
    updated_at: int


class NetworkTokenCryptogram(TypedDict, total=False):
    created_at: int
    cryptogram: str
    id: str


class NetworkTokenCryptogramCreateData(TypedDict):
    id: str


class PaymentRequired(TypedDict):
    configuration: list
    created_at: int
    default: bool
    id: str
    name: str
    website: str


class Payment(PaymentRequired, total=False):
    apple_pay: dict
    business: dict
    category_code: str
    data: dict
    description: str
    network_token: dict
    short_name: str
    type: str
    updated_at: int


class PaymentListMatch(TypedDict):
    pass


class PaymentRemoveMatch(TypedDict, total=False):
    acquirer_id: str
    card_id: str
    merchant_id: str
    network_token_id: str


class Relay(TypedDict, total=False):
    app: str
    authentication: str | None
    created_at: int
    destination_domain: str
    encrypt_empty_string: bool
    evervault_domain: str
    id: str
    route: list
    updated_at: int


class RelayLoadMatch(TypedDict):
    id: str


class RelayUpdateData(TypedDict):
    id: str


class ThreeDsSessionRequired(TypedDict):
    acquirer: dict
    authentication: dict
    card: dict
    challenge: dict
    created_at: int
    id: str
    merchant: dict
    next_action: dict
    status: str
    version: str


class ThreeDsSession(ThreeDsSessionRequired, total=False):
    access_control_server: dict
    are: dict
    cre: None | dict
    cryptogram: str
    customer: dict
    directory_server: dict
    eci: dict
    failure_reason: str
    initiator: dict
    payment: dict
    preferred_version: list
    rreq: None | dict
    three_ds_server: dict
    updated_at: int


class ThreeDsSessionLoadMatch(TypedDict):
    pass


class ThreeDsSessionCreateDataRequired(TypedDict):
    acquirer: dict
    authentication: dict
    card: dict
    challenge: dict
    created_at: int
    id: str
    merchant: dict
    next_action: dict
    status: str
    version: str


class ThreeDsSessionCreateData(ThreeDsSessionCreateDataRequired, total=False):
    access_control_server: dict
    are: dict
    cre: None | dict
    cryptogram: str
    customer: dict
    directory_server: dict
    eci: dict
    failure_reason: str
    initiator: dict
    payment: dict
    preferred_version: list
    rreq: None | dict
    three_ds_server: dict
    updated_at: int


class WebhookRequired(TypedDict):
    event: list
    url: str


class Webhook(WebhookRequired, total=False):
    created_at: int
    id: str
    updated_at: int | None


class WebhookListMatch(TypedDict, total=False):
    created_at: int
    event: list
    id: str
    updated_at: int | None
    url: str


class WebhookCreateDataRequired(TypedDict):
    event: list
    url: str


class WebhookCreateData(WebhookCreateDataRequired, total=False):
    created_at: int
    id: str
    updated_at: int | None


class WebhookRemoveMatch(TypedDict):
    webhook_endpoint_id: str


class WebhookEndpoint(TypedDict, total=False):
    created_at: int
    event: list
    id: str
    updated_at: int | None
    url: str


class WebhookEndpointLoadMatch(TypedDict):
    id: str


class WebhookEndpointUpdateData(TypedDict):
    id: str
