import type { EventRegion, WakanzeEvent } from '../../mocks/types.ts'

export type EventFilters = {
  /** yyyy-mm-dd, inclusive */
  from: string
  /** yyyy-mm-dd, inclusive */
  to: string
  region: EventRegion | 'all'
}

/** Upcoming events (EVT-1), filtered by date range and region (EVT-4), soonest first. */
export function filterEvents(events: WakanzeEvent[], filters: EventFilters, now: Date): WakanzeEvent[] {
  const today = now.toISOString().slice(0, 10)
  return events
    .filter((event) => {
      const day = event.startsAt.slice(0, 10)
      if (day < today) return false
      if (filters.from && day < filters.from) return false
      if (filters.to && day > filters.to) return false
      if (filters.region !== 'all' && event.region !== filters.region) return false
      return true
    })
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
}
