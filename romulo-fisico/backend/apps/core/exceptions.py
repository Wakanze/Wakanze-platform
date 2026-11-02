"""
Uniform API error format (Readiness Report §6):

    {"error": {"code": "...", "message": "...", "details": {...}}}
"""

from rest_framework import exceptions
from rest_framework.views import exception_handler


def api_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is None:
        return None  # unhandled -> Django's 500 handling and error monitoring

    if isinstance(exc, exceptions.ValidationError):
        code = "validation_error"
        message = "Invalid input."
        details = response.data
    else:
        detail = getattr(exc, "detail", None)
        code = getattr(detail, "code", None) or getattr(exc, "default_code", "error")
        message = str(detail) if detail is not None else str(exc)
        details = {}

    response.data = {"error": {"code": code, "message": message, "details": details}}
    return response
