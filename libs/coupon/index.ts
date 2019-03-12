import Client from '../helpers/client'
/*
import {
  api
} from '../model'
*/

class Coupon extends Client {
  version = 'v2'
  namespace = 'coupon'
  async getCoupon(): Promise<any> {
    const { data } = await this.get()
    console.log(JSON.stringify(data))
    return data
  }
}

export default Coupon