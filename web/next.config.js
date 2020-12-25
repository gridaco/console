const withCSS = require('@zeit/next-css');
const withSASS = require('@zeit/next-sass');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const typescriptLoader = {
  test: /\.ts(x?)$/,
  loader: ['ts-loader'],
  exclude: /node_modules/,
};

module.exports = withCSS(
  withSASS({
    webpack: (config) => {
      config.module.rules.push(typescriptLoader);
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      });
      config.plugins.push(
        new MonacoWebpackPlugin({
          // Add languages as needed...
          languages: ['javascript', 'typescript', 'dart'],
          filename: 'static/[name].worker.js',
        })
      );

      const jsLoaderRule = config.module.rules.find(
        (rule) => rule.test instanceof RegExp && rule.test.test('.js')
      );
      const linariaLoader = {
        loader: '@linaria/webpack-loader',
        options: {
          sourceMap: process.env.NODE_ENV !== 'production',
        },
      };
      if (Array.isArray(jsLoaderRule.use)) {
        jsLoaderRule.use.push(linariaLoader);
      } else {
        jsLoaderRule.use = [jsLoaderRule.use, linariaLoader];
      }
      return config;
    },
  })
);
