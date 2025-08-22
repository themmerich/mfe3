const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

  name: 'mfe3',

  exposes: {
    './web-comp': './src/bootstrap.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    '@primeng/themes/types': {
      transient: true,
      packageInfo: {
        entryPoint: 'node_modules/@primeng/themes/index.mjs',
        version: '19.1.4',
        esm: true
      }
    },
    '@primeng/themes/aura': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
      transient: true,
      includeSecondaries: false,
      build: 'separate'
    }
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ]

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0

});
