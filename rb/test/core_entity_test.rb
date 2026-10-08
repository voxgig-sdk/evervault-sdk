# Core entity test

require "minitest/autorun"
require "json"
require_relative "../Evervault_sdk"
require_relative "runner"

class CoreEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = EvervaultSDK.test(nil, nil)
    ent = testsdk.Core(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = EvervaultConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = EvervaultSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Core(nil).list({ "relay_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
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
    if setup[:live]
      ["relay01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via EVERVAULT_TEST_CORE_ENTID")
        end
      end
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
    core_ref01_match = {
      "relay_id" => setup[:idmap]["relay01"],
    }

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
    core_ref01_match_rt0 = {
      "relay_id" => setup[:idmap]["relay01"],
    }

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
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
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

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
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
