const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";
const outputPath = path.join(__dirname, "dist");

module.exports = {
  target: "web",
  mode,
  entry: "./src/index.tsx",
  output: {
    path: outputPath,
    filename: prod ? "[name].[contenthash:8].js" : "[name].js",
    clean: prod,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name].[contenthash][ext]",
        },
      },
      {
        test: /\.(scss|css)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      "azure-devops-extension-sdk": path.resolve(
        "node_modules/azure-devops-extension-sdk"
      ),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  stats: {
    warnings: false,
  },
  devServer: {
    server: {
      type: "https",
    },
    historyApiFallback: true,
    port: 3000,
    client: {
      overlay: false,
    },
    // static: {
    //   directory: path.join(__dirname, "dist"),
    // },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
