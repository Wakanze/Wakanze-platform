import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import pt from './locales/pt.json'
import fr from './locales/fr.json'
import es from './locales/es.json'

/** Languages are grouped by region so people can find theirs as the list grows. */
export const LANGUAGE_GROUPS = ['africa', 'europe', 'asia'] as const
export type LanguageGroup = (typeof LANGUAGE_GROUPS)[number]

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', group: 'europe' },
  { code: 'pt', label: 'Português', group: 'europe' },
  { code: 'fr', label: 'Français', group: 'europe' },
  { code: 'es', label: 'Español', group: 'europe' },
] as const satisfies readonly { code: string; label: string; group: LanguageGroup }[]

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code']

/** Only a language the visitor picks by hand is remembered; otherwise the browser's language wins. */
const STORAGE_KEY = 'wakanze-language'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      fr: { translation: fr },
      es: { translation: es },
    },
    supportedLngs: SUPPORTED_LANGUAGES.map((l) => l.code),
    // pt-BR, fr-CA, es-419… fall back to pt, fr, es
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: STORAGE_KEY,
      caches: [],
    },
    interpolation: { escapeValue: false },
  })

/** Switches language and remembers the choice for the next visit. */
export function chooseLanguage(code: LanguageCode) {
  try {
    localStorage.setItem(STORAGE_KEY, code)
  } catch {
    // Storage can be blocked; the choice still applies to this visit.
  }
  return i18n.changeLanguage(code)
}

function applyToDocument(lng: string) {
  document.documentElement.lang = lng
  // Ready for right-to-left languages such as Arabic.
  document.documentElement.dir = i18n.dir(lng)
}

i18n.on('languageChanged', applyToDocument)
applyToDocument(i18n.resolvedLanguage ?? 'en')

export default i18n
