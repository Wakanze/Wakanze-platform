import { Link } from 'react-router'
import emblem from '../assets/wakanze-emblem.webp'

/** The official Wakanze emblem with the wordmark set in the display font. */
export default function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Wakanze">
      <span className={`flex h-10 w-10 items-center justify-center rounded-full ${inverted ? 'bg-paper-50' : ''}`}>
        <img src={emblem} alt="" width="27" height="40" className="h-9 w-auto" />
      </span>
      <span
        className={`font-display text-xl font-extrabold uppercase tracking-[0.12em] ${inverted ? 'text-paper-50' : 'text-ink-950'}`}
      >
        Wakanze
      </span>
    </Link>
  )
}
