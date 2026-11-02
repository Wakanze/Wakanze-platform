import type { Tone } from '../mocks/types.ts'

const PALETTES: Record<Tone, [string, string, string, string]> = {
  forest: ['#064e3b', '#0a6b50', '#f0cd7e', '#f7f2ea'],
  clay: ['#9a3412', '#c2410c', '#f0cd7e', '#fbe3d5'],
  ochre: ['#d69e2e', '#8a5a0a', '#064e3b', '#fbf0d9'],
}

type Props = {
  tone: Tone
  /** Varies the arrangement so cards with the same tone do not look identical. */
  seed?: number
  cols?: number
  rows?: number
  className?: string
}

/**
 * Decorative geometric pattern, inspired by the repetition found in African textiles.
 * Pure SVG: no image download, so it is cheap on slow mobile connections (SRS §5.1).
 */
export default function PatternArt({ tone, seed = 0, cols = 4, rows = 3, className }: Props) {
  const [bg, a, b, c] = PALETTES[tone]
  const size = 30
  const cells = []

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const motif = (x * 7 + y * 3 + seed) % 4
      const px = x * size
      const py = y * size
      const key = `${x}-${y}`
      if (motif === 0) {
        cells.push(
          <polygon key={key} points={`${px + 15},${py + 3} ${px + 27},${py + 15} ${px + 15},${py + 27} ${px + 3},${py + 15}`} fill={b} />,
        )
      } else if (motif === 1) {
        cells.push(
          <g key={key}>
            <polygon points={`${px},${py + 30} ${px + 15},${py} ${px + 30},${py + 30}`} fill={a} />
            <polygon points={`${px + 9},${py + 30} ${px + 15},${py + 18} ${px + 21},${py + 30}`} fill={c} />
          </g>,
        )
      } else if (motif === 2) {
        cells.push(
          <g key={key} fill={c} opacity="0.85">
            <rect x={px + 4} y={py + 6} width="22" height="3" />
            <rect x={px + 4} y={py + 13.5} width="22" height="3" />
            <rect x={px + 4} y={py + 21} width="22" height="3" />
          </g>,
        )
      } else {
        cells.push(
          <g key={key}>
            <circle cx={px + 15} cy={py + 15} r="10" fill={a} />
            <circle cx={px + 15} cy={py + 15} r="4" fill={b} />
          </g>,
        )
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${cols * size} ${rows * size}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect width={cols * size} height={rows * size} fill={bg} />
      {cells}
    </svg>
  )
}
