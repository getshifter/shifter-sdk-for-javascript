import Client from '../../../libs/status/index'

describe('Status', () => {
  const config = {
    token: 'hello'
  }
  let client = new Client(config)
  beforeEach(() => client = new Client(config))
  describe('default', () => {
    it('should be v2 endpoint', () => {
      expect(client.getRequestURL()).toEqual('https://api.getshifter.io/v2/status')  
    })
    it('should be replaced endpoint', () => {
      client = new Client({
        ...config,
        endpoint: 'https://example.com'
      })
      expect(client.getRequestURL()).toEqual('https://example.com/v2/status')  
    })
  })
})