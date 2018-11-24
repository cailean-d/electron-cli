const runShellCommand = require('./../util/shell');

module.exports = async function() {
    try {
      console.log('');
      await runShellCommand('Running project in development mode', 'npm start', { shell: true });
    } catch (error) {
      console.log(error);
    }
}