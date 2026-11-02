"""
Platform Access permission classes (Readiness Report §7, Final Review §12).

Every decision here is resolved from StaffRole only — never from Django's
is_staff / is_superuser flags, and never from anything institutional.
Admin and Editor are software permissions, not Wakanze governance roles (ADR-007).
"""

from rest_framework.permissions import BasePermission

from apps.accounts.roles import Role


def _active_roles(request) -> frozenset[str]:
    user = getattr(request, "user", None)
    if not user or not user.is_authenticated:
        return frozenset()
    return user.active_roles()


class IsAuthenticatedStaff(BasePermission):
    """Authenticated Account holding at least one active StaffRole."""

    message = "Staff authentication required."

    def has_permission(self, request, view):
        return bool(_active_roles(request))


class IsAdminRole(BasePermission):
    """Admin only — required for every PII bulk-export action (Decision D2)."""

    message = "Admin role required."

    def has_permission(self, request, view):
        return Role.ADMIN in _active_roles(request)


class IsEditorOrAdminRole(BasePermission):
    message = "Editor or Admin role required."

    def has_permission(self, request, view):
        return bool(_active_roles(request) & {Role.ADMIN, Role.EDITOR})
