import { Navigate } from "react-router-dom"
import { ACCESS_TOKEN_KEY } from "./constants"
import GuestLayout from "../layouts/GuestLayout"
import type { ReactNode } from "react"

export function GuestGuard({ children }: { children: ReactNode }) {
  const user = localStorage.getItem(ACCESS_TOKEN_KEY)

  if (user) {
    console.warn("User is already authenticated, redirecting to dashboard.")
    return <Navigate to="/dashboard" replace />
  }

  return <GuestLayout>{children}</GuestLayout>
}
