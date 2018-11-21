const spawn = require('cross-spawn');
const ora = require('ora');
const editJsonFile = require('edit-json-file');
const path = require('path');
const fs = require('fs');
const util = require('util');

const generateLicense = require('./license');
const editPackageJSON = require('./json');

fs.mkdirAsync = util.promisify(fs.mkdir);

module.exports = function(options) {  
  if (options.project_type === 'Pure JS') {
    generateJS(options);
  }
  if (options.project_type === 'Angular') {
    generateAngular(options);
  }
  if (options.project_type === 'Vue') {
    generateVue(options);
  }
}

async function generateAngular(opts) {
  const cmd = `ng new ${opts.project_name} 
              --style=${opts.style} 
              --skipInstall=true 
              --routing=${opts.routing}`;

  try {
    await runShellCommand('Creating angular project', cmd, { shell: true })
  } catch (error) {
    console.log(error);
  }
}

async function generateJS(opts) {

  try {
    await runShellCommand(
      'Creating javascript project', 
      'npm init -y', 
      { shell: true, cwd: opts.project_path }, 
      async () => await fs.mkdirAsync(opts.project_path)
    );    
  } catch (error) {
    console.log(error);
  }

  editPackageJSON(opts);
  generateLicense(opts);
}

async function generateVue(opts) {
  console.log('Generation vue project...');
}

function runShellCommand(name, command, options, beforeFunc, afterFunc) {
  return new Promise((resolve, reject) => {

    console.log('');
    const spinner = ora(name).start();
    
    if (beforeFunc) beforeFunc();
    const child = spawn(command, options);

    child.on('close', (code) => {
      if (code === 0) {
        spinner.succeed();
        if (afterFunc) afterFunc();
        resolve();
      } else {
        reject('Error: ' + code);        
      }
    })
    
    child.on('error', (error) => {
      spinner.fail();
      reject(error);
    })
  
  });
}