const path = require('path');

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public/scripts')
  },
  module: {
    rules: [{
      test: /\.mjs$|\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      exclude: [
        /node_modules/
      ]
    }]
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/scripts/'
  }
};