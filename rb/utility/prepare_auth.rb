# Evervault SDK utility: prepare_auth
require_relative 'struct/voxgig_struct'
module EvervaultUtilities
  HEADER_AUTH = "authorization"
  OPTION_APIKEY = "apikey"
  OPTION_SECRET = "secret"
  NOT_FOUND = "__NOTFOUND__"

  PrepareAuth = ->(ctx) {
    spec = ctx.spec
    return nil, ctx.make_error("auth_no_spec", "Expected context spec property to be defined.") unless spec

    headers = spec.headers
    options = ctx.client.options_map

    # Public APIs that need no auth omit the options.auth block entirely.
    if options["auth"].nil?
      headers.delete(HEADER_AUTH)
      return spec, nil
    end

    # The client's auth.name option, when set, replaces the name the API declares.
    auth_name = VoxgigStruct.getpath(options, "auth.name")
    name = auth_name.is_a?(String) && !auth_name.empty? ? auth_name.downcase : HEADER_AUTH

    # A credential left under the declared name would travel beside the renamed one.
    headers.delete(HEADER_AUTH) unless name == HEADER_AUTH

    apikey = VoxgigStruct.getprop(options, OPTION_APIKEY, NOT_FOUND)

    # True HTTP Basic Auth joins the two credentials, base64-encoded - a single
    # token in the header (the branch below) can never authenticate against
    # an API that actually checks `Authorization: Basic base64(user:pass)`.
    # The password may be empty (RFC 7617): Lob, for one, documents the key as
    # the user with a blank password (`curl -u key:`).
    if VoxgigStruct.getpath(options, "auth.basic") == true
      secret = VoxgigStruct.getprop(options, OPTION_SECRET, NOT_FOUND)
      no_apikey = apikey.nil? || !apikey.is_a?(String) || apikey == NOT_FOUND || apikey == ""
      no_secret = secret.nil? || !secret.is_a?(String) || secret == NOT_FOUND || secret == ""

      if no_apikey
        headers.delete(name)
      else
        auth_prefix = VoxgigStruct.getpath(options, "auth.prefix") || ""
        # `pack("m0")` rather than `Base64.strict_encode64`: base64 left
        # Ruby's default gems in 3.4, and pack is core.
        b64 = ["#{apikey}:#{no_secret ? "" : secret}"].pack("m0")
        # The joined, encoded pair is a wire form neither credential's own
        # registration covers.
        ctx.utility.clean_add.call(ctx, b64)
        headers[name] =
          auth_prefix.empty? ? b64 : "#{auth_prefix} #{b64}"
      end

      return spec, nil
    end

    if apikey.nil? || (apikey.is_a?(String) && (apikey == NOT_FOUND || apikey == ""))
      headers.delete(name)
    else
      auth_prefix = VoxgigStruct.getpath(options, "auth.prefix") || ""
      apikey_val = apikey.is_a?(String) ? apikey : ""
      # Empty prefix (raw apiKey credential) must not add a leading space.
      headers[name] =
        auth_prefix.empty? ? apikey_val : "#{auth_prefix} #{apikey_val}"
    end

    return spec, nil
  }
end
