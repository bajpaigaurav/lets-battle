
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './app/App.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },

    mode: process.env.NODE_ENV === 'production'?'production':'development',
    plugins: [
        new HtmlWebpackPlugin( {
            template: 'index.html'
        }),
    new CopyPlugin({
        patterns: [
        // { from : '404.html' },
        // { from : 'favicon.ico' },
        { from : '_redirects' }
      ]})
    ],
    devServer: {
        historyApiFallback: true,
    }
}