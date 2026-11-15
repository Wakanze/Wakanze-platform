import { describe, expect, it } from 'vitest'
import { supporters } from '../../mocks/supporters.ts'
import { filterSupporters, supporterCountries } from './filterSupporters.ts'

describe('filterSupporters', () => {
  it('returns everyone when no filter is set', () => {
    expect(filterSupporters(supporters, { topic: 'all', country: 'all' })).toHaveLength(supporters.length)
  })

  it('combines topic and country', () => {
    const result = filterSupporters(supporters, { topic: 'language', country: 'Angola' })
    expect(result.map((s) => s.slug)).toEqual(['malik-ferreira'])
  })

  it('returns nothing when no one matches', () => {
    expect(filterSupporters(supporters, { topic: 'film', country: 'Angola' })).toEqual([])
  })
})

describe('supporterCountries', () => {
  it('lists each country once, sorted', () => {
    expect(supporterCountries(supporters)).toEqual(['Angola', 'Brazil', 'Cape Verde', 'Ghana', 'Portugal'])
  })
})
