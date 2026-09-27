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
(0, node_test_1.describe)('NetworkTokenEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EVERVAULT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EvervaultSDK.test();
        const ent = testsdk.NetworkToken();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'network_token.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "card": { "a": true, "h": "Card", "n": "card", "r": true, "sh": "The details of the underlying encrypted card.", "t": "`$OBJECT`", "key$": "card", "index$": 0 }, "createdAt": { "a": true, "fo": "int64", "h": "Created At", "n": "createdAt", "r": true, "sh": "The exact time, in epoch milliseconds, when this Network Token was created.", "t": "`$INTEGER`", "key$": "createdAt", "index$": 1 }, "expiry": { "a": true, "h": "Expiry", "n": "expiry", "r": true, "sh": "The expiry details of the Network Token.", "t": "`$OBJECT`", "key$": "expiry", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "A unique identifier representing a specific Network Token.", "t": "`$STRING`", "key$": "id", "index$": 3 }, "merchant": { "a": true, "h": "Merchant", "n": "merchant", "r": true, "sh": "The unique identifier of the Merchant associated with this Network Token.", "t": "`$STRING`", "key$": "merchant", "index$": 4 }, "number": { "a": true, "h": "Number", "n": "number", "r": true, "sh": "The unique number of the Network Token.", "t": "`$STRING`", "key$": "number", "index$": 5 }, "paymentAccountReference": { "a": true, "h": "Payment Account Reference", "n": "paymentAccountReference", "r": false, "sh": "The unique identifier of the Payment Account associated with this Network Token.", "t": "`$STRING`", "key$": "paymentAccountReference", "index$": 6 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "sh": "The status of the Network Token.", "t": "`$STRING`", "key$": "status", "index$": 7 }, "tokenRequestorIdentifier": { "a": true, "h": "Token Requestor Identifier", "n": "tokenRequestorIdentifier", "r": true, "sh": "The identifier of the Token Requestor (TRID) that requested the Network Token.", "t": "`$STRING`", "key$": "tokenRequestorIdentifier", "index$": 8 }, "tokenServiceProvider": { "a": true, "h": "Token Service Provider", "n": "tokenServiceProvider", "r": true, "sh": "The Token Service Provider (TSP) that issued the Network Token.", "t": "`$STRING`", "key$": "tokenServiceProvider", "index$": 9 }, "updatedAt": { "a": true, "fo": "int64", "h": "Updated At", "n": "updatedAt", "r": false, "sh": "The exact time, in epoch milliseconds, when this Network Token was last updated.", "t": "`$INTEGER`", "key$": "updatedAt", "index$": 10 } }, "id": { "field": "id", "name": "id" }, "name": "network_token", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /payments/network-tokens/{network_token_id}/simulate", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "network_token_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/payments/network-tokens/{network_token_id}/simulate", "q": { "$action": "simulate", "exist": ["id"] }, "r": { "param": { "network_token_id": "id" } }, "s": [{ "lit": "payments" }, { "lit": "network-tokens" }, { "var": "id" }, { "lit": "simulate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /payments/network-tokens", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/payments/network-tokens", "q": {}, "r": {}, "s": [{ "lit": "payments" }, { "lit": "network-tokens" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /payments/network-tokens/{network_token_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "network_token_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/payments/network-tokens/{network_token_id}", "q": { "exist": ["id"] }, "r": { "param": { "network_token_id": "id" } }, "s": [{ "lit": "payments" }, { "lit": "network-tokens" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "network_token", "name__orig": "network_token", "Name": "NetworkToken", "name_": "network_token", "name-": "network-token", "NAME": "NETWORK_TOKEN", "index$": 9 }, { "active": true, "entity": "network_token", "key$": "BasicNetworkTokenFlow", "kind": "basic", "name": "BasicNetworkTokenFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "network_token_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "network_token_ref01", "srcdatavar": "network_token_ref01_data", "suffix": "_dt0" }, "m": { "id": "network_token01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-network_token_ref01" } }], "index$": 1 }] }, 'NetworkToken', { "POST /payments/network-tokens/{network_token_id}/simulate": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "updateType": { "type": "string", "description": "The type of update to simulate.", "enum": ["new-token-status", "new-card-expiry-and-last-four", "new-token-expiry-and-number"] } } }, "examples": { "NewTokenExpiryAndNumberExample": { "value": { "updateType": "new-token-expiry-and-number" } }, "NewCardExpiryAndLastFourExample": { "value": { "updateType": "new-card-expiry-and-last-four" } }, "NewTokenStatusExample": { "value": { "updateType": "new-token-status" } } } } } }, "parameters": [{ "name": "network_token_id", "in": "path", "description": "The id of the Network Token", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /payments/network-tokens": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "card": { "description": "The card to tokenize. Either an inline card object or the unique identifier of a Card created with the [Cards API](/api#cards).", "oneOf": [{ "type": "object", "description": "An inline card object.", "properties": { "number": {}, "expiry": {}, "cvc": {} }, "required": ["number", "expiry"] }, { "type": "string", "description": "The unique identifier of a Card created with the [Cards API](/api#cards).", "example": "card_eead1d640d7c" }], "key$": "card" }, "merchant": { "type": "string", "description": "The unique identifier of the Merchant previously created using the Evervault API. It denotes the Merchant to which the Network Token should be associated with.", "example": "merchant_ddsaJsda9d86", "key$": "merchant" } }, "required": ["card", "merchant"], "index$": 1 }, "examples": { "EvervaultEncryptedExample": { "value": { "card": { "number": "ev:debug:Tk9D:number:nTepvAI585M7lUVp:AkJ6Brzat0E7ui8DSKCSXO7AopU/+GFuBekQ6cGx7eTl:sfihK53itmHp+URxomnTITUpwQwM5nnRrnQ0qdIOUlA=:$", "expiry": { "month": "09", "year": "26" }, "cvc": "ev:debug:Tk9D:number:2GW8Nk96yfb2UXcw:A4UOUDGNb16Q//uBYVPibmfJ2734IrvPAoVY+8PvGG0C:5jtAu8KN1HiPeCNqSDCKMapfpg==:$" }, "merchant": "merchant_ddsaJsda9d86" } }, "PlaintextCardExample": { "value": { "card": { "number": "4242424242424242", "expiry": { "month": "09", "year": "26" }, "cvc": "123" }, "merchant": "merchant_ddsaJsda9d86" } } } } } }, "parameters": [] }, "GET /payments/network-tokens/{network_token_id}": { "protocol": "http", "parameters": [{ "name": "network_token_id", "in": "path", "description": "The unique identifier of the Network Token.", "required": true, "schema": { "type": "string" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const network_token_ref01_ent = client.NetworkToken();
        let network_token_ref01_data = setup.data.new.network_token['network_token_ref01'];
        network_token_ref01_data = (await network_token_ref01_ent.create(network_token_ref01_data)).data();
        (0, node_assert_1.default)(null != network_token_ref01_data.id);
        // LOAD
        const network_token_ref01_match_dt0 = {};
        network_token_ref01_match_dt0.id = network_token_ref01_data.id;
        const network_token_ref01_data_dt0 = (await network_token_ref01_ent.load(network_token_ref01_match_dt0)).data();
        (0, node_assert_1.default)(network_token_ref01_data_dt0.id === network_token_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/network_token/NetworkTokenTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EvervaultSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['network_token01', 'network_token02', 'network_token03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EVERVAULT_TEST_NETWORK_TOKEN_ENTID': idmap,
        'EVERVAULT_TEST_LIVE': 'FALSE',
        'EVERVAULT_TEST_EXPLAIN': 'FALSE',
        'EVERVAULT_APIKEY': '',
        'EVERVAULT_SECRET': '',
    });
    idmap = env['EVERVAULT_TEST_NETWORK_TOKEN_ENTID'];
    const live = 'TRUE' === env.EVERVAULT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EVERVAULT_TEST_NETWORK_TOKEN_ENTID'];
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
//# sourceMappingURL=NetworkTokenEntity.test.js.map