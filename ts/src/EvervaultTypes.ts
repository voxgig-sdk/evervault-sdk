// Typed models for the Evervault SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Acquirer {
  configuration: any[]
  default: boolean
  description?: string
  id: string
  name: string
}

export interface AcquirerLoadMatch {
  id: string
}

export interface AcquirerCreateData {
  configuration: any[]
  default: boolean
  description?: string
  id: string
  name: string
}

export interface AcquirerUpdateData {
  id: string
}

export interface BinLookup {
  number: string
}

export interface BinLookupCreateData {
  number: string
}

export interface Card {
  address: Record<string, any>
  automatic_update?: string
  bin: string
  brand?: string
  card: Record<string, any>
  cardholder?: Record<string, any>
  country?: string
  created_at: number
  currency?: string
  expiry: Record<string, any>
  extension?: any[]
  funding?: string
  id?: string
  issuer?: string
  last_four: string
  number: string
  replacement?: string | null
  segment?: string
  status?: string
  updated_at?: number | null
}

export interface CardLoadMatch {
  id: string
}

export interface CardCreateData {
  address: Record<string, any>
  automatic_update?: string
  bin: string
  brand?: string
  card: Record<string, any>
  cardholder?: Record<string, any>
  country?: string
  created_at: number
  currency?: string
  expiry: Record<string, any>
  extension?: any[]
  funding?: string
  id?: string
  issuer?: string
  last_four: string
  number: string
  replacement?: string | null
  segment?: string
  status?: string
  updated_at?: number | null
}

export interface CardArt {
  data: string
  height: number
  type: string
  width: number
}

export interface CardArtLoadMatch {
  network_token_id: string
}

export interface ClientSideToken {
  action: string
  expiry?: number
  payload?: Record<string, any>
}

export interface ClientSideTokenCreateData {
  action: string
  expiry?: number
  payload?: Record<string, any>
}

export interface Core {
  app?: string
  authentication?: string | null
  category?: string
  created_at?: number
  custom_domain?: string
  destination_domain: string
  encrypt_empty_string?: boolean
  encrypted_at?: number
  evervault_domain?: string
  fingerprint?: string
  id?: string
  metadata?: any
  phone_number?: string
  relay?: string
  role?: string
  route: any[]
  status?: string
  token: string
  type?: string
  updated_at?: number
  validation_record?: string
}

export interface CoreListMatch {
  relay_id?: string
}

export interface CoreCreateData {
  app?: string
  authentication?: string | null
  category?: string
  created_at?: number
  custom_domain?: string
  destination_domain: string
  encrypt_empty_string?: boolean
  encrypted_at?: number
  evervault_domain?: string
  fingerprint?: string
  id?: string
  metadata?: any
  phone_number?: string
  relay?: string
  role?: string
  route: any[]
  status?: string
  token: string
  type?: string
  updated_at?: number
  validation_record?: string
}

export interface CoreRemoveMatch {
  id: string
  relay_id?: string
}

export interface CustomDomain {
  created_at?: number
  custom_domain?: string
  id?: string
  relay?: string
  status?: string
  updated_at?: number
  validation_record?: string
}

export interface CustomDomainLoadMatch {
  id: string
  relay_id: string
}

export interface CustomDomainCreateData {
  relay_id: string
}

export interface FunctionRun {
  async?: boolean
  created_at?: number
  error?: Record<string, any> | null
  id?: string
  payload: Record<string, any>
  result?: Record<string, any>
  status?: string
}

export interface FunctionRunCreateData {
  function_name: string
}

export interface Merchant {
  apple_pay?: Record<string, any>
  business?: Record<string, any>
  category_code?: string
  created_at: number
  id: string
  name: string
  network_token?: Record<string, any>
  short_name?: string
  updated_at?: number
  website: string
}

export interface MerchantLoadMatch {
  id: string
}

export interface MerchantCreateData {
  apple_pay?: Record<string, any>
  business?: Record<string, any>
  category_code?: string
  created_at: number
  id: string
  name: string
  network_token?: Record<string, any>
  short_name?: string
  updated_at?: number
  website: string
}

