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

func TestWebhookEndpointEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.WebhookEndpoint(nil)
		if ent == nil {
			t.Fatal("expected non-nil WebhookEndpointEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := webhook_endpointBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "webhook_endpoint." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		webhookEndpointRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.webhook_endpoint", setup.data)))
		var webhookEndpointRef01Data map[string]any
		if len(webhookEndpointRef01DataRaw) > 0 {
			webhookEndpointRef01Data = core.ToMapAny(webhookEndpointRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = webhookEndpointRef01Data

		// UPDATE
		webhookEndpointRef01Ent := client.WebhookEndpoint(nil)
		webhookEndpointRef01DataUp0Up := map[string]any{
			"id": webhookEndpointRef01Data["id"],
		}

		webhookEndpointRef01MarkdefUp0Name := "url"
		webhookEndpointRef01MarkdefUp0Value := fmt.Sprintf("Mark01-webhook_endpoint_ref01_%d", setup.now)
		webhookEndpointRef01DataUp0Up[webhookEndpointRef01MarkdefUp0Name] = webhookEndpointRef01MarkdefUp0Value

		webhookEndpointRef01ResdataUp0Result, err := webhookEndpointRef01Ent.Update(webhookEndpointRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		webhookEndpointRef01ResdataUp0 := core.ToMapAny(webhookEndpointRef01ResdataUp0Result)
		if webhookEndpointRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if webhookEndpointRef01ResdataUp0["id"] != webhookEndpointRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if webhookEndpointRef01ResdataUp0[webhookEndpointRef01MarkdefUp0Name] != webhookEndpointRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", webhookEndpointRef01MarkdefUp0Name, webhookEndpointRef01ResdataUp0[webhookEndpointRef01MarkdefUp0Name])
		}

		// LOAD
		webhookEndpointRef01MatchDt0 := map[string]any{
			"id": webhookEndpointRef01Data["id"],
		}
		webhookEndpointRef01DataDt0Loaded, err := webhookEndpointRef01Ent.Load(webhookEndpointRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		webhookEndpointRef01DataDt0LoadResult := core.ToMapAny(webhookEndpointRef01DataDt0Loaded)
		if webhookEndpointRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if webhookEndpointRef01DataDt0LoadResult["id"] != webhookEndpointRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func webhook_endpointBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "webhook_endpoint", "WebhookEndpointTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read webhook_endpoint test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse webhook_endpoint test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"webhook_endpoint01", "webhook_endpoint02", "webhook_endpoint03"},
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
	entidEnvRaw := os.Getenv("EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID": idmap,
		"EVERVAULT_TEST_LIVE":      "FALSE",
		"EVERVAULT_TEST_EXPLAIN":   "FALSE",
		"EVERVAULT_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID"])
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
