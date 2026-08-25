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
# @!attribute [rw] configurations
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
  :configurations,
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
# @!attribute [rw] configurations
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
  :configurations,
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
#
# @!attribute [rw] configurations
#   @return [Array, nil]
#
# @!attribute [rw] default
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
AcquirerUpdateData = Struct.new(
  :id,
  :configurations,
  :default,
  :description,
  :name,
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
# @!attribute [rw] card
#   @return [Hash]
#
# @!attribute [rw] cardholder
#   @return [Hash, nil]
#
# @!attribute [rw] expiry
#   @return [Hash]
#
# @!attribute [rw] extensions
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] month
#   @return [String]
#
# @!attribute [rw] number
#   @return [String]
#
# @!attribute [rw] year
#   @return [String]
Card = Struct.new(
  :address,
  :card,
  :cardholder,
  :expiry,
  :extensions,
  :id,
  :month,
  :number,
  :year,
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
# @!attribute [rw] card
#   @return [Hash]
#
# @!attribute [rw] cardholder
#   @return [Hash, nil]
#
# @!attribute [rw] expiry
#   @return [Hash]
#
# @!attribute [rw] extensions
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] month
#   @return [String]
#
# @!attribute [rw] number
#   @return [String]
#
# @!attribute [rw] year
#   @return [String]
CardCreateData = Struct.new(
  :address,
  :card,
  :cardholder,
  :expiry,
  :extensions,
  :id,
  :month,
  :number,
  :year,
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
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] customDomain
#   @return [String, nil]
#
# @!attribute [rw] destinationDomain
#   @return [String]
#
# @!attribute [rw] encryptEmptyStrings
#   @return [Boolean, nil]
#
# @!attribute [rw] evervaultDomain
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] phoneNumber
#   @return [String, nil]
#
# @!attribute [rw] relay
#   @return [String, nil]
#
# @!attribute [rw] routes
#   @return [Array]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String]
#
# @!attribute [rw] updatedAt
#   @return [Integer, nil]
#
# @!attribute [rw] validationRecord
#   @return [String, nil]
Core = Struct.new(
  :app,
  :authentication,
  :createdAt,
  :customDomain,
  :destinationDomain,
  :encryptEmptyStrings,
  :evervaultDomain,
  :id,
  :phoneNumber,
  :relay,
  :routes,
  :status,
  :token,
  :updatedAt,
  :validationRecord,
  keyword_init: true
)

# Request payload for Core#list.
#
# @!attribute [rw] app
#   @return [String, nil]
#
# @!attribute [rw] authentication
#   @return [Object, nil]
#
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] customDomain
#   @return [String, nil]
#
# @!attribute [rw] destinationDomain
#   @return [String, nil]
#
# @!attribute [rw] encryptEmptyStrings
#   @return [Boolean, nil]
#
# @!attribute [rw] evervaultDomain
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] phoneNumber
#   @return [String, nil]
#
# @!attribute [rw] relay
#   @return [String, nil]
#
# @!attribute [rw] routes
#   @return [Array, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [Integer, nil]
#
# @!attribute [rw] validationRecord
#   @return [String, nil]
CoreListMatch = Struct.new(
  :app,
  :authentication,
  :createdAt,
  :customDomain,
  :destinationDomain,
  :encryptEmptyStrings,
  :evervaultDomain,
  :id,
  :phoneNumber,
  :relay,
  :routes,
  :status,
  :token,
  :updatedAt,
  :validationRecord,
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
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] customDomain
#   @return [String, nil]
#
# @!attribute [rw] destinationDomain
#   @return [String]
#
# @!attribute [rw] encryptEmptyStrings
#   @return [Boolean, nil]
#
# @!attribute [rw] evervaultDomain
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] phoneNumber
#   @return [String, nil]
#
# @!attribute [rw] relay
#   @return [String, nil]
#
# @!attribute [rw] routes
#   @return [Array]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String]
#
# @!attribute [rw] updatedAt
#   @return [Integer, nil]
#
# @!attribute [rw] validationRecord
#   @return [String, nil]
CoreCreateData = Struct.new(
  :app,
  :authentication,
  :createdAt,
  :customDomain,
  :destinationDomain,
  :encryptEmptyStrings,
  :evervaultDomain,
  :id,
  :phoneNumber,
  :relay,
  :routes,
  :status,
  :token,
  :updatedAt,
  :validationRecord,
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
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] customDomain
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
# @!attribute [rw] updatedAt
#   @return [Integer, nil]
#
# @!attribute [rw] validationRecord
#   @return [String, nil]
CustomDomain = Struct.new(
  :createdAt,
  :customDomain,
  :id,
  :relay,
  :status,
  :updatedAt,
  :validationRecord,
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
#
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] customDomain
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
# @!attribute [rw] updatedAt
#   @return [Integer, nil]
#
# @!attribute [rw] validationRecord
#   @return [String, nil]
CustomDomainCreateData = Struct.new(
  :relay_id,
  :createdAt,
  :customDomain,
  :id,
  :relay,
  :status,
  :updatedAt,
  :validationRecord,
  keyword_init: true
)

