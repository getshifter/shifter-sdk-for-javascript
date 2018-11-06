const assert = require('power-assert')
// target
const SdkBase = require('../../classes/base')

describe('Base class', () => {
  describe('constructor', () => {
    test('should throw error when token dose not given', () => {
      assert.throws(
        () => new SdkBase(),
        {
          name: 'Error',
          message: 'token is required'
        }
      )
    })
    test('should not throw error when token given', () => {
      assert.doesNotThrow(
        () => new SdkBase('token')
      )
    })
  })
})
