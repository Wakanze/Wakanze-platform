import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import { button, field, label } from '../../components/styles.ts'
import { isValidEmail, readLeadSource } from '../lead-capture/leadSource.ts'
import { INTEREST_CATEGORIES } from './categories.ts'

type Errors = Partial<Record<'name' | 'email' | 'location' | 'categories', string>>

/**
 * Participation interest form (MEM-1): name, email, location and one or more categories.
 * It records interest only; it is not a membership application (MEM-5).
 * Mockup: nothing is sent. Phase 4 replaces onSubmit with POST /api/v1/interests/.
 */
export default function InterestForm({ initialCategory }: { initialCategory?: string }) {
  const { t } = useTranslation()
  const location = useLocation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [place, setPlace] = useState('')
  const [categories, setCategories] = useState<string[]>(initialCategory ? [initialCategory] : [])
  const [errors, setErrors] = useState<Errors>({})
  const [done, setDone] = useState(false)

  function toggle(category: string) {
    setCategories((current) =>
      current.includes(category) ? current.filter((c) => c !== category) : [...current, category],
    )
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const next: Errors = {}
    if (!name.trim()) next.name = t('interest.errors.name')
    if (!isValidEmail(email)) next.email = t('interest.errors.email')
    if (!place.trim()) next.location = t('interest.errors.location')
    if (categories.length === 0) next.categories = t('interest.errors.categories')
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const source = readLeadSource(location.pathname, location.search)
    console.info('[mockup] interest submitted', { name, email, location: place, categories, source })
    setDone(true)
  }

  if (done) {
    return (
      <div role="status" className="h-fit rounded-2xl bg-forest-50 p-8 ring-1 ring-forest-100">
        <h2 className="font-display text-2xl font-semibold text-forest-900">{t('interest.thanksTitle', { name: name.trim() })}</h2>
        <p className="mt-3 text-ink-700">{t('interest.thanksBody', { email: email.trim() })}</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sand-200 sm:p-8">
      <fieldset>
        <legend className="font-display text-lg font-semibold text-forest-900">{t('interest.categoriesLegend')}</legend>
        <p className="mt-1 text-sm text-ink-500">{t('interest.categoriesHint')}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {INTEREST_CATEGORIES.map((category) => {
            const checked = categories.includes(category)
            return (
              <label
                key={category}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                  checked ? 'border-forest-700 bg-forest-50' : 'border-sand-300 hover:border-forest-600'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(category)}
                  className="mt-1 h-4 w-4 accent-forest-700"
                />
                <span>
                  <span className="block font-semibold text-ink-900">{t(`interest.categories.${category}.title`)}</span>
                  <span className="block text-sm text-ink-500">{t(`interest.categories.${category}.body`)}</span>
                </span>
              </label>
            )
          })}
        </div>
        {errors.categories && (
          <p role="alert" className="mt-2 text-sm text-clay-700">
            {errors.categories}
          </p>
        )}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>
          {t('interest.name')}
          <input
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            className={field}
          />
          {errors.name && <span className="mt-1 block text-sm text-clay-700">{errors.name}</span>}
        </label>
        <label className={label}>
          {t('interest.email')}
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            className={field}
          />
          {errors.email && <span className="mt-1 block text-sm text-clay-700">{errors.email}</span>}
        </label>
        <label className={`${label} sm:col-span-2`}>
          {t('interest.location')}
          <input
            autoComplete="address-level2"
            placeholder={t('interest.locationPlaceholder')}
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            aria-invalid={errors.location ? true : undefined}
            className={field}
          />
          {errors.location && <span className="mt-1 block text-sm text-clay-700">{errors.location}</span>}
        </label>
      </div>

      <p className="text-xs leading-relaxed text-ink-500">{t('interest.privacy')}</p>
      <button type="submit" className={`${button.primary} w-full py-3 sm:w-auto`}>
        {t('interest.submit')}
      </button>
    </form>
  )
}
