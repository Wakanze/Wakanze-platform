import { describe, expect, it } from 'vitest'
import en from './locales/en.json'
import pt from './locales/pt.json'
import fr from './locales/fr.json'
import es from './locales/es.json'

function keys(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' ? keys(v as object, `${prefix}${k}.`) : [`${prefix}${k}`],
  )
}

describe('locales', () => {
  it.each([
    ['pt', pt],
    ['fr', fr],
    ['es', es],
  ])('%s has exactly the same keys as en', (_, locale) => {
    expect(keys(locale).sort()).toEqual(keys(en).sort())
  })
})
