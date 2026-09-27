

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


describe('CoreEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
  afterEach(liveDelay('EVERVAULT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EvervaultSDK.test()
    const ent = testsdk.Core()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'core.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"app":{"a":true,"h":"App","n":"app","r":false,"sh":"The unique identifier for the app to which the Relay belongs.","t":"`$STRING`","key$":"app","index$":0},"authentication":{"a":true,"h":"Authentication","n":"authentication","r":false,"sh":"The type of authentication required for the Relay","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"authentication","index$":1},"createdAt":{"a":true,"fo":"int64","h":"Created At","n":"createdAt","r":false,"sh":"The exact time, in epoch milliseconds, when this custom domain was created.","t":"`$INTEGER`","key$":"createdAt","index$":2},"customDomain":{"a":true,"h":"Custom Domain","n":"customDomain","r":false,"sh":"The customer managed domain to which requests to be relayed to your domain should be sent.","t":"`$STRING`","key$":"customDomain","index$":3},"destinationDomain":{"a":true,"h":"Destination Domain","n":"destinationDomain","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The domain in front of which you would like to configure a Relay","t":"`$STRING`","key$":"destinationDomain","index$":4},"encryptEmptyStrings":{"a":true,"h":"Encrypt Empty Strings","n":"encryptEmptyStrings","r":false,"sh":"Whether or not empty strings should be encrypted.","t":"`$BOOLEAN`","key$":"encryptEmptyStrings","index$":5},"evervaultDomain":{"a":true,"h":"Evervault Domain","n":"evervaultDomain","r":false,"sh":"The Evervault managed domain to which requests to be relayed to the destination domain should be sent.","t":"`$STRING`","key$":"evervaultDomain","index$":6},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"The unique identifier for the custom domain.","t":"`$STRING`","key$":"id","index$":7},"phoneNumber":{"a":true,"h":"Phone Number","n":"phoneNumber","r":false,"t":"`$STRING`","key$":"phoneNumber","index$":8},"relay":{"a":true,"h":"Relay","n":"relay","r":false,"sh":"The ID of the Relay with which this custom domain is associated.","t":"`$STRING`","key$":"relay","index$":9},"routes":{"a":true,"h":"Routes","n":"routes","op":{"list":{"req":false,"type":"`$ARRAY`"}},"r":true,"sh":"A collection of route configurations for the Relay.","t":"`$ARRAY`","key$":"routes","index$":10},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"The status of the domains DNS verification.","t":"`$STRING`","key$":"status","index$":11},"token":{"a":true,"h":"Token","n":"token","r":true,"sh":"The encrypted data to be inspected.","t":"`$STRING`","key$":"token","index$":12},"updatedAt":{"a":true,"fo":"int64","h":"Updated At","n":"updatedAt","r":false,"sh":"The exact time, in epoch milliseconds, when this custom domain was last updated.","t":"`$INTEGER`","key$":"updatedAt","index$":13},"validationRecord":{"a":true,"fo":"uuidv4","h":"Validation Record","n":"validationRecord","r":false,"sh":"Validation TXT record to be added on the `_ev-custom-relay` subdomain of your custom domain","t":"`$STRING`","key$":"validationRecord","index$":14}},"id":{"field":"id","name":"id"},"name":"core","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /decrypt","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/decrypt","q":{},"r":{},"s":[{"lit":"decrypt"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /encrypt","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/encrypt","q":{},"r":{},"s":[{"lit":"encrypt"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"POST /inspect","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/inspect","q":{},"r":{},"s":[{"lit":"inspect"}],"t":{"req":"`reqdata`","res":"`body.metadata`"},"index$":2},{"a":true,"co":{"id":"POST /relays","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/relays","q":{},"r":{},"s":[{"lit":"relays"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /relays/{relay_id}/custom-domains","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"relay_id","or":"relay_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/relays/{relay_id}/custom-domains","q":{"exist":["relay_id"]},"r":{},"s":[{"lit":"relays"},{"var":"relay_id"},{"lit":"custom-domains"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /relays","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/relays","q":{},"r":{},"s":[{"lit":"relays"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /relays/{relay_id}/custom-domains/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"relay_id","or":"relay_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/relays/{relay_id}/custom-domains/{id}","q":{"exist":["id","relay_id"]},"r":{},"s":[{"lit":"relays"},{"var":"relay_id"},{"lit":"custom-domains"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /relays/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/relays/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"relays"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.relay"]]},"key$":"core","name__orig":"core","Name":"Core","name_":"core","name-":"core","NAME":"CORE","index$":5}, {"active":true,"entity":"core","key$":"BasicCoreFlow","kind":"basic","name":"BasicCoreFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"core_ref01"},"m":{"relay_id":"relay01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"core_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"core_ref01","suffix":"_rm0"},"m":{"id":"core01"},"o":"remove","s":[],"v":[],"index$":2},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"core_ref01"}}],"index$":3}]}, 'Core', {"POST /decrypt":{"protocol":"http","requestBody":{"description":"A JSON value or file to be decrypted. This can be any valid JSON\nvalue: Objects, Arrays, Numbers, Boolean or Strings (strings should\nbe enclosed in double quotes).\n","x-content":"A JSON value or file to be decrypted. This can be any valid JSON\nvalue: Objects, Arrays, Numbers, Boolean or Strings (strings should\nbe enclosed in double quotes).\n","content":{"application/json":{"schema":{"type":["object","array","string"],"description":"The JSON value to be decrypted. This can be any valid JSON value: Dictionaries, Arrays or Strings (strings should be enclosed in double quotes). Non-encrypted values are returned unaltered.","index$":1},"examples":{"Object":{"value":{"phoneNumber":"ev:debug:Tk9D:cvuknWyEBK9VT1Dv:AzyAK0mI+KP8PU5SqjRHqVSXxTkWUDwotj7qht9/Y8X6:5azjL53LkeIMdfwp4zJoApNpWJ2hJ8NKhSF5OdGejexerv8Pz7i7WDo=:$"}},"String":{"value":"ev:debug:Tk9D:cvuknWyEBK9VT1Dv:AzyAK0mI+KP8PU5SqjRHqVSXxTkWUDwotj7qht9/Y8X6:5azjL53LkeIMdfwp4zJoApNpWJ2hJ8NKhSF5OdGejexerv8Pz7i7WDo=:$"},"Number":{"value":"ev:debug:Tk9D:cvuknWyEBK9VT1Dv:AzyAK0mI+KP8PU5SqjRHqVSXxTkWUDwotj7qht9/Y8X6:5azjL53LkeIMdfwp4zJoApNpWJ2hJ8NKhSF5OdGejexerv8Pz7i7WDo=:$"},"Boolean":{"value":"ev:debug:Tk9D:cvuknWyEBK9VT1Dv:AzyAK0mI+KP8PU5SqjRHqVSXxTkWUDwotj7qht9/Y8X6:5azjL53LkeIMdfwp4zJoApNpWJ2hJ8NKhSF5OdGejexerv8Pz7i7WDo=:$"},"Array":{"value":["ev:debug:Tk9D:cvuknWyEBK9VT1Dv:AzyAK0mI+KP8PU5SqjRHqVSXxTkWUDwotj7qht9/Y8X6:5azjL53LkeIMdfwp4zJoApNpWJ2hJ8NKhSF5OdGejexerv8Pz7i7WDo=:$","ev:debug:Tk9D:number:VgghOI6CiNwopB5a:A36bghlqi552fAQe+FIGm6xQOTDXqT7aZ6Y8T8BL78OM:IQE9kOqjWNZ224RW2/aTVsohXsA=:$","ev:debug:Tk9D:boolean:tJhxI4I9P2hZTask:AllHDCO297G2syVEbbsyoxOJI9XhgMGDDMaZYiq1H3w9:cvAGst7Y3/4aiS4xg9r/i4z5Vkg=:$",["ev:debug:Tk9D:cvuknWyEBK9VT1Dv:AzyAK0mI+KP8PU5SqjRHqVSXxTkWUDwotj7qht9/Y8X6:5azjL53LkeIMdfwp4zJoApNpWJ2hJ8NKhSF5OdGejexerv8Pz7i7WDo=:$"],{"phoneNumber":"ev:debug:Tk9D:cvuknWyEBK9VT1Dv:AzyAK0mI+KP8PU5SqjRHqVSXxTkWUDwotj7qht9/Y8X6:5azjL53LkeIMdfwp4zJoApNpWJ2hJ8NKhSF5OdGejexerv8Pz7i7WDo=:$"}]}}},"application/octet-stream":{"schema":{"type":"string","format":"binary","description":"Decrypts a file/bytes."}}}},"parameters":[]},"POST /encrypt":{"protocol":"http","requestBody":{"description":"A JSON value or file to be encrypted. This can be any valid JSON\nvalue: Objects, Arrays, Numbers, Boolean or Strings (strings should\nbe enclosed in double quotes).\n","x-content":"A JSON value or file to be encrypted. This can be any valid JSON\nvalue: Objects, Arrays, Numbers, Boolean or Strings (strings should\nbe enclosed in double quotes).\n","content":{"application/json":{"schema":{"type":["object","array","string","number","boolean"],"description":"The JSON value to be encrypted. This can be any valid JSON value: Dictionaries, Arrays, Numbers, Boolean or Strings (strings should be enclosed in double quotes).","index$":1},"examples":{"Object":{"value":{"phoneNumber":"555-2368"}},"String":{"value":"555-2368"},"Number":{"value":17185550123},"Boolean":{"value":true},"Array":{"value":["555-2368",1138,true,["555-2368"],{"phoneNumber":"555-2368"}]}}},"application/octet-stream":{"schema":{"type":"string","format":"binary","description":"Encrypts a file/bytes."}}}},"parameters":[]},"POST /inspect":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"token":{"type":"string","description":"The encrypted data to be inspected.","example":"ev:debug:Tk9D:HBpzdbFWXbX/N2cC:AyjMY/SKO49SlkXcDPtCGs+DxnUn/F8/lAtajCYZ/xT7:KV7AUn9vJJkZDtL8PKdOc8Y11yTL2vZQasFuHqM=:$","key$":"token"}},"required":["token"],"index$":1},"examples":{"Object":{"value":{"token":"ev:debug:Tk9D:HBpzdbFWXbX/N2cC:AyjMY/SKO49SlkXcDPtCGs+DxnUn/F8/lAtajCYZ/xT7:KV7AUn9vJJkZDtL8PKdOc8Y11yTL2vZQasFuHqM=:$"}}}}}},"parameters":[]},"POST /relays":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"destinationDomain":{"type":"string","description":"The domain in front of which you would like to configure a Relay","example":"example.com","key$":"destinationDomain"},"routes":{"type":"array","description":"A collection of route configurations for the Relay.","items":{"type":"object","properties":{"method":{"description":"The HTTP method that must be matched for the operation to be performed. For any method, use null.","enum":[],"example":"POST","type":"string"},"path":{"description":"The path that must be matched for the operation to be performed. For wildcards, use '*'. For a catchall of all subsequent paths, use '**'.","example":"/**","type":"string"},"request":{"description":"The actions to be performed on the data on request.","items":{},"maxItems":1,"type":"array"},"response":{"description":"The actions to be performed on the data on response.","items":{},"maxItems":1,"type":"array"}},"required":["path","request","response"],"x-ref":"#/components/schemas/RelayRoute"},"key$":"routes"},"encryptEmptyStrings":{"type":"boolean","description":"Whether or not empty strings should be encrypted. Defaults to true.","example":true,"key$":"encryptEmptyStrings"},"authentication":{"type":["string","null"],"enum":["api-key",null],"x-enum-description":{"api-key":"Requires API key","null":"Allows unauthenticated requests"},"description":"The type of authentication required for the Relay\n","key$":"authentication"}},"required":["destinationDomain","routes"],"index$":1},"examples":{"Basic":{"value":{"destinationDomain":"example.com","encryptEmptyStrings":true,"authentication":null,"routes":[{"method":"POST","path":"/checkout","request":[{}],"response":[{}]}]}}}}}},"parameters":[]},"GET /relays/{relay_id}/custom-domains":{"protocol":"http","parameters":[{"name":"relay_id","in":"path","description":"The id of the Relay whose custom domains should be fetched.","required":true,"schema":{"type":"string"},"index$":0}]},"GET /relays":{"protocol":"http","parameters":[]},"DELETE /relays/{relay_id}/custom-domains/{id}":{"protocol":"http","parameters":[{"name":"relay_id","in":"path","description":"The id of the Relay to which the custom domain belongs.","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","description":"The id of the custom domain to be deleted.","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /relays/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"The id of the Relay to be deleted.","required":true,"schema":{"type":"string"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const core_ref01_ent = client.Core()
    let core_ref01_data = setup.data.new.core['core_ref01']
    core_ref01_data['relay_id'] = setup.idmap['relay01']

    core_ref01_data = (await core_ref01_ent.create(core_ref01_data)).data()
    assert(null != core_ref01_data.id)


    // LIST
    const core_ref01_match: any = {}

    const core_ref01_list = (await core_ref01_ent.list(core_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(core_ref01_list, { id: core_ref01_data.id })))


    // REMOVE
    const core_ref01_match_rm0: any = { id: core_ref01_data.id }
    await core_ref01_ent.remove(core_ref01_match_rm0)
  

    // LIST
    const core_ref01_match_rt0: any = {}

    const core_ref01_list_rt0 = (await core_ref01_ent.list(core_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(core_ref01_list_rt0, { id: core_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/core/CoreTestData.json')

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
    ['core01','core02','core03','relay01','relay02','relay03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EVERVAULT_TEST_CORE_ENTID': idmap,
    'EVERVAULT_TEST_LIVE': 'FALSE',
    'EVERVAULT_TEST_EXPLAIN': 'FALSE',
    'EVERVAULT_APIKEY': '',
    'EVERVAULT_SECRET': '',
  })

  idmap = env['EVERVAULT_TEST_CORE_ENTID']

  const live = 'TRUE' === env.EVERVAULT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EVERVAULT_TEST_CORE_ENTID']
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
  
