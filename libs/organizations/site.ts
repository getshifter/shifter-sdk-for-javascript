import OrganizationClient from './client'

import {
  Api,
} from '../model'


class Sites extends OrganizationClient {
  async list(orgId: string): Promise<Api.Organizations.Sites.List> {
    const { data } = await this.get(`${orgId}/projects`)
    return data
  }
  async describe(orgId: string, siteId: string): Promise<Api.Organizations.Sites.Detail> {
    const { data } = await this.get(`${orgId}/projects/${siteId}`)
    return data
  }
}

export default Sites