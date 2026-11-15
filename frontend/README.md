# Wakanze — frontend

Public Gateway of the Wakanze platform: React 19, TypeScript, Vite, Tailwind CSS 4,
react-router 7 and i18next (English, Portuguese, French, Spanish).

This is a clickable mockup. Articles, events and supporters are fictitious (`src/mocks/`),
and the newsletter and interest forms only log to the browser console. The Store and the
donation links are real and open the external platforms.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
```

## Checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Structure

```
src/
├── app/          routing and the public layout
├── pages/public/ one file per route
├── components/   shared UI (header, footer, cards, buttons in styles.ts)
├── features/     logic with its own tests: events, supporters, lead capture, interest form
├── i18n/         setup, language groups and the locale files
├── lib/          helpers and external links (store, donations, social)
├── mocks/        illustrative data until the API exists
└── assets/       official logo files
```

## Pages

| Route | Page |
|---|---|
| `/` | Home: mission, Store and Donate, latest articles, events, supporters, ways to take part |
| `/about` | About Wakanze |
| `/articles`, `/articles/:slug` | Articles, newest first |
| `/events` | Upcoming events with date and region filters |
| `/supporters` | Supporters chosen by the team, filterable by topic and country |
| `/donate` | Donations (Buy Me a Coffee, Cash App) and the Store |
| `/join` | Interest form with six ways to take part (`/join?interest=creator` preselects one) |
| `/subscribe/confirmed`, `/unsubscribe` | Pages the newsletter emails link to |

The Store (Bonfire) opens in a new tab from the menu.

## Design

The colours come from the official logo and the Wakanze Store: black and white as the base,
gold for the most important action, and as few other colours as possible. Headings use
Montserrat and body text uses Inter, both served with the site (`@fontsource`).
The tokens are in `src/index.css`.

## Languages

`src/i18n/index.ts` groups languages into African, European and Creole. Languages without a
translation yet are listed as "coming soon". To add one, create its file in
`src/i18n/locales/` and move it from `UPCOMING_LANGUAGES` to `SUPPORTED_LANGUAGES`.
A test checks that every locale file has the same keys.

## Not built yet

- Sending emails: the newsletter and interest forms will use an external email service, still
  to be chosen.
- Back-end: none yet. When it arrives, the mock data in `src/mocks/` is replaced by API calls.
