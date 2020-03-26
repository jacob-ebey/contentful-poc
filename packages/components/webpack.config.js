const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/index",

  output: {
    publicPath: "http://localhost:3002/"
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
    new ModuleFederationPlugin({
      name: "contentful_components",
      library: { type: "var", name: "contentful_components" },
      filename: "remoteEntry.js",
      exposes: {
        "layout-renderer": "./src/layout-renderer"
      },
      shared: ["react", "react-dom", "graphql", "graphql-tag"]
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};