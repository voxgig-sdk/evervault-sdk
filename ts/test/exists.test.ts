
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { EvervaultSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = EvervaultSDK.test()
    equal(testsdk instanceof EvervaultSDK, true,
      'EvervaultSDK.test() must return a client synchronously')
  })

})
