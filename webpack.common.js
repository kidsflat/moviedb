const path = require('path');

module.exports = {
  entry: {
    polyfill: 'ts-polyfill/dist/ts-polyfill.js',
    index: './source/index.tsx'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      'apiLib': path.resolve(__dirname, 'source/apiLib/'),
      'App': path.resolve(__dirname, 'source/App'),
      'common-components': path.resolve(__dirname, 'source/common-components/'),
      'common-helper-functions': path.resolve(__dirname, 'source/common-helper-functions/'),
      'contexts': path.resolve(__dirname, 'source/contexts/'),
      'pages': path.resolve(__dirname, 'source/pages/'),
      'stores': path.resolve(__dirname, 'source/stores/'),
    }
  }
};