const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
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
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  resolve: {
    alias: {
      "react": "preact/compat",
      "react-dom": "preact/compat"
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
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.woff$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              name: "[path][name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.woff2$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/font-woff2",
              name: "[path][name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|svg|png)$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
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
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/client/token.html" },
        { from: "src/client/android-chrome-192x192.png" },
        { from: "src/client/android-chrome-512x512.png" },
        { from: "src/client/apple-touch-icon.png" },
        { from: "src/client/favicon-16x16.png" },
        { from: "src/client/favicon-32x32.png" },
        { from: "src/client/favicon.ico" },
        { from: "src/client/site.webmanifest" },
      ]
    })
  ]
};
