import Client from '../helpers/client'

class Status extends Client {
  version = 'v2'
  namespace = 'status'
  getStatus() {
    return this.get()
  }
}

export default Status