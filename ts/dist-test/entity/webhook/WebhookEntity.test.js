"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('WebhookEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EVERVAULT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EvervaultSDK.test();
        const ent = testsdk.Webhook();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE;
        for (const op of ['create', 'list', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'webhook.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "createdAt": { "a": true, "fo": "int64", "h": "Created At", "n": "createdAt", "r": false, "sh": "The exact time, in epoch milliseconds, when this Webhook Endpoint was created.", "t": "`$INTEGER`", "key$": "createdAt", "index$": 0 }, "events": { "a": true, "h": "Events", "n": "events", "op": { "list": { "req": false, "type": "`$ARRAY`" } }, "r": true, "sh": "A list of Events that the Webhook Endpoint should subscribe to.", "t": "`$ARRAY`", "key$": "events", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "A unique identifier representing a specific Webhook Endpoint.", "t": "`$STRING`", "key$": "id", "index$": 2 }, "updatedAt": { "a": true, "fo": "int64", "h": "Updated At", "n": "updatedAt", "r": false, "sh": "The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated.", "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "updatedAt", "index$": 3 }, "url": { "a": true, "h": "Url", "n": "url", "op": { "list": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "The URL of the Webhook Endpoint.", "t": "`$STRING`", "key$": "url", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "webhook", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /webhook-endpoints", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/webhook-endpoints", "q": {}, "r": {}, "s": [{ "lit": "webhook-endpoints" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /webhook-endpoints", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": "webhook_endpoint_wd7c640d1daee", "k": "query", "n": "starting_after", "or": "starting_after", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/webhook-endpoints", "q": { "exist": ["limit", "starting_after"] }, "r": {}, "s": [{ "lit": "webhook-endpoints" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /webhook-endpoints/{webhook_endpoint_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "webhook_endpoint_eead1d640d7c", "k": "param", "n": "webhook_endpoint_id", "or": "webhook_endpoint_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/webhook-endpoints/{webhook_endpoint_id}", "q": { "exist": ["webhook_endpoint_id"] }, "r": {}, "s": [{ "lit": "webhook-endpoints" }, { "var": "webhook_endpoint_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.webhook_endpoint"]] }, "key$": "webhook", "name__orig": "webhook", "Name": "Webhook", "name_": "webhook", "name-": "webhook", "NAME": "WEBHOOK", "index$": 14 }, { "active": true, "entity": "webhook", "key$": "BasicWebhookFlow", "kind": "basic", "name": "BasicWebhookFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "webhook_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "webhook_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "webhook_ref01", "suffix": "_rm0" }, "m": { "id": "webhook01" }, "o": "remove", "s": [], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "webhook_ref01" } }], "index$": 3 }] }, 'Webhook', { "POST /webhook-endpoints": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "url": { "type": "string", "description": "The URL of the Webhook Endpoint.", "example": "https://example.com/webhook", "key$": "url" }, "events": { "type": "array", "description": "A list of Events that the Webhook Endpoint should subscribe to.", "items": { "type": "string", "enum": ["*", "function.run.completed", "function.deployment.started", "function.deployment.updated", "function.deployment.finished", "enclave.deployment.started", "enclave.deployment.updated", "enclave.deployment.finished", "audit-log.event", "payments.network-token.updated", "payments.merchant.updated", "payments.card.updated", "payments.3ds-session.success", "payments.3ds-session.failure"], "x-enum-description": { "*": "All events", "function.run.completed": "An asynchronous Function Run was completed", "function.deployment.started": "A Function Deployment was started", "function.deployment.updated": "A Function Deployment was updated", "function.deployment.finished": "A Function Deployment was finished", "enclave.deployment.started": "An Enclave Deployment was started", "enclave.deployment.updated": "An Enclave Deployment was updated", "enclave.deployment.finished": "An Enclave Deployment was finished", "audit-log.event": "An Audit Log Event was triggered", "payments.network-token.updated": "A Network Token was updated", "payments.merchant.updated": "A Merchant was updated", "payments.card.updated": "A Card was updated", "payments.3ds-session.success": "A 3DS Session was successful", "payments.3ds-session.failure": "A 3DS Session failed" }, "description": "A list of Events that the Webhook Endpoint is subscribed to.\n", "x-ref": "#/components/schemas/WebhookEvent" }, "key$": "events" } }, "required": ["url", "events"], "index$": 1 }, "examples": { "CreateWebhookEndpoint": { "value": { "url": "https://example.com/webhook", "events": ["payments.merchant.updated", "payments.network-token.updated"] } } } } } }, "parameters": [] }, "GET /webhook-endpoints": { "protocol": "http", "parameters": [{ "name": "limit", "in": "query", "required": false, "description": "The maximum number of Webhook Endpoints to return (Default is 10).", "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 10 }, "example": 10, "index$": 0 }, { "name": "startingAfter", "in": "query", "required": false, "description": "The identifier of the last Webhook Endpoint in the previous page of results.", "schema": { "type": "string" }, "example": "webhook_endpoint_wd7c640d1daee", "index$": 1 }] }, "DELETE /webhook-endpoints/{webhook_endpoint_id}": { "protocol": "http", "parameters": [{ "name": "webhook_endpoint_id", "in": "path", "required": true, "description": "The identifier of the Webhook Endpoint to delete.", "schema": { "type": "string" }, "example": "webhook_endpoint_eead1d640d7c", "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const webhook_ref01_ent = client.Webhook();
        let webhook_ref01_data = setup.data.new.webhook['webhook_ref01'];
        webhook_ref01_data = (await webhook_ref01_ent.create(webhook_ref01_data)).data();
        (0, node_assert_1.default)(null != webhook_ref01_data.id);
        // LIST
        const webhook_ref01_match = {};
        const webhook_ref01_list = (await webhook_ref01_ent.list(webhook_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(webhook_ref01_list, { id: webhook_ref01_data.id })));
        // REMOVE
        const webhook_ref01_match_rm0 = { id: webhook_ref01_data.id };
        await webhook_ref01_ent.remove(webhook_ref01_match_rm0);
        // LIST
        const webhook_ref01_match_rt0 = {};
        const webhook_ref01_list_rt0 = (await webhook_ref01_ent.list(webhook_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(webhook_ref01_list_rt0, { id: webhook_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/webhook/WebhookTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EvervaultSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['webhook01', 'webhook02', 'webhook03', 'webhook_endpoint01', 'webhook_endpoint02', 'webhook_endpoint03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EVERVAULT_TEST_WEBHOOK_ENTID': idmap,
        'EVERVAULT_TEST_LIVE': 'FALSE',
        'EVERVAULT_TEST_EXPLAIN': 'FALSE',
        'EVERVAULT_APIKEY': '',
        'EVERVAULT_SECRET': '',
    });
    idmap = env['EVERVAULT_TEST_WEBHOOK_ENTID'];
    const live = 'TRUE' === env.EVERVAULT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EVERVAULT_TEST_WEBHOOK_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.EvervaultSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.EVERVAULT_APIKEY,
                secret: env.EVERVAULT_SECRET,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.EVERVAULT_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=WebhookEntity.test.js.map