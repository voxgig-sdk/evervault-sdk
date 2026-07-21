# WebhookEndpoint entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from evervault_sdk import EvervaultSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestWebhookEndpointEntity:

    def test_should_create_instance(self):
        testsdk = EvervaultSDK.test(None, None)
        ent = testsdk.WebhookEndpoint(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _webhook_endpoint_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["update", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "webhook_endpoint." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        webhook_endpoint_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.webhook_endpoint")))
        webhook_endpoint_ref01_data = None
        if len(webhook_endpoint_ref01_data_raw) > 0:
            webhook_endpoint_ref01_data = helpers.to_map(webhook_endpoint_ref01_data_raw[0][1])

        # UPDATE
        webhook_endpoint_ref01_ent = client.WebhookEndpoint(None)
        webhook_endpoint_ref01_data_up0_up = {
            "id": webhook_endpoint_ref01_data["id"],
        }

        webhook_endpoint_ref01_markdef_up0_name = "url"
        webhook_endpoint_ref01_markdef_up0_value = "Mark01-webhook_endpoint_ref01_" + str(setup["now"])
        webhook_endpoint_ref01_data_up0_up[webhook_endpoint_ref01_markdef_up0_name] = webhook_endpoint_ref01_markdef_up0_value

        webhook_endpoint_ref01_resdata_up0 = helpers.to_map(webhook_endpoint_ref01_ent.update(webhook_endpoint_ref01_data_up0_up, None))
        assert webhook_endpoint_ref01_resdata_up0 is not None
        assert webhook_endpoint_ref01_resdata_up0["id"] == webhook_endpoint_ref01_data_up0_up["id"]
        assert webhook_endpoint_ref01_resdata_up0[webhook_endpoint_ref01_markdef_up0_name] == webhook_endpoint_ref01_markdef_up0_value

        # LOAD
        webhook_endpoint_ref01_match_dt0 = {
            "id": webhook_endpoint_ref01_data["id"],
        }
        webhook_endpoint_ref01_data_dt0_loaded = webhook_endpoint_ref01_ent.load(webhook_endpoint_ref01_match_dt0, None)
        webhook_endpoint_ref01_data_dt0_load_result = helpers.to_map(webhook_endpoint_ref01_data_dt0_loaded)
        assert webhook_endpoint_ref01_data_dt0_load_result is not None
        assert webhook_endpoint_ref01_data_dt0_load_result["id"] == webhook_endpoint_ref01_data["id"]



def _webhook_endpoint_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/webhook_endpoint/WebhookEndpointTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = EvervaultSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["webhook_endpoint01", "webhook_endpoint02", "webhook_endpoint03"],
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
        "EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID": idmap,
        "EVERVAULT_TEST_LIVE": "FALSE",
        "EVERVAULT_TEST_EXPLAIN": "FALSE",
        "EVERVAULT_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID"))
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
