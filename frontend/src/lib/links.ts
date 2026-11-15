/**
 * External services Wakanze uses in this first phase. The store and donations run on
 * third-party platforms, so the site only links out to them.
 */
export const STORE_URL = 'https://www.bonfire.com/store/wakanzestore/'

export type DonationLink = {
  id: string
  name: string
  url: string
}

/** The donation links from the Wakanze Linktree (linktr.ee/wakanze). */
export const DONATION_LINKS: DonationLink[] = [
  { id: 'buymeacoffee', name: 'Buy Me a Coffee', url: 'https://buymeacoffee.com/wakanze' },
  { id: 'cashapp', name: 'Cash App', url: 'https://cash.app/$wakanze' },
]

export const SOCIAL_LINKS = [
  { name: 'Instagram', url: 'https://www.instagram.com/wakanze/' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@wakanze' },
  { name: 'YouTube', url: 'https://www.youtube.com/@wakanze' },
  { name: 'Facebook', url: 'https://www.facebook.com/wakanze/' },
] as const
