#!/usr/bin/env bash
set -euo pipefail

export APP_ENV=development

npx expo prebuild --clean --platform android --no-install

(
  cd android
  ./gradlew :app:assembleRelease --no-daemon --stacktrace
)

APK="android/app/build/outputs/apk/release/app-release.apk"
PACKAGE="com.example.rnproductionstarter.dev"

if [[ ! -f "$APK" ]]; then
  echo "Release APK not found at $APK" >&2
  exit 1
fi

adb install -r "$APK"
adb shell am force-stop "$PACKAGE"
adb shell monkey -p "$PACKAGE" -c android.intent.category.LAUNCHER 1

sleep 10

PID="$(adb shell pidof "$PACKAGE" | tr -d '\r')"
if [[ -z "$PID" ]]; then
  echo "Android application process is not running" >&2
  adb logcat -d -t 300
  exit 1
fi

mkdir -p artifacts
adb exec-out screencap -p > artifacts/android-launch.png

adb shell uiautomator dump /sdcard/window.xml >/dev/null 2>&1 || true
adb pull /sdcard/window.xml artifacts/android-window.xml >/dev/null 2>&1 || true

if [[ -f artifacts/android-window.xml ]]; then
  if ! grep -q "Production Starter" artifacts/android-window.xml; then
    echo "Expected Production Starter UI marker was not found" >&2
    cat artifacts/android-window.xml
    exit 1
  fi
fi

echo "Android runtime launch proof passed for PID $PID"
