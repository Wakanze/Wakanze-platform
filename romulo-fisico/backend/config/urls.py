from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    # Django Admin is the operational back-office for the MVP (ADR-006).
    path("admin/", admin.site.urls),
    path("api/v1/auth/", include("apps.accounts.urls")),
]
