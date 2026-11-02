import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useLocation } from 'react-router'
import { useAuth } from './useAuth.ts'

/** UX only: the API enforces access on every request. */
export default function RequireStaff({ children }: { children: ReactNode }) {
  const { account, loading } = useAuth()
  const location = useLocation()
  const { t } = useTranslation()

  if (loading) {
    return (
      <p role="status" className="mx-auto max-w-3xl px-6 py-16 text-gray-600">
        {t('common.loading')}
      </p>
    )
  }
  if (!account) return <Navigate to="/staff/login" replace state={{ from: location.pathname }} />
  return <>{children}</>
}
