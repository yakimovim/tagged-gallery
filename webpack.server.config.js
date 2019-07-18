var path = require('path');
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
    target: 'node',
    // mode: 'development',
    devtool: 'source-map',
    entry: ['babel-polyfill', './src/server/app.js'],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist/server/')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HardSourceWebpackPlugin({
            cacheDirectory: 'node_modules/.cache/hard-source/server/[confighash]'
        })
    ]
};
