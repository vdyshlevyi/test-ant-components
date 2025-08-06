import { getAccessToken, logout } from "../auth/utils"

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

// Custom error class for unauthorized requests
export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "UnauthorizedError"
  }
}

const request = async <TResponse, TBody = unknown>(
  method: HttpMethod,
  url: string,
  body?: TBody,
): Promise<TResponse> => {
  const headers: Record<string, string> = { "Content-Type": "application/json" }

  const accessToken = getAccessToken()
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`
  }

  const response = await fetch(url, {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  })

  if (!response.ok) {
    // Handle 401 Unauthorized - logout user
    if (response.status === 401) {
      console.warn("Received 401 Unauthorized, logging out user")
      logout()
      
      // Throw a special error type for 401
      throw new UnauthorizedError("Session expired. Please log in again.")
    }

    const errorText = await response.text().catch(() => "")
    throw new Error(
      `API Error (${response.status}): ${response.statusText} - ${errorText}`,
    )
  }

  return response.json() // assume JSON always
}

export const apiClient = {
  get: <TResponse>(url: string): Promise<TResponse> =>
    request<TResponse>("GET", url),

  post: <TResponse, TRequest = unknown>(
    url: string,
    body?: TRequest,
  ): Promise<TResponse> => request<TResponse, TRequest>("POST", url, body),

  put: <TResponse, TRequest = unknown>(
    url: string,
    body?: TRequest,
  ): Promise<TResponse> => request<TResponse, TRequest>("PUT", url, body),

  patch: <TResponse, TRequest = unknown>(
    url: string,
    body?: TRequest,
  ): Promise<TResponse> => request<TResponse, TRequest>("PATCH", url, body),

  delete: <TResponse>(url: string): Promise<TResponse> =>
    request<TResponse>("DELETE", url),
}
