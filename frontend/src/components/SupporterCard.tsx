import { useTranslation } from 'react-i18next'
import type { SocialNetwork, Supporter } from '../mocks/types.ts'
import { useLocalized } from '../lib/useLocalized.ts'

const AVATAR: Record<Supporter['tone'], string> = {
  ink: 'bg-ink-950 text-gold-300',
  flame: 'bg-gold-600 text-paper-50',
  gold: 'bg-gold-500 text-ink-900',
}

const NETWORK_LABEL: Record<SocialNetwork, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  facebook: 'Facebook',
  x: 'X',
  website: 'Website',
}

export default function SupporterCard({ supporter }: { supporter: Supporter }) {
  const { t } = useTranslation()
  const { l } = useLocalized()
  const initials = supporter.name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <article className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-paper-200">
      <div className="flex items-center gap-4">
        <div
          aria-hidden="true"
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-xl font-bold ${AVATAR[supporter.tone]}`}
        >
          {initials}
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-ink-950">{supporter.name}</h3>
          <p className="text-sm text-ink-700">{l(supporter.role)}</p>
        </div>
      </div>
      <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-wider text-gold-700">
        <span>{t(`supporters.topics.${supporter.topic}`)}</span>
        <span aria-hidden="true">·</span>
        <span>{supporter.country}</span>
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-700">{l(supporter.bio)}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {supporter.links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-paper-300 px-3 py-1 text-xs font-medium text-ink-700 hover:border-ink-950 hover:text-ink-950"
            >
              {NETWORK_LABEL[link.network]}
              <span className="sr-only"> {t('common.opensInNewTab')}</span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}
