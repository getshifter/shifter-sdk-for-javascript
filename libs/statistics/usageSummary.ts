import Client from '../helpers/client'
import {
  Api
} from '../model'

/**
 * Account usage summary
 * 
 * ```typescript
 * import { Statistics } from 'shifter-sdk'
 *
 * const client = new Statistics.UsageSummary({
 *   token: 'YOUR_TOKEN'
 * })
 * ```
 */
class UsageSummary extends Client {
  version = 'v1'
  namespace = 'statistics/usage_summary'
  /**
   * Describe account usage
   * ```typescript
   * {
   *   updated_time: '2019-03-13T23:20:42.588404',
   *   projects_count: 10,
   *   disk_total: 10000,
   *   transfer_total: 0,
   *   user_name: 'hello',
   *   track_month: 201903
   * }
   *```
   */
  async describe(): Promise<Api.Statistics.UsageSummary> {
    const { data } = await this.get()
    return data
  }
}

export default UsageSummary