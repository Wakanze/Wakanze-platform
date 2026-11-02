import pytest

from apps.identity.models import Person

pytestmark = pytest.mark.django_db


def test_person_carries_no_institutional_or_contact_fields():
    """ADR-011 / ADR-017: Person is a bare root entity in the MVP."""
    names = {f.name for f in Person._meta.get_fields() if f.concrete}
    assert names == {"id", "created_at", "updated_at"}
