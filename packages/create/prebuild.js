const fs = require("fs-extra");
const path = require("path");

fs.copySync(
  path.resolve(__dirname, "../create-template"),
  path.resolve(__dirname, "assets/create-template")
);

fs.removeSync(path.resolve(__dirname, "assets/create-template/node_modules"));
