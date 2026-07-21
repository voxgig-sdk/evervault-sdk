# Webhook entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from evervault_sdk import EvervaultSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestWebhookEntity:

    def test_should_create_instance(self):
        testsdk = EvervaultSDK.test(None, None)
        ent = testsdk.Webhook(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "webhook": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = EvervaultSDK.test(seed, None)
        seen = list(base.Webhook(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from config import make_config
        cfg = make_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = EvervaultSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.Webhook(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _webhook_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "webhook." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set EVERVAULT_TEST_WEBHOOK_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        webhook_ref01_ent = client.Webhook(None)
        webhook_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.webhook"), "webhook_ref01"))

        webhook_ref01_data = helpers.to_map(webhook_ref01_ent.create(webhook_ref01_data, None))
        assert webhook_ref01_data is not None
        assert webhook_ref01_data["id"] is not None

        # LIST
        webhook_ref01_match = {}

        webhook_ref01_list_result = webhook_ref01_ent.list(webhook_ref01_match, None)
        assert isinstance(webhook_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(webhook_ref01_list_result),
            {"id": webhook_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # REMOVE
        webhook_ref01_match_rm0 = {
            "id": webhook_ref01_data["id"],
        }
        webhook_ref01_ent.remove(webhook_ref01_match_rm0, None)

        # LIST
        webhook_ref01_match_rt0 = {}

        webhook_ref01_list_rt0_result = webhook_ref01_ent.list(webhook_ref01_match_rt0, None)
        assert isinstance(webhook_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(webhook_ref01_list_rt0_result),
            {"id": webhook_ref01_data["id"]})
        assert vs.isempty(not_found_item)



def _webhook_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/webhook/WebhookTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = EvervaultSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["webhook01", "webhook02", "webhook03", "webhook_endpoint01", "webhook_endpoint02", "webhook_endpoint03"],
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
        "EVERVAULT_TEST_WEBHOOK_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "EVERVAULT_TEST_WEBHOOK_ENTID": idmap,
        "EVERVAULT_TEST_LIVE": "FALSE",
        "EVERVAULT_TEST_EXPLAIN": "FALSE",
        "EVERVAULT_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("EVERVAULT_TEST_WEBHOOK_ENTID"))
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
