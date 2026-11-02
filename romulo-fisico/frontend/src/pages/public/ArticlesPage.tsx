import { useTranslation } from 'react-i18next'
import ArticleCard from '../../components/ArticleCard.tsx'
import CtaBand from '../../components/CtaBand.tsx'
import PageHeader from '../../components/PageHeader.tsx'
import { container } from '../../components/styles.ts'
import { usePageMeta } from '../../lib/usePageMeta.ts'
import { articleFeed } from '../../mocks/articles.ts'

/** Reverse-chronological feed (CMS-3). Category filters are deferred per the SRS. */
export default function ArticlesPage() {
  const { t } = useTranslation()
  usePageMeta(t('articles.title'), t('articles.intro'))

  return (
    <main>
      <PageHeader kicker={t('articles.kicker')} title={t('articles.title')} intro={t('articles.intro')} tone="ochre" />
      <section className={`${container} py-16`}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articleFeed.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>
      </section>
      <CtaBand />
    </main>
  )
}
