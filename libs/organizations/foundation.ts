import OrganizationClient from './client'

import {
  Api
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
}

export default Organization