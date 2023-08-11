module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: "input",
        name: "name",
        message: "What is the name of the worker?",
        validate: (name) => {
          return /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/.test(name) || "Name must be PascalCase";
        },
      },
    ];
    return inquirer.prompt(questions).then((answers) => ({
      ...answers,
      filename: answers.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
    }));
  },
};
