import type { ReactNode } from "react"
import "./GuestLayout.css"

export default function GuestLayout({ children }: { children: ReactNode }) {
  return <div className="guest-layout">{children}</div>
}
