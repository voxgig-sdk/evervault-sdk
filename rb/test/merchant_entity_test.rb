# Merchant entity test

require "minitest/autorun"
require "json"
require_relative "../Evervault_sdk"
require_relative "runner"

class MerchantEntityTest < Minitest::Test
  def test_create_instance
    testsdk = EvervaultSDK.test(nil, nil)
    ent = testsdk.Merchant(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = merchant_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "merchant." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set EVERVAULT_TEST_MERCHANT_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    merchant_ref01_ent = client.Merchant(nil)
    merchant_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.merchant"), "merchant_ref01"))

    merchant_ref01_data_result = merchant_ref01_ent.create(merchant_ref01_data, nil)
    merchant_ref01_data = Helpers.to_map(merchant_ref01_data_result.respond_to?(:data_get) ? merchant_ref01_data_result.data_get : merchant_ref01_data_result)
    assert !merchant_ref01_data.nil?
    assert !merchant_ref01_data["id"].nil?

    # UPDATE
    merchant_ref01_data_up0_up = {
      "id" => merchant_ref01_data["id"],
    }

    merchant_ref01_markdef_up0_name = "categoryCode"
    merchant_ref01_markdef_up0_value = "Mark01-merchant_ref01_#{setup[:now]}"
    merchant_ref01_data_up0_up[merchant_ref01_markdef_up0_name] = merchant_ref01_markdef_up0_value

    merchant_ref01_resdata_up0_result = merchant_ref01_ent.update(merchant_ref01_data_up0_up, nil)
    merchant_ref01_resdata_up0 = Helpers.to_map(merchant_ref01_resdata_up0_result.respond_to?(:data_get) ? merchant_ref01_resdata_up0_result.data_get : merchant_ref01_resdata_up0_result)
    assert !merchant_ref01_resdata_up0.nil?
    assert_equal merchant_ref01_resdata_up0["id"], merchant_ref01_data_up0_up["id"]
    assert_equal merchant_ref01_resdata_up0[merchant_ref01_markdef_up0_name], merchant_ref01_markdef_up0_value

    # LOAD
    merchant_ref01_match_dt0 = {
      "id" => merchant_ref01_data["id"],
    }
    merchant_ref01_data_dt0_loaded = merchant_ref01_ent.load(merchant_ref01_match_dt0, nil)
    merchant_ref01_data_dt0_load_result = Helpers.to_map(merchant_ref01_data_dt0_loaded.respond_to?(:data_get) ? merchant_ref01_data_dt0_loaded.data_get : merchant_ref01_data_dt0_loaded)
    assert !merchant_ref01_data_dt0_load_result.nil?
    assert_equal merchant_ref01_data_dt0_load_result["id"], merchant_ref01_data["id"]

  end
end

def merchant_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "merchant", "MerchantTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = EvervaultSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["merchant01", "merchant02", "merchant03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["EVERVAULT_TEST_MERCHANT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "EVERVAULT_TEST_MERCHANT_ENTID" => idmap,
    "EVERVAULT_TEST_LIVE" => "FALSE",
    "EVERVAULT_TEST_EXPLAIN" => "FALSE",
    "EVERVAULT_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["EVERVAULT_TEST_MERCHANT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["EVERVAULT_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["EVERVAULT_APIKEY"],
      },
      extra || {},
    ])
    client = EvervaultSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["EVERVAULT_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["EVERVAULT_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
