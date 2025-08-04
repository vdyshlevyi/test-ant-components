const API_BASE = "http://localhost:9000/api/v1"

export const URLS = {
  auth: {
    login: `${API_BASE}/authentication/login`,
    signUp: `${API_BASE}/authentication/sign-up`,
  },
  users: {
    profile: `${API_BASE}/users/profile`,
  },
}
