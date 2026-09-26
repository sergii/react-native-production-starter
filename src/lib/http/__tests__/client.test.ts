import { resolveRequestUrl } from '@/lib/http/client';

describe('resolveRequestUrl', () => {
  it('joins a base URL and relative path', () => {
    expect(resolveRequestUrl('https://api.example.com', '/v1/items')).toBe(
      'https://api.example.com/v1/items',
    );
  });

  it('refuses to guess an API environment', () => {
    expect(() => resolveRequestUrl('', '/v1/items')).toThrow(
      'EXPO_PUBLIC_API_URL is not configured',
    );
  });
});
