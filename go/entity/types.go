// Typed models for the Evervault SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Acquirer is the typed data model for the acquirer entity.
type Acquirer struct {
	Configuration []any `json:"configuration"`
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
	Configuration []any `json:"configuration"`
	Default bool `json:"default"`
	Description *string `json:"description,omitempty"`
	Id string `json:"id"`
	Name string `json:"name"`
}

// AcquirerUpdateData is the typed request payload for Acquirer.UpdateTyped.
type AcquirerUpdateData struct {
	Id string `json:"id"`
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
	AutomaticUpdate *string `json:"automatic_update,omitempty"`
	Bin string `json:"bin"`
	Brand *string `json:"brand,omitempty"`
	Card map[string]any `json:"card"`
	Cardholder *map[string]any `json:"cardholder,omitempty"`
	Country *string `json:"country,omitempty"`
	CreatedAt int `json:"created_at"`
	Currency *string `json:"currency,omitempty"`
	Expiry map[string]any `json:"expiry"`
	Extension *[]any `json:"extension,omitempty"`
	Funding *string `json:"funding,omitempty"`
	Id *string `json:"id,omitempty"`
	Issuer *string `json:"issuer,omitempty"`
	LastFour string `json:"last_four"`
	Number string `json:"number"`
	Replacement *any `json:"replacement,omitempty"`
	Segment *string `json:"segment,omitempty"`
	Status *string `json:"status,omitempty"`
	UpdatedAt *any `json:"updated_at,omitempty"`
}

// CardLoadMatch is the typed request payload for Card.LoadTyped.
type CardLoadMatch struct {
	Id string `json:"id"`
}

// CardCreateData is the typed request payload for Card.CreateTyped.
type CardCreateData struct {
	Address map[string]any `json:"address"`
	AutomaticUpdate *string `json:"automatic_update,omitempty"`
	Bin string `json:"bin"`
	Brand *string `json:"brand,omitempty"`
	Card map[string]any `json:"card"`
	Cardholder *map[string]any `json:"cardholder,omitempty"`
	Country *string `json:"country,omitempty"`
	CreatedAt int `json:"created_at"`
	Currency *string `json:"currency,omitempty"`
	Expiry map[string]any `json:"expiry"`
	Extension *[]any `json:"extension,omitempty"`
	Funding *string `json:"funding,omitempty"`
	Id *string `json:"id,omitempty"`
	Issuer *string `json:"issuer,omitempty"`
	LastFour string `json:"last_four"`
	Number string `json:"number"`
	Replacement *any `json:"replacement,omitempty"`
	Segment *string `json:"segment,omitempty"`
	Status *string `json:"status,omitempty"`
	UpdatedAt *any `json:"updated_at,omitempty"`
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
	Category *string `json:"category,omitempty"`
	CreatedAt *int `json:"created_at,omitempty"`
	CustomDomain *string `json:"custom_domain,omitempty"`
	DestinationDomain string `json:"destination_domain"`
	EncryptEmptyString *bool `json:"encrypt_empty_string,omitempty"`
	EncryptedAt *int `json:"encrypted_at,omitempty"`
	EvervaultDomain *string `json:"evervault_domain,omitempty"`
	Fingerprint *string `json:"fingerprint,omitempty"`
	Id *string `json:"id,omitempty"`
	Metadata *any `json:"metadata,omitempty"`
	PhoneNumber *string `json:"phone_number,omitempty"`
	Relay *string `json:"relay,omitempty"`
	Role *string `json:"role,omitempty"`
	Route []any `json:"route"`
	Status *string `json:"status,omitempty"`
	Token string `json:"token"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *int `json:"updated_at,omitempty"`
	ValidationRecord *string `json:"validation_record,omitempty"`
}

// CoreListMatch is the typed request payload for Core.ListTyped.
type CoreListMatch struct {
	RelayId *string `json:"relay_id,omitempty"`
}

// CoreCreateData is the typed request payload for Core.CreateTyped.
type CoreCreateData struct {
	App *string `json:"app,omitempty"`
	Authentication *any `json:"authentication,omitempty"`
	Category *string `json:"category,omitempty"`
	CreatedAt *int `json:"created_at,omitempty"`
	CustomDomain *string `json:"custom_domain,omitempty"`
	DestinationDomain string `json:"destination_domain"`
	EncryptEmptyString *bool `json:"encrypt_empty_string,omitempty"`
	EncryptedAt *int `json:"encrypted_at,omitempty"`
	EvervaultDomain *string `json:"evervault_domain,omitempty"`
	Fingerprint *string `json:"fingerprint,omitempty"`
	Id *string `json:"id,omitempty"`
	Metadata *any `json:"metadata,omitempty"`
	PhoneNumber *string `json:"phone_number,omitempty"`
	Relay *string `json:"relay,omitempty"`
	Role *string `json:"role,omitempty"`
	Route []any `json:"route"`
	Status *string `json:"status,omitempty"`
	Token string `json:"token"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *int `json:"updated_at,omitempty"`
	ValidationRecord *string `json:"validation_record,omitempty"`
}

