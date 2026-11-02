# ADR-013: Session authentication over JWT

- **Status:** Accepted
- **Source:** Implementation Readiness Report v0.1 §10

## Decision

Staff authenticate with Django sessions + CSRF. No token layer in the MVP; the frontend is served from the same trust boundary.
