const path = require('path');
const {directories} = require("./automatisation/config");

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/js/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js',
  },
};