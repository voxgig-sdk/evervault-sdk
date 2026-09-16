

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


describe('RelayEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
  afterEach(liveDelay('EVERVAULT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EvervaultSDK.test()
    const ent = testsdk.Relay()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE
    for (const op of ['update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'relay.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"app","req":false,"short":"The unique identifier for the app to which the Relay belongs.","type":"`$STRING`","index$":0},{"active":true,"name":"authentication","req":false,"short":"The type of authentication required for the Relay","type":["`$ONE`",["`$STRING`","`$NULL`"]],"index$":1},{"active":true,"format":"int64","name":"createdAt","req":false,"short":"The exact time, in epoch milliseconds, when this Relay was created.","type":"`$INTEGER`","index$":2},{"active":true,"name":"destinationDomain","req":false,"short":"The domain in front of which the Relay should be configured.","type":"`$STRING`","index$":3},{"active":true,"name":"encryptEmptyStrings","req":false,"short":"Whether or not empty strings should be encrypted.","type":"`$BOOLEAN`","index$":4},{"active":true,"name":"evervaultDomain","req":false,"short":"The Evervault managed domain to which requests to be relayed to the destination domain should be sent.","type":"`$STRING`","index$":5},{"active":true,"name":"id","req":false,"short":"The unique identifier for the Relay.","type":"`$STRING`","index$":6},{"active":true,"name":"routes","req":false,"short":"A collection of route configurations for the Relay.","type":"`$ARRAY`","index$":7},{"active":true,"format":"int64","name":"updatedAt","req":false,"short":"The exact time, in epoch milliseconds, when this Relay was updated.","type":"`$INTEGER`","index$":8}],"id":{"field":"id","name":"id"},"name":"relay","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /relays/{id}","json":"{\"operationId\":\"fetchRelay\",\"parameters\":[{\"description\":\"The id of the Relay to be fetched.\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"Basic\":{\"value\":{\"app\":\"app_cc7fcd533649\",\"authentication\":\"api-key\",\"createdAt\":1692972623233,\"destinationDomain\":\"example.com\",\"encryptEmptyStrings\":true,\"evervaultDomain\":\"example-com.app-12345.relay.evervault.app\",\"id\":\"relay_destination_d4ja57js9lnh\",\"routes\":[{\"method\":\"POST\",\"path\":\"/checkout\",\"request\":[{\"action\":\"encrypt\",\"selections\":[{\"role\":\"pci\",\"selector\":\"$.cardNumber\",\"type\":\"json\"}]}],\"response\":[]}]}}},\"schema\":{\"example\":{\"app\":\"app_cc7fcd533649\",\"authentication\":null,\"createdAt\":1692972623233,\"destinationDomain\":\"example.com\",\"encryptEmptyStrings\":true,\"evervaultDomain\":\"example-com.app-12345.relay.evervault.app\",\"id\":\"relay_destination_d4ja57js9lnh\",\"routes\":[{\"method\":\"POST\",\"path\":\"/checkout\",\"request\":[{\"action\":\"encrypt\",\"selections\":[{\"role\":\"pci\",\"selector\":\"$.cardNumber\",\"type\":\"json\"}]}],\"response\":[{\"action\":\"decrypt\",\"selections\":[{\"selector\":\"$..*\",\"type\":\"json\"}]}]}],\"updatedAt\":1692972623234},\"properties\":{\"app\":{\"description\":\"The unique identifier for the app to which the Relay belongs.\",\"type\":\"string\"},\"authentication\":{\"description\":\"The type of authentication required for the Relay\",\"enum\":[\"api-key\",null],\"type\":[\"string\",\"null\"]},\"createdAt\":{\"description\":\"The exact time, in epoch milliseconds, when this Relay was created.\",\"example\":1692972623233,\"format\":\"int64\",\"type\":\"integer\"},\"destinationDomain\":{\"description\":\"The domain in front of which the Relay should be configured.\",\"example\":\"example.com\",\"type\":\"string\"},\"encryptEmptyStrings\":{\"description\":\"Whether or not empty strings should be encrypted.\",\"example\":true,\"type\":\"boolean\"},\"evervaultDomain\":{\"description\":\"The Evervault managed domain to which requests to be relayed to the destination domain should be sent.\",\"example\":\"example-com.app-12345.relay.evervault.app\",\"type\":\"string\"},\"id\":{\"description\":\"The unique identifier for the Relay.\",\"example\":\"relay_destination_d4ja57js9lnh\",\"type\":\"string\"},\"routes\":{\"description\":\"A collection of route configurations for the Relay.\",\"items\":{\"properties\":{\"method\":{\"description\":\"The HTTP method that must be matched for the operation to be performed. For any method, use null.\",\"enum\":[\"GET\",\"HEAD\",\"POST\",\"PUT\",\"DELETE\",\"PATCH\"],\"example\":\"POST\",\"type\":\"string\"},\"path\":{\"description\":\"The path that must be matched for the operation to be performed. For wildcards, use '*'. For a catchall of all subsequent paths, use '**'.\",\"example\":\"/**\",\"type\":\"string\"},\"request\":{\"description\":\"The actions to be performed on the data on request.\",\"items\":{\"properties\":{\"action\":{\"description\":\"The operation to perform on the selected data.\",\"enum\":[\"encrypt\",\"decrypt\"],\"example\":\"encrypt\",\"type\":\"string\"},\"selections\":{\"description\":\"The selections of data on which the operation will be performed.\",\"items\":{\"properties\":{\"role\":{\"description\":\"The role of the encrypted field that must be matched for the operation to be performed.\",\"example\":\"pci\",\"type\":\"string\"},\"selector\":{\"description\":\"The selector that identifies the data on which the action should be performed\\n\",\"example\":\"$.cardNumber\",\"type\":\"string\"},\"type\":{\"description\":\"The type of the selector used to identify the data on which the action should be performed.\",\"enum\":[\"header\",\"json\",\"form\"],\"example\":\"json\",\"type\":\"string\"}},\"required\":[\"selector\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"action\",\"selections\"],\"type\":\"object\"},\"maxItems\":1,\"type\":\"array\"},\"response\":{\"description\":\"The actions to be performed on the data on response.\",\"items\":{\"properties\":{\"action\":{\"description\":\"The operation to perform on the selected data.\",\"enum\":[\"encrypt\",\"decrypt\"],\"example\":\"encrypt\",\"type\":\"string\"},\"selections\":{\"description\":\"The selections of data on which the operation will be performed.\",\"items\":{\"properties\":{\"role\":{\"description\":\"The role of the encrypted field that must be matched for the operation to be performed.\",\"example\":\"pci\",\"type\":\"string\"},\"selector\":{\"description\":\"The selector that identifies the data on which the action should be performed\\n\",\"example\":\"$.cardNumber\",\"type\":\"string\"},\"type\":{\"description\":\"The type of the selector used to identify the data on which the action should be performed.\",\"enum\":[\"header\",\"json\",\"form\"],\"example\":\"json\",\"type\":\"string\"}},\"required\":[\"selector\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"action\",\"selections\"],\"type\":\"object\"},\"maxItems\":1,\"type\":\"array\"}},\"required\":[\"path\",\"request\",\"response\"],\"type\":\"object\"},\"type\":\"array\"},\"updatedAt\":{\"description\":\"The exact time, in epoch milliseconds, when this Relay was updated.\",\"example\":1692972623234,\"format\":\"int64\",\"type\":\"integer\"}},\"summary\":\"The Relay Object\",\"type\":\"object\"}}},\"description\":\"The Relay has been fetched.\"}},\"security\":[{\"ApiKey\":[]}],\"securitySchemes\":{\"ApiKey\":{\"description\":\"Authentication using an API key. The username is the App ID and the password is the Api Key.\",\"scheme\":\"basic\",\"type\":\"http\"},\"ClientSideToken\":{\"bearerFormat\":\"Token\",\"description\":\"Authentication using a short lived token that you can share with clients. The Authorization header must be formatted as follow: \\\"Token <Client-Side Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"},\"TokenAuth\":{\"bearerFormat\":\"RunToken\",\"description\":\"Authentication using a short lived run token that you can share with clients. The Authorization header must be formatted as follow: \\\"RunToken <Function Run Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/relays/{id}","segments":[{"lit":"relays"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"PATCH /relays/{id}","json":"{\"operationId\":\"updateRelay\",\"parameters\":[{\"description\":\"The id of the Relay to be updated.\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"Basic\":{\"value\":{\"routes\":[{\"method\":\"POST\",\"path\":\"/checkout\",\"request\":[{\"action\":\"encrypt\",\"selections\":[{\"selector\":\"$.cardNumber\",\"type\":\"json\"}]}],\"response\":[]}]}}},\"schema\":{\"properties\":{\"authentication\":{\"description\":\"The type of authentication required for the Relay.\",\"enum\":[\"api-key\",null],\"type\":[\"string\",\"null\"]},\"encryptEmptyStrings\":{\"description\":\"Whether or not empty strings should be encrypted.\",\"example\":true,\"type\":\"boolean\"},\"routes\":{\"description\":\"A collection of route configurations for the Relay. Any existing route configurations will be replaced with the new configurations.\\n\",\"items\":{\"properties\":{\"method\":{\"description\":\"The HTTP method that must be matched for the operation to be performed. For any method, use null.\",\"enum\":[\"GET\",\"HEAD\",\"POST\",\"PUT\",\"DELETE\",\"PATCH\"],\"example\":\"POST\",\"type\":\"string\"},\"path\":{\"description\":\"The path that must be matched for the operation to be performed. For wildcards, use '*'. For a catchall of all subsequent paths, use '**'.\",\"example\":\"/**\",\"type\":\"string\"},\"request\":{\"description\":\"The actions to be performed on the data on request.\",\"items\":{\"properties\":{\"action\":{\"description\":\"The operation to perform on the selected data.\",\"enum\":[\"encrypt\",\"decrypt\"],\"example\":\"encrypt\",\"type\":\"string\"},\"selections\":{\"description\":\"The selections of data on which the operation will be performed.\",\"items\":{\"properties\":{\"role\":{\"description\":\"The role of the encrypted field that must be matched for the operation to be performed.\",\"example\":\"pci\",\"type\":\"string\"},\"selector\":{\"description\":\"The selector that identifies the data on which the action should be performed\\n\",\"example\":\"$.cardNumber\",\"type\":\"string\"},\"type\":{\"description\":\"The type of the selector used to identify the data on which the action should be performed.\",\"enum\":[\"header\",\"json\",\"form\"],\"example\":\"json\",\"type\":\"string\"}},\"required\":[\"selector\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"action\",\"selections\"],\"type\":\"object\"},\"maxItems\":1,\"type\":\"array\"},\"response\":{\"description\":\"The actions to be performed on the data on response.\",\"items\":{\"properties\":{\"action\":{\"description\":\"The operation to perform on the selected data.\",\"enum\":[\"encrypt\",\"decrypt\"],\"example\":\"encrypt\",\"type\":\"string\"},\"selections\":{\"description\":\"The selections of data on which the operation will be performed.\",\"items\":{\"properties\":{\"role\":{\"description\":\"The role of the encrypted field that must be matched for the operation to be performed.\",\"example\":\"pci\",\"type\":\"string\"},\"selector\":{\"description\":\"The selector that identifies the data on which the action should be performed\\n\",\"example\":\"$.cardNumber\",\"type\":\"string\"},\"type\":{\"description\":\"The type of the selector used to identify the data on which the action should be performed.\",\"enum\":[\"header\",\"json\",\"form\"],\"example\":\"json\",\"type\":\"string\"}},\"required\":[\"selector\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"action\",\"selections\"],\"type\":\"object\"},\"maxItems\":1,\"type\":\"array\"}},\"required\":[\"path\",\"request\",\"response\"],\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"Basic\":{\"value\":{\"app\":\"app_cc7fcd533649\",\"authentication\":null,\"createdAt\":1692972623233,\"destinationDomain\":\"example.com\",\"encryptEmptyStrings\":true,\"evervaultDomain\":\"example-com.app-12345.relay.evervault.app\",\"id\":\"relay_destination_d4ja57js9lnh\",\"routes\":[{\"method\":\"POST\",\"path\":\"/checkout\",\"request\":[{\"action\":\"encrypt\",\"selections\":[{\"role\":\"pci\",\"selector\":\"$.cardNumber\",\"type\":\"json\"}]}],\"response\":[]}],\"updatedAt\":1692972623234}}},\"schema\":{\"example\":{\"app\":\"app_cc7fcd533649\",\"authentication\":null,\"createdAt\":1692972623233,\"destinationDomain\":\"example.com\",\"encryptEmptyStrings\":true,\"evervaultDomain\":\"example-com.app-12345.relay.evervault.app\",\"id\":\"relay_destination_d4ja57js9lnh\",\"routes\":[{\"method\":\"POST\",\"path\":\"/checkout\",\"request\":[{\"action\":\"encrypt\",\"selections\":[{\"role\":\"pci\",\"selector\":\"$.cardNumber\",\"type\":\"json\"}]}],\"response\":[{\"action\":\"decrypt\",\"selections\":[{\"selector\":\"$..*\",\"type\":\"json\"}]}]}],\"updatedAt\":1692972623234},\"properties\":{\"app\":{\"description\":\"The unique identifier for the app to which the Relay belongs.\",\"type\":\"string\"},\"authentication\":{\"description\":\"The type of authentication required for the Relay\",\"enum\":[\"api-key\",null],\"type\":[\"string\",\"null\"]},\"createdAt\":{\"description\":\"The exact time, in epoch milliseconds, when this Relay was created.\",\"example\":1692972623233,\"format\":\"int64\",\"type\":\"integer\"},\"destinationDomain\":{\"description\":\"The domain in front of which the Relay should be configured.\",\"example\":\"example.com\",\"type\":\"string\"},\"encryptEmptyStrings\":{\"description\":\"Whether or not empty strings should be encrypted.\",\"example\":true,\"type\":\"boolean\"},\"evervaultDomain\":{\"description\":\"The Evervault managed domain to which requests to be relayed to the destination domain should be sent.\",\"example\":\"example-com.app-12345.relay.evervault.app\",\"type\":\"string\"},\"id\":{\"description\":\"The unique identifier for the Relay.\",\"example\":\"relay_destination_d4ja57js9lnh\",\"type\":\"string\"},\"routes\":{\"description\":\"A collection of route configurations for the Relay.\",\"items\":{\"properties\":{\"method\":{\"description\":\"The HTTP method that must be matched for the operation to be performed. For any method, use null.\",\"enum\":[\"GET\",\"HEAD\",\"POST\",\"PUT\",\"DELETE\",\"PATCH\"],\"example\":\"POST\",\"type\":\"string\"},\"path\":{\"description\":\"The path that must be matched for the operation to be performed. For wildcards, use '*'. For a catchall of all subsequent paths, use '**'.\",\"example\":\"/**\",\"type\":\"string\"},\"request\":{\"description\":\"The actions to be performed on the data on request.\",\"items\":{\"properties\":{\"action\":{\"description\":\"The operation to perform on the selected data.\",\"enum\":[\"encrypt\",\"decrypt\"],\"example\":\"encrypt\",\"type\":\"string\"},\"selections\":{\"description\":\"The selections of data on which the operation will be performed.\",\"items\":{\"properties\":{\"role\":{\"description\":\"The role of the encrypted field that must be matched for the operation to be performed.\",\"example\":\"pci\",\"type\":\"string\"},\"selector\":{\"description\":\"The selector that identifies the data on which the action should be performed\\n\",\"example\":\"$.cardNumber\",\"type\":\"string\"},\"type\":{\"description\":\"The type of the selector used to identify the data on which the action should be performed.\",\"enum\":[\"header\",\"json\",\"form\"],\"example\":\"json\",\"type\":\"string\"}},\"required\":[\"selector\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"action\",\"selections\"],\"type\":\"object\"},\"maxItems\":1,\"type\":\"array\"},\"response\":{\"description\":\"The actions to be performed on the data on response.\",\"items\":{\"properties\":{\"action\":{\"description\":\"The operation to perform on the selected data.\",\"enum\":[\"encrypt\",\"decrypt\"],\"example\":\"encrypt\",\"type\":\"string\"},\"selections\":{\"description\":\"The selections of data on which the operation will be performed.\",\"items\":{\"properties\":{\"role\":{\"description\":\"The role of the encrypted field that must be matched for the operation to be performed.\",\"example\":\"pci\",\"type\":\"string\"},\"selector\":{\"description\":\"The selector that identifies the data on which the action should be performed\\n\",\"example\":\"$.cardNumber\",\"type\":\"string\"},\"type\":{\"description\":\"The type of the selector used to identify the data on which the action should be performed.\",\"enum\":[\"header\",\"json\",\"form\"],\"example\":\"json\",\"type\":\"string\"}},\"required\":[\"selector\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"action\",\"selections\"],\"type\":\"object\"},\"maxItems\":1,\"type\":\"array\"}},\"required\":[\"path\",\"request\",\"response\"],\"type\":\"object\"},\"type\":\"array\"},\"updatedAt\":{\"description\":\"The exact time, in epoch milliseconds, when this Relay was updated.\",\"example\":1692972623234,\"format\":\"int64\",\"type\":\"integer\"}},\"summary\":\"The Relay Object\",\"type\":\"object\"}}},\"description\":\"The Relay has been updated\"}},\"security\":[{\"ApiKey\":[]}],\"securitySchemes\":{\"ApiKey\":{\"description\":\"Authentication using an API key. The username is the App ID and the password is the Api Key.\",\"scheme\":\"basic\",\"type\":\"http\"},\"ClientSideToken\":{\"bearerFormat\":\"Token\",\"description\":\"Authentication using a short lived token that you can share with clients. The Authorization header must be formatted as follow: \\\"Token <Client-Side Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"},\"TokenAuth\":{\"bearerFormat\":\"RunToken\",\"description\":\"Authentication using a short lived run token that you can share with clients. The Authorization header must be formatted as follow: \\\"RunToken <Function Run Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"PATCH","orig":"/relays/{id}","segments":[{"lit":"relays"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"relay","name__orig":"relay","Name":"Relay","name_":"relay","name-":"relay","NAME":"RELAY","index$":12}, {"active":true,"entity":"relay","key$":"BasicRelayFlow","kind":"basic","name":"BasicRelayFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"relay_ref01","srcdatavar":"relay_ref01_data","suffix":"_up0","textfield":"app"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-relay_ref01"}}],"valid":[],"index$":0},{"active":true,"data":{},"input":{"ref":"relay_ref01","srcdatavar":"relay_ref01_data","suffix":"_dt0"},"match":{"id":"relay01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-relay_ref01"}}],"index$":1}]}, 'Relay')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let relay_ref01_data = Object.values(setup.data.existing.relay)[0] as any

    // UPDATE
    const relay_ref01_ent = client.Relay()
    const relay_ref01_data_up0: any = {}
    relay_ref01_data_up0.id = relay_ref01_data.id

    const relay_ref01_markdef_up0 = { name: 'app', value: 'Mark01-relay_ref01_' + setup.now }
    ;(relay_ref01_data_up0 as any)[relay_ref01_markdef_up0.name] = relay_ref01_markdef_up0.value

    const relay_ref01_resdata_up0 = (await relay_ref01_ent.update(relay_ref01_data_up0)).data()
    assert(relay_ref01_resdata_up0.id === relay_ref01_data_up0.id)

    assert((relay_ref01_resdata_up0 as any)[relay_ref01_markdef_up0.name] === relay_ref01_markdef_up0.value)


    // LOAD
    const relay_ref01_match_dt0: any = {}
    relay_ref01_match_dt0.id = relay_ref01_data.id
    const relay_ref01_data_dt0 = (await relay_ref01_ent.load(relay_ref01_match_dt0)).data()
    assert(relay_ref01_data_dt0.id === relay_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/relay/RelayTestData.json')

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
    ['relay01','relay02','relay03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EVERVAULT_TEST_RELAY_ENTID': idmap,
    'EVERVAULT_TEST_LIVE': 'FALSE',
    'EVERVAULT_TEST_EXPLAIN': 'FALSE',
    'EVERVAULT_APIKEY': '',
    'EVERVAULT_SECRET': '',
  })

  idmap = env['EVERVAULT_TEST_RELAY_ENTID']

  const live = 'TRUE' === env.EVERVAULT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EVERVAULT_TEST_RELAY_ENTID']
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
  
