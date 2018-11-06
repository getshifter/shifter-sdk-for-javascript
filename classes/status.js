const Base = require('./base')

class Status extends Base {
  /**
   * Constructor
   * @param {string} token Shifter API token
   * @param {string} [endpoint='https://api.getshifter.io'] API Endpoint
   * @param {string} [apiVersion='v1'] API version
   */
  constructor (token, endpoint = 'https://api.getshifter.io', apiVersion = 'v1') {
    super(token, endpoint)
    this.setEndpoint(endpoint, apiVersion, 'status')
  }
  /**
   * Get Shifter Status API
   * @see {@link https://apidoc.getshifter.io/#!/status/get_status}
   * @return {Promise<{}>} API response
   * @example
   * const Shifter = require('./index')
   * const token = 'XXXXX'
   * const Status = new Shifter.Status(token)
   * Status.getStatus().then(data => console.log(data))
   */
  getStatus () {
    return this.get()
  }
}
module.exports = Status
