const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'https://4f2a-74-75-181-125.ngrok.io',
  },
})
