-- Typed models for the Evervault SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Acquirer
---@field configurations table
---@field default boolean
---@field description? string
---@field id string
---@field name string

---@class AcquirerLoadMatch
---@field id string

---@class AcquirerCreateData
---@field configurations table
---@field default boolean
---@field description? string
---@field id string
---@field name string

---@class AcquirerUpdateData
---@field id string
---@field configurations? table
---@field default? boolean
---@field description? string
---@field name? string

---@class BinLookup
---@field number string

---@class BinLookupCreateData
---@field number string

---@class Card
---@field address table
---@field card table
---@field cardholder? table
---@field expiry table
---@field extensions? table
---@field id? string
---@field month string
---@field number string
---@field year string

---@class CardLoadMatch
---@field id string

---@class CardCreateData
---@field address table
---@field card table
---@field cardholder? table
---@field expiry table
---@field extensions? table
---@field id? string
---@field month string
---@field number string
---@field year string

---@class CardArt
---@field data string
---@field height number
---@field type string
---@field width number

---@class CardArtLoadMatch
---@field network_token_id string

---@class ClientSideToken
---@field action string
---@field expiry? number
---@field payload? table

---@class ClientSideTokenCreateData
---@field action string
---@field expiry? number
---@field payload? table

---@class Core
---@field app? string
---@field authentication? string|nil
---@field createdAt? number
---@field customDomain? string
---@field destinationDomain string
---@field encryptEmptyStrings? boolean
---@field evervaultDomain? string
---@field id? string
---@field phoneNumber? string
---@field relay? string
---@field routes table
---@field status? string
---@field token string
---@field updatedAt? number
---@field validationRecord? string

---@class CoreListMatch
---@field app? string
---@field authentication? string|nil
---@field createdAt? number
---@field customDomain? string
---@field destinationDomain? string
---@field encryptEmptyStrings? boolean
---@field evervaultDomain? string
---@field id? string
---@field phoneNumber? string
---@field relay? string
---@field routes? table
---@field status? string
---@field token? string
---@field updatedAt? number
---@field validationRecord? string

---@class CoreCreateData
---@field app? string
---@field authentication? string|nil
---@field createdAt? number
---@field customDomain? string
---@field destinationDomain string
---@field encryptEmptyStrings? boolean
---@field evervaultDomain? string
---@field id? string
---@field phoneNumber? string
---@field relay? string
---@field routes table
---@field status? string
---@field token string
---@field updatedAt? number
---@field validationRecord? string

---@class CoreRemoveMatch
---@field id string
---@field relay_id? string

---@class CustomDomain
---@field createdAt? number
---@field customDomain? string
---@field id? string
---@field relay? string
---@field status? string
---@field updatedAt? number
---@field validationRecord? string

---@class CustomDomainLoadMatch
---@field id string
---@field relay_id string

---@class CustomDomainCreateData
---@field relay_id string
---@field createdAt? number
---@field customDomain? string
---@field id? string
---@field relay? string
---@field status? string
---@field updatedAt? number
---@field validationRecord? string

---@class FunctionRun
---@field async? boolean
---@field createdAt? number
---@field error? table|nil
---@field id? string
---@field payload table
---@field result? table
---@field status? string

---@class FunctionRunCreateData
---@field function_name string
---@field async? boolean
---@field createdAt? number
---@field error? table|nil
---@field id? string
---@field payload table
---@field result? table
---@field status? string

---@class Merchant
---@field applePay? table
---@field business? table
---@field categoryCode? string
---@field createdAt number
---@field id string
---@field name string
---@field networkTokens? table
---@field shortName? string
---@field updatedAt? number
---@field website string

---@class MerchantLoadMatch
---@field id string

---@class MerchantCreateData
---@field applePay? table
---@field business? table
---@field categoryCode? string
---@field createdAt number
---@field id string
---@field name string
---@field networkTokens? table
---@field shortName? string
---@field updatedAt? number
---@field website string

---@class MerchantUpdateData
---@field id string
---@field applePay? table
---@field business? table
---@field categoryCode? string
---@field createdAt? number
---@field name? string
---@field networkTokens? table
---@field shortName? string
---@field updatedAt? number
---@field website? string

