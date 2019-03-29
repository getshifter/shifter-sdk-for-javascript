import Client from '../helpers/client'
import {
  Api
} from '../model'
import Webhook = Api.Webhook.Site

export default class Site extends Client {
  version = 'v2'
  namespace = 'webhooks' // 'webhooks/site'になるかも
  /**
   * List registered webhooks
   * @param siteId site id
   * @example
   * 
   * ```typescript
   * 
   * const result = await client.list(siteId)
   * [
   *   {
   *     "enabled": false,
   *     "hook_event": "Webhook:Artifact:Created#d34c85ad-d50a-4efe-a52a-1023b30e37ed",
   *     "webhook_url": "https://hoge.example.com",
   *     "headers": {},
   *     "method": "post",
   *     "site_id": "bfd1fbde-8f01-11e8-aa52-9ad4a0753b52"
   *   }
   * ]
   * ```
   */
  async list(siteId: string): Promise<Webhook.Lists.Response> {
    const { data } = await this.get(siteId)
    return data
  }
  /**
   * Add new Webhook
   * @param siteId site id
   * @param params webhook specification
   * @example
   * 
   * ```typescript
   * 
   * const result = await client.create(siteId, [{
   *   hook_event: 'Webhook:Artifact:Created',
   *   url: 'https://hoge.example.com',
   *   enabled: false,
   *   headers: {},
   *   method: 'post'
   * }])
   * [
   *   {
   *     "enabled": false,
   *     "hook_event": "Webhook:Artifact:Created#d34c85ad-d50a-4efe-a52a-1023b30e37ed",
   *     "webhook_url": "https://hoge.example.com",
   *     "headers": {},
   *     "method": "post",
   *     "site_id": "bfd1fbde-8f01-11e8-aa52-9ad4a0753b52"
   *   }
   * ]
   * ```
   */
  async create(siteId: string, params: Webhook.Resigteration.Request): Promise<Webhook.Resigteration.Response> {
    const { data } = await this.post(siteId, params)
    return data
  }
  /**
   * Update webhook configrations
   * @param siteId site id
   * @param params webhook specification
   * @example
   * 
   * ```typescript
   * 
   * const result = await client.update(siteId, [{
   *   hook_event: 'Webhook:Artifact:Created#d34c85ad-d50a-4efe-a52a-1023b30e37ed',
   *   url: 'https://hoge.example.com',
   *   enabled: true,
   *   headers: { 'x-test': 'hoge' },
   *   method: 'post'
   * }])
   * [
   *   {
   *     "enabled": true,
   *     "hook_event": "Webhook:Artifact:Created#d34c85ad-d50a-4efe-a52a-1023b30e37ed",
   *     "webhook_url": "https://hoge.example.com",
   *     "headers": { 'x-test': 'hoge' },
   *     "method": "post",
   *     "site_id": "bfd1fbde-8f01-11e8-aa52-9ad4a0753b52"
   *   }
   * ]
   * ```
   */
  async update(siteId: string, params: Webhook.Update.Request): Promise<Webhook.Update.Response> {
    const { data } = await this.put(siteId, params)
    return data
  }
  /**
   * Delete webhook
   * @param siteId site id
   * @param params lists of delete target webhooks
   * @example
   * 
   * ```typescript
   * 
   * const result = await client.delete(siteId, [{
   *   hook_event: 'Webhook:Artifact:Created#d34c85ad-d50a-4efe-a52a-1023b30e37ed'
   * }])
   * ""
   * ```
   */
  async delete(siteId: string, params: Webhook.Delete.Request): Promise<Webhook.Delete.Response> {
    const { data } = await this.del(siteId, params)
    return data
  }
}