"""
Staff authentication endpoints (Final Review §11):

    POST /api/v1/auth/login/
    POST /api/v1/auth/logout/
    GET  /api/v1/auth/me/

Django session auth with CSRF (ADR-013). GET /me/ always sets the CSRF cookie,
so the React client calls it first — even when logged out — to obtain a token.
"""

from django.contrib.auth import authenticate, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.audit import actions
from apps.audit.services import record

from .serializers import LoginSerializer, MeSerializer

INVALID_CREDENTIALS = "Invalid email or password."


@method_decorator(csrf_protect, name="dispatch")  # enforce CSRF even for anonymous login
class LoginView(APIView):
    permission_classes = [AllowAny]
    throttle_scope = "login"

    def get_throttles(self):
        from rest_framework.throttling import ScopedRateThrottle

        return [ScopedRateThrottle()]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        account = authenticate(
            request,
            username=serializer.validated_data["email"],
            password=serializer.validated_data["password"],
        )
        # An account without an active StaffRole has no Platform Access at all.
        # Bad credentials are audited by the user_login_failed signal (signals.py).
        if account is not None and not account.active_roles():
            record(
                actions.AUTH_LOGIN_FAILED,
                actor=account,
                target=account,
                metadata={"reason": "no_active_role"},
            )
        if account is None or not account.active_roles():
            # Return (don't raise): with ATOMIC_REQUESTS an exception would roll back the audit row.
            return Response(
                {"error": {"code": "invalid_credentials", "message": INVALID_CREDENTIALS, "details": {}}},
                status=status.HTTP_403_FORBIDDEN,
            )

        login(request, account)  # rotates the session key; audited via user_logged_in
        return Response(MeSerializer(account).data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    # Any logged-in account may log out, even if its role was just revoked.
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)  # audited via user_logged_out
        return Response(status=status.HTTP_204_NO_CONTENT)


@method_decorator(ensure_csrf_cookie, name="dispatch")
class MeView(APIView):
    def get(self, request):
        return Response(MeSerializer(request.user).data)
