export interface ILoginResponse {
  id: number
  first_name: string | null
  last_name: string | null
  email: string
  access_token: string
}

export interface IProfileResponse {
  id: number
  first_name: string | null
  last_name: string | null
  email: string
}
