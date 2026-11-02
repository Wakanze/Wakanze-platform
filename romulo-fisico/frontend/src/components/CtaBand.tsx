import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import NewsletterSignup from '../features/lead-capture/NewsletterSignup.tsx'
import PatternArt from './PatternArt.tsx'
import { button, container } from './styles.ts'

/** The call-to-action every major page carries (WEB-4): email capture, then interest. */
export default function CtaBand() {
  const { t } = useTranslation()

  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-forest-800 text-sand-50">
      <PatternArt tone="clay" cols={48} rows={1} seed={3} className="h-8 w-full" />
      <div className={`${container} grid gap-10 py-16 lg:grid-cols-2 lg:items-center`}>
        <div>
          <h2 id="cta-title" className="font-display text-3xl font-semibold sm:text-4xl">
            {t('cta.title')}
          </h2>
          <p className="mt-4 max-w-xl text-sand-200">{t('cta.body')}</p>
          <Link to="/join" className={`${button.onDark} mt-6`}>
            {t('cta.join')} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div>
          <NewsletterSignup variant="dark" />
        </div>
      </div>
    </section>
  )
}
