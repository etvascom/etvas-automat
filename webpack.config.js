const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: process.env.BUILD_TYPE || 'production',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'etvas-automat.js',
    libraryTarget: 'umd',
    library: 'etvasAutomat',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  },
  devtool:
    process.env.BUILD_TYPE === 'production'
      ? 'source-map'
      : 'inline-source-map',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ETVAS_BASE_URL': JSON.stringify(process.env.ETVAS_BASE_URL),
      'process.env.ETVAS_GRAPHQL_URL': JSON.stringify(
        process.env.ETVAS_GRAPHQL_URL
      )
    })
  ]
}
