const { resolve } = require("node:path");
const { readdirSync } = require("node:fs");

module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: "input",
        name: "name",
        message: "What is the name of the seed?",
        validate: (name) => {
          return /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/.test(name) || "Name must be PascalCase";
        },
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const matchLast = readdirSync(resolve(__dirname, "../../../server/prisma/seeds"))
        .filter((filename) => /^\d\d-.*.ts$/.test(filename))
        .sort()
        .pop()
        .match(/^(\d\d)/);
      const nextNumber = (matchLast ? parseInt(matchLast[1]) + 1 : 1).toString().padStart(2, "0");
      return {
        ...answers,
        filename: nextNumber + "-" + answers.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
      };
    });
  },
};
