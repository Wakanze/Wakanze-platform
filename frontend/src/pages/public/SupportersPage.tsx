import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import CtaBand from '../../components/CtaBand.tsx'
import PageHeader from '../../components/PageHeader.tsx'
import SupporterCard from '../../components/SupporterCard.tsx'
import { button, container, field, label } from '../../components/styles.ts'
import {
  type SupporterFilters,
  filterSupporters,
  supporterCountries,
} from '../../features/supporters/filterSupporters.ts'
import { usePageMeta } from '../../lib/usePageMeta.ts'
import { supporters } from '../../mocks/supporters.ts'
import type { SupporterTopic } from '../../mocks/types.ts'

const TOPICS: (SupporterTopic | 'all')[] = ['all', 'history', 'culture', 'music', 'business', 'language', 'film']

/**
 * People who support Wakanze and create related content (CRT-1, CRT-3).
 * The list is curated by the Wakanze team: there is no public sign-up or account (CRT-4).
 */
export default function SupportersPage() {
  const { t } = useTranslation()
  usePageMeta(t('supporters.title'), t('supporters.intro'))
  const [filters, setFilters] = useState<SupporterFilters>({ topic: 'all', country: 'all' })
  const countries = useMemo(() => supporterCountries(supporters), [])
  const list = filterSupporters(supporters, filters)

  return (
    <main>
      <PageHeader kicker={t('supporters.kicker')} title={t('supporters.title')} intro={t('supporters.intro')} tone="gold" />
      <section className={`${container} py-12`}>
        <form
          aria-label={t('supporters.filterLabel')}
          onSubmit={(e) => e.preventDefault()}
          className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-paper-200 sm:grid-cols-2"
        >
          <label className={label}>
            {t('supporters.topic')}
            <select
              value={filters.topic}
              onChange={(e) => setFilters({ ...filters, topic: e.target.value as SupporterFilters['topic'] })}
              className={field}
            >
              {TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  {t(`supporters.topics.${topic}`)}
                </option>
              ))}
            </select>
          </label>
          <label className={label}>
            {t('supporters.country')}
            <select
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              className={field}
            >
              <option value="all">{t('supporters.allCountries')}</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>
        </form>
        <p className="mt-6 text-sm text-ink-500" aria-live="polite">
          {t('supporters.count', { count: list.length })}
        </p>
        {list.length > 0 ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((supporter) => (
              <SupporterCard key={supporter.slug} supporter={supporter} />
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-2xl bg-white p-8 text-center text-ink-700 ring-1 ring-paper-200">
            {t('supporters.empty')}
          </p>
        )}
        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-ink-950 p-8 text-paper-50 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold">{t('supporters.joinTitle')}</h2>
            <p className="mt-1 text-paper-200">{t('supporters.joinBody')}</p>
          </div>
          <Link to="/join?interest=creator" className={button.accent}>
            {t('supporters.joinCta')}
          </Link>
        </div>
      </section>
      <CtaBand />
    </main>
  )
}
