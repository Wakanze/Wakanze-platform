# infra

Deployment configuration lives here — **no vendor-specific secrets**.

Hosting, managed PostgreSQL, CDN and monitoring vendors are Category B decisions
(Final Technical Baseline Review §7): deferred until we wire them. The deployment
shape is already fixed:

- Environments: development (local, `docker-compose.yml`), staging (mirrors production), production.
- Backend: the `prod` target of `backend/Dockerfile`, on a single managed container host (ADR-014).
- Database: managed PostgreSQL, automated daily backups + documented monthly restore test.
- Frontend: static `frontend/dist/` served by the host or a CDN.
- Migrations: explicit release step (`python manage.py migrate`), never on boot.
- Monitoring: hosted error tracking + uptime from day one.
