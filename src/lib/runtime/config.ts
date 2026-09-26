import Constants from 'expo-constants';

export type AppEnvironment = 'development' | 'staging' | 'production';

export type RuntimeConfig = {
  environment: AppEnvironment;
  apiBaseUrl: string;
  release: {
    gitSha: string;
    buildId: string;
  };
};

type ExtraConfig = {
  appEnvironment?: unknown;
  apiBaseUrl?: unknown;
  release?: {
    gitSha?: unknown;
    buildId?: unknown;
  };
};

function asString(value: unknown, fallback: string): string {
  return typeof value === 'string' ? value : fallback;
}

function asEnvironment(value: unknown): AppEnvironment {
  if (value === 'development' || value === 'staging' || value === 'production') {
    return value;
  }

  return 'development';
}

export function getRuntimeConfig(): RuntimeConfig {
  const extra = (Constants.expoConfig?.extra ?? {}) as ExtraConfig;

  return {
    environment: asEnvironment(extra.appEnvironment),
    apiBaseUrl: asString(extra.apiBaseUrl, ''),
    release: {
      gitSha: asString(extra.release?.gitSha, 'local'),
      buildId: asString(extra.release?.buildId, 'local'),
    },
  };
}
