import Constants from 'expo-constants';

import { getRuntimeConfig } from './config';

export type BuildInfoItem = {
  label: string;
  value: string;
};

function formatScheme(): string {
  const scheme = Constants.expoConfig?.scheme;

  if (Array.isArray(scheme)) {
    return scheme.join(', ');
  }

  return typeof scheme === 'string' ? scheme : 'unknown';
}

export function getBuildInfo(): BuildInfoItem[] {
  const runtime = getRuntimeConfig();

  return [
    { label: 'Environment', value: runtime.environment },
    { label: 'App version', value: Constants.expoConfig?.version ?? 'unknown' },
    { label: 'Native build', value: Constants.nativeBuildVersion ?? 'unknown' },
    { label: 'Git SHA', value: runtime.release.gitSha },
    { label: 'Build ID', value: runtime.release.buildId },
    { label: 'Scheme', value: formatScheme() },
    { label: 'API configured', value: runtime.apiBaseUrl ? 'yes' : 'no' },
  ];
}
