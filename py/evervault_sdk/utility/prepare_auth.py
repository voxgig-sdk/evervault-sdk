# Evervault SDK utility: prepare_auth

from __future__ import annotations
import base64
from evervault_sdk.utility.voxgig_struct import voxgig_struct as vs

HEADER_AUTH = "authorization"
OPTION_APIKEY = "apikey"
OPTION_SECRET = "secret"
NOT_FOUND = "__NOTFOUND__"


def _auth_name(options):
    name = vs.getpath(options, "auth.name")
    if isinstance(name, str) and name != "":
        return name.lower()
    return HEADER_AUTH


def prepare_auth_util(ctx):
    spec = ctx.spec
    if spec is None:
        return None, ctx.make_error("auth_no_spec",
            "Expected context spec property to be defined.")

    headers = spec.headers
    options = ctx.client.options_map()

    # Public APIs that need no auth omit the options.auth block entirely.
    if options.get("auth") is None:
        headers.pop(HEADER_AUTH, None)
        return spec, None

    name = _auth_name(options)

    # A credential left under the declared name would travel beside the renamed one.
    if name != HEADER_AUTH:
        headers.pop(HEADER_AUTH, None)

    apikey = vs.getprop(options, OPTION_APIKEY, NOT_FOUND)

    # True HTTP Basic Auth joins the two credentials, base64-encoded - a single
    # token in the header (the branch below) can never authenticate against
    # an API that actually checks `Authorization: Basic base64(user:pass)`.
    # The password may be empty (RFC 7617): Lob, for one, documents the key as
    # the user with a blank password (`curl -u key:`).
    if vs.getpath(options, "auth.basic") is True:
        secret = vs.getprop(options, OPTION_SECRET, NOT_FOUND)
        no_apikey = (
            (isinstance(apikey, str) and apikey == NOT_FOUND)
            or apikey is None
            or apikey == ""
        )
        no_secret = (
            (isinstance(secret, str) and secret == NOT_FOUND)
            or secret is None
            or secret == ""
        )

        if no_apikey:
            headers.pop(name, None)
        else:
            auth_prefix = ""
            ap = vs.getpath(options, "auth.prefix")
            if isinstance(ap, str):
                auth_prefix = ap
            b64 = base64.b64encode(
                (str(apikey) + ":" + ("" if no_secret else str(secret))).encode("utf-8")
            ).decode("ascii")
            # The joined, encoded pair is a wire form neither credential's
            # own registration covers.
            ctx.utility.clean_add(ctx, b64)
            headers[name] = (
                auth_prefix + " " + b64 if auth_prefix else b64
            )

        return spec, None

    if (
        (isinstance(apikey, str) and apikey == NOT_FOUND)
        or apikey is None
        or apikey == ""
    ):
        headers.pop(name, None)
    else:
        auth_prefix = ""
        ap = vs.getpath(options, "auth.prefix")
        if isinstance(ap, str):
            auth_prefix = ap
        apikey_val = ""
        if isinstance(apikey, str):
            apikey_val = apikey
        # Empty prefix (raw apiKey credential) must not add a leading space.
        headers[name] = (
            auth_prefix + " " + apikey_val if auth_prefix else apikey_val
        )

    return spec, None
