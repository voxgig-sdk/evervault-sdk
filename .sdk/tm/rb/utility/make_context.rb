# Evervault SDK utility: make_context
require_relative '../core/context'
module EvervaultUtilities
  MakeContext = ->(ctxmap, basectx) {
    EvervaultContext.new(ctxmap, basectx)
  }
end
