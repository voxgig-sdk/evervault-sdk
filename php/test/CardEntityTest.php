<?php
declare(strict_types=1);

// Card entity test

require_once __DIR__ . '/../evervault_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CardEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = EvervaultSDK::test(null, null);
        $ent = $testsdk->Card(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = card_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "card." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set EVERVAULT_TEST_CARD_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $card_ref01_ent = $client->Card(null);
        $card_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.card"), "card_ref01"));

        $card_ref01_data_result = $card_ref01_ent->create($card_ref01_data, null);
        $card_ref01_data = Helpers::to_map(is_object($card_ref01_data_result) && method_exists($card_ref01_data_result, 'data_get') ? $card_ref01_data_result->data_get() : $card_ref01_data_result);
        $this->assertNotNull($card_ref01_data);

        // LOAD
        $card_ref01_match_dt0 = [];
        $card_ref01_data_dt0_loaded = $card_ref01_ent->load($card_ref01_match_dt0, null);
        $this->assertNotNull($card_ref01_data_dt0_loaded);

    }
}

function card_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/card/CardTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = EvervaultSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["card01", "card02", "card03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("EVERVAULT_TEST_CARD_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "EVERVAULT_TEST_CARD_ENTID" => $idmap,
        "EVERVAULT_TEST_LIVE" => "FALSE",
        "EVERVAULT_TEST_EXPLAIN" => "FALSE",
        "EVERVAULT_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["EVERVAULT_TEST_CARD_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["EVERVAULT_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["EVERVAULT_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new EvervaultSDK(Helpers::to_map($merged_opts));
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
