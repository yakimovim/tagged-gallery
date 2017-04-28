var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    target: 'web',
    devtool: 'source-map',
    entry: ['./src/client/app.js'],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist/client/')
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
        new HtmlWebpackPlugin({  // Also generate a test.html 
            filename: 'index.html',
            template: 'src/client/index.template.html'
        }),
        new CopyWebpackPlugin([
            { 
                from: 'src/client/token.html' 
            }
        ])
    ]
};
