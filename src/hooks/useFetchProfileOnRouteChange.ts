import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { ACCESS_TOKEN_KEY } from "../auth/constants"

export const useFetchProfileOnRouteChange = (fetchProfile: () => void) => {
  const location = useLocation()

  useEffect(() => {
    const access_token = localStorage.getItem(ACCESS_TOKEN_KEY)
    if (access_token && access_token !== "undefined") return
    fetchProfile()
  }, [location.pathname, fetchProfile])
}
