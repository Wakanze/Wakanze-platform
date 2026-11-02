"""
Shared abstract base models.

Every table uses a UUID primary key and created_at / updated_at timestamps
(Digital Platform Architecture §10). Concrete models combine these mixins.
"""

import uuid

from django.db import models


class UUIDPKModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    class Meta:
        abstract = True


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class BaseModel(UUIDPKModel, TimeStampedModel):
    """UUID PK + timestamps: the default base for every Wakanze table."""

    class Meta:
        abstract = True
