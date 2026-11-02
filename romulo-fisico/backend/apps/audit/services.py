"""
The shared audit-writing service. Every app records mutating staff actions
through record(), never by creating AuditLog rows directly.
"""

import logging

from django.db import models

from .models import AuditLog

logger = logging.getLogger("wakanze.audit")


def record(
    action: str,
    *,
    actor=None,
    target: models.Model | None = None,
    target_type: str = "",
    target_id: str = "",
    metadata: dict | None = None,
) -> AuditLog:
    if target is not None:
        target_type = target_type or target._meta.label_lower
        target_id = target_id or str(target.pk)

    actor_account = actor if getattr(actor, "is_authenticated", False) else None
    entry = AuditLog.objects.create(
        actor_account=actor_account,
        action=action,
        target_type=target_type,
        target_id=str(target_id),
        metadata=metadata or {},
    )
    logger.info(
        "audit action=%s target=%s:%s actor=%s",
        action,
        target_type,
        target_id,
        actor_account.pk if actor_account else None,
    )
    return entry
