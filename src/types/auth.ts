export enum UserRole {
  ADMIN = "ADMIN",
  DISPATCHER = "DISPATCHER", 
  COURIER = "COURIER",
  CLIENT = "CLIENT"
}

export interface IUser {
  id: number
  first_name: string
  last_name: string
  email: string
  role: UserRole
}

export interface IAuthContextType {
  user: IUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
}
