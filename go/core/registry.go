package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCardEntityFunc func(client *EvervaultSDK, entopts map[string]any) EvervaultEntity

var NewPaymentEntityFunc func(client *EvervaultSDK, entopts map[string]any) EvervaultEntity

