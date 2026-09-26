# React Native Production Starter

Executable React Native / Expo golden path for production-safe mobile projects.

## Status

Phase 1 - **in progress**

The repository was generated from the dated compatibility snapshot `expo57-2026-09-26`.

Shared policy is frozen in:

- Mobile Engineering Playbook: `v0.5.0`
- release-content revision: `3deecbbf63d0f116dbdf7ff1fd904d5799e425e1`

The stack snapshot is still **candidate**, not verified. It is promoted only after its proof matrix passes.

## Pinned baseline

- Node 24.21.x
- npm 11.19.0
- Expo SDK 57
- React Native 0.86.3
- React 19.2.3
- Expo Router
- CNG / Prebuild native ownership
- development builds for native verification

The committed lockfile is the exact dependency graph for this implementation.

## Commands

```bash
npm ci
npm start
npm run start:dev

npm run lint
npm run typecheck
npm run test:ci
npm run verify:environments
npm run check:compat
npm run check:fast

npx --yes expo-doctor@1.20.4
```

## Environment identity

Set `APP_ENV` to one of:

```text
development
staging
production
```

Every environment has a distinct bundle identifier, Android package, app name, and URL scheme.

The `com.example.*` identifiers are deliberate starter placeholders. A generated product must replace them before distribution.

Optional runtime configuration:

```text
EXPO_PUBLIC_API_URL
EXPO_PUBLIC_SENTRY_DSN
GIT_SHA
BUILD_ID
APP_VERSION
IOS_BUILD_NUMBER
ANDROID_VERSION_CODE
```

Sentry build/source-map integration additionally uses non-public build secrets/configuration such as `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, and `SENTRY_PROJECT`.

## Current Phase 1 boundaries

Implemented or being proven:

- strict TypeScript;
- deterministic dev/staging/production identity;
- release/build metadata;
- Expo Router navigation and deep-link scheme;
- secure credential boundary via `expo-secure-store`;
- centralized HTTP boundary;
- Sentry crash-reporting/Metro source-map integration;
- support-safe diagnostics screen;
- Jest + `jest-expo`;
- React Native Testing Library;
- pinned GitHub Actions fast gate;
- Expo compatibility checks.

Still required before Phase 1 is complete:

- green CI evidence;
- iOS simulator build/launch;
- Android emulator build/launch;
- proof records tied to the snapshot and commit.

Real-device and distribution proof belongs to snapshot verification / later release-safety steps.

## Testing model

```text
Jest + jest-expo
        ↓
React Native Testing Library
        ↓
Maestro deterministic E2E
        ↓
agent-device exploratory verification/evidence
        ↓
XcodeBuildMCP when deep iOS-native debugging is needed
```

Agents discover and verify. Deterministic tests protect. Evidence proves.

## Native ownership

This project is CNG / Prebuild owned.

Do not commit manual persistent changes directly into generated `ios/` or `android/` projects. Durable native configuration belongs in `app.config.ts`, config plugins, or an explicit Expo module.

## Related documentation

- `docs/architecture/runtime-boundaries.md`
- `docs/release/sentry.md`
- root `AGENTS.md`
