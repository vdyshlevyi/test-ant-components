import { AuthContext } from "./AuthContext.tsx"
import { useState, useEffect, type ReactNode } from "react"
import type { IUser } from "../types/auth"
import { apiClient } from "../api/apiClient.ts"
import { URLS } from "../api/urls.ts"
import type { ILoginResponse } from "../types/responses.ts"
import { ACCESS_TOKEN_KEY } from "../auth/constants.ts"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser && savedUser !== "undefined") setUser(JSON.parse(savedUser))
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const responseJson = await apiClient.post<ILoginResponse>(
        URLS.auth.login,
        { email, password },
      )
      console.log("Login successful:", responseJson)

      const newUser: IUser = {
        id: responseJson.id,
        first_name: responseJson.first_name || null,
        last_name: responseJson.last_name || null,
        email: responseJson.email,
      }
      // Update user in state and localStorage
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      localStorage.setItem(ACCESS_TOKEN_KEY, responseJson.access_token)
    } catch (err) {
      // TODO(Valerii Dyshlevyi): Show some error message to user
      console.error("Login failed:", err)
      throw err
    }
  }

  const logout = () => {
    console.log("Logging out user")
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
