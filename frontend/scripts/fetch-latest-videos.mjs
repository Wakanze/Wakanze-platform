// Saves the latest videos from the Wakanze YouTube channel to src/data/latest-videos.json.
// Runs before `dev` and `build`. It reads the channel's public feed, so no API key is needed.
// If YouTube cannot be reached, the file from the last successful run is kept.
import { writeFile } from 'node:fs/promises'
import { parseFeed } from './youtube-feed.mjs'

const CHANNEL_ID = 'UCqt64RdTvaLIvq0hMwASHRA' // youtube.com/@wakanze
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
const OUTPUT = new URL('../src/data/latest-videos.json', import.meta.url)

try {
  const response = await fetch(FEED_URL, { signal: AbortSignal.timeout(10_000) })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const videos = parseFeed(await response.text())
  if (videos.length === 0) throw new Error('the feed has no videos')
  const data = { channelUrl: 'https://www.youtube.com/@wakanze', fetchedAt: new Date().toISOString(), videos }
  await writeFile(OUTPUT, JSON.stringify(data, null, 2) + '\n')
  console.log(`latest videos: saved ${videos.length} from YouTube`)
} catch (error) {
  console.warn(`latest videos: could not reach YouTube (${error.message}); keeping the saved list`)
}
