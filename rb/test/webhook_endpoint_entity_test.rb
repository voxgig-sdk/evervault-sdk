# WebhookEndpoint entity test

require "minitest/autorun"
require "json"
require_relative "../Evervault_sdk"
require_relative "runner"

class WebhookEndpointEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = EvervaultSDK.test(nil, nil)
    ent = testsdk.WebhookEndpoint(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "webhook_endpoint" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = EvervaultSDK.test(seed, nil).WebhookEndpoint(nil).list(nil, nil)
    # list resolves to one entity per record; data_get reads the record.
    assert_equal 2, items.length
    items.each do |item|
      assert item.respond_to?(:data_get)
      assert item.data_get.is_a?(Hash)
    end
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "webhook_endpoint" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = EvervaultSDK.test(seed, nil)
    seen = base.WebhookEndpoint(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = EvervaultConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = EvervaultSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.WebhookEndpoint(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  class FailHook < EvervaultBaseFeature
    attr_reader :unexpected

    def initialize
      super()
      @name = "failhook"
      @unexpected = 0
    end

    def PreSpec(ctx)
      raise "webhook_endpoint hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      EvervaultSDK.test(offline, nil).WebhookEndpoint(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    EvervaultSDK.test(offline, nil).WebhookEndpoint(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = EvervaultConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = EvervaultSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.WebhookEndpoint(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    EvervaultSDK.test(nil, nil).WebhookEndpoint(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = EvervaultSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.WebhookEndpoint(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.WebhookEndpoint(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate
    cfg = EvervaultConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = EvervaultSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.WebhookEndpoint(nil).list({ "limit" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = webhook_endpoint_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "webhook_endpoint." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # CREATE
    webhook_endpoint_ref01_ent = client.WebhookEndpoint(nil)
    webhook_endpoint_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.webhook_endpoint"), "webhook_endpoint_ref01"))

    webhook_endpoint_ref01_data_result = webhook_endpoint_ref01_ent.create(webhook_endpoint_ref01_data, nil)
    webhook_endpoint_ref01_data = Helpers.to_map(webhook_endpoint_ref01_data_result.respond_to?(:data_get) ? webhook_endpoint_ref01_data_result.data_get : webhook_endpoint_ref01_data_result)
    assert !webhook_endpoint_ref01_data.nil?
    assert !webhook_endpoint_ref01_data["id"].nil?

    # LIST
    webhook_endpoint_ref01_match = {}

    webhook_endpoint_ref01_list_result = webhook_endpoint_ref01_ent.list(webhook_endpoint_ref01_match, nil)
    assert webhook_endpoint_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(webhook_endpoint_ref01_list_result),
      { "id" => webhook_endpoint_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # UPDATE
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
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
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

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID" => idmap,
    "EVERVAULT_TEST_LIVE" => "FALSE",
    "EVERVAULT_TEST_EXPLAIN" => "FALSE",
    "EVERVAULT_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID"])
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
