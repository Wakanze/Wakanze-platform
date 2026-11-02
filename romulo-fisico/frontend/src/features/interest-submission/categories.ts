/**
 * Interest categories from MEM-1. Kept as data, not as a hard-coded type union,
 * so new categories can be added without touching the form (FND-6).
 * Labels live in the locale files under `interest.categories.<id>`.
 */
export const INTEREST_CATEGORIES = ['member', 'club', 'event', 'creator', 'volunteer', 'partner'] as const

export function isInterestCategory(value: string | null): value is (typeof INTEREST_CATEGORIES)[number] {
  return value !== null && (INTEREST_CATEGORIES as readonly string[]).includes(value)
}
