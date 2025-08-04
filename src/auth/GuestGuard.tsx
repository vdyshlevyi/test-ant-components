import { Navigate } from "react-router-dom"
import { ACCESS_TOKEN_KEY } from "./constants"
import GuestLayout from "../layouts/GuestLayout"

export function GuestGuard({ children }: { children: React.ReactNode }) {
  const user = localStorage.getItem(ACCESS_TOKEN_KEY)

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return <GuestLayout>{children}</GuestLayout>
}
