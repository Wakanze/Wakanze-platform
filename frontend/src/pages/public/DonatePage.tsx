import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import CtaBand from '../../components/CtaBand.tsx'
import PageHeader from '../../components/PageHeader.tsx'
import { button, container } from '../../components/styles.ts'
import { DONATION_LINKS, STORE_URL } from '../../lib/links.ts'
import { usePageMeta } from '../../lib/usePageMeta.ts'

/**
 * Support Wakanze: donations and merchandise are the project's two sources of income.
 * Both run on external platforms, so this page links out to them.
 */
export default function DonatePage() {
  const { t } = useTranslation()
  usePageMeta(t('donate.title'), t('donate.intro'))

  return (
    <main>
      <PageHeader kicker={t('donate.kicker')} title={t('donate.title')} intro={t('donate.intro')} tone="flame" />
      <section className={`${container} grid gap-6 py-12 md:grid-cols-2`}>
        <div className="flex flex-col rounded-2xl bg-ink-950 p-8 text-paper-50">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold-300">{t('donate.giveKicker')}</p>
          <h2 className="mt-3 font-display text-2xl font-bold">{t('donate.giveTitle')}</h2>
          <p className="mt-3 flex-1 text-paper-200">{t('donate.giveBody')}</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {DONATION_LINKS.map((link) => (
              <li key={link.id}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className={button.accent}>
                  {t('donate.via', { name: link.name })} <span aria-hidden="true">↗</span>
                  <span className="sr-only"> {t('common.opensInNewTab')}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col rounded-2xl bg-white p-8 ring-1 ring-paper-200">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold-700">{t('donate.shopKicker')}</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-ink-950">{t('donate.shopTitle')}</h2>
          <p className="mt-3 flex-1 text-ink-700">{t('donate.shopBody')}</p>
          <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className={`${button.primary} mt-6 self-start`}>
            {t('donate.shopCta')} <span aria-hidden="true">↗</span>
            <span className="sr-only"> {t('common.opensInNewTab')}</span>
          </a>
        </div>
      </section>
      <section className={`${container} pb-16`}>
        <div className="rounded-2xl bg-gold-50 p-8 ring-1 ring-gold-100">
          <h2 className="font-display text-xl font-bold text-ink-950">{t('donate.otherTitle')}</h2>
          <p className="mt-2 text-ink-700">{t('donate.otherBody')}</p>
          <Link to="/join" className={`${button.secondary} mt-5`}>
            {t('donate.otherCta')}
          </Link>
        </div>
      </section>
      <CtaBand />
    </main>
  )
}
