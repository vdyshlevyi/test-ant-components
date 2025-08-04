import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth.ts"
import type { ReactNode } from "react"
import AuthLayout from "../layouts/AuthLayout.tsx"

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()

  // If user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/" replace />
  }
  // If user is authenticated, render the children components
  return <AuthLayout>{children}</AuthLayout>
}
