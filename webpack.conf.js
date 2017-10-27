import webpack from "webpack";
import path from "path";

export default {
  module: {
    loaders: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file?name=/[hash].[ext]"
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        loader: "babel-loader",
        test: /\.js?$/,
        exclude: /(public|node_modules|themes)/,
        query: {cacheDirectory: true}
      }
    ]
  },

  context: path.join(__dirname, "src"),
  entry: {
    main: ["./js/app"]
  },
  output: {
    path: path.join(__dirname, "public/assets/js"),
    publicPath: "/",
    filename: "[name].js"
  },
  externals: [/^vendor\/.+\.js$/]
};
