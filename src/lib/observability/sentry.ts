import * as Sentry from '@sentry/react-native';

import { getRuntimeConfig } from '@/lib/runtime/config';

let initialized = false;

export function initObservability(): void {
  if (initialized) {
    return;
  }

  const runtime = getRuntimeConfig();
  const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;

  Sentry.init({
    dsn,
    enabled: Boolean(dsn),
    environment: runtime.environment,
    release: runtime.release.gitSha === 'local' ? undefined : runtime.release.gitSha,
    dist: runtime.release.buildId === 'local' ? undefined : runtime.release.buildId,
    tracesSampleRate: 0,
    sendDefaultPii: false,
  });

  initialized = true;
}

export { Sentry };
