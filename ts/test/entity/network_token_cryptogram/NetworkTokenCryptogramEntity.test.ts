

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"createdAt","req":false,"type":"`$INTEGER`","index$":0},{"active":true,"name":"cryptogram","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2}],"id":{"field":"id","name":"id"},"name":"network_token_cryptogram","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"network_token_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /payments/network-tokens/{network_token_id}/cryptograms","json":"{\"operationId\":\"createNetworkTokenCryptogram\",\"parameters\":[{\"description\":\"The unique identifier of the Network Token.\",\"in\":\"path\",\"name\":\"network_token_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"201\":{\"content\":{\"application/json\":{\"examples\":{\"SuccessfulCreation\":{\"summary\":\"Network Token Cryptogram created\",\"value\":{\"createdAt\":1692972623233,\"cryptogram\":\"NTk0ZjM5M2QyNDMwNDE1MjkzMjg1ZTg5Y2NiZjdmNjE=\",\"id\":\"network_token_cryptogram_eead1d640d7c\"}}},\"schema\":{\"properties\":{\"createdAt\":{\"description\":\"The exact time, in epoch milliseconds, when this Network Token Cryptogram was created.\",\"example\":1692972623233,\"format\":\"int64\",\"type\":\"integer\"},\"cryptogram\":{\"description\":\"The value of the Network Token Cryptogram. This is the value that is used embedded in the Authorization request.\",\"example\":\"NTk0ZjM5M2QyNDMwNDE1MjkzMjg1ZTg5Y2NiZjdmNjE=\",\"type\":\"string\"},\"id\":{\"description\":\"A unique identifier representing a specific Network Token Cryptogram.\",\"example\":\"network_token_cryptogram_eead1d640d7c\",\"type\":\"string\"}},\"required\":[\"id\",\"cryptogram\",\"createdAt\"],\"type\":\"object\"}}},\"description\":\"Returns a Network Token Cryptogram object.\"}},\"security\":[{\"ApiKey\":[\"networkToken:createCryptogram\"]}],\"securitySchemes\":{\"ApiKey\":{\"description\":\"Authentication using an API key. The username is the App ID and the password is the Api Key.\",\"scheme\":\"basic\",\"type\":\"http\"},\"ClientSideToken\":{\"bearerFormat\":\"Token\",\"description\":\"Authentication using a short lived token that you can share with clients. The Authorization header must be formatted as follow: \\\"Token <Client-Side Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"},\"TokenAuth\":{\"bearerFormat\":\"RunToken\",\"description\":\"Authentication using a short lived run token that you can share with clients. The Authorization header must be formatted as follow: \\\"RunToken <Function Run Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/payments/network-tokens/{network_token_id}/cryptograms","rename":{"param":{"network_token_id":"id"}},"segments":[{"lit":"payments"},{"lit":"network-tokens"},{"var":"id"},{"lit":"cryptograms"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"network_token_cryptogram","name__orig":"network_token_cryptogram","Name":"NetworkTokenCryptogram","name_":"network_token_cryptogram","name-":"network-token-cryptogram","NAME":"NETWORK_TOKEN_CRYPTOGRAM","index$":10}, {"active":true,"entity":"network_token_cryptogram","key$":"BasicNetworkTokenCryptogramFlow","kind":"basic","name":"BasicNetworkTokenCryptogramFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"network_token_cryptogram_ref01"},"match":{"network_token_id":"network_token01"},"op":"create","spec":[],"valid":[],"index$":0}]}, 'NetworkTokenCryptogram')
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
    ['network_token_cryptogram01','network_token_cryptogram02','network_token_cryptogram03'],
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
  
