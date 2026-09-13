// Typed models for the Evervault SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/evervault-sdk/go/core"
)

// Acquirer is the typed data model for the acquirer entity.
type Acquirer struct {
	Configurations []any `json:"configurations"`
	Default bool `json:"default"`
	Description *string `json:"description,omitempty"`
	Id string `json:"id"`
	Name string `json:"name"`
}

// AcquirerLoadMatch is the typed request payload for Acquirer.LoadTyped.
type AcquirerLoadMatch struct {
	Id string `json:"id"`
}

// AcquirerCreateData is the typed request payload for Acquirer.CreateTyped.
type AcquirerCreateData struct {
	Configurations []any `json:"configurations"`
	Default bool `json:"default"`
	Description *string `json:"description,omitempty"`
	Id string `json:"id"`
	Name string `json:"name"`
}

// AcquirerUpdateData is the typed request payload for Acquirer.UpdateTyped.
type AcquirerUpdateData struct {
	Id string `json:"id"`
	Configurations *[]any `json:"configurations,omitempty"`
	Default *bool `json:"default,omitempty"`
	Description *string `json:"description,omitempty"`
	Name *string `json:"name,omitempty"`
}

// BinLookup is the typed data model for the bin_lookup entity.
type BinLookup struct {
	Number string `json:"number"`
}

// BinLookupCreateData is the typed request payload for BinLookup.CreateTyped.
type BinLookupCreateData struct {
	Number string `json:"number"`
}

// Card is the typed data model for the card entity.
type Card struct {
	Address map[string]any `json:"address"`
	Card map[string]any `json:"card"`
	Cardholder *map[string]any `json:"cardholder,omitempty"`
	Expiry map[string]any `json:"expiry"`
	Extensions *[]any `json:"extensions,omitempty"`
	Id *string `json:"id,omitempty"`
	Month string `json:"month"`
	Number string `json:"number"`
	Year string `json:"year"`
}

// CardLoadMatch is the typed request payload for Card.LoadTyped.
type CardLoadMatch struct {
	Id string `json:"id"`
}

// CardCreateData is the typed request payload for Card.CreateTyped.
type CardCreateData struct {
	Address map[string]any `json:"address"`
	Card map[string]any `json:"card"`
	Cardholder *map[string]any `json:"cardholder,omitempty"`
	Expiry map[string]any `json:"expiry"`
	Extensions *[]any `json:"extensions,omitempty"`
	Id *string `json:"id,omitempty"`
	Month string `json:"month"`
	Number string `json:"number"`
	Year string `json:"year"`
}

// CardArt is the typed data model for the card_art entity.
type CardArt struct {
	Data string `json:"data"`
	Height int `json:"height"`
	Type string `json:"type"`
	Width int `json:"width"`
}

// CardArtLoadMatch is the typed request payload for CardArt.LoadTyped.
type CardArtLoadMatch struct {
	NetworkTokenId string `json:"network_token_id"`
}

// ClientSideToken is the typed data model for the client_side_token entity.
type ClientSideToken struct {
	Action string `json:"action"`
	Expiry *int `json:"expiry,omitempty"`
	Payload *map[string]any `json:"payload,omitempty"`
}

// ClientSideTokenCreateData is the typed request payload for ClientSideToken.CreateTyped.
type ClientSideTokenCreateData struct {
	Action string `json:"action"`
	Expiry *int `json:"expiry,omitempty"`
	Payload *map[string]any `json:"payload,omitempty"`
}

// Core is the typed data model for the core entity.
type Core struct {
	App *string `json:"app,omitempty"`
	Authentication *any `json:"authentication,omitempty"`
	CreatedAt *int `json:"createdAt,omitempty"`
	CustomDomain *string `json:"customDomain,omitempty"`
	DestinationDomain string `json:"destinationDomain"`
	EncryptEmptyStrings *bool `json:"encryptEmptyStrings,omitempty"`
	EvervaultDomain *string `json:"evervaultDomain,omitempty"`
	Id *string `json:"id,omitempty"`
	PhoneNumber *string `json:"phoneNumber,omitempty"`
	Relay *string `json:"relay,omitempty"`
	Routes []any `json:"routes"`
	Status *string `json:"status,omitempty"`
	Token string `json:"token"`
	UpdatedAt *int `json:"updatedAt,omitempty"`
	ValidationRecord *string `json:"validationRecord,omitempty"`
}

