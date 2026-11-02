import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import SiteFooter from '../components/SiteFooter.tsx'
import SiteHeader from '../components/SiteHeader.tsx'

export default function PublicLayout() {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-forest-800 focus:px-4 focus:py-2 focus:text-sand-50"
      >
        {t('common.skipToContent')}
      </a>
      <p className="bg-ochre-100 px-4 py-1.5 text-center text-xs text-ochre-700">{t('common.mockupBanner')}</p>
      <SiteHeader />
      <div id="main" className="flex-1">
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  )
}
