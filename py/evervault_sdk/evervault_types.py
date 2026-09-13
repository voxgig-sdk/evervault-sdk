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
    configurations: list
    default: bool
    id: str
    name: str


class Acquirer(AcquirerRequired, total=False):
    description: str


class AcquirerLoadMatch(TypedDict):
    id: str


class AcquirerCreateDataRequired(TypedDict):
    configurations: list
    default: bool
    id: str
    name: str


class AcquirerCreateData(AcquirerCreateDataRequired, total=False):
    description: str


class AcquirerUpdateDataRequired(TypedDict):
    id: str


class AcquirerUpdateData(AcquirerUpdateDataRequired, total=False):
    configurations: list
    default: bool
    description: str
    name: str


class BinLookup(TypedDict):
    number: str


class BinLookupCreateData(TypedDict):
    number: str


class CardRequired(TypedDict):
    address: dict
    card: dict
    expiry: dict
    month: str
    number: str
    year: str


class Card(CardRequired, total=False):
    cardholder: dict
    extensions: list
    id: str


class CardLoadMatch(TypedDict):
    id: str


class CardCreateDataRequired(TypedDict):
    address: dict
    card: dict
    expiry: dict
    month: str
    number: str
    year: str


class CardCreateData(CardCreateDataRequired, total=False):
    cardholder: dict
    extensions: list
    id: str


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
    destinationDomain: str
    routes: list
    token: str


class Core(CoreRequired, total=False):
    app: str
    authentication: str | None
    createdAt: int
    customDomain: str
    encryptEmptyStrings: bool
    evervaultDomain: str
    id: str
    phoneNumber: str
    relay: str
    status: str
    updatedAt: int
    validationRecord: str


class CoreListMatch(TypedDict, total=False):
    app: str
    authentication: str | None
    createdAt: int
    customDomain: str
    destinationDomain: str
    encryptEmptyStrings: bool
    evervaultDomain: str
    id: str
    phoneNumber: str
    relay: str
    routes: list
    status: str
    token: str
    updatedAt: int
    validationRecord: str


class CoreCreateDataRequired(TypedDict):
    destinationDomain: str
    routes: list
    token: str


class CoreCreateData(CoreCreateDataRequired, total=False):
    app: str
    authentication: str | None
    createdAt: int
    customDomain: str
    encryptEmptyStrings: bool
    evervaultDomain: str
    id: str
    phoneNumber: str
    relay: str
    status: str
    updatedAt: int
    validationRecord: str


class CoreRemoveMatchRequired(TypedDict):
    id: str


class CoreRemoveMatch(CoreRemoveMatchRequired, total=False):
    relay_id: str


class CustomDomain(TypedDict, total=False):
    createdAt: int
    customDomain: str
    id: str
    relay: str
    status: str
    updatedAt: int
    validationRecord: str


class CustomDomainLoadMatch(TypedDict):
    id: str
    relay_id: str


class CustomDomainCreateDataRequired(TypedDict):
    relay_id: str


class CustomDomainCreateData(CustomDomainCreateDataRequired, total=False):
    createdAt: int
    customDomain: str
    id: str
    relay: str
    status: str
    updatedAt: int
    validationRecord: str


class FunctionRunRequired(TypedDict):
    payload: dict


class FunctionRun(FunctionRunRequired, total=False):
    createdAt: int
    error: dict | None
    id: str
    result: dict
    status: str


class FunctionRunCreateDataRequired(TypedDict):
    function_name: str
    payload: dict


class FunctionRunCreateData(FunctionRunCreateDataRequired, total=False):
    createdAt: int
    error: dict | None
    id: str
    result: dict
    status: str


class MerchantRequired(TypedDict):
    createdAt: int
    id: str
    name: str
    website: str


class Merchant(MerchantRequired, total=False):
    applePay: dict
    business: dict
    categoryCode: str
    networkTokens: dict
    shortName: str
    updatedAt: int


class MerchantLoadMatch(TypedDict):
    id: str


class MerchantCreateDataRequired(TypedDict):
    createdAt: int
    id: str
    name: str
    website: str


class MerchantCreateData(MerchantCreateDataRequired, total=False):
    applePay: dict
    business: dict
    categoryCode: str
    networkTokens: dict
    shortName: str
    updatedAt: int


class MerchantUpdateDataRequired(TypedDict):
    id: str


class MerchantUpdateData(MerchantUpdateDataRequired, total=False):
    applePay: dict
    business: dict
    categoryCode: str
    createdAt: int
    name: str
    networkTokens: dict
    shortName: str
    updatedAt: int
    website: str