// CoreRemoveMatch is the typed request payload for Core.RemoveTyped.
type CoreRemoveMatch struct {
	Id string `json:"id"`
	RelayId *string `json:"relay_id,omitempty"`
}

// CustomDomain is the typed data model for the custom_domain entity.
type CustomDomain struct {
	CreatedAt *int `json:"created_at,omitempty"`
	CustomDomain *string `json:"custom_domain,omitempty"`
	Id *string `json:"id,omitempty"`
	Relay *string `json:"relay,omitempty"`
	Status *string `json:"status,omitempty"`
	UpdatedAt *int `json:"updated_at,omitempty"`
	ValidationRecord *string `json:"validation_record,omitempty"`
}

// CustomDomainLoadMatch is the typed request payload for CustomDomain.LoadTyped.
type CustomDomainLoadMatch struct {
	Id string `json:"id"`
	RelayId string `json:"relay_id"`
}

// CustomDomainCreateData is the typed request payload for CustomDomain.CreateTyped.
type CustomDomainCreateData struct {
	RelayId string `json:"relay_id"`
}

// FunctionRun is the typed data model for the function_run entity.
type FunctionRun struct {
	Async *bool `json:"async,omitempty"`
	CreatedAt *int `json:"created_at,omitempty"`
	Error *any `json:"error,omitempty"`
	Id *string `json:"id,omitempty"`
	Payload map[string]any `json:"payload"`
	Result *map[string]any `json:"result,omitempty"`
	Status *string `json:"status,omitempty"`
}

// FunctionRunCreateData is the typed request payload for FunctionRun.CreateTyped.
type FunctionRunCreateData struct {
	FunctionName string `json:"function_name"`
}

// Merchant is the typed data model for the merchant entity.
type Merchant struct {
	ApplePay *map[string]any `json:"apple_pay,omitempty"`
	Business *map[string]any `json:"business,omitempty"`
	CategoryCode *string `json:"category_code,omitempty"`
	CreatedAt int `json:"created_at"`
	Id string `json:"id"`
	Name string `json:"name"`
	NetworkToken *map[string]any `json:"network_token,omitempty"`
	ShortName *string `json:"short_name,omitempty"`
	UpdatedAt *int `json:"updated_at,omitempty"`
	Website string `json:"website"`
}

// MerchantLoadMatch is the typed request payload for Merchant.LoadTyped.
type MerchantLoadMatch struct {
	Id string `json:"id"`
}

// MerchantCreateData is the typed request payload for Merchant.CreateTyped.
type MerchantCreateData struct {
	ApplePay *map[string]any `json:"apple_pay,omitempty"`
	Business *map[string]any `json:"business,omitempty"`
	CategoryCode *string `json:"category_code,omitempty"`
	CreatedAt int `json:"created_at"`
	Id string `json:"id"`
	Name string `json:"name"`
	NetworkToken *map[string]any `json:"network_token,omitempty"`
	ShortName *string `json:"short_name,omitempty"`
	UpdatedAt *int `json:"updated_at,omitempty"`
	Website string `json:"website"`
}

// MerchantUpdateData is the typed request payload for Merchant.UpdateTyped.
type MerchantUpdateData struct {
	Id string `json:"id"`
}

// NetworkToken is the typed data model for the network_token entity.
type NetworkToken struct {
	Card map[string]any `json:"card"`
	CreatedAt int `json:"created_at"`
	Expiry map[string]any `json:"expiry"`
	Id string `json:"id"`
	Merchant string `json:"merchant"`
	Number string `json:"number"`
	PaymentAccountReference *string `json:"payment_account_reference,omitempty"`
	Status string `json:"status"`
	TokenRequestorIdentifier string `json:"token_requestor_identifier"`
	TokenServiceProvider string `json:"token_service_provider"`
	UpdateType *string `json:"update_type,omitempty"`
	UpdatedAt *int `json:"updated_at,omitempty"`
}

