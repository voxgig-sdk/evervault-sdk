# Relay entity test

require "minitest/autorun"
require "json"
require_relative "../Evervault_sdk"
require_relative "runner"

class RelayEntityTest < Minitest::Test
  def test_create_instance
    testsdk = EvervaultSDK.test(nil, nil)
    ent = testsdk.Relay(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = relay_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "relay." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set EVERVAULT_TEST_RELAY_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    relay_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.relay")))
    relay_ref01_data = nil
    if relay_ref01_data_raw.length > 0
      relay_ref01_data = Helpers.to_map(relay_ref01_data_raw[0][1])
    end

    # UPDATE
    relay_ref01_ent = client.Relay(nil)
    relay_ref01_data_up0_up = {
      "id" => relay_ref01_data["id"],
    }

    relay_ref01_markdef_up0_name = "app"
    relay_ref01_markdef_up0_value = "Mark01-relay_ref01_#{setup[:now]}"
    relay_ref01_data_up0_up[relay_ref01_markdef_up0_name] = relay_ref01_markdef_up0_value

    relay_ref01_resdata_up0_result = relay_ref01_ent.update(relay_ref01_data_up0_up, nil)
    relay_ref01_resdata_up0 = Helpers.to_map(relay_ref01_resdata_up0_result.respond_to?(:data_get) ? relay_ref01_resdata_up0_result.data_get : relay_ref01_resdata_up0_result)
    assert !relay_ref01_resdata_up0.nil?
    assert_equal relay_ref01_resdata_up0["id"], relay_ref01_data_up0_up["id"]
    assert_equal relay_ref01_resdata_up0[relay_ref01_markdef_up0_name], relay_ref01_markdef_up0_value

    # LOAD
    relay_ref01_match_dt0 = {
      "id" => relay_ref01_data["id"],
    }
    relay_ref01_data_dt0_loaded = relay_ref01_ent.load(relay_ref01_match_dt0, nil)
    relay_ref01_data_dt0_load_result = Helpers.to_map(relay_ref01_data_dt0_loaded.respond_to?(:data_get) ? relay_ref01_data_dt0_loaded.data_get : relay_ref01_data_dt0_loaded)
    assert !relay_ref01_data_dt0_load_result.nil?
    assert_equal relay_ref01_data_dt0_load_result["id"], relay_ref01_data["id"]

  end
end

def relay_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "relay", "RelayTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = EvervaultSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["relay01", "relay02", "relay03"],
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
  entid_env_raw = ENV["EVERVAULT_TEST_RELAY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "EVERVAULT_TEST_RELAY_ENTID" => idmap,
    "EVERVAULT_TEST_LIVE" => "FALSE",
    "EVERVAULT_TEST_EXPLAIN" => "FALSE",
    "EVERVAULT_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["EVERVAULT_TEST_RELAY_ENTID"])
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
