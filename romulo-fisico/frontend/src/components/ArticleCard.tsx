import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import type { Article } from '../mocks/types.ts'
import { useLocalized } from '../lib/useLocalized.ts'
import PatternArt from './PatternArt.tsx'

export default function ArticleCard({ article, index = 0 }: { article: Article; index?: number }) {
  const { t } = useTranslation()
  const { l, date } = useLocalized()

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand-200 transition-shadow hover:shadow-md">
      <PatternArt tone={article.tone} seed={index} className="h-40 w-full" />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-clay-700">
          {t(`articles.categories.${article.category}`)}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-forest-900">
          <Link to={`/articles/${article.slug}`} className="underline-offset-4 hover:underline">
            {l(article.title)}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-700">{l(article.excerpt)}</p>
        <p className="mt-5 text-xs text-ink-500">
          {article.author} · <time dateTime={article.publishedAt}>{date(article.publishedAt)}</time> ·{' '}
          {t('articles.readTime', { count: article.readMinutes })}
        </p>
      </div>
    </article>
  )
}
