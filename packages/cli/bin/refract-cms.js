#! /usr/bin/env node
"use strict";

const program = require("commander");

program
  .command("start")
  .description("start")
  .action(function() {
    require("../scripts/start");
  });

program
  .command("build")
  .description("build")
  .action(function() {
    require("../scripts/build");
  });

program.parse(process.argv);
