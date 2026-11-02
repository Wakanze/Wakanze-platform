"""
Person — the root entity.

Person deliberately carries no email, no membership, no stage, no role and no
"user type" (ADR-011, Domain Map §3). Lead, Interest and Account each point at a
Person. When Membership is designed (Roadmap M6) it attaches to this same row.

Identity resolution for the MVP (one Person per known email) lives in the
service layer, keyed on Lead.email — see ADR-017. It is an MVP technical /
data-quality constraint, NOT a Wakanze institutional identity principle.
"""

from apps.core.models import BaseModel


class Person(BaseModel):
    class Meta:
        db_table = "identity_person"
        verbose_name = "person"
        verbose_name_plural = "people"

    def __str__(self) -> str:
        return f"Person {self.id}"
