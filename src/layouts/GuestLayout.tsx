import type { ReactNode } from "react"

export default function GuestLayout({ children }: { children: ReactNode }) {
  return <div className="guest-layout">{children}</div>
}
