const withCSS = require('@zeit/next-css')
const withSASS = require('@zeit/next-sass')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = withCSS(withSASS({
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                },
            },
        })

        config.plugins.push(
            new MonacoWebpackPlugin({
                // Add languages as needed...
                languages: ['javascript', 'typescript', 'dart'],
                filename: 'static/[name].worker.js',
            })
        )

        return config
    },
}))