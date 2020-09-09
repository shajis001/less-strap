const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // installed via npm
const HtmlWebpackPlugin = require("html-webpack-plugin");
let entry = {
  "all.min": "./site/site.less",
};

module.exports = {
  watch: true,
  entry: entry,
  output: {
    path: path.join(__dirname, "./dist/"),
    filename: "[name].js", // output js file name is identical to css file name
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        // loader: 'less-loader', // compiles Less to CSS
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true,
              publicPath: "../",
            },
          },

          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          { loader: "less-loader" },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "@less": path.resolve(__dirname, "../site"),
      "@img": path.resolve(__dirname, "../src/assets/images"),
      "@": path.resolve(__dirname, "../site"),
    },
    modules: ["node_modules", path.resolve(__dirname, "site")],
    extensions: [".js"],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CleanWebpackPlugin({
      root: __dirname,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./site/assets/fonts",
          to: "assets/fonts",
          globOptions: {
            ignore: ["*.less"],
          },
        },
        {
          from: "./site/assets/images",
          to: "assets/images",
          globOptions: {
            ignore: ["*.less"],
          },
        },
      ],
    }),
  ],
};
