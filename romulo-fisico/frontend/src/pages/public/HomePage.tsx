import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold text-emerald-600">{t('home.title')}</h1>
      <p className="mt-4 text-lg text-gray-700">{t('home.subtitle')}</p>
    </main>
  )
}