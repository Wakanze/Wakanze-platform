import { api } from '../../api/client.ts'

export type StaffRole = 'admin' | 'editor'

export type StaffAccount = {
  id: string
  email: string
  roles: StaffRole[]
}

export const authApi = {
  /** Also primes the CSRF cookie when logged out (the server sets it on every call). */
  me: () => api.get<StaffAccount>('/auth/me/'),
  login: (email: string, password: string) =>
    api.post<StaffAccount>('/auth/login/', { email, password }),
  logout: () => api.post<void>('/auth/logout/'),
}
