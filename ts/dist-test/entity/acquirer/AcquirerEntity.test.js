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
(0, node_test_1.describe)('AcquirerEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EVERVAULT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EvervaultSDK.test();
        const ent = testsdk.Acquirer();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE;
        for (const op of ['create', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'acquirer.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "configurations", "op": { "update": { "req": false, "type": "`$ARRAY`" } }, "req": true, "short": "The acquirer configuration settings.", "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "default", "op": { "create": { "req": false, "type": "`$BOOLEAN`" }, "update": { "req": false, "type": "`$BOOLEAN`" } }, "req": true, "short": "Specifies whether this Acquirer is the default.", "type": "`$BOOLEAN`", "index$": 1 }, { "active": true, "name": "description", "req": false, "short": "The description of the acquirer configuration.", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "id", "req": true, "short": "The unique identifier of the acquirer configuration.", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "name", "op": { "update": { "req": false, "type": "`$STRING`" } }, "req": true, "short": "The name of the acquirer configuration.", "type": "`$STRING`", "index$": 4 }], "id": { "field": "id", "name": "id" }, "name": "acquirer", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /payments/acquirers", "json": "{\"operationId\":\"createAcquirer\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"configurations\":{\"description\":\"The Acquirer configurations. Configurations are set according to each card network the Acquirer is associated with, and each `network` can only appear once. To use a different `bin`, `acquirerMerchantIdentifier`, or `country` for the same network, create a separate Acquirer.\",\"items\":{\"properties\":{\"acquirerMerchantIdentifier\":{\"description\":\"The merchant identifier associated with the configuration.\",\"example\":\"38191048173\",\"type\":\"string\"},\"bin\":{\"description\":\"The Bank Identification Number (BIN) of the Acquirer. Must be 6 to 11 digits.\",\"example\":\"424242\",\"maxLength\":11,\"minLength\":6,\"pattern\":\"^[0-9]{6,11}$\",\"type\":\"string\"},\"country\":{\"description\":\"The country of the Acquirer configuration, used when creating 3DS sessions.\",\"example\":\"ie\",\"format\":\"iso-3166-1-alpha-2\",\"type\":\"string\"},\"network\":{\"description\":\"The card network of the Acquirer. `discover` covers Discover, Diners Club, and JCB (US only).\",\"enum\":[\"visa\",\"mastercard\",\"american-express\",\"discover\"],\"example\":\"mastercard\",\"type\":\"string\"}},\"required\":[\"network\",\"bin\",\"acquirerMerchantIdentifier\",\"country\"],\"type\":\"object\"},\"type\":\"array\"},\"default\":{\"description\":\"Specifies whether this Acquirer is the default. Only one default Acquirer configuration can exist at a time; setting a new one clears the previous default. If none is defined, the first Acquirer created becomes the default. See the [Acquirers API](/api#acquirers) for details.\",\"type\":\"boolean\"},\"description\":{\"description\":\"The description of the Acquirer.\",\"type\":\"string\"},\"name\":{\"description\":\"The name of the Acquirer.\",\"type\":\"string\"}},\"required\":[\"name\",\"configurations\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"examples\":{\"SimpleExample\":{\"summary\":\"Acquirer created successfully\",\"value\":{\"configurations\":[{\"acquirerMerchantIdentifier\":\"38191048173\",\"bin\":\"424242\",\"country\":\"ie\",\"network\":\"mastercard\",\"state\":\"active\"},{\"acquirerMerchantIdentifier\":\"38191048173\",\"bin\":\"424242\",\"country\":\"ie\",\"network\":\"visa\",\"state\":\"active\"}],\"default\":true,\"description\":\"Ollivanders Wand Shop Production Configuration\",\"id\":\"acquirer_adk3kdljc3\",\"name\":\"Ollivanders Wand Shop Production Configuration\"}}},\"schema\":{\"example\":{\"configurations\":[{\"acquirerMerchantIdentifier\":\"38191048173\",\"bin\":\"424242\",\"country\":\"ie\",\"network\":\"mastercard\",\"state\":\"active\"},{\"acquirerMerchantIdentifier\":\"38191048173\",\"bin\":\"424242\",\"country\":\"ie\",\"network\":\"visa\",\"state\":\"active\"}],\"default\":true,\"description\":\"Ollivanders Wand Shop Production Configuration\",\"id\":\"acquirer_eead1d640d7c\",\"name\":\"Ollivanders Wand Shop Production Configuration\"},\"properties\":{\"configurations\":{\"description\":\"The acquirer configuration settings.\",\"items\":{\"properties\":{\"acquirerMerchantIdentifier\":{\"description\":\"The merchant identifier the configuration is associated with.\",\"example\":\"38191048173\",\"type\":\"string\"},\"bin\":{\"description\":\"The Bank Identification Number (BIN) of the Acquirer. Must be 6 to 11 digits.\",\"example\":\"424242\",\"maxLength\":11,\"minLength\":6,\"pattern\":\"^[0-9]{6,11}$\",\"type\":\"string\"},\"country\":{\"description\":\"The country of the acquirer configuration, used when creating 3DS sessions.\",\"example\":\"ie\",\"format\":\"iso-3166-1-alpha-2\",\"type\":\"string\"},\"network\":{\"description\":\"The card network of the Acquirer. `discover` covers Discover, Diners Club, and JCB (US only).\",\"enum\":[\"visa\",\"mastercard\",\"american-express\",\"discover\"],\"example\":\"mastercard\",\"type\":\"string\"},\"state\":{\"example\":\"active\",\"type\":\"string\"}},\"required\":[\"network\",\"bin\",\"acquirerMerchantIdentifier\",\"state\",\"country\"],\"type\":\"object\"},\"type\":\"array\"},\"default\":{\"type\":\"boolean\"},\"description\":{\"description\":\"The description of the acquirer configuration.\",\"type\":\"string\"},\"id\":{\"description\":\"The unique identifier of the acquirer configuration.\",\"example\":\"acquirer_eead1d640d7c\",\"type\":\"string\"},\"name\":{\"description\":\"The name of the acquirer configuration.\",\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"default\",\"configurations\"],\"summary\":\"The Acquirer Object\",\"type\":\"object\"}}},\"description\":\"Returns the created Acquirer object.\"}},\"security\":[{\"ApiKey\":[\"acquirer:create\"]}],\"securitySchemes\":{\"ApiKey\":{\"description\":\"Authentication using an API key. The username is the App ID and the password is the Api Key.\",\"scheme\":\"basic\",\"type\":\"http\"},\"ClientSideToken\":{\"bearerFormat\":\"Token\",\"description\":\"Authentication using a short lived token that you can share with clients. The Authorization header must be formatted as follow: \\\"Token <Client-Side Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"},\"TokenAuth\":{\"bearerFormat\":\"RunToken\",\"description\":\"Authentication using a short lived run token that you can share with clients. The Authorization header must be formatted as follow: \\\"RunToken <Function Run Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/payments/acquirers", "segments": [{ "lit": "payments" }, { "lit": "acquirers" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "acquirer_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /payments/acquirers/{acquirer_id}", "json": "{\"operationId\":\"getAcquirer\",\"parameters\":[{\"description\":\"The unique identifier of the Acquirer.\",\"in\":\"path\",\"name\":\"acquirer_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"SimpleExample\":{\"summary\":\"Acquirer successfully retrieved\",\"value\":{\"configurations\":[{\"acquirerMerchantIdentifier\":\"38191048173\",\"bin\":\"424242\",\"country\":\"ie\",\"network\":\"mastercard\",\"state\":\"active\"},{\"acquirerMerchantIdentifier\":\"38191048173\",\"bin\":\"424242\",\"country\":\"ie\",\"network\":\"visa\",\"state\":\"active\"}],\"default\":true,\"description\":\"Ollivanders Wand Shop Production Configuration\",\"id\":\"acquirer_adk3kdljc3\",\"name\":\"Ollivanders Wand Shop Production Configuration\"}}},\"schema\":{\"example\":{\"configurations\":[{\"acquirerMerchantIdentifier\":\"38191048173\",\"bin\":\"424242\",\"country\":\"ie\",\"network\":\"mastercard\",\"state\":\"active\"},{\"acquirerMerchantIdentifier\":\"38191048173\",\"bin\":\"424242\",\"country\":\"ie\",\"network\":\"visa\",\"state\":\"active\"}],\"default\":true,\"description\":\"Ollivanders Wand Shop Production Configuration\",\"id\":\"acquirer_eead1d640d7c\",\"name\":\"Ollivanders Wand Shop Production Configuration\"},\"properties\":{\"configurations\":{\"description\":\"The acquirer configuration settings.\",\"items\":{\"properties\":{\"acquirerMerchantIdentifier\":{\"description\":\"The merchant identifier the configuration is associated with.\",\"example\":\"38191048173\",\"type\":\"string\"},\"bin\":{\"description\":\"The Bank Identification Number (BIN) of the Acquirer. Must be 6 to 11 digits.\",\"example\":\"424242\",\"maxLength\":11,\"minLength\":6,\"pattern\":\"^[0-9]{6,11}$\",\"type\":\"string\"},\"country\":{\"description\":\"The country of the acquirer configuration, used when creating 3DS sessions.\",\"example\":\"ie\",\"format\":\"iso-3166-1-alpha-2\",\"type\":\"string\"},\"network\":{\"description\":\"The card network of the Acquirer. `discover` covers Discover, Diners Club, and JCB (US only).\",\"enum\":[\"visa\",\"mastercard\",\"american-express\",\"discover\"],\"example\":\"mastercard\",\"type\":\"string\"},\"state\":{\"example\":\"active\",\"type\":\"string\"}},\"required\":[\"network\",\"bin\",\"acquirerMerchantIdentifier\",\"state\",\"country\"],\"type\":\"object\"},\"type\":\"array\"},\"default\":{\"type\":\"boolean\"},\"description\":{\"description\":\"The description of the acquirer configuration.\",\"type\":\"string\"},\"id\":{\"description\":\"The unique identifier of the acquirer configuration.\",\"example\":\"acquirer_eead1d640d7c\",\"type\":\"string\"},\"name\":{\"description\":\"The name of the acquirer configuration.\",\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"default\",\"configurations\"],\"summary\":\"The Acquirer Object\",\"type\":\"object\"}}},\"description\":\"Returns an Acquirer object.\"}},\"security\":[{\"ApiKey\":[\"acquirer:read\"]}],\"securitySchemes\":{\"ApiKey\":{\"description\":\"Authentication using an API key. The username is the App ID and the password is the Api Key.\",\"scheme\":\"basic\",\"type\":\"http\"},\"ClientSideToken\":{\"bearerFormat\":\"Token\",\"description\":\"Authentication using a short lived token that you can share with clients. The Authorization header must be formatted as follow: \\\"Token <Client-Side Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"},\"TokenAuth\":{\"bearerFormat\":\"RunToken\",\"description\":\"Authentication using a short lived run token that you can share with clients. The Authorization header must be formatted as follow: \\\"RunToken <Function Run Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/payments/acquirers/{acquirer_id}", "rename": { "param": { "acquirer_id": "id" } }, "segments": [{ "lit": "payments" }, { "lit": "acquirers" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "acquirer_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "PATCH /payments/acquirers/{acquirer_id}", "json": "{\"operationId\":\"updateAcquirer\",\"parameters\":[{\"description\":\"The id of the Acquirer to be updated.\",\"in\":\"path\",\"name\":\"acquirer_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"configurations\":{\"description\":\"The Acquirer configurations. Configurations are set according to each card network the Acquirer is associated with, and each `network` can only appear once. To use a different `bin`, `acquirerMerchantIdentifier`, or `country` for the same network, create a separate Acquirer.\",\"items\":{\"properties\":{\"acquirerMerchantIdentifier\":{\"description\":\"The merchant identifier the configuration is associated with.\",\"type\":\"string\"},\"bin\":{\"description\":\"The Bank Identification Number (BIN) of the acquirer. Must be 6 to 11 digits.\",\"maxLength\":11,\"minLength\":6,\"pattern\":\"^[0-9]{6,11}$\",\"type\":\"string\"},\"country\":{\"description\":\"The country of the acquirer configuration, used when creating 3DS sessions.\",\"example\":\"ie\",\"format\":\"iso-3166-1-alpha-2\",\"type\":\"string\"},\"network\":{\"description\":\"The card network to use the configuration for. `discover` covers Discover, Diners Club, and JCB (US only).\",\"enum\":[\"visa\",\"mastercard\",\"american-express\",\"discover\"],\"example\":\"mastercard\",\"type\":\"string\"}},\"required\":[\"network\"],\"type\":\"object\"},\"type\":\"array\"},\"default\":{\"description\":\"Specifies whether this Acquirer is the default. Only one default Acquirer configuration can exist at a time; setting a new one clears the previous default. See the [Acquirers API](/api#acquirers) for details.\",\"type\":\"boolean\"},\"description\":{\"description\":\"The description of the Acquirer.\",\"type\":\"string\"},\"name\":{\"description\":\"The name of the Acquirer.\",\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"SimpleExample\":{\"summary\":\"Acquirer successfully updated\",\"value\":{\"configurations\":[{\"acquirerMerchantIdentifier\":\"38191048173\",\"bin\":\"424242\",\"country\":\"ie\",\"network\":\"mastercard\",\"state\":\"active\"},{\"acquirerMerchantIdentifier\":\"38191048173\",\"bin\":\"424242\",\"country\":\"ie\",\"network\":\"visa\",\"state\":\"active\"}],\"default\":true,\"description\":\"Ollivanders Wand Shop Production Configuration\",\"id\":\"acquirer_adk3kdljc3\",\"name\":\"Ollivanders Wand Shop Production Configuration\"}}},\"schema\":{\"example\":{\"configurations\":[{\"acquirerMerchantIdentifier\":\"38191048173\",\"bin\":\"424242\",\"country\":\"ie\",\"network\":\"mastercard\",\"state\":\"active\"},{\"acquirerMerchantIdentifier\":\"38191048173\",\"bin\":\"424242\",\"country\":\"ie\",\"network\":\"visa\",\"state\":\"active\"}],\"default\":true,\"description\":\"Ollivanders Wand Shop Production Configuration\",\"id\":\"acquirer_eead1d640d7c\",\"name\":\"Ollivanders Wand Shop Production Configuration\"},\"properties\":{\"configurations\":{\"description\":\"The acquirer configuration settings.\",\"items\":{\"properties\":{\"acquirerMerchantIdentifier\":{\"description\":\"The merchant identifier the configuration is associated with.\",\"example\":\"38191048173\",\"type\":\"string\"},\"bin\":{\"description\":\"The Bank Identification Number (BIN) of the Acquirer. Must be 6 to 11 digits.\",\"example\":\"424242\",\"maxLength\":11,\"minLength\":6,\"pattern\":\"^[0-9]{6,11}$\",\"type\":\"string\"},\"country\":{\"description\":\"The country of the acquirer configuration, used when creating 3DS sessions.\",\"example\":\"ie\",\"format\":\"iso-3166-1-alpha-2\",\"type\":\"string\"},\"network\":{\"description\":\"The card network of the Acquirer. `discover` covers Discover, Diners Club, and JCB (US only).\",\"enum\":[\"visa\",\"mastercard\",\"american-express\",\"discover\"],\"example\":\"mastercard\",\"type\":\"string\"},\"state\":{\"example\":\"active\",\"type\":\"string\"}},\"required\":[\"network\",\"bin\",\"acquirerMerchantIdentifier\",\"state\",\"country\"],\"type\":\"object\"},\"type\":\"array\"},\"default\":{\"type\":\"boolean\"},\"description\":{\"description\":\"The description of the acquirer configuration.\",\"type\":\"string\"},\"id\":{\"description\":\"The unique identifier of the acquirer configuration.\",\"example\":\"acquirer_eead1d640d7c\",\"type\":\"string\"},\"name\":{\"description\":\"The name of the acquirer configuration.\",\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"default\",\"configurations\"],\"summary\":\"The Acquirer Object\",\"type\":\"object\"}}},\"description\":\"Returns the updated Acquirer object.\"}},\"security\":[{\"ApiKey\":[\"acquirer:update\"]}],\"securitySchemes\":{\"ApiKey\":{\"description\":\"Authentication using an API key. The username is the App ID and the password is the Api Key.\",\"scheme\":\"basic\",\"type\":\"http\"},\"ClientSideToken\":{\"bearerFormat\":\"Token\",\"description\":\"Authentication using a short lived token that you can share with clients. The Authorization header must be formatted as follow: \\\"Token <Client-Side Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"},\"TokenAuth\":{\"bearerFormat\":\"RunToken\",\"description\":\"Authentication using a short lived run token that you can share with clients. The Authorization header must be formatted as follow: \\\"RunToken <Function Run Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PATCH", "orig": "/payments/acquirers/{acquirer_id}", "rename": { "param": { "acquirer_id": "id" } }, "segments": [{ "lit": "payments" }, { "lit": "acquirers" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "acquirer", "name__orig": "acquirer", "Name": "Acquirer", "name_": "acquirer", "name-": "acquirer", "NAME": "ACQUIRER", "index$": 0 }, { "active": true, "entity": "acquirer", "key$": "BasicAcquirerFlow", "kind": "basic", "name": "BasicAcquirerFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "acquirer_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "acquirer_ref01", "srcdatavar": "acquirer_ref01_data", "suffix": "_up0", "textfield": "description" }, "match": {}, "op": "update", "spec": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-acquirer_ref01" } }], "valid": [], "index$": 1 }, { "active": true, "data": {}, "input": { "ref": "acquirer_ref01", "srcdatavar": "acquirer_ref01_data", "suffix": "_dt0" }, "match": { "id": "acquirer01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-acquirer_ref01" } }], "index$": 2 }] }, 'Acquirer');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const acquirer_ref01_ent = client.Acquirer();
        let acquirer_ref01_data = setup.data.new.acquirer['acquirer_ref01'];
        acquirer_ref01_data = (await acquirer_ref01_ent.create(acquirer_ref01_data)).data();
        (0, node_assert_1.default)(null != acquirer_ref01_data.id);
        // UPDATE
        const acquirer_ref01_data_up0 = {};
        acquirer_ref01_data_up0.id = acquirer_ref01_data.id;
        const acquirer_ref01_markdef_up0 = { name: 'description', value: 'Mark01-acquirer_ref01_' + setup.now };
        acquirer_ref01_data_up0[acquirer_ref01_markdef_up0.name] = acquirer_ref01_markdef_up0.value;
        const acquirer_ref01_resdata_up0 = (await acquirer_ref01_ent.update(acquirer_ref01_data_up0)).data();
        (0, node_assert_1.default)(acquirer_ref01_resdata_up0.id === acquirer_ref01_data_up0.id);
        (0, node_assert_1.default)(acquirer_ref01_resdata_up0[acquirer_ref01_markdef_up0.name] === acquirer_ref01_markdef_up0.value);
        // LOAD
        const acquirer_ref01_match_dt0 = {};
        acquirer_ref01_match_dt0.id = acquirer_ref01_data.id;
        const acquirer_ref01_data_dt0 = (await acquirer_ref01_ent.load(acquirer_ref01_match_dt0)).data();
        (0, node_assert_1.default)(acquirer_ref01_data_dt0.id === acquirer_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/acquirer/AcquirerTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EvervaultSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['acquirer01', 'acquirer02', 'acquirer03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EVERVAULT_TEST_ACQUIRER_ENTID': idmap,
        'EVERVAULT_TEST_LIVE': 'FALSE',
        'EVERVAULT_TEST_EXPLAIN': 'FALSE',
        'EVERVAULT_APIKEY': '',
        'EVERVAULT_SECRET': '',
    });
    idmap = env['EVERVAULT_TEST_ACQUIRER_ENTID'];
    const live = 'TRUE' === env.EVERVAULT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EVERVAULT_TEST_ACQUIRER_ENTID'];
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
//# sourceMappingURL=AcquirerEntity.test.js.map