export interface MerchantUpdateData {
  id: string
}

export interface NetworkToken {
  card: Record<string, any>
  created_at: number
  expiry: Record<string, any>
  id: string
  merchant: string
  number: string
  payment_account_reference?: string
  status: string
  token_requestor_identifier: string
  token_service_provider: string
  update_type?: string
  updated_at?: number
}

export interface NetworkTokenLoadMatch {
  id: string
}

export interface NetworkTokenCreateData {
  card: Record<string, any>
  created_at: number
  expiry: Record<string, any>
  id: string
  merchant: string
  number: string
  payment_account_reference?: string
  status: string
  token_requestor_identifier: string
  token_service_provider: string
  update_type?: string
  updated_at?: number
}

export interface NetworkTokenCryptogram {
  created_at?: number
  cryptogram?: string
  id?: string
}

export interface NetworkTokenCryptogramCreateData {
  id: string
}

export interface Payment {
  apple_pay?: Record<string, any>
  business?: Record<string, any>
  category_code?: string
  configuration: any[]
  created_at: number
  data?: Record<string, any>
  default: boolean
  description?: string
  id: string
  name: string
  network_token?: Record<string, any>
  short_name?: string
  type?: string
  updated_at?: number
  website: string
}

export interface PaymentListMatch {
  "3ds_session_id": string
}

export interface PaymentRemoveMatch {
  acquirer_id?: string
  card_id?: string
  merchant_id?: string
  network_token_id?: string
}

export interface Relay {
  app?: string
  authentication?: string | null
  created_at?: number
  destination_domain?: string
  encrypt_empty_string?: boolean
  evervault_domain?: string
  id?: string
  route?: any[]
  updated_at?: number
}

export interface RelayLoadMatch {
  id: string
}

export interface RelayUpdateData {
  id: string
}

export interface ThreeDsSession {
  access_control_server?: Record<string, any>
  acquirer: Record<string, any>
  are?: Record<string, any>
  authentication: Record<string, any>
  card: Record<string, any>
  challenge: Record<string, any>
  cre?: null | Record<string, any>
  created_at: number
  cryptogram?: string
  customer?: Record<string, any>
  directory_server?: Record<string, any>
  eci?: Record<string, any>
  failure_reason?: string
  id: string
  initiator?: Record<string, any>
  merchant: Record<string, any>
  next_action: Record<string, any>
  payment?: Record<string, any>
  preferred_version?: any[]
  rreq?: null | Record<string, any>
  status: string
  three_ds_server?: Record<string, any>
  updated_at?: number
  version: string
}

export interface ThreeDsSessionLoadMatch {
  "3ds_session_id": string
}

export interface ThreeDsSessionCreateData {
  access_control_server?: Record<string, any>
  acquirer: Record<string, any>
  are?: Record<string, any>
  authentication: Record<string, any>
  card: Record<string, any>
  challenge: Record<string, any>
  cre?: null | Record<string, any>
  created_at: number
  cryptogram?: string
  customer?: Record<string, any>
  directory_server?: Record<string, any>
  eci?: Record<string, any>
  failure_reason?: string
  id: string
  initiator?: Record<string, any>
  merchant: Record<string, any>
  next_action: Record<string, any>
  payment?: Record<string, any>
  preferred_version?: any[]
  rreq?: null | Record<string, any>
  status: string
  three_ds_server?: Record<string, any>
  updated_at?: number
  version: string
}

export interface Webhook {
  created_at?: number
  event: any[]
  id?: string
  updated_at?: number | null
  url: string
}

export interface WebhookListMatch {
  created_at?: number
  event?: any[]
  id?: string
  updated_at?: number | null
  url?: string
}

export interface WebhookCreateData {
  created_at?: number
  event: any[]
  id?: string
  updated_at?: number | null
  url: string
}

export interface WebhookRemoveMatch {
  webhook_endpoint_id: string
}

export interface WebhookEndpoint {
  created_at?: number
  event?: any[]
  id?: string
  updated_at?: number | null
  url?: string
}

export interface WebhookEndpointLoadMatch {
  id: string
}

export interface WebhookEndpointUpdateData {
  id: string
}

