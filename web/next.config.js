// const withPlugins = require("next-compose-plugins");
const withLinaria = require("next-linaria");
const withTM = require("next-transpile-modules")(
  [
    //
    "@app/handoff",
    "@app/assets",
  ],
  {
    debug: true,
  }
);

/**
 * @type {import('next').NextConfig}
 */
const config = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
        },
      },
    });
    config.module.rules.map((rule) => {
      if (rule.test !== undefined && rule.test.source.includes("|svg|")) {
        rule.test = new RegExp(rule.test.source.replace("|svg|", "|"));
      }
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  // async rewrites() {
  //   // reference: https://github.com/vercel/next.js/tree/canary/examples/with-zones
  //   const GLOBALIZATION_URL = 'https://globalization-editor-mz.bridged.xyz';

  //   return [
  //     {
  //       source: '/:path*',
  //       destination: `/:path*`,
  //     },
  //     {
  //       source: '/globalization',
  //       destination: `${GLOBALIZATION_URL}/globalization`,
  //     },
  //   ];
  // },
};

module.exports = withTM(withLinaria(config));
