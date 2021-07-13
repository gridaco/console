const withCSS = require('@zeit/next-css');
const withSASS = require('@zeit/next-sass');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const withTM = require('next-transpile-modules')(['@app/handoff'], {
  // resolveSymlinks: true,
  debug: true,
});

const typescriptLoader = {
  test: /\.ts(x?)$/,
  loader: ['ts-loader'],
  exclude: /node_modules/,
};

module.exports = withTM(
  withCSS(
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

        config.module.rules.map((rule) => {
          if (rule.test !== undefined && rule.test.source.includes('|svg|')) {
            rule.test = new RegExp(rule.test.source.replace('|svg|', '|'));
          }
        });
        config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        });

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
      env: {
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUKET: process.env.FIREBASE_STORAGE_BUKET,
        FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
      },
      async rewrites() {
        // reference: https://github.com/vercel/next.js/tree/canary/examples/with-zones
        const GLOBALIZATION_URL = 'https://globalization-editor-mz.bridged.xyz';

        return [
          {
            source: '/:path*',
            destination: `/:path*`,
          },
          {
            source: '/globalization',
            destination: `${GLOBALIZATION_URL}/globalization`,
          },
        ];
      },
    })
  )
);
