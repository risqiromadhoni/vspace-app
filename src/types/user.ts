export interface LoginResponseType {
  message: Message
  message_title: string
  status: string
}

export interface Message {
  user: UserType
}

export interface UserType {
  area_code: any
  availability_status: any
  availability_updated_at: any
  avatar: string
  color_label: string
  country: any
  country_code: any
  created_at: string
  custom_field: any
  email: string
  email_verification: boolean
  id: string
  initial_name: string
  is_complete: boolean
  last_device_type: string
  last_online_at: string
  locale: any
  name: string
  online: boolean
  phone_number: any
  pin_code: any
  pubnub_object: string[]
  status_message: any
  timezone_area: string
  timezone_time: string
  updated_at: string
}
