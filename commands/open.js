const colors = require('colors');
const inquirer = require('inquirer');
const path = require('path');
const runShellCommand = require('./../util/shell');
const { vscode } = require('./../questions/run');

const tmpPath = path.join(__dirname, './../tmp/path.json');
const tmp = require(tmpPath);
let projectPath;

module.exports = async function(options) {
  if (tmp.projects.length == 0) {
    return console.log('\nNo projects created!'.red);
  }

  if (options.list) {
    await setProjectFromList();
  } else {
    let i = projectIndex(tmp.active);
    projectPath = tmp.projects[i].path;
  }

  await openProject();
  console.log('\nActive project is successfully opened in vscode.'.green);
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
      message: 'Choose a project to open: ',
      choices: getProjectsName()
    },
  ]);
  let i = projectIndex(answer.project);
  projectPath = tmp.projects[i].path;
}

async function openProject() {
  let b = await inquirer.prompt(vscode);
  let mode = (b.vscode_mode === 'Current window') ? ' -r --add': '';
  await runShellCommand(null, `code ${projectPath}${mode}`, { shell: true });
}