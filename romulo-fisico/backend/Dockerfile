# Django application image (ADR-014: Docker without Kubernetes).
FROM python:3.12-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

RUN addgroup --system app && adduser --system --ingroup app app

# ---- development image (used by docker-compose) ----
FROM base AS dev
COPY requirements/ requirements/
RUN pip install -r requirements/dev.txt
COPY . .
USER app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# ---- production image ----
FROM base AS prod
COPY requirements/ requirements/
RUN pip install -r requirements/prod.txt
COPY . .
ENV DJANGO_SETTINGS_MODULE=config.settings.prod
# collectstatic needs no real secrets or database
RUN DJANGO_SECRET_KEY=build-only DATABASE_URL=sqlite:///tmp/build.db \
    python manage.py collectstatic --noinput
USER app
EXPOSE 8000
# Migrations are an explicit release step, never run on boot:
#   docker run ... python manage.py migrate
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3", "--access-logfile", "-"]
