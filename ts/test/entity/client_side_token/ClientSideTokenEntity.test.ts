

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


describe('ClientSideTokenEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EVERVAULT_TEST_LIVE=TRUE.
  afterEach(liveDelay('EVERVAULT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EvervaultSDK.test()
    const ent = testsdk.ClientSideToken()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EVERVAULT_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'client_side_token.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"action","req":true,"short":"The action that the token should permit","type":"`$STRING`","index$":0},{"active":true,"name":"expiry","req":false,"short":"The expiry of the token in milliseconds format.","type":"`$INTEGER`","index$":1},{"active":true,"name":"payload","req":false,"short":"The payload that the token must be used with","type":"`$OBJECT`","index$":2}],"name":"client_side_token","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /client-side-tokens","json":"{\"operationId\":\"create-client-side-token\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"Decrypt\":{\"value\":{\"action\":\"api:decrypt\",\"payload\":{\"phoneNumber\":\"ev:Tk9D:GWgxSXezEFNw10b/:A6JZWe29uiZpP72w+nc0RXOdWdvgCulNqJv8aJpLE/gH:3V/PD54obBv0j+EJMaNNa/ny2tmZq7QM:$\"}}}},\"schema\":{\"properties\":{\"action\":{\"description\":\"The action that the token should permit\",\"enum\":[\"api:decrypt\"],\"type\":\"string\"},\"expiry\":{\"description\":\"The expiry of the token in milliseconds format. Must be less than 10 minutes from now.\",\"example\":1619712000000,\"type\":\"integer\"},\"payload\":{\"description\":\"The payload that the token must be used with\",\"example\":{\"name\":\"ev:debug:Tk9D:OJzdN+H2FxM86+Oa:AuUCGfKH8yYkzUvg0EjFgBOI/95D3RDZp5nwz3f2eqwJ:Zg7lsCwr2liYQOkjaRI6mwHScyn4f/Y2cxlayglTTYk1VmmDxBa5:$\"},\"type\":\"object\"}},\"required\":[\"action\"],\"type\":\"object\"}}}},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"examples\":{\"Decrypt\":{\"summary\":\"Decrypt Token\",\"value\":{\"createdAt\":1707233541981,\"expiry\":1707233841981,\"id\":\"client_side_token_TDbEef6lgIs\",\"token\":\"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJhcHBfdXVpZCI6ImFwcF82YWJlZDM1ZDc2YjkiLCJ0ZWFtX3V1aWQiOiJ0ZWFtX2FiZjU1YTk5MTY0NSIsImp0aSI6ImNsaWVudF9zaWRlX3Rva2VuX1REYkVlZjZsZ0lzIiwiZXhwIjoxNzA3MjMzODQxOTgxLCJhY3Rpb24iOiJhcGk6ZGVjcnlwdCIsInJlc291cmNlIjpudWxsLCJoYXNoZWRfYm9keSI6IlJCTnZvMVd6WjRvUlJxMFc5LWhrbnBUN1Q4SWY1MzZERU1CZzloeXFfNG8iLCJjbGllbnRfaXAiOm51bGx9.ea1w3TlZ7p-OLVs-NOAUMij4V5w-9vMAD8W2WEoklsDwwgy8HANXP4e8eAjTA0CkELoUL2FgNesS6S77Z-coG1Yw9TGnkEchgkA6RAXqF65t1bLrW0rvl2AzwFZNwJpEbJc37YqyC2xGeermmYKZCu6in97_fe4rAXSYQiuVtN6V8uLSlAgP9Mr0BmNIf49fnskbc0y2-2qewvZfRM7mPQ6NXcQE_jhUjy3OhaohdvU1FpaLs3OrzW2Ej8wE1hOjc5hRtT2cslaY4Bl2x4YNMRVObWg7GYCdETG280ilXTUu9jIPmkXt8QBzouZOP5nuhCjYxFJ2fYZMLj7vYukwdiyBtiUADXDzmnFyh7icAWib76z_hW3VLRjQSlq-fgvQJfM71j5RGBEmLrQNAPRREYjCiM8cwmOh5sFaLdmu4wM6-lgPn8dvHSqENwggs_nfxPyavHChNn8KOo4FS64YYeB28hqSvBAMT-umCdv7n2I-YF6fJOpgJrQOK35MPt4kKfqULJ45wpSnzsSpT9kTrLw0-9-6JpMtsQio0UJ27aXHMPErFcNMcW2hEhPdNsjSfIEmK7lCaUOed-wETkkfIaoTe5ly051baj-VWbAbNXH2jduia2rCZoofXTABADRzeBrFyDNRZXNQ205n0xh3PpIcazKw_vCAD_EDXmcCsFo\"}}},\"schema\":{\"properties\":{\"createdAt\":{\"description\":\"The creation time of the token in unix millis format\",\"example\":1707233541981,\"type\":\"integer\"},\"expiry\":{\"description\":\"The expiry of the token in unix millis format\",\"example\":1707233841981,\"type\":\"integer\"},\"id\":{\"description\":\"The id of the token\",\"example\":\"client_side_token_TDbEef6lgIs\",\"type\":\"string\"},\"token\":{\"description\":\"The token\",\"example\":\"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJhcHBfdXVpZCI6ImFwcF82YWJlZDM1ZDc2YjkiLCJ0ZWFtX3V1aWQiOiJ0ZWFtX2FiZjU1YTk5MTY0NSIsImp0aSI6ImNsaWVudF9zaWRlX3Rva2VuX1REYkVlZjZsZ0lzIiwiZXhwIjoxNzA3MjMzODQxOTgxLCJhY3Rpb24iOiJhcGk6ZGVjcnlwdCIsInJlc291cmNlIjpudWxsLCJoYXNoZWRfYm9keSI6IlJCTnZvMVd6WjRvUlJxMFc5LWhrbnBUN1Q4SWY1MzZERU1CZzloeXFfNG8iLCJjbGllbnRfaXAiOm51bGx9.ea1w3TlZ7p-OLVs-NOAUMij4V5w-9vMAD8W2WEoklsDwwgy8HANXP4e8eAjTA0CkELoUL2FgNesS6S77Z-coG1Yw9TGnkEchgkA6RAXqF65t1bLrW0rvl2AzwFZNwJpEbJc37YqyC2xGeermmYKZCu6in97_fe4rAXSYQiuVtN6V8uLSlAgP9Mr0BmNIf49fnskbc0y2-2qewvZfRM7mPQ6NXcQE_jhUjy3OhaohdvU1FpaLs3OrzW2Ej8wE1hOjc5hRtT2cslaY4Bl2x4YNMRVObWg7GYCdETG280ilXTUu9jIPmkXt8QBzouZOP5nuhCjYxFJ2fYZMLj7vYukwdiyBtiUADXDzmnFyh7icAWib76z_hW3VLRjQSlq-fgvQJfM71j5RGBEmLrQNAPRREYjCiM8cwmOh5sFaLdmu4wM6-lgPn8dvHSqENwggs_nfxPyavHChNn8KOo4FS64YYeB28hqSvBAMT-umCdv7n2I-YF6fJOpgJrQOK35MPt4kKfqULJ45wpSnzsSpT9kTrLw0-9-6JpMtsQio0UJ27aXHMPErFcNMcW2hEhPdNsjSfIEmK7lCaUOed-wETkkfIaoTe5ly051baj-VWbAbNXH2jduia2rCZoofXTABADRzeBrFyDNRZXNQ205n0xh3PpIcazKw_vCAD_EDXmcCsFo\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"A client side token and its expiry\"}},\"security\":[{\"ApiKey\":[]}],\"securitySchemes\":{\"ApiKey\":{\"description\":\"Authentication using an API key. The username is the App ID and the password is the Api Key.\",\"scheme\":\"basic\",\"type\":\"http\"},\"ClientSideToken\":{\"bearerFormat\":\"Token\",\"description\":\"Authentication using a short lived token that you can share with clients. The Authorization header must be formatted as follow: \\\"Token <Client-Side Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"},\"TokenAuth\":{\"bearerFormat\":\"RunToken\",\"description\":\"Authentication using a short lived run token that you can share with clients. The Authorization header must be formatted as follow: \\\"RunToken <Function Run Token>\\\"\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/client-side-tokens","segments":[{"lit":"client-side-tokens"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"client_side_token","name__orig":"client_side_token","Name":"ClientSideToken","name_":"client_side_token","name-":"client-side-token","NAME":"CLIENT_SIDE_TOKEN","index$":4}, {"active":true,"entity":"client_side_token","key$":"BasicClientSideTokenFlow","kind":"basic","name":"BasicClientSideTokenFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"client_side_token_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'ClientSideToken')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const client_side_token_ref01_ent = client.ClientSideToken()
    let client_side_token_ref01_data = setup.data.new.client_side_token['client_side_token_ref01']

    client_side_token_ref01_data = (await client_side_token_ref01_ent.create(client_side_token_ref01_data)).data()
    assert(null != client_side_token_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/client_side_token/ClientSideTokenTestData.json')

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
    ['client_side_token01','client_side_token02','client_side_token03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EVERVAULT_TEST_CLIENT_SIDE_TOKEN_ENTID': idmap,
    'EVERVAULT_TEST_LIVE': 'FALSE',
    'EVERVAULT_TEST_EXPLAIN': 'FALSE',
    'EVERVAULT_APIKEY': '',
    'EVERVAULT_SECRET': '',
  })

  idmap = env['EVERVAULT_TEST_CLIENT_SIDE_TOKEN_ENTID']

  const live = 'TRUE' === env.EVERVAULT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EVERVAULT_TEST_CLIENT_SIDE_TOKEN_ENTID']
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
  
