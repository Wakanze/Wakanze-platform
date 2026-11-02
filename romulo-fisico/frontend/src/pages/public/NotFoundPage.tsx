import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { button, container } from '../../components/styles.ts'
import { usePageMeta } from '../../lib/usePageMeta.ts'

export default function NotFoundPage() {
  const { t } = useTranslation()
  usePageMeta(t('notFound.title'))

  return (
    <main className={`${container} py-24 text-center`}>
      <p className="font-display text-7xl font-semibold text-clay-600">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-forest-900">{t('notFound.title')}</h1>
      <Link to="/" className={`${button.primary} mt-8`}>
        {t('notFound.back')}
      </Link>
    </main>
  )
}
