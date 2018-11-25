const colors = require('colors');
const inquirer = require('inquirer');
const path = require('path');
const editJsonFile = require('edit-json-file');

const tmpPath = path.join(__dirname, './../tmp/path.json');
const tmp = require(tmpPath);

module.exports = async function() {
  if (tmp.projects.length == 0) {
    return console.log('\nNo projects created!'.red);
  }

  await setProjectFromList();
  console.log('\nActive project is successfully changed.'.green);
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
