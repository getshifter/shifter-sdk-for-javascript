import {
  AxiosPromise, 
  AxiosInstance, 
  AxiosRequestConfig
} from 'axios'

export namespace api {
  export type version = 'v1' | 'v2' | 'v3'
  export type authType = 'token' | 'apikey' | 'none'
  export type constructorProps = {
    token: string,
    endpoint?: string,
    version?: version
  }
  export type headers = {
    [key: string]: string
  }
  export interface Client {
    // constructor(config: constructorProps, client?: AxiosInstance): Client
    getConfig(opt?: AxiosRequestConfig): AxiosRequestConfig
    getRequestURL(path: string): string
    getDefaultHeader(): headers | {}
    updateAuthType(type: authType): void
    updateVersion(version: api.version): void
    get<T = any>(path?: string, config?: AxiosRequestConfig): AxiosPromise<T>
    post<T = any, B = any>(path?: string, body?: B, config?: AxiosRequestConfig): AxiosPromise<T>
    put<T = any, B = any>(path?: string, body?: B, config?: AxiosRequestConfig): AxiosPromise<T>
    delete<T = any, B = any>(path?: string, body?: B, config?: AxiosRequestConfig): AxiosPromise<T>
  }
}