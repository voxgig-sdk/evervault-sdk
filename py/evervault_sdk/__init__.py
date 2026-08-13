# Evervault SDK

from evervault_sdk.utility.voxgig_struct import voxgig_struct as vs
from evervault_sdk.core.utility_type import EvervaultUtility
from evervault_sdk.core.spec import EvervaultSpec
from evervault_sdk.core import helpers

# Load utility registration (populates Utility._registrar)
from evervault_sdk.utility import register

# Load features
from evervault_sdk.feature.base_feature import EvervaultBaseFeature
from evervault_sdk.features import _make_feature


class EvervaultSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = EvervaultUtility()
        self._utility = utility

        from evervault_sdk.config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return EvervaultUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = EvervaultSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return isinstance(allow_op, str) and op in allow_op

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "EvervaultSDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("EvervaultSDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def Acquirer(self, data=None) -> "AcquirerEntity":
        """Entity factory: client.Acquirer().list() / client.Acquirer().load({"id": ...})."""
        from evervault_sdk.entity.acquirer_entity import AcquirerEntity
        return AcquirerEntity(self, data)


    def BinLookup(self, data=None) -> "BinLookupEntity":
        """Entity factory: client.BinLookup().list() / client.BinLookup().load({"id": ...})."""
        from evervault_sdk.entity.bin_lookup_entity import BinLookupEntity
        return BinLookupEntity(self, data)


    def Card(self, data=None) -> "CardEntity":
        """Entity factory: client.Card().list() / client.Card().load({"id": ...})."""
        from evervault_sdk.entity.card_entity import CardEntity
        return CardEntity(self, data)


    def CardArt(self, data=None) -> "CardArtEntity":
        """Entity factory: client.CardArt().list() / client.CardArt().load({"id": ...})."""
        from evervault_sdk.entity.card_art_entity import CardArtEntity
        return CardArtEntity(self, data)


    def ClientSideToken(self, data=None) -> "ClientSideTokenEntity":
        """Entity factory: client.ClientSideToken().list() / client.ClientSideToken().load({"id": ...})."""
        from evervault_sdk.entity.client_side_token_entity import ClientSideTokenEntity
        return ClientSideTokenEntity(self, data)


    def Core(self, data=None) -> "CoreEntity":
        """Entity factory: client.Core().list() / client.Core().load({"id": ...})."""
        from evervault_sdk.entity.core_entity import CoreEntity
        return CoreEntity(self, data)


    def CustomDomain(self, data=None) -> "CustomDomainEntity":
        """Entity factory: client.CustomDomain().list() / client.CustomDomain().load({"id": ...})."""
        from evervault_sdk.entity.custom_domain_entity import CustomDomainEntity
        return CustomDomainEntity(self, data)


    def FunctionRun(self, data=None) -> "FunctionRunEntity":
        """Entity factory: client.FunctionRun().list() / client.FunctionRun().load({"id": ...})."""
        from evervault_sdk.entity.function_run_entity import FunctionRunEntity
        return FunctionRunEntity(self, data)


    def Merchant(self, data=None) -> "MerchantEntity":
        """Entity factory: client.Merchant().list() / client.Merchant().load({"id": ...})."""
        from evervault_sdk.entity.merchant_entity import MerchantEntity
        return MerchantEntity(self, data)


    def NetworkToken(self, data=None) -> "NetworkTokenEntity":
        """Entity factory: client.NetworkToken().list() / client.NetworkToken().load({"id": ...})."""
        from evervault_sdk.entity.network_token_entity import NetworkTokenEntity
        return NetworkTokenEntity(self, data)


    def NetworkTokenCryptogram(self, data=None) -> "NetworkTokenCryptogramEntity":
        """Entity factory: client.NetworkTokenCryptogram().list() / client.NetworkTokenCryptogram().load({"id": ...})."""
        from evervault_sdk.entity.network_token_cryptogram_entity import NetworkTokenCryptogramEntity
        return NetworkTokenCryptogramEntity(self, data)


    def Payment(self, data=None) -> "PaymentEntity":
        """Entity factory: client.Payment().list() / client.Payment().load({"id": ...})."""
        from evervault_sdk.entity.payment_entity import PaymentEntity
        return PaymentEntity(self, data)


    def Relay(self, data=None) -> "RelayEntity":
        """Entity factory: client.Relay().list() / client.Relay().load({"id": ...})."""
        from evervault_sdk.entity.relay_entity import RelayEntity
        return RelayEntity(self, data)


    def ThreeDsSession(self, data=None) -> "ThreeDsSessionEntity":
        """Entity factory: client.ThreeDsSession().list() / client.ThreeDsSession().load({"id": ...})."""
        from evervault_sdk.entity.three_ds_session_entity import ThreeDsSessionEntity
        return ThreeDsSessionEntity(self, data)


    def Webhook(self, data=None) -> "WebhookEntity":
        """Entity factory: client.Webhook().list() / client.Webhook().load({"id": ...})."""
        from evervault_sdk.entity.webhook_entity import WebhookEntity
        return WebhookEntity(self, data)


    def WebhookEndpoint(self, data=None) -> "WebhookEndpointEntity":
        """Entity factory: client.WebhookEndpoint().list() / client.WebhookEndpoint().load({"id": ...})."""
        from evervault_sdk.entity.webhook_endpoint_entity import WebhookEndpointEntity
        return WebhookEndpointEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "EvervaultSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from evervault_sdk.entity.acquirer_entity import AcquirerEntity
    from evervault_sdk.entity.bin_lookup_entity import BinLookupEntity
    from evervault_sdk.entity.card_entity import CardEntity
    from evervault_sdk.entity.card_art_entity import CardArtEntity
    from evervault_sdk.entity.client_side_token_entity import ClientSideTokenEntity
    from evervault_sdk.entity.core_entity import CoreEntity
    from evervault_sdk.entity.custom_domain_entity import CustomDomainEntity
    from evervault_sdk.entity.function_run_entity import FunctionRunEntity
    from evervault_sdk.entity.merchant_entity import MerchantEntity
    from evervault_sdk.entity.network_token_entity import NetworkTokenEntity
    from evervault_sdk.entity.network_token_cryptogram_entity import NetworkTokenCryptogramEntity
    from evervault_sdk.entity.payment_entity import PaymentEntity
    from evervault_sdk.entity.relay_entity import RelayEntity
    from evervault_sdk.entity.three_ds_session_entity import ThreeDsSessionEntity
    from evervault_sdk.entity.webhook_entity import WebhookEntity
    from evervault_sdk.entity.webhook_endpoint_entity import WebhookEndpointEntity
