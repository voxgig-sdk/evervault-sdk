# Acquirer entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from evervault_sdk import EvervaultSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestAcquirerEntity:

    def test_should_create_instance(self):
        testsdk = EvervaultSDK.test(None, None)
        ent = testsdk.Acquirer(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _acquirer_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "update", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "acquirer." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set EVERVAULT_TEST_ACQUIRER_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        acquirer_ref01_ent = client.Acquirer(None)
        acquirer_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.acquirer"), "acquirer_ref01"))

        acquirer_ref01_data = helpers.to_map(acquirer_ref01_ent.create(acquirer_ref01_data, None))
        assert acquirer_ref01_data is not None
        assert acquirer_ref01_data["id"] is not None

        # UPDATE
        acquirer_ref01_data_up0_up = {
            "id": acquirer_ref01_data["id"],
        }

        acquirer_ref01_markdef_up0_name = "description"
        acquirer_ref01_markdef_up0_value = "Mark01-acquirer_ref01_" + str(setup["now"])
        acquirer_ref01_data_up0_up[acquirer_ref01_markdef_up0_name] = acquirer_ref01_markdef_up0_value

        acquirer_ref01_resdata_up0 = helpers.to_map(acquirer_ref01_ent.update(acquirer_ref01_data_up0_up, None))
        assert acquirer_ref01_resdata_up0 is not None
        assert acquirer_ref01_resdata_up0["id"] == acquirer_ref01_data_up0_up["id"]
        assert acquirer_ref01_resdata_up0[acquirer_ref01_markdef_up0_name] == acquirer_ref01_markdef_up0_value

        # LOAD
        acquirer_ref01_match_dt0 = {
            "id": acquirer_ref01_data["id"],
        }
        acquirer_ref01_data_dt0_loaded = acquirer_ref01_ent.load(acquirer_ref01_match_dt0, None)
        acquirer_ref01_data_dt0_load_result = helpers.to_map(acquirer_ref01_data_dt0_loaded)
        assert acquirer_ref01_data_dt0_load_result is not None
        assert acquirer_ref01_data_dt0_load_result["id"] == acquirer_ref01_data["id"]



def _acquirer_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/acquirer/AcquirerTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = EvervaultSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["acquirer01", "acquirer02", "acquirer03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "EVERVAULT_TEST_ACQUIRER_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "EVERVAULT_TEST_ACQUIRER_ENTID": idmap,
        "EVERVAULT_TEST_LIVE": "FALSE",
        "EVERVAULT_TEST_EXPLAIN": "FALSE",
        "EVERVAULT_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("EVERVAULT_TEST_ACQUIRER_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("EVERVAULT_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
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
