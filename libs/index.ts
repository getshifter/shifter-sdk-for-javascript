import _Status from './status/index'
import _Auth from './auth/index'
import _Counpon from './coupon/index'
import _Intercom from './intercom/index'
import _Invoice from './invoices/index'
import _Organizations from './organizations/index'
import _Statistics from './statistics'
// helper
import _ConfigFactory from './helpers/configFactory'

export const Status = _Status
export const Auth = _Auth
export const Counpon = _Counpon
export const Intercom = _Intercom
export const Invoice = _Invoice
export const Organizations = _Organizations
export const Statistics = _Statistics
export const ConfigFactory = _ConfigFactory

export default {
  Status,
  Auth,
  Counpon,
  Intercom,
  Invoice,
  ConfigFactory,
  Organizations,
  Statistics,
}