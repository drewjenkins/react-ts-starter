"use strict";

const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = (env) => ({
  mode: isDevelopment ? "development" : "production",
  devtool: "inline-source-map",
  entry: "./src/index.tsx",

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
    ...[
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
      isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(true),
      HOST: JSON.stringify(
        env.local ? "http://localhost:3000" : "https://crypto-keeper.io"
      ),
      SERVER: JSON.stringify("http://localhost:3001"),
      TEST: JSON.stringify(env.foo),
    }),
  ],

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".csv"],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    contentBase: "./",
  },
});
