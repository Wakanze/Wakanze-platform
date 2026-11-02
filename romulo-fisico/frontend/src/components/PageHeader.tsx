import type { ReactNode } from 'react'
import type { Tone } from '../mocks/types.ts'
import PatternArt from './PatternArt.tsx'
import { container, eyebrow } from './styles.ts'

type Props = {
  kicker: string
  title: string
  intro?: string
  tone?: Tone
  children?: ReactNode
}

export default function PageHeader({ kicker, title, intro, tone = 'forest', children }: Props) {
  return (
    <header className="border-b border-sand-200 bg-sand-50">
      <div className={`${container} grid gap-8 py-12 sm:py-16 md:grid-cols-[1fr_auto] md:items-end`}>
        <div className="max-w-3xl">
          <p className={eyebrow}>{kicker}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-forest-900 sm:text-5xl">{title}</h1>
          {intro && <p className="mt-4 text-lg leading-relaxed text-ink-700">{intro}</p>}
          {children}
        </div>
        <PatternArt tone={tone} cols={3} rows={2} seed={1} className="hidden h-28 w-40 rounded-2xl md:block" />
      </div>
    </header>
  )
}
