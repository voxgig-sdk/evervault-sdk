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

func TestMerchantEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Merchant(nil)
		if ent == nil {
			t.Fatal("expected non-nil MerchantEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := merchantBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "merchant." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set EVERVAULT_TEST_MERCHANT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		merchantRef01Ent := client.Merchant(nil)
		merchantRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "merchant"}, setup.data), "merchant_ref01"))

		merchantRef01DataResult, err := merchantRef01Ent.Create(merchantRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		merchantRef01Data = core.ToMapAny(merchantRef01DataResult)
		if merchantRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if merchantRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// UPDATE
		merchantRef01DataUp0Up := map[string]any{
			"id": merchantRef01Data["id"],
		}

		merchantRef01MarkdefUp0Name := "category_code"
		merchantRef01MarkdefUp0Value := fmt.Sprintf("Mark01-merchant_ref01_%d", setup.now)
		merchantRef01DataUp0Up[merchantRef01MarkdefUp0Name] = merchantRef01MarkdefUp0Value

		merchantRef01ResdataUp0Result, err := merchantRef01Ent.Update(merchantRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		merchantRef01ResdataUp0 := core.ToMapAny(merchantRef01ResdataUp0Result)
		if merchantRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if merchantRef01ResdataUp0["id"] != merchantRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if merchantRef01ResdataUp0[merchantRef01MarkdefUp0Name] != merchantRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", merchantRef01MarkdefUp0Name, merchantRef01ResdataUp0[merchantRef01MarkdefUp0Name])
		}

		// LOAD
		merchantRef01MatchDt0 := map[string]any{
			"id": merchantRef01Data["id"],
		}
		merchantRef01DataDt0Loaded, err := merchantRef01Ent.Load(merchantRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		merchantRef01DataDt0LoadResult := core.ToMapAny(merchantRef01DataDt0Loaded)
		if merchantRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if merchantRef01DataDt0LoadResult["id"] != merchantRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func merchantBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "merchant", "MerchantTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read merchant test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse merchant test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"merchant01", "merchant02", "merchant03"},
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
	entidEnvRaw := os.Getenv("EVERVAULT_TEST_MERCHANT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"EVERVAULT_TEST_MERCHANT_ENTID": idmap,
		"EVERVAULT_TEST_LIVE":      "FALSE",
		"EVERVAULT_TEST_EXPLAIN":   "FALSE",
		"EVERVAULT_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["EVERVAULT_TEST_MERCHANT_ENTID"])
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
