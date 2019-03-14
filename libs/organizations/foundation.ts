import OrganizationClient from './client'

import {
  Api,
  Types
} from '../model'


class Organization extends OrganizationClient {
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
}

export default Organization