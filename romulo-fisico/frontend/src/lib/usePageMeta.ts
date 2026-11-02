import { useEffect } from 'react'

/** Per-page title and meta description (WEB-5). Open Graph tags need server rendering later (CMS-5). */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title === 'Wakanze' ? title : `${title} · Wakanze`
    if (description) {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = description
    }
  }, [title, description])
}
