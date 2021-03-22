const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

// const webpack = require("webpack");
const entryPath = path.resolve(__dirname, "./src");
// const serverPath = path.resolve(__dirname, "../server");
const serverViewsPath = path.resolve(__dirname, "../server/views");
const serverScriptsPath = path.resolve(__dirname, "../server/scripts");
// const serverAssetsPath = path.resolve(__dirname, "../server/assets");
const serverStylePath = path.resolve(__dirname, "../server/styles");
module.exports = {
  entry: {
    test1: `${entryPath}/test1.js`,
    test2: `${entryPath}/test2.js`,
  },
  watchOptions: {
    aggregateTimeout: 100,
    poll: 500,
    ignored: /node_modules/,
  },
  output: {
    path: path.resolve(__dirname, serverScriptsPath),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "../assets/[hash][ext][query]",
  },
  resolve: {
    extensions: [".js", ".json", ".vue"],
  },
  cache: {
    type: "filesystem",
  },
  module: {
    rules: [
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        use: ["cache-loader", "babel-loader"],
        include: path.resolve("src"),
      },
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
      {
        test: /\.(less|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      // ... other rules
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.(css|vue)$/,
          chunks: "all",
          enforce: true,
        },
        // 打包业务中公共代码
        common: {
          name: "common",
          chunks: "initial",
          minSize: 1,
          priority: 0,
          minChunks: 2, // 同时引用了2次才打包
        },
        // 打包第三方库的文件
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          priority: 10,
          minChunks: 2, // 同时引用了2次才打包
        },
      },
    },
    // runtimeChunk: { name: "manifest" }, // 运行时代码
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "webpack boilerplate",
      template: `${serverViewsPath}/test1/template.html`,
      filename: `${serverViewsPath}/test1/index.html`,
      chunks: ["test1"],
    }),
    new HtmlWebpackPlugin({
      title: "webpack boilerplate",
      template: `${serverViewsPath}/test2/template.html`,
      filename: `${serverViewsPath}/test2/index.html`,
      chunks: ["test2"],
    }),
    // ... 忽略 vue-loader 插件
    new MiniCssExtractPlugin({
      filename: "../styles/" + "blocks.[name].build.css",
    }),
  ],
};
