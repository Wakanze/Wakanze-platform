# ADR-008: Email provider abstraction

- **Status:** Accepted
- **Source:** Decision Record D4; SRS NEWS-6

## Decision

Email sending sits behind a Wakanze-owned EmailProvider interface (createLead, subscribe, sendNewsletter, unsubscribe). Vendor chosen later (Category B).
