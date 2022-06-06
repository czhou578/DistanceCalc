const path = require("path");
const HtmlWebpackPlugin = require ('html-webpack-plugin')

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    compress: true,
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
  entry: ["regenerator-runtime/runtime.js", __dirname + "/src/index.js", __dirname + "/src/App.css"],
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
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
        sideEffects: true
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {},
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
    path: path.resolve(__dirname, "/dist"),
    filename: "bundle.js",
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'App',
      filename: 'index.html',
      template: 'public/index.html'
    })
  ],

  // externals: {
  //   react: 'React'
  // },
};
