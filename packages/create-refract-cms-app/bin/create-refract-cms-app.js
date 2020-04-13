#! /usr/bin/env node
"use strict";

const program = require("commander");
const create = require("../scripts/create");
const inquirer = require("inquirer");

program
  .option("-d, --dir <type>", "Project name and folder name")
  .option("-s, --sample-schema <type>", "Sample schema (default or blog)");

program.parse(process.argv);

inquirer
  .prompt(
    [
      {
        name: "dir",
        message: "Project folder name"
      },
      {
        type: "list",
        name: "sampleSchema",
        message: "Would you like to use a starter schema?",
        choices: [
          {
            name: "Blog",
            value: "blog"
          },
          {
            name: "No thanks, a clean install please.",
            value: "default"
          }
        ]
      }
    ].filter(question => question.name in program === false)
  )
  .then(promptAnswers => {
    const answers = {
      dir: program.dir,
      sampleSchema: program.sampleSchema,
      ...promptAnswers
    };
    create(answers);
  });
