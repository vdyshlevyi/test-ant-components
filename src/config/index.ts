// Configuration for the application
export const config = {
  // Backend URL from environment variable or default to localhost
  backendUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:9901",

  // API version
  apiVersion: "v1",

  // Full API base URL
  get apiBase() {
    return `${this.backendUrl}/api/${this.apiVersion}`
  },
}
