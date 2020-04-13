const merge = require('webpack-merge');
const path = require('path');

module.exports = ({ webpackConfig, target }) => {
  return merge(webpackConfig, {
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx|css|scss)$/,
          loader: 'prettier-loader',
          exclude: /node_modules/
        }
      ]
    }
  });
};
