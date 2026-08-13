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

func TestBinLookupEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BinLookup(nil)
		if ent == nil {
			t.Fatal("expected non-nil BinLookupEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := bin_lookupBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "bin_lookup." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set EVERVAULT_TEST_BIN_LOOKUP_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		binLookupRef01Ent := client.BinLookup(nil)
		binLookupRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "bin_lookup"}, setup.data), "bin_lookup_ref01"))

		binLookupRef01DataResult, err := binLookupRef01Ent.Create(binLookupRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		binLookupRef01Data = core.ToMapAny(entityData(binLookupRef01DataResult))
		if binLookupRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func bin_lookupBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "bin_lookup", "BinLookupTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read bin_lookup test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse bin_lookup test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"bin_lookup01", "bin_lookup02", "bin_lookup03"},
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
	entidEnvRaw := os.Getenv("EVERVAULT_TEST_BIN_LOOKUP_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"EVERVAULT_TEST_BIN_LOOKUP_ENTID": idmap,
		"EVERVAULT_TEST_LIVE":      "FALSE",
		"EVERVAULT_TEST_EXPLAIN":   "FALSE",
		"EVERVAULT_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["EVERVAULT_TEST_BIN_LOOKUP_ENTID"])
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
