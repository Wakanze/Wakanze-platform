/** Shared class strings so every page uses the same buttons, fields and widths. */
export const container = 'mx-auto w-full max-w-6xl px-4 sm:px-6'

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60'

export const button = {
  primary: `${buttonBase} bg-forest-800 text-sand-50 hover:bg-forest-900`,
  secondary: `${buttonBase} border border-forest-800 text-forest-800 hover:bg-forest-50`,
  accent: `${buttonBase} bg-ochre-500 text-ink-900 hover:bg-ochre-300`,
  onDark: `${buttonBase} border border-sand-200/60 text-sand-50 hover:bg-forest-700`,
}

export const field =
  'mt-1 block w-full rounded-lg border border-sand-300 bg-white px-3 py-2.5 text-ink-900 placeholder:text-ink-500 focus:border-forest-700 focus:outline-none focus:ring-2 focus:ring-forest-700/30'

export const label = 'block text-sm font-medium text-ink-700'

export const eyebrow = 'text-xs font-semibold uppercase tracking-[0.18em] text-clay-700'
