const runShellCommand = require('./../util/shell');

module.exports = async function(opts) {
  try {
    await runShellCommand('Installing npm packages', 'npm install --quiet', { 
      shell: true, 
      cwd: opts.project_path 
    });    
  } catch (error) {
    console.log(error);
  }
}