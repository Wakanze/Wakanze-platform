"""
Account (staff login) and StaffRole.

- Account is a staff-only login; there are no public accounts in the MVP.
- Account references Person; it does not replace it (ADR-011).
- StaffRole is the ONLY source of Platform Access. Current state = ended_at IS NULL.
  Revoking a role sets ended_at and takes effect immediately.
"""

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.db import models
from django.db.models import Q
from django.db.models.functions import Lower
from django.utils import timezone

from apps.core.models import BaseModel
from apps.identity.models import Person

from .roles import DJANGO_ADMIN_SCOPE, Role


class AccountManager(BaseUserManager):
    use_in_migrations = True

    def get_by_natural_key(self, username):
        # Emails are matched case-insensitively.
        return self.get(email__iexact=username)

    def create_user(self, email, password=None, **extra):
        """Low-level creation. Prefer apps.accounts.services.create_staff_account."""
        if not email:
            raise ValueError("An email address is required.")
        person = extra.pop("person", None) or Person.objects.create()
        account = self.model(email=self.normalize_email(email).lower(), person=person, **extra)
        account.set_password(password)
        account.save(using=self._db)
        return account

    def create_superuser(self, email, password=None, **extra):
        # Kept so `createsuperuser` works; it grants the Admin StaffRole.
        from .services import create_staff_account

        return create_staff_account(email=email, password=password, role=Role.ADMIN, actor=None)


class Account(AbstractBaseUser, BaseModel):
    person = models.ForeignKey(Person, on_delete=models.PROTECT, related_name="accounts")
    email = models.EmailField(max_length=254, unique=True)  # stored lower-cased in save()
    is_active = models.BooleanField(default=True)

    objects = AccountManager()

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS: list[str] = []

    class Meta:
        db_table = "accounts_account"
        constraints = [
            models.UniqueConstraint(Lower("email"), name="account_email_ci_unique"),
        ]

    def __str__(self) -> str:
        return self.email

    def save(self, *args, **kwargs):
        self.email = (self.email or "").strip().lower()
        super().save(*args, **kwargs)

    # ---- Platform Access, resolved from StaffRole only ----------------------
    def active_roles(self) -> frozenset[str]:
        if not hasattr(self, "_active_roles_cache"):
            self._active_roles_cache = frozenset(
                self.staff_roles.filter(ended_at__isnull=True).values_list("role", flat=True)
            )
        return self._active_roles_cache

    def clear_role_cache(self) -> None:
        self.__dict__.pop("_active_roles_cache", None)

    def has_role(self, role: str) -> bool:
        return role in self.active_roles()

    # ---- Django Admin integration ------------------------------------------
    # Django Admin asks for is_staff / has_perm. We answer from StaffRole, so
    # there is no separate is_staff / is_superuser flag that could drift.
    @property
    def is_staff(self) -> bool:
        return self.is_active and bool(self.active_roles())

    def has_perm(self, perm: str, obj=None) -> bool:
        if not self.is_active:
            return False
        app_label, _, codename = perm.partition(".")
        action = codename.split("_", 1)[0]
        for role in self.active_roles():
            scope = DJANGO_ADMIN_SCOPE.get(role)
            if scope == "*":
                return True
            if isinstance(scope, dict) and action in scope.get(app_label, set()):
                return True
        return False

    def has_perms(self, perm_list, obj=None) -> bool:
        return all(self.has_perm(p, obj) for p in perm_list)

    def has_module_perms(self, app_label: str) -> bool:
        if not self.is_active:
            return False
        for role in self.active_roles():
            scope = DJANGO_ADMIN_SCOPE.get(role)
            if scope == "*" or (isinstance(scope, dict) and app_label in scope):
                return True
        return False


class StaffRole(BaseModel):
    account = models.ForeignKey(Account, on_delete=models.PROTECT, related_name="staff_roles")
    role = models.CharField(max_length=32, choices=Role.choices)
    started_at = models.DateTimeField(default=timezone.now)
    ended_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "accounts_staffrole"
        constraints = [
            models.UniqueConstraint(
                fields=["account", "role"],
                condition=Q(ended_at__isnull=True),
                name="staffrole_one_active_per_account_role",
            ),
            models.CheckConstraint(
                condition=Q(ended_at__isnull=True) | Q(ended_at__gte=models.F("started_at")),
                name="staffrole_ended_after_started",
            ),
        ]
        indexes = [models.Index(fields=["account", "ended_at"])]

    def __str__(self) -> str:
        state = "active" if self.ended_at is None else "ended"
        return f"{self.account} · {self.role} ({state})"

    @property
    def is_active(self) -> bool:
        return self.ended_at is None