// NetworkTokenLoadMatch is the typed request payload for NetworkToken.LoadTyped.
type NetworkTokenLoadMatch struct {
	Id string `json:"id"`
}

// NetworkTokenCreateData is the typed request payload for NetworkToken.CreateTyped.
type NetworkTokenCreateData struct {
	Card map[string]any `json:"card"`
	CreatedAt int `json:"created_at"`
	Expiry map[string]any `json:"expiry"`
	Id string `json:"id"`
	Merchant string `json:"merchant"`
	Number string `json:"number"`
	PaymentAccountReference *string `json:"payment_account_reference,omitempty"`
	Status string `json:"status"`
	TokenRequestorIdentifier string `json:"token_requestor_identifier"`
	TokenServiceProvider string `json:"token_service_provider"`
	UpdateType *string `json:"update_type,omitempty"`
	UpdatedAt *int `json:"updated_at,omitempty"`
}

// NetworkTokenCryptogram is the typed data model for the network_token_cryptogram entity.
type NetworkTokenCryptogram struct {
	CreatedAt *int `json:"created_at,omitempty"`
	Cryptogram *string `json:"cryptogram,omitempty"`
	Id *string `json:"id,omitempty"`
}

// NetworkTokenCryptogramCreateData is the typed request payload for NetworkTokenCryptogram.CreateTyped.
type NetworkTokenCryptogramCreateData struct {
	Id string `json:"id"`
}

