const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: process.env.NODE_ENV || 'production',
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
    process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@lib': path.resolve(__dirname, 'src/lib')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.OIDC_AUTH": JSON.stringify(process.env.OIDC_AUTH), 
      "process.env.ETVAS_SUGGESTION": JSON.stringify(process.env.ETVAS_SUGGESTION)
    }), 
    
  ]
}
