import { Navigate } from "react-router-dom"
import { getAccessToken } from "./utils"
import GuestLayout from "../layouts/GuestLayout/GuestLayout"
import type { ReactNode } from "react"

export function GuestGuard({ children }: { children: ReactNode }) {
  const user = getAccessToken()

  if (user) {
    console.warn("User is already authenticated, redirecting to dashboard.")
    return <Navigate to="/dashboard" replace />
  }

  return <GuestLayout>{children}</GuestLayout>
}
