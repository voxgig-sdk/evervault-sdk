

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


describe('BinLookupEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
  afterEach(liveDelay('EVERVAULT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EvervaultSDK.test()
    const ent = testsdk.BinLookup()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'bin_lookup.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"number":{"a":true,"h":"Number","n":"number","r":true,"sh":"The card number for which the BIN lookup is being requested.","t":"`$STRING`","key$":"number","index$":0}},"name":"bin_lookup","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /payments/bin-lookups","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/payments/bin-lookups","q":{},"r":{},"s":[{"lit":"payments"},{"lit":"bin-lookups"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"bin_lookup","name__orig":"bin_lookup","Name":"BinLookup","name_":"bin_lookup","name-":"bin-lookup","NAME":"BIN_LOOKUP","index$":1}, {"active":true,"entity":"bin_lookup","key$":"BasicBinLookupFlow","kind":"basic","name":"BasicBinLookupFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"bin_lookup_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'BinLookup', {"POST /payments/bin-lookups":{"protocol":"http","requestBody":{"description":"The BIN (Bank Identification Number) lookup request body, which includes the card number.\n","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"number":{"type":"string","description":"The card number for which the BIN lookup is being requested.\nIt can be a plaintext Card number (FPAN) / Network Token number (DPAN), an encrypted\nCard number / Network Token number or simply just a BIN (6-10 first digits of a Card Number) for range lookup.\n","key$":"number"}},"required":["number"],"index$":1},"examples":{"BinLookupExample":{"summary":"Example BIN lookup request","value":{"number":"4242424242424242"}}}}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const bin_lookup_ref01_ent = client.BinLookup()
    let bin_lookup_ref01_data = setup.data.new.bin_lookup['bin_lookup_ref01']

    bin_lookup_ref01_data = (await bin_lookup_ref01_ent.create(bin_lookup_ref01_data)).data()
    assert(null != bin_lookup_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/bin_lookup/BinLookupTestData.json')

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
    ['bin_lookup01','bin_lookup02','bin_lookup03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EVERVAULT_TEST_BIN_LOOKUP_ENTID': idmap,
    'EVERVAULT_TEST_LIVE': 'FALSE',
    'EVERVAULT_TEST_EXPLAIN': 'FALSE',
    'EVERVAULT_APIKEY': '',
    'EVERVAULT_SECRET': '',
  })

  idmap = env['EVERVAULT_TEST_BIN_LOOKUP_ENTID']

  const live = 'TRUE' === env.EVERVAULT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EVERVAULT_TEST_BIN_LOOKUP_ENTID']
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
  
