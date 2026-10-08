# Evervault SDK utility: prepare_body
require_relative 'media'
module EvervaultUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return EvervaultUtilities.raw_body(ctx.reqdata) if EvervaultUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
