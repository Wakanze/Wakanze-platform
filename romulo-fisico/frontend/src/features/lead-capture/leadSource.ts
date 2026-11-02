/** Where a lead came from (LEAD-3): the page plus any UTM tags on the visit (SOC-1). */
export type LeadSource = {
  page: string
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
}

export function readLeadSource(pathname: string, search: string): LeadSource {
  const params = new URLSearchParams(search)
  return {
    page: pathname,
    utmSource: params.get('utm_source'),
    utmMedium: params.get('utm_medium'),
    utmCampaign: params.get('utm_campaign'),
  }
}

// Deliberately simple: the server is the authority on validity and duplicates (LEAD-2).
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidEmail(value: string): boolean {
  return EMAIL.test(value.trim())
}
