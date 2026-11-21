import { afterEach, describe, expect, it } from 'vitest'
import i18n from './index.ts'

/** What the site ends up showing for a browser that prefers `codes`, in that order. */
async function shownFor(codes: string[]) {
  await i18n.changeLanguage(i18n.services.languageUtils.getBestMatchFromCodes(codes))
  return i18n.resolvedLanguage
}

describe('automatic language detection', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('maps regional browser languages to the supported language', async () => {
    expect(await shownFor(['pt-BR'])).toBe('pt')
    expect(await shownFor(['fr-CA'])).toBe('fr')
    expect(await shownFor(['es-419'])).toBe('es')
  })

  it('takes the first supported language in the browser list', async () => {
    expect(await shownFor(['de-DE', 'pt-PT', 'en'])).toBe('pt')
  })

  it('falls back to English when no browser language is supported', async () => {
    expect(await shownFor(['de-DE', 'ja'])).toBe('en')
  })
})
