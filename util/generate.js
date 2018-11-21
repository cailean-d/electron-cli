const spawn = require('cross-spawn');
const ora = require('ora');
const editJsonFile = require('edit-json-file');
const path = require('path');
const fs = require('fs');

module.exports = function(options) {
  options.style = getStyle(options);
  
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
      () => fs.mkdirSync(opts.project_path)
    );    
  } catch (error) {
    console.log(error);
  }

  editPackageJSON(opts);
}

async function generateVue(opts) {
  console.log('Generation vue project...');
}

function editPackageJSON(opts) {
  const spinner = ora('Editing package.json').start();
  let package = editJsonFile(path.join(opts.project_path, 'package.json'));
  package.set("name", opts.project_name);
  package.set("version", opts.version);
  package.set("main", "main.js");
  if (opts.description) package.set("description", opts.description);
  if (opts.author) package.set("author", opts.author);
  if (opts.license) package.set("license", opts.license);
  if (opts.keywords) package.set("keywords", opts.keywords.split(' '));
  if (opts.git) package.set("repository.type", "git");
  if (opts.git) package.set("repository.url", opts.git);
  package.save();
  spinner.succeed();
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

function getStyle(opts) {
  const res = opts.style.match(/(^[A-z]+)\s?/);
  return res[1].toLowerCase();
}