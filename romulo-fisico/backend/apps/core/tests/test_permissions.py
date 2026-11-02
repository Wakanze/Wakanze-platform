import pytest
from django.contrib.auth.models import AnonymousUser
from rest_framework.test import APIRequestFactory

from apps.accounts.roles import Role
from apps.accounts.services import revoke_role
from apps.core.permissions import IsAdminRole, IsAuthenticatedStaff, IsEditorOrAdminRole

pytestmark = pytest.mark.django_db


def _request(user):
    request = APIRequestFactory().get("/")
    request.user = user
    return request


@pytest.mark.parametrize(
    "fixture, staff, editor_or_admin, admin",
    [
        ("admin_account", True, True, True),
        ("editor_account", True, True, False),
    ],
)
def test_permission_matrix(request, fixture, staff, editor_or_admin, admin):
    req = _request(request.getfixturevalue(fixture))
    assert IsAuthenticatedStaff().has_permission(req, None) is staff
    assert IsEditorOrAdminRole().has_permission(req, None) is editor_or_admin
    assert IsAdminRole().has_permission(req, None) is admin


def test_anonymous_has_no_access():
    req = _request(AnonymousUser())
    assert not IsAuthenticatedStaff().has_permission(req, None)
    assert not IsAdminRole().has_permission(req, None)


def test_permissions_ignore_django_flags(editor_account):
    """Access comes from StaffRole only — there is no is_superuser to flip."""
    revoke_role(editor_account, Role.EDITOR)
    req = _request(editor_account)
    assert not IsAuthenticatedStaff().has_permission(req, None)
    assert not hasattr(editor_account, "is_superuser")
