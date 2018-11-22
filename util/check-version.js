const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

module.exports = async function(package) {
  try {
    const { stdout, stderr } = await execAsync(`npm info ${package} version`);
    return stdout.replace(/(\r\n\t|\n|\r\t)/gm,"");;
  } catch (error) {
    console.log(error);
  }
}