"use strict";

const path = require("path");
const webpack = require("webpack");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /\.csv$/,
        loader: "csv-loader",
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true,
        },
      },
    ],
  },
  plugins: [
    // new SentryWebpackPlugin({
    //   authToken: process.env.SENTRY_AUTH_TOKEN,
    //   org: "crypto-keeper",
    //   project: "javascript",
    //   include: ".",
    //   ignore: ["node_modules", "webpack.config.js", "webpack.config.prod.js"],
    // }),
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(false),
      HOST: JSON.stringify("https://crypto-keeper.io"),
      SERVER: JSON.stringify("https://api.crypto-keeper.io"),
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".csv"],
  },
};
