const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
};

const path = require('path');
const fs = require('fs');

const rnRoot = path.join(__dirname, 'node_modules', 'react-native');
const rnPolyfills = path.join(rnRoot, 'rn-get-polyfills.js');
if (!fs.existsSync(rnPolyfills)) {
  fs.writeFileSync(rnPolyfills, "module.exports = () => [];\n");
}
const rnPkgPath = path.join(rnRoot, 'package.json');
const rnPkg = JSON.parse(fs.readFileSync(rnPkgPath, 'utf8'));
if (rnPkg.exports && !rnPkg.exports['./rn-get-polyfills']) {
  rnPkg.exports['./rn-get-polyfills'] = './rn-get-polyfills.js';
  fs.writeFileSync(rnPkgPath, JSON.stringify(rnPkg, null, 2) + '\n');
}

module.exports = config;
