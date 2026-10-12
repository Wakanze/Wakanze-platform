import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import pt from './locales/pt.json'
import fr from './locales/fr.json'
import es from './locales/es.json'

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
] as const

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