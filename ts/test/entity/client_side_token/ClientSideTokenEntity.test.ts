

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ClientSideTokenEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
  afterEach(liveDelay('EVERVAULT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EvervaultSDK.test()
    const ent = testsdk.ClientSideToken()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'client_side_token.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"action":{"a":true,"h":"Action","n":"action","r":true,"sh":"The action that the token should permit","t":"`$STRING`","key$":"action","index$":0},"expiry":{"a":true,"h":"Expiry","n":"expiry","r":false,"sh":"The expiry of the token in milliseconds format.","t":"`$INTEGER`","key$":"expiry","index$":1},"payload":{"a":true,"h":"Payload","n":"payload","r":false,"sh":"The payload that the token must be used with","t":"`$OBJECT`","key$":"payload","index$":2}},"name":"client_side_token","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /client-side-tokens","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/client-side-tokens","q":{},"r":{},"s":[{"lit":"client-side-tokens"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"client_side_token","name__orig":"client_side_token","Name":"ClientSideToken","name_":"client_side_token","name-":"client-side-token","NAME":"CLIENT_SIDE_TOKEN","index$":4}, {"active":true,"entity":"client_side_token","key$":"BasicClientSideTokenFlow","kind":"basic","name":"BasicClientSideTokenFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"client_side_token_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'ClientSideToken', {"POST /client-side-tokens":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","required":["action"],"properties":{"action":{"type":"string","enum":["api:decrypt"],"description":"The action that the token should permit","key$":"action"},"payload":{"type":"object","description":"The payload that the token must be used with","example":{"name":"ev:debug:Tk9D:OJzdN+H2FxM86+Oa:AuUCGfKH8yYkzUvg0EjFgBOI/95D3RDZp5nwz3f2eqwJ:Zg7lsCwr2liYQOkjaRI6mwHScyn4f/Y2cxlayglTTYk1VmmDxBa5:$"},"key$":"payload"},"expiry":{"type":"integer","description":"The expiry of the token in milliseconds format. Must be less than 10 minutes from now.","example":1619712000000,"key$":"expiry"}},"index$":1},"examples":{"Decrypt":{"value":{"action":"api:decrypt","payload":{"phoneNumber":"ev:Tk9D:GWgxSXezEFNw10b/:A6JZWe29uiZpP72w+nc0RXOdWdvgCulNqJv8aJpLE/gH:3V/PD54obBv0j+EJMaNNa/ny2tmZq7QM:$"}}}}}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const client_side_token_ref01_ent = client.ClientSideToken()
    let client_side_token_ref01_data = setup.data.new.client_side_token['client_side_token_ref01']

    client_side_token_ref01_data = (await client_side_token_ref01_ent.create(client_side_token_ref01_data)).data()
    assert(null != client_side_token_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/client_side_token/ClientSideTokenTestData.json')

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
    ['client_side_token01','client_side_token02','client_side_token03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EVERVAULT_TEST_CLIENT_SIDE_TOKEN_ENTID': idmap,
    'EVERVAULT_TEST_LIVE': 'FALSE',
    'EVERVAULT_TEST_EXPLAIN': 'FALSE',
    'EVERVAULT_APIKEY': '',
    'EVERVAULT_SECRET': '',
  })

  idmap = env['EVERVAULT_TEST_CLIENT_SIDE_TOKEN_ENTID']

  const live = 'TRUE' === env.EVERVAULT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EVERVAULT_TEST_CLIENT_SIDE_TOKEN_ENTID']
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
  
