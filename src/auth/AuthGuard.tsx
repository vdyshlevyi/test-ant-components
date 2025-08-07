import { Navigate } from "react-router-dom"
import { type ReactNode } from "react"
import AuthLayout from "../layouts/AuthLayout/AuthLayout.tsx"
import { getAccessToken } from "./utils.ts"

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  // If no token, redirect to login page
  const accessToken = getAccessToken()
  if (!accessToken) {
    console.warn("No access token found, redirecting to login.")
    return <Navigate to="/" replace />
  }

  // If token exists, render the children components
  return <AuthLayout>{children}</AuthLayout>
}
