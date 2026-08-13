# WebhookEndpoint entity test

require "minitest/autorun"
require "json"
require_relative "../Evervault_sdk"
require_relative "runner"

class WebhookEndpointEntityTest < Minitest::Test
  def test_create_instance
    testsdk = EvervaultSDK.test(nil, nil)
    ent = testsdk.WebhookEndpoint(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = webhook_endpoint_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "webhook_endpoint." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    webhook_endpoint_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.webhook_endpoint")))
    webhook_endpoint_ref01_data = nil
    if webhook_endpoint_ref01_data_raw.length > 0
      webhook_endpoint_ref01_data = Helpers.to_map(webhook_endpoint_ref01_data_raw[0][1])
    end

    # UPDATE
    webhook_endpoint_ref01_ent = client.WebhookEndpoint(nil)
    webhook_endpoint_ref01_data_up0_up = {
      "id" => webhook_endpoint_ref01_data["id"],
    }

    webhook_endpoint_ref01_markdef_up0_name = "url"
    webhook_endpoint_ref01_markdef_up0_value = "Mark01-webhook_endpoint_ref01_#{setup[:now]}"
    webhook_endpoint_ref01_data_up0_up[webhook_endpoint_ref01_markdef_up0_name] = webhook_endpoint_ref01_markdef_up0_value

    webhook_endpoint_ref01_resdata_up0_result = webhook_endpoint_ref01_ent.update(webhook_endpoint_ref01_data_up0_up, nil)
    webhook_endpoint_ref01_resdata_up0 = Helpers.to_map(webhook_endpoint_ref01_resdata_up0_result.respond_to?(:data_get) ? webhook_endpoint_ref01_resdata_up0_result.data_get : webhook_endpoint_ref01_resdata_up0_result)
    assert !webhook_endpoint_ref01_resdata_up0.nil?
    assert_equal webhook_endpoint_ref01_resdata_up0["id"], webhook_endpoint_ref01_data_up0_up["id"]
    assert_equal webhook_endpoint_ref01_resdata_up0[webhook_endpoint_ref01_markdef_up0_name], webhook_endpoint_ref01_markdef_up0_value

    # LOAD
    webhook_endpoint_ref01_match_dt0 = {
      "id" => webhook_endpoint_ref01_data["id"],
    }
    webhook_endpoint_ref01_data_dt0_loaded = webhook_endpoint_ref01_ent.load(webhook_endpoint_ref01_match_dt0, nil)
    webhook_endpoint_ref01_data_dt0_load_result = Helpers.to_map(webhook_endpoint_ref01_data_dt0_loaded.respond_to?(:data_get) ? webhook_endpoint_ref01_data_dt0_loaded.data_get : webhook_endpoint_ref01_data_dt0_loaded)
    assert !webhook_endpoint_ref01_data_dt0_load_result.nil?
    assert_equal webhook_endpoint_ref01_data_dt0_load_result["id"], webhook_endpoint_ref01_data["id"]

  end
end

def webhook_endpoint_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "webhook_endpoint", "WebhookEndpointTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = EvervaultSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["webhook_endpoint01", "webhook_endpoint02", "webhook_endpoint03"],
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
  entid_env_raw = ENV["EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID" => idmap,
    "EVERVAULT_TEST_LIVE" => "FALSE",
    "EVERVAULT_TEST_EXPLAIN" => "FALSE",
    "EVERVAULT_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["EVERVAULT_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
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
