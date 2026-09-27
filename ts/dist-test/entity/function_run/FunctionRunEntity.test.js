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
(0, node_test_1.describe)('FunctionRunEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EVERVAULT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EvervaultSDK.test();
        const ent = testsdk.FunctionRun();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'function_run.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "async": { "a": true, "h": "Async", "n": "async", "r": false, "sh": "If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code.", "t": "`$BOOLEAN`", "key$": "async", "index$": 0 }, "createdAt": { "a": true, "fo": "int64", "h": "Created At", "n": "createdAt", "r": false, "sh": "The exact time, in epoch milliseconds, when this Function execution was triggered.", "t": "`$INTEGER`", "key$": "createdAt", "index$": 1 }, "error": { "a": true, "h": "Error", "n": "error", "r": false, "sh": "This field details any error that occurred during Function execution.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "error", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "A unique identifier representing this specific Function execution instance.", "t": "`$STRING`", "key$": "id", "index$": 3 }, "payload": { "a": true, "h": "Payload", "n": "payload", "r": true, "sh": "The data payload that the Function will use during its execution.", "t": "`$OBJECT`", "key$": "payload", "index$": 4 }, "result": { "a": true, "h": "Result", "n": "result", "r": false, "sh": "This field represents the output returned by the Function.", "t": "`$OBJECT`", "key$": "result", "index$": 5 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "The outcome of the Function execution.", "t": "`$STRING`", "key$": "status", "index$": 6 } }, "id": { "field": "id", "name": "id" }, "name": "function_run", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /functions/{function_name}/runs", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "function_name", "or": "function_name", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/functions/{function_name}/runs", "q": { "exist": ["function_name"] }, "r": {}, "s": [{ "lit": "functions" }, { "var": "function_name" }, { "lit": "runs" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "function_run", "name__orig": "function_run", "Name": "FunctionRun", "name_": "function_run", "name-": "function-run", "NAME": "FUNCTION_RUN", "index$": 7 }, { "active": true, "entity": "function_run", "key$": "BasicFunctionRunFlow", "kind": "basic", "name": "BasicFunctionRunFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "function_run_ref01" }, "m": { "function_name": "function_name01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'FunctionRun', { "POST /functions/{function_name}/runs": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "payload": { "type": "object", "description": "The data payload that the Function will use during its execution. Any encrypted values will be decrypted before being passed to the function.", "example": { "name": "ev:debug:Tk9D:oVPHsPvwFHNk73DU:AglNWOgZekolcrxdxSpZJOusBgE+C9eWSapGIZkgTsUj:JKeSkdhVE9SCXqQINID4oBRCE/VhTb56VWGqyObP:$" }, "key$": "payload" }, "async": { "type": "boolean", "description": "If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code.", "example": false, "key$": "async" } }, "required": ["payload"], "index$": 1 }, "examples": { "SimpleExample": { "value": { "payload": { "name": "ev:Tk9D:oVPHsPvwFHNk73DU:AglNWOgZekolcrxdxSpZJOusBgE+C9eWSapGIZkgTsUj:JKeSkdhVE9SCXqQINID4oBRCE/VhTb56VWGqyObP:$" } } } } } } }, "parameters": [{ "name": "function_name", "in": "path", "description": "The name of the Function to be executed.", "required": true, "schema": { "type": "string" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const function_run_ref01_ent = client.FunctionRun();
        let function_run_ref01_data = setup.data.new.function_run['function_run_ref01'];
        function_run_ref01_data['function_name'] = setup.idmap['function_name01'];
        function_run_ref01_data = (await function_run_ref01_ent.create(function_run_ref01_data)).data();
        (0, node_assert_1.default)(null != function_run_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/function_run/FunctionRunTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EvervaultSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['function_run01', 'function_run02', 'function_run03', 'function_name01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EVERVAULT_TEST_FUNCTION_RUN_ENTID': idmap,
        'EVERVAULT_TEST_LIVE': 'FALSE',
        'EVERVAULT_TEST_EXPLAIN': 'FALSE',
        'EVERVAULT_APIKEY': '',
        'EVERVAULT_SECRET': '',
    });
    idmap = env['EVERVAULT_TEST_FUNCTION_RUN_ENTID'];
    const live = 'TRUE' === env.EVERVAULT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EVERVAULT_TEST_FUNCTION_RUN_ENTID'];
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
//# sourceMappingURL=FunctionRunEntity.test.js.map