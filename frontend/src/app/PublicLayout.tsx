import { NavLink, Outlet } from 'react-router'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher.tsx'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'font-semibold text-emerald-700'
    : 'text-gray-600 hover:text-gray-900'

export default function PublicLayout() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <nav className="mx-auto flex max-w-3xl items-center gap-6 px-6 py-4">
          <NavLink to="/" end className={linkClass}>{t('nav.home')}</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/articles" className={linkClass}>{t('nav.articles')}</NavLink>
          <LanguageSwitcher />
        </nav>
      </header>
      <Outlet />
    </div>
  )
}