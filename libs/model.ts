export namespace Types {
  export type BooleanString = 'true' | 'false'
  export type NumberString = '1' | string
  export namespace Maintenance {
    export type Message = string
    export type Target = 'generator' | 'container'
    export type Status = 'not_maintenance' | string
    export type Props = {
      message: Message
      target: Target[]
      status: Status
    }
  }
  export namespace User {
    export type GroupName = 'owners' | 'administrators' | 'generalUsers'
    export type Group = {
      name: GroupName
    }
    export type Status = {
      credit_card_status: string //"registered",
      upper_limit_projects: NumberString,
      notification?: {
        email: {
          destination: string
        }
      },
      group: Group
      max_transfer_gb: NumberString
      max_disk_gb: NumberString
      domain_setting: BooleanString
      backup: NumberString
      enable_subuser: BooleanString
    }
  }
  export type Period = {
    start: string
    end: string
  }
  export type Currency = "usd" | 'USD'
  export namespace Invoice {
    export type Item = {
      currency: Currency
      subtotal: string
      total: string
      amount_due: string
      invoice_description: string
      description: string
      date: string
      invoice_pdf: string,
      period: Period
    }
    export type ListItems = Item[]
  }
}

export namespace Api {
  export namespace auth {
    export type config = {
      endpoint?: string,
      version?: Version
    }
    export type loginResult = {
      AccessToken: string,
      RefreshToken: string
    }
  }
  export namespace Status {
    export type Response = {
      maintenance: Types.Maintenance.Props
      user: Types.User.Status
    }
  }
  export namespace Intercom {
    export namespace HMAC {
      export type Response = string
    }
  }
  export namespace Invoice {
    export namespace Item {
      export type Response = {
        statusCode: number
        invoice: Types.Invoice.Item
      }
    }
    export namespace List {
      export type Response = {
        statusCode: number
        invoices: Types.Invoice.ListItems
      }
    }
  }
  export type Version = 'v1' | 'v2' | 'v3'
  export type authType = 'token' | 'apikey' | 'none'
  export type constructorProps = {
    token: string,
    endpoint?: string,
    version?: Version
  }
  export type headers = {
    [key: string]: string
  }
  export interface ConfigBuilder {
    setVersion(version: Version): ConfigBuilder
    setEndpoint(endpoint: string): ConfigBuilder
    updateToken(token: string): ConfigBuilder
    getConfig(): constructorProps
  }  
}
