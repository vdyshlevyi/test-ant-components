import { Routes, Route } from "react-router-dom"
import LoginPage from "./Login/Login"
import { apiClient } from "../api/apiClient.ts"
import type { ILoginResponse } from "../types/responses.ts"
import { URLS } from "../api/urls.ts"
import type { IUser } from "../types/auth.ts"
import { GuestGuard } from "../auth/GuestGuard.tsx"
import NotFoundPage from "./NotFound/NotFound.tsx"
import { AuthGuard } from "../auth/AuthGuard.tsx"
import Dashboard from "./Dashboard"
import Users from "./Users/Users"
import { useEffect, useCallback } from "react"
import { getAccessToken, setUser } from "../auth/utils.ts"

let profileFetched = false

export default function AppRoutes() {
  const fetchProfile = useCallback(async () => {
    if (profileFetched) {
      console.log("Profile already fetched, skipping")
      return
    }

    try {
      console.log("Fetching user profile...")
      const accessToken = getAccessToken()
      if (!accessToken || accessToken === "undefined") {
        console.warn("No access token found in fetchProfile")
        return
      }

      const responseJson = await apiClient.get<ILoginResponse>(
        URLS.users.profile,
      )
      const newUser: IUser = {
        id: responseJson.id,
        first_name: responseJson.first_name,
        last_name: responseJson.last_name,
        email: responseJson.email,
      }
      // Update user in state and localStorage
      setUser(newUser)
      profileFetched = true
    } catch (err) {
      console.error("Failed to fetch profile:", err)
      // 401 errors are handled automatically by apiClient
    }
  }, [])

  // Load profile on component mount, only if token exists
  useEffect(() => {
    const accessToken = getAccessToken()
    if (accessToken && accessToken !== "undefined") {
      // Then fetch fresh data from server
      fetchProfile()
    } else {
      console.log("No valid access token found, skipping profile fetch")
    }
  }, [fetchProfile])

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
