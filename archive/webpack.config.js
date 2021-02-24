const path = require('path');

module.exports = [
  {
    mode: process.env.NODE_ENV || 'development',
    watch: process.env.NODE_ENV === 'production' ? false : true,
    entry: './public/src/main.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'public/dist')
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.css$/i,
          use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
          ]
        }
      ]
    },
  }
]