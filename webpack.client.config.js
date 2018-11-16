var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    target: 'web',
    mode: 'development',
    devtool: 'source-map',
    entry: ['./src/client/app.js'],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist/client/'),
        publicPath: '/'
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.woff$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
            },
            {
                test: /\.woff2$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
            },
            {
                test: /\.(eot|ttf|svg|gif|png)$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        // new webpack.DefinePlugin({ // <-- key to reducing React's size
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // }),
        new HtmlWebpackPlugin({
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
