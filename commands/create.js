const path = require('path');
const inquirer = require('inquirer');
const colors = require('colors');
const angular = require('./../questions/angular');
const electron = require('./../questions/electron');
const generate = require('./../util/generate');
const project = require('./../questions/project');
const purejs = require('./../questions/purejs');
const vue = require('./../questions/vue');

let answer, answers = [];

module.exports = async function() {
    try {
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

        answers[0].project_path = path.join(process.cwd(), answers[0].project_name);
        answers = Object.assign({}, answers[0], answers[1], answers[2]);
        generate(answers);

    } catch (error) {
        console.log(error);
    }
}
