-- Typed models for the Evervault SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Acquirer
---@field configuration table
---@field default boolean
---@field description? string
---@field id string
---@field name string

---@class AcquirerLoadMatch
---@field id string

---@class AcquirerCreateData
---@field configuration table
---@field default boolean
---@field description? string
---@field id string
---@field name string

---@class AcquirerUpdateData
---@field id string

---@class BinLookup
---@field number string

---@class BinLookupCreateData
---@field number string

---@class Card
---@field address table
---@field automatic_update? string
---@field bin string
---@field brand? string
---@field card table
---@field cardholder? table
---@field country? string
---@field created_at number
---@field currency? string
---@field expiry table
---@field extension? table
---@field funding? string
---@field id? string
---@field issuer? string
---@field last_four string
---@field number string
---@field replacement? any
---@field segment? string
---@field status? string
---@field updated_at? any

---@class CardLoadMatch
---@field id string

---@class CardCreateData
---@field address table
---@field automatic_update? string
---@field bin string
---@field brand? string
---@field card table
---@field cardholder? table
---@field country? string
---@field created_at number
---@field currency? string
---@field expiry table
---@field extension? table
---@field funding? string
---@field id? string
---@field issuer? string
---@field last_four string
---@field number string
---@field replacement? any
---@field segment? string
---@field status? string
---@field updated_at? any

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
---@field authentication? any
---@field category? string
---@field created_at? number
---@field custom_domain? string
---@field destination_domain string
---@field encrypt_empty_string? boolean
---@field encrypted_at? number
---@field evervault_domain? string
---@field fingerprint? string
---@field id? string
---@field metadata? any
---@field phone_number? string
---@field relay? string
---@field role? string
---@field route table
---@field status? string
---@field token string
---@field type? string
---@field updated_at? number
---@field validation_record? string

---@class CoreListMatch
---@field relay_id? string

---@class CoreCreateData
---@field app? string
---@field authentication? any
---@field category? string
---@field created_at? number
---@field custom_domain? string
---@field destination_domain string
---@field encrypt_empty_string? boolean
---@field encrypted_at? number
---@field evervault_domain? string
---@field fingerprint? string
---@field id? string
---@field metadata? any
---@field phone_number? string
---@field relay? string
---@field role? string
---@field route table
---@field status? string
---@field token string
---@field type? string
---@field updated_at? number
---@field validation_record? string

---@class CoreRemoveMatch
---@field id string
---@field relay_id? string

---@class CustomDomain
---@field created_at? number
---@field custom_domain? string
---@field id? string
---@field relay? string
---@field status? string
---@field updated_at? number
---@field validation_record? string

---@class CustomDomainLoadMatch
---@field id string
---@field relay_id string

---@class CustomDomainCreateData
---@field relay_id string

---@class FunctionRun
---@field async? boolean
---@field created_at? number
---@field error? any
---@field id? string
---@field payload table
---@field result? table
---@field status? string

---@class FunctionRunCreateData
---@field function_name string

---@class Merchant
---@field apple_pay? table
---@field business? table
---@field category_code? string
---@field created_at number
---@field id string
---@field name string
---@field network_token? table
---@field short_name? string
---@field updated_at? number
---@field website string

---@class MerchantLoadMatch
---@field id string

---@class MerchantCreateData
---@field apple_pay? table
---@field business? table
---@field category_code? string
---@field created_at number
---@field id string
---@field name string
---@field network_token? table
---@field short_name? string
---@field updated_at? number
---@field website string

---@class MerchantUpdateData
---@field id string

---@class NetworkToken
---@field card table
---@field created_at number
---@field expiry table
---@field id string
---@field merchant string
---@field number string
---@field payment_account_reference? string
---@field status string
---@field token_requestor_identifier string
---@field token_service_provider string
---@field update_type? string
---@field updated_at? number

---@class NetworkTokenLoadMatch
---@field id string

---@class NetworkTokenCreateData
---@field card table
---@field created_at number
---@field expiry table
---@field id string
---@field merchant string
---@field number string
---@field payment_account_reference? string
---@field status string
---@field token_requestor_identifier string
---@field token_service_provider string
---@field update_type? string
---@field updated_at? number

---@class NetworkTokenCryptogram
---@field created_at? number
---@field cryptogram? string
---@field id? string

---@class NetworkTokenCryptogramCreateData
---@field id string

---@class Payment
---@field apple_pay? table
---@field business? table
---@field category_code? string
---@field configuration table
---@field created_at number
---@field data? table
---@field default boolean
---@field description? string
---@field id string
---@field name string
---@field network_token? table
---@field short_name? string
---@field type? string
---@field updated_at? number
---@field website string

---@class PaymentListMatch
---@field ["3ds_session_id"] string

---@class PaymentRemoveMatch
---@field acquirer_id? string
---@field card_id? string
---@field merchant_id? string
---@field network_token_id? string

---@class Relay
---@field app? string
---@field authentication? any
---@field created_at? number
---@field destination_domain? string
---@field encrypt_empty_string? boolean
---@field evervault_domain? string
---@field id? string
---@field route? table
---@field updated_at? number

---@class RelayLoadMatch
---@field id string

---@class RelayUpdateData
---@field id string

---@class ThreeDsSession
---@field access_control_server? table
---@field acquirer table
---@field are? table
---@field authentication table
---@field card table
---@field challenge table
---@field cre? any
---@field created_at number
---@field cryptogram? string
---@field customer? table
---@field directory_server? table
---@field eci? table
---@field failure_reason? string
---@field id string
---@field initiator? table
---@field merchant table
---@field next_action table
---@field payment? table
---@field preferred_version? table
---@field rreq? any
---@field status string
---@field three_ds_server? table
---@field updated_at? number
---@field version string

---@class ThreeDsSessionLoadMatch
---@field ["3ds_session_id"] string

---@class ThreeDsSessionCreateData
---@field access_control_server? table
---@field acquirer table
---@field are? table
---@field authentication table
---@field card table
---@field challenge table
---@field cre? any
---@field created_at number
---@field cryptogram? string
---@field customer? table
---@field directory_server? table
---@field eci? table
---@field failure_reason? string
---@field id string
---@field initiator? table
---@field merchant table
---@field next_action table
---@field payment? table
---@field preferred_version? table
---@field rreq? any
---@field status string
---@field three_ds_server? table
---@field updated_at? number
---@field version string

---@class Webhook
---@field created_at? number
---@field event table
---@field id? string
---@field updated_at? any
---@field url string

---@class WebhookListMatch
---@field created_at? number
---@field event? table
---@field id? string
---@field updated_at? any
---@field url? string

---@class WebhookCreateData
---@field created_at? number
---@field event table
---@field id? string
---@field updated_at? any
---@field url string

---@class WebhookRemoveMatch
---@field webhook_endpoint_id string

---@class WebhookEndpoint
---@field created_at? number
---@field event? table
---@field id? string
---@field updated_at? any
---@field url? string

---@class WebhookEndpointLoadMatch
---@field id string

---@class WebhookEndpointUpdateData
---@field id string

local M = {}

return M
