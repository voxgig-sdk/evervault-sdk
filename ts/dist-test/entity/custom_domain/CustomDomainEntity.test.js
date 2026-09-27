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
(0, node_test_1.describe)('CustomDomainEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EVERVAULT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EvervaultSDK.test();
        const ent = testsdk.CustomDomain();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'custom_domain.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "createdAt": { "a": true, "fo": "int64", "h": "Created At", "n": "createdAt", "r": false, "sh": "The exact time, in epoch milliseconds, when this custom domain was created.", "t": "`$INTEGER`", "key$": "createdAt", "index$": 0 }, "customDomain": { "a": true, "h": "Custom Domain", "n": "customDomain", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The customer managed domain to which requests to be relayed to your domain should be sent.", "t": "`$STRING`", "key$": "customDomain", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "The unique identifier for the custom domain.", "t": "`$STRING`", "key$": "id", "index$": 2 }, "relay": { "a": true, "h": "Relay", "n": "relay", "r": false, "sh": "The ID of the Relay with which this custom domain is associated.", "t": "`$STRING`", "key$": "relay", "index$": 3 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "The status of the domains DNS verification.", "t": "`$STRING`", "key$": "status", "index$": 4 }, "updatedAt": { "a": true, "fo": "int64", "h": "Updated At", "n": "updatedAt", "r": false, "sh": "The exact time, in epoch milliseconds, when this custom domain was last updated.", "t": "`$INTEGER`", "key$": "updatedAt", "index$": 5 }, "validationRecord": { "a": true, "fo": "uuidv4", "h": "Validation Record", "n": "validationRecord", "r": false, "sh": "Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain", "t": "`$STRING`", "key$": "validationRecord", "index$": 6 } }, "id": { "field": "id", "name": "id" }, "name": "custom_domain", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /relays/{relay_id}/custom-domains", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "relay_id", "or": "relay_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/relays/{relay_id}/custom-domains", "q": { "exist": ["relay_id"] }, "r": {}, "s": [{ "lit": "relays" }, { "var": "relay_id" }, { "lit": "custom-domains" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /relays/{relay_id}/custom-domains/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "relay_id", "or": "relay_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/relays/{relay_id}/custom-domains/{id}", "q": { "exist": ["id", "relay_id"] }, "r": {}, "s": [{ "lit": "relays" }, { "var": "relay_id" }, { "lit": "custom-domains" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.relay"]] }, "key$": "custom_domain", "name__orig": "custom_domain", "Name": "CustomDomain", "name_": "custom_domain", "name-": "custom-domain", "NAME": "CUSTOM_DOMAIN", "index$": 6 }, { "active": true, "entity": "custom_domain", "key$": "BasicCustomDomainFlow", "kind": "basic", "name": "BasicCustomDomainFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "custom_domain_ref01" }, "m": { "relay_id": "relay01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "custom_domain_ref01", "srcdatavar": "custom_domain_ref01_data", "suffix": "_dt0" }, "m": { "id": "custom_domain01", "relay_id": "relay01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-custom_domain_ref01" } }], "index$": 1 }] }, 'CustomDomain', { "POST /relays/{relay_id}/custom-domains": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "customDomain": { "type": "string", "description": "The customer managed domain to which requests to be relayed to your domain should be sent.", "example": "subdomain.example.com", "key$": "customDomain" } }, "required": ["customDomain"], "index$": 1 }, "examples": { "success": { "value": { "customDomain": "subdomain.example.com" } } } } } }, "parameters": [{ "name": "relay_id", "in": "path", "description": "The id of the Relay to which the custom domain should be added.", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /relays/{relay_id}/custom-domains/{id}": { "protocol": "http", "parameters": [{ "name": "relay_id", "in": "path", "description": "The id of the Relay to which the custom domain belongs.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "description": "The id of the custom domain to be fetched.", "required": true, "schema": { "type": "string" }, "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const custom_domain_ref01_ent = client.CustomDomain();
        let custom_domain_ref01_data = setup.data.new.custom_domain['custom_domain_ref01'];
        custom_domain_ref01_data['relay_id'] = setup.idmap['relay01'];
        custom_domain_ref01_data = (await custom_domain_ref01_ent.create(custom_domain_ref01_data)).data();
        (0, node_assert_1.default)(null != custom_domain_ref01_data.id);
        // LOAD
        const custom_domain_ref01_match_dt0 = {};
        custom_domain_ref01_match_dt0.id = custom_domain_ref01_data.id;
        const custom_domain_ref01_data_dt0 = (await custom_domain_ref01_ent.load(custom_domain_ref01_match_dt0)).data();
        (0, node_assert_1.default)(custom_domain_ref01_data_dt0.id === custom_domain_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/custom_domain/CustomDomainTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EvervaultSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['custom_domain01', 'custom_domain02', 'custom_domain03', 'relay01', 'relay02', 'relay03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EVERVAULT_TEST_CUSTOM_DOMAIN_ENTID': idmap,
        'EVERVAULT_TEST_LIVE': 'FALSE',
        'EVERVAULT_TEST_EXPLAIN': 'FALSE',
        'EVERVAULT_APIKEY': '',
        'EVERVAULT_SECRET': '',
    });
    idmap = env['EVERVAULT_TEST_CUSTOM_DOMAIN_ENTID'];
    const live = 'TRUE' === env.EVERVAULT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EVERVAULT_TEST_CUSTOM_DOMAIN_ENTID'];
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
//# sourceMappingURL=CustomDomainEntity.test.js.map