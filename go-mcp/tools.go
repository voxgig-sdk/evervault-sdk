package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/jsonschema-go/jsonschema"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/evervault-sdk/go"
)

// ListArgs is what an agent sends to evervault_list.
type ListArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: acquirer | core | merchant | payment | relay | webhook_endpoint"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional filter map; omit it for the first page"`
}

// LoadArgs is what an agent sends to evervault_load.
type LoadArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: acquirer | card | card_art | custom_domain | merchant | network_token | relay | three_ds_session | webhook_endpoint"`
	Query  map[string]any `json:"query" jsonschema:"match map naming the record, such as {\"id\":1}"`
}

func registerTools(server *mcp.Server, client *sdk.EvervaultSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name:        "evervault_list",
		Description: "List records from Evervault. Args: entity, query (optional filter map; omit it for the first page). Returns the first page of records as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[ListArgs]("acquirer", "core", "merchant", "payment", "relay", "webhook_endpoint"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args ListArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "list", args.Entity, args.Query)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "evervault_load",
		Description: "Load one record from Evervault. Args: entity, query (match map naming the record, such as {\"id\":1}). Returns the record as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[LoadArgs]("acquirer", "card", "card_art", "custom_domain", "merchant", "network_token", "relay", "three_ds_session", "webhook_endpoint"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args LoadArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "load", args.Entity, args.Query)
	})
}

// entitySchema is the schema inferred from In, its entity limited to the
// entities the tool serves.
func entitySchema[In any](names ...string) *jsonschema.Schema {
	schema, err := jsonschema.For[In](nil)
	if err != nil {
		panic(err)
	}
	enum := make([]any, len(names))
	for i, name := range names {
		enum[i] = name
	}
	schema.Properties["entity"].Enum = enum
	return schema
}

func runOp(_ context.Context, client *sdk.EvervaultSDK, op string, entity string, input map[string]any) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(input, nil)
	case "load":
		result, err = ent.Load(input, nil)
	case "create":
		result, err = ent.Create(input, nil)
	case "update":
		result, err = ent.Update(input, nil)
	case "patch":
		result, err = ent.Patch(input, nil)
	case "remove":
		result, err = ent.Remove(input, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.EvervaultSDK, name string) (sdk.EvervaultEntity, error) {
	switch strings.ToLower(name) {
	case "acquirer":
		return client.Acquirer(nil), nil
	case "bin_lookup":
		return client.BinLookup(nil), nil
	case "card":
		return client.Card(nil), nil
	case "card_art":
		return client.CardArt(nil), nil
	case "client_side_token":
		return client.ClientSideToken(nil), nil
	case "core":
		return client.Core(nil), nil
	case "custom_domain":
		return client.CustomDomain(nil), nil
	case "function_run":
		return client.FunctionRun(nil), nil
	case "merchant":
		return client.Merchant(nil), nil
	case "network_token":
		return client.NetworkToken(nil), nil
	case "network_token_cryptogram":
		return client.NetworkTokenCryptogram(nil), nil
	case "payment":
		return client.Payment(nil), nil
	case "relay":
		return client.Relay(nil), nil
	case "three_ds_session":
		return client.ThreeDsSession(nil), nil
	case "webhook":
		return client.Webhook(nil), nil
	case "webhook_endpoint":
		return client.WebhookEndpoint(nil), nil
	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}

// hint is an MCP annotation that defaults to true unless stated.
func hint(b bool) *bool {
	return &b
}
