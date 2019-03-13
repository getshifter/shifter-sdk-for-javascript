import OrganizationClient from './client'

import {
  Api,
} from '../model'


class Members extends OrganizationClient {
  suffix = 'members'
  async list(orgId: string): Promise<Api.Organizations.Members.List> {
    const { data } = await this.get(orgId)
    return data
  }
}

export default Members