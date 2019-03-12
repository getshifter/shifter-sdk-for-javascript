import Client from '../helpers/client'
import {
  Api
} from '../model'

class Status extends Client {
  version = 'v2'
  namespace = 'status'
  async getStatus(): Promise<Api.Status.Response> {
    const { data } = await this.get()
    return data
  }
}

export default Status