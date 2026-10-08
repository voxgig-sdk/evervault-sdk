# Core entity test

import json
import os
import time

import pytest

from evervault_sdk.utility.voxgig_struct import voxgig_struct as vs
from evervault_sdk import EvervaultSDK
from evervault_sdk.core import helpers
from evervault_sdk.config import shared_config
from evervault_sdk.feature.base_feature import EvervaultBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestCoreEntity:

    def test_should_create_instance(self):
        testsdk = EvervaultSDK.test(None, None)
        ent = testsdk.Core(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = EvervaultSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.Core(None).list({"relay_id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _core_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "core." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            for _live_key in ["relay01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via EVERVAULT_TEST_CORE_ENTID")
        client = setup["client"]

        # CREATE
        core_ref01_ent = client.Core(None)
        core_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.core"), "core_ref01"))
        core_ref01_data["relay_id"] = setup["idmap"]["relay01"]

        core_ref01_data = helpers.to_map(runner.entity_data(core_ref01_ent.create(core_ref01_data, None)))
        assert core_ref01_data is not None
        assert core_ref01_data["id"] is not None

        # LIST
        core_ref01_match = {
            "relay_id": setup["idmap"]["relay01"],
        }

        core_ref01_list_result = core_ref01_ent.list(core_ref01_match, None)
        assert isinstance(core_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(core_ref01_list_result),
            {"id": core_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # REMOVE
        core_ref01_match_rm0 = {
            "id": core_ref01_data["id"],
        }
        core_ref01_ent.remove(core_ref01_match_rm0, None)

        # LIST
        core_ref01_match_rt0 = {
            "relay_id": setup["idmap"]["relay01"],
        }

        core_ref01_list_rt0_result = core_ref01_ent.list(core_ref01_match_rt0, None)
        assert isinstance(core_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(core_ref01_list_rt0_result),
            {"id": core_ref01_data["id"]})
        assert vs.isempty(not_found_item)



def _core_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/core/CoreTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = EvervaultSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["core01", "core02", "core03", "relay01", "relay02", "relay03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "EVERVAULT_TEST_CORE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "EVERVAULT_TEST_CORE_ENTID": idmap,
        "EVERVAULT_TEST_LIVE": "FALSE",
        "EVERVAULT_TEST_EXPLAIN": "FALSE",
        "EVERVAULT_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("EVERVAULT_TEST_CORE_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("EVERVAULT_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("EVERVAULT_APIKEY"),
            },
            extra or {},
        ])
        client = EvervaultSDK(helpers.to_map(merged_opts))

    _live = env.get("EVERVAULT_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("EVERVAULT_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
