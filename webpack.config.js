const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/js/app.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist", "js"),
    publicPath: "dist/js/",
  },
};
