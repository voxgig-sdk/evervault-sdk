# Evervault SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/debug_feature'
require_relative 'feature/idempotency_feature'
require_relative 'feature/metrics_feature'
require_relative 'feature/paging_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module EvervaultFeatures
  def self.make_feature(name)
    case name
    when "base"
      EvervaultBaseFeature.new
    when "debug"
      EvervaultDebugFeature.new
    when "idempotency"
      EvervaultIdempotencyFeature.new
    when "metrics"
      EvervaultMetricsFeature.new
    when "paging"
      EvervaultPagingFeature.new
    when "ratelimit"
      EvervaultRatelimitFeature.new
    when "retry"
      EvervaultRetryFeature.new
    when "test"
      EvervaultTestFeature.new
    when "timeout"
      EvervaultTimeoutFeature.new
    else
      EvervaultBaseFeature.new
    end
  end
end
