/**
 * One thin typed client over fetch (Readiness Report §4).
 *
 * - Same-origin session cookies (ADR-013): no tokens are stored in the browser.
 * - Unsafe methods send the Django CSRF token from the `csrftoken` cookie.
 * - Errors arrive as {error: {code, message, details}} and are raised as ApiError.
 *
 * The client never enforces security; the server does. It only reflects it.
 */
import { readCookie } from '../lib/cookies.ts'

export const API_BASE = '/api/v1'

export class ApiError extends Error {
  readonly status: number
  readonly code: string
  readonly details: Record<string, unknown>

  constructor(status: number, code: string, message: string, details: Record<string, unknown> = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

type ErrorEnvelope = {
  error?: { code?: string; message?: string; details?: Record<string, unknown> }
}

const UNSAFE = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const method = (init.method ?? 'GET').toUpperCase()
  const headers = new Headers(init.headers)
  headers.set('Accept', 'application/json')
  if (init.body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (UNSAFE.has(method)) {
    const token = readCookie('csrftoken')
    if (token) headers.set('X-CSRFToken', token)
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    method,
    headers,
    credentials: 'same-origin',
  })

  if (response.status === 204) return undefined as T

  const body: unknown = await response.json().catch(() => null)
  if (!response.ok) {
    const err = (body as ErrorEnvelope | null)?.error
    throw new ApiError(
      response.status,
      err?.code ?? 'http_error',
      err?.message ?? response.statusText,
      err?.details ?? {},
    )
  }
  return body as T
}

export const api = {
  get: <T>(path: string) => apiFetch<T>(path),
  post: <T>(path: string, data?: unknown) =>
    apiFetch<T>(path, { method: 'POST', body: data === undefined ? undefined : JSON.stringify(data) }),
  patch: <T>(path: string, data: unknown) =>
    apiFetch<T>(path, { method: 'PATCH', body: JSON.stringify(data) }),
}
