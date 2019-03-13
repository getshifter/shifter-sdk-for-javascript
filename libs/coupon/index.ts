import Client from '../helpers/client'

import {
  Api
} from '../model'


class Coupon extends Client {
  version = 'v2'
  namespace = 'coupon'
  async describe(): Promise<Api.Coupon.Detail> {
    const { data } = await this.get()
    return data
  }
}

export default Coupon