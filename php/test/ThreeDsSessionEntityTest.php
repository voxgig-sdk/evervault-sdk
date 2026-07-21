<?php
declare(strict_types=1);

// ThreeDsSession entity test

require_once __DIR__ . '/../evervault_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ThreeDsSessionEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = EvervaultSDK::test(null, null);
        $ent = $testsdk->ThreeDsSession(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = three_ds_session_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "three_ds_session." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set EVERVAULT_TEST_THREE_DS_SESSION_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $three_ds_session_ref01_ent = $client->ThreeDsSession(null);
        $three_ds_session_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.three_ds_session"), "three_ds_session_ref01"));

        $three_ds_session_ref01_data_result = $three_ds_session_ref01_ent->create($three_ds_session_ref01_data, null);
        $three_ds_session_ref01_data = Helpers::to_map($three_ds_session_ref01_data_result);
        $this->assertNotNull($three_ds_session_ref01_data);
        $this->assertNotNull($three_ds_session_ref01_data["id"]);

        // LOAD
        $three_ds_session_ref01_match_dt0 = [
            "id" => $three_ds_session_ref01_data["id"],
        ];
        $three_ds_session_ref01_data_dt0_loaded = $three_ds_session_ref01_ent->load($three_ds_session_ref01_match_dt0, null);
        $three_ds_session_ref01_data_dt0_load_result = Helpers::to_map($three_ds_session_ref01_data_dt0_loaded);
        $this->assertNotNull($three_ds_session_ref01_data_dt0_load_result);
        $this->assertEquals($three_ds_session_ref01_data_dt0_load_result["id"], $three_ds_session_ref01_data["id"]);

    }
}

function three_ds_session_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/three_ds_session/ThreeDsSessionTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = EvervaultSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["three_ds_session01", "three_ds_session02", "three_ds_session03", "3ds_session01", "3ds_session02", "3ds_session03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("EVERVAULT_TEST_THREE_DS_SESSION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "EVERVAULT_TEST_THREE_DS_SESSION_ENTID" => $idmap,
        "EVERVAULT_TEST_LIVE" => "FALSE",
        "EVERVAULT_TEST_EXPLAIN" => "FALSE",
        "EVERVAULT_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["EVERVAULT_TEST_THREE_DS_SESSION_ENTID"]);
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
