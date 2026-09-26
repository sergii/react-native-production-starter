# Phase 1 Runtime Boundaries

## Environment identity

The starter recognizes exactly three build environments:

- `development`
- `staging`
- `production`

`APP_ENV` controls application identity at build/config-evaluation time. Each environment receives a distinct native application identifier and URL scheme so builds can coexist on one device.

The `com.example.*` identifiers are intentional starter placeholders. A product generated from this starter must replace the base identifier before store distribution.

## API configuration

`EXPO_PUBLIC_API_URL` is optional in the generic starter.

The network client fails explicitly when a request is attempted without an API base URL. The starter does not silently substitute staging or production endpoints.

## Release identity

The app config exposes non-secret release metadata:

- application environment;
- Git commit SHA via `GIT_SHA`;
- build/run identifier via `BUILD_ID`;
- native application version/build information supplied by Expo.

CI/build systems should set these values. Local development falls back to the literal value `local`.

## Native ownership

The repository uses Expo Continuous Native Generation / Prebuild.

`ios/` and `android/` are generated outputs, not durable sources of truth.

Persistent native configuration belongs in:

- `app.config.ts`;
- supported config plugins;
- local config plugins when necessary;
- Expo Modules when application-specific native code is justified.

## Credentials

Sensitive device credentials use `expo-secure-store`.

Ordinary application state, API cache, and user profile data must not be conflated with the credential store.

## Network

Screens do not call `fetch` with ad-hoc policy.

The shared HTTP boundary owns:

- base URL resolution;
- timeout behavior;
- JSON response handling;
- normalized HTTP errors.

Authentication headers, retry/idempotency, correlation identifiers, and offline policy are added only when a real product contract requires them.

## Observability

Sentry is the default crash-reporting provider for the executable starter.

Runtime reporting is disabled when no public DSN is configured.

Native/source-map release integration is activated when Sentry project metadata and the build secret `SENTRY_AUTH_TOKEN` are provided.

No Sentry auth token is exposed through Expo public configuration.
