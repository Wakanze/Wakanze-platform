import { useState } from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import CreatorCard from '../../components/CreatorCard.tsx'
import CtaBand from '../../components/CtaBand.tsx'
import PageHeader from '../../components/PageHeader.tsx'
import { button, container } from '../../components/styles.ts'
import { usePageMeta } from '../../lib/usePageMeta.ts'
import { creators } from '../../mocks/creators.ts'
import type { CreatorTopic } from '../../mocks/types.ts'

const TOPICS: (CreatorTopic | 'all')[] = ['all', 'history', 'music', 'business', 'language', 'film']

/** Featured creators as directory entries (CRT-1), filterable by topic (CRT-3). No creator accounts (CRT-4). */
export default function CreatorsPage() {
  const { t } = useTranslation()
  usePageMeta(t('creators.title'), t('creators.intro'))
  const [topic, setTopic] = useState<CreatorTopic | 'all'>('all')
  const list = topic === 'all' ? creators : creators.filter((c) => c.topic === topic)

  return (
    <main>
      <PageHeader kicker={t('creators.kicker')} title={t('creators.title')} intro={t('creators.intro')} tone="ochre" />
      <section className={`${container} py-12`}>
        <div role="group" aria-label={t('creators.filterLabel')} className="flex flex-wrap gap-2">
          {TOPICS.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={topic === item}
              onClick={() => setTopic(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                topic === item ? 'bg-forest-800 text-sand-50' : 'bg-white text-ink-700 ring-1 ring-sand-300 hover:ring-forest-700'
              }`}
            >
              {t(`creators.topics.${item}`)}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((creator) => (
            <CreatorCard key={creator.slug} creator={creator} />
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-ochre-100 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-forest-900">{t('creators.joinTitle')}</h2>
            <p className="mt-1 text-ink-700">{t('creators.joinBody')}</p>
          </div>
          <Link to="/join?interest=creator" className={button.primary}>
            {t('creators.joinCta')}
          </Link>
        </div>
      </section>
      <CtaBand />
    </main>
  )
}
