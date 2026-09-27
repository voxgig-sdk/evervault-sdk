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
(0, node_test_1.describe)('CardEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EVERVAULT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EvervaultSDK.test();
        const ent = testsdk.Card();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'card.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "address": { "a": true, "h": "Address", "n": "address", "r": true, "sh": "Details about the cardholder's address that the address verification (AVS) is for.", "t": "`$OBJECT`", "key$": "address", "index$": 0 }, "card": { "a": true, "h": "Card", "n": "card", "r": true, "sh": "The card details.", "t": "`$OBJECT`", "key$": "card", "index$": 1 }, "cardholder": { "a": true, "h": "Cardholder", "n": "cardholder", "r": false, "sh": "Details about the cardholder that the name verification (ANI) is for.", "t": "`$OBJECT`", "key$": "cardholder", "index$": 2 }, "expiry": { "a": true, "h": "Expiry", "n": "expiry", "r": true, "t": "`$OBJECT`", "key$": "expiry", "index$": 3 }, "extensions": { "a": true, "h": "Extensions", "n": "extensions", "r": false, "sh": "The extensions to the card insight request.", "t": "`$ARRAY`", "key$": "extensions", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 5 }, "month": { "a": true, "h": "Month", "n": "month", "r": true, "sh": "The card expiry month, in MM format (e.g.", "t": "`$STRING`", "key$": "month", "index$": 6 }, "number": { "a": true, "h": "Number", "n": "number", "r": true, "sh": "The card number.", "t": "`$STRING`", "key$": "number", "index$": 7 }, "year": { "a": true, "h": "Year", "n": "year", "r": true, "sh": "The card expiry year, in YY format (e.g.", "t": "`$STRING`", "key$": "year", "index$": 8 } }, "id": { "field": "id", "name": "id" }, "name": "card", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /payments/cards/{card_id}/simulate", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "card_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/payments/cards/{card_id}/simulate", "q": { "$action": "simulate", "exist": ["id"] }, "r": { "param": { "card_id": "id" } }, "s": [{ "lit": "payments" }, { "lit": "cards" }, { "var": "id" }, { "lit": "simulate" }], "t": { "req": "`reqdata`", "res": "`body.expiry`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /insights/cards", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/insights/cards", "q": {}, "r": {}, "s": [{ "lit": "insights" }, { "lit": "cards" }], "t": { "req": { "card": "`reqdata`" }, "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /payments/cards", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/payments/cards", "q": {}, "r": {}, "s": [{ "lit": "payments" }, { "lit": "cards" }], "t": { "req": "`reqdata`", "res": "`body.expiry`" }, "index$": 2 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /payments/cards/{card_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "card_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/payments/cards/{card_id}", "q": { "exist": ["id"] }, "r": { "param": { "card_id": "id" } }, "s": [{ "lit": "payments" }, { "lit": "cards" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.expiry`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "card", "name__orig": "card", "Name": "Card", "name_": "card", "name-": "card", "NAME": "CARD", "index$": 2 }, { "active": true, "entity": "card", "key$": "BasicCardFlow", "kind": "basic", "name": "BasicCardFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "card_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "card_ref01", "srcdatavar": "card_ref01_data", "suffix": "_dt0" }, "m": { "id": "card01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-card_ref01" } }], "index$": 1 }] }, 'Card', { "POST /payments/cards/{card_id}/simulate": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "description": "The request body for simulating a card update differs depending on the type of event you want to simulate.", "oneOf": [{ "type": "object", "description": "New account number", "properties": { "updateType": { "type": "string", "description": "The type of update to simulate.", "enum": ["new-account-number"] }, "expiry": { "type": "object", "properties": { "month": {}, "year": {} }, "required": ["month", "year"], "x-ref": "#/components/schemas/CardExpiry" }, "number": { "type": "string", "description": "The card number. Can be clear-text or an Evervault encrypted string.", "example": "4242424242424242" } }, "required": ["updateType"], "x-ref": "#/components/schemas/CauNanUpdate" }, { "type": "object", "description": "New expiry date", "properties": { "updateType": { "type": "string", "description": "The type of update to simulate.", "enum": ["new-expiry-date"] }, "expiry": { "type": "object", "properties": { "month": {}, "year": {} }, "required": ["month", "year"], "x-ref": "#/components/schemas/CardExpiry" } }, "required": ["updateType"], "x-ref": "#/components/schemas/CauNedUpdate" }, { "type": "object", "description": "Account closure", "properties": { "updateType": { "type": "string", "description": "The type of update to simulate.", "enum": ["account-closure"] } }, "required": ["updateType"], "x-ref": "#/components/schemas/CauAclUpdate" }] }, "examples": { "NewAccountNumberExample": { "value": { "updateType": "new-account-number", "number": "4242424242424242", "expiry": { "month": "09", "year": "26" } } }, "NewExpiryDateExample": { "value": { "updateType": "new-expiry-date", "expiry": { "month": "09", "year": "26" } } }, "AccountClosureExample": { "value": { "updateType": "account-closure" } } } } } }, "parameters": [{ "name": "card_id", "in": "path", "description": "The id of the Card", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /insights/cards": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "card": { "type": "object", "description": "The card details.", "properties": { "number": { "type": "string", "description": "The card number. This should be a valid Evervault encrypted card number or a valid plaintext card number.", "example": "4111111111111111" }, "expiry": { "type": "object", "description": "The card expiry. Required if the `address`, `cardholder`, or `cvv` extensions are requested.", "properties": { "month": {}, "year": {} } }, "cvv": { "type": "string", "description": "The card security code. This should be a valid Evervault encrypted CVV or a valid plaintext CVV. Required if the `cvv` extension is requested.", "example": "123" } }, "required": ["number"], "key$": "card" }, "extensions": { "type": "array", "description": "The extensions to the card insight request.", "items": { "type": "string", "description": "The extensions", "enum": ["capabilities", "cvv", "cardholder", "address"], "x-enum-description": { "capabilities": "Check the card's push and pull transaction capabilities", "cvv": "Check the card's CVV verification", "cardholder": "Check the cardholder's name verification", "address": "Check the cardholder's address verification" } }, "key$": "extensions" }, "cardholder": { "type": "object", "description": "Details about the cardholder that the name verification (ANI) is for. Required if the `cardholder` extension is requested.", "properties": { "firstName": { "type": "string", "description": "The first name of the cardholder", "example": "John" }, "lastName": { "type": "string", "description": "The last name of the cardholder", "example": "Doe" } }, "key$": "cardholder" }, "address": { "type": "object", "description": "Details about the cardholder's address that the address verification (AVS) is for. Required if the `address` extension is requested.", "properties": { "postalCode": { "type": "string", "description": "The ZIP or postal code.", "example": "10001" }, "line1": { "type": "string", "description": "Street address line 1", "example": "123 Main Street" }, "line2": { "type": "string", "description": "Street address line 2", "example": "Apt 4B" }, "city": { "type": "string", "description": "The city name", "example": "New York" }, "state": { "type": "string", "description": "The state or province code. Required when `country` is `us`, `ca`, or `au`.", "format": "iso-3166-2-subdivision", "example": "ny" }, "country": { "type": "string", "description": "The country code.", "format": "iso-3166-1-alpha-2", "example": "us" } }, "required": ["postalCode"], "key$": "address" } }, "required": ["card"], "index$": 1 }, "examples": { "SimpleExample": { "value": { "card": { "number": "4111111111111111", "expiry": { "month": "09", "year": "29" }, "cvv": "123" }, "extensions": ["capabilities", "cvv", "address", "cardholder"], "cardholder": { "firstName": "John", "lastName": "Doe" }, "address": { "postalCode": "10001", "line1": "123 Main Street", "line2": "Apt 4B", "city": "New York", "state": "ny", "country": "us" } } } } } } }, "parameters": [] }, "POST /payments/cards": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "number": { "type": "string", "description": "The card number. This should be a valid Evervault encrypted card number or a valid plaintext card number.", "example": "4242424242424242", "key$": "number" }, "expiry": { "type": "object", "properties": { "month": { "type": "string", "description": "The card expiry month, in MM format (e.g. 12 for December)", "example": "09", "key$": "month" }, "year": { "type": "string", "description": "The card expiry year, in YY format (e.g. 26 for 2026)", "example": "26", "key$": "year" } }, "required": ["month", "year"], "x-ref": "#/components/schemas/CardExpiry", "key$": "expiry" } }, "required": ["number", "expiry"], "index$": 1 }, "examples": { "EvervaultEncryptedExample": { "value": { "number": "ev:debug:Tk9D:number:nTepvAI585M7lUVp:AkJ6Brzat0E7ui8DSKCSXO7AopU/+GFuBekQ6cGx7eTl:sfihK53itmHp+URxomnTITUpwQwM5nnRrnQ0qdIOUlA=:$", "expiry": { "month": "09", "year": "26" } } }, "PlaintextCardExample": { "value": { "number": "4242424242424242", "expiry": { "month": "09", "year": "26" } } } } } } }, "parameters": [] }, "GET /payments/cards/{card_id}": { "protocol": "http", "parameters": [{ "name": "card_id", "in": "path", "description": "The unique identifier of the Card.", "required": true, "schema": { "type": "string" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const card_ref01_ent = client.Card();
        let card_ref01_data = setup.data.new.card['card_ref01'];
        card_ref01_data = (await card_ref01_ent.create(card_ref01_data)).data();
        (0, node_assert_1.default)(null != card_ref01_data.id);
        // LOAD
        const card_ref01_match_dt0 = {};
        card_ref01_match_dt0.id = card_ref01_data.id;
        const card_ref01_data_dt0 = (await card_ref01_ent.load(card_ref01_match_dt0)).data();
        (0, node_assert_1.default)(card_ref01_data_dt0.id === card_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/card/CardTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EvervaultSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['card01', 'card02', 'card03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EVERVAULT_TEST_CARD_ENTID': idmap,
        'EVERVAULT_TEST_LIVE': 'FALSE',
        'EVERVAULT_TEST_EXPLAIN': 'FALSE',
        'EVERVAULT_APIKEY': '',
        'EVERVAULT_SECRET': '',
    });
    idmap = env['EVERVAULT_TEST_CARD_ENTID'];
    const live = 'TRUE' === env.EVERVAULT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EVERVAULT_TEST_CARD_ENTID'];
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
//# sourceMappingURL=CardEntity.test.js.map