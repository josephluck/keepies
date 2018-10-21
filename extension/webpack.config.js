const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    background: path.join(__dirname, "src/background.ts"),
    ui: path.join(__dirname, "src/ui.tsx")
  },
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};
