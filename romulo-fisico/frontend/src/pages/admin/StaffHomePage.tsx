import { useTranslation } from 'react-i18next'
import { useAuth } from '../../features/auth/useAuth.ts'
import { usePageMeta } from '../../lib/usePageMeta.ts'

/**
 * Staff landing. Per Readiness Report §4, pages/admin holds only the two screens
 * Django Admin cannot express: NewsletterApproval and AnalyticsDashboard.
 */
export default function StaffHomePage() {
  const { t } = useTranslation()
  usePageMeta(t('staff.title'))
  const { account, logout } = useAuth()
  if (!account) return null

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900">{t('staff.title')}</h1>
      <p className="mt-4 text-gray-700">{t('staff.signedInAs', { email: account.email })}</p>
      <p className="text-gray-700">{t('staff.roles', { roles: account.roles.join(', ') })}</p>
      <p className="mt-2 text-sm text-gray-500">{t('staff.rolesNote')}</p>
      <a href="/admin/" className="mt-6 inline-block text-emerald-700 underline">
        {t('staff.djangoAdmin')}
      </a>
      <p className="mt-6 text-sm text-gray-500">{t('staff.upcoming')}</p>
      <button
        type="button"
        onClick={() => void logout()}
        className="mt-8 rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
      >
        {t('auth.logout')}
      </button>
    </main>
  )
}
