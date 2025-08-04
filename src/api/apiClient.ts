import { ACCESS_TOKEN_KEY } from "../auth/constants"

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

const request = async <TResponse, TBody = undefined>(
  method: HttpMethod,
  url: string,
  body?: TBody,
): Promise<TResponse> => {
  const headers: HeadersInit = { "Content-Type": "application/json" }

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`
  }

  const response = await fetch(url, {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  })

  if (!response.ok) {
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
  ): Promise<TResponse> => request<TResponse>("POST", url, body),

  put: <TResponse, TRequest = unknown>(
    url: string,
    body?: TRequest,
  ): Promise<TResponse> => request<TResponse>("PUT", url, body),

  patch: <TResponse, TRequest = unknown>(
    url: string,
    body?: TRequest,
  ): Promise<TResponse> => request<TResponse>("PATCH", url, body),

  delete: <TResponse>(url: string): Promise<TResponse> =>
    request<TResponse>("DELETE", url),
}
