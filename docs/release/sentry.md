# Sentry release integration

Sentry is the default crash-reporting provider for the executable starter.

## Runtime

`EXPO_PUBLIC_SENTRY_DSN` enables runtime reporting.

If it is absent, Sentry remains initialized in disabled mode so local development does not require an account.

Do not put `SENTRY_AUTH_TOKEN` in public Expo configuration.

## Native / build configuration

When both `SENTRY_ORG` and `SENTRY_PROJECT` are available while Expo config is evaluated, `app.config.ts` enables the `@sentry/react-native/expo` config plugin.

The build environment must provide `SENTRY_AUTH_TOKEN` as a secret for authenticated source-map/release operations.

## Metro

`metro.config.js` uses `getSentryExpoConfig` from `@sentry/react-native/metro`, which makes the bundle/source-map pipeline Sentry-aware.

## Verification before production-ready status

The integration is not considered proven until a production-like build:

1. receives an intentional test exception;
2. creates the event in the configured Sentry project;
3. resolves the event to the expected release identity;
4. displays a symbolicated stack trace from uploaded source maps.

That proof is recorded later in the release evidence. Package installation and configuration alone are not proof.
