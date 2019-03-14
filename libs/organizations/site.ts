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
  async add(orgId: string, siteIds: string[]): Promise<''> {
    const body = {
      projects: siteIds
    }
    await this.post(`${orgId}/projects`, body)
    return ''
  }
  async remove(orgId: string, siteIds: string[]): Promise<''> {
    const body = {
      projects: siteIds
    }
    await this.del(`${orgId}/projects`, body)
    return ''
  }
}

export default Sites