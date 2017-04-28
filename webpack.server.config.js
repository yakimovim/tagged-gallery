var path = require('path');

module.exports = {
    target: 'node',
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
    }
};
