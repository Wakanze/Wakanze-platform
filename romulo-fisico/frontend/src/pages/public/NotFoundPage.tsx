import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900">{t('notFound.title')}</h1>
      <Link to="/" className="mt-4 inline-block text-emerald-700 underline">
        {t('notFound.back')}
      </Link>
    </main>
  )
}
