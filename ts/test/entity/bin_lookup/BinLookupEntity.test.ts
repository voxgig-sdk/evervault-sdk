

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"number","req":true,"short":"The card number for which the BIN lookup is being requested.","type":"`$STRING`","index$":0}],"name":"bin_lookup","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /payments/bin-lookups","json":"{\"operationId\":\"createBinLookup\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"BinLookupExample\":{\"summary\":\"Example BIN lookup request\",\"value\":{\"number\":\"4242424242424242\"}}},\"schema\":{\"properties\":{\"number\":{\"description\":\"The card number for which the BIN lookup is being requested.\\nIt can be a plaintext Card number (FPAN) / Network Token number (DPAN), an encrypted\\nCard number / Network Token number or simply just a BIN (6-10 first digits of a Card Number) for range lookup.\\n\",\"type\":\"string\"}},\"required\":[\"number\"],\"type\":\"object\"}}},\"description\":\"The BIN (Bank Identification Number) lookup request body, which includes the card number.\\n\",\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"examples\":{\"SuccessfulLookup\":{\"summary\":\"Successful BIN lookup\",\"value\":{\"brand\":\"visa\",\"country\":\"gb\",\"createdAt\":169297262323,\"currency\":\"gbp\",\"fastFunds\":{\"crossBorder\":true,\"domestic\":true},\"funding\":\"credit\",\"id\":\"bin_lookup_1234567890\",\"issuer\":\"Gringotts Wizarding Bank and Trust Company\",\"productName\":\"Visa Debit\",\"segment\":\"consumer\",\"threeDS\":{\"acsInfoIndicators\":[{\"code\":\"acs-auth-available\",\"description\":\"Authentication Available at ACS\",\"indicator\":\"01\"}],\"supportedVersions\":{\"accessControlServer\":[\"2.2.0\"],\"directoryServer\":[\"2.2.0\",\"2.3.1\"]}},\"type\":\"card\"}}},\"schema\":{\"example\":{\"brand\":\"visa\",\"country\":\"gb\",\"createdAt\":169297262323,\"currency\":\"gbp\",\"fastFunds\":{\"crossBorder\":false,\"domestic\":true},\"funding\":\"credit\",\"id\":\"bin_lookup_1234567890\",\"issuer\":\"Gringotts Wizarding Bank and Trust Company\",\"productName\":\"Visa Debit\",\"segment\":\"consumer\",\"type\":\"card\"},\"properties\":{\"brand\":{\"description\":\"The card brand associated with the payment card.\",\"enum\":[\"visa\",\"mastercard\",\"american-express\",\"discover\",\"diners-club\",\"jcb\",\"unionpay\"],\"example\":\"visa\",\"type\":\"string\"},\"country\":{\"description\":\"The country associated with the card.\",\"example\":\"gb\",\"format\":\"iso-3166-1-alpha-2\",\"type\":\"string\"},\"createdAt\":{\"description\":\"Unix timestamp of when the BIN lookup was created\",\"example\":169297262323,\"type\":\"integer\"},\"currency\":{\"description\":\"The currency associated with the card (ISO 4217)\",\"example\":\"gbp\",\"type\":\"string\"},\"fastFunds\":{\"description\":\"Specifies the availability of instant payment capabilities for card transactions,\\nindicating whether funds can be transferred immediately both within the same country\\nand across international borders.\\n\",\"properties\":{\"crossBorder\":{\"description\":\"When true, indicates that instant payments are supported for international\\ntransactions between different countries. This enables immediate funds\\navailability for cross-border transfers.\\n\",\"type\":\"boolean\"},\"domestic\":{\"description\":\"When true, indicates that instant payments are supported for transactions\\nwithin the same country/domestic market. This allows for immediate funds\\navailability for local transfers.\\n\",\"type\":\"boolean\"}},\"summary\":\"Fast Funds\",\"type\":\"object\"},\"funding\":{\"description\":\"The card funding type specifies the method by which transactions are\\nfinanced.\\n\",\"enum\":[\"debit\",\"credit\",\"prepaid\",\"deferred-debit\",\"charge\"],\"example\":\"debit\",\"type\":\"string\"},\"id\":{\"description\":\"The unique identifier for the BIN lookup\",\"example\":\"bin_lookup_1234567890\",\"type\":\"string\"},\"issuer\":{\"description\":\"The name of the issuer bank\",\"example\":\"Gringotts Wizarding Bank and Trust Company\",\"type\":\"string\"},\"productName\":{\"description\":\"The name of the product associated with the card\",\"example\":\"Visa Debit\",\"type\":\"string\"},\"segment\":{\"description\":\"The card segment indicates the primary market or usage category of the\\ncard.\\n\",\"enum\":[\"consumer\",\"commercial\",\"business\",\"government\",\"payouts\",\"all\"],\"example\":\"consumer\",\"type\":\"string\"},\"threeDS\":{\"description\":\"Metadata about 3DS capabilities, including supported versions \\nand ACS (Access Control Server) indicators.\\n\",\"properties\":{\"acsInfoIndicators\":{\"description\":\"Array of ACS information indicators\",\"items\":{\"properties\":{\"code\":{\"description\":\"The indicator code, the following values are supported:\\n\\n- `authentication-available`\\n- `attempts-supported`\\n- `decoupled-authentication-supported`\\n- `trustlist-supported`\\n- `device-binding-supported`\\n- `webauthn-authentication-supported`\\n- `spc-authentication-supported`\\n- `tra-exemption-supported`\\n- `trustlist-exemption-supported`\\n- `low-value-exemption-supported`\\n- `secure-corporate-payments-exemption-supported`\\n- `emvco-reserved`\\n- `ds-reserved`\\n\\n**American Express only:**\\n- `issuer-tra-exemption-supported`\\n- `issuer-trustlist-exemption-supported`\\n- `issuer-low-value-exemption-supported`\\n- `issuer-secure-corporate-payments-exemption-supported`\\n- `bridging-message-extension-supported`\\n\\n**Mastercard only:**\\n- `smart-auth-direct-stand-in-only`\\n- `smart-auth-direct`\\n- `payment-transactions-supported`\\n- `non-payment-transactions-supported`\\n- `app-channel-supported`\\n- `browser-channel-supported`\\n- `app-acs-challenge-supported`\\n- `browser-acs-challenge-supported`\\n\\n**Visa only:**\\n- `issuer-tra-exemption-supported`\\n- `data-only-supported`\\n- `delegated-authentication-supported`\\n- `digital-auth-framework-supported`\\n\",\"type\":\"string\"},\"description\":{\"description\":\"Human-readable description of the indicator\",\"type\":\"string\"},\"indicator\":{\"description\":\"The raw numeric indicator value, ranges from 01 to 99\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"supportedVersions\":{\"description\":\"The 3DS versions supported by the ACS and DS\",\"properties\":{\"accessControlServer\":{\"items\":{\"description\":\"Array of 3DS versions supported by the Access Control Server\",\"example\":\"2.2.0\",\"type\":\"string\"},\"type\":\"array\"},\"directoryServer\":{\"items\":{\"description\":\"Array of 3DS versions supported by the Directory Server\",\"example\":\"2.3.1\",\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}},\"summary\":\"3DS\",\"type\":\"object\"},\"type\":{\"description\":\"Type of card range identified during the lookup\",\"enum\":[null,\"card\",\"network-token\"],\"example\":null,\"type\":[\"null\",\"string\"]}},\"summary\":\"The BIN Lookup Object\",\"type\":\"object\"}}},\"description\":\"Returns BIN details for the provided card number.\"}},\"security\":[{\"ApiKey\":[\"binLookup:create\"]}],\"securitySchemes\":{\"ApiKey\":{\"description\":\"Authentication using an API key. The username is the App ID and the password is the Api Key.\",\"scheme\":\"basic\",\"type\":\"http\"},\"ClientSideToken\":{\"bearerFormat\":\"Token\",\"description\":\"Authentication using a short lived token that you can share with clients. The Authorization header must be formatted as follow: \\\"Token <Client-Side Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"},\"TokenAuth\":{\"bearerFormat\":\"RunToken\",\"description\":\"Authentication using a short lived run token that you can share with clients. The Authorization header must be formatted as follow: \\\"RunToken <Function Run Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/payments/bin-lookups","segments":[{"lit":"payments"},{"lit":"bin-lookups"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"bin_lookup","name__orig":"bin_lookup","Name":"BinLookup","name_":"bin_lookup","name-":"bin-lookup","NAME":"BIN_LOOKUP","index$":1}, {"active":true,"entity":"bin_lookup","key$":"BasicBinLookupFlow","kind":"basic","name":"BasicBinLookupFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"bin_lookup_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'BinLookup')
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
  
