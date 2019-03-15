import OrganizationClient from './client'

import {
  Api,
  Types
} from '../model'


/**
 * Organization management Class
 * 
 * ```typescript
 * import { Organizations } from 'shifter-sdk'
 * 
 * const client = new Organizations.Foundation({
 *   token: 'ACCESS_TOKEN'
 * })
 * ```
 */
class Organization extends OrganizationClient {
  /**
   * List organizations
   * 
   * ```typescript
   * const organizations = await client.list()
   * [
   *  {
   *    org_id: 'xxxxx-xxxx-xxxx-xxxx',
   *    org_name: 'xxxxx',
   *    org_owner: 'xxxxxxx',
   *    org_website: '',
   *    phone_number: '',
   *    org_country: '',
   *    org_state: '',
   *    org_twitter: '',
   *    org_size: '',
   *    projects: [],
   *    members: []
   *  }
   * ]
   * ```
   */
  async list(): Promise<Api.Organizations.List> {
    const { data } = await this.get()
    return data
  }
  async listMeta(): Promise<Api.Organizations.ListMeta> {
    const { data } = await this.get('meta')
    return data
  }
  async describe(orgId: string): Promise<Api.Organizations.Detail> {
    const { data } = await this.get(orgId)
    return data
  }
  async create(config: Types.Organizations.Config): Promise<Api.Organizations.CreateResult> {
    const { data } = await this.post('', config)
    return data
  }
  async update(orgId: string, config: Types.Organizations.Config): Promise<''> {
    await this.put(orgId, config)
    return ''
  }
  async delete(orgId: string): Promise<''> {
    await this.del(orgId)
    return ''
  }
  async activateInvitation(orgId: string, key: string) {
    await this.post(`${orgId}/activation/${key}`)
    return ''
  }
}

export default Organization