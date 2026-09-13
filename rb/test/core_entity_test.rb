# Core entity test

require "minitest/autorun"
require "json"
require_relative "../Evervault_sdk"
require_relative "runner"

class CoreEntityTest < Minitest::Test
  def test_create_instance
    testsdk = EvervaultSDK.test(nil, nil)
    ent = testsdk.Core(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "core" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = EvervaultSDK.test(seed, nil)
    seen = base.Core(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = EvervaultConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = EvervaultSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Core(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = core_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "core." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set EVERVAULT_TEST_CORE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    core_ref01_ent = client.Core(nil)
    core_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.core"), "core_ref01"))
    core_ref01_data["relay_id"] = setup[:idmap]["relay01"]

    core_ref01_data_result = core_ref01_ent.create(core_ref01_data, nil)
    core_ref01_data = Helpers.to_map(core_ref01_data_result.respond_to?(:data_get) ? core_ref01_data_result.data_get : core_ref01_data_result)
    assert !core_ref01_data.nil?
    assert !core_ref01_data["id"].nil?

    # LIST
    core_ref01_match = {}

    core_ref01_list_result = core_ref01_ent.list(core_ref01_match, nil)
    assert core_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(core_ref01_list_result),
      { "id" => core_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # REMOVE
    core_ref01_match_rm0 = {
      "id" => core_ref01_data["id"],
    }
    core_ref01_ent.remove(core_ref01_match_rm0, nil)

    # LIST
    core_ref01_match_rt0 = {}

    core_ref01_list_rt0_result = core_ref01_ent.list(core_ref01_match_rt0, nil)
    assert core_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(core_ref01_list_rt0_result),
      { "id" => core_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def core_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "core", "CoreTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = EvervaultSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["core01", "core02", "core03", "relay01", "relay02", "relay03"],
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
  entid_env_raw = ENV["EVERVAULT_TEST_CORE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "EVERVAULT_TEST_CORE_ENTID" => idmap,
    "EVERVAULT_TEST_LIVE" => "FALSE",
    "EVERVAULT_TEST_EXPLAIN" => "FALSE",
    "EVERVAULT_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["EVERVAULT_TEST_CORE_ENTID"])
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
