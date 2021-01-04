const x = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '' : '',
  outputDir: x.resolve(__dirname, 'build'),
  assetsDir: 'static',
  transpileDependencies: ['vuetify'],
  lintOnSave: true,
  devServer: {
    proxy: {
      '^/': {
        target: 'http://localhost:8000/',
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  }
};
