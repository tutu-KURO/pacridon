const path = require('path');

module.exports = {
  entry: "./frontend/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','es2015']
          }
        }
      }
    ]
  }
};