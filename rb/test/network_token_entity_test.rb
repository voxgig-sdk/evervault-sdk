# NetworkToken entity test

require "minitest/autorun"
require "json"
require_relative "../Evervault_sdk"
require_relative "runner"

class NetworkTokenEntityTest < Minitest::Test
  def test_create_instance
    testsdk = EvervaultSDK.test(nil, nil)
    ent = testsdk.NetworkToken(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = network_token_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "network_token." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set EVERVAULT_TEST_NETWORK_TOKEN_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    network_token_ref01_ent = client.NetworkToken(nil)
    network_token_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.network_token"), "network_token_ref01"))

    network_token_ref01_data_result = network_token_ref01_ent.create(network_token_ref01_data, nil)
    network_token_ref01_data = Helpers.to_map(network_token_ref01_data_result.respond_to?(:data_get) ? network_token_ref01_data_result.data_get : network_token_ref01_data_result)
    assert !network_token_ref01_data.nil?
    assert !network_token_ref01_data["id"].nil?

    # LOAD
    network_token_ref01_match_dt0 = {
      "id" => network_token_ref01_data["id"],
    }
    network_token_ref01_data_dt0_loaded = network_token_ref01_ent.load(network_token_ref01_match_dt0, nil)
    network_token_ref01_data_dt0_load_result = Helpers.to_map(network_token_ref01_data_dt0_loaded.respond_to?(:data_get) ? network_token_ref01_data_dt0_loaded.data_get : network_token_ref01_data_dt0_loaded)
    assert !network_token_ref01_data_dt0_load_result.nil?
    assert_equal network_token_ref01_data_dt0_load_result["id"], network_token_ref01_data["id"]

  end
end

def network_token_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "network_token", "NetworkTokenTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = EvervaultSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["network_token01", "network_token02", "network_token03"],
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
  entid_env_raw = ENV["EVERVAULT_TEST_NETWORK_TOKEN_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "EVERVAULT_TEST_NETWORK_TOKEN_ENTID" => idmap,
    "EVERVAULT_TEST_LIVE" => "FALSE",
    "EVERVAULT_TEST_EXPLAIN" => "FALSE",
    "EVERVAULT_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["EVERVAULT_TEST_NETWORK_TOKEN_ENTID"])
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
