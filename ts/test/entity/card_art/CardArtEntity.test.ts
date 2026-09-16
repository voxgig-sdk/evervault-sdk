

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"data","req":true,"short":"The base64-encoded image data of the card art.","type":"`$STRING`","index$":0},{"active":true,"name":"height","req":true,"short":"The height of the card art image in pixels.","type":"`$INTEGER`","index$":1},{"active":true,"name":"type","req":true,"short":"The MIME type of the card art image.","type":"`$STRING`","index$":2},{"active":true,"name":"width","req":true,"short":"The width of the card art image in pixels.","type":"`$INTEGER`","index$":3}],"name":"card_art","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"network_token_id","orig":"network_token_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /payments/network-tokens/{network_token_id}/card-art","json":"{\"operationId\":\"getCardArt\",\"parameters\":[{\"description\":\"The unique identifier of the Network Token.\",\"in\":\"path\",\"name\":\"network_token_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"SuccessfulRetrieval\":{\"summary\":\"Successful Retrieval\",\"value\":{\"data\":\"dGhlIGJhc2U2NCBlbmNvZGVkIGltYWdlIGRhdGE=\",\"height\":969,\"type\":\"image/png\",\"width\":1536}}},\"schema\":{\"properties\":{\"data\":{\"description\":\"The base64-encoded image data of the card art.\",\"example\":\"dGhlIGJhc2U2NCBlbmNvZGVkIGltYWdlIGRhdGE=\",\"type\":\"string\"},\"height\":{\"description\":\"The height of the card art image in pixels.\",\"example\":969,\"type\":\"integer\"},\"type\":{\"description\":\"The MIME type of the card art image.\",\"example\":\"image/png\",\"type\":\"string\"},\"width\":{\"description\":\"The width of the card art image in pixels.\",\"example\":1536,\"type\":\"integer\"}},\"required\":[\"type\",\"data\",\"width\",\"height\"],\"type\":\"object\"}}},\"description\":\"Returns the card art for the Network Token.\"}},\"security\":[{\"ApiKey\":[\"networkToken:read\"]}],\"securitySchemes\":{\"ApiKey\":{\"description\":\"Authentication using an API key. The username is the App ID and the password is the Api Key.\",\"scheme\":\"basic\",\"type\":\"http\"},\"ClientSideToken\":{\"bearerFormat\":\"Token\",\"description\":\"Authentication using a short lived token that you can share with clients. The Authorization header must be formatted as follow: \\\"Token <Client-Side Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"},\"TokenAuth\":{\"bearerFormat\":\"RunToken\",\"description\":\"Authentication using a short lived run token that you can share with clients. The Authorization header must be formatted as follow: \\\"RunToken <Function Run Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/payments/network-tokens/{network_token_id}/card-art","segments":[{"lit":"payments"},{"lit":"network-tokens"},{"var":"network_token_id"},{"lit":"card-art"}],"select":{"exist":["network_token_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["network_token"]]},"key$":"card_art","name__orig":"card_art","Name":"CardArt","name_":"card_art","name-":"card-art","NAME":"CARD_ART","index$":3}, {"active":true,"entity":"card_art","key$":"BasicCardArtFlow","kind":"basic","name":"BasicCardArtFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"card_art_ref01","srcdatavar":"card_art_ref01_data","suffix":"_dt0"},"match":{"id":"card_art01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-card_art_ref01"}}],"index$":0}]}, 'CardArt')
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
  
