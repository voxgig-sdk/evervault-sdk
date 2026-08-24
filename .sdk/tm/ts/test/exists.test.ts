
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { EvervaultSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await EvervaultSDK.test()
    equal(null !== testsdk, true)
  })

})
