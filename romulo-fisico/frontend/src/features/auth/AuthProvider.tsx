import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { ApiError } from '../../api/client.ts'
import { authApi, type StaffAccount } from './api.ts'
import { AuthContext } from './context.ts'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<StaffAccount | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authApi
      .me()
      .then(setAccount)
      .catch((err: unknown) => {
        if (!(err instanceof ApiError)) console.error(err)
        setAccount(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setAccount(await authApi.login(email, password))
  }, [])

  const logout = useCallback(async () => {
    await authApi.logout()
    setAccount(null)
    await authApi.me().catch(() => undefined) // re-prime the CSRF cookie
  }, [])

  const value = useMemo(() => ({ account, loading, login, logout }), [account, loading, login, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
