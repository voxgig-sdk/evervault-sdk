

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


describe('CardArtEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
  afterEach(liveDelay('EVERVAULT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EvervaultSDK.test()
    const ent = testsdk.CardArt()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'card_art.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":true,"sh":"The base64-encoded image data of the card art.","t":"`$STRING`","key$":"data","index$":0},"height":{"a":true,"h":"Height","n":"height","r":true,"sh":"The height of the card art image in pixels.","t":"`$INTEGER`","key$":"height","index$":1},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"The MIME type of the card art image.","t":"`$STRING`","key$":"type","index$":2},"width":{"a":true,"h":"Width","n":"width","r":true,"sh":"The width of the card art image in pixels.","t":"`$INTEGER`","key$":"width","index$":3}},"name":"card_art","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /payments/network-tokens/{network_token_id}/card-art","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"network_token_id","or":"network_token_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/payments/network-tokens/{network_token_id}/card-art","q":{"exist":["network_token_id"]},"r":{},"s":[{"lit":"payments"},{"lit":"network-tokens"},{"var":"network_token_id"},{"lit":"card-art"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.network_token"]]},"key$":"card_art","name__orig":"card_art","Name":"CardArt","name_":"card_art","name-":"card-art","NAME":"CARD_ART","index$":3}, {"active":true,"entity":"card_art","key$":"BasicCardArtFlow","kind":"basic","name":"BasicCardArtFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"card_art_ref01","srcdatavar":"card_art_ref01_data","suffix":"_dt0"},"m":{"id":"card_art01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-card_art_ref01"}}],"index$":0}]}, 'CardArt', {"GET /payments/network-tokens/{network_token_id}/card-art":{"protocol":"http","parameters":[{"name":"network_token_id","in":"path","description":"The unique identifier of the Network Token.","required":true,"schema":{"type":"string"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let card_art_ref01_data = Object.values(setup.data.existing.card_art)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const card_art_ref01_ent = client.CardArt()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/card_art/CardArtTestData.json')

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
    ['card_art01','card_art02','card_art03','network_token01','network_token02','network_token03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EVERVAULT_TEST_CARD_ART_ENTID': idmap,
    'EVERVAULT_TEST_LIVE': 'FALSE',
    'EVERVAULT_TEST_EXPLAIN': 'FALSE',
    'EVERVAULT_APIKEY': '',
    'EVERVAULT_SECRET': '',
  })

  idmap = env['EVERVAULT_TEST_CARD_ART_ENTID']

  const live = 'TRUE' === env.EVERVAULT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EVERVAULT_TEST_CARD_ART_ENTID']
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
  
