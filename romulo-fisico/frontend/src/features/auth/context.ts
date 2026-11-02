import { createContext } from 'react'
import type { StaffAccount } from './api.ts'

export type AuthState = {
  account: StaffAccount | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthState | null>(null)
