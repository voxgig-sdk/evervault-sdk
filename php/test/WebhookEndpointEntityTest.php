<?php
declare(strict_types=1);

// WebhookEndpoint entity test

require_once __DIR__ . '/../evervault_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class WebhookEndpointEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = EvervaultSDK::test(null, null);
        $ent = $testsdk->WebhookEndpoint(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = webhook_endpoint_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["update", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "webhook_endpoint." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $webhook_endpoint_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.webhook_endpoint")));
        $webhook_endpoint_ref01_data = null;
        if (count($webhook_endpoint_ref01_data_raw) > 0) {
            $webhook_endpoint_ref01_data = Helpers::to_map($webhook_endpoint_ref01_data_raw[0][1]);
        }

        // UPDATE
        $webhook_endpoint_ref01_ent = $client->WebhookEndpoint(null);
        $webhook_endpoint_ref01_data_up0_up = [
            "id" => $webhook_endpoint_ref01_data["id"],
        ];

        $webhook_endpoint_ref01_markdef_up0_name = "url";
        $webhook_endpoint_ref01_markdef_up0_value = "Mark01-webhook_endpoint_ref01_" . $setup["now"];
        $webhook_endpoint_ref01_data_up0_up[$webhook_endpoint_ref01_markdef_up0_name] = $webhook_endpoint_ref01_markdef_up0_value;

        $webhook_endpoint_ref01_resdata_up0_result = $webhook_endpoint_ref01_ent->update($webhook_endpoint_ref01_data_up0_up, null);
        $webhook_endpoint_ref01_resdata_up0 = Helpers::to_map(is_object($webhook_endpoint_ref01_resdata_up0_result) && method_exists($webhook_endpoint_ref01_resdata_up0_result, 'data_get') ? $webhook_endpoint_ref01_resdata_up0_result->data_get() : $webhook_endpoint_ref01_resdata_up0_result);
        $this->assertNotNull($webhook_endpoint_ref01_resdata_up0);
        $this->assertEquals($webhook_endpoint_ref01_resdata_up0["id"], $webhook_endpoint_ref01_data_up0_up["id"]);
        $this->assertEquals($webhook_endpoint_ref01_resdata_up0[$webhook_endpoint_ref01_markdef_up0_name], $webhook_endpoint_ref01_markdef_up0_value);

        // LOAD
        $webhook_endpoint_ref01_match_dt0 = [
            "id" => $webhook_endpoint_ref01_data["id"],
        ];
        $webhook_endpoint_ref01_data_dt0_loaded = $webhook_endpoint_ref01_ent->load($webhook_endpoint_ref01_match_dt0, null);
        $webhook_endpoint_ref01_data_dt0_load_result = Helpers::to_map(is_object($webhook_endpoint_ref01_data_dt0_loaded) && method_exists($webhook_endpoint_ref01_data_dt0_loaded, 'data_get') ? $webhook_endpoint_ref01_data_dt0_loaded->data_get() : $webhook_endpoint_ref01_data_dt0_loaded);
        $this->assertNotNull($webhook_endpoint_ref01_data_dt0_load_result);
        $this->assertEquals($webhook_endpoint_ref01_data_dt0_load_result["id"], $webhook_endpoint_ref01_data["id"]);

    }
}

function webhook_endpoint_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/webhook_endpoint/WebhookEndpointTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = EvervaultSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["webhook_endpoint01", "webhook_endpoint02", "webhook_endpoint03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID" => $idmap,
        "EVERVAULT_TEST_LIVE" => "FALSE",
        "EVERVAULT_TEST_EXPLAIN" => "FALSE",
        "EVERVAULT_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["EVERVAULT_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["EVERVAULT_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new EvervaultSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["EVERVAULT_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["EVERVAULT_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
