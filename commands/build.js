const inquirer = require('inquirer');
const path = require('path');
const build = require('./../questions/build');
const runShellCommand = require('./../util/shell');
const tmpPath = path.join(__dirname, './../tmp/path.json');
const tmp = require(tmpPath);

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

  await buildProject();
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
      message: 'Choose a project to build: ',
      choices: getProjectsName()
    },
  ]);
  let i = projectIndex(answer.project);
  projectPath = tmp.projects[i].path;
}

async function buildProject() {
	const answers = await inquirer.prompt(build);
	try {
    console.log('');
    await runShellCommand('Building a project', `npm run build:${answers.os}`, { 
      shell: true,
      cwd: projectPath,
		});
		console.log('\nActive project is successfully built.'.green);		
  } catch (error) {
    console.log(error);
  }
}