import pytest

from apps.audit.models import AppendOnlyError, AuditLog
from apps.audit.services import record

pytestmark = pytest.mark.django_db


def test_record_derives_target_from_model(admin_account):
    entry = record("test.done", actor=admin_account, target=admin_account, metadata={"k": "v"})
    assert entry.target_type == "accounts.account"
    assert entry.target_id == str(admin_account.pk)
    assert entry.actor_account == admin_account


def test_audit_rows_are_append_only(admin_account):
    entry = record("test.done", actor=admin_account)
    entry.action = "tampered"
    with pytest.raises(AppendOnlyError):
        entry.save()
    with pytest.raises(AppendOnlyError):
        entry.delete()
    assert AuditLog.objects.get(pk=entry.pk).action == "test.done"


def test_anonymous_actor_is_stored_as_null():
    from django.contrib.auth.models import AnonymousUser

    entry = record("auth.login_failed", actor=AnonymousUser())
    assert entry.actor_account is None
