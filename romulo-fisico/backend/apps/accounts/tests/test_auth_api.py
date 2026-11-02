import pytest

from apps.accounts.roles import Role
from apps.accounts.services import revoke_role
from apps.audit import actions
from apps.audit.models import AuditLog

pytestmark = pytest.mark.django_db

LOGIN = "/api/v1/auth/login/"
LOGOUT = "/api/v1/auth/logout/"
ME = "/api/v1/auth/me/"


def _csrf_login(client, email, password):
    client.get(ME)  # sets the csrftoken cookie even when anonymous
    token = client.cookies["csrftoken"].value
    return client.post(LOGIN, {"email": email, "password": password}, format="json", HTTP_X_CSRFTOKEN=token)


def test_me_requires_auth_but_sets_csrf_cookie(api_client):
    response = api_client.get(ME)
    assert response.status_code == 403
    assert "csrftoken" in response.cookies
    assert response.json()["error"]["code"] == "not_authenticated"


def test_login_me_logout_flow(csrf_client, admin_account, password):
    response = _csrf_login(csrf_client, "ADMIN@wakanze.test", password)
    assert response.status_code == 200
    assert response.json() == {"id": str(admin_account.pk), "email": "admin@wakanze.test", "roles": ["admin"]}

    assert csrf_client.get(ME).status_code == 200

    token = csrf_client.cookies["csrftoken"].value
    assert csrf_client.post(LOGOUT, HTTP_X_CSRFTOKEN=token).status_code == 204
    assert csrf_client.get(ME).status_code == 403

    logged = list(AuditLog.objects.values_list("action", flat=True))
    assert actions.AUTH_LOGIN in logged and actions.AUTH_LOGOUT in logged


def test_login_without_csrf_token_is_rejected(csrf_client, admin_account, password):
    response = csrf_client.post(LOGIN, {"email": "admin@wakanze.test", "password": password}, format="json")
    assert response.status_code == 403


def test_wrong_password_gives_generic_error(csrf_client, admin_account):
    response = _csrf_login(csrf_client, "admin@wakanze.test", "wrong-password-123")
    assert response.status_code == 403
    body = response.json()["error"]
    assert body["code"] == "invalid_credentials"
    assert body["message"] == "Invalid email or password."
    assert AuditLog.objects.filter(action=actions.AUTH_LOGIN_FAILED).exists()


def test_account_without_active_role_cannot_log_in(csrf_client, editor_account, password):
    revoke_role(editor_account, Role.EDITOR)
    response = _csrf_login(csrf_client, "editor@wakanze.test", password)
    assert response.status_code == 403
    assert response.json()["error"]["code"] == "invalid_credentials"


def test_revoking_role_cuts_access_immediately(csrf_client, editor_account, password):
    assert _csrf_login(csrf_client, "editor@wakanze.test", password).status_code == 200
    revoke_role(editor_account, Role.EDITOR)
    assert csrf_client.get(ME).status_code == 403


def test_validation_error_format(csrf_client):
    csrf_client.get(ME)
    token = csrf_client.cookies["csrftoken"].value
    response = csrf_client.post(LOGIN, {"email": "not-an-email"}, format="json", HTTP_X_CSRFTOKEN=token)
    assert response.status_code == 400
    error = response.json()["error"]
    assert error["code"] == "validation_error"
    assert set(error["details"]) == {"email", "password"}


def test_login_events_are_audited_exactly_once(csrf_client, admin_account, password):
    _csrf_login(csrf_client, "admin@wakanze.test", "wrong-password-123")
    _csrf_login(csrf_client, "admin@wakanze.test", password)
    counts = {
        a: AuditLog.objects.filter(action=a).count() for a in (actions.AUTH_LOGIN_FAILED, actions.AUTH_LOGIN)
    }
    assert counts == {actions.AUTH_LOGIN_FAILED: 1, actions.AUTH_LOGIN: 1}
    failed = AuditLog.objects.get(action=actions.AUTH_LOGIN_FAILED)
    assert "admin@wakanze.test" not in str(failed.metadata)


def test_django_admin_login_is_audited(client, admin_account, password):
    client.post("/admin/login/", {"username": "admin@wakanze.test", "password": password})
    assert AuditLog.objects.filter(action=actions.AUTH_LOGIN, actor_account=admin_account).exists()
    assert client.get("/admin/").status_code == 200


def test_no_role_login_is_audited_with_reason(csrf_client, editor_account, password):
    revoke_role(editor_account, Role.EDITOR)
    _csrf_login(csrf_client, "editor@wakanze.test", password)
    entry = AuditLog.objects.get(action=actions.AUTH_LOGIN_FAILED)
    assert entry.metadata == {"reason": "no_active_role"}
