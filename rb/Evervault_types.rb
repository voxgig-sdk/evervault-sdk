# frozen_string_literal: true

# Typed models for the Evervault SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Acquirer entity data model.
#
# @!attribute [rw] configuration
#   @return [Array]
#
# @!attribute [rw] default
#   @return [Boolean]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
Acquirer = Struct.new(
  :configuration,
  :default,
  :description,
  :id,
  :name,
  keyword_init: true
)

# Request payload for Acquirer#load.
#
# @!attribute [rw] id
#   @return [String]
AcquirerLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Acquirer#create.
#
# @!attribute [rw] configuration
#   @return [Array]
#
# @!attribute [rw] default
#   @return [Boolean]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
AcquirerCreateData = Struct.new(
  :configuration,
  :default,
  :description,
  :id,
  :name,
  keyword_init: true
)

# Request payload for Acquirer#update.
#
# @!attribute [rw] id
#   @return [String]
AcquirerUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# BinLookup entity data model.
#
# @!attribute [rw] number
#   @return [String]
BinLookup = Struct.new(
  :number,
  keyword_init: true
)

# Request payload for BinLookup#create.
#
# @!attribute [rw] number
#   @return [String]
BinLookupCreateData = Struct.new(
  :number,
  keyword_init: true
)

# Card entity data model.
#
# @!attribute [rw] address
#   @return [Hash]
#
# @!attribute [rw] automatic_update
#   @return [String, nil]
#
# @!attribute [rw] bin
#   @return [String]
#
# @!attribute [rw] brand
#   @return [String, nil]
#
# @!attribute [rw] card
#   @return [Hash]
#
# @!attribute [rw] cardholder
#   @return [Hash, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [Integer]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] expiry
#   @return [Hash]
#
# @!attribute [rw] extension
#   @return [Array, nil]
#
# @!attribute [rw] funding
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] issuer
#   @return [String, nil]
#
# @!attribute [rw] last_four
#   @return [String]
#
# @!attribute [rw] number
#   @return [String]
#
# @!attribute [rw] replacement
#   @return [Object, nil]
#
# @!attribute [rw] segment
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [Object, nil]
Card = Struct.new(
  :address,
  :automatic_update,
  :bin,
  :brand,
  :card,
  :cardholder,
  :country,
  :created_at,
  :currency,
  :expiry,
  :extension,
  :funding,
  :id,
  :issuer,
  :last_four,
  :number,
  :replacement,
  :segment,
  :status,
  :updated_at,
  keyword_init: true
)

# Request payload for Card#load.
#
# @!attribute [rw] id
#   @return [String]
CardLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Card#create.
#
# @!attribute [rw] address
#   @return [Hash]
#
# @!attribute [rw] automatic_update
#   @return [String, nil]
#
# @!attribute [rw] bin
#   @return [String]
#
# @!attribute [rw] brand
#   @return [String, nil]
#
# @!attribute [rw] card
#   @return [Hash]
#
# @!attribute [rw] cardholder
#   @return [Hash, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [Integer]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] expiry
#   @return [Hash]
#
# @!attribute [rw] extension
#   @return [Array, nil]
#
# @!attribute [rw] funding
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] issuer
#   @return [String, nil]
#
# @!attribute [rw] last_four
#   @return [String]
#
# @!attribute [rw] number
#   @return [String]
#
# @!attribute [rw] replacement
#   @return [Object, nil]
#
# @!attribute [rw] segment
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [Object, nil]
CardCreateData = Struct.new(
  :address,
  :automatic_update,
  :bin,
  :brand,
  :card,
  :cardholder,
  :country,
  :created_at,
  :currency,
  :expiry,
  :extension,
  :funding,
  :id,
  :issuer,
  :last_four,
  :number,
  :replacement,
  :segment,
  :status,
  :updated_at,
  keyword_init: true
)

# CardArt entity data model.
#
# @!attribute [rw] data
#   @return [String]
#
# @!attribute [rw] height
#   @return [Integer]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] width
#   @return [Integer]
CardArt = Struct.new(
  :data,
  :height,
  :type,
  :width,
  keyword_init: true
)

# Request payload for CardArt#load.
#
# @!attribute [rw] network_token_id
#   @return [String]
CardArtLoadMatch = Struct.new(
  :network_token_id,
  keyword_init: true
)

