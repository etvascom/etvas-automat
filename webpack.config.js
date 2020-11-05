const path = require('path')

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
  }
}
