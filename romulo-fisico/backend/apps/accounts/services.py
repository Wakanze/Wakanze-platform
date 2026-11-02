"""
Account and StaffRole services. All role changes go through here so each one
is written to AuditLog (staffrole.granted / staffrole.revoked).
"""

from django.contrib.auth.password_validation import validate_password
from django.db import transaction
from django.utils import timezone

from apps.audit import actions
from apps.audit.services import record
from apps.identity.models import Person

from .models import Account, StaffRole
from .roles import Role


@transaction.atomic
def create_staff_account(*, email: str, password: str | None, role: str, actor=None) -> Account:
    email = email.strip().lower()
    if Account.objects.filter(email__iexact=email).exists():
        raise ValueError(f"An account for {email} already exists.")
    if password:
        validate_password(password)

    person = Person.objects.create()
    account = Account(email=email, person=person)
    if password:
        account.set_password(password)
    else:
        account.set_unusable_password()
    account.save()
    record(actions.ACCOUNT_CREATED, actor=actor, target=account)
    grant_role(account, role, actor=actor)
    return account


@transaction.atomic
def grant_role(account: Account, role: str, *, actor=None) -> StaffRole:
    role = Role(role)  # raises ValueError on an unknown role
    existing = StaffRole.objects.filter(account=account, role=role, ended_at__isnull=True).first()
    if existing:
        return existing
    staff_role = StaffRole.objects.create(account=account, role=role)
    account.clear_role_cache()
    record(
        actions.STAFFROLE_GRANTED,
        actor=actor,
        target=account,
        metadata={"role": role.value, "staff_role_id": str(staff_role.pk)},
    )
    return staff_role


@transaction.atomic
def revoke_role(account: Account, role: str, *, actor=None) -> StaffRole | None:
    role = Role(role)
    staff_role = (
        StaffRole.objects.select_for_update()
        .filter(account=account, role=role, ended_at__isnull=True)
        .first()
    )
    if staff_role is None:
        return None
    staff_role.ended_at = timezone.now()
    staff_role.save(update_fields=["ended_at", "updated_at"])
    account.clear_role_cache()
    record(
        actions.STAFFROLE_REVOKED,
        actor=actor,
        target=account,
        metadata={"role": role.value, "staff_role_id": str(staff_role.pk)},
    )
    return staff_role
