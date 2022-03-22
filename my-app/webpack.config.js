module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
  entry: __dirname + "/src/index.js",
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/react", { runtime: "automatic" }],
              "@babel/preset-typescript",
              ["@babel/preset-env", { targets: "last 2 years" }],
            ],
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-react']
        }
        },
      },
      {
        test: /\.css?$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
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
    publicPath: "index_build.js",
  },
};
