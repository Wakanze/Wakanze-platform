import { afterEach, describe, expect, it, vi } from 'vitest'
import { ApiError, apiFetch } from './client.ts'

function mockFetch(status: number, body: unknown) {
  const fn = vi.fn().mockResolvedValue(
    new Response(body === undefined ? null : JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    }),
  )
  vi.stubGlobal('fetch', fn)
  return fn
}

describe('apiFetch', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    document.cookie = 'csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  })

  it('sends the CSRF token on unsafe methods only', async () => {
    document.cookie = 'csrftoken=abc123'
    const fetchMock = mockFetch(200, { ok: true })

    await apiFetch('/x/', { method: 'POST', body: '{}' })
    expect(new Headers(fetchMock.mock.calls[0]![1].headers).get('X-CSRFToken')).toBe('abc123')

    await apiFetch('/x/')
    expect(new Headers(fetchMock.mock.calls[1]![1].headers).get('X-CSRFToken')).toBeNull()
    expect(fetchMock.mock.calls[1]![0]).toBe('/api/v1/x/')
  })

  it('raises ApiError with the server error envelope', async () => {
    mockFetch(403, {
      error: { code: 'invalid_credentials', message: 'Invalid email or password.', details: {} },
    })
    await expect(apiFetch('/auth/login/', { method: 'POST' })).rejects.toMatchObject({
      status: 403,
      code: 'invalid_credentials',
    })
  })

  it('returns undefined for 204', async () => {
    mockFetch(204, undefined)
    await expect(apiFetch('/auth/logout/', { method: 'POST' })).resolves.toBeUndefined()
  })

  it('is an Error subclass', () => {
    expect(new ApiError(500, 'x', 'y')).toBeInstanceOf(Error)
  })
})
