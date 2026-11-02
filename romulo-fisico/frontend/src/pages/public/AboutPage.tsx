import { useTranslation } from 'react-i18next'

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900">{t('about.title')}</h1>
      <p className="mt-4 text-gray-700">{t('about.body')}</p>
    </main>
  )
}
