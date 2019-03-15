import Client from '../helpers/client'
import {
  Api
} from '../model'

export class Site extends Client {
  protected version = 'v2'
  protected namespace = 'sites'
  /**
   * List owned sites
   * 
   * @example
   * 
   * ```typescript
   * 
   * const sites = await client.list()
   * 
   * [
   *  {
   *   "project_name": "test",
   *   "stock_state": "inuse",
   *   "project_id": "xxxxx-xxxxx-xxxx",
   *   "project_owner": "xxxxx",
   *   "wordpress_site_url": null,
   *   "php_version": "7.2",
   *   "access_url": "xxxxxx.on.getshifter.io",
   *   "last_launched": "2019-02-18T03:14:59+00:00",
   *   "disk_usage": 4,
   *   "deploy_type": "shifter_cdn",
   *   "raw_url": "xxxxxx.cloudfront.net",
   *   "create_time": "2019-01-18T06:21:31+00:00",
   *   "automation": true
   *  }
   * ]
   * ```
   */
  async list(): Promise<Api.Sites.List.Response> {
    const { data } = await this.get()
    return data
  }
  /**
   * Describe site data
   * @param siteId 
   * @example
   * 
   * ```typescript
   * 
   * const sites = await client.describe(siteId)
   * 
   *  {
   *   "project_name": "test",
   *   "stock_state": "inuse",
   *   "project_id": "xxxxx-xxxxx-xxxx",
   *   "project_owner": "xxxxx",
   *   "wordpress_site_url": null,
   *   "php_version": "7.2",
   *   "access_url": "xxxxxx.on.getshifter.io",
   *   "last_launched": "2019-02-18T03:14:59+00:00",
   *   "disk_usage": 4,
   *   "deploy_type": "shifter_cdn",
   *   "raw_url": "xxxxxx.cloudfront.net",
   *   "create_time": "2019-01-18T06:21:31+00:00",
   *   "automation": true
   *  }
   * 
   * ```
   */
  async describe(siteId: string): Promise<Api.Sites.Detail.Response> {
    const { data } = await this.get(siteId)
    return data
  }
  /**
   * Create new site
   * @param name site name
   * @param [organizationsIds] ID of organization belong to
   * @example
   * 
   * ```typescript
   * 
   * const result = await client.create('my new site')
   * {
   *  "project_id": "xxx-xxxx-xxxx-xxxx",
   *  "project_name": "my new site",
   *  "shifter_cdn_url": "xxxx.cloudfront.net"
   * }
   * ```
   */
  async create(name: string, organizationsIds?: string[]): Promise<Api.Sites.Create.Response> {
    const body: {
      site_name: string,
      organizations?: string[]
    } = {
      site_name: name
    }
    if (organizationsIds) body.organizations = organizationsIds;
    const { data } = await this.post('', body)
    return data
  }
  /**
   * Delete exists site
   * @param siteId site id
   * @example
   * 
   * ```typescript
   * 
   * await client.delete(siteId)
   * ""
   * ```
   */
  async delete(siteId: string): Promise<''> {
    await this.del(siteId)
    return ''
  }
  /**
   * Update site name
   * @param siteId site id
   * @param name new site name
   * @example
   * 
   * ```typescript
   * 
   * await client.updateName(siteId, name)
   * ""
   * ```
   */
  async updateName(siteId: string, name: string): Promise<''> {
    await this.put(siteId, {
      site_name: name
    })
    return ''
  }
  /**
   * Enabled deploy automation
   * @param siteId site id
   * @example
   * 
   * ```typescript
   * 
   * await client.enabledDeployAutomation(siteId)
   * ""
   * ```
   */
  async enabledDeployAutomation(siteId: string): Promise<''> {
    await this.put(siteId, { automation: true })
    return ''
  }
  /**
   * Disabled deploy automation
   * @param siteId site id
   * @example
   * 
   * ```typescript
   * 
   * await client.disabledDeployAutomation(siteId)
   * ""
   * ```
   */
  async disabledDeployAutomation(siteId: string): Promise<''> {
    await this.put(siteId, { automation: false })
    return ''
  }
  /**
   * Start WordPress site as emergency mode
   * @param siteId site id
   * @example
   * 
   * ```typescript
   * 
   * await client.startWordPressAsEmergency(siteId)
   * {
   *   "notification_id": "xxxxxxxxxxxxxxxxxxx",
   *   "emergency_password": "xxxxxxxxx"
   * }
   * ```
   */
  async startWordPressAsEmergency(siteId: string): Promise<Api.Sites.Start.EmergencyResponse> {
    const { data } = await this.post(`${siteId}/wordpress_site/start`, {
      emergency: true
    });
    return data
  }
  /**
   * Start WordPress site
   * @param siteId site id
   * @param [isEmergency] start as emergency mode
   * @example
   * 
   * ```typescript
   * 
   * await client.startWordPress(siteId)
   * {
   *   "notification_id": "xxxxxxxxxxxxxxxxxxx"
   * }
   * ```
   */
  async startWordPress(siteId: string, isEmergency?: boolean): Promise<Api.Sites.Start.Response | Api.Sites.Start.EmergencyResponse> {
    if (isEmergency) return this.startWordPressAsEmergency(siteId)
    const { data } = await this.post(`${siteId}/wordpress_site/start`);
    return data
  }
  /**
   * Stop WordPress site
   * @param siteId site id
   * @example
   * 
   * ```typescript
   * 
   * await client.stopWordPress(siteId)
   * ""
   * ```
   */
  async stopWordPress(siteId: string): Promise<''> {
    await this.post(`${siteId}/wordpress_site/stop`);
    return ''
  }
  /**
   * Get WordPress container starting status
   * @param siteId site id
   * @param notificationId notification id
   * @example
   * 
   * ```typescript
   * 
   * const siteId = 'xxxx'
   * const { notification_id } = await client.startWordPress(siteId)
   * const status = await client.getWPSetupStatus(siteId, notification_id)
   * "INITIALIZING"
   * ```
   */
  async getWPSetupStatus(siteId: string, notificationId: string): Promise<Api.Sites.Start.StartingStatusResponse> {
    const { data } = await this.get(`${siteId}/wordpress_site/check_wp_setup/${notificationId}`)
    return data
  }
}

export default Site