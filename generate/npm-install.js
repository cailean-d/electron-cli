const runShellCommand = require('./../util/shell');

module.exports = function(opts) {
  return runShellCommand('Installing npm packages', 'npm install --quiet', { 
    shell: true, 
    cwd: opts.project_path 
  });    
}