import { useTranslation } from 'react-i18next'
import CtaBand from '../../components/CtaBand.tsx'
import PageHeader from '../../components/PageHeader.tsx'
import VideoCard from '../../components/VideoCard.tsx'
import { button, container } from '../../components/styles.ts'
import { channelUrl, latestVideos } from '../../features/videos/latestVideos.ts'
import { usePageMeta } from '../../lib/usePageMeta.ts'

/** The latest videos from the Wakanze YouTube channel. */
export default function VideosPage() {
  const { t } = useTranslation()
  usePageMeta(t('videos.title'), t('videos.intro'))

  return (
    <main>
      <PageHeader kicker={t('videos.kicker')} title={t('videos.title')} intro={t('videos.intro')} tone="ink" />
      <section className={`${container} py-12`}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
        <a href={channelUrl} target="_blank" rel="noopener noreferrer" className={`${button.primary} mt-10`}>
          {t('videos.allOnYoutube')} <span aria-hidden="true">↗</span>
          <span className="sr-only"> {t('common.opensInNewTab')}</span>
        </a>
      </section>
      <CtaBand />
    </main>
  )
}
