import Client from '../helpers/client'
import {
  Api
} from '../model'

export class Site extends Client {
  protected version = 'v2'
  protected namespace = 'sites'
  /**
   * List owned sites
   * 
   * ```typescript
   * const sites = await client.list()
   * ```
   */
  async list(): Promise<Api.Sites.List.Response> {
    const { data } = await this.get()
    return data
  }
  async describe(siteId: string): Promise<Api.Sites.Detail.Response> {
    const { data } = await this.get(siteId)
    return data
  }
}

export default Site