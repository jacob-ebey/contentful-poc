const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const mode = process.env.NODE_ENV || "production";

module.exports = {
  entry: "./src/index",

  output: {
    publicPath: "http://localhost:3001/"
  },
  
  mode,

  devtool: "source-map",

  optimization: {
    minimize: mode === "production"
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
      name: "frontend",
      library: { type: "var", name: "frontend" },
      filename: "remoteEntry.js",
      remotes: {
        "contentful_components": "contentful_components"
      },
      shared: ["react", "react-dom", "graphql", "graphql-tag"]
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.CONTENTFUL_URL': JSON.stringify(process.env.CONTENTFUL_URL),
      'process.env.CONTENTFUL_KEY': JSON.stringify(process.env.CONTENTFUL_KEY)
    })
  ]
};
