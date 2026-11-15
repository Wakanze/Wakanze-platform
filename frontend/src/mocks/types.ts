import type { Localized } from '../lib/localized.ts'

/** Illustrative shapes for the mockup. The real ones come from the API in Phases 2–4. */
export type Tone = 'ink' | 'flame' | 'gold'

export type Article = {
  slug: string
  title: Localized
  excerpt: Localized
  body: Localized[]
  category: 'history' | 'culture' | 'community' | 'opportunity'
  author: string
  publishedAt: string
  readMinutes: number
  tone: Tone
}

export type EventRegion = 'africa' | 'europe' | 'americas' | 'online'

export type WakanzeEvent = {
  slug: string
  title: Localized
  description: Localized
  startsAt: string
  city: string | null
  country: string | null
  region: EventRegion
  registrationUrl: string | null
  tone: Tone
}

export type SupporterTopic = 'history' | 'culture' | 'music' | 'business' | 'language' | 'film'

export type SocialNetwork = 'instagram' | 'tiktok' | 'youtube' | 'facebook' | 'x' | 'website'

/**
 * A person who supports Wakanze and produces related content. Supporters are added by the
 * Wakanze team, not through public sign-up, so the directory stays meaningful.
 */
export type Supporter = {
  slug: string
  name: string
  /** What they do, e.g. "Historian and podcast host". */
  role: Localized
  bio: Localized
  topic: SupporterTopic
  country: string
  links: { network: SocialNetwork; url: string }[]
  tone: Tone
}
