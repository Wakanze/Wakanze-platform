import { describe, expect, it } from 'vitest'
import type { WakanzeEvent } from '../../mocks/types.ts'
import { filterEvents } from './filterEvents.ts'

function event(slug: string, startsAt: string, region: WakanzeEvent['region']): WakanzeEvent {
  const text = { en: slug, pt: slug }
  return { slug, title: text, description: text, startsAt, city: null, country: null, region, registrationUrl: null, tone: 'forest' }
}

const all = [
  event('past', '2026-10-01T10:00:00', 'africa'),
  event('late', '2027-02-01T10:00:00', 'europe'),
  event('soon', '2026-11-10T10:00:00', 'online'),
  event('mid', '2026-12-15T10:00:00', 'africa'),
]
const now = new Date('2026-11-02T12:00:00Z')
const slugs = (list: WakanzeEvent[]) => list.map((e) => e.slug)

describe('filterEvents (EVT-1, EVT-4)', () => {
  it('lists only upcoming events, soonest first', () => {
    expect(slugs(filterEvents(all, { from: '', to: '', region: 'all' }, now))).toEqual(['soon', 'mid', 'late'])
  })

  it('filters by an inclusive date range', () => {
    expect(slugs(filterEvents(all, { from: '2026-11-10', to: '2026-12-15', region: 'all' }, now))).toEqual([
      'soon',
      'mid',
    ])
  })

  it('filters by region', () => {
    expect(slugs(filterEvents(all, { from: '', to: '', region: 'africa' }, now))).toEqual(['mid'])
  })
})
