/**
 * Content translation is separate from UI translation (SRS §5.6, Decision D3):
 * the UI exists in four languages, while content is published in English and
 * Portuguese only. Content in any other language falls back to English.
 */
export type ContentLanguage = 'en' | 'pt'

export type Localized = Record<ContentLanguage, string>

export function pickLocale(value: Localized, language: string): string {
  return language.startsWith('pt') ? value.pt : value.en
}

export function formatDate(iso: string, language: string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(language, options ?? { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(iso),
  )
}
