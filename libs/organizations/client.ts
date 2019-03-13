import Client from '../helpers/client'

export default class OrganizationClient extends Client {
  version = 'v2'
  namespace = 'organizations'
}