const path = require('path');

module.exports = {
  entry: './src/pages/index/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/pages/index'),
  },
};
