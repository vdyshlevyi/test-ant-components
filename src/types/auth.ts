export interface IUser {
  id: number
  first_name: string
  last_name: string
  email: string
}

export interface IAuthContextType {
  getUser: () => IUser | null
  setUser: (user: IUser | null) => void
  getAccessToken: () => string | null
  setAccessToken: (token: string) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}
