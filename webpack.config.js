const path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "public/scripts"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: [/node_modules/],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    publicPath: "/scripts/",
  },
  devtool: "source-map",
};
