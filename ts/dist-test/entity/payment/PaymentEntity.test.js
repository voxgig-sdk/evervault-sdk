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
(0, node_test_1.describe)('PaymentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EVERVAULT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EvervaultSDK.test();
        const ent = testsdk.Payment();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.EvervaultSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Payment().list({ "3ds_session_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'payment.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": false, "sh": "Timestamp when the message was created", "t": "`$INTEGER`", "key$": "created_at", "index$": 0 }, "data": { "a": true, "h": "Data", "n": "data", "r": false, "sh": "The message data payload", "t": "`$OBJECT`", "key$": "data", "index$": 1 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "The type of 3DS message (e.g., AReq, ARes, CReq, CRes, RReq, RRes)", "t": "`$STRING`", "key$": "type", "index$": 2 } }, "name": "payment", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /payments/3ds-sessions/{3ds_session_id}/messages", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "3ds_session_id", "or": "3ds_session_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/payments/3ds-sessions/{3ds_session_id}/messages", "q": { "exist": ["3ds_session_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "payments" }, { "lit": "3ds-sessions" }, { "var": "3ds_session_id" }, { "lit": "messages" }], "t": { "req": "`reqdata`", "res": "`body.messages`" }, "index$": 0 }], "key$": "list" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /payments/acquirers/{acquirer_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "acquirer_id", "or": "acquirer_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/payments/acquirers/{acquirer_id}", "q": { "exist": ["acquirer_id"] }, "r": {}, "s": [{ "lit": "payments" }, { "lit": "acquirers" }, { "var": "acquirer_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /payments/cards/{card_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "card_id", "or": "card_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/payments/cards/{card_id}", "q": { "exist": ["card_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "payments" }, { "lit": "cards" }, { "var": "card_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "DELETE /payments/merchants/{merchant_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "merchant_id", "or": "merchant_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/payments/merchants/{merchant_id}", "q": { "exist": ["merchant_id"] }, "r": {}, "s": [{ "lit": "payments" }, { "lit": "merchants" }, { "var": "merchant_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "DELETE /payments/network-tokens/{network_token_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "network_token_id", "or": "network_token_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/payments/network-tokens/{network_token_id}", "q": { "exist": ["network_token_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "payments" }, { "lit": "network-tokens" }, { "var": "network_token_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.acquirer"], ["$.main.kit.entity.card"], ["$.main.kit.entity.merchant"], ["$.main.kit.entity.network_token"]] }, "key$": "payment", "name__orig": "payment", "Name": "Payment", "name_": "payment", "name-": "payment", "NAME": "PAYMENT", "index$": 11 }, { "active": true, "entity": "payment", "key$": "BasicPaymentFlow", "kind": "basic", "name": "BasicPaymentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "3ds_session_id": "3ds_session01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "payment_ref01" } }], "index$": 0 }] }, 'Payment', { "GET /payments/3ds-sessions/{3ds_session_id}/messages": { "protocol": "http", "parameters": [{ "name": "3ds_session_id", "in": "path", "description": "The id of the 3DS session", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /payments/acquirers/{acquirer_id}": { "protocol": "http", "parameters": [{ "name": "acquirer_id", "in": "path", "description": "The id of the Acquirer to be deleted.", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /payments/cards/{card_id}": { "protocol": "http", "parameters": [{ "name": "card_id", "in": "path", "description": "The unique identifier of the Card.", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /payments/merchants/{merchant_id}": { "protocol": "http", "parameters": [{ "name": "merchant_id", "in": "path", "description": "The id of the Merchant to be deleted.", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /payments/network-tokens/{network_token_id}": { "protocol": "http", "parameters": [{ "name": "network_token_id", "in": "path", "description": "The unique identifier of the Network Token.", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let payment_ref01_data = Object.values(setup.data.existing.payment)[0];
        // LIST
        const payment_ref01_ent = client.Payment();
        const payment_ref01_match = {};
        payment_ref01_match['3ds_session_id'] = setup.idmap['3ds_session01'];
        const payment_ref01_list = (await payment_ref01_ent.list(payment_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/payment/PaymentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EvervaultSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['payment01', 'payment02', 'payment03', 'acquirer01', 'acquirer02', 'acquirer03', 'card01', 'card02', 'card03', 'merchant01', 'merchant02', 'merchant03', 'network_token01', 'network_token02', 'network_token03', '3ds_session01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EVERVAULT_TEST_PAYMENT_ENTID': idmap,
        'EVERVAULT_TEST_LIVE': 'FALSE',
        'EVERVAULT_TEST_EXPLAIN': 'FALSE',
        'EVERVAULT_APIKEY': '',
        'EVERVAULT_SECRET': '',
    });
    idmap = env['EVERVAULT_TEST_PAYMENT_ENTID'];
    const live = 'TRUE' === env.EVERVAULT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EVERVAULT_TEST_PAYMENT_ENTID'];
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
//# sourceMappingURL=PaymentEntity.test.js.map