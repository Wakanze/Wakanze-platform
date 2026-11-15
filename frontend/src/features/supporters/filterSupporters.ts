import type { Supporter, SupporterTopic } from '../../mocks/types.ts'

export type SupporterFilters = {
  topic: SupporterTopic | 'all'
  country: string | 'all'
}

/** Supporters matching a topic and a country, so people can find e.g. culture voices in Angola. */
export function filterSupporters(supporters: Supporter[], filters: SupporterFilters): Supporter[] {
  return supporters.filter(
    (s) =>
      (filters.topic === 'all' || s.topic === filters.topic) &&
      (filters.country === 'all' || s.country === filters.country),
  )
}

/** The countries present in the list, alphabetically, for the country filter. */
export function supporterCountries(supporters: Supporter[]): string[] {
  return [...new Set(supporters.map((s) => s.country))].sort((a, b) => a.localeCompare(b))
}
