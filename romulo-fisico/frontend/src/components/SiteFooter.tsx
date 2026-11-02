import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import Logo from './Logo.tsx'
import { container } from './styles.ts'

const EXPLORE = [
  { to: '/about', key: 'nav.about' },
  { to: '/articles', key: 'nav.articles' },
  { to: '/events', key: 'nav.events' },
  { to: '/creators', key: 'nav.creators' },
] as const

export default function SiteFooter() {
  const { t } = useTranslation()

  return (
    <footer className="bg-forest-950 text-sand-200">
      <div className={`${container} grid gap-10 py-14 md:grid-cols-[2fr_1fr_1fr]`}>
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">{t('footer.mission')}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ochre-300">{t('footer.explore')}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {EXPLORE.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-sand-50 hover:underline">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ochre-300">{t('footer.participate')}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/join" className="hover:text-sand-50 hover:underline">
                {t('nav.join')}
              </Link>
            </li>
            <li>
              <Link to="/join?interest=creator" className="hover:text-sand-50 hover:underline">
                {t('footer.becomeCreator')}
              </Link>
            </li>
            <li>
              <Link to="/join?interest=partner" className="hover:text-sand-50 hover:underline">
                {t('footer.partner')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-forest-800">
        <div className={`${container} flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-sand-300`}>
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          <Link to="/staff/login" className="hover:text-sand-50 hover:underline">
            {t('footer.staff')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
