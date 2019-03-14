import Client from '../helpers/client'
import {
  Api
} from '../model'

class UsageSummary extends Client {
  version = 'v1'
  namespace = 'statistics/usage_summary'
  async describe(): Promise<Api.Statistics.UsageSummary> {
    const { data } = await this.get()
    return data
  }
}

export default UsageSummary