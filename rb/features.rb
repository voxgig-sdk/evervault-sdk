# Evervault SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module EvervaultFeatures
  def self.make_feature(name)
    case name
    when "base"
      EvervaultBaseFeature.new
    when "test"
      EvervaultTestFeature.new
    else
      EvervaultBaseFeature.new
    end
  end
end
