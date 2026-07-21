<?php
declare(strict_types=1);

// CustomDomain entity test

require_once __DIR__ . '/../evervault_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CustomDomainEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = EvervaultSDK::test(null, null);
        $ent = $testsdk->CustomDomain(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = custom_domain_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "custom_domain." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set EVERVAULT_TEST_CUSTOM_DOMAIN_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $custom_domain_ref01_ent = $client->CustomDomain(null);
        $custom_domain_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.custom_domain"), "custom_domain_ref01"));
        $custom_domain_ref01_data["relay_id"] = $setup["idmap"]["relay01"];

        $custom_domain_ref01_data_result = $custom_domain_ref01_ent->create($custom_domain_ref01_data, null);
        $custom_domain_ref01_data = Helpers::to_map($custom_domain_ref01_data_result);
        $this->assertNotNull($custom_domain_ref01_data);
        $this->assertNotNull($custom_domain_ref01_data["id"]);

        // LOAD
        $custom_domain_ref01_match_dt0 = [
            "id" => $custom_domain_ref01_data["id"],
        ];
        $custom_domain_ref01_data_dt0_loaded = $custom_domain_ref01_ent->load($custom_domain_ref01_match_dt0, null);
        $custom_domain_ref01_data_dt0_load_result = Helpers::to_map($custom_domain_ref01_data_dt0_loaded);
        $this->assertNotNull($custom_domain_ref01_data_dt0_load_result);
        $this->assertEquals($custom_domain_ref01_data_dt0_load_result["id"], $custom_domain_ref01_data["id"]);

    }
}

function custom_domain_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/custom_domain/CustomDomainTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = EvervaultSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["custom_domain01", "custom_domain02", "custom_domain03", "relay01", "relay02", "relay03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("EVERVAULT_TEST_CUSTOM_DOMAIN_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "EVERVAULT_TEST_CUSTOM_DOMAIN_ENTID" => $idmap,
        "EVERVAULT_TEST_LIVE" => "FALSE",
        "EVERVAULT_TEST_EXPLAIN" => "FALSE",
        "EVERVAULT_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["EVERVAULT_TEST_CUSTOM_DOMAIN_ENTID"]);
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
