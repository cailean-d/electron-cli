const colors = require('colors');
const editJsonFile = require('edit-json-file');
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');

const tmpPath = path.join(__dirname, './../tmp/path.json');
let tmp;

module.exports = async function() {
  try {
    fs.accessSync(tmpPath, fs.constants.R_OK);
    tmp = require(tmpPath);
    if (tmp.projects.length == 0) {
      throw new Error();
    }
    await setProjectFromList();
    console.log('\nActive project is successfully changed.'.green);
  } catch (error) {
    return console.log('\nNo projects created!'.red);    
  }
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
  let tmp = editJsonFile(tmpPath);
  tmp.set("active", answer.project);
  tmp.save();
}
