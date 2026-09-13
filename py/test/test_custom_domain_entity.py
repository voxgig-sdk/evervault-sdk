# CustomDomain entity test

import json
import os
import time

import pytest

from evervault_sdk.utility.voxgig_struct import voxgig_struct as vs
from evervault_sdk import EvervaultSDK
from evervault_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestCustomDomainEntity:

    def test_should_create_instance(self):
        testsdk = EvervaultSDK.test(None, None)
        ent = testsdk.CustomDomain(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _custom_domain_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "custom_domain." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set EVERVAULT_TEST_CUSTOM_DOMAIN_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        custom_domain_ref01_ent = client.CustomDomain(None)
        custom_domain_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.custom_domain"), "custom_domain_ref01"))
        custom_domain_ref01_data["relay_id"] = setup["idmap"]["relay01"]

        custom_domain_ref01_data = helpers.to_map(runner.entity_data(custom_domain_ref01_ent.create(custom_domain_ref01_data, None)))
        assert custom_domain_ref01_data is not None
        assert custom_domain_ref01_data["id"] is not None

        # LOAD
        custom_domain_ref01_match_dt0 = {
            "id": custom_domain_ref01_data["id"],
        }
        custom_domain_ref01_data_dt0_loaded = custom_domain_ref01_ent.load(custom_domain_ref01_match_dt0, None)
        custom_domain_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(custom_domain_ref01_data_dt0_loaded))
        assert custom_domain_ref01_data_dt0_load_result is not None
        assert custom_domain_ref01_data_dt0_load_result["id"] == custom_domain_ref01_data["id"]



def _custom_domain_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/custom_domain/CustomDomainTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = EvervaultSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["custom_domain01", "custom_domain02", "custom_domain03", "relay01", "relay02", "relay03"],
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
        "EVERVAULT_TEST_CUSTOM_DOMAIN_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "EVERVAULT_TEST_CUSTOM_DOMAIN_ENTID": idmap,
        "EVERVAULT_TEST_LIVE": "FALSE",
        "EVERVAULT_TEST_EXPLAIN": "FALSE",
        "EVERVAULT_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("EVERVAULT_TEST_CUSTOM_DOMAIN_ENTID"))
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
