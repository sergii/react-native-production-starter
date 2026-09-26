import { getRuntimeConfig } from '@/lib/runtime/config';

const DEFAULT_TIMEOUT_MS = 10_000;

export class HttpError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body: unknown,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export function resolveRequestUrl(baseUrl: string, path: string): string {
  if (!baseUrl) {
    throw new Error(
      'EXPO_PUBLIC_API_URL is not configured. The starter never guesses an API environment.',
    );
  }

  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  return new URL(normalizedPath, normalizedBase).toString();
}

async function readResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return undefined;
  }

  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

export async function requestJson<T>(
  path: string,
  init: RequestInit = {},
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<T> {
  const { apiBaseUrl } = getRuntimeConfig();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const headers = new Headers(init.headers);

  if (!headers.has('accept')) {
    headers.set('accept', 'application/json');
  }

  try {
    const response = await fetch(resolveRequestUrl(apiBaseUrl, path), {
      ...init,
      headers,
      signal: controller.signal,
    });
    const body = await readResponseBody(response);

    if (!response.ok) {
      throw new HttpError(
        `HTTP ${response.status} ${response.statusText}`,
        response.status,
        body,
      );
    }

    return body as T;
  } finally {
    clearTimeout(timeout);
  }
}
