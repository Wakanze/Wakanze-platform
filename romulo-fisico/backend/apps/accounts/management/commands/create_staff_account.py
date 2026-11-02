import getpass

from django.core.exceptions import ValidationError
from django.core.management.base import BaseCommand, CommandError

from apps.accounts.roles import Role
from apps.accounts.services import create_staff_account


class Command(BaseCommand):
    help = "Create a staff Account (Person + Account + StaffRole), audited."

    def add_arguments(self, parser):
        parser.add_argument("--email", required=True)
        parser.add_argument("--role", choices=[r.value for r in Role], default=Role.EDITOR.value)
        parser.add_argument(
            "--password",
            help="Avoid in shell history; omit to be prompted. Also read from STAFF_PASSWORD.",
        )

    def handle(self, *args, email, role, password, **options):
        import os

        password = password or os.environ.get("STAFF_PASSWORD")
        if not password:
            password = getpass.getpass("Password: ")
            if password != getpass.getpass("Password (again): "):
                raise CommandError("Passwords do not match.")
        try:
            account = create_staff_account(email=email, password=password, role=role, actor=None)
        except (ValueError, ValidationError) as exc:
            raise CommandError(str(exc)) from exc
        self.stdout.write(self.style.SUCCESS(f"Created {account.email} with role '{role}'."))
