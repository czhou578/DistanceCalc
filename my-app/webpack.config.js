module.exports = {
  mode: "development",
  devServer: {
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
  entry: __dirname + "/src/index.js",
  module: {
    rykes: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
      },
      {
        test: /\.css?$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              module: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".css"],
  },
  target: "web",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
};
