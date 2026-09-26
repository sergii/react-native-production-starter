import { Stack } from 'expo-router';

import { initObservability, Sentry } from '@/lib/observability/sentry';

initObservability();

export { ErrorBoundary } from 'expo-router';

function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Production Starter' }} />
      <Stack.Screen name="debug" options={{ title: 'Diagnostics' }} />
    </Stack>
  );
}

export default Sentry.wrap(RootLayout);
