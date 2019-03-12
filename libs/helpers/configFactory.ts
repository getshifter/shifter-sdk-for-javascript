
import { Api } from '../model'

export default class ConfigFactory {
  public static init(token: string): Api.ConfigBuilder {
    const config: Api.constructorProps = {
      token
    }
    return {
      setVersion(version: Api.Version) {
        config.version = version
        return this
      },
      setEndpoint(endpoint: string) {
        config.endpoint = endpoint
        return this
      },
      updateToken(token: string) {
        config.token = token
        return this
      },
      getConfig() {
        return config
      }
    }
  }
}