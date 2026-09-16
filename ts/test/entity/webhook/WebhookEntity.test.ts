

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { EvervaultSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('WebhookEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
  afterEach(liveDelay('EVERVAULT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EvervaultSDK.test()
    const ent = testsdk.Webhook()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'webhook.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"int64","name":"createdAt","req":false,"short":"The exact time, in epoch milliseconds, when this Webhook Endpoint was created.","type":"`$INTEGER`","index$":0},{"active":true,"name":"events","op":{"list":{"req":false,"type":"`$ARRAY`"}},"req":true,"short":"A list of Events that the Webhook Endpoint should subscribe to.","type":"`$ARRAY`","index$":1},{"active":true,"name":"id","req":false,"short":"A unique identifier representing a specific Webhook Endpoint.","type":"`$STRING`","index$":2},{"active":true,"format":"int64","name":"updatedAt","req":false,"short":"The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated.","type":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":3},{"active":true,"name":"url","op":{"list":{"req":false,"type":"`$STRING`"}},"req":true,"short":"The URL of the Webhook Endpoint.","type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"webhook","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /webhook-endpoints","json":"{\"operationId\":\"createWebhookEndpoint\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"CreateWebhookEndpoint\":{\"value\":{\"events\":[\"payments.merchant.updated\",\"payments.network-token.updated\"],\"url\":\"https://example.com/webhook\"}}},\"schema\":{\"properties\":{\"events\":{\"description\":\"A list of Events that the Webhook Endpoint should subscribe to.\",\"items\":{\"description\":\"A list of Events that the Webhook Endpoint is subscribed to.\\n\",\"enum\":[\"*\",\"function.run.completed\",\"function.deployment.started\",\"function.deployment.updated\",\"function.deployment.finished\",\"enclave.deployment.started\",\"enclave.deployment.updated\",\"enclave.deployment.finished\",\"audit-log.event\",\"payments.network-token.updated\",\"payments.merchant.updated\",\"payments.card.updated\",\"payments.3ds-session.success\",\"payments.3ds-session.failure\"],\"type\":\"string\"},\"type\":\"array\"},\"url\":{\"description\":\"The URL of the Webhook Endpoint.\",\"example\":\"https://example.com/webhook\",\"type\":\"string\"}},\"required\":[\"url\",\"events\"],\"type\":\"object\"}}}},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"examples\":{\"SuccessfulCreation\":{\"description\":\"The Webhook Endpoint was created successfully.\",\"summary\":\"Successful Creation\",\"value\":{\"createdAt\":169297262323,\"events\":[\"payments.merchant.updated\",\"payments.network-token.updated\"],\"id\":\"webhook_endpoint_eead1d640d7c\",\"updatedAt\":null,\"url\":\"https://example.com/webhook\"}}},\"schema\":{\"example\":{\"createdAt\":169297262323,\"events\":[\"payments.merchant.updated\",\"payments.network-token.updated\"],\"id\":\"webhook_endpoint_eead1d640d7c\",\"updatedAt\":null,\"url\":\"https://example.com/webhook\"},\"properties\":{\"createdAt\":{\"description\":\"The exact time, in epoch milliseconds, when this Webhook Endpoint was created.\",\"example\":1692972623233,\"format\":\"int64\",\"type\":\"integer\"},\"events\":{\"description\":\"A list of Events that the Webhook Endpoint is subscribed to. The Webhook will receive a POST request when any of these Events occur.\",\"items\":{\"description\":\"A list of Events that the Webhook Endpoint is subscribed to.\\n\",\"enum\":[\"*\",\"function.run.completed\",\"function.deployment.started\",\"function.deployment.updated\",\"function.deployment.finished\",\"enclave.deployment.started\",\"enclave.deployment.updated\",\"enclave.deployment.finished\",\"audit-log.event\",\"payments.network-token.updated\",\"payments.merchant.updated\",\"payments.card.updated\",\"payments.3ds-session.success\",\"payments.3ds-session.failure\"],\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"A unique identifier representing a specific Webhook Endpoint.\",\"example\":\"func_run_eead1d640d7c\",\"type\":\"string\"},\"updatedAt\":{\"description\":\"The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated.\",\"example\":1692972623233,\"format\":\"int64\",\"type\":[\"integer\",\"null\"]},\"url\":{\"description\":\"The URL of the Webhook Endpoint.\",\"example\":\"https://example.com/webhook\",\"type\":\"string\"}},\"summary\":\"The Webhook Endpoint Object\",\"type\":\"object\"}}},\"description\":\"The Webhook Endpoint was created successfully.\"}},\"security\":[{\"ApiKey\":[\"webhookEndpoint:create\"]}],\"securitySchemes\":{\"ApiKey\":{\"description\":\"Authentication using an API key. The username is the App ID and the password is the Api Key.\",\"scheme\":\"basic\",\"type\":\"http\"},\"ClientSideToken\":{\"bearerFormat\":\"Token\",\"description\":\"Authentication using a short lived token that you can share with clients. The Authorization header must be formatted as follow: \\\"Token <Client-Side Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"},\"TokenAuth\":{\"bearerFormat\":\"RunToken\",\"description\":\"Authentication using a short lived run token that you can share with clients. The Authorization header must be formatted as follow: \\\"RunToken <Function Run Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/webhook-endpoints","segments":[{"lit":"webhook-endpoints"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":10,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":"webhook_endpoint_wd7c640d1daee","kind":"query","name":"starting_after","orig":"starting_after","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /webhook-endpoints","json":"{\"operationId\":\"listWebhookEndpoints\",\"parameters\":[{\"description\":\"The maximum number of Webhook Endpoints to return (Default is 10).\",\"example\":10,\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"The identifier of the last Webhook Endpoint in the previous page of results.\",\"example\":\"webhook_endpoint_wd7c640d1daee\",\"in\":\"query\",\"name\":\"startingAfter\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"SuccessfulCreation\":{\"description\":\"The Webhook Endpoints were retrieved successfully.\",\"summary\":\"Successful List\",\"value\":{\"data\":[{\"createdAt\":169297262323,\"events\":[\"payments.merchant.updated\",\"payments.network-token.updated\"],\"id\":\"webhook_endpoint_eead1d640d7c\",\"updatedAt\":null,\"url\":\"https://example.com/webhook\"}],\"hasMore\":true}}},\"schema\":{\"properties\":{\"data\":{\"items\":{\"example\":{\"createdAt\":169297262323,\"events\":[\"payments.merchant.updated\",\"payments.network-token.updated\"],\"id\":\"webhook_endpoint_eead1d640d7c\",\"updatedAt\":null,\"url\":\"https://example.com/webhook\"},\"properties\":{\"createdAt\":{\"description\":\"The exact time, in epoch milliseconds, when this Webhook Endpoint was created.\",\"example\":1692972623233,\"format\":\"int64\",\"type\":\"integer\"},\"events\":{\"description\":\"A list of Events that the Webhook Endpoint is subscribed to. The Webhook will receive a POST request when any of these Events occur.\",\"items\":{\"description\":\"A list of Events that the Webhook Endpoint is subscribed to.\\n\",\"enum\":[\"*\",\"function.run.completed\",\"function.deployment.started\",\"function.deployment.updated\",\"function.deployment.finished\",\"enclave.deployment.started\",\"enclave.deployment.updated\",\"enclave.deployment.finished\",\"audit-log.event\",\"payments.network-token.updated\",\"payments.merchant.updated\",\"payments.card.updated\",\"payments.3ds-session.success\",\"payments.3ds-session.failure\"],\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"A unique identifier representing a specific Webhook Endpoint.\",\"example\":\"func_run_eead1d640d7c\",\"type\":\"string\"},\"updatedAt\":{\"description\":\"The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated.\",\"example\":1692972623233,\"format\":\"int64\",\"type\":[\"integer\",\"null\"]},\"url\":{\"description\":\"The URL of the Webhook Endpoint.\",\"example\":\"https://example.com/webhook\",\"type\":\"string\"}},\"summary\":\"The Webhook Endpoint Object\",\"type\":\"object\"},\"type\":\"array\"},\"hasMore\":{\"description\":\"Indicates whether there are more Webhook Endpoints to retrieve.\",\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"The Webhook Endpoints were retrieved successfully.\"}},\"security\":[{\"ApiKey\":[\"webhookEndpoint:list\"]}],\"securitySchemes\":{\"ApiKey\":{\"description\":\"Authentication using an API key. The username is the App ID and the password is the Api Key.\",\"scheme\":\"basic\",\"type\":\"http\"},\"ClientSideToken\":{\"bearerFormat\":\"Token\",\"description\":\"Authentication using a short lived token that you can share with clients. The Authorization header must be formatted as follow: \\\"Token <Client-Side Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"},\"TokenAuth\":{\"bearerFormat\":\"RunToken\",\"description\":\"Authentication using a short lived run token that you can share with clients. The Authorization header must be formatted as follow: \\\"RunToken <Function Run Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/webhook-endpoints","segments":[{"lit":"webhook-endpoints"}],"select":{"exist":["limit","starting_after"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"example":"webhook_endpoint_eead1d640d7c","kind":"param","name":"webhook_endpoint_id","orig":"webhook_endpoint_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /webhook-endpoints/{webhook_endpoint_id}","json":"{\"operationId\":\"deleteWebhookEndpoint\",\"parameters\":[{\"description\":\"The identifier of the Webhook Endpoint to delete.\",\"example\":\"webhook_endpoint_eead1d640d7c\",\"in\":\"path\",\"name\":\"webhook_endpoint_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"The Webhook Endpoint was successfully deleted.\"}},\"security\":[{\"ApiKey\":[\"webhookEndpoint:delete\"]}],\"securitySchemes\":{\"ApiKey\":{\"description\":\"Authentication using an API key. The username is the App ID and the password is the Api Key.\",\"scheme\":\"basic\",\"type\":\"http\"},\"ClientSideToken\":{\"bearerFormat\":\"Token\",\"description\":\"Authentication using a short lived token that you can share with clients. The Authorization header must be formatted as follow: \\\"Token <Client-Side Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"},\"TokenAuth\":{\"bearerFormat\":\"RunToken\",\"description\":\"Authentication using a short lived run token that you can share with clients. The Authorization header must be formatted as follow: \\\"RunToken <Function Run Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/webhook-endpoints/{webhook_endpoint_id}","segments":[{"lit":"webhook-endpoints"},{"var":"webhook_endpoint_id"}],"select":{"exist":["webhook_endpoint_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["webhook_endpoint"]]},"key$":"webhook","name__orig":"webhook","Name":"Webhook","name_":"webhook","name-":"webhook","NAME":"WEBHOOK","index$":14}, {"active":true,"entity":"webhook","key$":"BasicWebhookFlow","kind":"basic","name":"BasicWebhookFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"webhook_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"webhook_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"webhook_ref01","suffix":"_rm0"},"match":{"id":"webhook01"},"op":"remove","spec":[],"valid":[],"index$":2},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"webhook_ref01"}}],"index$":3}]}, 'Webhook')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const webhook_ref01_ent = client.Webhook()
    let webhook_ref01_data = setup.data.new.webhook['webhook_ref01']

    webhook_ref01_data = (await webhook_ref01_ent.create(webhook_ref01_data)).data()
    assert(null != webhook_ref01_data.id)


    // LIST
    const webhook_ref01_match: any = {}

    const webhook_ref01_list = (await webhook_ref01_ent.list(webhook_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(webhook_ref01_list, { id: webhook_ref01_data.id })))


    // REMOVE
    const webhook_ref01_match_rm0: any = { id: webhook_ref01_data.id }
    await webhook_ref01_ent.remove(webhook_ref01_match_rm0)
  

    // LIST
    const webhook_ref01_match_rt0: any = {}

    const webhook_ref01_list_rt0 = (await webhook_ref01_ent.list(webhook_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(webhook_ref01_list_rt0, { id: webhook_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/webhook/WebhookTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = EvervaultSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['webhook01','webhook02','webhook03','webhook_endpoint01','webhook_endpoint02','webhook_endpoint03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EVERVAULT_TEST_WEBHOOK_ENTID': idmap,
    'EVERVAULT_TEST_LIVE': 'FALSE',
    'EVERVAULT_TEST_EXPLAIN': 'FALSE',
    'EVERVAULT_APIKEY': '',
    'EVERVAULT_SECRET': '',
  })

  idmap = env['EVERVAULT_TEST_WEBHOOK_ENTID']

  const live = 'TRUE' === env.EVERVAULT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EVERVAULT_TEST_WEBHOOK_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new EvervaultSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
