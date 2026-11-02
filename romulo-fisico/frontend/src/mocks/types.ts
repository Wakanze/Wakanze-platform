import type { Localized } from '../lib/localized.ts'

/** Illustrative shapes for the mockup. The real ones come from the API in Phases 2–4. */
export type Tone = 'forest' | 'clay' | 'ochre'

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

export type CreatorTopic = 'history' | 'music' | 'business' | 'language' | 'film'

export type Creator = {
  slug: string
  name: string
  bio: Localized
  topic: CreatorTopic
  links: { label: string; url: string }[]
  tone: Tone
}
