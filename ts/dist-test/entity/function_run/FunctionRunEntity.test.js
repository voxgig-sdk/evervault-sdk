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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "async", "req": false, "short": "If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code.", "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "format": "int64", "name": "createdAt", "req": false, "short": "The exact time, in epoch milliseconds, when this Function execution was triggered.", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "error", "req": false, "short": "This field details any error that occurred during Function execution.", "type": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "index$": 2 }, { "active": true, "name": "id", "req": false, "short": "A unique identifier representing this specific Function execution instance.", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "payload", "req": true, "short": "The data payload that the Function will use during its execution.", "type": "`$OBJECT`", "index$": 4 }, { "active": true, "name": "result", "req": false, "short": "This field represents the output returned by the Function.", "type": "`$OBJECT`", "index$": 5 }, { "active": true, "name": "status", "req": false, "short": "The outcome of the Function execution.", "type": "`$STRING`", "index$": 6 }], "id": { "field": "id", "name": "id" }, "name": "function_run", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "function_name", "orig": "function_name", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "POST /functions/{function_name}/runs", "json": "{\"operationId\":\"createFunctionRun\",\"parameters\":[{\"description\":\"The name of the Function to be executed.\",\"in\":\"path\",\"name\":\"function_name\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"SimpleExample\":{\"value\":{\"payload\":{\"name\":\"ev:Tk9D:oVPHsPvwFHNk73DU:AglNWOgZekolcrxdxSpZJOusBgE+C9eWSapGIZkgTsUj:JKeSkdhVE9SCXqQINID4oBRCE/VhTb56VWGqyObP:$\"}}}},\"schema\":{\"properties\":{\"async\":{\"description\":\"If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code.\",\"example\":false,\"type\":\"boolean\"},\"payload\":{\"description\":\"The data payload that the Function will use during its execution. Any encrypted values will be decrypted before being passed to the function.\",\"example\":{\"name\":\"ev:debug:Tk9D:oVPHsPvwFHNk73DU:AglNWOgZekolcrxdxSpZJOusBgE+C9eWSapGIZkgTsUj:JKeSkdhVE9SCXqQINID4oBRCE/VhTb56VWGqyObP:$\"},\"type\":\"object\"}},\"required\":[\"payload\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"FailedRun\":{\"description\":\"An error occurred during Function execution\",\"summary\":\"Failed Run\",\"value\":{\"createdAt\":1692972623233,\"error\":{\"message\":\"Some error message\",\"stack\":\"Error: Some error message!\\\\n    at exports.handler (/runtime/app/index.js:5:11)\\\\n    at /runtime/index.js:64:26\\\\n    at new Promise (<anonymous>)\\\\n    at /runtime/index.js:51:16\"},\"id\":\"func_run_b4b2afe37083\",\"status\":\"failure\"}},\"SuccessfulRun\":{\"description\":\"The Function ran successfully\",\"summary\":\"Successful Run\",\"value\":{\"createdAt\":1692972623233,\"id\":\"func_run_eead1d640d7c\",\"result\":{\"message\":\"Hello from a Function! It seems you have 14 letters in your name\"},\"status\":\"success\"}}},\"schema\":{\"properties\":{\"createdAt\":{\"description\":\"The exact time, in epoch milliseconds, when this Function execution was triggered.\",\"example\":1692972623233,\"format\":\"int64\",\"type\":\"integer\"},\"error\":{\"description\":\"This field details any error that occurred during Function execution. This is present only if the status is 'failure'.\",\"properties\":{\"message\":{\"description\":\"A concise explanation of the error that occurred during Function execution.\",\"example\":\"Some error message!\",\"type\":\"string\"},\"stack\":{\"description\":\"A trace detailing the sequence of events leading to the error, useful for debugging purposes.\",\"example\":\"Error: Some error message!\\n    at exports.handler (/runtime/app/index.js:5:11)\\n    at /runtime/index.js:64:26\\n    at new Promise (<anonymous>)\\n    at /runtime/index.js:51:16\",\"type\":\"string\"}},\"type\":[\"object\",\"null\"]},\"id\":{\"description\":\"A unique identifier representing this specific Function execution instance.\",\"example\":\"func_run_eead1d640d7c\",\"type\":\"string\"},\"result\":{\"description\":\"This field represents the output returned by the Function. This is provided only when the Function execution status is 'success'.\",\"example\":{\"message\":\"Hello, World\"},\"type\":\"object\"},\"status\":{\"description\":\"The outcome of the Function execution.\",\"enum\":[\"success\",\"failure\",\"scheduled\"],\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"The Function run has completed\"},\"202\":{\"content\":{\"application/json\":{\"examples\":{\"QueuedRun\":{\"summary\":\"Queued Run\",\"value\":{\"status\":\"scheduled\"}}},\"schema\":{\"properties\":{\"createdAt\":{\"description\":\"The exact time, in epoch milliseconds, when this Function execution was triggered.\",\"example\":1692972623233,\"format\":\"int64\",\"type\":\"integer\"},\"error\":{\"description\":\"This field details any error that occurred during Function execution. This is present only if the status is 'failure'.\",\"properties\":{\"message\":{\"description\":\"A concise explanation of the error that occurred during Function execution.\",\"example\":\"Some error message!\",\"type\":\"string\"},\"stack\":{\"description\":\"A trace detailing the sequence of events leading to the error, useful for debugging purposes.\",\"example\":\"Error: Some error message!\\n    at exports.handler (/runtime/app/index.js:5:11)\\n    at /runtime/index.js:64:26\\n    at new Promise (<anonymous>)\\n    at /runtime/index.js:51:16\",\"type\":\"string\"}},\"type\":[\"object\",\"null\"]},\"id\":{\"description\":\"A unique identifier representing this specific Function execution instance.\",\"example\":\"func_run_eead1d640d7c\",\"type\":\"string\"},\"result\":{\"description\":\"This field represents the output returned by the Function. This is provided only when the Function execution status is 'success'.\",\"example\":{\"message\":\"Hello, World\"},\"type\":\"object\"},\"status\":{\"description\":\"The outcome of the Function execution.\",\"enum\":[\"success\",\"failure\",\"scheduled\"],\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"The asynchronous Function invocation has been queued.\"},\"408\":{\"content\":{\"application/problem+json\":{\"examples\":{\"RequestTimeout\":{\"summary\":\"Request Timeout\",\"value\":{\"code\":\"functions/request-timeout\",\"detail\":\"Function execution exceeded the allotted time and has timed out. Please review your code to ensure it finishes within the time limit set in function.toml.\",\"status\":408,\"title\":\"Request Timeout\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"A distinct error code, presented in slug format, that identifies a specific error.\",\"example\":\"invalid-request\",\"type\":\"string\"},\"detail\":{\"description\":\"A human-readable explanation of the error.\",\"example\":\"The provided action was invalid\",\"type\":\"string\"},\"fields\":{\"example\":[{\"pointer\":\"/card/number\",\"reason\":\"The card number is required\"}],\"items\":{\"properties\":{\"pointer\":{\"description\":\"The JSON pointer to the field that caused the error.\",\"example\":\"/card/number\",\"type\":\"string\"},\"reason\":{\"description\":\"A human-readable explanation of the error for this field.\",\"example\":\"The card number is required\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"status\":{\"description\":\"The HTTP status code for the error.\",\"example\":400,\"type\":\"integer\"},\"title\":{\"description\":\"A short, human-readable summary of the error.\",\"example\":\"Invalid Request\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"The request has timed out.\"},\"409\":{\"content\":{\"application/problem+json\":{\"examples\":{\"FunctionNotReady\":{\"summary\":\"Function Not Ready\",\"value\":{\"code\":\"functions/function-not-ready\",\"detail\":\"The Function is not ready to be invoked yet. This can occur when it hasn't been executed recently. Please try again shortly.\",\"status\":409,\"title\":\"Function Not Ready\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"A distinct error code, presented in slug format, that identifies a specific error.\",\"example\":\"invalid-request\",\"type\":\"string\"},\"detail\":{\"description\":\"A human-readable explanation of the error.\",\"example\":\"The provided action was invalid\",\"type\":\"string\"},\"fields\":{\"example\":[{\"pointer\":\"/card/number\",\"reason\":\"The card number is required\"}],\"items\":{\"properties\":{\"pointer\":{\"description\":\"The JSON pointer to the field that caused the error.\",\"example\":\"/card/number\",\"type\":\"string\"},\"reason\":{\"description\":\"A human-readable explanation of the error for this field.\",\"example\":\"The card number is required\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"status\":{\"description\":\"The HTTP status code for the error.\",\"example\":400,\"type\":\"integer\"},\"title\":{\"description\":\"A short, human-readable summary of the error.\",\"example\":\"Invalid Request\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"The Function is not ready to be invoked yet. This can occur when\\nit hasn't been executed in a while. Retrying to run the Function after a short\\ntime should resolve this.\\n\"}},\"security\":[{\"ApiKey\":[]},{\"TokenAuth\":[]}],\"securitySchemes\":{\"ApiKey\":{\"description\":\"Authentication using an API key. The username is the App ID and the password is the Api Key.\",\"scheme\":\"basic\",\"type\":\"http\"},\"ClientSideToken\":{\"bearerFormat\":\"Token\",\"description\":\"Authentication using a short lived token that you can share with clients. The Authorization header must be formatted as follow: \\\"Token <Client-Side Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"},\"TokenAuth\":{\"bearerFormat\":\"RunToken\",\"description\":\"Authentication using a short lived run token that you can share with clients. The Authorization header must be formatted as follow: \\\"RunToken <Function Run Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/functions/{function_name}/runs", "segments": [{ "lit": "functions" }, { "var": "function_name" }, { "lit": "runs" }], "select": { "exist": ["function_name"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["function"]] }, "key$": "function_run", "name__orig": "function_run", "Name": "FunctionRun", "name_": "function_run", "name-": "function-run", "NAME": "FUNCTION_RUN", "index$": 7 }, { "active": true, "entity": "function_run", "key$": "BasicFunctionRunFlow", "kind": "basic", "name": "BasicFunctionRunFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "function_run_ref01" }, "match": { "function_name": "function_name01" }, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'FunctionRun');
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
    let idmap = transform(['function_run01', 'function_run02', 'function_run03', 'function01', 'function02', 'function03'], {
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