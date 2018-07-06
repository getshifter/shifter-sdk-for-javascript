import request from 'superagent'
import retryx from 'retryx'
class sdkBase {
  constructor (token, endpoint = '') {
    this.token = token
    this.endpoint = endpoint
  }
  get (endpoint, token) {
    return retryx(
      () =>
        new Promise((resolve, reject) => {
          request
            .get(endpoint)
            .set('Authorization', token)
            .end((err, response) => {
              if (err) {
                reject(err)
              } else if (response.status > 299) {
                reject(response)
              } else {
                resolve(response)
              }
            })
        }),
      {
        maxTries: 3
      }
    )
  }
}
export default sdkBase