// CoreListMatch is the typed request payload for Core.ListTyped.
type CoreListMatch struct {
	App *string `json:"app,omitempty"`
	Authentication *any `json:"authentication,omitempty"`
	CreatedAt *int `json:"createdAt,omitempty"`
	CustomDomain *string `json:"customDomain,omitempty"`
	DestinationDomain *string `json:"destinationDomain,omitempty"`
	EncryptEmptyStrings *bool `json:"encryptEmptyStrings,omitempty"`
	EvervaultDomain *string `json:"evervaultDomain,omitempty"`
	Id *string `json:"id,omitempty"`
	PhoneNumber *string `json:"phoneNumber,omitempty"`
	Relay *string `json:"relay,omitempty"`
	Routes *[]any `json:"routes,omitempty"`
	Status *string `json:"status,omitempty"`
	Token *string `json:"token,omitempty"`
	UpdatedAt *int `json:"updatedAt,omitempty"`
	ValidationRecord *string `json:"validationRecord,omitempty"`
}

// CoreCreateData is the typed request payload for Core.CreateTyped.
type CoreCreateData struct {
	App *string `json:"app,omitempty"`
	Authentication *any `json:"authentication,omitempty"`
	CreatedAt *int `json:"createdAt,omitempty"`
	CustomDomain *string `json:"customDomain,omitempty"`
	DestinationDomain string `json:"destinationDomain"`
	EncryptEmptyStrings *bool `json:"encryptEmptyStrings,omitempty"`
	EvervaultDomain *string `json:"evervaultDomain,omitempty"`
	Id *string `json:"id,omitempty"`
	PhoneNumber *string `json:"phoneNumber,omitempty"`
	Relay *string `json:"relay,omitempty"`
	Routes []any `json:"routes"`
	Status *string `json:"status,omitempty"`
	Token string `json:"token"`
	UpdatedAt *int `json:"updatedAt,omitempty"`
	ValidationRecord *string `json:"validationRecord,omitempty"`
}

// CoreRemoveMatch is the typed request payload for Core.RemoveTyped.
type CoreRemoveMatch struct {
	Id string `json:"id"`
	RelayId *string `json:"relay_id,omitempty"`
}

// CustomDomain is the typed data model for the custom_domain entity.
type CustomDomain struct {
	CreatedAt *int `json:"createdAt,omitempty"`
	CustomDomain *string `json:"customDomain,omitempty"`
	Id *string `json:"id,omitempty"`
	Relay *string `json:"relay,omitempty"`
	Status *string `json:"status,omitempty"`
	UpdatedAt *int `json:"updatedAt,omitempty"`
	ValidationRecord *string `json:"validationRecord,omitempty"`
}

// CustomDomainLoadMatch is the typed request payload for CustomDomain.LoadTyped.
type CustomDomainLoadMatch struct {
	Id string `json:"id"`
	RelayId string `json:"relay_id"`
}

// CustomDomainCreateData is the typed request payload for CustomDomain.CreateTyped.
type CustomDomainCreateData struct {
	RelayId string `json:"relay_id"`
	CreatedAt *int `json:"createdAt,omitempty"`
	CustomDomain *string `json:"customDomain,omitempty"`
	Id *string `json:"id,omitempty"`
	Relay *string `json:"relay,omitempty"`
	Status *string `json:"status,omitempty"`
	UpdatedAt *int `json:"updatedAt,omitempty"`
	ValidationRecord *string `json:"validationRecord,omitempty"`
}

// FunctionRun is the typed data model for the function_run entity.
type FunctionRun struct {
	Async *bool `json:"async,omitempty"`
	CreatedAt *int `json:"createdAt,omitempty"`
	Error *any `json:"error,omitempty"`
	Id *string `json:"id,omitempty"`
	Payload map[string]any `json:"payload"`
	Result *map[string]any `json:"result,omitempty"`
	Status *string `json:"status,omitempty"`
}

