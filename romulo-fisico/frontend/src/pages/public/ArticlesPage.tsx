import { useTranslation } from 'react-i18next'

export default function ArticlesPage() {
  const { t } = useTranslation()

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900">{t('articles.title')}</h1>
      <p className="mt-4 text-gray-700">{t('articles.body')}</p>
    </main>
  )
}
