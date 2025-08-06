export interface IUser {
  id: number
  first_name: string
  last_name: string
  email: string
}

export interface IAuthContextType {
  user: IUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
}
