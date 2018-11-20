const inquirer = require('inquirer');
const { build } = require('./../util/questions');

module.exports = async function() {
    const answers = await inquirer.prompt(build);
    console.log(answers);
}