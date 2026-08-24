
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { EvervaultSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await EvervaultSDK.test()
    equal(null !== testsdk, true)
  })

})
