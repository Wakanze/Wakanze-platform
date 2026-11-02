import pytest
from django.db import IntegrityError, transaction

from apps.accounts.models import StaffRole
from apps.accounts.roles import Role
from apps.accounts.services import create_staff_account, grant_role, revoke_role
from apps.audit import actions
from apps.audit.models import AuditLog

pytestmark = pytest.mark.django_db


def test_create_staff_account_creates_person_account_and_role(password):
    account = create_staff_account(email="  New@Wakanze.TEST ", password=password, role=Role.EDITOR)
    assert account.email == "new@wakanze.test"
    assert account.person_id is not None
    assert account.active_roles() == {Role.EDITOR}
    logged = set(AuditLog.objects.values_list("action", flat=True))
    assert {actions.ACCOUNT_CREATED, actions.STAFFROLE_GRANTED} <= logged


def test_duplicate_email_is_rejected_case_insensitively(admin_account, password):
    with pytest.raises(ValueError):
        create_staff_account(email="ADMIN@wakanze.test", password=password, role=Role.EDITOR)


def test_weak_password_is_rejected():
    from django.core.exceptions import ValidationError

    with pytest.raises(ValidationError):
        create_staff_account(email="x@wakanze.test", password="123", role=Role.EDITOR)


def test_grant_is_idempotent(editor_account):
    first = grant_role(editor_account, Role.EDITOR)
    second = grant_role(editor_account, Role.EDITOR)
    assert first.pk == second.pk
    assert StaffRole.objects.filter(account=editor_account).count() == 1


def test_revoke_ends_role_and_is_audited(admin_account, editor_account):
    revoked = revoke_role(editor_account, Role.EDITOR, actor=admin_account)
    assert revoked.ended_at is not None
    assert editor_account.active_roles() == frozenset()
    entry = AuditLog.objects.filter(action=actions.STAFFROLE_REVOKED).get()
    assert entry.actor_account == admin_account
    assert entry.target_id == str(editor_account.pk)
    assert entry.metadata["role"] == "editor"


def test_regrant_after_revoke_keeps_history(editor_account):
    revoke_role(editor_account, Role.EDITOR)
    grant_role(editor_account, Role.EDITOR)
    assert StaffRole.objects.filter(account=editor_account).count() == 2
    assert StaffRole.objects.filter(account=editor_account, ended_at__isnull=True).count() == 1


def test_db_enforces_one_active_role_per_account(editor_account):
    with pytest.raises(IntegrityError), transaction.atomic():
        StaffRole.objects.create(account=editor_account, role=Role.EDITOR)


def test_unknown_role_is_rejected(editor_account):
    with pytest.raises(ValueError):
        grant_role(editor_account, "country_admin")


def test_django_admin_scope_follows_staffrole(admin_account, editor_account):
    assert admin_account.is_staff and admin_account.has_perm("leads.view_lead")
    assert editor_account.is_staff
    assert editor_account.has_perm("content.change_contentitem")
    assert editor_account.has_perm("interests.view_interest")
    assert not editor_account.has_perm("interests.delete_interest")
    assert not editor_account.has_perm("leads.view_lead")  # PII stays Admin-only
    assert not editor_account.has_module_perms("accounts")

    revoke_role(editor_account, Role.EDITOR)
    assert not editor_account.is_staff
    assert not editor_account.has_perm("content.change_contentitem")


def test_inactive_account_has_no_access(admin_account):
    admin_account.is_active = False
    admin_account.save()
    assert not admin_account.is_staff
    assert not admin_account.has_perm("leads.view_lead")