class NetworkTokenRequired(TypedDict):
    card: dict
    createdAt: int
    expiry: dict
    id: str
    merchant: str
    number: str
    status: str
    tokenRequestorIdentifier: str
    tokenServiceProvider: str


class NetworkToken(NetworkTokenRequired, total=False):
    paymentAccountReference: str
    updateType: str
    updatedAt: int


class NetworkTokenLoadMatch(TypedDict):
    id: str


class NetworkTokenCreateDataRequired(TypedDict):
    card: dict
    createdAt: int
    expiry: dict
    id: str
    merchant: str
    number: str
    status: str
    tokenRequestorIdentifier: str
    tokenServiceProvider: str


class NetworkTokenCreateData(NetworkTokenCreateDataRequired, total=False):
    paymentAccountReference: str
    updateType: str
    updatedAt: int


class NetworkTokenCryptogram(TypedDict, total=False):
    createdAt: int
    cryptogram: str
    id: str


class NetworkTokenCryptogramCreateDataRequired(TypedDict):
    id: str


class NetworkTokenCryptogramCreateData(NetworkTokenCryptogramCreateDataRequired, total=False):
    createdAt: int
    cryptogram: str


class PaymentRequired(TypedDict):
    configurations: list
    createdAt: int
    default: bool
    id: str
    name: str
    website: str


class Payment(PaymentRequired, total=False):
    applePay: dict
    business: dict
    categoryCode: str
    created_at: int
    data: dict
    description: str
    networkTokens: dict
    shortName: str
    type: str
    updatedAt: int


class PaymentListMatch(TypedDict):
    pass


class PaymentRemoveMatch(TypedDict):
    acquirer_id: str


class Relay(TypedDict, total=False):
    app: str
    authentication: str | None
    createdAt: int
    destinationDomain: str
    encryptEmptyStrings: bool
    evervaultDomain: str
    id: str
    routes: list
    updatedAt: int


class RelayLoadMatch(TypedDict):
    id: str


class RelayUpdateDataRequired(TypedDict):
    id: str


class RelayUpdateData(RelayUpdateDataRequired, total=False):
    app: str
    authentication: str | None
    createdAt: int
    destinationDomain: str
    encryptEmptyStrings: bool
    evervaultDomain: str
    routes: list
    updatedAt: int


class ThreeDsSessionRequired(TypedDict):
    acquirer: dict
    authentication: dict
    card: dict
    challenge: dict
    createdAt: int
    id: str
    merchant: dict
    nextAction: dict
    status: str
    version: str


class ThreeDsSession(ThreeDsSessionRequired, total=False):
    accessControlServer: dict
    ares: dict
    cres: None | dict
    cryptogram: str
    customer: dict
    directoryServer: dict
    eci: dict
    failureReason: str
    initiator: dict
    payment: dict
    preferredVersions: list
    rreq: None | dict
    threeDSServer: dict
    updatedAt: int


class ThreeDsSessionLoadMatch(TypedDict):
    pass


class ThreeDsSessionCreateDataRequired(TypedDict):
    acquirer: dict
    authentication: dict
    card: dict
    challenge: dict
    createdAt: int
    id: str
    merchant: dict
    nextAction: dict
    status: str
    version: str


class ThreeDsSessionCreateData(ThreeDsSessionCreateDataRequired, total=False):
    accessControlServer: dict
    ares: dict
    cres: None | dict
    cryptogram: str
    customer: dict
    directoryServer: dict
    eci: dict
    failureReason: str
    initiator: dict
    payment: dict
    preferredVersions: list
    rreq: None | dict
    threeDSServer: dict
    updatedAt: int


class WebhookRequired(TypedDict):
    events: list
    url: str


class Webhook(WebhookRequired, total=False):
    createdAt: int
    id: str
    updatedAt: int | None


class WebhookListMatch(TypedDict, total=False):
    limit: int
    starting_after: str


class WebhookCreateDataRequired(TypedDict):
    events: list
    url: str


class WebhookCreateData(WebhookCreateDataRequired, total=False):
    createdAt: int
    id: str
    updatedAt: int | None


class WebhookRemoveMatch(TypedDict):
    webhook_endpoint_id: str


class WebhookEndpoint(TypedDict, total=False):
    createdAt: int
    events: list
    id: str
    updatedAt: int | None
    url: str


class WebhookEndpointLoadMatch(TypedDict):
    id: str


class WebhookEndpointUpdateDataRequired(TypedDict):
    id: str


class WebhookEndpointUpdateData(WebhookEndpointUpdateDataRequired, total=False):
    createdAt: int
    events: list
    updatedAt: int | None
    url: str
