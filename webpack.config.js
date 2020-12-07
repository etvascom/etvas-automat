const path = require('path')
const webpack = require('webpack')

const getEnvVars = prefix => {
  const envVars = Object.keys(process.env).reduce((filtered, name) => {
    if (name.startsWith(prefix)) {
      filtered[`process.env.${name}`] = JSON.stringify(process.env[name])
    }
    return filtered
  }, {})

  if (process.env.NODE_ENV) {
    envVars['process.env.NODE_ENV'] = JSON.stringify(process.env.NODE_ENV)
  }

  return envVars
}

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename:
      process.env.NODE_ENV === 'development'
        ? 'etvas-automat.js'
        : 'etvas-automat.min.js',
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
  devtool: 'source-map',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  plugins: [new webpack.DefinePlugin(getEnvVars('ETVAS_'))]
}
