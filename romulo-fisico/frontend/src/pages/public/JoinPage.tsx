import { useSearchParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import PageHeader from '../../components/PageHeader.tsx'
import { container } from '../../components/styles.ts'
import InterestForm from '../../features/interest-submission/InterestForm.tsx'
import { isInterestCategory } from '../../features/interest-submission/categories.ts'
import { usePageMeta } from '../../lib/usePageMeta.ts'

const NEXT = ['review', 'contact', 'connect'] as const

/** The last step of the loop: participation interest (MEM-1..MEM-4). */
export default function JoinPage() {
  const { t } = useTranslation()
  usePageMeta(t('join.title'), t('join.intro'))
  const [params] = useSearchParams()
  const requested = params.get('interest')

  return (
    <main>
      <PageHeader kicker={t('join.kicker')} title={t('join.title')} intro={t('join.intro')} tone="clay" />
      <section className={`${container} grid gap-10 py-12 lg:grid-cols-[1.6fr_1fr]`}>
        <InterestForm initialCategory={isInterestCategory(requested) ? requested : undefined} />
        <aside aria-labelledby="next-title" className="h-fit rounded-2xl bg-forest-800 p-8 text-sand-50">
          <h2 id="next-title" className="font-display text-2xl font-semibold">
            {t('join.nextTitle')}
          </h2>
          <ol className="mt-6 space-y-5">
            {NEXT.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ochre-500 text-sm font-semibold text-ink-900">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-sand-200">{t(`join.next.${step}`)}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 border-t border-forest-700 pt-5 text-xs leading-relaxed text-sand-300">{t('join.notMembership')}</p>
        </aside>
      </section>
    </main>
  )
}
