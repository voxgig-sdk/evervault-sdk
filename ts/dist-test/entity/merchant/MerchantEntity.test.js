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
(0, node_test_1.describe)('MerchantEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EVERVAULT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EvervaultSDK.test();
        const ent = testsdk.Merchant();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('merchant hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.EvervaultSDK.test(offline).Merchant().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.EvervaultSDK.test(offline).Merchant()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.EvervaultSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Merchant().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.EvervaultSDK.test().Merchant().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.EvervaultSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Merchant().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Merchant().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.EvervaultSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Merchant().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'merchant.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "applePay": { "a": true, "h": "Apple Pay", "n": "applePay", "r": false, "sh": "The Merchant's Apple Pay configuration.", "t": "`$OBJECT`", "key$": "applePay", "index$": 0 }, "business": { "a": true, "h": "Business", "n": "business", "r": false, "sh": "The business details of the Merchant.", "t": "`$OBJECT`", "key$": "business", "index$": 1 }, "categoryCode": { "a": true, "h": "Category Code", "n": "categoryCode", "r": false, "sh": "The 4-digit Merchant Category Code (MCC).", "t": "`$STRING`", "key$": "categoryCode", "index$": 2 }, "createdAt": { "a": true, "fo": "int64", "h": "Created At", "n": "createdAt", "r": true, "sh": "The exact time, in epoch milliseconds, when this Merchant was created.", "t": "`$INTEGER`", "key$": "createdAt", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "A unique identifier assigned to each Merchant.", "t": "`$STRING`", "key$": "id", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "The official name of the Merchant as recognized in transactions and communications.", "t": "`$STRING`", "key$": "name", "index$": 5 }, "networkTokens": { "a": true, "h": "Network Tokens", "n": "networkTokens", "r": false, "sh": "The Merchant's Network Token configuration.", "t": "`$OBJECT`", "key$": "networkTokens", "index$": 6 }, "shortName": { "a": true, "h": "Short Name", "n": "shortName", "r": false, "sh": "A shorter version of the Merchant's name.", "t": "`$STRING`", "key$": "shortName", "index$": 7 }, "updatedAt": { "a": true, "fo": "int64", "h": "Updated At", "n": "updatedAt", "r": false, "sh": "The exact time, in epoch milliseconds, when this Merchant was last updated.", "t": "`$INTEGER`", "key$": "updatedAt", "index$": 8 }, "website": { "a": true, "h": "Website", "n": "website", "r": true, "sh": "The official website URL of the Merchant.", "t": "`$STRING`", "key$": "website", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "merchant", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["applePay", "business", "categoryCode", "name", "networkTokens", "shortName", "website"], "co": { "id": "POST /payments/merchants", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/payments/merchants", "q": { "$action": "merchant" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "payments" }, { "lit": "merchants" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /payments/merchants", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 0, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 50, "k": "query", "n": "page_size", "or": "pageSize", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "q", "or": "q", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/payments/merchants", "q": { "$action": "merchant" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "payments" }, { "lit": "merchants" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /payments/merchants/{merchant_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "merchant_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/payments/merchants/{merchant_id}", "q": { "exist": ["id"] }, "r": { "param": { "merchant_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "payments" }, { "lit": "merchants" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["applePay", "shortName"], "co": { "id": "PATCH /payments/merchants/{merchant_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "merchant_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/payments/merchants/{merchant_id}", "q": { "exist": ["id"] }, "r": { "param": { "merchant_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "payments" }, { "lit": "merchants" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "merchant", "name__orig": "merchant", "Name": "Merchant", "name_": "merchant", "name-": "merchant", "NAME": "MERCHANT", "index$": 8 }, { "active": true, "entity": "merchant", "key$": "BasicMerchantFlow", "kind": "basic", "name": "BasicMerchantFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "merchant_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "merchant_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "merchant_ref01", "srcdatavar": "merchant_ref01_data", "suffix": "_up0", "textfield": "categoryCode" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-merchant_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "merchant_ref01", "srcdatavar": "merchant_ref01_data", "suffix": "_dt0" }, "m": { "id": "merchant01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-merchant_ref01" } }], "index$": 3 }] }, 'Merchant', { "POST /payments/merchants": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "description": "The official name of the Merchant as recognized in transactions and communications. This name is used for display purposes and may be the company's trade name or a derived nickname.", "pattern": "^[a-zA-Z0-9 ]{1,60}$", "example": "Acme" }, "shortName": { "type": "string", "description": "A shorter version of the Merchant's name. Optional. When creating a 3D Secure session that references this Merchant by ID, `shortName` is used in place of `name` if `name` exceeds the 40-character limit imposed by the 3D Secure specification.\n", "pattern": "^[a-zA-Z0-9 ]{1,40}$", "example": "Acme" }, "website": { "type": "string", "description": "The official website URL of the Merchant. The domain must use a valid IANA top-level domain. See https://data.iana.org/TLD/tlds-alpha-by-domain.txt", "example": "https://www.acme.com" }, "categoryCode": { "type": "string", "description": "The 4-digit Merchant Category Code (MCC).", "example": "5945" }, "business": { "type": "object", "description": "The business details of the Merchant.", "properties": { "legalName": { "type": "string", "description": "The legal name under which the Merchant's business is registered.", "pattern": "^[a-zA-Z0-9 ]{1,60}$", "example": "Acme Corp" }, "address": { "type": "object", "properties": { "line1": {}, "line2": {}, "city": {}, "state": {}, "postalCode": {}, "country": {} }, "required": ["line1", "city", "postalCode", "country"], "description": "The physical address of the Merchant's principal place of business.", "x-ref": "#/components/schemas/Address" } }, "required": ["legalName", "address"] }, "networkTokens": { "type": "object", "description": "The Merchant's Network Tokens configuration. This field should only be populated if the Merchant has already been enrolled in one of the Card Network programs and can use an existing Token Requestor ID (TRID).", "properties": { "enrolment": { "type": "array", "items": { "type": "object", "properties": {} } } } }, "applePay": { "type": "object", "description": "The Merchant's Apple Pay configuration.", "properties": { "domains": { "type": "array", "description": "The domains the Merchant wants registered with Apple Pay. Only the domain name is required, without the protocol or path. For example, `example.com` is a valid domain, but `https://example.com` is not.\n", "items": { "type": "string", "example": "ollivanders.co.uk" } } } } }, "required": ["name", "website", "categoryCode", "business"] }, "examples": { "SimpleExample": { "value": { "name": "Ollivanders Wand Shop", "website": "https://www.ollivanders.co.uk", "categoryCode": "5945", "business": { "legalName": "Ollivanders Wand Shop Ltd", "address": { "line1": "Diagon Alley", "city": "London", "postalCode": "WD1 1AA", "country": "gb" } }, "applePay": { "domains": ["ollivanders.co.uk"] } } } } } } }, "parameters": [] }, "GET /payments/merchants": { "protocol": "http", "parameters": [{ "name": "page", "in": "query", "description": "The page number to retrieve.", "required": false, "schema": { "type": "integer", "default": 0 }, "index$": 0 }, { "name": "pageSize", "in": "query", "description": "The number of Merchants to retrieve per page (default is 50).", "required": false, "schema": { "type": "integer", "default": 50 }, "index$": 1 }, { "name": "q", "in": "query", "description": "Filter the Merchants by name.", "required": false, "schema": { "type": "string" }, "index$": 2 }] }, "GET /payments/merchants/{merchant_id}": { "protocol": "http", "parameters": [{ "name": "merchant_id", "in": "path", "description": "The unique identifier of the merchant.", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /payments/merchants/{merchant_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "shortName": { "type": "string", "description": "A shorter version of the Merchant's name. When creating a 3D Secure session that references this Merchant by ID, `shortName` is used in place of `name` if `name` exceeds the 40-character limit imposed by the 3D Secure specification.\n", "pattern": "^[a-zA-Z0-9 ]{1,40}$", "example": "Acme", "key$": "shortName" }, "applePay": { "type": "object", "description": "The Merchant's Apple Pay configuration.", "properties": { "domains": { "type": "array", "description": "The domains the Merchant wants registered with Apple Pay. To remove a domain previously registered with Apple Pay, exclude it from the list. Only the domain name is required, without the protocol or path. For example, `example.com` is a valid domain, but `https://example.com` is not.\n", "items": { "type": "string", "example": "ollivanders.co.uk" } } }, "key$": "applePay" } }, "index$": 1 }, "examples": { "SimpleExample": { "value": { "shortName": "Ollivanders", "applePay": { "domains": ["ollivanders.co.uk"] } } } } } } }, "parameters": [{ "name": "merchant_id", "in": "path", "description": "The id of the Merchant to be updated.", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const merchant_ref01_ent = client.Merchant();
        let merchant_ref01_data = setup.data.new.merchant['merchant_ref01'];
        merchant_ref01_data = (await merchant_ref01_ent.create(merchant_ref01_data)).data();
        (0, node_assert_1.default)(null != merchant_ref01_data.id);
        // LIST
        const merchant_ref01_match = {};
        const merchant_ref01_list = (await merchant_ref01_ent.list(merchant_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(merchant_ref01_list, { id: merchant_ref01_data.id })));
        // UPDATE
        const merchant_ref01_data_up0 = {};
        merchant_ref01_data_up0.id = merchant_ref01_data.id;
        const merchant_ref01_markdef_up0 = { name: 'categoryCode', value: 'Mark01-merchant_ref01_' + setup.now };
        merchant_ref01_data_up0[merchant_ref01_markdef_up0.name] = merchant_ref01_markdef_up0.value;
        const merchant_ref01_resdata_up0 = (await merchant_ref01_ent.update(merchant_ref01_data_up0)).data();
        (0, node_assert_1.default)(merchant_ref01_resdata_up0.id === merchant_ref01_data_up0.id);
        (0, node_assert_1.default)(merchant_ref01_resdata_up0[merchant_ref01_markdef_up0.name] === merchant_ref01_markdef_up0.value);
        // LOAD
        const merchant_ref01_match_dt0 = {};
        merchant_ref01_match_dt0.id = merchant_ref01_data.id;
        const merchant_ref01_data_dt0 = (await merchant_ref01_ent.load(merchant_ref01_match_dt0)).data();
        (0, node_assert_1.default)(merchant_ref01_data_dt0.id === merchant_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/merchant/MerchantTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EvervaultSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['merchant01', 'merchant02', 'merchant03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EVERVAULT_TEST_MERCHANT_ENTID': idmap,
        'EVERVAULT_TEST_LIVE': 'FALSE',
        'EVERVAULT_TEST_EXPLAIN': 'FALSE',
        'EVERVAULT_APIKEY': '',
        'EVERVAULT_SECRET': '',
    });
    idmap = env['EVERVAULT_TEST_MERCHANT_ENTID'];
    const live = 'TRUE' === env.EVERVAULT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EVERVAULT_TEST_MERCHANT_ENTID'];
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
//# sourceMappingURL=MerchantEntity.test.js.map