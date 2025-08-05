import { config } from "../config"

const API_BASE = config.apiBase

export const URLS = {
  auth: {
    login: `${API_BASE}/authentication/login`,
    signUp: `${API_BASE}/authentication/sign-up`,
  },
  users: {
    profile: `${API_BASE}/users/profile`,
  },
}
