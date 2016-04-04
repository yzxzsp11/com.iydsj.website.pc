var path = require("path");
module.exports = {
  entry: {
    "business":"./src/js/page/business.js",
    "user":"./src/js/page/user.js",
    "aboutUs":"./src/js/page/aboutUs.js"
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js"
  },
  resolve: {
    extensions: ['', '.coffee', '.js']
  }
};
