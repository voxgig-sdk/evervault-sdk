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

    apikey = VoxgigStruct.getprop(options, OPTION_APIKEY, NOT_FOUND)

    # True HTTP Basic Auth needs TWO credentials, base64-joined - a single
    # token in the header (the branch below) can never authenticate against
    # an API that actually checks `Authorization: Basic base64(user:pass)`.
    if VoxgigStruct.getpath(options, "auth.basic") == true
      secret = VoxgigStruct.getprop(options, OPTION_SECRET, NOT_FOUND)
      no_apikey = apikey.nil? || !apikey.is_a?(String) || apikey == NOT_FOUND || apikey == ""
      no_secret = secret.nil? || !secret.is_a?(String) || secret == NOT_FOUND || secret == ""

      if no_apikey || no_secret
        headers.delete(HEADER_AUTH)
      else
        auth_prefix = VoxgigStruct.getpath(options, "auth.prefix") || ""
        # `pack("m0")` rather than `Base64.strict_encode64`: base64 left
        # Ruby's default gems in 3.4, and pack is core.
        b64 = ["#{apikey}:#{secret}"].pack("m0")
        headers[HEADER_AUTH] =
          auth_prefix.empty? ? b64 : "#{auth_prefix} #{b64}"
      end

      return spec, nil
    end

    if apikey.nil? || (apikey.is_a?(String) && (apikey == NOT_FOUND || apikey == ""))
      headers.delete(HEADER_AUTH)
    else
      auth_prefix = VoxgigStruct.getpath(options, "auth.prefix") || ""
      apikey_val = apikey.is_a?(String) ? apikey : ""
      # Empty prefix (raw apiKey credential) must not add a leading space.
      headers[HEADER_AUTH] =
        auth_prefix.empty? ? apikey_val : "#{auth_prefix} #{apikey_val}"
    end

    return spec, nil
  }
end
