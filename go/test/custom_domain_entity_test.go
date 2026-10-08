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
const custom_domainEntityLiveStrict = true


func TestCustomDomainEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CustomDomain(nil)
		if ent == nil {
			t.Fatal("expected non-nil CustomDomainEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.CustomDomain(nil).Load(map[string]any{"id": 1, "relay_id": "x"}, nil)
		if sdkerr, ok := err.(*core.EvervaultError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := custom_domainBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "custom_domain." + _op, _mode); _shouldSkip {
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
					liveMiss(t, custom_domainEntityLiveStrict, "Live entity test blocked: needs %s via EVERVAULT_TEST_CUSTOM_DOMAIN_ENTID", _liveKey)
				}
			}
		}
		client := setup.client

		// CREATE
		customDomainRef01Ent := client.CustomDomain(nil)
		customDomainRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "custom_domain"}), "custom_domain_ref01"))
		customDomainRef01Data["relay_id"] = setup.idmap["relay01"]

		customDomainRef01DataResult, err := customDomainRef01Ent.Create(customDomainRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		customDomainRef01Data = core.ToMapAny(entityData(customDomainRef01DataResult))
		if customDomainRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if customDomainRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LOAD
		customDomainRef01MatchDt0 := map[string]any{
			"id": customDomainRef01Data["id"],
		}
		customDomainRef01DataDt0Loaded, err := customDomainRef01Ent.Load(customDomainRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		customDomainRef01DataDt0LoadResult := core.ToMapAny(entityData(customDomainRef01DataDt0Loaded))
		if customDomainRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if customDomainRef01DataDt0LoadResult["id"] != customDomainRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func custom_domainBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "custom_domain", "CustomDomainTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read custom_domain test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse custom_domain test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"custom_domain01", "custom_domain02", "custom_domain03", "relay01", "relay02", "relay03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("EVERVAULT_TEST_CUSTOM_DOMAIN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"EVERVAULT_TEST_CUSTOM_DOMAIN_ENTID": idmap,
		"EVERVAULT_TEST_LIVE":      "FALSE",
		"EVERVAULT_TEST_EXPLAIN":   "FALSE",
		"EVERVAULT_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["EVERVAULT_TEST_CUSTOM_DOMAIN_ENTID"])
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
