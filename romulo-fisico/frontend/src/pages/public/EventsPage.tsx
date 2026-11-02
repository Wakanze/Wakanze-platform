import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CtaBand from '../../components/CtaBand.tsx'
import EventCard from '../../components/EventCard.tsx'
import PageHeader from '../../components/PageHeader.tsx'
import { container, field, label } from '../../components/styles.ts'
import { type EventFilters, filterEvents } from '../../features/events/filterEvents.ts'
import { usePageMeta } from '../../lib/usePageMeta.ts'
import { events } from '../../mocks/events.ts'
import type { EventRegion } from '../../mocks/types.ts'

const REGIONS: (EventRegion | 'all')[] = ['all', 'africa', 'europe', 'americas', 'online']

/** Upcoming events (EVT-1) with date-range and region filters (EVT-4). No RSVP in the MVP (EVT-5). */
export default function EventsPage() {
  const { t } = useTranslation()
  usePageMeta(t('events.title'), t('events.intro'))
  const [filters, setFilters] = useState<EventFilters>({ from: '', to: '', region: 'all' })
  const list = useMemo(() => filterEvents(events, filters, new Date()), [filters])
  const filtered = filters.from !== '' || filters.to !== '' || filters.region !== 'all'

  return (
    <main>
      <PageHeader kicker={t('events.kicker')} title={t('events.title')} intro={t('events.intro')} tone="forest" />
      <section className={`${container} py-12`}>
        <form
          aria-label={t('events.filtersLabel')}
          onSubmit={(e) => e.preventDefault()}
          className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sand-200 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end"
        >
          <label className={label}>
            {t('events.from')}
            <input
              type="date"
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
              className={field}
            />
          </label>
          <label className={label}>
            {t('events.to')}
            <input
              type="date"
              value={filters.to}
              min={filters.from || undefined}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
              className={field}
            />
          </label>
          <label className={label}>
            {t('events.region')}
            <select
              value={filters.region}
              onChange={(e) => setFilters({ ...filters, region: e.target.value as EventFilters['region'] })}
              className={field}
            >
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {t(`events.regions.${region}`)}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            disabled={!filtered}
            onClick={() => setFilters({ from: '', to: '', region: 'all' })}
            className="rounded-full px-4 py-2.5 text-sm font-semibold text-forest-700 hover:bg-forest-50 disabled:text-ink-500 disabled:hover:bg-transparent"
          >
            {t('events.clear')}
          </button>
        </form>

        <p role="status" className="mt-6 text-sm text-ink-500">
          {t('events.count', { count: list.length })}
        </p>
        {list.length > 0 ? (
          <div className="mt-4 grid gap-5 lg:grid-cols-2">
            {list.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-2xl bg-sand-50 p-8 text-center text-ink-700 ring-1 ring-sand-200">{t('events.empty')}</p>
        )}
      </section>
      <CtaBand />
    </main>
  )
}
