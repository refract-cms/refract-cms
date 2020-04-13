const fs = require("fs-extra");
const path = require("path");

fs.copySync(
  path.join(__dirname, "../cli-consumer"),
  path.join(__dirname, "./new-source-files/refract-cms")
);
