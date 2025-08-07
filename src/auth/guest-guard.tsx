import { Navigate } from "react-router-dom"
import { getAccessToken } from "./utils"
import GuestLayout from "../layouts/guest-layout/guest-layout"
import type { ReactNode } from "react"

export function GuestGuard({ children }: { children: ReactNode }) {
  const accessToken = getAccessToken()

  if (accessToken) {
    console.warn("User is already authenticated, redirecting to dashboard.")
    return <Navigate to="/dashboard" replace />
  }

  return <GuestLayout>{children}</GuestLayout>
}
