import { Link, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import ArticleCard from '../../components/ArticleCard.tsx'
import NewsletterSignup from '../../features/lead-capture/NewsletterSignup.tsx'
import PatternArt from '../../components/PatternArt.tsx'
import { container } from '../../components/styles.ts'
import { useLocalized } from '../../lib/useLocalized.ts'
import { usePageMeta } from '../../lib/usePageMeta.ts'
import { articleFeed } from '../../mocks/articles.ts'
import NotFoundPage from './NotFoundPage.tsx'

export default function ArticlePage() {
  const { slug } = useParams()
  const article = articleFeed.find((a) => a.slug === slug)
  if (!article) return <NotFoundPage />
  return <ArticleView slug={article.slug} />
}

function ArticleView({ slug }: { slug: string }) {
  const { t } = useTranslation()
  const { l, date } = useLocalized()
  const article = articleFeed.find((a) => a.slug === slug)!
  const more = articleFeed.filter((a) => a.slug !== slug).slice(0, 3)
  usePageMeta(l(article.title), l(article.excerpt))

  return (
    <main>
      <article>
        <header className={`${container} max-w-3xl pt-12 sm:pt-16`}>
          <Link to="/articles" className="text-sm font-semibold text-forest-700 hover:underline">
            <span aria-hidden="true">←</span> {t('articles.back')}
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-clay-700">
            {t(`articles.categories.${article.category}`)}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-forest-900 sm:text-5xl">
            {l(article.title)}
          </h1>
          <p className="mt-4 text-sm text-ink-500">
            {t('articles.by', { author: article.author })} · <time dateTime={article.publishedAt}>{date(article.publishedAt)}</time> ·{' '}
            {t('articles.readTime', { count: article.readMinutes })}
          </p>
        </header>
        <div className={`${container} mt-10 max-w-4xl`}>
          <PatternArt tone={article.tone} cols={8} rows={3} className="h-56 w-full rounded-3xl sm:h-72" />
        </div>
        <div className={`${container} max-w-3xl py-12`}>
          <p className="font-display text-2xl leading-relaxed text-forest-900">{l(article.excerpt)}</p>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink-700">
            {article.body.map((paragraph, i) => (
              <p key={i}>{l(paragraph)}</p>
            ))}
          </div>
          <aside aria-labelledby="article-newsletter" className="mt-12 rounded-2xl bg-forest-50 p-6 ring-1 ring-forest-100">
            <h2 id="article-newsletter" className="font-display text-xl font-semibold text-forest-900">
              {t('articles.newsletterTitle')}
            </h2>
            <p className="mb-4 mt-1 text-sm text-ink-700">{t('articles.newsletterBody')}</p>
            <NewsletterSignup variant="light" />
          </aside>
        </div>
      </article>
      <section aria-labelledby="more-title" className="bg-sand-50">
        <div className={`${container} py-16`}>
          <h2 id="more-title" className="mb-8 font-display text-3xl font-semibold text-forest-900">
            {t('articles.more')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {more.map((a, i) => (
              <ArticleCard key={a.slug} article={a} index={i + 1} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
