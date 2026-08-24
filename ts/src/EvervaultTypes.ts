// Typed models for the Evervault SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Card {
  expiry: Record<string, any>
  month: string
  number: string
  year: string
}

export interface CardLoadMatch {
  id: string
}

export interface CardCreateData {
  expiry: Record<string, any>
  month: string
  number: string
  year: string
}

export interface Payment {
}

export interface PaymentRemoveMatch {
  card_id: string
}

