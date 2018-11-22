const fs = require('fs');
const util = require('util');

const generateLicense = require('./license');
const editPackageJSON = require('./package');
const runShellCommand = require('./../util/shell');
const installNpmPackages = require('./npm-install');

fs.mkdirAsync = util.promisify(fs.mkdir);

module.exports = function(options) {  
  if (options.project_type === 'Pure JS') {
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
      'npm init -y', { 
        shell: true, 
        cwd: opts.project_path 
      }, async () => await fs.mkdirAsync(opts.project_path)
    );    
  } catch (error) {
    console.log(error);
  }

  editPackageJSON(opts);
  generateLicense(opts);
}

async function generateVue(opts) {
  console.log('Generating vue project...');
}

async function generateReact(opts) {
  console.log('Generating react project...')
}