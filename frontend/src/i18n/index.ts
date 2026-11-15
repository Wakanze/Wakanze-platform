import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import pt from './locales/pt.json'
import fr from './locales/fr.json'
import es from './locales/es.json'

/** Languages are grouped so people can find theirs as the list grows. */
export const LANGUAGE_GROUPS = ['african', 'european', 'creole'] as const
export type LanguageGroup = (typeof LANGUAGE_GROUPS)[number]

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', group: 'european' },
  { code: 'pt', label: 'Português', group: 'european' },
  { code: 'fr', label: 'Français', group: 'european' },
  { code: 'es', label: 'Español', group: 'european' },
] as const satisfies readonly { code: string; label: string; group: LanguageGroup }[]

/** Shown in the switcher as "coming soon" until their translation files exist. */
export const UPCOMING_LANGUAGES: readonly { code: string; label: string; group: LanguageGroup }[] = [
  { code: 'sw', label: 'Kiswahili', group: 'african' },
  { code: 'yo', label: 'Yorùbá', group: 'african' },
  { code: 'kmb', label: 'Kimbundu', group: 'african' },
  { code: 'kea', label: 'Kabuverdianu', group: 'creole' },
  { code: 'ht', label: 'Kreyòl ayisyen', group: 'creole' },
  { code: 'jam', label: 'Patwa', group: 'creole' },
]

const STORAGE_KEY = 'wakanze-language'

function readSavedLanguage(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const isSupported = SUPPORTED_LANGUAGES.some((l) => l.code === saved)
    return isSupported && saved ? saved : 'en'
  } catch {
    return 'en'
  }
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
    fr: { translation: fr },
    es: { translation: es },
  },
  lng: readSavedLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
  try {
    localStorage.setItem(STORAGE_KEY, lng)
  } catch {
    // Storage can be blocked; the app still works without it.
  }
})

document.documentElement.lang = i18n.language

export default i18n