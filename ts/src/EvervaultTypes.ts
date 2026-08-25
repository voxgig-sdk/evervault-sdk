// Typed models for the Evervault SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Acquirer {
  configurations: any[]
  default: boolean
  description?: string
  id: string
  name: string
}

export interface AcquirerLoadMatch {
  id: string
}

export interface AcquirerCreateData {
  configurations: any[]
  default: boolean
  description?: string
  id: string
  name: string
}

export interface AcquirerUpdateData {
  id: string
  configurations?: any[]
  default?: boolean
  description?: string
  name?: string
}

export interface BinLookup {
  number: string
}

export interface BinLookupCreateData {
  number: string
}

export interface Card {
  address: Record<string, any>
  card: Record<string, any>
  cardholder?: Record<string, any>
  expiry: Record<string, any>
  extensions?: any[]
  id?: string
  month: string
  number: string
  year: string
}

export interface CardLoadMatch {
  id: string
}

export interface CardCreateData {
  address: Record<string, any>
  card: Record<string, any>
  cardholder?: Record<string, any>
  expiry: Record<string, any>
  extensions?: any[]
  id?: string
  month: string
  number: string
  year: string

  // Selects a custom action instead of the plain create:
  //   'simulate'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
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
  createdAt?: number
  customDomain?: string
  destinationDomain: string
  encryptEmptyStrings?: boolean
  evervaultDomain?: string
  id?: string
  phoneNumber?: string
  relay?: string
  routes: any[]
  status?: string
  token: string
  updatedAt?: number
  validationRecord?: string
}

export interface CoreListMatch {
  app?: string
  authentication?: string | null
  createdAt?: number
  customDomain?: string
  destinationDomain?: string
  encryptEmptyStrings?: boolean
  evervaultDomain?: string
  id?: string
  phoneNumber?: string
  relay?: string
  routes?: any[]
  status?: string
  token?: string
  updatedAt?: number
  validationRecord?: string
}

export interface CoreCreateData {
  app?: string
  authentication?: string | null
  createdAt?: number
  customDomain?: string
  destinationDomain: string
  encryptEmptyStrings?: boolean
  evervaultDomain?: string
  id?: string
  phoneNumber?: string
  relay?: string
  routes: any[]
  status?: string
  token: string
  updatedAt?: number
  validationRecord?: string
}

export interface CoreRemoveMatch {
  id: string
  relay_id?: string
}

export interface CustomDomain {
  createdAt?: number
  customDomain?: string
  id?: string
  relay?: string
  status?: string
  updatedAt?: number
  validationRecord?: string
}

export interface CustomDomainLoadMatch {
  id: string
  relay_id: string
}

export interface CustomDomainCreateData {
  relay_id: string
  createdAt?: number
  customDomain?: string
  id?: string
  relay?: string
  status?: string
  updatedAt?: number
  validationRecord?: string
}

export interface FunctionRun {
  async?: boolean
  createdAt?: number
  error?: Record<string, any> | null
  id?: string
  payload: Record<string, any>
  result?: Record<string, any>
  status?: string
}

export interface FunctionRunCreateData {
  function_name: string
  async?: boolean
  createdAt?: number
  error?: Record<string, any> | null
  id?: string
  payload: Record<string, any>
  result?: Record<string, any>
  status?: string
}

export interface Merchant {
  applePay?: Record<string, any>
  business?: Record<string, any>
  categoryCode?: string
  createdAt: number
  id: string
  name: string
  networkTokens?: Record<string, any>
  shortName?: string
  updatedAt?: number
  website: string
}

export interface MerchantLoadMatch {
  id: string
}

export interface MerchantCreateData {
  applePay?: Record<string, any>
  business?: Record<string, any>
  categoryCode?: string
  createdAt: number
  id: string
  name: string
  networkTokens?: Record<string, any>
  shortName?: string
  updatedAt?: number
  website: string
}

export interface MerchantUpdateData {
  id: string
  applePay?: Record<string, any>
  business?: Record<string, any>
  categoryCode?: string
  createdAt?: number
  name?: string
  networkTokens?: Record<string, any>
  shortName?: string
  updatedAt?: number
  website?: string
}

export interface NetworkToken {
  card: Record<string, any>
  createdAt: number
  expiry: Record<string, any>
  id: string
  merchant: string
  number: string
  paymentAccountReference?: string
  status: string
  tokenRequestorIdentifier: string
  tokenServiceProvider: string
  updateType?: string
  updatedAt?: number
}

