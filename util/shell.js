const spawn = require('cross-spawn');
const ora = require('ora');

module.exports = function (name, command, options, beforeFunc, afterFunc) {
  return new Promise((resolve, reject) => {
    let spinner;

    // console.log('');
    if (name) spinner = ora(name).start();
    
    if (beforeFunc) beforeFunc();
    const child = spawn(command, options);

    child.on('close', (code) => {
      if (code === 0) {
        if (name) spinner.succeed();
        if (afterFunc) afterFunc();
        resolve();
      } else {
        reject('Error: ' + code);        
      }
    })
    
    child.on('error', (error) => {
      if (name) spinner.fail();
      reject(error);
    })
  
  });
}