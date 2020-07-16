const path = require('path')
module.exports = {
  assetsDir: 'assets',
  parallel: false,
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        components: path.resolve(__dirname, './src/components'),
        assets: path.resolve(__dirname, './src/assets'),
        views: path.resolve(__dirname, './src/views'),
        network: path.resolve(__dirname, '@/network'),
        common: path.resolve(__dirname, '@/common')
      }
    }
  }
}
