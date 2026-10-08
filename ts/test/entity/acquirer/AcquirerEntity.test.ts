

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


describe('AcquirerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
  afterEach(liveDelay('EVERVAULT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EvervaultSDK.test()
    const ent = testsdk.Acquirer()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('acquirer hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of EvervaultSDK.test(offline).Acquirer().stream('list')) { }
    }, /offline/)

    for await (const _item of EvervaultSDK.test(offline).Acquirer()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = EvervaultSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Acquirer().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of EvervaultSDK.test().Acquirer().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new EvervaultSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Acquirer().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Acquirer().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = EvervaultSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Acquirer().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'acquirer.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"configurations":{"a":true,"h":"Configurations","n":"configurations","op":{"update":{"req":false,"type":"`$ARRAY`"}},"r":true,"sh":"The acquirer configuration settings.","t":"`$ARRAY`","key$":"configurations","index$":0},"default":{"a":true,"h":"Default","n":"default","op":{"update":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"sh":"Specifies whether this Acquirer is the default.","t":"`$BOOLEAN`","key$":"default","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"The description of the acquirer configuration.","t":"`$STRING`","key$":"description","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The unique identifier of the acquirer configuration.","t":"`$STRING`","key$":"id","index$":3},"name":{"a":true,"h":"Name","n":"name","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The name of the acquirer configuration.","t":"`$STRING`","key$":"name","index$":4}},"id":{"field":"id","name":"id"},"name":"acquirer","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["configurations","default","description","name"],"co":{"id":"POST /payments/acquirers","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/payments/acquirers","q":{"$action":"acquirer"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"payments"},{"lit":"acquirers"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /payments/acquirers","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":0,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":50,"k":"query","n":"page_size","or":"pageSize","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/payments/acquirers","q":{"$action":"acquirer"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"payments"},{"lit":"acquirers"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /payments/acquirers/{acquirer_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"acquirer_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/payments/acquirers/{acquirer_id}","q":{"exist":["id"]},"r":{"param":{"acquirer_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"payments"},{"lit":"acquirers"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["configurations","default","description","name"],"co":{"id":"PATCH /payments/acquirers/{acquirer_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"acquirer_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/payments/acquirers/{acquirer_id}","q":{"exist":["id"]},"r":{"param":{"acquirer_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"payments"},{"lit":"acquirers"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"acquirer","name__orig":"acquirer","Name":"Acquirer","name_":"acquirer","name-":"acquirer","NAME":"ACQUIRER","index$":0}, {"active":true,"entity":"acquirer","key$":"BasicAcquirerFlow","kind":"basic","name":"BasicAcquirerFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"acquirer_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"acquirer_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"acquirer_ref01","srcdatavar":"acquirer_ref01_data","suffix":"_up0","textfield":"description"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-acquirer_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"acquirer_ref01","srcdatavar":"acquirer_ref01_data","suffix":"_dt0"},"m":{"id":"acquirer01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-acquirer_ref01"}}],"index$":3}]}, 'Acquirer', {"POST /payments/acquirers":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"The name of the Acquirer."},"description":{"type":"string","description":"The description of the Acquirer."},"default":{"type":"boolean","description":"Specifies whether this Acquirer is the default. Only one default Acquirer configuration can exist at a time; setting a new one clears the previous default. If none is defined, the first Acquirer created becomes the default. See the [Acquirers API](/api#acquirers) for details."},"configurations":{"type":"array","description":"The Acquirer configurations. Configurations are set according to each card network the Acquirer is associated with, and each `network` can only appear once. To use a different `bin`, `acquirerMerchantIdentifier`, or `country` for the same network, create a separate Acquirer.","items":{"type":"object","properties":{"network":{"type":"string","enum":[],"description":"The card network of the Acquirer. `discover` covers Discover, Diners Club, and JCB (US only).","example":"mastercard"},"bin":{"type":"string","pattern":"^[0-9]{6,11}$","minLength":6,"maxLength":11,"description":"The Bank Identification Number (BIN) of the Acquirer. Must be 6 to 11 digits.","example":"424242"},"acquirerMerchantIdentifier":{"type":"string","description":"The merchant identifier associated with the configuration.","example":"38191048173"},"country":{"type":"string","format":"iso-3166-1-alpha-2","description":"The country of the Acquirer configuration, used when creating 3DS sessions.","example":"ie"}},"required":["network","bin","acquirerMerchantIdentifier","country"]}}},"required":["name","configurations"]}}}},"parameters":[]},"GET /payments/acquirers":{"protocol":"http","parameters":[{"name":"page","in":"query","description":"The page number to retrieve.","required":false,"schema":{"type":"integer","default":0},"index$":0},{"name":"pageSize","in":"query","description":"The number of Acquirers to retrieve per page. The default is 50, which is also the maximum.","required":false,"schema":{"type":"integer","default":50,"maximum":50},"index$":1}]},"GET /payments/acquirers/{acquirer_id}":{"protocol":"http","parameters":[{"name":"acquirer_id","in":"path","description":"The unique identifier of the Acquirer.","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /payments/acquirers/{acquirer_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"The name of the Acquirer.","key$":"name"},"description":{"type":"string","description":"The description of the Acquirer.","key$":"description"},"default":{"type":"boolean","description":"Specifies whether this Acquirer is the default. Only one default Acquirer configuration can exist at a time; setting a new one clears the previous default. See the [Acquirers API](/api#acquirers) for details.","key$":"default"},"configurations":{"type":"array","description":"The Acquirer configurations. Configurations are set according to each card network the Acquirer is associated with, and each `network` can only appear once. To use a different `bin`, `acquirerMerchantIdentifier`, or `country` for the same network, create a separate Acquirer.","items":{"type":"object","properties":{"network":{"type":"string","enum":[],"example":"mastercard","description":"The card network to use the configuration for. `discover` covers Discover, Diners Club, and JCB (US only)."},"bin":{"type":"string","pattern":"^[0-9]{6,11}$","minLength":6,"maxLength":11,"description":"The Bank Identification Number (BIN) of the acquirer. Must be 6 to 11 digits."},"acquirerMerchantIdentifier":{"type":"string","description":"The merchant identifier the configuration is associated with."},"country":{"type":"string","format":"iso-3166-1-alpha-2","example":"ie","description":"The country of the acquirer configuration, used when creating 3DS sessions."}},"required":["network"]},"key$":"configurations"}},"index$":1}}}},"parameters":[{"name":"acquirer_id","in":"path","description":"The id of the Acquirer to be updated.","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const acquirer_ref01_ent = client.Acquirer()
    let acquirer_ref01_data = setup.data.new.acquirer['acquirer_ref01']

    acquirer_ref01_data = (await acquirer_ref01_ent.create(acquirer_ref01_data)).data()
    assert(null != acquirer_ref01_data.id)


    // LIST
    const acquirer_ref01_match: any = {}

    const acquirer_ref01_list = (await acquirer_ref01_ent.list(acquirer_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(acquirer_ref01_list, { id: acquirer_ref01_data.id })))


    // UPDATE
    const acquirer_ref01_data_up0: any = {}
    acquirer_ref01_data_up0.id = acquirer_ref01_data.id

    const acquirer_ref01_markdef_up0 = { name: 'description', value: 'Mark01-acquirer_ref01_' + setup.now }
    ;(acquirer_ref01_data_up0 as any)[acquirer_ref01_markdef_up0.name] = acquirer_ref01_markdef_up0.value

    const acquirer_ref01_resdata_up0 = (await acquirer_ref01_ent.update(acquirer_ref01_data_up0)).data()
    assert(acquirer_ref01_resdata_up0.id === acquirer_ref01_data_up0.id)

    assert((acquirer_ref01_resdata_up0 as any)[acquirer_ref01_markdef_up0.name] === acquirer_ref01_markdef_up0.value)


    // LOAD
    const acquirer_ref01_match_dt0: any = {}
    acquirer_ref01_match_dt0.id = acquirer_ref01_data.id
    const acquirer_ref01_data_dt0 = (await acquirer_ref01_ent.load(acquirer_ref01_match_dt0)).data()
    assert(acquirer_ref01_data_dt0.id === acquirer_ref01_data.id)


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
      '../../../../.sdk/test/entity/acquirer/AcquirerTestData.json')

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
    ['acquirer01','acquirer02','acquirer03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EVERVAULT_TEST_ACQUIRER_ENTID': idmap,
    'EVERVAULT_TEST_LIVE': 'FALSE',
    'EVERVAULT_TEST_EXPLAIN': 'FALSE',
    'EVERVAULT_APIKEY': '',
    'EVERVAULT_SECRET': '',
  })

  idmap = env['EVERVAULT_TEST_ACQUIRER_ENTID']

  const live = 'TRUE' === env.EVERVAULT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EVERVAULT_TEST_ACQUIRER_ENTID']
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
  
