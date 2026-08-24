-- Typed models for the Evervault SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Card
---@field expiry table
---@field month string
---@field number string
---@field year string

---@class CardLoadMatch
---@field id string

---@class CardCreateData
---@field expiry table
---@field month string
---@field number string
---@field year string

---@class Payment

---@class PaymentRemoveMatch
---@field card_id string

local M = {}

return M
