const withCSS = require('@zeit/next-css');
const withTM = require('next-transpile-modules')(['@app/handoff'], {
  debug: true,
});

const typescriptLoader = {
  test: /\.ts(x?)$/,
  loader: ['ts-loader'],
  exclude: /node_modules/,
};

module.exports = withTM(
  withCSS({
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
);
