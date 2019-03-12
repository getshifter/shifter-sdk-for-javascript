import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosPromise,
} from 'axios'

import { api } from '../model'


export default class Client implements api.Client {
  protected token: string
  protected endpoint: string = 'https://api.getshifter.io'
  protected version: string = 'v1'
  protected client: AxiosInstance
  protected authType: api.authType = 'token'
  protected namespace: string = ''

  constructor(config: api.constructorProps, client: AxiosInstance = axios) {
    this.token = config.token;
    this.client = client
    if (config.endpoint) this.endpoint = config.endpoint
    if (config.version) this.version = config.version
  }
  updateVersion(version: api.version) {
    this.version = version
  }
  updateAuthType(type: api.authType) {
    this.authType = type
  }
  getDefaultHeader() {
    if (this.authType === 'token') {
      return {
        Authorization: this.token
      }
    }
    if (this.authType === 'apikey') {
      return {
        'x-api-key': this.token
      }
    }
    return {}
  }
  getConfig(opt?: AxiosRequestConfig): AxiosRequestConfig  {
    const config = {
      headers: this.getDefaultHeader()
    }
    if (!opt) return config
    return {
      ...config,
      ...opt
    }
  }
  getRequestURL(path?: string) {
    const urls = [
      this.endpoint,
      this.version
    ]
    if (this.namespace) urls.push(this.namespace)
    if (path) urls.push(path)
    return urls.join("/")
  }
  get(path?: string, config?: AxiosRequestConfig) {
    const url = this.getRequestURL(path);
    const conf = this.getConfig(config);
    return this.client.get(url, conf);
  }
  post<T = any, B = any>(path?: string, body?: B, config?: AxiosRequestConfig): AxiosPromise<T> {
    const url = this.getRequestURL(path);
    const conf = this.getConfig({
      ...config,
      data: body
    });
    return this.client.post(url, conf);
  }
  put<T = any, B = any>(path?: string, body?: B, config?: AxiosRequestConfig): AxiosPromise<T> {
    const url = this.getRequestURL(path);
    const conf = this.getConfig({
      ...config,
      data: body
    });
    return this.client.put(url, conf);
  }
  delete<T = any, B = any>(path?: string, body?: B, config?: AxiosRequestConfig): AxiosPromise<T> {
    const url = this.getRequestURL(path);
    const conf = this.getConfig({
      ...config,
      data: body
    });
    return this.client.delete(url, conf);
  }
}
