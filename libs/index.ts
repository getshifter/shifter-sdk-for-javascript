import _Status from './status/index'
import _Auth from './auth/index'
import _Counpon from './coupon/index'
import _Intercom from './intercom/index'
import _Invoice from './invoices/index'
import _Organizations from './organizations/index'
import _Statistics from './statistics'
import _Sites from './sites'
import _Artifacts from './artifacts'
import _Webhooks from './webhooks'
// helper
import _ConfigFactory from './helpers/configFactory'

export const ConfigFactory = _ConfigFactory
export const Status = _Status
export const Auth = _Auth
export const Counpon = _Counpon
export const Intercom = _Intercom
export const Invoice = _Invoice
export const Organizations = _Organizations
export const Statistics = _Statistics
export const Sites = _Sites
export const Artifacts = _Artifacts
export const Webhooks = _Webhooks

export default {
  Status,
  Auth,
  Counpon,
  Intercom,
  Invoice,
  ConfigFactory,
  Organizations,
  Statistics,
  Sites,
  Artifacts,
  Webhooks,
}