import Client from '../helpers/client'
import {
  Api
} from '../model'

export class Artifacts extends Client {
  protected version = 'v1'
  protected namespace = 'projects'
  private getArtifactPath(siteId: string, path?: string): string {
    if (!path) return `${siteId}/artifacts`
    return `${siteId}/artifacts/${path}`
  }
  /**
   * List owned artifacts
   * 
   * @example
   * 
   * ```typescript
   * 
   * await client.list()
   * 
   * [
   *  {
   *    "artifact_id": "xxx-xxxxx-xxxxx",
   *    "status": "published-shifter",
   *    "context_status": "success",
   *    "created_at": "2019-02-18T03:15:49+00:00",
   *    "failure_pages": "[]"
   *  }
   * ]
   * ```
   */
  async list(siteId: string): Promise<Api.Artifacts.List.Response> {
    const path = this.getArtifactPath(siteId)
    const { data } = await this.get(path)
    return data
  }
  /**
   * Get genrating progress
   * @param siteId 
   * @example
   * ```typescript
   * 
   * await client.getGeneratingProcess(siteId)
   * 
   * {
   *   "percent": null,
   *   "sum_url": 0,
   *   "created_url": 0,
   *   "step": "queuing",
   *   "update_time": "2019-02-18T03:16:21.760Z",
   *   "owner": "john",
   *   "message": "queuing",
   *   "disk_usage": 4
   * }
   * ```
   */
  async getGeneratingProcess(siteId: string): Promise<Api.Artifacts.Generator.ProgressResponse> {
    const path = `${siteId}/check_generator_process`
    const { data } = await this.get(path)
    return data
  }
  /**
   * Get artifact download url
   * @param siteId 
   * @param artifactId 
   * @example
   * ```typescript
   * 
   * await client.getDownloadURL(siteId, artifactId)
   * {
   *   "url": "https://xxxxx"
   * }
   * ```
   */
  async getDownloadURL(siteId: string, artifactId: string): Promise<Api.Artifacts.PreviewURL> {
    const path = this.getArtifactPath(siteId, `${artifactId}/download_url`)
    const { data } = await this.get(path)
    return data
  }
  /**
   * Create artifact preview
   * @param siteId 
   * @param artifactId 
   * @example
   * ```typescript
   * 
   * await client.enablePreview(siteId, artifactId)
   * 
   * "https://xxxxx-xxxx-xxxxx-xxxx.preview.getshifter.io"
   * ```
   */
  async enablePreview(siteId: string, artifactId: string): Promise<string> {
    const path = this.getArtifactPath(siteId, `${artifactId}/preview`)
    await this.post(path)
    const subdomain = this.endpoint === 'https://api.getshifter.io' ? 'preview': 'previewdev'
    return `https://${artifactId}.${subdomain}.getshifter.io`
  }
  /**
   * Publish specific artifact
   * @param siteId 
   * @param artifactId 
   * @example
   * ```typescript
   * 
   * await client.publish(siteId, artifactId)
   * ''
   * ```
   */
  async publish(siteId: string, artifactId: string): Promise<''> {
    const path = this.getArtifactPath(siteId, `${artifactId}/deploy/shifter_cdn`)
    await this.post(path)
    return ''
  }
  /**
   * Start to generate a new artifact
   * @param siteId 
   * @example
   * ```typescript
   * 
   * const sites = await client.generate(siteId)
   * 
   * {
   *  "project_id":"xxxx-xxxxx-xxxxx-xxxx",
   *  "artifact_id":"xxxx-xxxxx-xxxxx-xxxx"
   * }
   * ```
   */
  async generate(siteId: string): Promise<Api.Artifacts.Generator.StartResponse> {
    const path = this.getArtifactPath(siteId)
    const { data } = await this.post(path)
    return data
  }
  /**
   * Delete artifact
   * @param siteId 
   * @param artifactId 
   * @example
   * ```typescript
   * 
   * const sites = await client.delete(siteId, artifactId)
   * ""
   * ```
   */
  async delete(siteId: string, artifactId: string): Promise<''> {
    const path = this.getArtifactPath(siteId, artifactId)
    await this.del(path)
    return ''
  }
  /**
   * Stop generating artifact
   *
   * @param siteId site id
   * @param artifactId artifact id
   * @example
   * ```typescript
   * 
   * const sites = await client.stopGenerating(siteId, artifactId)
   * ""
   * ```
   */
  async stopGenerating(siteId: string, artifactId: string): Promise<''> {
    const path = this.getArtifactPath(siteId, `${artifactId}/generator`)
    await this.del(path)
    return ''
  }
  /**
   * Update specific artifact name
   * @param siteId 
   * @param artifactId 
   * @param name 
   * @example
   * ```typescript
   * 
   * const sites = await client.updateName(siteId, artifactId, name)
   * ""
   * ```
   */
  async updateName(siteId: string, artifactId: string, name: string): Promise<''> {
    const path = this.getArtifactPath(siteId, `${artifactId}/artifact_name`)
    await this.put(path, {
      artifact_name: name
    })
    return ''
  }
}

export default Artifacts