

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


describe('CardEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
  afterEach(liveDelay('EVERVAULT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EvervaultSDK.test()
    const ent = testsdk.Card()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = EvervaultSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Card().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'card.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address":{"a":true,"h":"Address","n":"address","r":true,"sh":"Details about the cardholder's address that the address verification (AVS) is for.","t":"`$OBJECT`","key$":"address","index$":0},"automaticUpdates":{"a":true,"h":"Automatic Updates","n":"automaticUpdates","r":false,"sh":"The status of Card Account Updater on this card.","t":"`$STRING`","key$":"automaticUpdates","index$":1},"bin":{"a":true,"h":"Bin","n":"bin","r":true,"sh":"The first 6 or 8 digits of the card number.","t":"`$STRING`","key$":"bin","index$":2},"brand":{"a":true,"h":"Brand","n":"brand","r":false,"sh":"The card brand associated with the payment card.","t":"`$STRING`","key$":"brand","index$":3},"card":{"a":true,"h":"Card","n":"card","r":true,"sh":"The card details.","t":"`$OBJECT`","key$":"card","index$":4},"cardholder":{"a":true,"h":"Cardholder","n":"cardholder","r":false,"sh":"Details about the cardholder that the name verification (ANI) is for.","t":"`$OBJECT`","key$":"cardholder","index$":5},"country":{"a":true,"fo":"iso-3166-1-alpha-2","h":"Country","n":"country","r":false,"sh":"The country where the card was issued.","t":"`$STRING`","key$":"country","index$":6},"createdAt":{"a":true,"h":"Created At","n":"createdAt","r":true,"sh":"The Unix timestamp of when the card was created.","t":"`$INTEGER`","key$":"createdAt","index$":7},"currency":{"a":true,"fo":"iso-4217-alphabetic","h":"Currency","n":"currency","r":false,"sh":"The currency of the card.","t":"`$STRING`","key$":"currency","index$":8},"expiry":{"a":true,"h":"Expiry","n":"expiry","r":true,"sh":"The expiry date of the card.","t":"`$OBJECT`","key$":"expiry","index$":9},"extensions":{"a":true,"h":"Extensions","n":"extensions","r":false,"sh":"The extensions to the card insight request.","t":"`$ARRAY`","key$":"extensions","index$":10},"funding":{"a":true,"h":"Funding","n":"funding","r":false,"sh":"The card funding type specifies the method by which transactions are financed.","t":"`$STRING`","key$":"funding","index$":11},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"The unique identifier for the card.","t":"`$STRING`","key$":"id","index$":12},"issuer":{"a":true,"h":"Issuer","n":"issuer","r":false,"sh":"The name of the card issuer.","t":"`$STRING`","key$":"issuer","index$":13},"lastFour":{"a":true,"h":"Last Four","n":"lastFour","r":true,"sh":"The last 4 digits of the card number.","t":"`$STRING`","key$":"lastFour","index$":14},"number":{"a":true,"h":"Number","n":"number","r":true,"sh":"The Evervault encrypted card number.","t":"`$STRING`","key$":"number","index$":15},"replacement":{"a":true,"h":"Replacement","n":"replacement","r":false,"sh":"The ID of the replacement card.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"replacement","index$":16},"segment":{"a":true,"h":"Segment","n":"segment","r":false,"sh":"The card segment indicates the primary market or usage category of the card.","t":"`$STRING`","key$":"segment","index$":17},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"The current status of the card.","t":"`$STRING`","key$":"status","index$":18},"updatedAt":{"a":true,"h":"Updated At","n":"updatedAt","r":false,"sh":"The Unix timestamp of when the card was last updated.","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"updatedAt","index$":19}},"id":{"field":"id","name":"id"},"name":"card","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["expiry","number","updateType"],"co":{"id":"POST /payments/cards/{card_id}/simulate","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"card_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/payments/cards/{card_id}/simulate","q":{"$action":"simulate","exist":["id"]},"r":{"param":{"card_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"payments"},{"lit":"cards"},{"var":"id"},{"lit":"simulate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["address","card","cardholder","extensions"],"co":{"id":"POST /insights/cards","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/insights/cards","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"insights"},{"lit":"cards"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["expiry","number"],"co":{"id":"POST /payments/cards","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/payments/cards","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"payments"},{"lit":"cards"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /payments/cards/{card_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"card_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/payments/cards/{card_id}","q":{"exist":["id"]},"r":{"param":{"card_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"payments"},{"lit":"cards"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"card","name__orig":"card","Name":"Card","name_":"card","name-":"card","NAME":"CARD","index$":2}, {"active":true,"entity":"card","key$":"BasicCardFlow","kind":"basic","name":"BasicCardFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"card_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"card_ref01","srcdatavar":"card_ref01_data","suffix":"_dt0"},"m":{"id":"card01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-card_ref01"}}],"index$":1}]}, 'Card', {"POST /payments/cards/{card_id}/simulate":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"The request body for simulating a card update differs depending on the type of event you want to simulate.","oneOf":[{"type":"object","description":"New account number","properties":{"updateType":{"type":"string","description":"The type of update to simulate.","enum":["new-account-number"]},"expiry":{"type":"object","properties":{"month":{},"year":{}},"required":["month","year"],"x-ref":"#/components/schemas/CardExpiry"},"number":{"type":"string","description":"The card number. Can be clear-text or an Evervault encrypted string.","example":"4242424242424242"}},"required":["updateType"],"x-ref":"#/components/schemas/CauNanUpdate"},{"type":"object","description":"New expiry date","properties":{"updateType":{"type":"string","description":"The type of update to simulate.","enum":["new-expiry-date"]},"expiry":{"type":"object","properties":{"month":{},"year":{}},"required":["month","year"],"x-ref":"#/components/schemas/CardExpiry"}},"required":["updateType"],"x-ref":"#/components/schemas/CauNedUpdate"},{"type":"object","description":"Account closure","properties":{"updateType":{"type":"string","description":"The type of update to simulate.","enum":["account-closure"]}},"required":["updateType"],"x-ref":"#/components/schemas/CauAclUpdate"}]},"examples":{"NewAccountNumberExample":{"value":{"updateType":"new-account-number","number":"4242424242424242","expiry":{"month":"09","year":"26"}}},"NewExpiryDateExample":{"value":{"updateType":"new-expiry-date","expiry":{"month":"09","year":"26"}}},"AccountClosureExample":{"value":{"updateType":"account-closure"}}}}}},"parameters":[{"name":"card_id","in":"path","description":"The id of the Card","required":true,"schema":{"type":"string"},"index$":0}]},"POST /insights/cards":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"card":{"type":"object","description":"The card details.","properties":{"number":{"type":"string","description":"The card number. This should be a valid Evervault encrypted card number or a valid plaintext card number.","example":"4111111111111111"},"expiry":{"type":"object","description":"The card expiry. Required if the `address`, `cardholder`, or `cvv` extensions are requested.","properties":{"month":{},"year":{}}},"cvv":{"type":"string","description":"The card security code. This should be a valid Evervault encrypted CVV or a valid plaintext CVV. Required if the `cvv` extension is requested.","example":"123"}},"required":["number"],"key$":"card"},"extensions":{"type":"array","description":"The extensions to the card insight request.","items":{"type":"string","description":"The extensions","enum":["capabilities","cvv","cardholder","address"],"x-enum-description":{"capabilities":"Check the card's push and pull transaction capabilities","cvv":"Check the card's CVV verification","cardholder":"Check the cardholder's name verification","address":"Check the cardholder's address verification"}},"key$":"extensions"},"cardholder":{"type":"object","description":"Details about the cardholder that the name verification (ANI) is for. Required if the `cardholder` extension is requested.","properties":{"firstName":{"type":"string","description":"The first name of the cardholder","example":"John"},"lastName":{"type":"string","description":"The last name of the cardholder","example":"Doe"}},"key$":"cardholder"},"address":{"type":"object","description":"Details about the cardholder's address that the address verification (AVS) is for. Required if the `address` extension is requested.","properties":{"postalCode":{"type":"string","description":"The ZIP or postal code.","example":"10001"},"line1":{"type":"string","description":"Street address line 1","example":"123 Main Street"},"line2":{"type":"string","description":"Street address line 2","example":"Apt 4B"},"city":{"type":"string","description":"The city name","example":"New York"},"state":{"type":"string","description":"The state or province code. Required when `country` is `us`, `ca`, or `au`.","format":"iso-3166-2-subdivision","example":"ny"},"country":{"type":"string","description":"The country code.","format":"iso-3166-1-alpha-2","example":"us"}},"required":["postalCode"],"key$":"address"}},"required":["card"],"index$":1},"examples":{"SimpleExample":{"value":{"card":{"number":"4111111111111111","expiry":{"month":"09","year":"29"},"cvv":"123"},"extensions":["capabilities","cvv","address","cardholder"],"cardholder":{"firstName":"John","lastName":"Doe"},"address":{"postalCode":"10001","line1":"123 Main Street","line2":"Apt 4B","city":"New York","state":"ny","country":"us"}}}}}}},"parameters":[]},"POST /payments/cards":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"number":{"type":"string","description":"The card number. This should be a valid Evervault encrypted card number or a valid plaintext card number.","example":"4242424242424242","key$":"number"},"expiry":{"type":"object","properties":{"month":{"type":"string","description":"The card expiry month, in MM format (e.g. 12 for December)","example":"09"},"year":{"type":"string","description":"The card expiry year, in YY format (e.g. 26 for 2026)","example":"26"}},"required":["month","year"],"x-ref":"#/components/schemas/CardExpiry","key$":"expiry"}},"required":["number","expiry"],"index$":1},"examples":{"EvervaultEncryptedExample":{"value":{"number":"ev:debug:Tk9D:number:nTepvAI585M7lUVp:AkJ6Brzat0E7ui8DSKCSXO7AopU/+GFuBekQ6cGx7eTl:sfihK53itmHp+URxomnTITUpwQwM5nnRrnQ0qdIOUlA=:$","expiry":{"month":"09","year":"26"}}},"PlaintextCardExample":{"value":{"number":"4242424242424242","expiry":{"month":"09","year":"26"}}}}}}},"parameters":[]},"GET /payments/cards/{card_id}":{"protocol":"http","parameters":[{"name":"card_id","in":"path","description":"The unique identifier of the Card.","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const card_ref01_ent = client.Card()
    let card_ref01_data = setup.data.new.card['card_ref01']

    card_ref01_data = (await card_ref01_ent.create(card_ref01_data)).data()
    assert(null != card_ref01_data.id)


    // LOAD
    const card_ref01_match_dt0: any = {}
    card_ref01_match_dt0.id = card_ref01_data.id
    const card_ref01_data_dt0 = (await card_ref01_ent.load(card_ref01_match_dt0)).data()
    assert(card_ref01_data_dt0.id === card_ref01_data.id)


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
      '../../../../.sdk/test/entity/card/CardTestData.json')

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
    ['card01','card02','card03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EVERVAULT_TEST_CARD_ENTID': idmap,
    'EVERVAULT_TEST_LIVE': 'FALSE',
    'EVERVAULT_TEST_EXPLAIN': 'FALSE',
    'EVERVAULT_APIKEY': '',
    'EVERVAULT_SECRET': '',
  })

  idmap = env['EVERVAULT_TEST_CARD_ENTID']

  const live = 'TRUE' === env.EVERVAULT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EVERVAULT_TEST_CARD_ENTID']
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
  
