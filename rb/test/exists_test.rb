# Evervault SDK exists test

require "minitest/autorun"
require_relative "../Evervault_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = EvervaultSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
