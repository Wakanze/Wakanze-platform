import pytest
from rest_framework.test import APIClient

from apps.accounts.roles import Role
from apps.accounts.services import create_staff_account

PASSWORD = "a-Long-test-passw0rd"  # noqa: S105


@pytest.fixture
def password():
    return PASSWORD


@pytest.fixture
def admin_account(db):
    return create_staff_account(email="admin@wakanze.test", password=PASSWORD, role=Role.ADMIN)


@pytest.fixture
def editor_account(db):
    return create_staff_account(email="editor@wakanze.test", password=PASSWORD, role=Role.EDITOR)


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def csrf_client():
    """A client that enforces CSRF checks, like a real browser session."""
    return APIClient(enforce_csrf_checks=True)
