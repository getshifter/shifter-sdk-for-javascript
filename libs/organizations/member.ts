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
  async add(orgId: string, email: string, username: string): Promise<''> {
    const item: any = {
      email
    }
    if (username) item.username = username
    await this.post(orgId, { members: [item] })
    return ''
  }
  async remove(orgId: string, members: string[]): Promise<''> {
    await this.del(orgId, { members })
    return ''
  }
}

export default Members