// Payment is the typed data model for the payment entity.
type Payment struct {
	ApplePay *map[string]any `json:"apple_pay,omitempty"`
	Business *map[string]any `json:"business,omitempty"`
	CategoryCode *string `json:"category_code,omitempty"`
	Configuration []any `json:"configuration"`
	CreatedAt int `json:"created_at"`
	Data *map[string]any `json:"data,omitempty"`
	Default bool `json:"default"`
	Description *string `json:"description,omitempty"`
	Id string `json:"id"`
	Name string `json:"name"`
	NetworkToken *map[string]any `json:"network_token,omitempty"`
	ShortName *string `json:"short_name,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *int `json:"updated_at,omitempty"`
	Website string `json:"website"`
}

// PaymentListMatch is the typed request payload for Payment.ListTyped.
type PaymentListMatch struct {
	F3dsSessionId string `json:"3ds_session_id"`
}

// PaymentRemoveMatch is the typed request payload for Payment.RemoveTyped.
type PaymentRemoveMatch struct {
	AcquirerId *string `json:"acquirer_id,omitempty"`
	CardId *string `json:"card_id,omitempty"`
	MerchantId *string `json:"merchant_id,omitempty"`
	NetworkTokenId *string `json:"network_token_id,omitempty"`
}

// Relay is the typed data model for the relay entity.
type Relay struct {
	App *string `json:"app,omitempty"`
	Authentication *any `json:"authentication,omitempty"`
	CreatedAt *int `json:"created_at,omitempty"`
	DestinationDomain *string `json:"destination_domain,omitempty"`
	EncryptEmptyString *bool `json:"encrypt_empty_string,omitempty"`
	EvervaultDomain *string `json:"evervault_domain,omitempty"`
	Id *string `json:"id,omitempty"`
	Route *[]any `json:"route,omitempty"`
	UpdatedAt *int `json:"updated_at,omitempty"`
}

// RelayLoadMatch is the typed request payload for Relay.LoadTyped.
type RelayLoadMatch struct {
	Id string `json:"id"`
}

// RelayUpdateData is the typed request payload for Relay.UpdateTyped.
type RelayUpdateData struct {
	Id string `json:"id"`
}

// ThreeDsSession is the typed data model for the three_ds_session entity.
type ThreeDsSession struct {
	AccessControlServer *map[string]any `json:"access_control_server,omitempty"`
	Acquirer map[string]any `json:"acquirer"`
	Are *map[string]any `json:"are,omitempty"`
	Authentication map[string]any `json:"authentication"`
	Card map[string]any `json:"card"`
	Challenge map[string]any `json:"challenge"`
	Cre *any `json:"cre,omitempty"`
	CreatedAt int `json:"created_at"`
	Cryptogram *string `json:"cryptogram,omitempty"`
	Customer *map[string]any `json:"customer,omitempty"`
	DirectoryServer *map[string]any `json:"directory_server,omitempty"`
	Eci *map[string]any `json:"eci,omitempty"`
	FailureReason *string `json:"failure_reason,omitempty"`
	Id string `json:"id"`
	Initiator *map[string]any `json:"initiator,omitempty"`
	Merchant map[string]any `json:"merchant"`
	NextAction map[string]any `json:"next_action"`
	Payment *map[string]any `json:"payment,omitempty"`
	PreferredVersion *[]any `json:"preferred_version,omitempty"`
	Rreq *any `json:"rreq,omitempty"`
	Status string `json:"status"`
	ThreeDsServer *map[string]any `json:"three_ds_server,omitempty"`
	UpdatedAt *int `json:"updated_at,omitempty"`
	Version string `json:"version"`
}

// ThreeDsSessionLoadMatch is the typed request payload for ThreeDsSession.LoadTyped.
type ThreeDsSessionLoadMatch struct {
	F3dsSessionId string `json:"3ds_session_id"`
}

// ThreeDsSessionCreateData is the typed request payload for ThreeDsSession.CreateTyped.
type ThreeDsSessionCreateData struct {
	AccessControlServer *map[string]any `json:"access_control_server,omitempty"`
	Acquirer map[string]any `json:"acquirer"`
	Are *map[string]any `json:"are,omitempty"`
	Authentication map[string]any `json:"authentication"`
	Card map[string]any `json:"card"`
	Challenge map[string]any `json:"challenge"`
	Cre *any `json:"cre,omitempty"`
	CreatedAt int `json:"created_at"`
	Cryptogram *string `json:"cryptogram,omitempty"`
	Customer *map[string]any `json:"customer,omitempty"`
	DirectoryServer *map[string]any `json:"directory_server,omitempty"`
	Eci *map[string]any `json:"eci,omitempty"`
	FailureReason *string `json:"failure_reason,omitempty"`
	Id string `json:"id"`
	Initiator *map[string]any `json:"initiator,omitempty"`
	Merchant map[string]any `json:"merchant"`
	NextAction map[string]any `json:"next_action"`
	Payment *map[string]any `json:"payment,omitempty"`
	PreferredVersion *[]any `json:"preferred_version,omitempty"`
	Rreq *any `json:"rreq,omitempty"`
	Status string `json:"status"`
	ThreeDsServer *map[string]any `json:"three_ds_server,omitempty"`
	UpdatedAt *int `json:"updated_at,omitempty"`
	Version string `json:"version"`
}

// Webhook is the typed data model for the webhook entity.
type Webhook struct {
	CreatedAt *int `json:"created_at,omitempty"`
	Event []any `json:"event"`
	Id *string `json:"id,omitempty"`
	UpdatedAt *any `json:"updated_at,omitempty"`
	Url string `json:"url"`
}

// WebhookListMatch is the typed request payload for Webhook.ListTyped.
type WebhookListMatch struct {
	CreatedAt *int `json:"created_at,omitempty"`
	Event *[]any `json:"event,omitempty"`
	Id *string `json:"id,omitempty"`
	UpdatedAt *any `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
}

// WebhookCreateData is the typed request payload for Webhook.CreateTyped.
type WebhookCreateData struct {
	CreatedAt *int `json:"created_at,omitempty"`
	Event []any `json:"event"`
	Id *string `json:"id,omitempty"`
	UpdatedAt *any `json:"updated_at,omitempty"`
	Url string `json:"url"`
}

// WebhookRemoveMatch is the typed request payload for Webhook.RemoveTyped.
type WebhookRemoveMatch struct {
	WebhookEndpointId string `json:"webhook_endpoint_id"`
}

// WebhookEndpoint is the typed data model for the webhook_endpoint entity.
type WebhookEndpoint struct {
	CreatedAt *int `json:"created_at,omitempty"`
	Event *[]any `json:"event,omitempty"`
	Id *string `json:"id,omitempty"`
	UpdatedAt *any `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
}

// WebhookEndpointLoadMatch is the typed request payload for WebhookEndpoint.LoadTyped.
type WebhookEndpointLoadMatch struct {
	Id string `json:"id"`
}

// WebhookEndpointUpdateData is the typed request payload for WebhookEndpoint.UpdateTyped.
type WebhookEndpointUpdateData struct {
	Id string `json:"id"`
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

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
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

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
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
