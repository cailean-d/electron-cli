const colors = require('colors');
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const runShellCommand = require('./../util/shell');

const tmpPath = path.join(__dirname, './../tmp/path.json');
let tmp;
const projectError = `\nProject doesn't exist. Use --list option to see list of projects.`;
let projectPath;

module.exports = async function(project, options) {
  try {
    fs.accessSync(tmpPath, fs.constants.R_OK);
    tmp = require(tmpPath);
    if (tmp.projects.length == 0) {
      throw new Error();
    }
    if (options.list) {
      await setProjectFromList();
    } else if (project && project.match(/^\d+$/)) {
      if (!setProjectByIndex(project)) return console.log(projectError.red);
    } else if (project) {
      if (!setProjectByName(project)) return console.log(projectError.red);
    } else {
      let i = projectIndex(tmp.active);
      projectPath = tmp.projects[i].path;
    }
    runProject();
  } catch (error) {
    console.log('\nNo projects created!'.red);
  }
}

function projectIndex(proj) {
  for(let i = 0; i < tmp.projects.length; i++){
    let item = tmp.projects[i];
    if (item.name === proj) {
      return i;
    }
  }
  return -1;
}

function getProjectsName() {
  let list = [];
  for (const item of tmp.projects) {
    list.push(item.name);
  }
  return list;
}

async function setProjectFromList() {
  let answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'project',
      message: 'Choose a project to run: ',
      choices: getProjectsName()
    },
  ]);
  let i = projectIndex(answer.project);
  projectPath = tmp.projects[i].path;
}

function setProjectByIndex(proj) {
  if (tmp.projects[+proj - 1]) {
    projectPath = tmp.projects[+proj - 1].path;
    return 1;
  }
}

function setProjectByName(proj) {
  let i = projectIndex(proj);
  if (i !== -1) {
    projectPath = tmp.projects[i].path;
    return 1;
  }
}

async function runProject() {
  try {
    console.log('');
    await runShellCommand('Running project in development mode', 'npm start', { 
      shell: true,
      cwd: projectPath
    });
  } catch (error) {
    console.log(error);
  }
}