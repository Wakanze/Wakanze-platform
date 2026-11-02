import { type FormEvent, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import { button } from '../../components/styles.ts'
import { isValidEmail, readLeadSource } from './leadSource.ts'

type Props = {
  /** 'dark' for the emerald band, 'light' for sand or white surfaces. */
  variant?: 'dark' | 'light'
}

/**
 * Email capture, embeddable on any page (LEAD-1). Records where the lead came from
 * (LEAD-3, SOC-1) and explains the double opt-in step (LEAD-4).
 * Mockup: nothing is sent. Phase 3 replaces onSubmit with POST /api/v1/leads/.
 */
export default function NewsletterSignup({ variant = 'dark' }: Props) {
  const { t } = useTranslation()
  const location = useLocation()
  const id = useId()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sentTo, setSentTo] = useState<string | null>(null)
  const dark = variant === 'dark'

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!isValidEmail(email)) {
      setError(t('newsletter.invalidEmail'))
      return
    }
    const source = readLeadSource(location.pathname, location.search)
    console.info('[mockup] lead captured', { email: email.trim(), source })
    setError(null)
    setSentTo(email.trim())
  }

  if (sentTo) {
    return (
      <div role="status" className={`rounded-2xl p-5 ${dark ? 'bg-forest-900 text-sand-50' : 'bg-forest-50 text-forest-900'}`}>
        <p className="font-display text-lg font-semibold">{t('newsletter.checkInbox')}</p>
        <p className={`mt-1 text-sm ${dark ? 'text-sand-200' : 'text-ink-700'}`}>
          {t('newsletter.sentTo', { email: sentTo })}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={`${id}-note`}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          {t('newsletter.emailLabel')}
        </label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={t('newsletter.placeholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`min-w-0 flex-1 rounded-full px-5 py-3 text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 ${
            dark ? 'bg-sand-50 focus:ring-ochre-300' : 'border border-sand-300 bg-white focus:ring-forest-700/30'
          }`}
        />
        <button type="submit" className={`${dark ? button.accent : button.primary} py-3`}>
          {t('newsletter.submit')}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className={`mt-2 text-sm ${dark ? 'text-ochre-300' : 'text-clay-700'}`}>
          {error}
        </p>
      )}
      <p id={`${id}-note`} className={`mt-3 text-xs ${dark ? 'text-sand-200' : 'text-ink-500'}`}>
        {t('newsletter.note')}
      </p>
    </form>
  )
}