# FunctionRun entity data model.
#
# @!attribute [rw] async
#   @return [Boolean, nil]
#
# @!attribute [rw] createdAt
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
  :createdAt,
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
#
# @!attribute [rw] async
#   @return [Boolean, nil]
#
# @!attribute [rw] createdAt
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
FunctionRunCreateData = Struct.new(
  :function_name,
  :async,
  :createdAt,
  :error,
  :id,
  :payload,
  :result,
  :status,
  keyword_init: true
)

# Merchant entity data model.
#
# @!attribute [rw] applePay
#   @return [Hash, nil]
#
# @!attribute [rw] business
#   @return [Hash, nil]
#
# @!attribute [rw] categoryCode
#   @return [String, nil]
#
# @!attribute [rw] createdAt
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] networkTokens
#   @return [Hash, nil]
#
# @!attribute [rw] shortName
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [Integer, nil]
#
# @!attribute [rw] website
#   @return [String]
Merchant = Struct.new(
  :applePay,
  :business,
  :categoryCode,
  :createdAt,
  :id,
  :name,
  :networkTokens,
  :shortName,
  :updatedAt,
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
# @!attribute [rw] applePay
#   @return [Hash, nil]
#
# @!attribute [rw] business
#   @return [Hash, nil]
#
# @!attribute [rw] categoryCode
#   @return [String, nil]
#
# @!attribute [rw] createdAt
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] networkTokens
#   @return [Hash, nil]
#
# @!attribute [rw] shortName
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [Integer, nil]
#
# @!attribute [rw] website
#   @return [String]
MerchantCreateData = Struct.new(
  :applePay,
  :business,
  :categoryCode,
  :createdAt,
  :id,
  :name,
  :networkTokens,
  :shortName,
  :updatedAt,
  :website,
  keyword_init: true
)

# Request payload for Merchant#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] applePay
#   @return [Hash, nil]
#
# @!attribute [rw] business
#   @return [Hash, nil]
#
# @!attribute [rw] categoryCode
#   @return [String, nil]
#
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] networkTokens
#   @return [Hash, nil]
#
# @!attribute [rw] shortName
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [Integer, nil]
#
# @!attribute [rw] website
#   @return [String, nil]
MerchantUpdateData = Struct.new(
  :id,
  :applePay,
  :business,
  :categoryCode,
  :createdAt,
  :name,
  :networkTokens,
  :shortName,
  :updatedAt,
  :website,
  keyword_init: true
)

