

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


describe('MerchantEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
  afterEach(liveDelay('EVERVAULT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EvervaultSDK.test()
    const ent = testsdk.Merchant()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE
    for (const op of ['create', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'merchant.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"applePay":{"a":true,"h":"Apple Pay","n":"applePay","r":false,"sh":"The Merchant's Apple Pay configuration.","t":"`$OBJECT`","key$":"applePay","index$":0},"business":{"a":true,"h":"Business","n":"business","op":{"create":{"req":true,"type":"`$OBJECT`"}},"r":false,"sh":"The business details of the Merchant.","t":"`$OBJECT`","key$":"business","index$":1},"categoryCode":{"a":true,"h":"Category Code","n":"categoryCode","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The 4-digit Merchant Category Code (MCC).","t":"`$STRING`","key$":"categoryCode","index$":2},"createdAt":{"a":true,"fo":"int64","h":"Created At","n":"createdAt","r":true,"sh":"The exact time, in epoch milliseconds, when this Merchant was created.","t":"`$INTEGER`","key$":"createdAt","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"A unique identifier assigned to each Merchant.","t":"`$STRING`","key$":"id","index$":4},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The official name of the Merchant as recognized in transactions and communications.","t":"`$STRING`","key$":"name","index$":5},"networkTokens":{"a":true,"h":"Network Tokens","n":"networkTokens","r":false,"sh":"The Merchant's Network Token configuration.","t":"`$OBJECT`","key$":"networkTokens","index$":6},"shortName":{"a":true,"h":"Short Name","n":"shortName","r":false,"sh":"A shorter version of the Merchant's name.","t":"`$STRING`","key$":"shortName","index$":7},"updatedAt":{"a":true,"fo":"int64","h":"Updated At","n":"updatedAt","r":false,"sh":"The exact time, in epoch milliseconds, when this Merchant was last updated.","t":"`$INTEGER`","key$":"updatedAt","index$":8},"website":{"a":true,"h":"Website","n":"website","r":true,"sh":"The official website URL of the Merchant.","t":"`$STRING`","key$":"website","index$":9}},"id":{"field":"id","name":"id"},"name":"merchant","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /payments/merchants","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/payments/merchants","q":{},"r":{},"s":[{"lit":"payments"},{"lit":"merchants"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /payments/merchants/{merchant_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"merchant_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/payments/merchants/{merchant_id}","q":{"exist":["id"]},"r":{"param":{"merchant_id":"id"}},"s":[{"lit":"payments"},{"lit":"merchants"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /payments/merchants/{merchant_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"merchant_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/payments/merchants/{merchant_id}","q":{"exist":["id"]},"r":{"param":{"merchant_id":"id"}},"s":[{"lit":"payments"},{"lit":"merchants"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"merchant","name__orig":"merchant","Name":"Merchant","name_":"merchant","name-":"merchant","NAME":"MERCHANT","index$":8}, {"active":true,"entity":"merchant","key$":"BasicMerchantFlow","kind":"basic","name":"BasicMerchantFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"merchant_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"merchant_ref01","srcdatavar":"merchant_ref01_data","suffix":"_up0","textfield":"categoryCode"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-merchant_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"merchant_ref01","srcdatavar":"merchant_ref01_data","suffix":"_dt0"},"m":{"id":"merchant01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-merchant_ref01"}}],"index$":2}]}, 'Merchant', {"POST /payments/merchants":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"The official name of the Merchant as recognized in transactions and communications. This name is used for display purposes and may be the company's trade name or a derived nickname.","pattern":"^[a-zA-Z0-9 ]{1,60}$","example":"Acme","key$":"name"},"shortName":{"type":"string","description":"A shorter version of the Merchant's name. Optional. When creating a 3D Secure session that references this Merchant by ID, `shortName` is used in place of `name` if `name` exceeds the 40-character limit imposed by the 3D Secure specification.\n","pattern":"^[a-zA-Z0-9 ]{1,40}$","example":"Acme","key$":"shortName"},"website":{"type":"string","description":"The official website URL of the Merchant. The domain must use a valid IANA top-level domain. See https://data.iana.org/TLD/tlds-alpha-by-domain.txt","example":"https://www.acme.com","key$":"website"},"categoryCode":{"type":"string","description":"The 4-digit Merchant Category Code (MCC).","example":"5945","key$":"categoryCode"},"business":{"type":"object","description":"The business details of the Merchant.","properties":{"legalName":{"type":"string","description":"The legal name under which the Merchant's business is registered.","pattern":"^[a-zA-Z0-9 ]{1,60}$","example":"Acme Corp"},"address":{"type":"object","properties":{"line1":{},"line2":{},"city":{},"state":{},"postalCode":{},"country":{}},"required":["line1","city","postalCode","country"],"description":"The physical address of the Merchant's principal place of business.","x-ref":"#/components/schemas/Address"}},"required":["legalName","address"],"key$":"business"},"networkTokens":{"type":"object","description":"The Merchant's Network Tokens configuration. This field should only be populated if the Merchant has already been enrolled in one of the Card Network programs and can use an existing Token Requestor ID (TRID).","properties":{"enrolment":{"type":"array","items":{"type":"object","properties":{}}}},"key$":"networkTokens"},"applePay":{"type":"object","description":"The Merchant's Apple Pay configuration.","properties":{"domains":{"type":"array","description":"The domains the Merchant wants registered with Apple Pay. Only the domain name is required, without the protocol or path. For example, `example.com` is a valid domain, but `https://example.com` is not.\n","items":{"type":"string","example":"ollivanders.co.uk"}}},"key$":"applePay"}},"required":["name","website","categoryCode","business"],"index$":1},"examples":{"SimpleExample":{"value":{"name":"Ollivanders Wand Shop","website":"https://www.ollivanders.co.uk","categoryCode":"5945","business":{"legalName":"Ollivanders Wand Shop Ltd","address":{"line1":"Diagon Alley","city":"London","postalCode":"WD1 1AA","country":"gb"}},"applePay":{"domains":["ollivanders.co.uk"]}}}}}}},"parameters":[]},"GET /payments/merchants/{merchant_id}":{"protocol":"http","parameters":[{"name":"merchant_id","in":"path","description":"The unique identifier of the merchant.","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /payments/merchants/{merchant_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"shortName":{"type":"string","description":"A shorter version of the Merchant's name. When creating a 3D Secure session that references this Merchant by ID, `shortName` is used in place of `name` if `name` exceeds the 40-character limit imposed by the 3D Secure specification.\n","pattern":"^[a-zA-Z0-9 ]{1,40}$","example":"Acme","key$":"shortName"},"applePay":{"type":"object","description":"The Merchant's Apple Pay configuration.","properties":{"domains":{"type":"array","description":"The domains the Merchant wants registered with Apple Pay. To remove a domain previously registered with Apple Pay, exclude it from the list. Only the domain name is required, without the protocol or path. For example, `example.com` is a valid domain, but `https://example.com` is not.\n","items":{"type":"string","example":"ollivanders.co.uk"}}},"key$":"applePay"}},"index$":1},"examples":{"SimpleExample":{"value":{"shortName":"Ollivanders","applePay":{"domains":["ollivanders.co.uk"]}}}}}}},"parameters":[{"name":"merchant_id","in":"path","description":"The id of the Merchant to be updated.","required":true,"schema":{"type":"string"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const merchant_ref01_ent = client.Merchant()
    let merchant_ref01_data = setup.data.new.merchant['merchant_ref01']

    merchant_ref01_data = (await merchant_ref01_ent.create(merchant_ref01_data)).data()
    assert(null != merchant_ref01_data.id)


    // UPDATE
    const merchant_ref01_data_up0: any = {}
    merchant_ref01_data_up0.id = merchant_ref01_data.id

    const merchant_ref01_markdef_up0 = { name: 'categoryCode', value: 'Mark01-merchant_ref01_' + setup.now }
    ;(merchant_ref01_data_up0 as any)[merchant_ref01_markdef_up0.name] = merchant_ref01_markdef_up0.value

    const merchant_ref01_resdata_up0 = (await merchant_ref01_ent.update(merchant_ref01_data_up0)).data()
    assert(merchant_ref01_resdata_up0.id === merchant_ref01_data_up0.id)

    assert((merchant_ref01_resdata_up0 as any)[merchant_ref01_markdef_up0.name] === merchant_ref01_markdef_up0.value)


    // LOAD
    const merchant_ref01_match_dt0: any = {}
    merchant_ref01_match_dt0.id = merchant_ref01_data.id
    const merchant_ref01_data_dt0 = (await merchant_ref01_ent.load(merchant_ref01_match_dt0)).data()
    assert(merchant_ref01_data_dt0.id === merchant_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/merchant/MerchantTestData.json')

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
    ['merchant01','merchant02','merchant03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EVERVAULT_TEST_MERCHANT_ENTID': idmap,
    'EVERVAULT_TEST_LIVE': 'FALSE',
    'EVERVAULT_TEST_EXPLAIN': 'FALSE',
    'EVERVAULT_APIKEY': '',
    'EVERVAULT_SECRET': '',
  })

  idmap = env['EVERVAULT_TEST_MERCHANT_ENTID']

  const live = 'TRUE' === env.EVERVAULT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EVERVAULT_TEST_MERCHANT_ENTID']
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
  
