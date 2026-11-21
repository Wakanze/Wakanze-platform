import data from '../../data/latest-videos.json'

export type Video = {
  id: string
  title: string
  url: string
  publishedAt: string
  isShort: boolean
}

/** Saved by scripts/fetch-latest-videos.mjs before every dev run and build. */
export const latestVideos: Video[] = data.videos
export const channelUrl: string = data.channelUrl

export const thumbnailUrl = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

/** Privacy-enhanced embed: YouTube sets no cookies until the visitor presses play. */
export const embedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