# ClientSideToken entity data model.
#
# @!attribute [rw] action
#   @return [String]
#
# @!attribute [rw] expiry
#   @return [Integer, nil]
#
# @!attribute [rw] payload
#   @return [Hash, nil]
ClientSideToken = Struct.new(
  :action,
  :expiry,
  :payload,
  keyword_init: true
)

# Request payload for ClientSideToken#create.
#
# @!attribute [rw] action
#   @return [String]
#
# @!attribute [rw] expiry
#   @return [Integer, nil]
#
# @!attribute [rw] payload
#   @return [Hash, nil]
ClientSideTokenCreateData = Struct.new(
  :action,
  :expiry,
  :payload,
  keyword_init: true
)

# Core entity data model.
#
# @!attribute [rw] app
#   @return [String, nil]
#
# @!attribute [rw] authentication
#   @return [Object, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [Integer, nil]
#
# @!attribute [rw] custom_domain
#   @return [String, nil]
#
# @!attribute [rw] destination_domain
#   @return [String]
#
# @!attribute [rw] encrypt_empty_string
#   @return [Boolean, nil]
#
# @!attribute [rw] encrypted_at
#   @return [Integer, nil]
#
# @!attribute [rw] evervault_domain
#   @return [String, nil]
#
# @!attribute [rw] fingerprint
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Object, nil]
#
# @!attribute [rw] phone_number
#   @return [String, nil]
#
# @!attribute [rw] relay
#   @return [String, nil]
#
# @!attribute [rw] role
#   @return [String, nil]
#
# @!attribute [rw] route
#   @return [Array]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [Integer, nil]
#
# @!attribute [rw] validation_record
#   @return [String, nil]
Core = Struct.new(
  :app,
  :authentication,
  :category,
  :created_at,
  :custom_domain,
  :destination_domain,
  :encrypt_empty_string,
  :encrypted_at,
  :evervault_domain,
  :fingerprint,
  :id,
  :metadata,
  :phone_number,
  :relay,
  :role,
  :route,
  :status,
  :token,
  :type,
  :updated_at,
  :validation_record,
  keyword_init: true
)

# Request payload for Core#list.
#
# @!attribute [rw] relay_id
#   @return [String, nil]
CoreListMatch = Struct.new(
  :relay_id,
  keyword_init: true
)

# Request payload for Core#create.
#
# @!attribute [rw] app
#   @return [String, nil]
#
# @!attribute [rw] authentication
#   @return [Object, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [Integer, nil]
#
# @!attribute [rw] custom_domain
#   @return [String, nil]
#
# @!attribute [rw] destination_domain
#   @return [String]
#
# @!attribute [rw] encrypt_empty_string
#   @return [Boolean, nil]
#
# @!attribute [rw] encrypted_at
#   @return [Integer, nil]
#
# @!attribute [rw] evervault_domain
#   @return [String, nil]
#
# @!attribute [rw] fingerprint
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Object, nil]
#
# @!attribute [rw] phone_number
#   @return [String, nil]
#
# @!attribute [rw] relay
#   @return [String, nil]
#
# @!attribute [rw] role
#   @return [String, nil]
#
# @!attribute [rw] route
#   @return [Array]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [Integer, nil]
#
# @!attribute [rw] validation_record
#   @return [String, nil]
CoreCreateData = Struct.new(
  :app,
  :authentication,
  :category,
  :created_at,
  :custom_domain,
  :destination_domain,
  :encrypt_empty_string,
  :encrypted_at,
  :evervault_domain,
  :fingerprint,
  :id,
  :metadata,
  :phone_number,
  :relay,
  :role,
  :route,
  :status,
  :token,
  :type,
  :updated_at,
  :validation_record,
  keyword_init: true
)

# Request payload for Core#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] relay_id
#   @return [String, nil]
CoreRemoveMatch = Struct.new(
  :id,
  :relay_id,
  keyword_init: true
)

# CustomDomain entity data model.
#
# @!attribute [rw] created_at
#   @return [Integer, nil]
#
# @!attribute [rw] custom_domain
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] relay
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [Integer, nil]
#
# @!attribute [rw] validation_record
#   @return [String, nil]
CustomDomain = Struct.new(
  :created_at,
  :custom_domain,
  :id,
  :relay,
  :status,
  :updated_at,
  :validation_record,
  keyword_init: true
)

# Request payload for CustomDomain#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] relay_id
#   @return [String]
CustomDomainLoadMatch = Struct.new(
  :id,
  :relay_id,
  keyword_init: true
)

