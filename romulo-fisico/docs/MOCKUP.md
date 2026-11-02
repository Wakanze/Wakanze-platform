# Public Gateway mockup (UX)

A clickable mockup of the Public Gateway, built in `frontend/` on the base stack
(React 19, Vite 8, Tailwind 4, react-router 7, i18n EN/PT/FR/ES). Content, events and
people are fictitious, and forms log to the browser console instead of sending anything.

```bash
docker compose up --build -d     # then open http://localhost:5173
```

## Visual direction: "Terra & Esmeralda"

| Token | Use |
|---|---|
| Sand `#F7F2EA` / `#FBF8F3` | page backgrounds |
| Emerald `#064E3B` (forest-800) | brand, primary buttons, headings |
| Clay `#C2410C` / `#9A3412` | accents, labels, the pattern band |
| Ochre `#D69E2E` | secondary accent, buttons on dark |
| Fraunces (display) + Inter (text) | self-hosted with `@fontsource`, no external font requests |

Tokens live in `frontend/src/index.css` (`@theme`). Illustrations are inline SVG patterns
(`components/PatternArt.tsx`), not photos, so pages stay light on 3G (SRS §5.1).
The wordmark is a placeholder until the official logo files are added.

## Pages and the SRS requirements they cover

| Route | Page | Requirements |
|---|---|---|
| `/` | Homepage: mission, latest articles, upcoming events, creators, six ways to take part | WEB-1, WEB-4 |
| `/about` | About Wakanze and how the loop works | WEB-1 |
| `/articles`, `/articles/:slug` | Reverse-chronological feed and article page | CMS-2, CMS-3 |
| `/events` | Upcoming events, date-range and region filters, external registration links | EVT-1, EVT-3, EVT-4 |
| `/creators` | Creator directory with topic filter, links to their own channels | CRT-1, CRT-3 |
| `/join` | Interest form: name, email, location, one or more of six categories | MEM-1, FND-6 |
| any page | Newsletter signup with double opt-in message and lead source/UTM capture | LEAD-1..3, SOC-1 |
| `/subscribe/confirmed`, `/unsubscribe` | Landing pages for the email links | LEAD-4, LEAD-5 |

Every page has a title and meta description (WEB-5), works from 375 px up (WEB-3), and
has a skip link, visible focus and labelled form fields (WCAG 2.1 AA target, SRS §5.5).

## Deliberately not in the mockup

- Campaign landing pages (WEB-2, Should): same building blocks, added when a campaign needs one.
- Article category filters (CMS-3 defers them) and RSVP/ticketing (EVT-5, out of scope).
- Content in French and Spanish: the UI is translated, content falls back to English (Decision D3).
- Real submissions: Phase 3 wires the newsletter to `POST /api/v1/leads/`, Phase 4 the interest form to `POST /api/v1/interests/`.
