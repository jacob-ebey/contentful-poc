const HtmlWebpackPlugin = require("html-webpack-plugin");
const ContainerReferencePlugin = require("webpack/lib/container/ContainerReferencePlugin");

module.exports = {
  entry: "./src/index",

  output: {
    publicPath: "http://localhost:3001/"
  },

  optimization: {
    minimize: false
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("@babel/preset-react")]
        }
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ]
  },

  plugins: [
    new ContainerReferencePlugin({
      remoteType: "var",
      remotes: {
        "contentful_components": "contentful_components"
      },
      overrides: ["react"]
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
