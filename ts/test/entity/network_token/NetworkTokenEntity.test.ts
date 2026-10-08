

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


describe('NetworkTokenEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
  afterEach(liveDelay('EVERVAULT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EvervaultSDK.test()
    const ent = testsdk.NetworkToken()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = EvervaultSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.NetworkToken().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'network_token.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"card":{"a":true,"h":"Card","n":"card","r":true,"sh":"The details of the underlying encrypted card.","t":"`$OBJECT`","key$":"card","index$":0},"createdAt":{"a":true,"fo":"int64","h":"Created At","n":"createdAt","r":true,"sh":"The exact time, in epoch milliseconds, when this Network Token was created.","t":"`$INTEGER`","key$":"createdAt","index$":1},"expiry":{"a":true,"h":"Expiry","n":"expiry","r":true,"sh":"The expiry details of the Network Token.","t":"`$OBJECT`","key$":"expiry","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"A unique identifier representing a specific Network Token.","t":"`$STRING`","key$":"id","index$":3},"merchant":{"a":true,"h":"Merchant","n":"merchant","r":true,"sh":"The unique identifier of the Merchant associated with this Network Token.","t":"`$STRING`","key$":"merchant","index$":4},"number":{"a":true,"h":"Number","n":"number","r":true,"sh":"The unique number of the Network Token.","t":"`$STRING`","key$":"number","index$":5},"paymentAccountReference":{"a":true,"h":"Payment Account Reference","n":"paymentAccountReference","r":false,"sh":"The unique identifier of the Payment Account associated with this Network Token.","t":"`$STRING`","key$":"paymentAccountReference","index$":6},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"The status of the Network Token.","t":"`$STRING`","key$":"status","index$":7},"tokenRequestorIdentifier":{"a":true,"h":"Token Requestor Identifier","n":"tokenRequestorIdentifier","r":true,"sh":"The identifier of the Token Requestor (TRID) that requested the Network Token.","t":"`$STRING`","key$":"tokenRequestorIdentifier","index$":8},"tokenServiceProvider":{"a":true,"h":"Token Service Provider","n":"tokenServiceProvider","r":true,"sh":"The Token Service Provider (TSP) that issued the Network Token.","t":"`$STRING`","key$":"tokenServiceProvider","index$":9},"updatedAt":{"a":true,"fo":"int64","h":"Updated At","n":"updatedAt","r":false,"sh":"The exact time, in epoch milliseconds, when this Network Token was last updated.","t":"`$INTEGER`","key$":"updatedAt","index$":10}},"id":{"field":"id","name":"id"},"name":"network_token","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["updateType"],"co":{"id":"POST /payments/network-tokens/{network_token_id}/simulate","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"network_token_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/payments/network-tokens/{network_token_id}/simulate","q":{"$action":"simulate","exist":["id"]},"r":{"param":{"network_token_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"payments"},{"lit":"network-tokens"},{"var":"id"},{"lit":"simulate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["card","merchant"],"co":{"id":"POST /payments/network-tokens","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/payments/network-tokens","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"payments"},{"lit":"network-tokens"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /payments/network-tokens/{network_token_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"network_token_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/payments/network-tokens/{network_token_id}","q":{"exist":["id"]},"r":{"param":{"network_token_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"payments"},{"lit":"network-tokens"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"network_token","name__orig":"network_token","Name":"NetworkToken","name_":"network_token","name-":"network-token","NAME":"NETWORK_TOKEN","index$":9}, {"active":true,"entity":"network_token","key$":"BasicNetworkTokenFlow","kind":"basic","name":"BasicNetworkTokenFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"network_token_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"network_token_ref01","srcdatavar":"network_token_ref01_data","suffix":"_dt0"},"m":{"id":"network_token01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-network_token_ref01"}}],"index$":1}]}, 'NetworkToken', {"POST /payments/network-tokens/{network_token_id}/simulate":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"updateType":{"type":"string","description":"The type of update to simulate.","enum":["new-token-status","new-card-expiry-and-last-four","new-token-expiry-and-number"]}}},"examples":{"NewTokenExpiryAndNumberExample":{"value":{"updateType":"new-token-expiry-and-number"}},"NewCardExpiryAndLastFourExample":{"value":{"updateType":"new-card-expiry-and-last-four"}},"NewTokenStatusExample":{"value":{"updateType":"new-token-status"}}}}}},"parameters":[{"name":"network_token_id","in":"path","description":"The id of the Network Token","required":true,"schema":{"type":"string"},"index$":0}]},"POST /payments/network-tokens":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"card":{"description":"The card to tokenize. Either an inline card object or the unique identifier of a Card created with the [Cards API](/api#cards).","oneOf":[{"type":"object","description":"An inline card object.","properties":{"number":{},"expiry":{},"cvc":{}},"required":["number","expiry"]},{"type":"string","description":"The unique identifier of a Card created with the [Cards API](/api#cards).","example":"card_eead1d640d7c"}],"key$":"card"},"merchant":{"type":"string","description":"The unique identifier of the Merchant previously created using the Evervault API. It denotes the Merchant to which the Network Token should be associated with.","example":"merchant_ddsaJsda9d86","key$":"merchant"}},"required":["card","merchant"],"index$":1},"examples":{"EvervaultEncryptedExample":{"value":{"card":{"number":"ev:debug:Tk9D:number:nTepvAI585M7lUVp:AkJ6Brzat0E7ui8DSKCSXO7AopU/+GFuBekQ6cGx7eTl:sfihK53itmHp+URxomnTITUpwQwM5nnRrnQ0qdIOUlA=:$","expiry":{"month":"09","year":"26"},"cvc":"ev:debug:Tk9D:number:2GW8Nk96yfb2UXcw:A4UOUDGNb16Q//uBYVPibmfJ2734IrvPAoVY+8PvGG0C:5jtAu8KN1HiPeCNqSDCKMapfpg==:$"},"merchant":"merchant_ddsaJsda9d86"}},"PlaintextCardExample":{"value":{"card":{"number":"4242424242424242","expiry":{"month":"09","year":"26"},"cvc":"123"},"merchant":"merchant_ddsaJsda9d86"}}}}}},"parameters":[]},"GET /payments/network-tokens/{network_token_id}":{"protocol":"http","parameters":[{"name":"network_token_id","in":"path","description":"The unique identifier of the Network Token.","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const network_token_ref01_ent = client.NetworkToken()
    let network_token_ref01_data = setup.data.new.network_token['network_token_ref01']

    network_token_ref01_data = (await network_token_ref01_ent.create(network_token_ref01_data)).data()
    assert(null != network_token_ref01_data.id)


    // LOAD
    const network_token_ref01_match_dt0: any = {}
    network_token_ref01_match_dt0.id = network_token_ref01_data.id
    const network_token_ref01_data_dt0 = (await network_token_ref01_ent.load(network_token_ref01_match_dt0)).data()
    assert(network_token_ref01_data_dt0.id === network_token_ref01_data.id)


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
      '../../../../.sdk/test/entity/network_token/NetworkTokenTestData.json')

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
    ['network_token01','network_token02','network_token03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EVERVAULT_TEST_NETWORK_TOKEN_ENTID': idmap,
    'EVERVAULT_TEST_LIVE': 'FALSE',
    'EVERVAULT_TEST_EXPLAIN': 'FALSE',
    'EVERVAULT_APIKEY': '',
    'EVERVAULT_SECRET': '',
  })

  idmap = env['EVERVAULT_TEST_NETWORK_TOKEN_ENTID']

  const live = 'TRUE' === env.EVERVAULT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EVERVAULT_TEST_NETWORK_TOKEN_ENTID']
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
  