# Request payload for CustomDomain#create.
#
# @!attribute [rw] relay_id
#   @return [String]
CustomDomainCreateData = Struct.new(
  :relay_id,
  keyword_init: true
)

# FunctionRun entity data model.
#
# @!attribute [rw] async
#   @return [Boolean, nil]
#
# @!attribute [rw] created_at
#   @return [Integer, nil]
#
# @!attribute [rw] error
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] payload
#   @return [Hash]
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
FunctionRun = Struct.new(
  :async,
  :created_at,
  :error,
  :id,
  :payload,
  :result,
  :status,
  keyword_init: true
)

# Request payload for FunctionRun#create.
#
# @!attribute [rw] function_name
#   @return [String]
FunctionRunCreateData = Struct.new(
  :function_name,
  keyword_init: true
)

# Merchant entity data model.
#
# @!attribute [rw] apple_pay
#   @return [Hash, nil]
#
# @!attribute [rw] business
#   @return [Hash, nil]
#
# @!attribute [rw] category_code
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] network_token
#   @return [Hash, nil]
#
# @!attribute [rw] short_name
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [Integer, nil]
#
# @!attribute [rw] website
#   @return [String]
Merchant = Struct.new(
  :apple_pay,
  :business,
  :category_code,
  :created_at,
  :id,
  :name,
  :network_token,
  :short_name,
  :updated_at,
  :website,
  keyword_init: true
)

# Request payload for Merchant#load.
#
# @!attribute [rw] id
#   @return [String]
MerchantLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Merchant#create.
#
# @!attribute [rw] apple_pay
#   @return [Hash, nil]
#
# @!attribute [rw] business
#   @return [Hash, nil]
#
# @!attribute [rw] category_code
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] network_token
#   @return [Hash, nil]
#
# @!attribute [rw] short_name
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [Integer, nil]
#
# @!attribute [rw] website
#   @return [String]
MerchantCreateData = Struct.new(
  :apple_pay,
  :business,
  :category_code,
  :created_at,
  :id,
  :name,
  :network_token,
  :short_name,
  :updated_at,
  :website,
  keyword_init: true
)

# Request payload for Merchant#update.
#
# @!attribute [rw] id
#   @return [String]
MerchantUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# NetworkToken entity data model.
#
# @!attribute [rw] card
#   @return [Hash]
#
# @!attribute [rw] created_at
#   @return [Integer]
#
# @!attribute [rw] expiry
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] merchant
#   @return [String]
#
# @!attribute [rw] number
#   @return [String]
#
# @!attribute [rw] payment_account_reference
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] token_requestor_identifier
#   @return [String]
#
# @!attribute [rw] token_service_provider
#   @return [String]
#
# @!attribute [rw] update_type
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [Integer, nil]
NetworkToken = Struct.new(
  :card,
  :created_at,
  :expiry,
  :id,
  :merchant,
  :number,
  :payment_account_reference,
  :status,
  :token_requestor_identifier,
  :token_service_provider,
  :update_type,
  :updated_at,
  keyword_init: true
)

# Request payload for NetworkToken#load.
#
# @!attribute [rw] id
#   @return [String]
NetworkTokenLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for NetworkToken#create.
#
# @!attribute [rw] card
#   @return [Hash]
#
# @!attribute [rw] created_at
#   @return [Integer]
#
# @!attribute [rw] expiry
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] merchant
#   @return [String]
#
# @!attribute [rw] number
#   @return [String]
#
# @!attribute [rw] payment_account_reference
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] token_requestor_identifier
#   @return [String]
#
# @!attribute [rw] token_service_provider
#   @return [String]
#
# @!attribute [rw] update_type
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [Integer, nil]
NetworkTokenCreateData = Struct.new(
  :card,
  :created_at,
  :expiry,
  :id,
  :merchant,
  :number,
  :payment_account_reference,
  :status,
  :token_requestor_identifier,
  :token_service_provider,
  :update_type,
  :updated_at,
  keyword_init: true
)

# NetworkTokenCryptogram entity data model.
#
# @!attribute [rw] created_at
#   @return [Integer, nil]
#
# @!attribute [rw] cryptogram
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
NetworkTokenCryptogram = Struct.new(
  :created_at,
  :cryptogram,
  :id,
  keyword_init: true
)

