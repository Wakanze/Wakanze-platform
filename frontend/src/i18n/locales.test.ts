import { describe, expect, it } from 'vitest'
import en from './locales/en.json'
import pt from './locales/pt.json'
import fr from './locales/fr.json'
import es from './locales/es.json'
import sw from './locales/sw.json'
import ha from './locales/ha.json'
import yo from './locales/yo.json'
import am from './locales/am.json'
import zu from './locales/zu.json'
import ar from './locales/ar.json'

type Tree = { [key: string]: string | Tree }

function entries(obj: Tree, prefix = ''): [string, string][] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'object' ? entries(v, `${prefix}${k}.`) : [[`${prefix}${k}`, v] as [string, string]],
  )
}

const placeholders = (s: string) => (s.match(/\{\{\s*\w+\s*\}\}/g) ?? []).sort()

const LOCALES: [string, Tree][] = [
  ['pt', pt],
  ['fr', fr],
  ['es', es],
  ['sw', sw],
  ['ha', ha],
  ['yo', yo],
  ['am', am],
  ['zu', zu],
  ['ar', ar],
]

describe('locales', () => {
  const english = new Map(entries(en))

  it.each(LOCALES)('%s has exactly the same keys as en', (_, locale) => {
    expect(entries(locale).map(([k]) => k).sort()).toEqual([...english.keys()].sort())
  })

  it.each(LOCALES)('%s keeps every {{placeholder}} and has no empty text', (_, locale) => {
    for (const [key, value] of entries(locale)) {
      expect(value.trim(), key).not.toBe('')
      expect(placeholders(value), key).toEqual(placeholders(english.get(key) ?? ''))
    }
  })
})
