# Evervault SDK feature factory

from evervault_sdk.feature.base_feature import EvervaultBaseFeature
from evervault_sdk.feature.debug_feature import EvervaultDebugFeature
from evervault_sdk.feature.idempotency_feature import EvervaultIdempotencyFeature
from evervault_sdk.feature.metrics_feature import EvervaultMetricsFeature
from evervault_sdk.feature.paging_feature import EvervaultPagingFeature
from evervault_sdk.feature.ratelimit_feature import EvervaultRatelimitFeature
from evervault_sdk.feature.retry_feature import EvervaultRetryFeature
from evervault_sdk.feature.test_feature import EvervaultTestFeature
from evervault_sdk.feature.timeout_feature import EvervaultTimeoutFeature


_FEATURES = {
    "base": lambda: EvervaultBaseFeature(),
    "debug": lambda: EvervaultDebugFeature(),
    "idempotency": lambda: EvervaultIdempotencyFeature(),
    "metrics": lambda: EvervaultMetricsFeature(),
    "paging": lambda: EvervaultPagingFeature(),
    "ratelimit": lambda: EvervaultRatelimitFeature(),
    "retry": lambda: EvervaultRetryFeature(),
    "test": lambda: EvervaultTestFeature(),
    "timeout": lambda: EvervaultTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
