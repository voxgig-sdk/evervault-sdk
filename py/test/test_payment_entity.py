# Payment entity test

import json
import os
import time

import pytest

from evervault_sdk.utility.voxgig_struct import voxgig_struct as vs
from evervault_sdk import EvervaultSDK
from evervault_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestPaymentEntity:

    def test_should_create_instance(self):
        testsdk = EvervaultSDK.test(None, None)
        ent = testsdk.Payment(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "payment": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = EvervaultSDK.test(seed, None)
        seen = list(base.Payment(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from evervault_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = EvervaultSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.Payment(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _payment_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "payment." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set EVERVAULT_TEST_PAYMENT_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        payment_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.payment")))
        payment_ref01_data = None
        if len(payment_ref01_data_raw) > 0:
            payment_ref01_data = helpers.to_map(payment_ref01_data_raw[0][1])

        # LIST
        payment_ref01_ent = client.Payment(None)
        payment_ref01_match = {
            "3ds_session_id": setup["idmap"]["3ds_session01"],
        }

        payment_ref01_list_result = payment_ref01_ent.list(payment_ref01_match, None)
        assert isinstance(payment_ref01_list_result, list)



def _payment_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/payment/PaymentTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = EvervaultSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["payment01", "payment02", "payment03", "3ds_session01", "3ds_session02", "3ds_session03", "acquirer01", "acquirer02", "acquirer03", "card01", "card02", "card03", "merchant01", "merchant02", "merchant03", "network_token01", "network_token02", "network_token03"],
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
        "EVERVAULT_TEST_PAYMENT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "EVERVAULT_TEST_PAYMENT_ENTID": idmap,
        "EVERVAULT_TEST_LIVE": "FALSE",
        "EVERVAULT_TEST_EXPLAIN": "FALSE",
        "EVERVAULT_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("EVERVAULT_TEST_PAYMENT_ENTID"))
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
