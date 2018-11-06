const assert = require('power-assert')
// target
const Status = require('../../classes/status')

describe('Status Class', () => {
  describe('constructor', () => {
    test('should update api endpoint', () => {
      const c = new Status('token')
      assert.equal(c.getEndpoint(), 'https://api.getshifter.io/v1/status')
    })
  })
})
