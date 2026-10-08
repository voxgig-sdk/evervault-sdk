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
(0, node_test_1.describe)('CoreEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EVERVAULT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EvervaultSDK.test();
        const ent = testsdk.Core();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.EvervaultSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Core().list({ "relay_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE;
        for (const op of ['create', 'list', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'core.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "category": { "a": true, "h": "Category", "n": "category", "r": false, "sh": "The category or specific nature of the encrypted value.", "t": "`$STRING`", "key$": "category", "index$": 0 }, "core_list": { "a": true, "h": "Core List", "n": "core_list", "r": false, "sh": "A JSON value or file to be encrypted.", "t": ["`$ONE`", ["`$OBJECT`", "`$ARRAY`", "`$STRING`", "`$NUMBER`", "`$BOOLEAN`"]], "key$": "core_list", "index$": 1 }, "cores": { "a": true, "h": "Cores", "n": "cores", "r": false, "sh": "A JSON value or file to be decrypted.", "t": ["`$ONE`", ["`$OBJECT`", "`$ARRAY`", "`$STRING`"]], "key$": "cores", "index$": 2 }, "createdAt": { "a": true, "fo": "int64", "h": "Created At", "n": "createdAt", "r": false, "sh": "The exact time, in epoch milliseconds, when this custom domain was created.", "t": "`$INTEGER`", "key$": "createdAt", "index$": 3 }, "customDomain": { "a": true, "h": "Custom Domain", "n": "customDomain", "r": false, "sh": "The customer managed domain to which requests to be relayed to your domain should be sent.", "t": "`$STRING`", "key$": "customDomain", "index$": 4 }, "encryptedAt": { "a": true, "h": "Encrypted At", "n": "encryptedAt", "r": false, "sh": "The date and time when the value was encrypted.", "t": "`$INTEGER`", "key$": "encryptedAt", "index$": 5 }, "fingerprint": { "a": true, "h": "Fingerprint", "n": "fingerprint", "r": false, "sh": "A unique identifier for the encrypted value.", "t": "`$STRING`", "key$": "fingerprint", "index$": 6 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "The unique identifier for the custom domain.", "t": "`$STRING`", "key$": "id", "index$": 7 }, "metadata": { "a": true, "h": "Metadata", "n": "metadata", "r": false, "sh": "Further metadata about the encrypted value.", "t": "`$ANY`", "key$": "metadata", "index$": 8 }, "phoneNumber": { "a": true, "h": "Phone Number", "n": "phoneNumber", "r": false, "t": "`$STRING`", "key$": "phoneNumber", "index$": 9 }, "relay": { "a": true, "h": "Relay", "n": "relay", "r": false, "sh": "The ID of the Relay with which this custom domain is associated.", "t": "`$STRING`", "key$": "relay", "index$": 10 }, "role": { "a": true, "h": "Role", "n": "role", "r": false, "sh": "The data role of the encrypted value.", "t": "`$STRING`", "key$": "role", "index$": 11 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "The status of the domains DNS verification.", "t": "`$STRING`", "key$": "status", "index$": 12 }, "token": { "a": true, "h": "Token", "n": "token", "r": true, "sh": "The encrypted data to be inspected.", "t": "`$STRING`", "key$": "token", "index$": 13 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "The type of the encrypted value.", "t": "`$STRING`", "key$": "type", "index$": 14 }, "updatedAt": { "a": true, "fo": "int64", "h": "Updated At", "n": "updatedAt", "r": false, "sh": "The exact time, in epoch milliseconds, when this custom domain was last updated.", "t": "`$INTEGER`", "key$": "updatedAt", "index$": 15 }, "validationRecord": { "a": true, "fo": "uuidv4", "h": "Validation Record", "n": "validationRecord", "r": false, "sh": "Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain", "t": "`$STRING`", "key$": "validationRecord", "index$": 16 } }, "id": { "field": "id", "name": "id" }, "name": "core", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["cores"], "co": { "id": "POST /decrypt", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/decrypt", "q": {}, "r": {}, "rb": { "alternatives": [{ "binary": true, "kind": "raw", "media": "application/octet-stream" }], "kind": "json", "media": "application/json" }, "rs": { "alternatives": [{ "binary": true, "kind": "raw", "media": "application/octet-stream" }], "kind": "json", "media": "application/json" }, "s": [{ "lit": "decrypt" }], "t": { "req": "`reqdata.cores`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["core_list"], "co": { "id": "POST /encrypt", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/encrypt", "q": {}, "r": {}, "rb": { "alternatives": [{ "binary": true, "kind": "raw", "media": "application/octet-stream" }], "kind": "json", "media": "application/json" }, "rs": { "alternatives": [{ "binary": true, "kind": "raw", "media": "application/octet-stream" }], "kind": "json", "media": "application/json" }, "s": [{ "lit": "encrypt" }], "t": { "req": "`reqdata.core_list`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["token"], "co": { "id": "POST /inspect", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/inspect", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "inspect" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /relays/{relay_id}/custom-domains", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "relay_id", "or": "relay_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/relays/{relay_id}/custom-domains", "q": { "exist": ["relay_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "relays" }, { "var": "relay_id" }, { "lit": "custom-domains" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /relays/{relay_id}/custom-domains/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "relay_id", "or": "relay_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/relays/{relay_id}/custom-domains/{id}", "q": { "exist": ["id", "relay_id"] }, "r": {}, "s": [{ "lit": "relays" }, { "var": "relay_id" }, { "lit": "custom-domains" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /relays/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/relays/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "relays" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.relay"]] }, "key$": "core", "name__orig": "core", "Name": "Core", "name_": "core", "name-": "core", "NAME": "CORE", "index$": 5 }, { "active": true, "entity": "core", "key$": "BasicCoreFlow", "kind": "basic", "name": "BasicCoreFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "core_ref01" }, "m": { "relay_id": "relay01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "relay_id": "relay01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "core_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "core_ref01", "suffix": "_rm0" }, "m": { "id": "core01" }, "o": "remove", "s": [], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "relay_id": "relay01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "core_ref01" } }], "index$": 3 }] }, 'Core', { "POST /decrypt": { "protocol": "http", "requestBody": { "description": "A JSON value or file to be decrypted. This can be any valid JSON\nvalue: Objects, Arrays, Numbers, Boolean or Strings (strings should\nbe enclosed in double quotes).\n", "x-content": "A JSON value or file to be decrypted. This can be any valid JSON\nvalue: Objects, Arrays, Numbers, Boolean or Strings (strings should\nbe enclosed in double quotes).\n", "content": { "application/json": { "schema": { "type": ["object", "array", "string"], "description": "The JSON value to be decrypted. This can be any valid JSON value: Dictionaries, Arrays or Strings (strings should be enclosed in double quotes). Non-encrypted values are returned unaltered.", "index$": 1 }, "examples": { "Object": { "value": { "phoneNumber": "ev:debug:Tk9D:cvuknWyEBK9VT1Dv:AzyAK0mI+KP8PU5SqjRHqVSXxTkWUDwotj7qht9/Y8X6:5azjL53LkeIMdfwp4zJoApNpWJ2hJ8NKhSF5OdGejexerv8Pz7i7WDo=:$" } }, "String": { "value": "ev:debug:Tk9D:cvuknWyEBK9VT1Dv:AzyAK0mI+KP8PU5SqjRHqVSXxTkWUDwotj7qht9/Y8X6:5azjL53LkeIMdfwp4zJoApNpWJ2hJ8NKhSF5OdGejexerv8Pz7i7WDo=:$" }, "Number": { "value": "ev:debug:Tk9D:cvuknWyEBK9VT1Dv:AzyAK0mI+KP8PU5SqjRHqVSXxTkWUDwotj7qht9/Y8X6:5azjL53LkeIMdfwp4zJoApNpWJ2hJ8NKhSF5OdGejexerv8Pz7i7WDo=:$" }, "Boolean": { "value": "ev:debug:Tk9D:cvuknWyEBK9VT1Dv:AzyAK0mI+KP8PU5SqjRHqVSXxTkWUDwotj7qht9/Y8X6:5azjL53LkeIMdfwp4zJoApNpWJ2hJ8NKhSF5OdGejexerv8Pz7i7WDo=:$" }, "Array": { "value": ["ev:debug:Tk9D:cvuknWyEBK9VT1Dv:AzyAK0mI+KP8PU5SqjRHqVSXxTkWUDwotj7qht9/Y8X6:5azjL53LkeIMdfwp4zJoApNpWJ2hJ8NKhSF5OdGejexerv8Pz7i7WDo=:$", "ev:debug:Tk9D:number:VgghOI6CiNwopB5a:A36bghlqi552fAQe+FIGm6xQOTDXqT7aZ6Y8T8BL78OM:IQE9kOqjWNZ224RW2/aTVsohXsA=:$", "ev:debug:Tk9D:boolean:tJhxI4I9P2hZTask:AllHDCO297G2syVEbbsyoxOJI9XhgMGDDMaZYiq1H3w9:cvAGst7Y3/4aiS4xg9r/i4z5Vkg=:$", ["ev:debug:Tk9D:cvuknWyEBK9VT1Dv:AzyAK0mI+KP8PU5SqjRHqVSXxTkWUDwotj7qht9/Y8X6:5azjL53LkeIMdfwp4zJoApNpWJ2hJ8NKhSF5OdGejexerv8Pz7i7WDo=:$"], { "phoneNumber": "ev:debug:Tk9D:cvuknWyEBK9VT1Dv:AzyAK0mI+KP8PU5SqjRHqVSXxTkWUDwotj7qht9/Y8X6:5azjL53LkeIMdfwp4zJoApNpWJ2hJ8NKhSF5OdGejexerv8Pz7i7WDo=:$" }] } } }, "application/octet-stream": { "schema": { "type": "string", "format": "binary", "description": "Decrypts a file/bytes." } } } }, "parameters": [] }, "POST /encrypt": { "protocol": "http", "requestBody": { "description": "A JSON value or file to be encrypted. This can be any valid JSON\nvalue: Objects, Arrays, Numbers, Boolean or Strings (strings should\nbe enclosed in double quotes).\n", "x-content": "A JSON value or file to be encrypted. This can be any valid JSON\nvalue: Objects, Arrays, Numbers, Boolean or Strings (strings should\nbe enclosed in double quotes).\n", "content": { "application/json": { "schema": { "type": ["object", "array", "string", "number", "boolean"], "description": "The JSON value to be encrypted. This can be any valid JSON value: Dictionaries, Arrays, Numbers, Boolean or Strings (strings should be enclosed in double quotes).", "index$": 1 }, "examples": { "Object": { "value": { "phoneNumber": "555-2368" } }, "String": { "value": "555-2368" }, "Number": { "value": 17185550123 }, "Boolean": { "value": true }, "Array": { "value": ["555-2368", 1138, true, ["555-2368"], { "phoneNumber": "555-2368" }] } } }, "application/octet-stream": { "schema": { "type": "string", "format": "binary", "description": "Encrypts a file/bytes." } } } }, "parameters": [] }, "POST /inspect": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "token": { "type": "string", "description": "The encrypted data to be inspected.", "example": "ev:debug:Tk9D:HBpzdbFWXbX/N2cC:AyjMY/SKO49SlkXcDPtCGs+DxnUn/F8/lAtajCYZ/xT7:KV7AUn9vJJkZDtL8PKdOc8Y11yTL2vZQasFuHqM=:$", "key$": "token" } }, "required": ["token"], "index$": 1 }, "examples": { "Object": { "value": { "token": "ev:debug:Tk9D:HBpzdbFWXbX/N2cC:AyjMY/SKO49SlkXcDPtCGs+DxnUn/F8/lAtajCYZ/xT7:KV7AUn9vJJkZDtL8PKdOc8Y11yTL2vZQasFuHqM=:$" } } } } } }, "parameters": [] }, "GET /relays/{relay_id}/custom-domains": { "protocol": "http", "parameters": [{ "name": "relay_id", "in": "path", "description": "The id of the Relay whose custom domains should be fetched.", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /relays/{relay_id}/custom-domains/{id}": { "protocol": "http", "parameters": [{ "name": "relay_id", "in": "path", "description": "The id of the Relay to which the custom domain belongs.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "description": "The id of the custom domain to be deleted.", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /relays/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "description": "The id of the Relay to be deleted.", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const core_ref01_ent = client.Core();
        let core_ref01_data = setup.data.new.core['core_ref01'];
        core_ref01_data['relay_id'] = setup.idmap['relay01'];
        core_ref01_data = (await core_ref01_ent.create(core_ref01_data)).data();
        (0, node_assert_1.default)(null != core_ref01_data.id);
        // LIST
        const core_ref01_match = {};
        core_ref01_match['relay_id'] = setup.idmap['relay01'];
        const core_ref01_list = (await core_ref01_ent.list(core_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(core_ref01_list, { id: core_ref01_data.id })));
        // REMOVE
        const core_ref01_match_rm0 = { id: core_ref01_data.id };
        await core_ref01_ent.remove(core_ref01_match_rm0);
        // LIST
        const core_ref01_match_rt0 = {};
        core_ref01_match_rt0['relay_id'] = setup.idmap['relay01'];
        const core_ref01_list_rt0 = (await core_ref01_ent.list(core_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(core_ref01_list_rt0, { id: core_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/core/CoreTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EvervaultSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['core01', 'core02', 'core03', 'relay01', 'relay02', 'relay03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EVERVAULT_TEST_CORE_ENTID': idmap,
        'EVERVAULT_TEST_LIVE': 'FALSE',
        'EVERVAULT_TEST_EXPLAIN': 'FALSE',
        'EVERVAULT_APIKEY': '',
        'EVERVAULT_SECRET': '',
    });
    idmap = env['EVERVAULT_TEST_CORE_ENTID'];
    const live = 'TRUE' === env.EVERVAULT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EVERVAULT_TEST_CORE_ENTID'];
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
//# sourceMappingURL=CoreEntity.test.js.map