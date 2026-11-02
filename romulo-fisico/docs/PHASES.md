# Implementation phases

From Final Technical Baseline Review v0.1 §14. Reference requirement IDs (WEB-1, LEAD-4, …) in commits and tests.

| Phase | Scope | Status |
|---|---|---|
| 1 — Technical foundation | Repo, Django project, PostgreSQL, React project, environment config, CI, base API, staff auth, migrations, logging, audit foundation | **Done** |
| 2 — Public Gateway | Design system, homepage, navigation, responsive layout, i18n, content, events, creator pages | Next |
| 3 — Growth loop | Lead capture, attribution (UTM), double opt-in, newsletter workflow, unsubscribe, analytics | |
| 4 — Interest pipeline | Interest form (6 categories), records, statuses, staff workflow, acknowledgment email, PII controls | |
| 5 — Admin | Admin/Editor roles in Django Admin, content/events/leads/interests management, newsletter approval screen, audit | |
| 6 — Hardening | Security, accessibility (WCAG 2.1 AA), performance, backup/restore, error monitoring, analytics verification, E2E, deployment readiness | |

After Phase 6: real traffic, real evidence, then the M4 Gate Review — not before.

## Phase 1 — what exists

- Tables: `Person`, `Account`, `StaffRole`, `AuditLog` (4 of the final 13).
- Apps: all 10 created; `content`, `events`, `leads`, `interests`, `newsletter`, `analytics` are empty shells until their phase.
- API: `POST /api/v1/auth/login/`, `POST /api/v1/auth/logout/`, `GET /api/v1/auth/me/`.
- Permission classes: `IsAuthenticatedStaff`, `IsAdminRole`, `IsEditorOrAdminRole` — resolved from StaffRole only.
- Audit: `apps.audit.services.record()`; role grants/revokes write `staffrole.granted` / `staffrole.revoked`.

The frontend was rebuilt on the root `frontend/` stack (React 19, Vite 8, Tailwind 4,
react-router 7, i18n EN/PT/FR/ES) and adds the API client, staff sign-in and locale parity tests.

## Decisions received from the Admin

- Repository: `Wakanze/Wakanze-platform`; this work lives in `romulo-fisico/`.
- Hosting: no preference yet (Azure or similar).
- Newsletter approver (D5): the Admin for now; another person later.
- Visual identity: none yet; designed as part of the Phase 2 UX work.
