import { AuthContext } from "./AuthContext.tsx"
import { type ReactNode } from "react"
import type { IUser } from "../types/auth"
import { apiClient } from "../api/apiClient.ts"
import { URLS } from "../api/urls.ts"
import type { ILoginResponse } from "../types/responses.ts"
import { ACCESS_TOKEN_KEY } from "../auth/constants.ts"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const getUser = (): IUser | null => {
    const savedUser = localStorage.getItem("user")
    if (savedUser && savedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(savedUser)
        
        // Validate that the parsed user has required properties
        if (
          parsedUser && 
          typeof parsedUser === 'object' &&
          typeof parsedUser.id === 'number' &&
          typeof parsedUser.email === 'string' &&
          parsedUser.email.length > 0
        ) {
          return parsedUser as IUser
        } else {
          console.warn("Invalid user data in localStorage, clearing:", parsedUser)
          localStorage.removeItem("user")
          return null
        }
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err)
        localStorage.removeItem("user") // Clear corrupted data
        return null
      }
    }
    return null
  }

  const setUser = (user: IUser | null) => {
    if (user) {
      // Validate user data before storing
      if (
        typeof user.id === 'number' &&
        typeof user.email === 'string' &&
        user.email.length > 0
      ) {
        localStorage.setItem("user", JSON.stringify(user))
      } else {
        console.error("Attempted to store invalid user data:", user)
        localStorage.removeItem("user")
      }
    } else {
      localStorage.removeItem("user")
    }
  }

  const getAccessToken = (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  }

  const setAccessToken = (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
  }

  const login = async (email: string, password: string) => {
    try {
      const responseJson = await apiClient.post<ILoginResponse>(
        URLS.auth.login,
        { email, password }
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
    } catch (err) {
      console.error("Login failed:", err)
      throw err
    }
  }

  const logout = () => {
    console.log("Logging out user")
    localStorage.removeItem("user")
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  }

  const contextValue = {
    user: getUser(), // Always get fresh data from localStorage
    getUser,
    setUser,
    getAccessToken,
    setAccessToken,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}
