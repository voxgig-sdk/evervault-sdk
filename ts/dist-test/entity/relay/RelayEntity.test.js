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
(0, node_test_1.describe)('RelayEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EVERVAULT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EvervaultSDK.test();
        const ent = testsdk.Relay();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('relay hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.EvervaultSDK.test(offline).Relay().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.EvervaultSDK.test(offline).Relay()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.EvervaultSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Relay().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.EvervaultSDK.test().Relay().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.EvervaultSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Relay().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Relay().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.EvervaultSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Relay().list({ "app": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'relay.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "app": { "a": true, "h": "App", "n": "app", "r": false, "sh": "The unique identifier for the app to which the Relay belongs.", "t": "`$STRING`", "key$": "app", "index$": 0 }, "authentication": { "a": true, "h": "Authentication", "n": "authentication", "r": false, "sh": "The type of authentication required for the Relay", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "authentication", "index$": 1 }, "createdAt": { "a": true, "fo": "int64", "h": "Created At", "n": "createdAt", "r": false, "sh": "The exact time, in epoch milliseconds, when this Relay was created.", "t": "`$INTEGER`", "key$": "createdAt", "index$": 2 }, "destinationDomain": { "a": true, "h": "Destination Domain", "n": "destinationDomain", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The domain in front of which the Relay should be configured.", "t": "`$STRING`", "key$": "destinationDomain", "index$": 3 }, "encryptEmptyStrings": { "a": true, "h": "Encrypt Empty Strings", "n": "encryptEmptyStrings", "r": false, "sh": "Whether or not empty strings should be encrypted.", "t": "`$BOOLEAN`", "key$": "encryptEmptyStrings", "index$": 4 }, "evervaultDomain": { "a": true, "h": "Evervault Domain", "n": "evervaultDomain", "r": false, "sh": "The Evervault managed domain to which requests to be relayed to the destination domain should be sent.", "t": "`$STRING`", "key$": "evervaultDomain", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "The unique identifier for the Relay.", "t": "`$STRING`", "key$": "id", "index$": 6 }, "routes": { "a": true, "h": "Routes", "n": "routes", "op": { "create": { "req": true, "type": "`$ARRAY`" } }, "r": false, "sh": "A collection of route configurations for the Relay.", "t": "`$ARRAY`", "key$": "routes", "index$": 7 }, "updatedAt": { "a": true, "fo": "int64", "h": "Updated At", "n": "updatedAt", "r": false, "sh": "The exact time, in epoch milliseconds, when this Relay was updated.", "t": "`$INTEGER`", "key$": "updatedAt", "index$": 8 } }, "id": { "field": "id", "name": "id" }, "name": "relay", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["authentication", "destinationDomain", "encryptEmptyStrings", "routes"], "co": { "id": "POST /relays", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/relays", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "relays" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /relays", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/relays", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "relays" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /relays/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/relays/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "relays" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["authentication", "encryptEmptyStrings", "routes"], "co": { "id": "PATCH /relays/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/relays/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "relays" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "relay", "name__orig": "relay", "Name": "Relay", "name_": "relay", "name-": "relay", "NAME": "RELAY", "index$": 12 }, { "active": true, "entity": "relay", "key$": "BasicRelayFlow", "kind": "basic", "name": "BasicRelayFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "relay_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "relay_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "relay_ref01", "srcdatavar": "relay_ref01_data", "suffix": "_up0", "textfield": "app" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-relay_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "relay_ref01", "srcdatavar": "relay_ref01_data", "suffix": "_dt0" }, "m": { "id": "relay01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-relay_ref01" } }], "index$": 3 }] }, 'Relay', { "POST /relays": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "destinationDomain": { "type": "string", "description": "The domain in front of which you would like to configure a Relay", "example": "example.com", "key$": "destinationDomain" }, "routes": { "type": "array", "description": "A collection of route configurations for the Relay.", "items": { "type": "object", "properties": { "method": { "type": "string", "description": "The HTTP method that must be matched for the operation to be performed. For any method, use null.", "enum": [], "example": "POST" }, "path": { "type": "string", "description": "The path that must be matched for the operation to be performed. For wildcards, use '*'. For a catchall of all subsequent paths, use '**'.", "example": "/**" }, "request": { "type": "array", "maxItems": 1, "description": "The actions to be performed on the data on request.", "items": {} }, "response": { "type": "array", "maxItems": 1, "description": "The actions to be performed on the data on response.", "items": {} } }, "required": ["path", "request", "response"], "x-ref": "#/components/schemas/RelayRoute" }, "key$": "routes" }, "encryptEmptyStrings": { "type": "boolean", "description": "Whether or not empty strings should be encrypted. Defaults to true.", "example": true, "key$": "encryptEmptyStrings" }, "authentication": { "type": ["string", "null"], "enum": ["api-key", null], "x-enum-description": { "api-key": "Requires API key", "null": "Allows unauthenticated requests" }, "description": "The type of authentication required for the Relay\n", "key$": "authentication" } }, "required": ["destinationDomain", "routes"], "index$": 1 }, "examples": { "Basic": { "value": { "destinationDomain": "example.com", "encryptEmptyStrings": true, "authentication": null, "routes": [{ "method": "POST", "path": "/checkout", "request": [{}], "response": [{}] }] } } } } } }, "parameters": [] }, "GET /relays": { "protocol": "http", "parameters": [] }, "GET /relays/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "description": "The id of the Relay to be fetched.", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /relays/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "routes": { "type": "array", "description": "A collection of route configurations for the Relay. Any existing route configurations will be replaced with the new configurations.\n", "items": { "type": "object", "properties": { "method": { "type": "string", "description": "The HTTP method that must be matched for the operation to be performed. For any method, use null.", "enum": [], "example": "POST" }, "path": { "type": "string", "description": "The path that must be matched for the operation to be performed. For wildcards, use '*'. For a catchall of all subsequent paths, use '**'.", "example": "/**" }, "request": { "type": "array", "maxItems": 1, "description": "The actions to be performed on the data on request.", "items": {} }, "response": { "type": "array", "maxItems": 1, "description": "The actions to be performed on the data on response.", "items": {} } }, "required": ["path", "request", "response"], "x-ref": "#/components/schemas/RelayRoute" }, "key$": "routes" }, "encryptEmptyStrings": { "type": "boolean", "description": "Whether or not empty strings should be encrypted.", "example": true, "key$": "encryptEmptyStrings" }, "authentication": { "type": ["string", "null"], "enum": ["api-key", null], "description": "The type of authentication required for the Relay.", "key$": "authentication" } }, "index$": 1 }, "examples": { "Basic": { "value": { "routes": [{ "method": "POST", "path": "/checkout", "request": [{}], "response": [] }] } } } } } }, "parameters": [{ "name": "id", "in": "path", "description": "The id of the Relay to be updated.", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const relay_ref01_ent = client.Relay();
        let relay_ref01_data = setup.data.new.relay['relay_ref01'];
        relay_ref01_data = (await relay_ref01_ent.create(relay_ref01_data)).data();
        (0, node_assert_1.default)(null != relay_ref01_data.id);
        // LIST
        const relay_ref01_match = {};
        const relay_ref01_list = (await relay_ref01_ent.list(relay_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(relay_ref01_list, { id: relay_ref01_data.id })));
        // UPDATE
        const relay_ref01_data_up0 = {};
        relay_ref01_data_up0.id = relay_ref01_data.id;
        const relay_ref01_markdef_up0 = { name: 'app', value: 'Mark01-relay_ref01_' + setup.now };
        relay_ref01_data_up0[relay_ref01_markdef_up0.name] = relay_ref01_markdef_up0.value;
        const relay_ref01_resdata_up0 = (await relay_ref01_ent.update(relay_ref01_data_up0)).data();
        (0, node_assert_1.default)(relay_ref01_resdata_up0.id === relay_ref01_data_up0.id);
        (0, node_assert_1.default)(relay_ref01_resdata_up0[relay_ref01_markdef_up0.name] === relay_ref01_markdef_up0.value);
        // LOAD
        const relay_ref01_match_dt0 = {};
        relay_ref01_match_dt0.id = relay_ref01_data.id;
        const relay_ref01_data_dt0 = (await relay_ref01_ent.load(relay_ref01_match_dt0)).data();
        (0, node_assert_1.default)(relay_ref01_data_dt0.id === relay_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/relay/RelayTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EvervaultSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['relay01', 'relay02', 'relay03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EVERVAULT_TEST_RELAY_ENTID': idmap,
        'EVERVAULT_TEST_LIVE': 'FALSE',
        'EVERVAULT_TEST_EXPLAIN': 'FALSE',
        'EVERVAULT_APIKEY': '',
        'EVERVAULT_SECRET': '',
    });
    idmap = env['EVERVAULT_TEST_RELAY_ENTID'];
    const live = 'TRUE' === env.EVERVAULT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EVERVAULT_TEST_RELAY_ENTID'];
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
//# sourceMappingURL=RelayEntity.test.js.map