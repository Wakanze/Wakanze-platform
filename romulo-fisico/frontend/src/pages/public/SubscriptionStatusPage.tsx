import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import PatternArt from '../../components/PatternArt.tsx'
import { button, container } from '../../components/styles.ts'
import { usePageMeta } from '../../lib/usePageMeta.ts'

/**
 * Landing pages for the links in our emails:
 * - confirmed: double opt-in confirmation (LEAD-4)
 * - unsubscribed: one-click unsubscribe, no login or extra step (LEAD-5)
 * Mockup: the token in the link is not checked yet.
 */
export default function SubscriptionStatusPage({ status }: { status: 'confirmed' | 'unsubscribed' }) {
  const { t } = useTranslation()
  usePageMeta(t(`subscription.${status}.title`))

  return (
    <main className={`${container} flex flex-col items-center py-20 text-center`}>
      <PatternArt tone={status === 'confirmed' ? 'forest' : 'ochre'} cols={3} rows={1} seed={2} className="h-16 w-48 rounded-2xl" />
      <h1 className="mt-8 font-display text-4xl font-semibold text-forest-900">{t(`subscription.${status}.title`)}</h1>
      <p className="mt-4 max-w-lg text-lg text-ink-700">{t(`subscription.${status}.body`)}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {status === 'confirmed' ? (
          <>
            <Link to="/articles" className={button.primary}>
              {t('subscription.confirmed.cta')}
            </Link>
            <Link to="/join" className={button.secondary}>
              {t('nav.join')}
            </Link>
          </>
        ) : (
          <Link to="/" className={button.secondary}>
            {t('notFound.back')}
          </Link>
        )}
      </div>
    </main>
  )
}
