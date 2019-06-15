module.exports = {
  output: {
    filename: "[name].pack.js"
  },
  module: {
    rules: [
      {
        use: { loader: "awesome-typescript-loader" },
        test: /\.tsx?$/,
        exclude: /node_modules/
      },
      {
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env", "babel-preset-react"]
          }
        },
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: {
          loader: "source-map-loader"
        },
        enforce: "pre",
        test: /\.js$/
      }
    ]
  },
  entry: {
    index: "./src/index"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  }
};
