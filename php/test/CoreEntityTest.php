<?php
declare(strict_types=1);

// Core entity test

require_once __DIR__ . '/../evervault_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CoreEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = EvervaultSDK::test(null, null);
        $ent = $testsdk->Core(null);
        $this->assertNotNull($ent);
    }

    public function test_validate(): void
    {
        $cfg = EvervaultConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = EvervaultSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->Core(null)->list(["relay_id" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = core_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "core." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"])) {
            foreach (["relay01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via EVERVAULT_TEST_CORE_ENTID");
                }
            }
        }
        $client = $setup["client"];

        // CREATE
        $core_ref01_ent = $client->Core(null);
        $core_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.core"), "core_ref01"));
        $core_ref01_data["relay_id"] = $setup["idmap"]["relay01"];

        $core_ref01_data_result = $core_ref01_ent->create($core_ref01_data, null);
        $core_ref01_data = Helpers::to_map(is_object($core_ref01_data_result) && method_exists($core_ref01_data_result, 'data_get') ? $core_ref01_data_result->data_get() : $core_ref01_data_result);
        $this->assertNotNull($core_ref01_data);
        $this->assertNotNull($core_ref01_data["id"]);

        // LIST
        $core_ref01_match = [
            "relay_id" => $setup["idmap"]["relay01"],
        ];

        $core_ref01_list_result = $core_ref01_ent->list($core_ref01_match, null);
        $this->assertIsArray($core_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($core_ref01_list_result),
            ["id" => $core_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // REMOVE
        $core_ref01_match_rm0 = [
            "id" => $core_ref01_data["id"],
        ];
        $core_ref01_ent->remove($core_ref01_match_rm0, null);

        // LIST
        $core_ref01_match_rt0 = [
            "relay_id" => $setup["idmap"]["relay01"],
        ];

        $core_ref01_list_rt0_result = $core_ref01_ent->list($core_ref01_match_rt0, null);
        $this->assertIsArray($core_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($core_ref01_list_rt0_result),
            ["id" => $core_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function core_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/core/CoreTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = EvervaultSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["core01", "core02", "core03", "relay01", "relay02", "relay03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("EVERVAULT_TEST_CORE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "EVERVAULT_TEST_CORE_ENTID" => $idmap,
        "EVERVAULT_TEST_LIVE" => "FALSE",
        "EVERVAULT_TEST_EXPLAIN" => "FALSE",
        "EVERVAULT_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["EVERVAULT_TEST_CORE_ENTID"]);
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
