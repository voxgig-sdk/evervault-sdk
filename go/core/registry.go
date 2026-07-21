package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAcquirerEntityFunc func(client *EvervaultSDK, entopts map[string]any) EvervaultEntity

var NewBinLookupEntityFunc func(client *EvervaultSDK, entopts map[string]any) EvervaultEntity

var NewCardEntityFunc func(client *EvervaultSDK, entopts map[string]any) EvervaultEntity

var NewCardArtEntityFunc func(client *EvervaultSDK, entopts map[string]any) EvervaultEntity

var NewClientSideTokenEntityFunc func(client *EvervaultSDK, entopts map[string]any) EvervaultEntity

var NewCoreEntityFunc func(client *EvervaultSDK, entopts map[string]any) EvervaultEntity

var NewCustomDomainEntityFunc func(client *EvervaultSDK, entopts map[string]any) EvervaultEntity

var NewFunctionRunEntityFunc func(client *EvervaultSDK, entopts map[string]any) EvervaultEntity

var NewMerchantEntityFunc func(client *EvervaultSDK, entopts map[string]any) EvervaultEntity

var NewNetworkTokenEntityFunc func(client *EvervaultSDK, entopts map[string]any) EvervaultEntity

var NewNetworkTokenCryptogramEntityFunc func(client *EvervaultSDK, entopts map[string]any) EvervaultEntity

var NewPaymentEntityFunc func(client *EvervaultSDK, entopts map[string]any) EvervaultEntity

var NewRelayEntityFunc func(client *EvervaultSDK, entopts map[string]any) EvervaultEntity

var NewThreeDsSessionEntityFunc func(client *EvervaultSDK, entopts map[string]any) EvervaultEntity

var NewWebhookEntityFunc func(client *EvervaultSDK, entopts map[string]any) EvervaultEntity

var NewWebhookEndpointEntityFunc func(client *EvervaultSDK, entopts map[string]any) EvervaultEntity

