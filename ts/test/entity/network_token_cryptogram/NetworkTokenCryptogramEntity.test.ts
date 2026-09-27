

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


describe('NetworkTokenCryptogramEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
  afterEach(liveDelay('EVERVAULT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EvervaultSDK.test()
    const ent = testsdk.NetworkTokenCryptogram()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'network_token_cryptogram.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"h":"Created At","n":"createdAt","r":false,"t":"`$INTEGER`","key$":"createdAt","index$":0},"cryptogram":{"a":true,"h":"Cryptogram","n":"cryptogram","r":false,"t":"`$STRING`","key$":"cryptogram","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2}},"id":{"field":"id","name":"id"},"name":"network_token_cryptogram","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /payments/network-tokens/{network_token_id}/cryptograms","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"network_token_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/payments/network-tokens/{network_token_id}/cryptograms","q":{"exist":["id"]},"r":{"param":{"network_token_id":"id"}},"s":[{"lit":"payments"},{"lit":"network-tokens"},{"var":"id"},{"lit":"cryptograms"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"network_token_cryptogram","name__orig":"network_token_cryptogram","Name":"NetworkTokenCryptogram","name_":"network_token_cryptogram","name-":"network-token-cryptogram","NAME":"NETWORK_TOKEN_CRYPTOGRAM","index$":10}, {"active":true,"entity":"network_token_cryptogram","key$":"BasicNetworkTokenCryptogramFlow","kind":"basic","name":"BasicNetworkTokenCryptogramFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"network_token_cryptogram_ref01"},"m":{"network_token_id":"network_token01"},"o":"create","s":[],"v":[],"index$":0}]}, 'NetworkTokenCryptogram', {"POST /payments/network-tokens/{network_token_id}/cryptograms":{"protocol":"http","parameters":[{"name":"network_token_id","in":"path","description":"The unique identifier of the Network Token.","required":true,"schema":{"type":"string"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const network_token_cryptogram_ref01_ent = client.NetworkTokenCryptogram()
    let network_token_cryptogram_ref01_data = setup.data.new.network_token_cryptogram['network_token_cryptogram_ref01']
    network_token_cryptogram_ref01_data['network_token_id'] = setup.idmap['network_token01']

    network_token_cryptogram_ref01_data = (await network_token_cryptogram_ref01_ent.create(network_token_cryptogram_ref01_data)).data()
    assert(null != network_token_cryptogram_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/network_token_cryptogram/NetworkTokenCryptogramTestData.json')

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
    ['network_token_cryptogram01','network_token_cryptogram02','network_token_cryptogram03','network_token01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EVERVAULT_TEST_NETWORK_TOKEN_CRYPTOGRAM_ENTID': idmap,
    'EVERVAULT_TEST_LIVE': 'FALSE',
    'EVERVAULT_TEST_EXPLAIN': 'FALSE',
    'EVERVAULT_APIKEY': '',
    'EVERVAULT_SECRET': '',
  })

  idmap = env['EVERVAULT_TEST_NETWORK_TOKEN_CRYPTOGRAM_ENTID']

  const live = 'TRUE' === env.EVERVAULT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EVERVAULT_TEST_NETWORK_TOKEN_CRYPTOGRAM_ENTID']
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
  
