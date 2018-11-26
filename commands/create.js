const colors = require('colors');
const editJsonFile = require('edit-json-file');
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const angular = require('./../questions/angular');
const electron = require('./../questions/electron');
const generateProject = require('../generate/_');
const parseStyle = require('./../util/parse-style');
const project = require('./../questions/project');
const purejs = require('./../questions/purejs');
const react = require('./../questions/react');
const vue = require('./../questions/vue');

let answer, answers = [];
const pathx = path.join(__dirname, './../tmp/path.json');

module.exports = async function() {
    try {
        console.log('\nBasic configuration...\n'.cyan);
        answer = await inquirer.prompt(project);
        answers.push(answer);

        console.log('\nElectron configuration...\n'.cyan);
        answer = await inquirer.prompt(electron);
        answers.push(answer);

        switch (answers[0].project_type) {
            case 'No framework':
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

            case 'React':
                console.log('\nReact configuration...\n'.cyan);
                answer = await inquirer.prompt(react);
                answers.push(answer);
                break;
        
            default:
                console.error('\nUnknown project type\n'.red);
                break;
        }

        genProjectPath();
        genProjectOptions();
        generateProject(answers);
        savePath();

    } catch (error) {
        console.log(error);
    }
}

function genProjectPath() {
    answers[0].project_path = path.join(process.cwd(), answers[0].project_name);
}

function genProjectOptions() {
    answers = Object.assign({}, answers[0], answers[1], answers[2]);
    answers.style = parseStyle(answers.style);
}

function savePath() {
    try {
        fs.accessSync(pathx, fs.constants.R_OK)
    } catch (error) {
        if (!fs.existsSync(path.dirname(pathx))) fs.mkdirSync(path.dirname(pathx));
        fs.writeFileSync(pathx, '{}');
    }
    editPath();
}

function editPath() {
    let tmpPath = editJsonFile(pathx);
    let tmp_obj = tmpPath.toObject();
    if (!tmp_obj.projects) tmp_obj.projects = [];
    tmp_obj.projects.push({
        "name": answers.project_name,
        "path": answers.project_path,
    });
    tmpPath.set("active", answers.project_name);
    tmpPath.set("projects", tmp_obj);
    tmpPath.save();
}
