# Shifter SDK for JavaScript

## Table of Contents

Created by [gh-md-toc](https://github.com/ekalinin/github-markdown-toc)

- [Usage](#usage)
  - [Sign in](#sign-in)
    - [Basic Usage](#basic-usage)
    - [Refresh access token](#refresh-access-token)
  - [Statistics](#statistics)
    - [Describe Statistics](#describe-statistics)
    - [Describe site transfer amount](#describe-site-transfer-amount)
  - [Sites](#sites)
    - [Initilize](#initilize)
    - [List sites](#list-sites)
    - [Describe site](#describe-site)
    - [Create new site](#create-new-site)
    - [Update site name](#update-site-name)
    - [Enable / Disable auto deployment](#enable--disable-auto-deployment)
    - [Start WordPress container](#start-wordpress-container)
    - [Get WordPress starting status](#get-wordpress-starting-status)
    - [Stop WordPress container](#stop-wordpress-container)
    - [Delete site](#delete-site)
  - [Artifacts](#artifacts)
    - [Initilize](#initilize-1)
    - [Generate](#generate)
    - [Get download URL](#get-download-url)
    - [Get generating progress](#get-generating-progress)
    - [List artifacts](#list-artifacts)
    - [Publish](#publish)
    - [Stop generating artifact](#stop-generating-artifact)
    - [Update specific artifact name](#update-specific-artifact-name)
    - [Enable preview](#enable-preview)
    - [Delete](#delete)
  - [Organizations](#organizations)
    - [Initilize](#initilize-2)
    - [Create](#create)
    - [Update](#update)
    - [List](#list)
    - [Describe](#describe)
    - [Delete](#delete)
    - [Activate invited member](#activate-invited-member)
  - [Organization Site](#organization-site)
    - [Initilize](#initilize-3)
    - [List site of organization](#list-site-of-organization)
    - [Get site of organization](#get-site-of-organization)
    - [Add site to organization](#add-site-to-organization)
    - [Remove site from organization](#remove-site-from-organization)
  - [Organization Members](#organization-members)
    - [Initilize](#initilize-4)
    - [List site of organization](#list-site-of-organization-1)
    - [Add member to organization](#add-member-to-organization)
    - [Remove members from organization](#remove-members-from-organization)
  - [Status](#status)
    - [Initilize](#initilize-5)
    - [Describe status](#describe-status)

## Usage

### Sign in

```typescript
import { Auth, Statistics } from 'shifter-sdk'

const client = new Auth()
client.login('USERNAME', 'PASSWORD')
  .then(result => console.log(result))
{
  AccessToken: string,
  RefreshToken: string
}
```

#### Basic Usage

```typescript
import { Auth, Statistics } from 'shifter-sdk'

const client = new Auth()
client.login('USERNAME', 'PASSWORD')
  .then(({ AccessToken }) => {
    const client = new Statistics.UsageSummary({
      token: AccessToken
    })
    return client.describe()
  })
  .then(result => console.log(result))

{
  updated_time: '2019-03-13T23:20:42.588404',
  projects_count: 10,
  disk_total: 10000,
  transfer_total: 0,
  user_name: 'hello',
  track_month: 201903
}
```

#### Refresh access token

```typescript
import { Auth, Statistics } from 'shifter-sdk'

const client = new Auth()
client.login('USERNAME', 'PASSWORD')
  .then(({ RefreshToken }) => {
    return client.refresh(RefreshToken))
  })
  .then(result => console.log(result))

{
  AccessToken: string
}
```

### Statistics

#### Describe Statistics

```typescript
import { Statistics } from 'shifter-sdk'

const client = new Statistics.UsageSummary({
  token: 'YOUR_TOKEN'
})
client.describe()
  .then(result => console.log(result))

{
  updated_time: '2019-03-13T23:20:42.588404',
  projects_count: 10,
  disk_total: 10000,
  transfer_total: 0,
  user_name: 'hello',
  track_month: 201903
}
```

#### Describe site transfer amount

```typescript
import { Statistics } from "shifter-sdk";

const client = new Statistics.SiteTransfer({
  token: "YOUR_TOKEN",
});

const result = await client.describe(siteId)[
  ({
    transfer_gb: 5,
    track_month: 201902,
  },
  {
    transfer_gb: 10,
    track_month: 201903,
  })
];
```

### Sites

#### Initilize

```typescript
import { Sites } from "shifter-sdk";

const client = new Sites({
  token: "ACCESS_TOKEN",
});
```

#### List sites

```typescript
const sites = await client.list()[
  {
    project_name: "test",
    stock_state: "inuse",
    project_id: "xxxxx-xxxxx-xxxx",
    project_owner: "xxxxx",
    wordpress_site_url: null,
    php_version: "7.2",
    access_url: "xxxxxx.on.getshifter.io",
    last_launched: "2019-02-18T03:14:59+00:00",
    disk_usage: 4,
    deploy_type: "shifter_cdn",
    raw_url: "xxxxxx.cloudfront.net",
    create_time: "2019-01-18T06:21:31+00:00",
    automation: true,
  }
];
```

#### Describe site

```typescript
const sites = await client.describe('site id')

 {
  "project_name": "test",
  "stock_state": "inuse",
  "project_id": "xxxxx-xxxxx-xxxx",
  "project_owner": "xxxxx",
  "wordpress_site_url": null,
  "php_version": "7.2",
  "access_url": "xxxxxx.on.getshifter.io",
  "last_launched": "2019-02-18T03:14:59+00:00",
  "disk_usage": 4,
  "deploy_type": "shifter_cdn",
  "raw_url": "xxxxxx.cloudfront.net",
  "create_time": "2019-01-18T06:21:31+00:00",
  "automation": true
 }
```

#### Create new site

```typescript
const result = await client.create('my new site')
{
 "project_id": "xxx-xxxx-xxxx-xxxx",
 "project_name": "my new site",
 "shifter_cdn_url": "xxxx.cloudfront.net"
}
```

#### Update site name

```typescript
await client.updateName(siteId, name);
("");
```

#### Enable / Disable auto deployment

```typescript
await client.enabledDeployAutomation(siteId);
("");

await client.disabledDeployAutomation(siteId);
("");
```

#### Start WordPress container

```typescript
await client.startWordPress(siteId)
{
  "notification_id": "xxxxxxxxxxxxxxxxxxx"
}

await client.startWordPressAsEmergency(siteId)
{
  "notification_id": "xxxxxxxxxxxxxxxxxxx",
  "emergency_password": "xxxxxxxxx"
}
```

#### Get WordPress starting status

```typescript
const { notification_id } = await client.startWordPress(siteId);
const status = await client.getWPSetupStatus(siteId, notification_id);
("INITIALIZING");
```

#### Stop WordPress container

```typescript
await client.stopWordPress(siteId);
("");
```

#### Delete site

```typescript
await client.delete(siteId);
("");
```

### Artifacts

#### Initilize

```typescript
import { Artifacts } from "shifter-sdk";

const client = new Artifacts({
  token: "ACCESS_TOKEN",
});
```

#### Generate

Start to generate a new artifact

```typescript
const sites = await client.generate(siteId)
{
 "project_id":"xxxx-xxxxx-xxxxx-xxxx",
 "artifact_id":"xxxx-xxxxx-xxxxx-xxxx"
}
```

#### Get download URL

```typescript
await client.getDownloadURL(siteId, artifactId)
{
  "url": "https://xxxxx"
}
```

#### Get generating progress

```typescript
await client.getGeneratingProcess(siteId)

{
  "percent": null,
  "sum_url": 0,
  "created_url": 0,
  "step": "queuing",
  "update_time": "2019-02-18T03:16:21.760Z",
  "owner": "john",
  "message": "queuing",
  "disk_usage": 4
}
```

#### List artifacts

```typescript
const sites = await client.list()[
  {
    artifact_id: "xxx-xxxxx-xxxxx",
    status: "published-shifter",
    context_status: "success",
    created_at: "2019-02-18T03:15:49+00:00",
    failure_pages: "[]",
  }
];
```

#### Publish

```typescript
await Client.publish(siteId, artifactId);
("");
```

#### Stop generating artifact

```typescript
const sites = await client.stopGenerating(siteId, artifactId);
("");
```

#### Update specific artifact name

```typescript
const sites = await client.updateName(siteId, artifactId, name);
("");
```

#### Enable preview

```typescript
await client.enablePreview(siteId, artifactId);

("https://xxxxx-xxxx-xxxxx-xxxx.preview.getshifter.io");
```

#### Delete

```typescript
await client.delete(siteId, artifactId);
("");
```

### Organizations

#### Initilize

```typescript
import { Organizations } from "shifter-sdk";

const client = new Organizations.Foundation({
  token: "ACCESS_TOKEN",
});
```

#### Create

```typescript
client
  .create({
    org_name: "organization name",
  })
  .then((result) => console.log(result));

{
  org_id: "xxxxxxxxxxx";
}
```

#### Update

```typescript
client
  .update("org_id", {
    org_name: "organization name",
  })
  .then(() => console.log("ok"));

ok;
```

#### List

```typescript
client.list().then((result) => console.log(result))[
  {
    org_id: "xxxxx-xxxx-xxxx-xxxx",
    org_name: "xxxxx",
    org_owner: "xxxxxxx",
    org_website: "",
    phone_number: "",
    org_country: "",
    org_state: "",
    org_twitter: "",
    org_size: "",
    projects: [],
    members: [],
  }
];
```

#### Describe

```typescript
client.descibe('org_id')
  .then(result => console.log(result))

{
  org_id: 'xxxxx-xxxx-xxxx-xxxx',
  org_name: 'xxxxx',
  org_owner: 'xxxxxxx',
  org_website: '',
  phone_number: '',
  org_country: '',
  org_state: '',
  org_twitter: '',
  org_size: '',
  projects: [],
  members: []
}
```

#### Delete

```typescript
client.delete("org_id").then(() => console.log("ok"));

ok;
```

#### Activate invited member

```typescript
client.activateInvitation("org_id", "key").then(() => console.log("ok"));

ok;
```

### Organization Site

#### Initilize

```typescript
import { Organizations } from "shifter-sdk";

const client = new Organizations.Sites({
  token: "YOUR_TOKEN",
});
```

#### List site of organization

```typescript
client.list("org_id").then((result) => console.log(result))[
  {
    project_name: "test-sub",
    stock_state: "inuse",
    project_id: "xxxx-xxxxxx-xxxxxx-xxxxxx",
    project_owner: "xxxxxx",
    php_version: "7.2",
    access_url: "xxxxxxxxx.on.getshifter.io",
    update_time: "",
    last_launched: false,
    disk_usage: 0,
    deploy_type: false,
    raw_url: "xxxxxxxxx.cloudfront.net",
    create_time: "2018-07-05T07:41:25+00:00",
    automation: false,
    generate_state: "",
    trial: "",
  }
];
```

#### Get site of organization

```typescript
client.describe('org_id', 'site_id')
  .then(result => console.log(result))

{
  "project_name": "test-sub",
  "stock_state": "inuse",
  "project_id": "xxxx-xxxxxx-xxxxxx-xxxxxx",
  "project_owner": "xxxxxx",
  "php_version": "7.2",
  "access_url": "xxxxxxxxx.on.getshifter.io",
  "update_time": "",
  "last_launched": false,
  "disk_usage": 0,
  "deploy_type": false,
  "raw_url": "xxxxxxxxx.cloudfront.net",
  "create_time": "2018-07-05T07:41:25+00:00",
  "automation": false,
  "generate_state": "",
  "trial": ""
}
```

#### Add site to organization

```typescript
client.add("org_id", ["site_id"]).then(() => console.log("ok"));

ok;
```

#### Remove site from organization

```typescript
client.remove("org_id", ["site_id"]).then(() => console.log("ok"));

ok;
```

### Organization Members

#### Initilize

```typescript
import { Organizations } from "shifter-sdk";

const client = new Organizations.Members({
  token: "YOUR_TOKEN",
});
```

#### List site of organization

```typescript
client.list('org_id')
  .then(result => console.log(result))

[
  {
    "username": "johndoe",
    "email": "hhoge@example.com",
    "user_status": "approval"
    "role": "owner"
  }
]
```

#### Add member to organization

```typescript
client
  .add("org_id", "hoge@example.com", "username")
  .then(() => console.log("ok"));

ok;
```

#### Remove members from organization

```typescript
client.remove("org_id", ["username"]).then(() => console.log("ok"));

ok;
```

### Status

#### Initilize

```typescript
import { Status } from "shifter-sdk";

const client = new Status({
  token: "YOUR_TOKEN",
});
```

#### Describe status

```typescript
client.descibe()
  .then(result => console.log(result))

{ maintenance:
   { message:
      'XXXXXXXXXXXx',
     target: [ 'generator', 'container' ],
     status: 'not_maintenance' },
  user:
   { credit_card_status: 'registered',
     upper_limit_projects: '50',
     notification: { email: [Object] },
     group: { name: 'owner' },
     max_transfer_gb: '10240',
     max_disk_gb: '1024',
     domain_setting: 'true',
     import_archives: 'true',
     export_archives: 'true',
     backup: '365',
     enable_subuser: 'true',
     export_artifact: 'true' } }
```

### Webhooks(Site)

#### Initilize

```typescript
import { Webhooks } from "shifter-sdk";

const client = new Webhooks.Site({
  token: "YOUR_TOKEN",
});
```

#### Add new Webhook

```typescript
const result = await client.create(siteId, [
  {
    hook_event: "Webhook:Artifact:Created",
    url: "https://hoge.example.com",
    enabled: false,
    headers: {},
    method: "post",
  },
])[
  {
    enabled: false,
    hook_event: "Webhook:Artifact:Created#d34c85ad-d50a-4efe-a52a-1023b30e37ed",
    webhook_url: "https://hoge.example.com",
    headers: {},
    method: "post",
    site_id: "bfd1fbde-8f01-11e8-aa52-9ad4a0753b52",
  }
];
```

#### Update Webhook

```typescript
const result = await client.update(siteId, [
  {
    hook_event: "Webhook:Artifact:Created#d34c85ad-d50a-4efe-a52a-1023b30e37ed",
    url: "https://hoge.example.com",
    enabled: true,
    headers: { "x-test": "hoge" },
    method: "post",
  },
])[
  {
    enabled: true,
    hook_event: "Webhook:Artifact:Created#d34c85ad-d50a-4efe-a52a-1023b30e37ed",
    webhook_url: "https://hoge.example.com",
    headers: { "x-test": "hoge" },
    method: "post",
    site_id: "bfd1fbde-8f01-11e8-aa52-9ad4a0753b52",
  }
];
```

#### List Webhook

```typescript
const result = await client.list(siteId)[
  {
    enabled: false,
    hook_event: "Webhook:Artifact:Created#d34c85ad-d50a-4efe-a52a-1023b30e37ed",
    webhook_url: "https://hoge.example.com",
    headers: {},
    method: "post",
    site_id: "bfd1fbde-8f01-11e8-aa52-9ad4a0753b52",
  }
];
```

#### Delete Webhook

```typescript
const result = await client.delete(siteId, [
  {
    hook_event: "Webhook:Artifact:Created#d34c85ad-d50a-4efe-a52a-1023b30e37ed",
  },
]);
("");
```
