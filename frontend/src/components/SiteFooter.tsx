import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { SOCIAL_LINKS, STORE_URL } from '../lib/links.ts'
import Logo from './Logo.tsx'
import { container } from './styles.ts'

const EXPLORE = [
  { to: '/about', key: 'nav.about' },
  { to: '/articles', key: 'nav.articles' },
  { to: '/events', key: 'nav.events' },
  { to: '/supporters', key: 'nav.supporters' },
] as const

const heading = 'font-display text-xs font-bold uppercase tracking-[0.2em] text-gold-300'
const itemLink = 'hover:text-paper-50 hover:underline'

export default function SiteFooter() {
  const { t } = useTranslation()

  return (
    <footer className="bg-ink-950 text-paper-200">
      <div className={`${container} grid gap-10 py-14 md:grid-cols-[2fr_1fr_1fr_1fr]`}>
        <div>
          <Logo inverted />
          <p className="mt-4 font-display text-sm font-bold uppercase tracking-[0.2em] text-gold-300">{t('footer.tagline')}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed">{t('footer.mission')}</p>
        </div>
        <div>
          <h2 className={heading}>{t('footer.explore')}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {EXPLORE.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={itemLink}>
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={heading}>{t('footer.participate')}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/join" className={itemLink}>
                {t('nav.join')}
              </Link>
            </li>
            <li>
              <Link to="/donate" className={itemLink}>
                {t('nav.donate')}
              </Link>
            </li>
            <li>
              <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className={itemLink}>
                {t('nav.store')}
                <span className="sr-only"> {t('common.opensInNewTab')}</span>
              </a>
            </li>
            <li>
              <Link to="/join?interest=partner" className={itemLink}>
                {t('footer.partner')}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className={heading}>{t('footer.follow')}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.url}>
                <a href={social.url} target="_blank" rel="noopener noreferrer" className={itemLink}>
                  {social.name}
                  <span className="sr-only"> {t('common.opensInNewTab')}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-800">
        <div className={`${container} py-5 text-xs text-paper-300`}>
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  )
}
