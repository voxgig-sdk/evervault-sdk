# Evervault SDK utility: make_context

from projectname_sdk.core.context import EvervaultContext


def make_context_util(ctxmap, basectx):
    return EvervaultContext(ctxmap, basectx)
