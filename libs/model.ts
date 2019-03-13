export namespace Types {
  export type SitePath = 'projects' | 'sites'
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
  export namespace Organizations {
    export type Item = {
      org_id: string
      org_name: string
      org_owner: string
      org_website: string
      phone_number: string
      org_country: string
      org_state: string
      org_twitter: string
      org_size: string
      projects: Types.Sites.ListItems
      members: Members.ListItems
    }
    export type MetaItem = {
      org_id: string
      org_name: string
      org_owner: string
      org_website: string
      phone_number: string
      org_country: string
      org_state: string
      org_twitter: string
      org_size: string
      projects: []
      members: []
    }
    export type ListItems = Item[]
    export type ListMetaItems = MetaItem[]
    export namespace Members {
      export type Role = 'member'
      export type UserStatus = 'approval' | 'pending'
      export type Item = {
        username: string
        email: string
        user_status: UserStatus
        role: Role
      }
      export type ListItems = Item[]
    }
  }
  export namespace Sites {
    export type StockState = 'inuse' | string
    export type Item = {
      project_name: string
      stock_state: StockState
      project_id: string
      project_owner: string
      wordpress_site_url: null | string,
      php_version: string
      access_url: string
      last_launched?: string
      disk_usage: number
      deploy_type?: 'shifter_cdn'
      raw_url: string
      create_time: string
      automation: boolean
    }
    export type ListItems = Item[]
  }
  export namespace Coupon {
    export type Item = {
      id: string
      object: string
      amount_off: string
      created: string
      currency: Types.Currency
      duration: string
      duration_in_months: number
      metadata: {},
      name: any
      percent_off: any
      percent_off_precise: any
      redeem_by: any
      times_redeemed: number
      valid: boolean
    }
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
  export namespace Coupon {
    export type Detail = {
      statusCode: number
      coupon: Types.Coupon.Item
    }
  }

  export namespace Organizations {
    export type List = {
      owner: Types.Organizations.ListItems
      member: Types.Organizations.ListItems
    }
    export type ListMeta = {
      owner: Types.Organizations.ListMetaItems
      member: Types.Organizations.ListMetaItems
    }
    export type Detail = Types.Organizations.Item
    export namespace Sites {
      export type Detail = Types.Sites.Item
      export type List = Types.Sites.ListItems
    }
    export namespace Members {
      export type List = Types.Organizations.Members.ListItems
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