export interface NetworkTokenLoadMatch {
  id: string
}

export interface NetworkTokenCreateData {
  card: Record<string, any>
  createdAt: number
  expiry: Record<string, any>
  id: string
  merchant: string
  number: string
  paymentAccountReference?: string
  status: string
  tokenRequestorIdentifier: string
  tokenServiceProvider: string
  updateType?: string
  updatedAt?: number

  // Selects a custom action instead of the plain create:
  //   'simulate'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface NetworkTokenCryptogram {
  createdAt?: number
  cryptogram?: string
  id?: string
}

export interface NetworkTokenCryptogramCreateData {
  id: string
  createdAt?: number
  cryptogram?: string
}

export interface Payment {
  applePay?: Record<string, any>
  business?: Record<string, any>
  categoryCode?: string
  configurations: any[]
  createdAt: number
  created_at?: number
  data?: Record<string, any>
  default: boolean
  description?: string
  id: string
  name: string
  networkTokens?: Record<string, any>
  shortName?: string
  type?: string
  updatedAt?: number
  website: string
}

export interface PaymentListMatch {
  "3ds_session_id": string

  // Selects a custom action instead of the plain list:
  //   'acquirer' | 'merchant'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface PaymentRemoveMatch {
  acquirer_id: string
}

export interface Relay {
  app?: string
  authentication?: string | null
  createdAt?: number
  destinationDomain?: string
  encryptEmptyStrings?: boolean
  evervaultDomain?: string
  id?: string
  routes?: any[]
  updatedAt?: number
}

export interface RelayLoadMatch {
  id: string
}

export interface RelayUpdateData {
  id: string
  app?: string
  authentication?: string | null
  createdAt?: number
  destinationDomain?: string
  encryptEmptyStrings?: boolean
  evervaultDomain?: string
  routes?: any[]
  updatedAt?: number
}

export interface ThreeDsSession {
  accessControlServer?: Record<string, any>
  acquirer: Record<string, any>
  ares?: Record<string, any>
  authentication: Record<string, any>
  card: Record<string, any>
  challenge: Record<string, any>
  createdAt: number
  cres?: null | Record<string, any>
  cryptogram?: string
  customer?: Record<string, any>
  directoryServer?: Record<string, any>
  eci?: Record<string, any>
  failureReason?: string
  id: string
  initiator?: Record<string, any>
  merchant: Record<string, any>
  nextAction: Record<string, any>
  payment?: Record<string, any>
  preferredVersions?: any[]
  rreq?: null | Record<string, any>
  status: string
  threeDSServer?: Record<string, any>
  updatedAt?: number
  version: string
}

export interface ThreeDsSessionLoadMatch {
  "3ds_session_id": string
}

export interface ThreeDsSessionCreateData {
  accessControlServer?: Record<string, any>
  acquirer: Record<string, any>
  ares?: Record<string, any>
  authentication: Record<string, any>
  card: Record<string, any>
  challenge: Record<string, any>
  createdAt: number
  cres?: null | Record<string, any>
  cryptogram?: string
  customer?: Record<string, any>
  directoryServer?: Record<string, any>
  eci?: Record<string, any>
  failureReason?: string
  id: string
  initiator?: Record<string, any>
  merchant: Record<string, any>
  nextAction: Record<string, any>
  payment?: Record<string, any>
  preferredVersions?: any[]
  rreq?: null | Record<string, any>
  status: string
  threeDSServer?: Record<string, any>
  updatedAt?: number
  version: string
}

export interface Webhook {
  createdAt?: number
  events: any[]
  id?: string
  updatedAt?: number | null
  url: string
}

export interface WebhookListMatch {
  createdAt?: number
  events?: any[]
  id?: string
  updatedAt?: number | null
  url?: string
}

export interface WebhookCreateData {
  createdAt?: number
  events: any[]
  id?: string
  updatedAt?: number | null
  url: string
}

export interface WebhookRemoveMatch {
  webhook_endpoint_id: string
}

export interface WebhookEndpoint {
  createdAt?: number
  events?: any[]
  id?: string
  updatedAt?: number | null
  url?: string
}

export interface WebhookEndpointLoadMatch {
  id: string
}

export interface WebhookEndpointUpdateData {
  id: string
  createdAt?: number
  events?: any[]
  updatedAt?: number | null
  url?: string
}

