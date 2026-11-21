import { useTranslation } from 'react-i18next'
import { LANGUAGE_GROUPS, type LanguageCode, SUPPORTED_LANGUAGES, chooseLanguage } from '../i18n/index.ts'

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()

  return (
    <label className="flex items-center gap-2 text-sm text-ink-700">
      <span className="sr-only">{t('language.label')}</span>
      <select
        value={i18n.resolvedLanguage}
        onChange={(e) => chooseLanguage(e.target.value as LanguageCode)}
        className="rounded-full border border-paper-300 bg-white px-3 py-1.5 text-sm"
      >
        {LANGUAGE_GROUPS.map((group) => {
          const languages = SUPPORTED_LANGUAGES.filter((l) => l.group === group)
          // Groups appear once they have at least one translated language.
          if (languages.length === 0) return null
          return (
            <optgroup key={group} label={t(`language.groups.${group}`)}>
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </optgroup>
          )
        })}
      </select>
    </label>
  )
}
