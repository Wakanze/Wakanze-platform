"""
Platform Access roles (Decision D2, SRS ADM-2 / ADM-4).

These are SOFTWARE permissions for operating the MVP back-office. They are not,
and must never be presented or reasoned about as, Wakanze institutional roles
(Global Admin, Country Admin, Club Admin, Membership Officer, ...). Those are a
separate, future design (Domain Map; Roadmap M6+).

To add a finer-grained platform role later: add a value here and its entry in
DJANGO_ADMIN_SCOPE. No schema redesign is needed (ADM-4).
"""

from django.db import models


class Role(models.TextChoices):
    ADMIN = "admin", "Admin"
    EDITOR = "editor", "Editor"


# What each role may do inside Django Admin, by app label.
# "*" = every app and action. Otherwise {app_label: {actions}}.
# Leads are PII and stay Admin-only; Editors may view and update Interest status
# for follow-up, but bulk export is Admin-only (Final Review §11).
DJANGO_ADMIN_SCOPE: dict[str, object] = {
    Role.ADMIN: "*",
    Role.EDITOR: {
        "content": {"view", "add", "change", "delete"},
        "events": {"view", "add", "change", "delete"},
        "newsletter": {"view", "add", "change"},
        "interests": {"view", "change"},
    },
}
