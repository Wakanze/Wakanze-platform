"""
Accounts in Django Admin.

Accounts are created with `manage.py create_staff_account` (it creates the
Person, the Account and the StaffRole, and audits each step). Role changes made
here go through the same services, so every grant / revoke lands in AuditLog.
"""

from django.contrib import admin, messages

from apps.audit import actions as audit_actions
from apps.audit.services import record

from . import services
from .models import Account, StaffRole
from .roles import Role


class StaffRoleInline(admin.TabularInline):
    model = StaffRole
    extra = 0
    fields = ("role", "started_at", "ended_at")
    readonly_fields = fields
    can_delete = False

    def has_add_permission(self, request, obj=None):
        return False


def _role_action(role: str, grant: bool):
    verb = "Grant" if grant else "Revoke"

    def action(modeladmin, request, queryset):
        for account in queryset:
            if grant:
                services.grant_role(account, role, actor=request.user)
            else:
                services.revoke_role(account, role, actor=request.user)
        modeladmin.message_user(request, f"{verb} {role}: {queryset.count()} account(s).", messages.SUCCESS)

    action.__name__ = f"{verb.lower()}_{role}"
    action.short_description = f"{verb} {Role(role).label} role"
    return action


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ("email", "is_active", "roles", "last_login", "created_at")
    list_filter = ("is_active", "staff_roles__role")
    search_fields = ("email",)
    fields = ("email", "is_active", "person", "last_login", "created_at")
    readonly_fields = ("email", "person", "last_login", "created_at")
    inlines = [StaffRoleInline]
    actions = [
        _role_action(Role.ADMIN, True),
        _role_action(Role.EDITOR, True),
        _role_action(Role.ADMIN, False),
        _role_action(Role.EDITOR, False),
    ]

    @admin.display(description="Active roles")
    def roles(self, obj):
        return ", ".join(sorted(obj.active_roles())) or "—"

    def has_add_permission(self, request):
        return False  # use `manage.py create_staff_account`

    def has_delete_permission(self, request, obj=None):
        return False  # deactivate instead; history must stay intact

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        if change and form.changed_data:
            record(
                audit_actions.ACCOUNT_UPDATED,
                actor=request.user,
                target=obj,
                metadata={"changed": form.changed_data},
            )
