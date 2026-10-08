package utility

import (
	"encoding/base64"

	"strings"

	vs "github.com/voxgig-sdk/evervault-sdk/go/utility/struct"

	"github.com/voxgig-sdk/evervault-sdk/go/core"
)

const credName = "authorization"
const optionApikey = "apikey"
const optionSecret = "secret"
const notFound = "__NOTFOUND__"

// The client's auth.name option, when set, replaces the name the API declares.
func authName(options map[string]any) string {
	if name, ok := vs.GetPath(options, []any{"auth", "name"}).(string); ok && name != "" {
		return strings.ToLower(name)
	}
	return credName
}

func prepareAuthUtil(ctx *core.Context) (*core.Spec, error) {
	spec := ctx.Spec
	if spec == nil {
		return nil, ctx.MakeError("auth_no_spec",
			"Expected context spec property to be defined.")
	}

	headers := spec.Headers
	options := ctx.Client.OptionsMap()

	// Public APIs that need no auth omit the options.auth block entirely.
	if options["auth"] == nil {
		delete(headers, credName)
		return spec, nil
	}

	name := authName(options)

	// A credential left under the declared name would travel beside the renamed one.
	if name != credName {
		delete(headers, credName)
	}

	apikey := vs.GetProp(options, optionApikey, notFound)

	skip := false
	if apikey == nil {
		skip = true
	} else if apikeyStr, ok := apikey.(string); ok &&
		(apikeyStr == notFound || apikeyStr == "") {
		skip = true
	}

	// True HTTP Basic Auth joins the two credentials, base64-encoded - a single
	// token in the header (the branch below) can never authenticate against
	// an API that actually checks `Authorization: Basic base64(user:pass)`.
	// The password may be empty (RFC 7617): Lob, for one, documents the key as
	// the user with a blank password (`curl -u key:`).
	if basicAuth, _ := vs.GetPath(options, []any{"auth", "basic"}).(bool); basicAuth {
		secret := vs.GetProp(options, optionSecret, notFound)

		secretVal, _ := secret.(string)
		if secretVal == notFound {
			secretVal = ""
		}

		if skip {
			delete(headers, name)
		} else {
			apikeyVal, _ := apikey.(string)
			b64 := base64.StdEncoding.EncodeToString([]byte(apikeyVal + ":" + secretVal))
			// The joined, encoded pair is a wire form neither credential's own
			// registration covers.
			ctx.Utility.CleanAdd(ctx, b64)

			basicPrefix := ""
			if ap := vs.GetPath(options, []any{"auth", "prefix"}); ap != nil {
				basicPrefix, _ = ap.(string)
			}
			// Empty prefix (raw apiKey credential) must not add a leading space.
			if basicPrefix == "" {
				headers[name] = b64
			} else {
				headers[name] = basicPrefix + " " + b64
			}
		}

		return spec, nil
	}

	if skip {
		delete(headers, name)
	} else {
		authPrefix := ""
		if ap := vs.GetPath(options, []any{"auth", "prefix"}); ap != nil {
			authPrefix, _ = ap.(string)
		}
		apikeyVal := ""
		if av, ok := apikey.(string); ok {
			apikeyVal = av
		}
		// Empty prefix (raw apiKey credential) must not add a leading space.
		if authPrefix == "" {
			headers[name] = apikeyVal
		} else {
			headers[name] = authPrefix + " " + apikeyVal
		}
	}

	return spec, nil
}
