import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import artwork from '../../assets/wakanze-artwork.webp'
import CtaBand from '../../components/CtaBand.tsx'
import SectionHeading from '../../components/SectionHeading.tsx'
import VideoCard from '../../components/VideoCard.tsx'
import { button, container, eyebrow } from '../../components/styles.ts'
import { INTEREST_CATEGORIES } from '../../features/interest-submission/categories.ts'
import { latestVideos } from '../../features/videos/latestVideos.ts'
import { STORE_URL } from '../../lib/links.ts'
import { usePageMeta } from '../../lib/usePageMeta.ts'

const PILLARS = ['memory', 'culture', 'connection'] as const

/** Public homepage (WEB-1) with the loop's entry points and a CTA on every section (WEB-4). */
export default function HomePage() {
  const { t } = useTranslation()
  usePageMeta('Wakanze', t('home.metaDescription'))

  return (
    <main>
      <section className="relative overflow-hidden bg-ink-950 text-paper-50">
        <div className={`${container} grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center`}>
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold-300">{t('home.kicker')}</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-wide sm:text-6xl">
              {t('home.title')}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper-200">{t('home.subtitle')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/join" className={`${button.accent} px-6 py-3 text-base`}>
                {t('home.primaryCta')}
              </Link>
              <Link to="/videos" className={`${button.onDark} px-6 py-3 text-base`}>
                {t('home.secondaryCta')}
              </Link>
            </div>
          </div>
          <img
            src={artwork}
            alt={t('home.emblemAlt')}
            width="1200"
            height="800"
            className="mx-auto w-full max-w-md lg:max-w-none"
            fetchPriority="high"
          />
        </div>
      </section>

      <section aria-labelledby="pillars-title" className="border-y border-paper-200 bg-paper-50">
        <div className={`${container} py-16`}>
          <h2 id="pillars-title" className="sr-only">
            {t('home.pillarsTitle')}
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            {PILLARS.map((pillar, i) => (
              <div key={pillar}>
                <p className="font-display text-4xl font-bold text-gold-600">0{i + 1}</p>
                <h3 className="mt-3 font-display text-2xl font-bold text-ink-800">{t(`home.pillars.${pillar}.title`)}</h3>
                <p className="mt-2 leading-relaxed text-ink-700">{t(`home.pillars.${pillar}.body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="support-title" className={`${container} pt-16 sm:pt-20`}>
        <h2 id="support-title" className="sr-only">
          {t('home.supportTitle')}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <a
            href={STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-2xl bg-ink-950 p-8 text-paper-50 transition-shadow hover:shadow-lg"
          >
            <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold-300">{t('home.storeKicker')}</span>
            <span className="mt-3 font-display text-2xl font-extrabold uppercase tracking-wide">{t('home.storeTitle')}</span>
            <span className="mt-3 flex-1 text-paper-200">{t('home.storeBody')}</span>
            <span className="mt-6 font-semibold text-gold-300 group-hover:underline">
              {t('home.storeCta')} <span aria-hidden="true" className="inline-block rtl:-scale-x-100">↗</span>
              <span className="sr-only"> {t('common.opensInNewTab')}</span>
            </span>
          </a>
          <Link
            to="/support"
            className="group flex flex-col rounded-2xl bg-gold-500 p-8 text-ink-950 transition-shadow hover:shadow-lg"
          >
            <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-ink-800">{t('home.donateKicker')}</span>
            <span className="mt-3 font-display text-2xl font-extrabold uppercase tracking-wide">{t('home.donateTitle')}</span>
            <span className="mt-3 flex-1 text-ink-800">{t('home.donateBody')}</span>
            <span className="mt-6 font-semibold group-hover:underline">
              {t('home.donateCta')} <span aria-hidden="true" className="inline-block rtl:-scale-x-100">→</span>
            </span>
          </Link>
        </div>
      </section>

      <section className={`${container} py-16 sm:py-20`}>
        <SectionHeading
          kicker={t('home.videosKicker')}
          title={t('home.videosTitle')}
          link={{ to: '/videos', label: t('home.allVideos') }}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      <section aria-labelledby="ways-title" className="bg-gold-50">
        <div className={`${container} py-16 sm:py-20`}>
          <p className={eyebrow}>{t('home.waysKicker')}</p>
          <h2 id="ways-title" className="mt-2 font-display text-3xl font-bold text-ink-800 sm:text-4xl">
            {t('home.waysTitle')}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INTEREST_CATEGORIES.map((category) => (
              <li key={category}>
                <Link
                  to={`/join?interest=${category}`}
                  className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-gold-100 transition-shadow hover:shadow-md"
                >
                  <span className="font-display text-xl font-bold text-ink-800">
                    {t(`interest.categories.${category}.title`)}
                  </span>
                  <span className="mt-2 flex-1 text-sm text-ink-700">{t(`interest.categories.${category}.body`)}</span>
                  <span className="mt-4 text-sm font-semibold text-gold-700 group-hover:underline">
                    {t('home.waysCta')} <span aria-hidden="true" className="inline-block rtl:-scale-x-100">→</span>
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
