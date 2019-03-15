import Client from '../helpers/client'
import {
  Api
} from '../model'
/**
 * Site transfer
 * 
 * ```typescript
 * import { Statistics } from 'shifter-sdk'
 *
 * const client = new Statistics.SiteTransfer({
 *   token: 'YOUR_TOKEN'
 * })
 * ```
 */
export default class SiteTransfer extends Client {
  version = 'v1'
  namespace = 'projects'
  /**
   * Describe site transfer amounts
   * 
   * @param siteId specific site id
   * @returns Promise<Api.Statistics.SiteTransfer.Detail.Response>
   * ```typescript
   * const result = await client.describe(siteId)
   * [
   *  {
   *    "transfer_gb": 5,
   *    "track_month": 201902
   *  }, {
   *    "transfer_gb": 10,
   *    "track_month": 201903
   *  }
   * ]
   * ```
   */
  async describe(siteId: string): Promise<Api.Statistics.SiteTransfer.Detail.Response> {
    const { data } = await this.get(`${siteId}/shifter_cdn_transfer_amount`)
    return data
  }
}