// FunctionRunCreateData is the typed request payload for FunctionRun.CreateTyped.
type FunctionRunCreateData struct {
	FunctionName string `json:"function_name"`
	Async *bool `json:"async,omitempty"`
	CreatedAt *int `json:"createdAt,omitempty"`
	Error *any `json:"error,omitempty"`
	Id *string `json:"id,omitempty"`
	Payload map[string]any `json:"payload"`
	Result *map[string]any `json:"result,omitempty"`
	Status *string `json:"status,omitempty"`
}

// Merchant is the typed data model for the merchant entity.
type Merchant struct {
	ApplePay *map[string]any `json:"applePay,omitempty"`
	Business *map[string]any `json:"business,omitempty"`
	CategoryCode *string `json:"categoryCode,omitempty"`
	CreatedAt int `json:"createdAt"`
	Id string `json:"id"`
	Name string `json:"name"`
	NetworkTokens *map[string]any `json:"networkTokens,omitempty"`
	ShortName *string `json:"shortName,omitempty"`
	UpdatedAt *int `json:"updatedAt,omitempty"`
	Website string `json:"website"`
}

// MerchantLoadMatch is the typed request payload for Merchant.LoadTyped.
type MerchantLoadMatch struct {
	Id string `json:"id"`
}

// MerchantCreateData is the typed request payload for Merchant.CreateTyped.
type MerchantCreateData struct {
	ApplePay *map[string]any `json:"applePay,omitempty"`
	Business *map[string]any `json:"business,omitempty"`
	CategoryCode *string `json:"categoryCode,omitempty"`
	CreatedAt int `json:"createdAt"`
	Id string `json:"id"`
	Name string `json:"name"`
	NetworkTokens *map[string]any `json:"networkTokens,omitempty"`
	ShortName *string `json:"shortName,omitempty"`
	UpdatedAt *int `json:"updatedAt,omitempty"`
	Website string `json:"website"`
}

// MerchantUpdateData is the typed request payload for Merchant.UpdateTyped.
type MerchantUpdateData struct {
	Id string `json:"id"`
	ApplePay *map[string]any `json:"applePay,omitempty"`
	Business *map[string]any `json:"business,omitempty"`
	CategoryCode *string `json:"categoryCode,omitempty"`
	CreatedAt *int `json:"createdAt,omitempty"`
	Name *string `json:"name,omitempty"`
	NetworkTokens *map[string]any `json:"networkTokens,omitempty"`
	ShortName *string `json:"shortName,omitempty"`
	UpdatedAt *int `json:"updatedAt,omitempty"`
	Website *string `json:"website,omitempty"`
}

// NetworkToken is the typed data model for the network_token entity.
type NetworkToken struct {
	Card map[string]any `json:"card"`
	CreatedAt int `json:"createdAt"`
	Expiry map[string]any `json:"expiry"`
	Id string `json:"id"`
	Merchant string `json:"merchant"`
	Number string `json:"number"`
	PaymentAccountReference *string `json:"paymentAccountReference,omitempty"`
	Status string `json:"status"`
	TokenRequestorIdentifier string `json:"tokenRequestorIdentifier"`
	TokenServiceProvider string `json:"tokenServiceProvider"`
	UpdateType *string `json:"updateType,omitempty"`
	UpdatedAt *int `json:"updatedAt,omitempty"`
}

// NetworkTokenLoadMatch is the typed request payload for NetworkToken.LoadTyped.
type NetworkTokenLoadMatch struct {
	Id string `json:"id"`
}

// NetworkTokenCreateData is the typed request payload for NetworkToken.CreateTyped.
type NetworkTokenCreateData struct {
	Card map[string]any `json:"card"`
	CreatedAt int `json:"createdAt"`
	Expiry map[string]any `json:"expiry"`
	Id string `json:"id"`
	Merchant string `json:"merchant"`
	Number string `json:"number"`
	PaymentAccountReference *string `json:"paymentAccountReference,omitempty"`
	Status string `json:"status"`
	TokenRequestorIdentifier string `json:"tokenRequestorIdentifier"`
	TokenServiceProvider string `json:"tokenServiceProvider"`
	UpdateType *string `json:"updateType,omitempty"`
	UpdatedAt *int `json:"updatedAt,omitempty"`
}

