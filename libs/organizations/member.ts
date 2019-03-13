import OrganizationClient from './client'


/*
import {
  Api,
  Types,
} from '../model'
*/


class Members extends OrganizationClient {
  suffix = 'members'
  async list(orgId: string): Promise<any> { // Promise<Api.Organization.HMAC.Response> {
    const { data } = await this.get(orgId)
    console.log(JSON.stringify(data))
    return data
  }
  async describe(orgId: string): Promise<any> {
    const { data } = await this.get(orgId)
    return data
  }
}

export default Members