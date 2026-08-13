# Evervault SDK utility: make_context

from evervault_sdk.core.context import EvervaultContext


def make_context_util(ctxmap, basectx):
    return EvervaultContext(ctxmap, basectx)
