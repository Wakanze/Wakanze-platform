import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import { ApiError } from '../../api/client.ts'
import { usePageMeta } from '../../lib/usePageMeta.ts'
import { useAuth } from './useAuth.ts'

const inputClass =
  'mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600'

export default function LoginPage() {
  const { t } = useTranslation()
  usePageMeta(t('auth.title'))
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(email, password)
      const from = (location.state as { from?: string } | null)?.from ?? '/staff'
      navigate(from, { replace: true })
    } catch (err) {
      setError(
        err instanceof ApiError && err.code === 'invalid_credentials' ? t('auth.invalid') : t('common.error'),
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="mx-auto max-w-sm px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900">{t('auth.title')}</h1>
      <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
        <label className="block text-sm font-medium text-gray-700">
          {t('auth.email')}
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          {t('auth.password')}
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </label>
        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
        >
          {submitting ? t('common.loading') : t('auth.submit')}
        </button>
      </form>
    </main>
  )
}
