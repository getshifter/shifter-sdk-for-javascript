# Shifter SDK for JavaScript

## Usage

### Sign in

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

### Statistics

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


### Organization

#### Initilize
```typescript
import { Organizations } from 'shifter-sdk'

const client = new Organizations.Foundation({
  token: 'YOUR_TOKEN'
})
```

#### Create

```typescript
client.create({
  org_name: 'organization name'
}).then(result => console.log(result))

{
  org_id: 'xxxxxxxxxxx'
}
```

#### Update

```typescript
// Create organization
client.update('org_id', {
  org_name: 'organization name'
}).then(() => console.log('ok'))

ok
```

#### List

```typescript
// Create organization
client.list().then(result => console.log(result))

[
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
] 
```

#### Describe

```typescript
// Create organization
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