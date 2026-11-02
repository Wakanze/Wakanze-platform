import { Link } from 'react-router'
import { eyebrow } from './styles.ts'

type Props = {
  kicker: string
  title: string
  link?: { to: string; label: string }
}

export default function SectionHeading({ kicker, title, link }: Props) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className={eyebrow}>{kicker}</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-forest-900 sm:text-4xl">{title}</h2>
      </div>
      {link && (
        <Link to={link.to} className="text-sm font-semibold text-forest-700 underline-offset-4 hover:underline">
          {link.label} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  )
}
