import Client from '../helpers/client'
import {
  Api
} from '../model'

class Invoice extends Client {
  version = 'v2'
  namespace = 'invoices'
  async list(): Promise<Api.Invoice.List.Response> {
    const { data } = await this.get()
    return data
  }
  async describe(month: string): Promise<Api.Invoice.Item.Response> {
    const { data } = await this.get(month)
    return {
      statusCode: data.statusCode,
      invoice: data.invoices[0] || {}
    }
  }
}

export default Invoice
