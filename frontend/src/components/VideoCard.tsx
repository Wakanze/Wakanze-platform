import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type Video, embedUrl, thumbnailUrl } from '../features/videos/latestVideos.ts'
import { formatDate } from '../lib/localized.ts'

/**
 * Shows the thumbnail first and loads the YouTube player only when the visitor presses play,
 * so the page stays light and no YouTube cookies are set before that.
 */
export default function VideoCard({ video }: { video: Video }) {
  const { t, i18n } = useTranslation()
  const [playing, setPlaying] = useState(false)

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-paper-200">
      <div className="relative aspect-[9/16] bg-ink-950">
        {playing ? (
          <iframe
            src={embedUrl(video.id)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex items-center justify-center"
          >
            <img
              src={thumbnailUrl(video.id)}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
            />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-ink-950 shadow-lg transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="sr-only">{t('videos.play', { title: video.title })}</span>
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <time dateTime={video.publishedAt} className="text-xs font-semibold uppercase tracking-wider text-gold-700">
          {formatDate(video.publishedAt, i18n.resolvedLanguage ?? 'en')}
        </time>
        <h3 className="mt-2 flex-1 font-display text-base font-bold leading-snug text-ink-950">{video.title}</h3>
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-sm font-semibold text-ink-950 underline decoration-gold-500 underline-offset-4 hover:text-gold-700"
        >
          {t('videos.watchOnYoutube')} <span aria-hidden="true" className="inline-block rtl:-scale-x-100">↗</span>
          <span className="sr-only"> {t('common.opensInNewTab')}</span>
        </a>
      </div>
    </article>
  )
}
