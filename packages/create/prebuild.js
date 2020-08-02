const fs = require("fs-extra");
const path = require("path");

fs.copySync(
  path.resolve(__dirname, "../create-template"),
  path.resolve(__dirname, "src/create-template")
);