# Request payload for NetworkTokenCryptogram#create.
#
# @!attribute [rw] id
#   @return [String]
NetworkTokenCryptogramCreateData = Struct.new(
  :id,
  keyword_init: true
)

# Payment entity data model.
#
# @!attribute [rw] apple_pay
#   @return [Hash, nil]
#
# @!attribute [rw] business
#   @return [Hash, nil]
#
# @!attribute [rw] category_code
#   @return [String, nil]
#
# @!attribute [rw] configuration
#   @return [Array]
#
# @!attribute [rw] created_at
#   @return [Integer]
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] default
#   @return [Boolean]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] network_token
#   @return [Hash, nil]
#
# @!attribute [rw] short_name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [Integer, nil]
#
# @!attribute [rw] website
#   @return [String]
Payment = Struct.new(
  :apple_pay,
  :business,
  :category_code,
  :configuration,
  :created_at,
  :data,
  :default,
  :description,
  :id,
  :name,
  :network_token,
  :short_name,
  :type,
  :updated_at,
  :website,
  keyword_init: true
)

# Request payload for Payment#list.
#
# @!attribute [rw] 3ds_session_id
#   @return [String]
PaymentListMatch = Struct.new(
  :"3ds_session_id",
  keyword_init: true
)

# Request payload for Payment#remove.
#
# @!attribute [rw] acquirer_id
#   @return [String, nil]
#
# @!attribute [rw] card_id
#   @return [String, nil]
#
# @!attribute [rw] merchant_id
#   @return [String, nil]
#
# @!attribute [rw] network_token_id
#   @return [String, nil]
PaymentRemoveMatch = Struct.new(
  :acquirer_id,
  :card_id,
  :merchant_id,
  :network_token_id,
  keyword_init: true
)

# Relay entity data model.
#
# @!attribute [rw] app
#   @return [String, nil]
#
# @!attribute [rw] authentication
#   @return [Object, nil]
#
# @!attribute [rw] created_at
#   @return [Integer, nil]
#
# @!attribute [rw] destination_domain
#   @return [String, nil]
#
# @!attribute [rw] encrypt_empty_string
#   @return [Boolean, nil]
#
# @!attribute [rw] evervault_domain
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] route
#   @return [Array, nil]
#
# @!attribute [rw] updated_at
#   @return [Integer, nil]
Relay = Struct.new(
  :app,
  :authentication,
  :created_at,
  :destination_domain,
  :encrypt_empty_string,
  :evervault_domain,
  :id,
  :route,
  :updated_at,
  keyword_init: true
)

# Request payload for Relay#load.
#
# @!attribute [rw] id
#   @return [String]
RelayLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Relay#update.
#
# @!attribute [rw] id
#   @return [String]
RelayUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# ThreeDsSession entity data model.
#
# @!attribute [rw] access_control_server
#   @return [Hash, nil]
#
# @!attribute [rw] acquirer
#   @return [Hash]
#
# @!attribute [rw] are
#   @return [Hash, nil]
#
# @!attribute [rw] authentication
#   @return [Hash]
#
# @!attribute [rw] card
#   @return [Hash]
#
# @!attribute [rw] challenge
#   @return [Hash]
#
# @!attribute [rw] cre
#   @return [Object, nil]
#
# @!attribute [rw] created_at
#   @return [Integer]
#
# @!attribute [rw] cryptogram
#   @return [String, nil]
#
# @!attribute [rw] customer
#   @return [Hash, nil]
#
# @!attribute [rw] directory_server
#   @return [Hash, nil]
#
# @!attribute [rw] eci
#   @return [Hash, nil]
#
# @!attribute [rw] failure_reason
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] initiator
#   @return [Hash, nil]
#
# @!attribute [rw] merchant
#   @return [Hash]
#
# @!attribute [rw] next_action
#   @return [Hash]
#
# @!attribute [rw] payment
#   @return [Hash, nil]
#
# @!attribute [rw] preferred_version
#   @return [Array, nil]
#
# @!attribute [rw] rreq
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] three_ds_server
#   @return [Hash, nil]
#
# @!attribute [rw] updated_at
#   @return [Integer, nil]
#
# @!attribute [rw] version
#   @return [String]
ThreeDsSession = Struct.new(
  :access_control_server,
  :acquirer,
  :are,
  :authentication,
  :card,
  :challenge,
  :cre,
  :created_at,
  :cryptogram,
  :customer,
  :directory_server,
  :eci,
  :failure_reason,
  :id,
  :initiator,
  :merchant,
  :next_action,
  :payment,
  :preferred_version,
  :rreq,
  :status,
  :three_ds_server,
  :updated_at,
  :version,
  keyword_init: true
)

