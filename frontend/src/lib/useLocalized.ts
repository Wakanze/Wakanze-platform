import { useTranslation } from 'react-i18next'
import { formatDate, pickLocale, type Localized } from './localized.ts'

export function useLocalized() {
  const { i18n } = useTranslation()
  const language = i18n.resolvedLanguage ?? 'en'

  return {
    language,
    l: (value: Localized) => pickLocale(value, language),
    date: (iso: string, options?: Intl.DateTimeFormatOptions) => formatDate(iso, language, options),
  }
}
