import type { ConfigContext, ExpoConfig } from 'expo/config';

type AppEnvironment = 'development' | 'staging' | 'production';

const ENVIRONMENTS: Record<
  AppEnvironment,
  {
    name: string;
    bundleIdentifier: string;
    packageName: string;
    scheme: string;
  }
> = {
  development: {
    name: 'RN Production Starter Dev',
    bundleIdentifier: 'com.example.rnproductionstarter.dev',
    packageName: 'com.example.rnproductionstarter.dev',
    scheme: 'rnprodstarter-dev',
  },
  staging: {
    name: 'RN Production Starter Staging',
    bundleIdentifier: 'com.example.rnproductionstarter.staging',
    packageName: 'com.example.rnproductionstarter.staging',
    scheme: 'rnprodstarter-staging',
  },
  production: {
    name: 'RN Production Starter',
    bundleIdentifier: 'com.example.rnproductionstarter',
    packageName: 'com.example.rnproductionstarter',
    scheme: 'rnprodstarter',
  },
};

function readEnvironment(): AppEnvironment {
  const value = process.env.APP_ENV ?? 'development';

  if (value === 'development' || value === 'staging' || value === 'production') {
    return value;
  }

  throw new Error(
    `Invalid APP_ENV "${value}". Expected development, staging, or production.`,
  );
}

function readVersionCode(): number {
  const value = Number.parseInt(process.env.ANDROID_VERSION_CODE ?? '1', 10);

  if (!Number.isInteger(value) || value < 1) {
    throw new Error('ANDROID_VERSION_CODE must be a positive integer.');
  }

  return value;
}

export default ({ config }: ConfigContext): ExpoConfig => {
  const environment = readEnvironment();
  const environmentConfig = ENVIRONMENTS[environment];
  const sentryOrganization = process.env.SENTRY_ORG;
  const sentryProject = process.env.SENTRY_PROJECT;

  const plugins: NonNullable<ExpoConfig['plugins']> = [
    'expo-router',
    'expo-secure-store',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#208AEF',
        image: './assets/images/splash-icon.png',
        imageWidth: 76,
      },
    ],
  ];

  if (sentryOrganization && sentryProject) {
    plugins.push([
      '@sentry/react-native/expo',
      {
        organization: sentryOrganization,
        project: sentryProject,
        url: process.env.SENTRY_URL ?? 'https://sentry.io/',
      },
    ]);
  }

  return {
    ...config,
    name: environmentConfig.name,
    slug: 'react-native-production-starter',
    version: process.env.APP_VERSION ?? '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: environmentConfig.scheme,
    userInterfaceStyle: 'automatic',
    ios: {
      ...config.ios,
      bundleIdentifier: environmentConfig.bundleIdentifier,
      buildNumber: process.env.IOS_BUILD_NUMBER ?? '1',
      icon: './assets/expo.icon',
    },
    android: {
      ...config.android,
      package: environmentConfig.packageName,
      versionCode: readVersionCode(),
      predictiveBackGestureEnabled: false,
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/images/android-icon-foreground.png',
        backgroundImage: './assets/images/android-icon-background.png',
        monochromeImage: './assets/images/android-icon-monochrome.png',
      },
    },
    web: {
      ...config.web,
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins,
    experiments: {
      ...config.experiments,
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      ...config.extra,
      appEnvironment: environment,
      apiBaseUrl: process.env.EXPO_PUBLIC_API_URL ?? '',
      release: {
        gitSha: process.env.GIT_SHA ?? 'local',
        buildId: process.env.BUILD_ID ?? 'local',
      },
    },
  };
};
