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
(0, node_test_1.describe)('NetworkTokenCryptogramEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EVERVAULT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EvervaultSDK.test();
        const ent = testsdk.NetworkTokenCryptogram();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'network_token_cryptogram.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "createdAt", "req": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "cryptogram", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 2 }], "id": { "field": "id", "name": "id" }, "name": "network_token_cryptogram", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "network_token_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "POST /payments/network-tokens/{network_token_id}/cryptograms", "json": "{\"operationId\":\"createNetworkTokenCryptogram\",\"parameters\":[{\"description\":\"The unique identifier of the Network Token.\",\"in\":\"path\",\"name\":\"network_token_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"201\":{\"content\":{\"application/json\":{\"examples\":{\"SuccessfulCreation\":{\"summary\":\"Network Token Cryptogram created\",\"value\":{\"createdAt\":1692972623233,\"cryptogram\":\"NTk0ZjM5M2QyNDMwNDE1MjkzMjg1ZTg5Y2NiZjdmNjE=\",\"id\":\"network_token_cryptogram_eead1d640d7c\"}}},\"schema\":{\"properties\":{\"createdAt\":{\"description\":\"The exact time, in epoch milliseconds, when this Network Token Cryptogram was created.\",\"example\":1692972623233,\"format\":\"int64\",\"type\":\"integer\"},\"cryptogram\":{\"description\":\"The value of the Network Token Cryptogram. This is the value that is used embedded in the Authorization request.\",\"example\":\"NTk0ZjM5M2QyNDMwNDE1MjkzMjg1ZTg5Y2NiZjdmNjE=\",\"type\":\"string\"},\"id\":{\"description\":\"A unique identifier representing a specific Network Token Cryptogram.\",\"example\":\"network_token_cryptogram_eead1d640d7c\",\"type\":\"string\"}},\"required\":[\"id\",\"cryptogram\",\"createdAt\"],\"type\":\"object\"}}},\"description\":\"Returns a Network Token Cryptogram object.\"}},\"security\":[{\"ApiKey\":[\"networkToken:createCryptogram\"]}],\"securitySchemes\":{\"ApiKey\":{\"description\":\"Authentication using an API key. The username is the App ID and the password is the Api Key.\",\"scheme\":\"basic\",\"type\":\"http\"},\"ClientSideToken\":{\"bearerFormat\":\"Token\",\"description\":\"Authentication using a short lived token that you can share with clients. The Authorization header must be formatted as follow: \\\"Token <Client-Side Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"},\"TokenAuth\":{\"bearerFormat\":\"RunToken\",\"description\":\"Authentication using a short lived run token that you can share with clients. The Authorization header must be formatted as follow: \\\"RunToken <Function Run Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/payments/network-tokens/{network_token_id}/cryptograms", "rename": { "param": { "network_token_id": "id" } }, "segments": [{ "lit": "payments" }, { "lit": "network-tokens" }, { "var": "id" }, { "lit": "cryptograms" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "network_token_cryptogram", "name__orig": "network_token_cryptogram", "Name": "NetworkTokenCryptogram", "name_": "network_token_cryptogram", "name-": "network-token-cryptogram", "NAME": "NETWORK_TOKEN_CRYPTOGRAM", "index$": 10 }, { "active": true, "entity": "network_token_cryptogram", "key$": "BasicNetworkTokenCryptogramFlow", "kind": "basic", "name": "BasicNetworkTokenCryptogramFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "network_token_cryptogram_ref01" }, "match": { "network_token_id": "network_token01" }, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'NetworkTokenCryptogram');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const network_token_cryptogram_ref01_ent = client.NetworkTokenCryptogram();
        let network_token_cryptogram_ref01_data = setup.data.new.network_token_cryptogram['network_token_cryptogram_ref01'];
        network_token_cryptogram_ref01_data['network_token_id'] = setup.idmap['network_token01'];
        network_token_cryptogram_ref01_data = (await network_token_cryptogram_ref01_ent.create(network_token_cryptogram_ref01_data)).data();
        (0, node_assert_1.default)(null != network_token_cryptogram_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/network_token_cryptogram/NetworkTokenCryptogramTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EvervaultSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['network_token_cryptogram01', 'network_token_cryptogram02', 'network_token_cryptogram03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EVERVAULT_TEST_NETWORK_TOKEN_CRYPTOGRAM_ENTID': idmap,
        'EVERVAULT_TEST_LIVE': 'FALSE',
        'EVERVAULT_TEST_EXPLAIN': 'FALSE',
        'EVERVAULT_APIKEY': '',
        'EVERVAULT_SECRET': '',
    });
    idmap = env['EVERVAULT_TEST_NETWORK_TOKEN_CRYPTOGRAM_ENTID'];
    const live = 'TRUE' === env.EVERVAULT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EVERVAULT_TEST_NETWORK_TOKEN_CRYPTOGRAM_ENTID'];
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
//# sourceMappingURL=NetworkTokenCryptogramEntity.test.js.map