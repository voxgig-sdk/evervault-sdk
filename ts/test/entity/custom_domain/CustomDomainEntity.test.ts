

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


describe('CustomDomainEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
  afterEach(liveDelay('EVERVAULT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EvervaultSDK.test()
    const ent = testsdk.CustomDomain()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'custom_domain.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"int64","name":"createdAt","req":false,"short":"The exact time, in epoch milliseconds, when this custom domain was created.","type":"`$INTEGER`","index$":0},{"active":true,"name":"customDomain","op":{"create":{"req":true,"type":"`$STRING`"}},"req":false,"short":"The customer managed domain to which requests to be relayed to your domain should be sent.","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"short":"The unique identifier for the custom domain.","type":"`$STRING`","index$":2},{"active":true,"name":"relay","req":false,"short":"The ID of the Relay with which this custom domain is associated.","type":"`$STRING`","index$":3},{"active":true,"name":"status","req":false,"short":"The status of the domains DNS verification.","type":"`$STRING`","index$":4},{"active":true,"format":"int64","name":"updatedAt","req":false,"short":"The exact time, in epoch milliseconds, when this custom domain was last updated.","type":"`$INTEGER`","index$":5},{"active":true,"format":"uuidv4","name":"validationRecord","req":false,"short":"Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain","type":"`$STRING`","index$":6}],"id":{"field":"id","name":"id"},"name":"custom_domain","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"relay_id","orig":"relay_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /relays/{relay_id}/custom-domains","json":"{\"operationId\":\"createCustomDomain\",\"parameters\":[{\"description\":\"The id of the Relay to which the custom domain should be added.\",\"in\":\"path\",\"name\":\"relay_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"success\":{\"value\":{\"customDomain\":\"subdomain.example.com\"}}},\"schema\":{\"properties\":{\"customDomain\":{\"description\":\"The customer managed domain to which requests to be relayed to your domain should be sent.\",\"example\":\"subdomain.example.com\",\"type\":\"string\"}},\"required\":[\"customDomain\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"examples\":{\"success\":{\"value\":{\"createdAt\":1692972623233,\"customDomain\":\"subdomain.example.com\",\"id\":\"custom_domain_j3od9Bl0WV1n\",\"relay\":\"relay_destination_d4ja57js9lnh\",\"status\":\"active\",\"updatedAt\":1692972623233,\"validationRecord\":\"986f3008-86e7-4caf-bd8b-a5d312844153\"}}},\"schema\":{\"example\":{\"createdAt\":1692972623233,\"customDomain\":\"subdomain.example.com\",\"id\":\"custom_domain_j3od9Bl0WV1n\",\"relay\":\"relay_destination_d4ja57js9lnh\",\"status\":\"active\",\"updatedAt\":1692972623233,\"validationRecord\":\"986f3008-86e7-4caf-bd8b-a5d312844153\"},\"properties\":{\"createdAt\":{\"description\":\"The exact time, in epoch milliseconds, when this custom domain was created.\",\"example\":1692972623233,\"format\":\"int64\",\"type\":\"integer\"},\"customDomain\":{\"description\":\"The customer managed domain to which requests to be relayed to your domain should be sent.\",\"example\":\"subdomain.example.com\",\"type\":\"string\"},\"id\":{\"description\":\"The unique identifier for the custom domain.\",\"example\":\"custom_domain_j3od9Bl0WV1n\",\"type\":\"string\"},\"relay\":{\"description\":\"The ID of the Relay with which this custom domain is associated.\",\"example\":\"relay_destination_d4ja57js9lnh\",\"type\":\"string\"},\"status\":{\"description\":\"The status of the domains DNS verification.\",\"enum\":[\"active\",\"inactive\"],\"type\":\"string\"},\"updatedAt\":{\"description\":\"The exact time, in epoch milliseconds, when this custom domain was last updated.\",\"example\":1692972623233,\"format\":\"int64\",\"type\":\"integer\"},\"validationRecord\":{\"description\":\"Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain\",\"example\":\"986f3008-86e7-4caf-bd8b-a5d312844153\",\"format\":\"uuidv4\",\"type\":\"string\"}},\"summary\":\"The Custom Domain Object\",\"type\":\"object\"}}},\"description\":\"The custom domain has been created\"}},\"security\":[{\"ApiKey\":[]}],\"securitySchemes\":{\"ApiKey\":{\"description\":\"Authentication using an API key. The username is the App ID and the password is the Api Key.\",\"scheme\":\"basic\",\"type\":\"http\"},\"ClientSideToken\":{\"bearerFormat\":\"Token\",\"description\":\"Authentication using a short lived token that you can share with clients. The Authorization header must be formatted as follow: \\\"Token <Client-Side Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"},\"TokenAuth\":{\"bearerFormat\":\"RunToken\",\"description\":\"Authentication using a short lived run token that you can share with clients. The Authorization header must be formatted as follow: \\\"RunToken <Function Run Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/relays/{relay_id}/custom-domains","segments":[{"lit":"relays"},{"var":"relay_id"},{"lit":"custom-domains"}],"select":{"exist":["relay_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"relay_id","orig":"relay_id","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /relays/{relay_id}/custom-domains/{id}","json":"{\"operationId\":\"retrieveCustomDomain\",\"parameters\":[{\"description\":\"The id of the Relay to which the custom domain belongs.\",\"in\":\"path\",\"name\":\"relay_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The id of the custom domain to be fetched.\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"success\":{\"value\":{\"createdAt\":1692972623233,\"customDomain\":\"subdomain.example.com\",\"id\":\"custom_domain_j3od9Bl0WV1n\",\"relay\":\"relay_destination_d4ja57js9lnh\",\"status\":\"active\",\"updatedAt\":1692972623233,\"validationRecord\":\"986f3008-86e7-4caf-bd8b-a5d312844153\"}}},\"schema\":{\"example\":{\"createdAt\":1692972623233,\"customDomain\":\"subdomain.example.com\",\"id\":\"custom_domain_j3od9Bl0WV1n\",\"relay\":\"relay_destination_d4ja57js9lnh\",\"status\":\"active\",\"updatedAt\":1692972623233,\"validationRecord\":\"986f3008-86e7-4caf-bd8b-a5d312844153\"},\"properties\":{\"createdAt\":{\"description\":\"The exact time, in epoch milliseconds, when this custom domain was created.\",\"example\":1692972623233,\"format\":\"int64\",\"type\":\"integer\"},\"customDomain\":{\"description\":\"The customer managed domain to which requests to be relayed to your domain should be sent.\",\"example\":\"subdomain.example.com\",\"type\":\"string\"},\"id\":{\"description\":\"The unique identifier for the custom domain.\",\"example\":\"custom_domain_j3od9Bl0WV1n\",\"type\":\"string\"},\"relay\":{\"description\":\"The ID of the Relay with which this custom domain is associated.\",\"example\":\"relay_destination_d4ja57js9lnh\",\"type\":\"string\"},\"status\":{\"description\":\"The status of the domains DNS verification.\",\"enum\":[\"active\",\"inactive\"],\"type\":\"string\"},\"updatedAt\":{\"description\":\"The exact time, in epoch milliseconds, when this custom domain was last updated.\",\"example\":1692972623233,\"format\":\"int64\",\"type\":\"integer\"},\"validationRecord\":{\"description\":\"Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain\",\"example\":\"986f3008-86e7-4caf-bd8b-a5d312844153\",\"format\":\"uuidv4\",\"type\":\"string\"}},\"summary\":\"The Custom Domain Object\",\"type\":\"object\"}}},\"description\":\"The custom domain has been fetched.\"}},\"security\":[{\"ApiKey\":[]}],\"securitySchemes\":{\"ApiKey\":{\"description\":\"Authentication using an API key. The username is the App ID and the password is the Api Key.\",\"scheme\":\"basic\",\"type\":\"http\"},\"ClientSideToken\":{\"bearerFormat\":\"Token\",\"description\":\"Authentication using a short lived token that you can share with clients. The Authorization header must be formatted as follow: \\\"Token <Client-Side Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"},\"TokenAuth\":{\"bearerFormat\":\"RunToken\",\"description\":\"Authentication using a short lived run token that you can share with clients. The Authorization header must be formatted as follow: \\\"RunToken <Function Run Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/relays/{relay_id}/custom-domains/{id}","segments":[{"lit":"relays"},{"var":"relay_id"},{"lit":"custom-domains"},{"var":"id"}],"select":{"exist":["id","relay_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["relay"]]},"key$":"custom_domain","name__orig":"custom_domain","Name":"CustomDomain","name_":"custom_domain","name-":"custom-domain","NAME":"CUSTOM_DOMAIN","index$":6}, {"active":true,"entity":"custom_domain","key$":"BasicCustomDomainFlow","kind":"basic","name":"BasicCustomDomainFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"custom_domain_ref01"},"match":{"relay_id":"relay01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{"ref":"custom_domain_ref01","srcdatavar":"custom_domain_ref01_data","suffix":"_dt0"},"match":{"id":"custom_domain01","relay_id":"relay01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-custom_domain_ref01"}}],"index$":1}]}, 'CustomDomain')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const custom_domain_ref01_ent = client.CustomDomain()
    let custom_domain_ref01_data = setup.data.new.custom_domain['custom_domain_ref01']
    custom_domain_ref01_data['relay_id'] = setup.idmap['relay01']

    custom_domain_ref01_data = (await custom_domain_ref01_ent.create(custom_domain_ref01_data)).data()
    assert(null != custom_domain_ref01_data.id)


    // LOAD
    const custom_domain_ref01_match_dt0: any = {}
    custom_domain_ref01_match_dt0.id = custom_domain_ref01_data.id
    const custom_domain_ref01_data_dt0 = (await custom_domain_ref01_ent.load(custom_domain_ref01_match_dt0)).data()
    assert(custom_domain_ref01_data_dt0.id === custom_domain_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/custom_domain/CustomDomainTestData.json')

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
    ['custom_domain01','custom_domain02','custom_domain03','relay01','relay02','relay03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EVERVAULT_TEST_CUSTOM_DOMAIN_ENTID': idmap,
    'EVERVAULT_TEST_LIVE': 'FALSE',
    'EVERVAULT_TEST_EXPLAIN': 'FALSE',
    'EVERVAULT_APIKEY': '',
    'EVERVAULT_SECRET': '',
  })

  idmap = env['EVERVAULT_TEST_CUSTOM_DOMAIN_ENTID']

  const live = 'TRUE' === env.EVERVAULT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EVERVAULT_TEST_CUSTOM_DOMAIN_ENTID']
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
  