---@class NetworkToken
---@field card table
---@field createdAt number
---@field expiry table
---@field id string
---@field merchant string
---@field number string
---@field paymentAccountReference? string
---@field status string
---@field tokenRequestorIdentifier string
---@field tokenServiceProvider string
---@field updateType? string
---@field updatedAt? number

---@class NetworkTokenLoadMatch
---@field id string

---@class NetworkTokenCreateData
---@field card table
---@field createdAt number
---@field expiry table
---@field id string
---@field merchant string
---@field number string
---@field paymentAccountReference? string
---@field status string
---@field tokenRequestorIdentifier string
---@field tokenServiceProvider string
---@field updateType? string
---@field updatedAt? number

---@class NetworkTokenCryptogram
---@field createdAt? number
---@field cryptogram? string
---@field id? string

---@class NetworkTokenCryptogramCreateData
---@field id string
---@field createdAt? number
---@field cryptogram? string

---@class Payment
---@field applePay? table
---@field business? table
---@field categoryCode? string
---@field configurations table
---@field createdAt number
---@field created_at? number
---@field data? table
---@field default boolean
---@field description? string
---@field id string
---@field name string
---@field networkTokens? table
---@field shortName? string
---@field type? string
---@field updatedAt? number
---@field website string

---@class PaymentListMatch
---@field ["3ds_session_id"] string

---@class PaymentRemoveMatch
---@field acquirer_id string

---@class Relay
---@field app? string
---@field authentication? string|nil
---@field createdAt? number
---@field destinationDomain? string
---@field encryptEmptyStrings? boolean
---@field evervaultDomain? string
---@field id? string
---@field routes? table
---@field updatedAt? number

---@class RelayLoadMatch
---@field id string

---@class RelayUpdateData
---@field id string
---@field app? string
---@field authentication? string|nil
---@field createdAt? number
---@field destinationDomain? string
---@field encryptEmptyStrings? boolean
---@field evervaultDomain? string
---@field routes? table
---@field updatedAt? number

---@class ThreeDsSession
---@field accessControlServer? table
---@field acquirer table
---@field ares? table
---@field authentication table
---@field card table
---@field challenge table
---@field createdAt number
---@field cres? nil|table
---@field cryptogram? string
---@field customer? table
---@field directoryServer? table
---@field eci? table
---@field failureReason? string
---@field id string
---@field initiator? table
---@field merchant table
---@field nextAction table
---@field payment? table
---@field preferredVersions? table
---@field rreq? nil|table
---@field status string
---@field threeDSServer? table
---@field updatedAt? number
---@field version string

---@class ThreeDsSessionLoadMatch
---@field ["3ds_session_id"] string

---@class ThreeDsSessionCreateData
---@field accessControlServer? table
---@field acquirer table
---@field ares? table
---@field authentication table
---@field card table
---@field challenge table
---@field createdAt number
---@field cres? nil|table
---@field cryptogram? string
---@field customer? table
---@field directoryServer? table
---@field eci? table
---@field failureReason? string
---@field id string
---@field initiator? table
---@field merchant table
---@field nextAction table
---@field payment? table
---@field preferredVersions? table
---@field rreq? nil|table
---@field status string
---@field threeDSServer? table
---@field updatedAt? number
---@field version string

---@class Webhook
---@field createdAt? number
---@field events table
---@field id? string
---@field updatedAt? number|nil
---@field url string

---@class WebhookListMatch
---@field createdAt? number
---@field events? table
---@field id? string
---@field updatedAt? number|nil
---@field url? string

---@class WebhookCreateData
---@field createdAt? number
---@field events table
---@field id? string
---@field updatedAt? number|nil
---@field url string

---@class WebhookRemoveMatch
---@field webhook_endpoint_id string

---@class WebhookEndpoint
---@field createdAt? number
---@field events? table
---@field id? string
---@field updatedAt? number|nil
---@field url? string

---@class WebhookEndpointLoadMatch
---@field id string

---@class WebhookEndpointUpdateData
---@field id string
---@field createdAt? number
---@field events? table
---@field updatedAt? number|nil
---@field url? string

local M = {}

return M
