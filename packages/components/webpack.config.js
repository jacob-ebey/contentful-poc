const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const mode = process.env.NODE_ENV || "production";

module.exports = {
  entry: "./src/index",

  output: {
    publicPath: "http://localhost:3002/"
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
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
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
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.CONTENTFUL_URL': JSON.stringify(process.env.CONTENTFUL_URL),
      'process.env.CONTENTFUL_KEY': JSON.stringify(process.env.CONTENTFUL_KEY)
    })
  ]
};
