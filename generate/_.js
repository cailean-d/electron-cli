const fs = require('fs');
const util = require('util');
const inquirer = require('inquirer');

const generateLicense = require('./license');
const editPackageJSON = require('./package');
const runShellCommand = require('./../util/shell');
const installNpmPackages = require('./npm-install');
const genElectron = require('./electron');
const { basic } = require('./../questions/run');
const { vscode } = require('./../questions/run');

fs.mkdirAsync = util.promisify(fs.mkdir);

module.exports = function(options) {  
  if (options.project_type === 'No framework') {
    generateJS(options);
  } else if (options.project_type === 'Angular') {
    generateAngular(options);
  } else if (options.project_type === 'Vue') {
    generateVue(options);
  } else if (options.project_type === 'React') {
    generateReact(options);
  } else {
    console.error('Cannot define project type');
  }
}

async function generateAngular(opts) {
  const cmd = `ng new ${opts.project_name} 
              --style=${opts.style} 
              --skipInstall=true 
              --commit=false 
              --routing=${opts.routing}`;

  try {
    await runShellCommand('Creating angular project', cmd, { shell: true })
  } catch (error) {
    console.log(error);
  }
}

async function generateJS(opts) {

  try {
    console.log('');
    await runShellCommand(
      'Project initialization', 
      'npm init -y', { 
        shell: true, 
        cwd: opts.project_path 
      }, async () => await fs.mkdirAsync(opts.project_path)
    );
    editPackageJSON(opts);
    await generateLicense(opts);
    await genElectron(opts);
    if (!opts.skip_install) {
      await installNpmPackages(opts);
      await runProject(opts);
    } 
  } catch (error) {
    console.log(error);
  }
}

async function generateVue(opts) {
  console.log('Generating vue project...');
}

async function generateReact(opts) {
  console.log('Generating react project...')
}

async function runProject(opts) {
  console.log('');
  let a = await inquirer.prompt(basic);
  if (a.run_vscode) {
    let b = await inquirer.prompt(vscode);
    let mode = (b.vscode_mode === 'Current window') ? ' -r --add': '';
    await runShellCommand(null, `code ${opts.project_path}${mode}`, { shell: true });
  }
  if (a.run_project) {
    await runShellCommand(null, 'npm start', { shell: true, cwd: opts.project_path });
  }
}