import { useTranslation } from 'react-i18next'
import { LANGUAGE_GROUPS, SUPPORTED_LANGUAGES, UPCOMING_LANGUAGES } from '../i18n/index.ts'

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()

  return (
    <label className="flex items-center gap-2 text-sm text-ink-700">
      <span className="sr-only">{t('language.label')}</span>
      <select
        value={i18n.resolvedLanguage}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="rounded-full border border-paper-300 bg-white px-3 py-1.5 text-sm"
      >
        {LANGUAGE_GROUPS.map((group) => (
          <optgroup key={group} label={t(`language.groups.${group}`)}>
            {SUPPORTED_LANGUAGES.filter((l) => l.group === group).map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
            {UPCOMING_LANGUAGES.filter((l) => l.group === group).map((l) => (
              <option key={l.code} value={l.code} disabled>
                {l.label} ({t('language.comingSoon')})
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  )
}
