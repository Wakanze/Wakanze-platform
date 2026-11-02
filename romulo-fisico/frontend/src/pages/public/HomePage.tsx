import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import ArticleCard from '../../components/ArticleCard.tsx'
import CreatorCard from '../../components/CreatorCard.tsx'
import CtaBand from '../../components/CtaBand.tsx'
import EventCard from '../../components/EventCard.tsx'
import PatternArt from '../../components/PatternArt.tsx'
import SectionHeading from '../../components/SectionHeading.tsx'
import { button, container, eyebrow } from '../../components/styles.ts'
import { filterEvents } from '../../features/events/filterEvents.ts'
import { INTEREST_CATEGORIES } from '../../features/interest-submission/categories.ts'
import { usePageMeta } from '../../lib/usePageMeta.ts'
import { articleFeed } from '../../mocks/articles.ts'
import { creators } from '../../mocks/creators.ts'
import { events } from '../../mocks/events.ts'

const PILLARS = ['memory', 'culture', 'connection'] as const

/** Public homepage (WEB-1) with the loop's entry points and a CTA on every section (WEB-4). */
export default function HomePage() {
  const { t } = useTranslation()
  usePageMeta('Wakanze', t('home.metaDescription'))
  const upcoming = filterEvents(events, { from: '', to: '', region: 'all' }, new Date()).slice(0, 3)

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className={`${container} grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_1fr] lg:items-center`}>
          <div>
            <p className={eyebrow}>{t('home.kicker')}</p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-forest-900 sm:text-6xl">
              {t('home.title')}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-700">{t('home.subtitle')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/join" className={`${button.primary} px-6 py-3 text-base`}>
                {t('home.primaryCta')}
              </Link>
              <Link to="/articles" className={`${button.secondary} px-6 py-3 text-base`}>
                {t('home.secondaryCta')}
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="grid grid-cols-2 gap-4">
              <PatternArt tone="forest" seed={0} cols={3} rows={4} className="h-72 w-full rounded-3xl sm:h-80" />
              <div className="grid gap-4">
                <PatternArt tone="clay" seed={2} cols={3} rows={2} className="h-[8.5rem] w-full rounded-3xl sm:h-[9.5rem]" />
                <PatternArt tone="ochre" seed={5} cols={3} rows={2} className="h-[8.5rem] w-full rounded-3xl sm:h-[9.5rem]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="pillars-title" className="border-y border-sand-200 bg-sand-50">
        <div className={`${container} py-16`}>
          <h2 id="pillars-title" className="sr-only">
            {t('home.pillarsTitle')}
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            {PILLARS.map((pillar, i) => (
              <div key={pillar}>
                <p className="font-display text-4xl font-semibold text-clay-600">0{i + 1}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-forest-900">{t(`home.pillars.${pillar}.title`)}</h3>
                <p className="mt-2 leading-relaxed text-ink-700">{t(`home.pillars.${pillar}.body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${container} py-16 sm:py-20`}>
        <SectionHeading
          kicker={t('home.articlesKicker')}
          title={t('home.articlesTitle')}
          link={{ to: '/articles', label: t('home.allArticles') }}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {articleFeed.slice(0, 3).map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>
      </section>

      <section className="bg-sand-50">
        <div className={`${container} py-16 sm:py-20`}>
          <SectionHeading
            kicker={t('home.eventsKicker')}
            title={t('home.eventsTitle')}
            link={{ to: '/events', label: t('home.allEvents') }}
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className={`${container} py-16 sm:py-20`}>
        <SectionHeading
          kicker={t('home.creatorsKicker')}
          title={t('home.creatorsTitle')}
          link={{ to: '/creators', label: t('home.allCreators') }}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {creators.slice(0, 3).map((creator) => (
            <CreatorCard key={creator.slug} creator={creator} />
          ))}
        </div>
      </section>

      <section aria-labelledby="ways-title" className="bg-clay-50">
        <div className={`${container} py-16 sm:py-20`}>
          <p className={eyebrow}>{t('home.waysKicker')}</p>
          <h2 id="ways-title" className="mt-2 font-display text-3xl font-semibold text-forest-900 sm:text-4xl">
            {t('home.waysTitle')}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INTEREST_CATEGORIES.map((category) => (
              <li key={category}>
                <Link
                  to={`/join?interest=${category}`}
                  className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-clay-100 transition-shadow hover:shadow-md"
                >
                  <span className="font-display text-xl font-semibold text-forest-900">
                    {t(`interest.categories.${category}.title`)}
                  </span>
                  <span className="mt-2 flex-1 text-sm text-ink-700">{t(`interest.categories.${category}.body`)}</span>
                  <span className="mt-4 text-sm font-semibold text-clay-700 group-hover:underline">
                    {t('home.waysCta')} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </main>
  )
}
