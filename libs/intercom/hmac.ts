import Client from '../helpers/client'
import {
  Api
} from '../model'

export default class HMAC extends Client {
  version = 'v2'
  namespace = 'intercom/hmac'
  async create(): Promise<Api.Intercom.HMAC.Response> {
    const { data } = await this.get()
    return data
  }
}