/** Shared class strings so every page uses the same buttons, fields and widths. */
export const container = 'mx-auto w-full max-w-6xl px-4 sm:px-6'

const buttonBase =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60'

export const button = {
  primary: `${buttonBase} bg-ink-950 text-paper-50 hover:bg-ink-800`,
  secondary: `${buttonBase} border border-ink-950 text-ink-950 hover:bg-paper-200`,
  /** Gold: reserved for the most important action in a section. */
  accent: `${buttonBase} bg-gold-500 text-ink-950 hover:bg-gold-300`,
  onDark: `${buttonBase} border border-paper-50/60 text-paper-50 hover:bg-paper-50 hover:text-ink-950`,
}

export const field =
  'mt-1 block w-full rounded-lg border border-paper-300 bg-white px-3 py-2.5 text-ink-900 placeholder:text-ink-500 focus:border-ink-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40'

export const label = 'block text-sm font-medium text-ink-700'

export const eyebrow = 'font-display text-xs font-bold uppercase tracking-[0.2em] text-gold-700'
