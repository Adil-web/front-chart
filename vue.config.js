module.exports = {
  publicPath: '/',
  outputDir:'/var/www/ias-front/',
  assetsDir: undefined,
  runtimeCompiler: true,
  productionSourceMap: undefined,
  parallel: undefined,
  css: {
    extract: false
  },
  lintOnSave:true,
  devServer: {
    // contentBase: path.join(__dirname, 'public'),
    compress: true,
    open: true,
    //port: 8080
    // ,
    //
    // proxy: {
    //     '/api/v1': {
    //         target: 'http://localhost:10000',
    //         ws: true,
    //         changeOrigin: true,
    //     },
    // }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}

