const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fix for tslib destructure error
const ALIASES = {
  'tslib': require.resolve('tslib/tslib.es6.js'),
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  return context.resolveRequest(
    context,
    ALIASES[moduleName] || moduleName,
    platform
  );
};

// Alternative: Disable package exports if needed
// config.resolver.unstable_enablePackageExports = false;

module.exports = config;