<?php
declare(strict_types=1);

// Evervault SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class EvervaultSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new EvervaultUtility();
        $this->_utility = $utility;

        $config = EvervaultConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = EvervaultHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = EvervaultHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, EvervaultFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return EvervaultUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = EvervaultHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = EvervaultHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = EvervaultHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new EvervaultSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = EvervaultHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = EvervaultHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_acquirer = null;

    // Canonical facade: $client->Acquirer()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->acquirer()
    // resolves here too.
    public function Acquirer($data = null)
    {
        require_once __DIR__ . '/entity/acquirer_entity.php';
        if ($data === null) {
            if ($this->_acquirer === null) {
                $this->_acquirer = new AcquirerEntity($this, null);
            }
            return $this->_acquirer;
        }
        return new AcquirerEntity($this, $data);
    }


    private $_bin_lookup = null;

    // Canonical facade: $client->BinLookup()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->bin_lookup()
    // resolves here too.
    public function BinLookup($data = null)
    {
        require_once __DIR__ . '/entity/bin_lookup_entity.php';
        if ($data === null) {
            if ($this->_bin_lookup === null) {
                $this->_bin_lookup = new BinLookupEntity($this, null);
            }
            return $this->_bin_lookup;
        }
        return new BinLookupEntity($this, $data);
    }


    private $_card = null;

    // Canonical facade: $client->Card()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->card()
    // resolves here too.
    public function Card($data = null)
    {
        require_once __DIR__ . '/entity/card_entity.php';
        if ($data === null) {
            if ($this->_card === null) {
                $this->_card = new CardEntity($this, null);
            }
            return $this->_card;
        }
        return new CardEntity($this, $data);
    }


    private $_card_art = null;

    // Canonical facade: $client->CardArt()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->card_art()
    // resolves here too.
    public function CardArt($data = null)
    {
        require_once __DIR__ . '/entity/card_art_entity.php';
        if ($data === null) {
            if ($this->_card_art === null) {
                $this->_card_art = new CardArtEntity($this, null);
            }
            return $this->_card_art;
        }
        return new CardArtEntity($this, $data);
    }


    private $_client_side_token = null;

    // Canonical facade: $client->ClientSideToken()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->client_side_token()
    // resolves here too.
    public function ClientSideToken($data = null)
    {
        require_once __DIR__ . '/entity/client_side_token_entity.php';
        if ($data === null) {
            if ($this->_client_side_token === null) {
                $this->_client_side_token = new ClientSideTokenEntity($this, null);
            }
            return $this->_client_side_token;
        }
        return new ClientSideTokenEntity($this, $data);
    }


    private $_core = null;

    // Canonical facade: $client->Core()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->core()
    // resolves here too.
    public function Core($data = null)
    {
        require_once __DIR__ . '/entity/core_entity.php';
        if ($data === null) {
            if ($this->_core === null) {
                $this->_core = new CoreEntity($this, null);
            }
            return $this->_core;
        }
        return new CoreEntity($this, $data);
    }


    private $_custom_domain = null;

    // Canonical facade: $client->CustomDomain()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->custom_domain()
    // resolves here too.
    public function CustomDomain($data = null)
    {
        require_once __DIR__ . '/entity/custom_domain_entity.php';
        if ($data === null) {
            if ($this->_custom_domain === null) {
                $this->_custom_domain = new CustomDomainEntity($this, null);
            }
            return $this->_custom_domain;
        }
        return new CustomDomainEntity($this, $data);
    }


    private $_function_run = null;

    // Canonical facade: $client->FunctionRun()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->function_run()
    // resolves here too.
    public function FunctionRun($data = null)
    {
        require_once __DIR__ . '/entity/function_run_entity.php';
        if ($data === null) {
            if ($this->_function_run === null) {
                $this->_function_run = new FunctionRunEntity($this, null);
            }
            return $this->_function_run;
        }
        return new FunctionRunEntity($this, $data);
    }


    private $_merchant = null;

    // Canonical facade: $client->Merchant()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->merchant()
    // resolves here too.
    public function Merchant($data = null)
    {
        require_once __DIR__ . '/entity/merchant_entity.php';
        if ($data === null) {
            if ($this->_merchant === null) {
                $this->_merchant = new MerchantEntity($this, null);
            }
            return $this->_merchant;
        }
        return new MerchantEntity($this, $data);
    }


    private $_network_token = null;

    // Canonical facade: $client->NetworkToken()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->network_token()
    // resolves here too.
    public function NetworkToken($data = null)
    {
        require_once __DIR__ . '/entity/network_token_entity.php';
        if ($data === null) {
            if ($this->_network_token === null) {
                $this->_network_token = new NetworkTokenEntity($this, null);
            }
            return $this->_network_token;
        }
        return new NetworkTokenEntity($this, $data);
    }


    private $_network_token_cryptogram = null;

    // Canonical facade: $client->NetworkTokenCryptogram()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->network_token_cryptogram()
    // resolves here too.
    public function NetworkTokenCryptogram($data = null)
    {
        require_once __DIR__ . '/entity/network_token_cryptogram_entity.php';
        if ($data === null) {
            if ($this->_network_token_cryptogram === null) {
                $this->_network_token_cryptogram = new NetworkTokenCryptogramEntity($this, null);
            }
            return $this->_network_token_cryptogram;
        }
        return new NetworkTokenCryptogramEntity($this, $data);
    }


    private $_payment = null;

    // Canonical facade: $client->Payment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->payment()
    // resolves here too.
    public function Payment($data = null)
    {
        require_once __DIR__ . '/entity/payment_entity.php';
        if ($data === null) {
            if ($this->_payment === null) {
                $this->_payment = new PaymentEntity($this, null);
            }
            return $this->_payment;
        }
        return new PaymentEntity($this, $data);
    }


    private $_relay = null;

    // Canonical facade: $client->Relay()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->relay()
    // resolves here too.
    public function Relay($data = null)
    {
        require_once __DIR__ . '/entity/relay_entity.php';
        if ($data === null) {
            if ($this->_relay === null) {
                $this->_relay = new RelayEntity($this, null);
            }
            return $this->_relay;
        }
        return new RelayEntity($this, $data);
    }


    private $_three_ds_session = null;

    // Canonical facade: $client->ThreeDsSession()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->three_ds_session()
    // resolves here too.
    public function ThreeDsSession($data = null)
    {
        require_once __DIR__ . '/entity/three_ds_session_entity.php';
        if ($data === null) {
            if ($this->_three_ds_session === null) {
                $this->_three_ds_session = new ThreeDsSessionEntity($this, null);
            }
            return $this->_three_ds_session;
        }
        return new ThreeDsSessionEntity($this, $data);
    }


    private $_webhook = null;

    // Canonical facade: $client->Webhook()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->webhook()
    // resolves here too.
    public function Webhook($data = null)
    {
        require_once __DIR__ . '/entity/webhook_entity.php';
        if ($data === null) {
            if ($this->_webhook === null) {
                $this->_webhook = new WebhookEntity($this, null);
            }
            return $this->_webhook;
        }
        return new WebhookEntity($this, $data);
    }


    private $_webhook_endpoint = null;

    // Canonical facade: $client->WebhookEndpoint()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->webhook_endpoint()
    // resolves here too.
    public function WebhookEndpoint($data = null)
    {
        require_once __DIR__ . '/entity/webhook_endpoint_entity.php';
        if ($data === null) {
            if ($this->_webhook_endpoint === null) {
                $this->_webhook_endpoint = new WebhookEndpointEntity($this, null);
            }
            return $this->_webhook_endpoint;
        }
        return new WebhookEndpointEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new EvervaultSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
