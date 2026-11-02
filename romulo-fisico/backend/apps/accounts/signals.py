"""
Audit every sign-in path (API and Django Admin) via Django's auth signals.
"""

from django.contrib.auth.signals import user_logged_in, user_logged_out, user_login_failed
from django.dispatch import receiver

from apps.audit import actions
from apps.audit.services import record


@receiver(user_logged_in)
def audit_login(sender, request, user, **kwargs):
    record(actions.AUTH_LOGIN, actor=user, target=user)


@receiver(user_logged_out)
def audit_logout(sender, request, user, **kwargs):
    if user is not None:
        record(actions.AUTH_LOGOUT, actor=user, target=user)


@receiver(user_login_failed)
def audit_login_failed(sender, credentials, request=None, **kwargs):
    # No email or password is stored — only that a failure happened.
    record(actions.AUTH_LOGIN_FAILED, metadata={"reason": "invalid_credentials"})
