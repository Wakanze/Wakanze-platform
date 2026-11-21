// Parses a YouTube channel feed (https://www.youtube.com/feeds/videos.xml?channel_id=…).

const decode = (s) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&')

const pick = (xml, pattern) => {
  const match = xml.match(pattern)
  return match ? decode(match[1].trim()) : null
}

/** The newest `count` videos in the feed, newest first. Entries missing a field are skipped. */
export function parseFeed(xml, count = 3) {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? []
  return entries
    .map((entry) => ({
      id: pick(entry, /<yt:videoId>([^<]+)<\/yt:videoId>/),
      title: pick(entry, /<title>([^<]+)<\/title>/),
      url: pick(entry, /<link rel="alternate" href="([^"]+)"/),
      publishedAt: pick(entry, /<published>([^<]+)<\/published>/),
    }))
    .filter((v) => v.id && v.title && v.url && v.publishedAt)
    .map((v) => ({ ...v, isShort: v.url.includes('/shorts/') }))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, count)
}
