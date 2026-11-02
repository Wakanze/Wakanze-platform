from django.contrib import admin

from .models import AuditLog


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    """Read-only: the audit trail is never edited by hand."""

    list_display = ("occurred_at", "action", "actor_account", "target_type", "target_id")
    list_filter = ("action", "target_type")
    search_fields = ("action", "target_id")
    date_hierarchy = "occurred_at"

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
