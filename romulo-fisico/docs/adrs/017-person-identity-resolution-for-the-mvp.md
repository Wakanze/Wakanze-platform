# ADR-017: Person-identity resolution for the MVP

- **Status:** Accepted
- **Source:** Final Technical Baseline Review v0.1 §6

## Decision

One Person per known email, enforced in the service layer; uniqueness lives on Lead.email, not on Person. Explicitly an MVP technical/data-quality constraint — NOT a Wakanze institutional identity principle. Revisited when Membership (Roadmap M6) is designed.
