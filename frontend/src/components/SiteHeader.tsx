import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useTranslation } from 'react-i18next'
import { STORE_URL } from '../lib/links.ts'
import LanguageSwitcher from './LanguageSwitcher.tsx'
import Logo from './Logo.tsx'
import { button, container } from './styles.ts'

const NAV = [
  { to: '/', key: 'nav.home', end: true },
  { to: '/about', key: 'nav.about' },
  { to: '/articles', key: 'nav.articles' },
  { to: '/events', key: 'nav.events' },
  { to: '/supporters', key: 'nav.supporters' },
  { to: '/donate', key: 'nav.donate' },
] as const

const linkClass = ({ isActive }: { isActive: boolean }) =>
  'whitespace-nowrap ' +
  (isActive ? 'font-semibold text-ink-950 underline decoration-gold-500 decoration-2 underline-offset-8' : 'text-ink-700 hover:text-ink-950')

function StoreLink({ className, onClick }: { className: string; onClick?: () => void }) {
  const { t } = useTranslation()
  return (
    <a href={STORE_URL} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>
      {t('nav.store')} <span aria-hidden="true">↗</span>
      <span className="sr-only"> {t('common.opensInNewTab')}</span>
    </a>
  )
}

export default function SiteHeader() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-paper-200 bg-paper-50/95 backdrop-blur">
      <div className={`${container} flex h-16 items-center gap-6`}>
        <Logo />
        <nav aria-label={t('nav.label')} className="hidden flex-1 items-center gap-5 text-sm xl:flex">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={'end' in item} className={linkClass}>
              {t(item.key)}
            </NavLink>
          ))}
          <StoreLink className="whitespace-nowrap font-semibold text-gold-700 hover:text-ink-950" />
        </nav>
        <div className="ml-auto hidden items-center gap-4 xl:flex">
          <LanguageSwitcher />
          <Link to="/join" className={button.primary}>
            {t('nav.join')}
          </Link>
        </div>
        <button
          type="button"
          className="ml-auto rounded-lg p-2 text-ink-950 hover:bg-paper-200 xl:hidden"
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
        <div id="mobile-nav" className="border-t border-paper-200 bg-paper-50 xl:hidden">
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
            <StoreLink
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-semibold text-gold-700 hover:text-ink-950"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-4 border-t border-paper-200 px-3 pt-4">
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
