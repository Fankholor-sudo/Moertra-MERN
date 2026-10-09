const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
};

// RN 0.87 removed rn-get-polyfills.js but Expo SDK 57 metro-config still requires it.
// Provide a stub so the bundler doesn't crash.
const path = require('path');
const fs = require('fs');
const rnPath = path.join(__dirname, 'node_modules', 'react-native', 'rn-get-polyfills.js');
if (!fs.existsSync(rnPath)) {
  fs.writeFileSync(rnPath, "module.exports = () => [];\n");
}

module.exports = config;
