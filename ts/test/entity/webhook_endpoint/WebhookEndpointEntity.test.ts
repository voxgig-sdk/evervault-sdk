

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { EvervaultSDK, BaseFeature, config, stdutil } from '../../..'

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('WebhookEndpointEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
  afterEach(liveDelay('EVERVAULT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EvervaultSDK.test()
    const ent = testsdk.WebhookEndpoint()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('webhook_endpoint hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of EvervaultSDK.test(offline).WebhookEndpoint().stream('list')) { }
    }, /offline/)

    for await (const _item of EvervaultSDK.test(offline).WebhookEndpoint()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = EvervaultSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.WebhookEndpoint().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of EvervaultSDK.test().WebhookEndpoint().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new EvervaultSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.WebhookEndpoint().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.WebhookEndpoint().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = EvervaultSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.WebhookEndpoint().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'webhook_endpoint.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"fo":"int64","h":"Created At","n":"createdAt","r":false,"sh":"The exact time, in epoch milliseconds, when this Webhook Endpoint was created.","t":"`$INTEGER`","key$":"createdAt","index$":0},"events":{"a":true,"h":"Events","n":"events","op":{"create":{"req":true,"type":"`$ARRAY`"},"update":{"req":true,"type":"`$ARRAY`"}},"r":false,"sh":"A list of Events that the Webhook Endpoint is subscribed to.","t":"`$ARRAY`","key$":"events","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"A unique identifier representing a specific Webhook Endpoint.","t":"`$STRING`","key$":"id","index$":2},"updatedAt":{"a":true,"fo":"int64","h":"Updated At","n":"updatedAt","r":false,"sh":"The exact time, in epoch milliseconds, when this Webhook Endpoint was last updated.","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"updatedAt","index$":3},"url":{"a":true,"h":"Url","n":"url","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The URL of the Webhook Endpoint.","t":"`$STRING`","key$":"url","index$":4}},"id":{"field":"id","name":"id"},"name":"webhook_endpoint","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["events","url"],"co":{"id":"POST /webhook-endpoints","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/webhook-endpoints","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"webhook-endpoints"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /webhook-endpoints","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"webhook_endpoint_wd7c640d1daee","k":"query","n":"starting_after","or":"startingAfter","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/webhook-endpoints","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"webhook-endpoints"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /webhook-endpoints/{webhook_endpoint_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"webhook_endpoint_eead1d640d7c","k":"param","n":"id","or":"webhook_endpoint_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/webhook-endpoints/{webhook_endpoint_id}","q":{"exist":["id"]},"r":{"param":{"webhook_endpoint_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"webhook-endpoints"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["events"],"co":{"id":"PATCH /webhook-endpoints/{webhook_endpoint_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"webhook_endpoint_eead1d640d7c","k":"param","n":"id","or":"webhook_endpoint_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/webhook-endpoints/{webhook_endpoint_id}","q":{"exist":["id"]},"r":{"param":{"webhook_endpoint_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"webhook-endpoints"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"webhook_endpoint","name__orig":"webhook_endpoint","Name":"WebhookEndpoint","name_":"webhook_endpoint","name-":"webhook-endpoint","NAME":"WEBHOOK_ENDPOINT","index$":15}, {"active":true,"entity":"webhook_endpoint","key$":"BasicWebhookEndpointFlow","kind":"basic","name":"BasicWebhookEndpointFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"webhook_endpoint_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"webhook_endpoint_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"webhook_endpoint_ref01","srcdatavar":"webhook_endpoint_ref01_data","suffix":"_up0","textfield":"url"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-webhook_endpoint_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"webhook_endpoint_ref01","srcdatavar":"webhook_endpoint_ref01_data","suffix":"_dt0"},"m":{"id":"webhook_endpoint01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-webhook_endpoint_ref01"}}],"index$":3}]}, 'WebhookEndpoint', {"POST /webhook-endpoints":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"url":{"type":"string","description":"The URL of the Webhook Endpoint.","example":"https://example.com/webhook","key$":"url"},"events":{"type":"array","description":"A list of Events that the Webhook Endpoint should subscribe to.","items":{"type":"string","enum":["*","function.run.completed","function.deployment.started","function.deployment.updated","function.deployment.finished","enclave.deployment.started","enclave.deployment.updated","enclave.deployment.finished","audit-log.event","payments.network-token.updated","payments.merchant.updated","payments.card.updated","payments.3ds-session.success","payments.3ds-session.failure"],"x-enum-description":{"*":"All events","function.run.completed":"An asynchronous Function Run was completed","function.deployment.started":"A Function Deployment was started","function.deployment.updated":"A Function Deployment was updated","function.deployment.finished":"A Function Deployment was finished","enclave.deployment.started":"An Enclave Deployment was started","enclave.deployment.updated":"An Enclave Deployment was updated","enclave.deployment.finished":"An Enclave Deployment was finished","audit-log.event":"An Audit Log Event was triggered","payments.network-token.updated":"A Network Token was updated","payments.merchant.updated":"A Merchant was updated","payments.card.updated":"A Card was updated","payments.3ds-session.success":"A 3DS Session was successful","payments.3ds-session.failure":"A 3DS Session failed"},"description":"A list of Events that the Webhook Endpoint is subscribed to.\n","x-ref":"#/components/schemas/WebhookEvent"},"key$":"events"}},"required":["url","events"],"index$":1},"examples":{"CreateWebhookEndpoint":{"value":{"url":"https://example.com/webhook","events":["payments.merchant.updated","payments.network-token.updated"]}}}}}},"parameters":[]},"GET /webhook-endpoints":{"protocol":"http","parameters":[{"name":"limit","in":"query","required":false,"description":"The maximum number of Webhook Endpoints to return (Default is 10).","schema":{"type":"integer","minimum":1,"maximum":100,"default":10},"example":10,"index$":0},{"name":"startingAfter","in":"query","required":false,"description":"The identifier of the last Webhook Endpoint in the previous page of results.","schema":{"type":"string"},"example":"webhook_endpoint_wd7c640d1daee","index$":1}]},"GET /webhook-endpoints/{webhook_endpoint_id}":{"protocol":"http","parameters":[{"name":"webhook_endpoint_id","in":"path","required":true,"description":"The identifier of the Webhook Endpoint to retrieve.","schema":{"type":"string"},"example":"webhook_endpoint_eead1d640d7c","index$":0}]},"PATCH /webhook-endpoints/{webhook_endpoint_id}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"events":{"type":"array","description":"A list of Events that the Webhook Endpoint should subscribe to.","items":{"type":"string","enum":["*","function.run.completed","function.deployment.started","function.deployment.updated","function.deployment.finished","enclave.deployment.started","enclave.deployment.updated","enclave.deployment.finished","audit-log.event","payments.network-token.updated","payments.merchant.updated","payments.card.updated","payments.3ds-session.success","payments.3ds-session.failure"],"x-enum-description":{"*":"All events","function.run.completed":"An asynchronous Function Run was completed","function.deployment.started":"A Function Deployment was started","function.deployment.updated":"A Function Deployment was updated","function.deployment.finished":"A Function Deployment was finished","enclave.deployment.started":"An Enclave Deployment was started","enclave.deployment.updated":"An Enclave Deployment was updated","enclave.deployment.finished":"An Enclave Deployment was finished","audit-log.event":"An Audit Log Event was triggered","payments.network-token.updated":"A Network Token was updated","payments.merchant.updated":"A Merchant was updated","payments.card.updated":"A Card was updated","payments.3ds-session.success":"A 3DS Session was successful","payments.3ds-session.failure":"A 3DS Session failed"},"description":"A list of Events that the Webhook Endpoint is subscribed to.\n","x-ref":"#/components/schemas/WebhookEvent"},"example":["payments.merchant.updated"],"key$":"events"}},"required":["events"],"index$":1},"examples":{"UpdateWebhookEndpoint":{"value":{"events":["merchant.updated"]}}}}}},"parameters":[{"name":"webhook_endpoint_id","in":"path","required":true,"description":"The identifier of the Webhook Endpoint to update.","schema":{"type":"string"},"example":"webhook_endpoint_eead1d640d7c","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const webhook_endpoint_ref01_ent = client.WebhookEndpoint()
    let webhook_endpoint_ref01_data = setup.data.new.webhook_endpoint['webhook_endpoint_ref01']

    webhook_endpoint_ref01_data = (await webhook_endpoint_ref01_ent.create(webhook_endpoint_ref01_data)).data()
    assert(null != webhook_endpoint_ref01_data.id)


    // LIST
    const webhook_endpoint_ref01_match: any = {}

    const webhook_endpoint_ref01_list = (await webhook_endpoint_ref01_ent.list(webhook_endpoint_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(webhook_endpoint_ref01_list, { id: webhook_endpoint_ref01_data.id })))


    // UPDATE
    const webhook_endpoint_ref01_data_up0: any = {}
    webhook_endpoint_ref01_data_up0.id = webhook_endpoint_ref01_data.id

    const webhook_endpoint_ref01_markdef_up0 = { name: 'url', value: 'Mark01-webhook_endpoint_ref01_' + setup.now }
    ;(webhook_endpoint_ref01_data_up0 as any)[webhook_endpoint_ref01_markdef_up0.name] = webhook_endpoint_ref01_markdef_up0.value

    const webhook_endpoint_ref01_resdata_up0 = (await webhook_endpoint_ref01_ent.update(webhook_endpoint_ref01_data_up0)).data()
    assert(webhook_endpoint_ref01_resdata_up0.id === webhook_endpoint_ref01_data_up0.id)

    assert((webhook_endpoint_ref01_resdata_up0 as any)[webhook_endpoint_ref01_markdef_up0.name] === webhook_endpoint_ref01_markdef_up0.value)


    // LOAD
    const webhook_endpoint_ref01_match_dt0: any = {}
    webhook_endpoint_ref01_match_dt0.id = webhook_endpoint_ref01_data.id
    const webhook_endpoint_ref01_data_dt0 = (await webhook_endpoint_ref01_ent.load(webhook_endpoint_ref01_match_dt0)).data()
    assert(webhook_endpoint_ref01_data_dt0.id === webhook_endpoint_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/webhook_endpoint/WebhookEndpointTestData.json')

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
    ['webhook_endpoint01','webhook_endpoint02','webhook_endpoint03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID': idmap,
    'EVERVAULT_TEST_LIVE': 'FALSE',
    'EVERVAULT_TEST_EXPLAIN': 'FALSE',
    'EVERVAULT_APIKEY': '',
    'EVERVAULT_SECRET': '',
  })

  idmap = env['EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID']

  const live = 'TRUE' === env.EVERVAULT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EVERVAULT_TEST_WEBHOOK_ENDPOINT_ENTID']
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
  
