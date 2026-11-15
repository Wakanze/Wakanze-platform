import { describe, expect, it } from 'vitest'
import { isValidEmail, readLeadSource } from './leadSource.ts'

describe('readLeadSource (LEAD-3, SOC-1)', () => {
  it('records the page and the UTM tags of the visit', () => {
    expect(readLeadSource('/events', '?utm_source=instagram&utm_medium=social&utm_campaign=launch')).toEqual({
      page: '/events',
      utmSource: 'instagram',
      utmMedium: 'social',
      utmCampaign: 'launch',
    })
  })

  it('leaves UTM fields empty for direct visits', () => {
    expect(readLeadSource('/', '')).toEqual({ page: '/', utmSource: null, utmMedium: null, utmCampaign: null })
  })
})

describe('isValidEmail (LEAD-2)', () => {
  it.each(['ana@example.com', ' kofi.m@mail.co.ao '])('accepts %s', (email) => {
    expect(isValidEmail(email)).toBe(true)
  })

  it.each(['', 'ana', 'ana@', 'ana@example', 'a na@example.com'])('rejects "%s"', (email) => {
    expect(isValidEmail(email)).toBe(false)
  })
})
