import { AuthContext } from "./AuthContext.tsx"
import { type ReactNode, useState } from "react"
import type { IUser } from "../types/auth.ts"
import { apiClient } from "../api/apiClient.ts"
import { URLS } from "../api/urls.ts"
import type { ILoginResponse } from "../types/responses.ts"
import {
  getUser,
  setUser,
  getAccessToken,
  setAccessToken,
} from "../auth/utils.ts"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Use state to track user, initialized from localStorage
  const [user, setUserState] = useState<IUser | null>(() => getUser())

  const login = async (email: string, password: string) => {
    try {
      const responseJson = await apiClient.post<ILoginResponse>(
        URLS.auth.login,
        { email, password },
      )
      const newUser: IUser = {
        id: responseJson.id,
        first_name: responseJson.first_name,
        last_name: responseJson.last_name,
        email: responseJson.email,
      }
      // Save user and token to localStorage
      setUser(newUser)
      setAccessToken(responseJson.access_token)

      // Update state immediately so components re-render
      setUserState(newUser)
    } catch (err) {
      console.error("Login failed:", err)
      throw err
    }
  }

  const contextValue = {
    user, // Use state instead of getUser()
    isAuthenticated: !!getAccessToken(),
    login,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
