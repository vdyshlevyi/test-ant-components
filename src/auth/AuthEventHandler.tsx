import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

/**
 * Component that listens for authentication events and handles navigation.
 * Must be placed inside a Router context.
 */
export const AuthEventHandler = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Handler for unauthorized events
    const handleUnauthorized = () => {
      console.log("Handling unauthorized event, navigating to login")
      navigate("/", { replace: true })
    }

    // Listen for unauthorized events from apiClient
    window.addEventListener("auth:unauthorized", handleUnauthorized)

    // Cleanup listener on unmount
    return () =>
      window.removeEventListener("auth:unauthorized", handleUnauthorized)
  }, [navigate])

  // This component doesn't render anything
  return null
}
