import * as path from 'path'
import fs from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'none',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public/scripts'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: [/node_modules/, /\.test\.js$/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: [/node_modules/],
      },
    ],
  },
  devServer: {
    https: true,
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost.pem'),
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/scripts/',
  },
  devtool: 'source-map',
}
