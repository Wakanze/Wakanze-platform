import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher.tsx'
import Logo from './Logo.tsx'
import { button, container } from './styles.ts'

const NAV = [
  { to: '/', key: 'nav.home', end: true },
  { to: '/about', key: 'nav.about' },
  { to: '/articles', key: 'nav.articles' },
  { to: '/events', key: 'nav.events' },
  { to: '/creators', key: 'nav.creators' },
] as const

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'font-semibold text-forest-800'
    : 'text-ink-700 hover:text-forest-800'

export default function SiteHeader() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-sand-200 bg-sand-100/95 backdrop-blur">
      <div className={`${container} flex h-16 items-center gap-6`}>
        <Logo />
        <nav aria-label={t('nav.label')} className="hidden flex-1 items-center gap-6 text-sm lg:flex">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={'end' in item} className={linkClass}>
              {t(item.key)}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <Link to="/join" className={button.primary}>
            {t('nav.join')}
          </Link>
        </div>
        <button
          type="button"
          className="ml-auto rounded-lg p-2 text-forest-800 hover:bg-sand-200 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? t('nav.close') : t('nav.open')}</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div id="mobile-nav" className="border-t border-sand-200 bg-sand-50 lg:hidden">
          <nav aria-label={t('nav.label')} className={`${container} flex flex-col gap-1 py-4`}>
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={'end' in item}
                onClick={() => setOpen(false)}
                className={(state) => `${linkClass(state)} rounded-lg px-3 py-2.5 text-base`}
              >
                {t(item.key)}
              </NavLink>
            ))}
            <div className="mt-3 flex items-center justify-between gap-4 border-t border-sand-200 px-3 pt-4">
              <LanguageSwitcher />
              <Link to="/join" onClick={() => setOpen(false)} className={button.primary}>
                {t('nav.join')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
