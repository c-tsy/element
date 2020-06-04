  const TerserPlugin = require('terser-webpack-plugin')

  module.exports = {
      productionSourceMap: false,
      publicPath: './',
      configureWebpack: config => {
          let plugins = [
              new TerserPlugin({
                  terserOptions: {
                      compress: {
                          warnings: false,
                          drop_debugger: false,
                          drop_console: true,
                      },
                  },
                  sourceMap: false,
                  parallel: true,
              })
          ]
          if (process.env.NODE_ENV !== 'development') {
              config.plugins = [...config.plugins, ...plugins]
              config.externals = {
                  'element-ui': "Element",
                  //   vue: 'Vue',
                  'vue-router': 'VueRouter',
                  vuex: 'Vuex',
                  axios: 'axios',
                  'lodash': '_',
                  'moment': 'moment',
                  'vue-i18n': 'VueI18n',
              }
          }
      }
  }