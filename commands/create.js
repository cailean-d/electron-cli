const inquirer = require('inquirer');
const { project, electron, angular, vue, purejs } = require('./../util/questions');
const colors = require('colors');
const welcome = require('./../util/welcome');
const generate = require('./../util/generate');

let answer, answers = [];

module.exports = async function() {

    try {
        
        await welcome();

        console.log('\nBasic configuration...\n'.cyan);
        answer = await inquirer.prompt(project);
        answers.push(answer);

        console.log('\nElectron configuration...\n'.cyan);
        answer = await inquirer.prompt(electron);
        answers.push(answer);

        switch (answers[0].project_type) {
            case 'Pure JS':
                console.log('\nJavaScript configuration...\n'.cyan);
                answer = await inquirer.prompt(purejs);
                answers.push(answer);
                break;

            case 'Angular':
                console.log('\nAngular configuration...\n'.cyan);
                answer = await inquirer.prompt(angular);
                answers.push(answer);
                break;

            case 'Vue':
                console.log('\nVue configuration...\n'.cyan);
                answer = await inquirer.prompt(vue);
                answers.push(answer);
                break;
        
            default:
                console.error('\nUnknown project type\n'.red);
                break;
        }

        answers = Object.assign({}, answers[0], answers[1], answers[2]);
        generate(answers);

    } catch (error) {
        console.log(error);
    }

}
