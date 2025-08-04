import { createContext } from "react"
import type { IAuthContextType } from "../types/auth"

export const AuthContext = createContext<IAuthContextType | undefined>(
  undefined,
)
