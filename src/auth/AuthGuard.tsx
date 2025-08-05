import { Navigate } from "react-router-dom"
import { type ReactNode } from "react"
import AuthLayout from "../layouts/AuthLayout.tsx"
import { useAuth } from "../hooks/useAuth.ts"

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { getAccessToken } = useAuth()

  // If no token, redirect to login page
  if (!getAccessToken() || getAccessToken() === "undefined") {
    console.warn("No access token found, redirecting to login.")
    return <Navigate to="/" replace />
  }

  // If token exists, render the children components
  return <AuthLayout>{children}</AuthLayout>
}
