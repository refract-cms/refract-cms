const fs = require("fs-extra");
const path = require("path");

fs.copySync(
  path.resolve(__dirname, "../create-template-razzle"),
  path.resolve(__dirname, "assets/create-template-razzle")
);

fs.removeSync(
  path.resolve(__dirname, "assets/create-template-razzle/node_modules")
);
