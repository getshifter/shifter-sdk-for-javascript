const request = require('superagent')
class SdkBase {
  /**
   * Constructor
   * @param {string} token Shifter API token
   * @param {string} [endpoint='https://api.getshifter.io'] API Endpoint
   * @param {string} [apiVersion='v1'] API version
   */
  constructor (token, endpoint = 'https://api.getshifter.io', apiVersion = 'v1') {
    this.token = ''
    this.endpoint = ''
    this.setToken(token)
    this.setEndpoint(endpoint, apiVersion)
  }
  /**
   * Shifter API token
   * @param {string} token API token
   */
  setToken (token) {
    if (!token) throw new Error('token is required')
    this.token = token
  }
  /**
   * Get Shifter API token
   * @return {string} token
   */
  getToken () {
    return this.token
  }
  /**
   * Set API endpoint
   * @param {string} endpoint API endpoint
   * @param {string} [apiVersion='v1'] API version
   * @param {string} [path] API path
   */
  setEndpoint (endpoint, apiVersion = 'v1', path = '') {
    this.endpoint = `${endpoint}/${apiVersion}`
    if (path) this.endpoint += `/${path}`
  }
  /**
   * get API Endpoint
   * @return {string} api endpoint
   */
  getEndpoint () {
    return this.endpoint
  }
  /**
   * call GET request
   * @param {string} [path] API path
   * @return {Promise<any>} API response
   */
  get (path = '') {
    const endpoint = `${this.endpoint}/${path}`
    return new Promise((resolve, reject) => {
      request
        .get(endpoint)
        .set('Authorization', this.token)
        .end((err, response) => {
          if (err) {
            reject(err)
          } else if (response.status > 299) {
            reject(response)
          } else {
            resolve(response)
          }
        })
    })
  }
}
module.exports = SdkBase
