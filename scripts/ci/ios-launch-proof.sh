#!/usr/bin/env bash
set -euo pipefail

export APP_ENV=development

UDID="$(
  xcrun simctl list devices available -j | python3 -c '
import json
import re
import sys

data = json.load(sys.stdin)
candidates = []

for runtime, devices in data.get("devices", {}).items():
    match = re.search(r"iOS-(\d+)(?:-(\d+))?(?:-(\d+))?$", runtime)
    if not match:
        continue

    version = tuple(int(part or 0) for part in match.groups())

    for device in devices:
        if device.get("isAvailable") and device.get("name", "").startswith("iPhone"):
            candidates.append((version, device["udid"], device["name"], runtime))

if not candidates:
    raise SystemExit("No available iPhone simulator found")

candidates.sort(reverse=True)
_, udid, name, runtime = candidates[0]
print(udid)
print(f"Selected simulator: {name} ({runtime})", file=sys.stderr)
'
)"

echo "Selected simulator UDID: $UDID"

xcrun simctl boot "$UDID" 2>/dev/null || true
xcrun simctl bootstatus "$UDID" -b

npx expo run:ios   --configuration Release   --device "$UDID"   --no-bundler

BUNDLE_ID="com.example.rnproductionstarter.dev"

xcrun simctl get_app_container "$UDID" "$BUNDLE_ID" app >/dev/null

LAUNCH_OUTPUT="$(xcrun simctl launch "$UDID" "$BUNDLE_ID")"
echo "$LAUNCH_OUTPUT"

PID="$(printf '%s\n' "$LAUNCH_OUTPUT" | awk -F': ' 'NF > 1 { print $2 }' | tail -n 1)"
if [[ -z "$PID" ]]; then
  echo "Could not determine simulator process id" >&2
  exit 1
fi

sleep 8

if ! kill -0 "$PID" 2>/dev/null; then
  echo "iOS application process exited after launch" >&2
  exit 1
fi

mkdir -p artifacts
xcrun simctl io "$UDID" screenshot artifacts/ios-launch.png

echo "iOS runtime launch proof passed for PID $PID"
