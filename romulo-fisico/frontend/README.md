# frontend

Public Gateway frontend, built on the same stack and conventions as the root
[`frontend/`](../../frontend): React 19, Vite 8, Tailwind CSS 4, react-router 7,
i18next with English, Portuguese, French and Spanish.

Added on top of that base for Phase 1:

- `src/api/client.ts`: fetch client with same-origin session cookies and CSRF (ADR-013),
  raising `ApiError` from the `{error: {code, message, details}}` envelope.
- `src/features/auth/`: staff sign-in (`/staff/login`) and a guarded staff area (`/staff`).
- `src/i18n/locales.test.ts`: every locale must have exactly the keys of `en.json`.
- Vitest + Testing Library, and a dev proxy of `/api`, `/admin` and `/static` to Django.

```bash
npm ci
npm run dev        # http://localhost:5173 (expects Django on :8000, or use docker compose)
npm run lint && npm run typecheck && npm test && npm run build
```
