import axios, { AxiosInstance } from 'axios'
import { Api } from '../model'

class Auth {
  private endpoint: string = 'https://api.getshifter.io'
  private version: string = 'v1'
  private client: AxiosInstance
  private namespace: string = 'login'
  constructor(config?: Api.auth.config, client?: AxiosInstance) {
    this.client = client || axios
    if (!config) return
    if (config.endpoint) this.endpoint = config.endpoint
    if (config.version) this.version = config.version
  }
  private async request(url: string, method: 'PUT' | 'POST', param?: any) {
    try {
      const { data } = await this.client({
        method,
        url,
        data: param
      })
      return data
    } catch (e) {
      if (!e.response) throw e
      const err = {
        statusCode: 500,
        code: 'Error',
        message: 'Internal Error'
      }
      if (e.response.data && e.response.data.message) err.message = e.response.data.message
      if (e.response.status) err.statusCode = e.response.status
      if (e.response.statusText) err.code = e.response.statusText
      throw err
    }
  }
  async refresh(refreshToken: string): Promise<Api.auth.refreshResult> {
    const url = [
      this.endpoint,
      this.version,
      this.namespace
    ].join("/")
    return this.request(url, 'PUT', { refreshToken })
  }
  async login(username: string, password: string): Promise<Api.auth.loginResult> {
    const param = {
        username,
        password
    }
    const url = [
      this.endpoint,
      this.version,
      this.namespace
    ].join("/")
    return this.request(url, 'POST', param);
  }
}

export default Auth