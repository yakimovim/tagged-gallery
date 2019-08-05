const webpack = require("webpack");
const path = require("path");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  target: "web",
  // mode: 'development',
  devtool: "source-map",
  entry: ["./src/client/app.js"],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist/client/"),
    publicPath: "/"
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  resolve: {
    alias: {
      "react": "preact-compat",
      "react-dom": "preact-compat",
      "react-redux": "preact-redux",
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.woff$/,
        loader:
          "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
      },
      {
        test: /\.woff2$/,
        loader:
          "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
      },
      {
        test: /\.(eot|ttf|svg|gif|png)$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new HardSourceWebpackPlugin({
      cacheDirectory: "node_modules/.cache/hard-source/client/[confighash]"
    }),
    new webpack.DefinePlugin({
      // <-- key to reducing React's size
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/client/index.template.html"
    }),
    new CopyWebpackPlugin([
      {
        from: "src/client/token.html"
      }
    ])
  ]
};
