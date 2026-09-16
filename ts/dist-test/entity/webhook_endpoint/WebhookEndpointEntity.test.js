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
(0, node_test_1.describe)('WebhookEndpointEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EVERVAULT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EvervaultSDK.test();
        const ent = testsdk.WebhookEndpoint();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE;
        for (const op of ['update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'webhook_endpoint.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "int64", "name": "createdAt", "req": false, "short": "The exact time, in epoch milliseconds, when this Webhook Endpoint was created.", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "events", "op": { "update": { "req": true, "type": "`$ARRAY`" } }, "req": false, "short": "A list of Events that the Webhook Endpoint is subscribed to.", "type": "`$ARRAY`", "index$": 1 }, { "active": true, "name": "id", "req": false, "short": "A unique identifier representing a specific Webhook Endpoint.", "type": "`$STRING`", "index$": 2 }, { "active": true, "format": "int64", "name": "updatedAt", "req": false, "short": "The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated.", "type": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "index$": 3 }, { "active": true, "name": "url", "req": false, "short": "The URL of the Webhook Endpoint.", "type": "`$STRING`", "index$": 4 }], "id": { "field": "id", "name": "id" }, "name": "webhook_endpoint", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "webhook_endpoint_eead1d640d7c", "kind": "param", "name": "id", "orig": "webhook_endpoint_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /webhook-endpoints/{webhook_endpoint_id}", "json": "{\"operationId\":\"getWebhookEndpoint\",\"parameters\":[{\"description\":\"The identifier of the Webhook Endpoint to retrieve.\",\"example\":\"webhook_endpoint_eead1d640d7c\",\"in\":\"path\",\"name\":\"webhook_endpoint_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"SuccessfulCreation\":{\"description\":\"The Webhook Endpoint was retrieved successfully.\",\"summary\":\"Successful Retrieval\",\"value\":{\"createdAt\":169297262323,\"events\":[\"payments.merchant.updated\",\"payments.network-token.updated\"],\"id\":\"webhook_endpoint_eead1d640d7c\",\"updatedAt\":null,\"url\":\"https://example.com/webhook\"}}},\"schema\":{\"example\":{\"createdAt\":169297262323,\"events\":[\"payments.merchant.updated\",\"payments.network-token.updated\"],\"id\":\"webhook_endpoint_eead1d640d7c\",\"updatedAt\":null,\"url\":\"https://example.com/webhook\"},\"properties\":{\"createdAt\":{\"description\":\"The exact time, in epoch milliseconds, when this Webhook Endpoint was created.\",\"example\":1692972623233,\"format\":\"int64\",\"type\":\"integer\"},\"events\":{\"description\":\"A list of Events that the Webhook Endpoint is subscribed to. The Webhook will receive a POST request when any of these Events occur.\",\"items\":{\"description\":\"A list of Events that the Webhook Endpoint is subscribed to.\\n\",\"enum\":[\"*\",\"function.run.completed\",\"function.deployment.started\",\"function.deployment.updated\",\"function.deployment.finished\",\"enclave.deployment.started\",\"enclave.deployment.updated\",\"enclave.deployment.finished\",\"audit-log.event\",\"payments.network-token.updated\",\"payments.merchant.updated\",\"payments.card.updated\",\"payments.3ds-session.success\",\"payments.3ds-session.failure\"],\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"A unique identifier representing a specific Webhook Endpoint.\",\"example\":\"func_run_eead1d640d7c\",\"type\":\"string\"},\"updatedAt\":{\"description\":\"The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated.\",\"example\":1692972623233,\"format\":\"int64\",\"type\":[\"integer\",\"null\"]},\"url\":{\"description\":\"The URL of the Webhook Endpoint.\",\"example\":\"https://example.com/webhook\",\"type\":\"string\"}},\"summary\":\"The Webhook Endpoint Object\",\"type\":\"object\"}}},\"description\":\"The Webhook Endpoint was retrieved successfully.\"}},\"security\":[{\"ApiKey\":[\"webhookEndpoint:read\"]}],\"securitySchemes\":{\"ApiKey\":{\"description\":\"Authentication using an API key. The username is the App ID and the password is the Api Key.\",\"scheme\":\"basic\",\"type\":\"http\"},\"ClientSideToken\":{\"bearerFormat\":\"Token\",\"description\":\"Authentication using a short lived token that you can share with clients. The Authorization header must be formatted as follow: \\\"Token <Client-Side Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"},\"TokenAuth\":{\"bearerFormat\":\"RunToken\",\"description\":\"Authentication using a short lived run token that you can share with clients. The Authorization header must be formatted as follow: \\\"RunToken <Function Run Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/webhook-endpoints/{webhook_endpoint_id}", "rename": { "param": { "webhook_endpoint_id": "id" } }, "segments": [{ "lit": "webhook-endpoints" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "webhook_endpoint_eead1d640d7c", "kind": "param", "name": "id", "orig": "webhook_endpoint_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "PATCH /webhook-endpoints/{webhook_endpoint_id}", "json": "{\"operationId\":\"updateWebhookEndpoint\",\"parameters\":[{\"description\":\"The identifier of the Webhook Endpoint to update.\",\"example\":\"webhook_endpoint_eead1d640d7c\",\"in\":\"path\",\"name\":\"webhook_endpoint_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"UpdateWebhookEndpoint\":{\"value\":{\"events\":[\"merchant.updated\"]}}},\"schema\":{\"properties\":{\"events\":{\"description\":\"A list of Events that the Webhook Endpoint should subscribe to.\",\"example\":[\"payments.merchant.updated\"],\"items\":{\"description\":\"A list of Events that the Webhook Endpoint is subscribed to.\\n\",\"enum\":[\"*\",\"function.run.completed\",\"function.deployment.started\",\"function.deployment.updated\",\"function.deployment.finished\",\"enclave.deployment.started\",\"enclave.deployment.updated\",\"enclave.deployment.finished\",\"audit-log.event\",\"payments.network-token.updated\",\"payments.merchant.updated\",\"payments.card.updated\",\"payments.3ds-session.success\",\"payments.3ds-session.failure\"],\"type\":\"string\"},\"type\":\"array\"}},\"required\":[\"events\"],\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"SuccessfulCreation\":{\"description\":\"The Webhook Endpoint was updated successfully.\",\"summary\":\"Successful Update\",\"value\":{\"createdAt\":169297262323,\"events\":[\"payments.merchant.updated\"],\"id\":\"webhook_endpoint_eead1d640d7c\",\"updatedAt\":169297269867,\"url\":\"https://example.com/webhook\"}}},\"schema\":{\"example\":{\"createdAt\":169297262323,\"events\":[\"payments.merchant.updated\",\"payments.network-token.updated\"],\"id\":\"webhook_endpoint_eead1d640d7c\",\"updatedAt\":null,\"url\":\"https://example.com/webhook\"},\"properties\":{\"createdAt\":{\"description\":\"The exact time, in epoch milliseconds, when this Webhook Endpoint was created.\",\"example\":1692972623233,\"format\":\"int64\",\"type\":\"integer\"},\"events\":{\"description\":\"A list of Events that the Webhook Endpoint is subscribed to. The Webhook will receive a POST request when any of these Events occur.\",\"items\":{\"description\":\"A list of Events that the Webhook Endpoint is subscribed to.\\n\",\"enum\":[\"*\",\"function.run.completed\",\"function.deployment.started\",\"function.deployment.updated\",\"function.deployment.finished\",\"enclave.deployment.started\",\"enclave.deployment.updated\",\"enclave.deployment.finished\",\"audit-log.event\",\"payments.network-token.updated\",\"payments.merchant.updated\",\"payments.card.updated\",\"payments.3ds-session.success\",\"payments.3ds-session.failure\"],\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"A unique identifier representing a specific Webhook Endpoint.\",\"example\":\"func_run_eead1d640d7c\",\"type\":\"string\"},\"updatedAt\":{\"description\":\"The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated.\",\"example\":1692972623233,\"format\":\"int64\",\"type\":[\"integer\",\"null\"]},\"url\":{\"description\":\"The URL of the Webhook Endpoint.\",\"example\":\"https://example.com/webhook\",\"type\":\"string\"}},\"summary\":\"The Webhook Endpoint Object\",\"type\":\"object\"}}},\"description\":\"The Webhook Endpoint was updated successfully.\"}},\"security\":[{\"ApiKey\":[\"webhookEndpoint:update\"]}],\"securitySchemes\":{\"ApiKey\":{\"description\":\"Authentication using an API key. The username is the App ID and the password is the Api Key.\",\"scheme\":\"basic\",\"type\":\"http\"},\"ClientSideToken\":{\"bearerFormat\":\"Token\",\"description\":\"Authentication using a short lived token that you can share with clients. The Authorization header must be formatted as follow: \\\"Token <Client-Side Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"},\"TokenAuth\":{\"bearerFormat\":\"RunToken\",\"description\":\"Authentication using a short lived run token that you can share with clients. The Authorization header must be formatted as follow: \\\"RunToken <Function Run Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PATCH", "orig": "/webhook-endpoints/{webhook_endpoint_id}", "rename": { "param": { "webhook_endpoint_id": "id" } }, "segments": [{ "lit": "webhook-endpoints" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "webhook_endpoint", "name__orig": "webhook_endpoint", "Name": "WebhookEndpoint", "name_": "webhook_endpoint", "name-": "webhook-endpoint", "NAME": "WEBHOOK_ENDPOINT", "index$": 15 }, { "active": true, "entity": "webhook_endpoint", "key$": "BasicWebhookEndpointFlow", "kind": "basic", "name": "BasicWebhookEndpointFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "webhook_endpoint_ref01", "srcdatavar": "webhook_endpoint_ref01_data", "suffix": "_up0", "textfield": "url" }, "match": {}, "op": "update", "spec": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-webhook_endpoint_ref01" } }], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "webhook_endpoint_ref01", "srcdatavar": "webhook_endpoint_ref01_data", "suffix": "_dt0" }, "match": { "id": "webhook_endpoint01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-webhook_endpoint_ref01" } }], "index$": 1 }] }, 'WebhookEndpoint');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let webhook_endpoint_ref01_data = Object.values(setup.data.existing.webhook_endpoint)[0];
        // UPDATE
        const webhook_endpoint_ref01_ent = client.WebhookEndpoint();
        const webhook_endpoint_ref01_data_up0 = {};
        webhook_endpoint_ref01_data_up0.id = webhook_endpoint_ref01_data.id;
        const webhook_endpoint_ref01_markdef_up0 = { name: 'url', value: 'Mark01-webhook_endpoint_ref01_' + setup.now };
        webhook_endpoint_ref01_data_up0[webhook_endpoint_ref01_markdef_up0.name] = webhook_endpoint_ref01_markdef_up0.value;
        const webhook_endpoint_ref01_resdata_up0 = (await webhook_endpoint_ref01_ent.update(webhook_endpoint_ref01_data_up0)).data();
        (0, node_assert_1.default)(webhook_endpoint_ref01_resdata_up0.id === webhook_endpoint_ref01_data_up0.id);
        (0, node_assert_1.default)(webhook_endpoint_ref01_resdata_up0[webhook_endpoint_ref01_markdef_up0.name] === webhook_endpoint_ref01_markdef_up0.value);
        // LOAD
        const webhook_endpoint_ref01_match_dt0 = {};
        webhook_endpoint_ref01_match_dt0.id = webhook_endpoint_ref01_data.id;
        const webhook_endpoint_ref01_data_dt0 = (await webhook_endpoint_ref01_ent.load(webhook_endpoint_ref01_match_dt0)).data();
        (0, node_assert_1.default)(webhook_endpoint_ref01_data_dt0.id === webhook_endpoint_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/webhook_endpoint/WebhookEndpointTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EvervaultSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['webhook_endpoint01', 'webhook_endpoint02', 'webhook_endpoint03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID': idmap,
        'EVERVAULT_TEST_LIVE': 'FALSE',
        'EVERVAULT_TEST_EXPLAIN': 'FALSE',
        'EVERVAULT_APIKEY': '',
        'EVERVAULT_SECRET': '',
    });
    idmap = env['EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID'];
    const live = 'TRUE' === env.EVERVAULT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID'];
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
//# sourceMappingURL=WebhookEndpointEntity.test.js.map