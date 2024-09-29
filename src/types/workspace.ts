export interface WorkspacesResponseType {
  organizations: Organization[]
}

export interface Organization {
  created_at: string
  updated_at: string
  id: string
  name: string
  code_internal: string
  code_external: string
  share_internal_url: string
  share_external_url: string
  description: any
  website: any
  country: any
  billing_name: any
  billing_email: any
  billing_address: any
  billing_registration_no: any
  billing_contact: any
  current_plan: string
  avatar: string
  qr_code_internal: string
  qr_code_external: string
  total_members: number
}


export interface PostSelectWorkspaceResponse {
  data: Data
  onesignal: Onesignal
  pubnub: Pubnub
  'web-chat-version': string
}

export interface Data {
  data: Data2
}

export interface Data2 {
  id: string
  type: string
  attributes: Attributes
  relationships: Relationships
}

export interface Attributes {
  created_at: string
  updated_at: string
  id: string
  name: string
  code_internal: string
  code_external: string
  share_internal_url: string
  share_external_url: string
  description: any
  website: any
  country: any
  billing_name: any
  billing_email: any
  billing_address: any
  billing_registration_no: any
  billing_contact: any
  avatar: string
  qr_code_internal: string
  qr_code_external: string
  total_members: number
}

export interface Relationships {}

export interface Onesignal {
  external_user_id: string
  organization_user_id: string
}

export interface Pubnub {
  "auth-key": string
}
