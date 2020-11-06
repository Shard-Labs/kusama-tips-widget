const path = require("path");
const webpack = require("webpack");
const sveltePreprocess = require("svelte-preprocess");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const production = mode === "production";

module.exports = {
  entry: "./src/main.ts",
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte"),
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer"),
      stream: require.resolve("stream-browserify"),
    },
  },
  output: {
    library: "kusamaTipsWidget",
    libraryTarget: "umd",
    filename: "bundle.js",
    globalObject: "this",
  },
  devServer: {
    injectClient: false, // https://github.com/webpack/webpack-dev-server/issues/2484
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: true,
            preprocess: sveltePreprocess(),
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  mode: mode,
  devtool: production ? false : "source-map",
  optimization: {
    minimize: production,
    minimizer: [new TerserPlugin({ parallel: true })],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "public", "index.html"),
      inject: "head",
    }),
    new webpack.DefinePlugin({
      "process.browser": true,
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
  ],
};
