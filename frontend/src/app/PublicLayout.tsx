import { NavLink, Outlet } from 'react-router'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'font-semibold text-emerald-700'
    : 'text-gray-600 hover:text-gray-900'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <nav className="mx-auto flex max-w-3xl gap-6 px-6 py-4">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/articles" className={linkClass}>Articles</NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}