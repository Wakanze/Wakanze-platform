# Wakanze — Public Gateway (romulo-fisico)

Work by Rómulo Físico for review. Everything lives in this folder; nothing outside
`romulo-fisico/` is changed. The root [`frontend/`](../frontend) is the project base:
this folder's frontend uses the same stack and conventions.

The Public Gateway is the first module of the Wakanze platform: the public entrance
that turns a visitor into a known, reachable person moving toward participation.

> Social → website → content/events → email capture → interest → (future) membership

**Mockup (UX):** see [`docs/MOCKUP.md`](docs/MOCKUP.md) for the pages, the visual direction and the SRS requirements each page covers.

Scope, rules and decisions live in [`docs/architecture/`](docs/architecture/README.md) (the source `.docx` documents).
Build progress: [`docs/PHASES.md`](docs/PHASES.md). Decisions: [`docs/adrs/`](docs/adrs/README.md).

## Stack

Modular monolith · Django 5.2 + DRF · PostgreSQL 16 · Docker (no Kubernetes).
Frontend as in the root `frontend/`: React 19 + TypeScript, Vite 8, Tailwind CSS 4,
react-router 7, i18next (EN / PT / FR / ES).

```
romulo-fisico/
├── backend/            Django project
│   ├── config/         settings (base / dev / test / prod), urls, wsgi/asgi
│   ├── apps/           core, identity, accounts, content, events, leads,
│   │                   interests, newsletter, analytics, audit
│   └── requirements/   base.txt, dev.txt, prod.txt
├── frontend/           React + TypeScript (same base as the root frontend/)
│   └── src/            app/ pages/ features/ components/ api/ i18n/ lib/
├── docs/               architecture/ (source .docx), adrs/, PHASES.md
├── infra/              deployment configuration (no secrets)
└── .github/workflows/  CI (inactive here: GitHub only runs root workflows)
```

All commands below run from inside `romulo-fisico/`.

## Run locally (Docker)

```bash
docker compose up --build -d
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py create_staff_account --email you@example.com --role admin
```

- App: http://localhost:5173 — staff sign-in at `/staff/login`
- Back-office (Django Admin): http://localhost:5173/admin/
- API: http://localhost:5173/api/v1/auth/me/

## Run locally (without Docker)

Needs Python 3.12+, Node 22, and a PostgreSQL 16 you can reach.

```bash
# backend
cd backend
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements/dev.txt
cp .env.example .env          # then edit DATABASE_URL
python manage.py migrate
python manage.py create_staff_account --email you@example.com --role admin
python manage.py runserver

# frontend (second terminal)
cd frontend
npm ci
npm run dev
```

## Checks (same as CI)

```bash
cd backend  && ruff check . && ruff format --check . && python manage.py makemigrations --check --dry-run && pytest
cd frontend && npm run lint && npm run typecheck && npm test && npm run build
```

## Rules that are easy to break

- **Platform Access ≠ institutional authority.** Admin/Editor are software permissions. Never add Membership, Stage, institutional Role, Governance Seat or Authority tables/fields in the MVP.
- **Person ≠ Lead ≠ Interest ≠ Account.** No `user_type` field. Person has no email (ADR-017).
- **Access comes from `StaffRole` only** (current = `ended_at IS NULL`), never from `is_staff` / `is_superuser`.
- **Every mutating staff action is audited** via `apps.audit.services.record()`. Role changes go through `apps.accounts.services`.
- **No hard-coded UI strings.** Add every key to `en.json`, `pt.json`, `fr.json` and `es.json` (a test enforces parity).
- **Vendors behind interfaces** — email, AI drafting, storage (ADR-008..010).
- **Migrations are a release step**, never run on boot.
- **If it is not in SRS v0.2, do not build it.**
