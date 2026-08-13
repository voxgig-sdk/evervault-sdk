package sdktest

import (
	"encoding/json"
	"fmt"
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

func TestAcquirerEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Acquirer(nil)
		if ent == nil {
			t.Fatal("expected non-nil AcquirerEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := acquirerBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "acquirer." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set EVERVAULT_TEST_ACQUIRER_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		acquirerRef01Ent := client.Acquirer(nil)
		acquirerRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "acquirer"}, setup.data), "acquirer_ref01"))

		acquirerRef01DataResult, err := acquirerRef01Ent.Create(acquirerRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		acquirerRef01Data = core.ToMapAny(entityData(acquirerRef01DataResult))
		if acquirerRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if acquirerRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// UPDATE
		acquirerRef01DataUp0Up := map[string]any{
			"id": acquirerRef01Data["id"],
		}

		acquirerRef01MarkdefUp0Name := "description"
		acquirerRef01MarkdefUp0Value := fmt.Sprintf("Mark01-acquirer_ref01_%d", setup.now)
		acquirerRef01DataUp0Up[acquirerRef01MarkdefUp0Name] = acquirerRef01MarkdefUp0Value

		acquirerRef01ResdataUp0Result, err := acquirerRef01Ent.Update(acquirerRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		acquirerRef01ResdataUp0 := core.ToMapAny(entityData(acquirerRef01ResdataUp0Result))
		if acquirerRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if acquirerRef01ResdataUp0["id"] != acquirerRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if acquirerRef01ResdataUp0[acquirerRef01MarkdefUp0Name] != acquirerRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", acquirerRef01MarkdefUp0Name, acquirerRef01ResdataUp0[acquirerRef01MarkdefUp0Name])
		}

		// LOAD
		acquirerRef01MatchDt0 := map[string]any{
			"id": acquirerRef01Data["id"],
		}
		acquirerRef01DataDt0Loaded, err := acquirerRef01Ent.Load(acquirerRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		acquirerRef01DataDt0LoadResult := core.ToMapAny(entityData(acquirerRef01DataDt0Loaded))
		if acquirerRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if acquirerRef01DataDt0LoadResult["id"] != acquirerRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func acquirerBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "acquirer", "AcquirerTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read acquirer test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse acquirer test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"acquirer01", "acquirer02", "acquirer03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("EVERVAULT_TEST_ACQUIRER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"EVERVAULT_TEST_ACQUIRER_ENTID": idmap,
		"EVERVAULT_TEST_LIVE":      "FALSE",
		"EVERVAULT_TEST_EXPLAIN":   "FALSE",
		"EVERVAULT_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["EVERVAULT_TEST_ACQUIRER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["EVERVAULT_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["EVERVAULT_APIKEY"],
			},
			extra,
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
