const path = require('path');

module.exports = {
  entry: {
    content: './src/content.ts',
    background: './src/background.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map',  // Useful for debugging
  mode: 'development',    // Change to 'production' for minification
};