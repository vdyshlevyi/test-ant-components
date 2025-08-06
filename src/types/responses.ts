import type { IUser } from "./auth"

export interface ILoginResponse {
  id: number
  first_name: string
  last_name: string
  email: string
  role: string
  access_token: string
}

export interface IProfileResponse {
  id: number
  first_name: string
  last_name: string
  email: string
  role: string
}

export interface IUsersListResponse {
  total: number
  items: IUser[]
  page: number
  page_size: number
}
