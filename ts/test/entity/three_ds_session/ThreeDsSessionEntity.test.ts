

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


describe('ThreeDsSessionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
  afterEach(liveDelay('EVERVAULT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EvervaultSDK.test()
    const ent = testsdk.ThreeDsSession()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = EvervaultSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ThreeDsSession().load({"3ds_session_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'three_ds_session.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"accessControlServer":{"a":true,"h":"Access Control Server","n":"accessControlServer","r":false,"sh":"Details about the Access Control Server involved in the 3DS transaction.","t":"`$OBJECT`","key$":"accessControlServer","index$":0},"acquirer":{"a":true,"h":"Acquirer","n":"acquirer","op":{"create":{"req":false,"type":"`$ANY`"}},"r":true,"sh":"The acquirer of the payment.","t":"`$OBJECT`","key$":"acquirer","index$":1},"ares":{"a":true,"h":"Ares","n":"ares","r":false,"sh":"The details of the 3DS Authentication Response (ARes).","t":"`$OBJECT`","key$":"ares","index$":2},"authentication":{"a":true,"h":"Authentication","n":"authentication","r":true,"sh":"The details of the 3DS Authentication.","t":"`$OBJECT`","key$":"authentication","index$":3},"card":{"a":true,"h":"Card","n":"card","r":true,"sh":"The card details.","t":"`$OBJECT`","key$":"card","index$":4},"challenge":{"a":true,"h":"Challenge","n":"challenge","r":true,"sh":"Details about the 3DS challenge.","t":"`$OBJECT`","key$":"challenge","index$":5},"createdAt":{"a":true,"fo":"int64","h":"Created At","n":"createdAt","r":true,"sh":"The exact time, in epoch milliseconds, when this 3DS-Session was created.","t":"`$INTEGER`","key$":"createdAt","index$":6},"cres":{"a":true,"h":"Cres","n":"cres","r":false,"sh":"The details of the 3DS Challenge Response (CRes).","t":["`$ONE`",["`$NULL`","`$OBJECT`"]],"key$":"cres","index$":7},"cryptogram":{"a":true,"h":"Cryptogram","n":"cryptogram","r":false,"sh":"The 3DS cryptogram (also called Authentication Value).","t":"`$STRING`","key$":"cryptogram","index$":8},"customer":{"a":true,"h":"Customer","n":"customer","r":false,"sh":"The details of the customer who initiated the transaction.","t":"`$OBJECT`","key$":"customer","index$":9},"directoryServer":{"a":true,"h":"Directory Server","n":"directoryServer","r":false,"sh":"Details about the Directory Server involved in the 3DS transaction.","t":"`$OBJECT`","key$":"directoryServer","index$":10},"eci":{"a":true,"h":"Eci","n":"eci","r":false,"sh":"The details of the Electronic Commerce Indicator.","t":"`$OBJECT`","key$":"eci","index$":11},"failureReason":{"a":true,"h":"Failure Reason","n":"failureReason","r":false,"sh":"The reason for the 3DS Authentication failure.","t":"`$STRING`","key$":"failureReason","index$":12},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"A unique identifier assigned to each 3DS Authentication.","t":"`$STRING`","key$":"id","index$":13},"initiator":{"a":true,"h":"Initiator","n":"initiator","r":false,"sh":"Details about the transaction initiation process.","t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":0},"key$":"initiator","index$":14},"merchant":{"a":true,"h":"Merchant","n":"merchant","r":true,"sh":"The merchant details.","t":"`$OBJECT`","key$":"merchant","index$":15},"nextAction":{"a":true,"h":"Next Action","n":"nextAction","r":true,"sh":"The next action required to complete the 3DS Authentication.","t":"`$OBJECT`","key$":"nextAction","index$":16},"payment":{"a":true,"h":"Payment","n":"payment","r":false,"sh":"The payment details of the 3D Secure Authentication.","t":"`$OBJECT`","union":{"branches":3,"count":1,"depth":0},"key$":"payment","index$":17},"preferredVersions":{"a":true,"h":"Preferred Versions","n":"preferredVersions","r":false,"sh":"A prioritized list of preferred 3D Secure versions.","t":"`$ARRAY`","key$":"preferredVersions","index$":18},"rreq":{"a":true,"h":"Rreq","n":"rreq","r":false,"sh":"The result of the 3DS authentication when a challenge has occurred.","t":["`$ONE`",["`$NULL`","`$OBJECT`"]],"key$":"rreq","index$":19},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"The status of the 3DS Authentication.","t":"`$STRING`","key$":"status","index$":20},"threeDSServer":{"a":true,"h":"Three Ds Server","n":"threeDSServer","r":false,"sh":"Details about the 3DS Server involved in the 3DS transaction.","t":"`$OBJECT`","key$":"threeDSServer","index$":21},"updatedAt":{"a":true,"fo":"int64","h":"Updated At","n":"updatedAt","r":false,"sh":"The exact time, in epoch milliseconds, when this 3DS-Session was last updated.","t":"`$INTEGER`","key$":"updatedAt","index$":22},"version":{"a":true,"h":"Version","n":"version","r":true,"sh":"The 3D Secure version used to authenticate the session.","t":"`$STRING`","key$":"version","index$":23}},"id":{"field":"id","name":"id"},"name":"three_ds_session","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["acquirer","card","challenge","customer","initiator","merchant","payment","preferredVersions"],"co":{"id":"POST /payments/3ds-sessions","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/payments/3ds-sessions","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"payments"},{"lit":"3ds-sessions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /payments/3ds-sessions/{3ds_session_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"3ds_session_id","or":"3ds_session_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/payments/3ds-sessions/{3ds_session_id}","q":{"exist":["3ds_session_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"payments"},{"lit":"3ds-sessions"},{"var":"3ds_session_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"three_ds_session","name__orig":"three_ds_session","Name":"ThreeDsSession","name_":"three_ds_session","name-":"three-ds-session","NAME":"THREE_DS_SESSION","index$":13}, {"active":true,"entity":"three_ds_session","key$":"BasicThreeDsSessionFlow","kind":"basic","name":"BasicThreeDsSessionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"three_ds_session_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":false,"d":{},"i":{"ref":"three_ds_session_ref01","srcdatavar":"three_ds_session_ref01_data","suffix":"_dt0"},"m":{"id":"three_ds_session01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-three_ds_session_ref01"}}],"unreachable":true}]}, 'ThreeDsSession', {"POST /payments/3ds-sessions":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"merchant":{"description":"The merchant details. Either an inline merchant object or the unique identifier of a Merchant created with the [Merchants API](/api#merchants).","oneOf":[{"type":"object","description":"An inline merchant object.","properties":{"name":{},"website":{},"categoryCode":{},"country":{}},"required":["name","website","categoryCode","country"]},{"type":"string","description":"The unique identifier of a Merchant created with the [Merchants API](/api#merchants).","example":"merchant_eead1d640d7c"}],"key$":"merchant"},"card":{"description":"The card details. Either an inline card object or the unique identifier of a Card created with the [Cards API](/api#cards).","oneOf":[{"type":"object","description":"An inline card object.","properties":{"number":{},"expiry":{}},"required":["number","expiry"]},{"type":"string","description":"The unique identifier of a Card created with the [Cards API](/api#cards).","example":"card_eead1d640d7c"}],"key$":"card"},"acquirer":{"description":"The acquirer details to use for the 3DS session. Either an inline acquirer object or the unique identifier of an acquirer created with the [Acquirers API](/api#acquirers). If omitted, Evervault resolves the default acquirer configuration for the card's network.\n","oneOf":[{"type":"object","description":"The acquirer of the payment.","properties":{"bin":{},"merchantIdentifier":{},"country":{}},"required":["bin","merchantIdentifier","country"],"x-ref":"#/components/schemas/Acquirer"},{"type":"string","description":"The unique identifier of an acquirer created with the [Acquirers API](/api#acquirers).","example":"acquirer_adk3kdljc3"}],"key$":"acquirer"},"customer":{"type":"object","description":"The details of the customer who initiated the transaction.","properties":{"name":{"type":"string","description":"The name of the customer.","pattern":"^[a-zA-Z0-9 !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]{2,45}$","example":"Seamus Finnigan"},"phone":{"type":"array","description":"The phone number of the customer.","items":{"type":"object","properties":{},"required":[]}},"email":{"type":"string","format":"email","description":"The email address of the customer.","example":"seamus@hogwarts.edu"},"shipping":{"type":"object","description":"The shipping details of the customer.","properties":{"address":{}}},"billing":{"type":"object","description":"The billing details of the customer.","properties":{"address":{},"taxIdentifier":{}}}},"key$":"customer"},"payment":{"type":"object","description":"The payment details of the 3D Secure Authentication. This field is mandatory for transactions involving payment authentications but not required for non-payment authentications.","oneOf":[{"type":"object","summary":"One-Off Payment","description":"A payment that is made in a single transaction.","properties":{"type":{},"amount":{},"currency":{}},"required":["type","amount","currency"],"x-ref":"#/components/schemas/PaymentOneOff"},{"type":"object","summary":"Installment Payment","description":"A repeating payment for paying a total amount in multiple installments.","properties":{"type":{},"amount":{},"currency":{},"installments":{},"frequency":{},"expiry":{}},"required":["type","amount","currency","installments","frequency"],"x-ref":"#/components/schemas/PaymentInstallment"},{"type":"object","summary":"Recurring Payment","description":"A repeating payment with a regular interval.","properties":{"type":{},"amount":{},"currency":{},"frequency":{},"expiry":{}},"required":["type","amount","currency","frequency","expiry"],"x-ref":"#/components/schemas/PaymentRecurring"}],"key$":"payment"},"preferredVersions":{"type":"array","description":"A prioritized list of preferred 3D Secure versions. If the first version is not supported, the next version in the list is attempted. If no preferred version is provided, the most optimal version is selected. If none of the specified versions are supported by the issuer, the session fails.\n","items":{"type":"string","enum":["2.2.0"]},"key$":"preferredVersions"},"challenge":{"type":"object","description":"Details about the 3DS challenge.","properties":{"preference":{"type":"string","description":"The 3DS challenge preference.","enum":["no-preference","challenge-requested","challenge-mandated","no-challenge-requested"]},"reason":{"type":["null","string"],"description":"The reason for not requesting a challenge. This value should only be present when the preference is `no-challenge-requested`.","enum":[null,"data-sharing","low-value","low-risk","secure-corporate-payment","authentication-already-performed"]}},"required":["preference"],"x-ref":"#/components/schemas/ThreeDSChallenge","key$":"challenge"},"initiator":{"type":"object","description":"Details about the transaction initiation process.","oneOf":[{"type":"object","summary":"Customer-Initiated Transaction (CIT)","properties":{"type":{}}},{"type":"object","summary":"Merchant-Initiated Transaction (MIT)","properties":{"type":{},"reason":{},"initialSession":{}}}],"x-ref":"#/components/schemas/ThreeDSInitiator","key$":"initiator"}},"required":["card","merchant"],"index$":1},"examples":{"SimpleExample":{"value":{"merchant":{"name":"Ollivanders Wand Shop","website":"https://www.ollivanders.co.uk","categoryCode":"5945","country":"gb"},"card":{"number":"4242424242424242","expiry":{"month":"09","year":"26"}},"payment":{"type":"one-off","amount":1000,"currency":"eur"}}}}}}},"parameters":[]},"GET /payments/3ds-sessions/{3ds_session_id}":{"protocol":"http","parameters":[{"name":"3ds_session_id","in":"path","description":"The id of the session","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const three_ds_session_ref01_ent = client.ThreeDsSession()
    let three_ds_session_ref01_data = setup.data.new.three_ds_session['three_ds_session_ref01']

    three_ds_session_ref01_data = (await three_ds_session_ref01_ent.create(three_ds_session_ref01_data)).data()
    assert(null != three_ds_session_ref01_data.id)


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
      '../../../../.sdk/test/entity/three_ds_session/ThreeDsSessionTestData.json')

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
    ['three_ds_session01','three_ds_session02','three_ds_session03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EVERVAULT_TEST_THREE_DS_SESSION_ENTID': idmap,
    'EVERVAULT_TEST_LIVE': 'FALSE',
    'EVERVAULT_TEST_EXPLAIN': 'FALSE',
    'EVERVAULT_APIKEY': '',
    'EVERVAULT_SECRET': '',
  })

  idmap = env['EVERVAULT_TEST_THREE_DS_SESSION_ENTID']

  const live = 'TRUE' === env.EVERVAULT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EVERVAULT_TEST_THREE_DS_SESSION_ENTID']
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
  
