package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/evervault-sdk/go"
	"github.com/voxgig-sdk/evervault-sdk/go/core"

	vs "github.com/voxgig-sdk/evervault-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const coreEntityLiveStrict = true


func TestCoreEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Core(nil)
		if ent == nil {
			t.Fatal("expected non-nil CoreEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Core(nil).List(map[string]any{"relay_id": 1}, nil)
		if sdkerr, ok := err.(*core.EvervaultError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := coreBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "core." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"relay01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, coreEntityLiveStrict, "Live entity test blocked: needs %s via EVERVAULT_TEST_CORE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client

		// CREATE
		coreRef01Ent := client.Core(nil)
		coreRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "core"}), "core_ref01"))
		coreRef01Data["relay_id"] = setup.idmap["relay01"]

		coreRef01DataResult, err := coreRef01Ent.Create(coreRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		coreRef01Data = core.ToMapAny(entityData(coreRef01DataResult))
		if coreRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if coreRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		coreRef01Match := map[string]any{
			"relay_id": setup.idmap["relay01"],
		}

		coreRef01ListResult, err := coreRef01Ent.List(coreRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		coreRef01List, coreRef01ListOk := coreRef01ListResult.([]any)
		if !coreRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", coreRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(coreRef01List), map[string]any{"id": coreRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// REMOVE
		coreRef01MatchRm0 := map[string]any{
			"id": coreRef01Data["id"],
		}
		_, err = coreRef01Ent.Remove(coreRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		coreRef01MatchRt0 := map[string]any{
			"relay_id": setup.idmap["relay01"],
		}

		coreRef01ListRt0Result, err := coreRef01Ent.List(coreRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		coreRef01ListRt0, coreRef01ListRt0Ok := coreRef01ListRt0Result.([]any)
		if !coreRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", coreRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(coreRef01ListRt0), map[string]any{"id": coreRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func coreBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "core", "CoreTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read core test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse core test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"core01", "core02", "core03", "relay01", "relay02", "relay03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("EVERVAULT_TEST_CORE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"EVERVAULT_TEST_CORE_ENTID": idmap,
		"EVERVAULT_TEST_LIVE":      "FALSE",
		"EVERVAULT_TEST_EXPLAIN":   "FALSE",
		"EVERVAULT_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["EVERVAULT_TEST_CORE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["EVERVAULT_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["EVERVAULT_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewEvervaultSDK(core.ToMapAny(mergedOpts))
	}

	live := env["EVERVAULT_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["EVERVAULT_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
