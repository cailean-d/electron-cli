const inquirer = require('inquirer');
const { project, electron, angular, vue, purejs } = require('./../util/questions');

module.exports = async function() {
    console.log(`Creating project...`);

    let answer = await inquirer.prompt(electron);
    console.log(answer);
        
}