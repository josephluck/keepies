const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = env => ({
  mode: env.NODE_ENV === "production" ? "production" : "development",
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
  },
  plugins: [
    // NB: values on right are defaults
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      GITHUB_OAUTH_APP_ID: "",
      EXTENSION_ID: ""
    }),
    new CopyWebpackPlugin([
      {
        from: "./src/build",
        to: "./",
        force: true, // Always make once, for switching between dev and prod
        transform: (content, path) => {
          /**
           * In development mode, we add the "key" property
           * in manifest.JSON so that when the extension
           * initialises a web auth flow, the redirect URL
           * points back to the "unpacked" extension.
           */
          console.log({
            path,
            NODE_ENV: env.NODE_ENV,
            EXTENSION_ID: env.EXTENSION_ID
          });
          if (
            path.includes("manifest.json") &&
            env.NODE_ENV !== "production" &&
            env.EXTENSION_ID
          ) {
            return JSON.stringify({
              ...JSON.parse(content),
              key: env.EXTENSION_ID
            });
          } else {
            return content;
          }
        }
      }
    ])
  ]
});
