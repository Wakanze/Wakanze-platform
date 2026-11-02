import { useTranslation } from 'react-i18next'
import type { WakanzeEvent } from '../mocks/types.ts'
import { useLocalized } from '../lib/useLocalized.ts'

export default function EventCard({ event }: { event: WakanzeEvent }) {
  const { t } = useTranslation()
  const { l, date } = useLocalized()
  const day = date(event.startsAt, { day: 'numeric' })
  const month = date(event.startsAt, { month: 'short' })
  const when = date(event.startsAt, { weekday: 'long', hour: '2-digit', minute: '2-digit' })
  const where = event.region === 'online' ? t('events.online') : `${event.city}, ${event.country}`

  return (
    <article className="flex gap-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sand-200">
      <div
        className={`flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl text-center ${
          event.tone === 'clay' ? 'bg-clay-100 text-clay-700' : event.tone === 'ochre' ? 'bg-ochre-100 text-ochre-700' : 'bg-forest-50 text-forest-800'
        }`}
      >
        <span className="font-display text-3xl font-semibold leading-none">{day}</span>
        <span className="mt-1 text-xs font-semibold uppercase tracking-wider">{month}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg font-semibold leading-snug text-forest-900">{l(event.title)}</h3>
        <p className="mt-1 text-sm text-ink-500">
          <time dateTime={event.startsAt}>{when}</time> · {where}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-700">{l(event.description)}</p>
        {event.registrationUrl ? (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-forest-700 underline-offset-4 hover:underline"
          >
            {t('events.register')} <span aria-hidden="true">↗</span>
            <span className="sr-only"> {t('common.opensInNewTab')}</span>
          </a>
        ) : (
          <p className="mt-3 text-sm text-ink-500">{t('events.noRegistration')}</p>
        )}
      </div>
    </article>
  )
}