# NetworkToken entity data model.
#
# @!attribute [rw] card
#   @return [Hash]
#
# @!attribute [rw] createdAt
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
# @!attribute [rw] paymentAccountReference
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] tokenRequestorIdentifier
#   @return [String]
#
# @!attribute [rw] tokenServiceProvider
#   @return [String]
#
# @!attribute [rw] updateType
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [Integer, nil]
NetworkToken = Struct.new(
  :card,
  :createdAt,
  :expiry,
  :id,
  :merchant,
  :number,
  :paymentAccountReference,
  :status,
  :tokenRequestorIdentifier,
  :tokenServiceProvider,
  :updateType,
  :updatedAt,
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
# @!attribute [rw] createdAt
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
# @!attribute [rw] paymentAccountReference
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] tokenRequestorIdentifier
#   @return [String]
#
# @!attribute [rw] tokenServiceProvider
#   @return [String]
#
# @!attribute [rw] updateType
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [Integer, nil]
NetworkTokenCreateData = Struct.new(
  :card,
  :createdAt,
  :expiry,
  :id,
  :merchant,
  :number,
  :paymentAccountReference,
  :status,
  :tokenRequestorIdentifier,
  :tokenServiceProvider,
  :updateType,
  :updatedAt,
  keyword_init: true
)

# NetworkTokenCryptogram entity data model.
#
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] cryptogram
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
NetworkTokenCryptogram = Struct.new(
  :createdAt,
  :cryptogram,
  :id,
  keyword_init: true
)

# Request payload for NetworkTokenCryptogram#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] cryptogram
#   @return [String, nil]
NetworkTokenCryptogramCreateData = Struct.new(
  :id,
  :createdAt,
  :cryptogram,
  keyword_init: true
)

# Payment entity data model.
#
# @!attribute [rw] applePay
#   @return [Hash, nil]
#
# @!attribute [rw] business
#   @return [Hash, nil]
#
# @!attribute [rw] categoryCode
#   @return [String, nil]
#
# @!attribute [rw] configurations
#   @return [Array]
#
# @!attribute [rw] createdAt
#   @return [Integer]
#
# @!attribute [rw] created_at
#   @return [Integer, nil]
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
# @!attribute [rw] networkTokens
#   @return [Hash, nil]
#
# @!attribute [rw] shortName
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [Integer, nil]
#
# @!attribute [rw] website
#   @return [String]
Payment = Struct.new(
  :applePay,
  :business,
  :categoryCode,
  :configurations,
  :createdAt,
  :created_at,
  :data,
  :default,
  :description,
  :id,
  :name,
  :networkTokens,
  :shortName,
  :type,
  :updatedAt,
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
#   @return [String]
PaymentRemoveMatch = Struct.new(
  :acquirer_id,
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
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] destinationDomain
#   @return [String, nil]
#
# @!attribute [rw] encryptEmptyStrings
#   @return [Boolean, nil]
#
# @!attribute [rw] evervaultDomain
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] routes
#   @return [Array, nil]
#
# @!attribute [rw] updatedAt
#   @return [Integer, nil]
Relay = Struct.new(
  :app,
  :authentication,
  :createdAt,
  :destinationDomain,
  :encryptEmptyStrings,
  :evervaultDomain,
  :id,
  :routes,
  :updatedAt,
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
#
# @!attribute [rw] app
#   @return [String, nil]
#
# @!attribute [rw] authentication
#   @return [Object, nil]
#
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] destinationDomain
#   @return [String, nil]
#
# @!attribute [rw] encryptEmptyStrings
#   @return [Boolean, nil]
#
# @!attribute [rw] evervaultDomain
#   @return [String, nil]
#
# @!attribute [rw] routes
#   @return [Array, nil]
#
# @!attribute [rw] updatedAt
#   @return [Integer, nil]
RelayUpdateData = Struct.new(
  :id,
  :app,
  :authentication,
  :createdAt,
  :destinationDomain,
  :encryptEmptyStrings,
  :evervaultDomain,
  :routes,
  :updatedAt,
  keyword_init: true
)

