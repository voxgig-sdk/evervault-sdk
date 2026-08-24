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
	core.NewCardEntityFunc = func(client *core.EvervaultSDK, entopts map[string]any) core.EvervaultEntity {
		return entity.NewCardEntity(client, entopts)
	}
	core.NewPaymentEntityFunc = func(client *core.EvervaultSDK, entopts map[string]any) core.EvervaultEntity {
		return entity.NewPaymentEntity(client, entopts)
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
