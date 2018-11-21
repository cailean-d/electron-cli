const fs = require('fs');
const util = require('util');

const generateLicense = require('./license');
const editPackageJSON = require('./json');
const runShellCommand = require('./../util/shell');

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