# Request payload for ThreeDsSession#load.
#
# @!attribute [rw] 3ds_session_id
#   @return [String]
ThreeDsSessionLoadMatch = Struct.new(
  :"3ds_session_id",
  keyword_init: true
)

# Request payload for ThreeDsSession#create.
#
# @!attribute [rw] access_control_server
#   @return [Hash, nil]
#
# @!attribute [rw] acquirer
#   @return [Hash]
#
# @!attribute [rw] are
#   @return [Hash, nil]
#
# @!attribute [rw] authentication
#   @return [Hash]
#
# @!attribute [rw] card
#   @return [Hash]
#
# @!attribute [rw] challenge
#   @return [Hash]
#
# @!attribute [rw] cre
#   @return [Object, nil]
#
# @!attribute [rw] created_at
#   @return [Integer]
#
# @!attribute [rw] cryptogram
#   @return [String, nil]
#
# @!attribute [rw] customer
#   @return [Hash, nil]
#
# @!attribute [rw] directory_server
#   @return [Hash, nil]
#
# @!attribute [rw] eci
#   @return [Hash, nil]
#
# @!attribute [rw] failure_reason
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] initiator
#   @return [Hash, nil]
#
# @!attribute [rw] merchant
#   @return [Hash]
#
# @!attribute [rw] next_action
#   @return [Hash]
#
# @!attribute [rw] payment
#   @return [Hash, nil]
#
# @!attribute [rw] preferred_version
#   @return [Array, nil]
#
# @!attribute [rw] rreq
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] three_ds_server
#   @return [Hash, nil]
#
# @!attribute [rw] updated_at
#   @return [Integer, nil]
#
# @!attribute [rw] version
#   @return [String]
ThreeDsSessionCreateData = Struct.new(
  :access_control_server,
  :acquirer,
  :are,
  :authentication,
  :card,
  :challenge,
  :cre,
  :created_at,
  :cryptogram,
  :customer,
  :directory_server,
  :eci,
  :failure_reason,
  :id,
  :initiator,
  :merchant,
  :next_action,
  :payment,
  :preferred_version,
  :rreq,
  :status,
  :three_ds_server,
  :updated_at,
  :version,
  keyword_init: true
)

# Webhook entity data model.
#
# @!attribute [rw] created_at
#   @return [Integer, nil]
#
# @!attribute [rw] event
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [Object, nil]
#
# @!attribute [rw] url
#   @return [String]
Webhook = Struct.new(
  :created_at,
  :event,
  :id,
  :updated_at,
  :url,
  keyword_init: true
)

# Request payload for Webhook#list.
#
# @!attribute [rw] created_at
#   @return [Integer, nil]
#
# @!attribute [rw] event
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [Object, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
WebhookListMatch = Struct.new(
  :created_at,
  :event,
  :id,
  :updated_at,
  :url,
  keyword_init: true
)

# Request payload for Webhook#create.
#
# @!attribute [rw] created_at
#   @return [Integer, nil]
#
# @!attribute [rw] event
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [Object, nil]
#
# @!attribute [rw] url
#   @return [String]
WebhookCreateData = Struct.new(
  :created_at,
  :event,
  :id,
  :updated_at,
  :url,
  keyword_init: true
)

# Request payload for Webhook#remove.
#
# @!attribute [rw] webhook_endpoint_id
#   @return [String]
WebhookRemoveMatch = Struct.new(
  :webhook_endpoint_id,
  keyword_init: true
)

# WebhookEndpoint entity data model.
#
# @!attribute [rw] created_at
#   @return [Integer, nil]
#
# @!attribute [rw] event
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [Object, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
WebhookEndpoint = Struct.new(
  :created_at,
  :event,
  :id,
  :updated_at,
  :url,
  keyword_init: true
)

# Request payload for WebhookEndpoint#load.
#
# @!attribute [rw] id
#   @return [String]
WebhookEndpointLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for WebhookEndpoint#update.
#
# @!attribute [rw] id
#   @return [String]
WebhookEndpointUpdateData = Struct.new(
  :id,
  keyword_init: true
)

