import { execFileSync } from 'node:child_process';

const environments = ['development', 'staging', 'production'];

function readConfig(environment) {
  const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const output = execFileSync(
    npx,
    ['expo', 'config', '--type', 'public', '--json'],
    {
      encoding: 'utf8',
      env: {
        ...process.env,
        APP_ENV: environment,
      },
    },
  );

  return JSON.parse(output);
}

const configs = environments.map((environment) => ({
  environment,
  config: readConfig(environment),
}));

const identities = configs.map(({ environment, config }) => ({
  environment,
  ios: config.ios?.bundleIdentifier,
  android: config.android?.package,
  scheme: config.scheme,
}));

for (const identity of identities) {
  if (!identity.ios || !identity.android || !identity.scheme) {
    throw new Error(
      `Missing native identity for ${identity.environment}: ${JSON.stringify(identity)}`,
    );
  }
}

for (const field of ['ios', 'android', 'scheme']) {
  const values = new Set(identities.map((identity) => identity[field]));

  if (values.size !== environments.length) {
    throw new Error(
      `Expected unique ${field} identity for every environment: ${JSON.stringify(identities)}`,
    );
  }
}

console.log(JSON.stringify(identities, null, 2));
