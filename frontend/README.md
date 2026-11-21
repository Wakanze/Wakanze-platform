# Wakanze — frontend

Public Gateway of the Wakanze platform: React 19, TypeScript, Vite, Tailwind CSS 4,
react-router 7 and i18next (English, Portuguese, French, Spanish).

Everything visible uses real data: the latest videos come from the Wakanze YouTube channel, and
the Store and donation links open the real platforms. The newsletter and join forms are not
connected yet (see "Not built yet"), and a banner at the top of every page says so.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
```

`npm run dev` and `npm run build` first run `scripts/fetch-latest-videos.mjs`, which saves the
three newest videos from the channel's public feed to `src/data/latest-videos.json`. No API key
is needed. If YouTube cannot be reached, the saved list is kept. Rebuild the site to show newer
videos.

## Checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Structure

```
scripts/          build-time helpers (latest YouTube videos)
src/
├── app/          routing and the public layout
├── pages/public/ one file per route
├── components/   shared UI (header, footer, cards, buttons in styles.ts)
├── features/     logic with its own tests: videos, lead capture, interest form, events, supporters
├── i18n/         setup, language detection, language groups and the locale files
├── lib/          helpers and external links (store, donations, social)
├── data/         data saved at build time (latest videos)
├── mocks/        sample data for the hidden sections
└── assets/       official logo files
```

## Pages

| Route | Page |
|---|---|
| `/` | Home: mission, Store and Donate, latest videos, ways to take part |
| `/about` | About Wakanze |
| `/videos` | The three latest videos from the YouTube channel |
| `/support` | Support Wakanze: donations (Buy Me a Coffee, Cash App) and the Store (`/donate` redirects here) |
| `/join` | Interest form with six ways to take part (`/join?interest=creator` preselects one) |
| `/subscribe/confirmed`, `/unsubscribe` | Pages the newsletter emails link to |

Videos open in a privacy-enhanced YouTube player (`youtube-nocookie.com`) only when the visitor
presses play. Until then only the thumbnail loads.

**Hidden for now:** Articles, Events and Supporters have no real content yet. Their pages stay in
`pages/public/` with sample data in `src/mocks/`, but they have no route and are not linked
anywhere. To turn one back on, add its route in `src/app/App.tsx` once it has real content.

## Design

The colours come from the official logo and the Wakanze Store: black and white as the base,
gold for the most important action, and as few other colours as possible. Headings use
Montserrat and body text uses Inter, both served with the site (`@fontsource`).
The tokens are in `src/index.css`.

## Languages

The site shows itself in the visitor's browser language when it is available (for example
`pt-BR` shows Portuguese), and falls back to English. A language picked by hand in the selector
is remembered for the next visit.

`src/i18n/index.ts` groups languages into Afrika, Europe and Asia. A group appears in the
selector once it has at least one translated language. To add a language, create its file in
`src/i18n/locales/`, register it in `resources`, and add it to `SUPPORTED_LANGUAGES` with its
group. Right-to-left languages such as Arabic switch the page direction automatically.
A test checks that every locale file has the same keys.

## Not built yet

- Sending emails: the newsletter and join forms will use an external email service, still to
  be chosen. MailerLite is the proposed choice.
- Back-end: none yet.
