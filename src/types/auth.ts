export interface IUser {
  id: number
  first_name: string | null
  last_name: string | null
  email: string
}

export interface IAuthContextType {
  user: IUser | null
  setUser: (user: IUser | null) => void
  login: (email: string, password: string) => void
  logout: () => void
}