// NetworkTokenCryptogram is the typed data model for the network_token_cryptogram entity.
type NetworkTokenCryptogram struct {
	CreatedAt *int `json:"createdAt,omitempty"`
	Cryptogram *string `json:"cryptogram,omitempty"`
	Id *string `json:"id,omitempty"`
}

// NetworkTokenCryptogramCreateData is the typed request payload for NetworkTokenCryptogram.CreateTyped.
type NetworkTokenCryptogramCreateData struct {
	Id string `json:"id"`
	CreatedAt *int `json:"createdAt,omitempty"`
	Cryptogram *string `json:"cryptogram,omitempty"`
}

// Payment is the typed data model for the payment entity.
type Payment struct {
	ApplePay *map[string]any `json:"applePay,omitempty"`
	Business *map[string]any `json:"business,omitempty"`
	CategoryCode *string `json:"categoryCode,omitempty"`
	Configurations []any `json:"configurations"`
	CreatedAt int `json:"createdAt"`
	CreatedAt2 *int `json:"created_at,omitempty"`
	Data *map[string]any `json:"data,omitempty"`
	Default bool `json:"default"`
	Description *string `json:"description,omitempty"`
	Id string `json:"id"`
	Name string `json:"name"`
	NetworkTokens *map[string]any `json:"networkTokens,omitempty"`
	ShortName *string `json:"shortName,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *int `json:"updatedAt,omitempty"`
	Website string `json:"website"`
}

// PaymentListMatch is the typed request payload for Payment.ListTyped.
type PaymentListMatch struct {
	F3dsSessionId string `json:"3ds_session_id"`
}

// PaymentRemoveMatch is the typed request payload for Payment.RemoveTyped.
type PaymentRemoveMatch struct {
	AcquirerId string `json:"acquirer_id"`
}

// Relay is the typed data model for the relay entity.
type Relay struct {
	App *string `json:"app,omitempty"`
	Authentication *any `json:"authentication,omitempty"`
	CreatedAt *int `json:"createdAt,omitempty"`
	DestinationDomain *string `json:"destinationDomain,omitempty"`
	EncryptEmptyStrings *bool `json:"encryptEmptyStrings,omitempty"`
	EvervaultDomain *string `json:"evervaultDomain,omitempty"`
	Id *string `json:"id,omitempty"`
	Routes *[]any `json:"routes,omitempty"`
	UpdatedAt *int `json:"updatedAt,omitempty"`
}

// RelayLoadMatch is the typed request payload for Relay.LoadTyped.
type RelayLoadMatch struct {
	Id string `json:"id"`
}

// RelayUpdateData is the typed request payload for Relay.UpdateTyped.
type RelayUpdateData struct {
	Id string `json:"id"`
	App *string `json:"app,omitempty"`
	Authentication *any `json:"authentication,omitempty"`
	CreatedAt *int `json:"createdAt,omitempty"`
	DestinationDomain *string `json:"destinationDomain,omitempty"`
	EncryptEmptyStrings *bool `json:"encryptEmptyStrings,omitempty"`
	EvervaultDomain *string `json:"evervaultDomain,omitempty"`
	Routes *[]any `json:"routes,omitempty"`
	UpdatedAt *int `json:"updatedAt,omitempty"`
}

// ThreeDsSession is the typed data model for the three_ds_session entity.
type ThreeDsSession struct {
	AccessControlServer *map[string]any `json:"accessControlServer,omitempty"`
	Acquirer map[string]any `json:"acquirer"`
	Ares *map[string]any `json:"ares,omitempty"`
	Authentication map[string]any `json:"authentication"`
	Card map[string]any `json:"card"`
	Challenge map[string]any `json:"challenge"`
	CreatedAt int `json:"createdAt"`
	Cres *any `json:"cres,omitempty"`
	Cryptogram *string `json:"cryptogram,omitempty"`
	Customer *map[string]any `json:"customer,omitempty"`
	DirectoryServer *map[string]any `json:"directoryServer,omitempty"`
	Eci *map[string]any `json:"eci,omitempty"`
	FailureReason *string `json:"failureReason,omitempty"`
	Id string `json:"id"`
	Initiator *map[string]any `json:"initiator,omitempty"`
	Merchant map[string]any `json:"merchant"`
	NextAction map[string]any `json:"nextAction"`
	Payment *map[string]any `json:"payment,omitempty"`
	PreferredVersions *[]any `json:"preferredVersions,omitempty"`
	Rreq *any `json:"rreq,omitempty"`
	Status string `json:"status"`
	ThreeDSServer *map[string]any `json:"threeDSServer,omitempty"`
	UpdatedAt *int `json:"updatedAt,omitempty"`
	Version string `json:"version"`
}

// ThreeDsSessionLoadMatch is the typed request payload for ThreeDsSession.LoadTyped.
type ThreeDsSessionLoadMatch struct {
	F3dsSessionId string `json:"3ds_session_id"`
}

// ThreeDsSessionCreateData is the typed request payload for ThreeDsSession.CreateTyped.
type ThreeDsSessionCreateData struct {
	AccessControlServer *map[string]any `json:"accessControlServer,omitempty"`
	Acquirer map[string]any `json:"acquirer"`
	Ares *map[string]any `json:"ares,omitempty"`
	Authentication map[string]any `json:"authentication"`
	Card map[string]any `json:"card"`
	Challenge map[string]any `json:"challenge"`
	CreatedAt int `json:"createdAt"`
	Cres *any `json:"cres,omitempty"`
	Cryptogram *string `json:"cryptogram,omitempty"`
	Customer *map[string]any `json:"customer,omitempty"`
	DirectoryServer *map[string]any `json:"directoryServer,omitempty"`
	Eci *map[string]any `json:"eci,omitempty"`
	FailureReason *string `json:"failureReason,omitempty"`
	Id string `json:"id"`
	Initiator *map[string]any `json:"initiator,omitempty"`
	Merchant map[string]any `json:"merchant"`
	NextAction map[string]any `json:"nextAction"`
	Payment *map[string]any `json:"payment,omitempty"`
	PreferredVersions *[]any `json:"preferredVersions,omitempty"`
	Rreq *any `json:"rreq,omitempty"`
	Status string `json:"status"`
	ThreeDSServer *map[string]any `json:"threeDSServer,omitempty"`
	UpdatedAt *int `json:"updatedAt,omitempty"`
	Version string `json:"version"`
}

// Webhook is the typed data model for the webhook entity.
type Webhook struct {
	CreatedAt *int `json:"createdAt,omitempty"`
	Events []any `json:"events"`
	Id *string `json:"id,omitempty"`
	UpdatedAt *any `json:"updatedAt,omitempty"`
	Url string `json:"url"`
}

// WebhookListMatch is the typed request payload for Webhook.ListTyped.
type WebhookListMatch struct {
	Limit *int `json:"limit,omitempty"`
	StartingAfter *string `json:"starting_after,omitempty"`
}

// WebhookCreateData is the typed request payload for Webhook.CreateTyped.
type WebhookCreateData struct {
	CreatedAt *int `json:"createdAt,omitempty"`
	Events []any `json:"events"`
	Id *string `json:"id,omitempty"`
	UpdatedAt *any `json:"updatedAt,omitempty"`
	Url string `json:"url"`
}

// WebhookRemoveMatch is the typed request payload for Webhook.RemoveTyped.
type WebhookRemoveMatch struct {
	WebhookEndpointId string `json:"webhook_endpoint_id"`
}

// WebhookEndpoint is the typed data model for the webhook_endpoint entity.
type WebhookEndpoint struct {
	CreatedAt *int `json:"createdAt,omitempty"`
	Events *[]any `json:"events,omitempty"`
	Id *string `json:"id,omitempty"`
	UpdatedAt *any `json:"updatedAt,omitempty"`
	Url *string `json:"url,omitempty"`
}

// WebhookEndpointLoadMatch is the typed request payload for WebhookEndpoint.LoadTyped.
type WebhookEndpointLoadMatch struct {
	Id string `json:"id"`
}

// WebhookEndpointUpdateData is the typed request payload for WebhookEndpoint.UpdateTyped.
type WebhookEndpointUpdateData struct {
	Id string `json:"id"`
	CreatedAt *int `json:"createdAt,omitempty"`
	Events *[]any `json:"events,omitempty"`
	UpdatedAt *any `json:"updatedAt,omitempty"`
	Url *string `json:"url,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
