# Evervault SDK feature factory

from feature.base_feature import EvervaultBaseFeature
from feature.test_feature import EvervaultTestFeature


def _make_feature(name):
    features = {
        "base": lambda: EvervaultBaseFeature(),
        "test": lambda: EvervaultTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
