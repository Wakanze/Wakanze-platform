import { describe, expect, it } from 'vitest'
import { parseFeed } from './youtube-feed.mjs'

const entry = (id: string, title: string, published: string, kind = 'watch?v=') => `
 <entry>
  <yt:videoId>${id}</yt:videoId>
  <title>${title}</title>
  <link rel="alternate" href="https://www.youtube.com/${kind}${id}"/>
  <published>${published}</published>
 </entry>`

const feed = (...entries: string[]) => `<feed><title>Wakanze</title>${entries.join('')}</feed>`

describe('parseFeed', () => {
  it('returns the newest videos first, up to the count', () => {
    const xml = feed(
      entry('a', 'Old', '2026-01-01T00:00:00+00:00'),
      entry('b', 'Newest', '2026-03-01T00:00:00+00:00'),
      entry('c', 'Middle', '2026-02-01T00:00:00+00:00'),
      entry('d', 'Oldest', '2025-12-01T00:00:00+00:00'),
    )
    expect(parseFeed(xml).map((v: { id: string }) => v.id)).toEqual(['b', 'c', 'a'])
  })

  it('decodes titles and marks shorts', () => {
    const [video] = parseFeed(feed(entry('s', 'Jamaica &amp; Nigeria &#39;24', '2026-01-01T00:00:00+00:00', 'shorts/')))
    expect(video).toMatchObject({ title: "Jamaica & Nigeria '24", isShort: true, url: 'https://www.youtube.com/shorts/s' })
  })

  it('skips entries without an id and handles an empty feed', () => {
    expect(parseFeed(feed('<entry><title>No id</title></entry>'))).toEqual([])
    expect(parseFeed('<feed></feed>')).toEqual([])
  })
})
