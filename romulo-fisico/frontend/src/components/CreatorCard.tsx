import { useTranslation } from 'react-i18next'
import type { Creator } from '../mocks/types.ts'
import { useLocalized } from '../lib/useLocalized.ts'

const AVATAR: Record<Creator['tone'], string> = {
  forest: 'bg-forest-800 text-ochre-300',
  clay: 'bg-clay-600 text-sand-50',
  ochre: 'bg-ochre-500 text-ink-900',
}

export default function CreatorCard({ creator }: { creator: Creator }) {
  const { t } = useTranslation()
  const { l } = useLocalized()
  const initials = creator.name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <article className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sand-200">
      <div className="flex items-center gap-4">
        <div
          aria-hidden="true"
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-xl font-semibold ${AVATAR[creator.tone]}`}
        >
          {initials}
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-forest-900">{creator.name}</h3>
          <p className="text-xs font-semibold uppercase tracking-wider text-clay-700">
            {t(`creators.topics.${creator.topic}`)}
          </p>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">{l(creator.bio)}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {creator.links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-sand-300 px-3 py-1 text-xs font-medium text-ink-700 hover:border-forest-700 hover:text-forest-800"
            >
              {link.label}
              <span className="sr-only"> {t('common.opensInNewTab')}</span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}
