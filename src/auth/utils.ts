import { ACCESS_TOKEN_KEY } from "./constants"
import type { IUser } from "../types/auth"

// Token management utilities
export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

// User management utilities
export const getUser = (): IUser | null => {
  const savedUser = localStorage.getItem("user")
  if (savedUser && savedUser !== "undefined") {
    try {
      const parsedUser = JSON.parse(savedUser)

      // Validate that the parsed user has required properties
      if (
        parsedUser &&
        typeof parsedUser === "object" &&
        typeof parsedUser.id === "number" &&
        typeof parsedUser.email === "string" &&
        parsedUser.email.length > 0
      ) {
        return parsedUser as IUser
      } else {
        console.warn(
          "Invalid user data in localStorage, clearing:",
          parsedUser,
        )
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

export const setUser = (user: IUser | null) => {
  if (user) {
    // Validate user data before storing
    if (
      typeof user.id === "number" &&
      typeof user.email === "string" &&
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

export const removeUser = () => {
  localStorage.removeItem("user")
}

// Complete logout utility
export const logout = () => {
  console.log("Logging out user")
  removeUser()
  removeAccessToken()
}
