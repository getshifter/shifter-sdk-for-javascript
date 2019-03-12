import Client from '../helpers/client'
import {
  Api
} from '../model'

class Intercom extends Client {
  version = 'v2'
  namespace = 'intercom'
  async getHMAC(): Promise<Api.Intercom.HMAC.Response> {
    const { data } = await this.get('hmac')
    return data
  }
}

export default Intercom