# ThreeDsSession entity data model.
#
# @!attribute [rw] accessControlServer
#   @return [Hash, nil]
#
# @!attribute [rw] acquirer
#   @return [Hash]
#
# @!attribute [rw] ares
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
# @!attribute [rw] createdAt
#   @return [Integer]
#
# @!attribute [rw] cres
#   @return [Object, nil]
#
# @!attribute [rw] cryptogram
#   @return [String, nil]
#
# @!attribute [rw] customer
#   @return [Hash, nil]
#
# @!attribute [rw] directoryServer
#   @return [Hash, nil]
#
# @!attribute [rw] eci
#   @return [Hash, nil]
#
# @!attribute [rw] failureReason
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
# @!attribute [rw] nextAction
#   @return [Hash]
#
# @!attribute [rw] payment
#   @return [Hash, nil]
#
# @!attribute [rw] preferredVersions
#   @return [Array, nil]
#
# @!attribute [rw] rreq
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] threeDSServer
#   @return [Hash, nil]
#
# @!attribute [rw] updatedAt
#   @return [Integer, nil]
#
# @!attribute [rw] version
#   @return [String]
ThreeDsSession = Struct.new(
  :accessControlServer,
  :acquirer,
  :ares,
  :authentication,
  :card,
  :challenge,
  :createdAt,
  :cres,
  :cryptogram,
  :customer,
  :directoryServer,
  :eci,
  :failureReason,
  :id,
  :initiator,
  :merchant,
  :nextAction,
  :payment,
  :preferredVersions,
  :rreq,
  :status,
  :threeDSServer,
  :updatedAt,
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
# @!attribute [rw] accessControlServer
#   @return [Hash, nil]
#
# @!attribute [rw] acquirer
#   @return [Hash]
#
# @!attribute [rw] ares
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
# @!attribute [rw] createdAt
#   @return [Integer]
#
# @!attribute [rw] cres
#   @return [Object, nil]
#
# @!attribute [rw] cryptogram
#   @return [String, nil]
#
# @!attribute [rw] customer
#   @return [Hash, nil]
#
# @!attribute [rw] directoryServer
#   @return [Hash, nil]
#
# @!attribute [rw] eci
#   @return [Hash, nil]
#
# @!attribute [rw] failureReason
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
# @!attribute [rw] nextAction
#   @return [Hash]
#
# @!attribute [rw] payment
#   @return [Hash, nil]
#
# @!attribute [rw] preferredVersions
#   @return [Array, nil]
#
# @!attribute [rw] rreq
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] threeDSServer
#   @return [Hash, nil]
#
# @!attribute [rw] updatedAt
#   @return [Integer, nil]
#
# @!attribute [rw] version
#   @return [String]
ThreeDsSessionCreateData = Struct.new(
  :accessControlServer,
  :acquirer,
  :ares,
  :authentication,
  :card,
  :challenge,
  :createdAt,
  :cres,
  :cryptogram,
  :customer,
  :directoryServer,
  :eci,
  :failureReason,
  :id,
  :initiator,
  :merchant,
  :nextAction,
  :payment,
  :preferredVersions,
  :rreq,
  :status,
  :threeDSServer,
  :updatedAt,
  :version,
  keyword_init: true
)

# Webhook entity data model.
#
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] events
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [Object, nil]
#
# @!attribute [rw] url
#   @return [String]
Webhook = Struct.new(
  :createdAt,
  :events,
  :id,
  :updatedAt,
  :url,
  keyword_init: true
)

# Request payload for Webhook#list.
#
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] events
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [Object, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
WebhookListMatch = Struct.new(
  :createdAt,
  :events,
  :id,
  :updatedAt,
  :url,
  keyword_init: true
)

# Request payload for Webhook#create.
#
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] events
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [Object, nil]
#
# @!attribute [rw] url
#   @return [String]
WebhookCreateData = Struct.new(
  :createdAt,
  :events,
  :id,
  :updatedAt,
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
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] events
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [Object, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
WebhookEndpoint = Struct.new(
  :createdAt,
  :events,
  :id,
  :updatedAt,
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
#
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] events
#   @return [Array, nil]
#
# @!attribute [rw] updatedAt
#   @return [Object, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
WebhookEndpointUpdateData = Struct.new(
  :id,
  :createdAt,
  :events,
  :updatedAt,
  :url,
  keyword_init: true
)

