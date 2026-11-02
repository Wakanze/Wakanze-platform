import { useTranslation } from 'react-i18next'
import CtaBand from '../../components/CtaBand.tsx'
import PageHeader from '../../components/PageHeader.tsx'
import { container } from '../../components/styles.ts'
import { usePageMeta } from '../../lib/usePageMeta.ts'

const STEPS = ['discover', 'connect', 'participate', 'build'] as const

export default function AboutPage() {
  const { t } = useTranslation()
  usePageMeta(t('about.title'), t('about.intro'))

  return (
    <main>
      <PageHeader kicker={t('about.kicker')} title={t('about.title')} intro={t('about.intro')} tone="clay" />
      <section className={`${container} grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr]`}>
        <div className="space-y-5 text-lg leading-relaxed text-ink-700">
          <p>{t('about.body1')}</p>
          <p>{t('about.body2')}</p>
          <blockquote className="border-l-4 border-ochre-500 pl-5 font-display text-2xl italic text-forest-900">
            {t('about.quote')}
          </blockquote>
          <p>{t('about.body3')}</p>
        </div>
        <aside aria-labelledby="journey-title" className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-sand-200">
          <h2 id="journey-title" className="font-display text-2xl font-semibold text-forest-900">
            {t('about.journeyTitle')}
          </h2>
          <ol className="mt-6 space-y-6">
            {STEPS.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-800 font-semibold text-sand-50">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-ink-900">{t(`about.steps.${step}.title`)}</h3>
                  <p className="mt-1 text-sm text-ink-700">{t(`about.steps.${step}.body`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </section>
      <CtaBand />
    </main>
  )
}
