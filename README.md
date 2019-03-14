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