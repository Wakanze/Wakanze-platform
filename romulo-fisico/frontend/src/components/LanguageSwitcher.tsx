import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES } from '../i18n/index.ts'

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()

  return (
    <label className="ml-auto flex items-center gap-2 text-sm text-gray-600">
      <span className="sr-only">{t('language.label')}</span>
      <select
        value={i18n.resolvedLanguage}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="rounded border border-gray-300 bg-white px-2 py-1"
      >
        {SUPPORTED_LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  )
}