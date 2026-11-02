"""Newsletter drafts, approvals and sends; EmailProvider and DraftingProvider (Phase 3)."""

from django.apps import AppConfig


class NewsletterConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.newsletter"
    label = "newsletter"
