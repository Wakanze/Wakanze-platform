import { Link } from 'react-router'

/** Placeholder wordmark until the official logo files are added. */
export default function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="Wakanze">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true" focusable="false">
        <rect width="32" height="32" rx="8" fill={inverted ? '#f7f2ea' : '#064e3b'} />
        <polygon points="16,5 27,16 16,27 5,16" fill="#d69e2e" />
        <polygon points="16,11 21,16 16,21 11,16" fill={inverted ? '#064e3b' : '#f7f2ea'} />
      </svg>
      <span
        className={`font-display text-2xl font-semibold tracking-tight ${inverted ? 'text-sand-50' : 'text-forest-800'}`}
      >
        Wakanze
      </span>
    </Link>
  )
}
