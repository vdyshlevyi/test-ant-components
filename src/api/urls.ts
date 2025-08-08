import { config } from "../config"

const API_BASE = config.apiBase

export const URLS = {
  auth: {
    login: `${API_BASE}/authentication/login`,
    signUp: `${API_BASE}/authentication/sign-up`,
  },
  users: {
    list: `${API_BASE}/users`,
    create: `${API_BASE}/users`,
    view: (userId: number) => `${API_BASE}/users/user/${userId}`,
    profile: `${API_BASE}/users/profile`,
  },
}
