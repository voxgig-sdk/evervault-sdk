<?php
declare(strict_types=1);

// Typed models for the Evervault SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Card entity data model. */
class Card
{
    public array $expiry;
    public string $month;
    public string $number;
    public string $year;
}

/** Request payload for Card#load. */
class CardLoadMatch
{
    public string $id;
}

/** Request payload for Card#create. */
class CardCreateData
{
    public array $expiry;
    public string $month;
    public string $number;
    public string $year;
}

/** Payment entity data model. */
class Payment
{
}

/** Request payload for Payment#remove. */
class PaymentRemoveMatch
{
    public string $card_id;
}

