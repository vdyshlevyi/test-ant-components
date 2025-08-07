import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { notification } from "antd"

/**
 * Component that listens for authentication events and handles navigation and notifications.
 * Must be placed inside a Router context.
 */
export const AuthEventHandler = () => {
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification()

  useEffect(() => {
    // Handler for unauthorized events
    const handleUnauthorized = () => {
      console.log("Handling unauthorized event, navigating to login")

      // Show notification to user
      api.warning({
        message: "Session Expired",
        description: "Your session has expired. Please log in again.",
        placement: "topRight",
        duration: 5,
      })

      navigate("/", { replace: true })
    }

    // Listen for unauthorized events from apiClient
    window.addEventListener("auth:unauthorized", handleUnauthorized)

    // Cleanup listener on unmount
    return () =>
      window.removeEventListener("auth:unauthorized", handleUnauthorized)
  }, [navigate, api])

  // Return context holder for notifications (renders nothing visible)
  return <>{contextHolder}</>
}
