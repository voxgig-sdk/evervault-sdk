

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


describe('FunctionRunEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
  afterEach(liveDelay('EVERVAULT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EvervaultSDK.test()
    const ent = testsdk.FunctionRun()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = EvervaultSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.FunctionRun().create({"function_name":1,"payload":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'function_run.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"async":{"a":true,"h":"Async","n":"async","r":false,"sh":"If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code.","t":"`$BOOLEAN`","key$":"async","index$":0},"createdAt":{"a":true,"fo":"int64","h":"Created At","n":"createdAt","r":false,"sh":"The exact time, in epoch milliseconds, when this Function execution was triggered.","t":"`$INTEGER`","key$":"createdAt","index$":1},"error":{"a":true,"h":"Error","n":"error","r":false,"sh":"This field details any error that occurred during Function execution.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"error","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"A unique identifier representing this specific Function execution instance.","t":"`$STRING`","key$":"id","index$":3},"payload":{"a":true,"h":"Payload","n":"payload","r":true,"sh":"The data payload that the Function will use during its execution.","t":"`$OBJECT`","key$":"payload","index$":4},"result":{"a":true,"h":"Result","n":"result","r":false,"sh":"This field represents the output returned by the Function.","t":"`$OBJECT`","key$":"result","index$":5},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"The outcome of the Function execution.","t":"`$STRING`","key$":"status","index$":6}},"id":{"field":"id","name":"id"},"name":"function_run","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["async","payload"],"co":{"id":"POST /functions/{function_name}/runs","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"function_name","or":"function_name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/functions/{function_name}/runs","q":{"exist":["function_name"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"functions"},{"var":"function_name"},{"lit":"runs"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"function_run","name__orig":"function_run","Name":"FunctionRun","name_":"function_run","name-":"function-run","NAME":"FUNCTION_RUN","index$":7}, {"active":true,"entity":"function_run","key$":"BasicFunctionRunFlow","kind":"basic","name":"BasicFunctionRunFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"function_run_ref01"},"m":{"function_name":"function_name01"},"o":"create","s":[],"v":[],"index$":0}]}, 'FunctionRun', {"POST /functions/{function_name}/runs":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"payload":{"type":"object","description":"The data payload that the Function will use during its execution. Any encrypted values will be decrypted before being passed to the function.","example":{"name":"ev:debug:Tk9D:oVPHsPvwFHNk73DU:AglNWOgZekolcrxdxSpZJOusBgE+C9eWSapGIZkgTsUj:JKeSkdhVE9SCXqQINID4oBRCE/VhTb56VWGqyObP:$"},"key$":"payload"},"async":{"type":"boolean","description":"If you want your Function to run asynchronously and notify a callback URL, this can be set to `true` and the API will queue your Function run and return a `202` response code.","example":false,"key$":"async"}},"required":["payload"],"index$":1},"examples":{"SimpleExample":{"value":{"payload":{"name":"ev:Tk9D:oVPHsPvwFHNk73DU:AglNWOgZekolcrxdxSpZJOusBgE+C9eWSapGIZkgTsUj:JKeSkdhVE9SCXqQINID4oBRCE/VhTb56VWGqyObP:$"}}}}}}},"parameters":[{"name":"function_name","in":"path","description":"The name of the Function to be executed.","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const function_run_ref01_ent = client.FunctionRun()
    let function_run_ref01_data = setup.data.new.function_run['function_run_ref01']
    function_run_ref01_data['function_name'] = setup.idmap['function_name01']

    function_run_ref01_data = (await function_run_ref01_ent.create(function_run_ref01_data)).data()
    assert(null != function_run_ref01_data.id)


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
      '../../../../.sdk/test/entity/function_run/FunctionRunTestData.json')

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
    ['function_run01','function_run02','function_run03','function_name01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EVERVAULT_TEST_FUNCTION_RUN_ENTID': idmap,
    'EVERVAULT_TEST_LIVE': 'FALSE',
    'EVERVAULT_TEST_EXPLAIN': 'FALSE',
    'EVERVAULT_APIKEY': '',
    'EVERVAULT_SECRET': '',
  })

  idmap = env['EVERVAULT_TEST_FUNCTION_RUN_ENTID']

  const live = 'TRUE' === env.EVERVAULT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EVERVAULT_TEST_FUNCTION_RUN_ENTID']
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
  
