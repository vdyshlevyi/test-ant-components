import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { notification } from "antd"

/**
 * Component that listens for authentication events and handles navigation and notifications.
 * Must be placed inside a Router context.
 */
export const AuthEventHandler = () => {
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification()
  const isHandlingUnauthorized = useRef(false)

  useEffect(() => {
    // Handler for unauthorized events
    const handleUnauthorized = () => {
      // Prevent duplicate handling within a short time window
      if (isHandlingUnauthorized.current) {
        console.log("Already handling unauthorized event, skipping...")
        return
      }

      isHandlingUnauthorized.current = true
      console.log("Handling unauthorized event, navigating to login")

      // Show session expired notification
      api.warning({
        message: "Session Expired",
        description: "Your session has expired. Please log in again.",
        placement: "topRight",
        duration: 5,
      })

      navigate("/", { replace: true })

      // Reset the flag after a short delay to allow future unauthorized events
      setTimeout(() => {
        isHandlingUnauthorized.current = false
      }, 1000) // 1 second debounce
    }

    // Listen for unauthorized events from apiClient
    window.addEventListener("auth:unauthorized", handleUnauthorized)

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized)
      isHandlingUnauthorized.current = false
    }
  }, [navigate, api])

  // Return the context holder so notifications can be displayed
  return <>{contextHolder}</>
}
