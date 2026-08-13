# Evervault SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

EvervaultUtility.registrar = ->(u) {
  u.clean = EvervaultUtilities::Clean
  u.done = EvervaultUtilities::Done
  u.make_error = EvervaultUtilities::MakeError
  u.feature_add = EvervaultUtilities::FeatureAdd
  u.feature_hook = EvervaultUtilities::FeatureHook
  u.feature_init = EvervaultUtilities::FeatureInit
  u.fetcher = EvervaultUtilities::Fetcher
  u.make_fetch_def = EvervaultUtilities::MakeFetchDef
  u.make_context = EvervaultUtilities::MakeContext
  u.make_options = EvervaultUtilities::MakeOptions
  u.make_request = EvervaultUtilities::MakeRequest
  u.make_response = EvervaultUtilities::MakeResponse
  u.make_result = EvervaultUtilities::MakeResult
  u.make_point = EvervaultUtilities::MakePoint
  u.make_spec = EvervaultUtilities::MakeSpec
  u.make_url = EvervaultUtilities::MakeUrl
  u.param = EvervaultUtilities::Param
  u.prepare_auth = EvervaultUtilities::PrepareAuth
  u.prepare_body = EvervaultUtilities::PrepareBody
  u.prepare_headers = EvervaultUtilities::PrepareHeaders
  u.prepare_method = EvervaultUtilities::PrepareMethod
  u.prepare_params = EvervaultUtilities::PrepareParams
  u.prepare_path = EvervaultUtilities::PreparePath
  u.prepare_query = EvervaultUtilities::PrepareQuery
  u.graphql_body = EvervaultUtilities::GraphqlBody
  u.graphql_errors = EvervaultUtilities::GraphqlErrors
  u.result_basic = EvervaultUtilities::ResultBasic
  u.result_body = EvervaultUtilities::ResultBody
  u.result_headers = EvervaultUtilities::ResultHeaders
  u.transform_request = EvervaultUtilities::TransformRequest
  u.transform_response = EvervaultUtilities::TransformResponse
}
