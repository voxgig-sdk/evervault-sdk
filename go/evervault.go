package voxgigevervaultsdk

import (
	"github.com/voxgig-sdk/evervault-sdk/go/core"
	"github.com/voxgig-sdk/evervault-sdk/go/entity"
	"github.com/voxgig-sdk/evervault-sdk/go/feature"
	_ "github.com/voxgig-sdk/evervault-sdk/go/utility"
)

// Type aliases preserve external API.
type EvervaultSDK = core.EvervaultSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type EvervaultEntity = core.EvervaultEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type EvervaultError = core.EvervaultError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAcquirerEntityFunc = func(client *core.EvervaultSDK, entopts map[string]any) core.EvervaultEntity {
		return entity.NewAcquirerEntity(client, entopts)
	}
	core.NewBinLookupEntityFunc = func(client *core.EvervaultSDK, entopts map[string]any) core.EvervaultEntity {
		return entity.NewBinLookupEntity(client, entopts)
	}
	core.NewCardEntityFunc = func(client *core.EvervaultSDK, entopts map[string]any) core.EvervaultEntity {
		return entity.NewCardEntity(client, entopts)
	}
	core.NewCardArtEntityFunc = func(client *core.EvervaultSDK, entopts map[string]any) core.EvervaultEntity {
		return entity.NewCardArtEntity(client, entopts)
	}
	core.NewClientSideTokenEntityFunc = func(client *core.EvervaultSDK, entopts map[string]any) core.EvervaultEntity {
		return entity.NewClientSideTokenEntity(client, entopts)
	}
	core.NewCoreEntityFunc = func(client *core.EvervaultSDK, entopts map[string]any) core.EvervaultEntity {
		return entity.NewCoreEntity(client, entopts)
	}
	core.NewCustomDomainEntityFunc = func(client *core.EvervaultSDK, entopts map[string]any) core.EvervaultEntity {
		return entity.NewCustomDomainEntity(client, entopts)
	}
	core.NewFunctionRunEntityFunc = func(client *core.EvervaultSDK, entopts map[string]any) core.EvervaultEntity {
		return entity.NewFunctionRunEntity(client, entopts)
	}
	core.NewMerchantEntityFunc = func(client *core.EvervaultSDK, entopts map[string]any) core.EvervaultEntity {
		return entity.NewMerchantEntity(client, entopts)
	}
	core.NewNetworkTokenEntityFunc = func(client *core.EvervaultSDK, entopts map[string]any) core.EvervaultEntity {
		return entity.NewNetworkTokenEntity(client, entopts)
	}
	core.NewNetworkTokenCryptogramEntityFunc = func(client *core.EvervaultSDK, entopts map[string]any) core.EvervaultEntity {
		return entity.NewNetworkTokenCryptogramEntity(client, entopts)
	}
	core.NewPaymentEntityFunc = func(client *core.EvervaultSDK, entopts map[string]any) core.EvervaultEntity {
		return entity.NewPaymentEntity(client, entopts)
	}
	core.NewRelayEntityFunc = func(client *core.EvervaultSDK, entopts map[string]any) core.EvervaultEntity {
		return entity.NewRelayEntity(client, entopts)
	}
	core.NewThreeDsSessionEntityFunc = func(client *core.EvervaultSDK, entopts map[string]any) core.EvervaultEntity {
		return entity.NewThreeDsSessionEntity(client, entopts)
	}
	core.NewWebhookEntityFunc = func(client *core.EvervaultSDK, entopts map[string]any) core.EvervaultEntity {
		return entity.NewWebhookEntity(client, entopts)
	}
	core.NewWebhookEndpointEntityFunc = func(client *core.EvervaultSDK, entopts map[string]any) core.EvervaultEntity {
		return entity.NewWebhookEndpointEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewEvervaultSDK = core.NewEvervaultSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewEvervaultSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *EvervaultSDK  { return NewEvervaultSDK(nil) }
func Test() *EvervaultSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
