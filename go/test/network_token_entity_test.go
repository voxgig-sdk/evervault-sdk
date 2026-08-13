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

func TestNetworkTokenEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.NetworkToken(nil)
		if ent == nil {
			t.Fatal("expected non-nil NetworkTokenEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := network_tokenBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "network_token." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set EVERVAULT_TEST_NETWORK_TOKEN_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		networkTokenRef01Ent := client.NetworkToken(nil)
		networkTokenRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "network_token"}, setup.data), "network_token_ref01"))

		networkTokenRef01DataResult, err := networkTokenRef01Ent.Create(networkTokenRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		networkTokenRef01Data = core.ToMapAny(entityData(networkTokenRef01DataResult))
		if networkTokenRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if networkTokenRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LOAD
		networkTokenRef01MatchDt0 := map[string]any{
			"id": networkTokenRef01Data["id"],
		}
		networkTokenRef01DataDt0Loaded, err := networkTokenRef01Ent.Load(networkTokenRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		networkTokenRef01DataDt0LoadResult := core.ToMapAny(entityData(networkTokenRef01DataDt0Loaded))
		if networkTokenRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if networkTokenRef01DataDt0LoadResult["id"] != networkTokenRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func network_tokenBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "network_token", "NetworkTokenTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read network_token test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse network_token test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"network_token01", "network_token02", "network_token03"},
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
	entidEnvRaw := os.Getenv("EVERVAULT_TEST_NETWORK_TOKEN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"EVERVAULT_TEST_NETWORK_TOKEN_ENTID": idmap,
		"EVERVAULT_TEST_LIVE":      "FALSE",
		"EVERVAULT_TEST_EXPLAIN":   "FALSE",
		"EVERVAULT_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["EVERVAULT_TEST_NETWORK_TOKEN_ENTID"])
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
