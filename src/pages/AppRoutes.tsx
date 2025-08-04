import { Routes, Route } from "react-router-dom"
import LoginPage from "../pages/Login/Login.tsx"
import { useAuth } from "../hooks/useAuth.ts"
import { apiClient } from "../api/apiClient.ts"
import type { ILoginResponse } from "../types/responses.ts"
import { URLS } from "../api/urls.ts"
import type { IUser } from "../types/auth.ts"
import { GuestGuard } from "../auth/GuestGuard.tsx"
import { ACCESS_TOKEN_KEY } from "../auth/constants.ts"
import NotFoundPage from "./NotFound.tsx"
import { AuthGuard } from "../auth/AuthGuard.tsx"
import Dashboard from "./Dashboard.tsx"
import Users from "./Users.tsx"
import { useEffect } from "react"

let profileFetched = false

export default function AppRoutes() {
  const { setUser, logout } = useAuth()

  const fetchProfile = async () => {
    if (profileFetched) {
      console.log("Profile already fetched, skipping")
      return
    }

    try {
      console.log("Fetching user profile...")
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
      if (!accessToken || accessToken === "undefined") {
        console.warn("No access token found in fetchProfile")
        return
      }

      const responseJson = await apiClient.get<ILoginResponse>(
        URLS.users.profile,
      )
      const newUser: IUser = {
        id: responseJson.id,
        first_name: responseJson.first_name || null,
        last_name: responseJson.last_name || null,
        email: responseJson.email,
      }
      // Update user in state and localStorage
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      profileFetched = true
    } catch (err) {
      console.error("Failed to fetch profile:", err)
      logout()
    }
  }

  // Load profile on component mount, only if token exists
  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
    const savedUser = localStorage.getItem("user")

    if (accessToken && accessToken !== "undefined") {
      // If there's a saved user, use it first for immediate display
      if (savedUser && savedUser !== "undefined") {
        try {
          const parsedUser = JSON.parse(savedUser)
          setUser(parsedUser)
          console.log("Using saved user data")
        } catch (err) {
          console.warn("Failed to parse saved user data:", err)
        }
      }

      // Then fetch fresh data from server
      fetchProfile()
    } else {
      console.log("No valid access token found, skipping profile fetch")
    }
  }, []) // Empty dependency array - useEffect runs only once on mount


  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestGuard>
            <LoginPage />
          </GuestGuard>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        }
      />
      <Route
        path="/users"
        element={
          <AuthGuard>
            <Users />
          </AuthGuard>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
