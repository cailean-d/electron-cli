const inquirer = require('inquirer');
const { build } = require('./../util/questions');

module.exports = async function() {
    try {
        const answers = await inquirer.prompt(build);
        console.log(answers);
    } catch (error) {
        console.log(error);
    }
}