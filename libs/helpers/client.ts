import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosPromise,
} from 'axios'

import { Api } from '../model'


export default class Client {
  protected token: string
  protected endpoint: string = 'https://api.getshifter.io'
  protected version: string = 'v1'
  protected client: AxiosInstance
  protected authType: Api.authType = 'token'
  protected namespace: string = ''

  constructor(config: Api.constructorProps, client: AxiosInstance = axios) {
    this.token = config.token;
    this.client = client
    if (config.endpoint) this.endpoint = config.endpoint
    if (config.version) this.version = config.version
  }
  protected updateVersion(version: Api.version): void {
    this.version = version
  }
  protected updateAuthType(type: Api.authType): void {
    this.authType = type
  }
  protected getDefaultHeader(): Api.headers {
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
  protected getConfig(opt?: AxiosRequestConfig): AxiosRequestConfig  {
    const config = {
      headers: this.getDefaultHeader()
    }
    if (!opt) return config
    return {
      ...config,
      ...opt
    }
  }
  protected getRequestURL(path?: string): string {
    const urls = [
      this.endpoint,
      this.version
    ]
    if (this.namespace) urls.push(this.namespace)
    if (path) urls.push(path)
    return urls.join("/")
  }
  protected get<T = any>(path?: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    const url = this.getRequestURL(path);
    const conf = this.getConfig(config);
    return this.client.get(url, conf);
  }
  protected post<T = any, B = any>(path?: string, body?: B, config?: AxiosRequestConfig): AxiosPromise<T> {
    const url = this.getRequestURL(path);
    const conf = this.getConfig({
      ...config,
      data: body
    });
    return this.client.post(url, conf);
  }
  protected put<T = any, B = any>(path?: string, body?: B, config?: AxiosRequestConfig): AxiosPromise<T> {
    const url = this.getRequestURL(path);
    const conf = this.getConfig({
      ...config,
      data: body
    });
    return this.client.put(url, conf);
  }
  protected delete<T = any, B = any>(path?: string, body?: B, config?: AxiosRequestConfig): AxiosPromise<T> {
    const url = this.getRequestURL(path);
    const conf = this.getConfig({
      ...config,
      data: body
    });
    return this.client.delete(url, conf);
  }
}
