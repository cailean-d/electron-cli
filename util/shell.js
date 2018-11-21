const spawn = require('cross-spawn');
const ora = require('ora');

module.exports = function (name, command, options, beforeFunc, afterFunc) {
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