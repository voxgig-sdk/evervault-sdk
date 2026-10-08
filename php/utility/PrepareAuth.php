<?php
declare(strict_types=1);

// Evervault SDK utility: prepare_auth

class EvervaultPrepareAuth
{
    private const HEADER_AUTH = 'authorization';
    private const OPTION_APIKEY = 'apikey';
    private const OPTION_SECRET = 'secret';
    private const NOT_FOUND = '__NOTFOUND__';

    // The client's auth.name option, when set, replaces the name the API declares.
    private static function authName(array $options): string
    {
        $name = \Voxgig\Struct\Struct::getpath($options, 'auth.name');
        return is_string($name) && '' !== $name ? strtolower($name) : self::HEADER_AUTH;
    }

    public static function call(EvervaultContext $ctx): array
    {
        $spec = $ctx->spec;
        if (!$spec) {
            return [null, $ctx->make_error('auth_no_spec', 'Expected context spec property to be defined.')];
        }

        $headers = &$spec->headers;
        $options = $ctx->client->options_map();

        // Public APIs that need no auth omit the options.auth block entirely.
        if (!isset($options['auth']) || $options['auth'] === null) {
            unset($headers[self::HEADER_AUTH]);
            return [$spec, null];
        }

        $name = self::authName($options);

        // A credential left under the declared name would travel beside the renamed one.
        if ($name !== self::HEADER_AUTH) {
            unset($headers[self::HEADER_AUTH]);
        }

        $apikey = \Voxgig\Struct\Struct::getprop($options, self::OPTION_APIKEY, self::NOT_FOUND);

        // True HTTP Basic Auth joins the two credentials, base64-encoded - a
        // single token in the header (the branch below) can never
        // authenticate against an API that actually checks
        // `Authorization: Basic base64(user:pass)`. The password may be
        // empty (RFC 7617): Lob, for one, documents the key as the user with
        // a blank password (`curl -u key:`).
        if (true === (\Voxgig\Struct\Struct::getpath($options, 'auth.basic') ?? false)) {
            $secret = \Voxgig\Struct\Struct::getprop($options, self::OPTION_SECRET, self::NOT_FOUND);
            $apikey_val = is_string($apikey) && $apikey !== self::NOT_FOUND ? $apikey : '';
            $secret_val = is_string($secret) && $secret !== self::NOT_FOUND ? $secret : '';

            if ($apikey_val === '') {
                unset($headers[$name]);
            } else {
                $auth_prefix = \Voxgig\Struct\Struct::getpath($options, 'auth.prefix') ?? '';
                $b64 = base64_encode("{$apikey_val}:{$secret_val}");
                // The joined, encoded pair is a wire form neither credential's
                // own registration covers.
                ($ctx->utility->clean_add)($ctx, $b64);
                $headers[$name] = $auth_prefix === ''
                    ? $b64 : "{$auth_prefix} {$b64}";
            }

            return [$spec, null];
        }

        if (
            (is_string($apikey) && ($apikey === self::NOT_FOUND || $apikey === ''))
            || $apikey === null
        ) {
            unset($headers[$name]);
        } else {
            $auth_prefix = \Voxgig\Struct\Struct::getpath($options, 'auth.prefix') ?? '';
            $apikey_val = is_string($apikey) ? $apikey : '';
            // Empty prefix (raw apiKey credential) must not add a leading space.
            $headers[$name] = $auth_prefix === ''
                ? $apikey_val : "{$auth_prefix} {$apikey_val}";
        }

        return [$spec, null];
    }
}
