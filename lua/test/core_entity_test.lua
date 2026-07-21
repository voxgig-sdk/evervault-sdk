-- Core entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("evervault_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("CoreEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Core(nil)
    assert.is_not_nil(ent)
  end)

  -- Feature #4: the entity stream(action, ...) method runs the op pipeline and
  -- returns an iterator over result items. With the streaming feature active it
  -- yields the feature's incremental output; otherwise it falls back to the
  -- materialised list so stream always yields.
  it("should stream", function()
    local seed = {
      entity = {
        ["core"] = {
          s1 = { id = "s1" },
          s2 = { id = "s2" },
          s3 = { id = "s3" },
        },
      },
    }

    -- Fallback: streaming inactive -> yields the materialised list items.
    local base = sdk.test(seed, nil)
    local seen = {}
    for item in base:Core(nil):stream("list", nil, nil) do
      table.insert(seen, item)
    end
    assert.are.equal(3, #seen)

    -- Inbound: streaming active -> yields each item from the feature.
    local config = require("config")()
    if type(config.feature) == "table" and config.feature.streaming ~= nil then
      local streamsdk = sdk.test(seed, { feature = { streaming = { active = true } } })
      local got = {}
      for item in streamsdk:Core(nil):stream("list", nil, nil) do
        if vs.islist(item) then
          for _, sub in ipairs(item) do
            table.insert(got, sub)
          end
        else
          table.insert(got, item)
        end
      end
      assert.are.equal(3, #got)
    end
  end)

  it("should run basic flow", function()
    local setup = core_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "core." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set EVERVAULT_TEST_CORE_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local core_ref01_ent = client:Core(nil)
    local core_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.core"), "core_ref01"))
    core_ref01_data["relay_id"] = setup.idmap["relay01"]

    local core_ref01_data_result, err = core_ref01_ent:create(core_ref01_data, nil)
    assert.is_nil(err)
    core_ref01_data = helpers.to_map(core_ref01_data_result)
    assert.is_not_nil(core_ref01_data)
    assert.is_not_nil(core_ref01_data["id"])

    -- LIST
    local core_ref01_match = {}

    local core_ref01_list_result, err = core_ref01_ent:list(core_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(core_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(core_ref01_list_result),
      { id = core_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    -- REMOVE
    local core_ref01_match_rm0 = {
      id = core_ref01_data["id"],
    }
    local _, err = core_ref01_ent:remove(core_ref01_match_rm0, nil)
    assert.is_nil(err)

    -- LIST
    local core_ref01_match_rt0 = {}

    local core_ref01_list_rt0_result, err = core_ref01_ent:list(core_ref01_match_rt0, nil)
    assert.is_nil(err)
    assert.is_table(core_ref01_list_rt0_result)

    local not_found_item = vs.select(
      runner.entity_list_to_data(core_ref01_list_rt0_result),
      { id = core_ref01_data["id"] })
    assert.is_true(vs.isempty(not_found_item))

  end)
end)

function core_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/core/CoreTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read core test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "core01", "core02", "core03", "relay01", "relay02", "relay03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("EVERVAULT_TEST_CORE_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["EVERVAULT_TEST_CORE_ENTID"] = idmap,
    ["EVERVAULT_TEST_LIVE"] = "FALSE",
    ["EVERVAULT_TEST_EXPLAIN"] = "FALSE",
    ["EVERVAULT_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["EVERVAULT_TEST_CORE_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["EVERVAULT_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["EVERVAULT_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["EVERVAULT_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["EVERVAULT_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
