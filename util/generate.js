const spawn = require('cross-spawn');
const ora = require('ora');

module.exports = function(options) {
  // console.log(options);
  
  if (options.project_type === 'Pure JS') {
    console.log('Generation js project...');
  }
  if (options.project_type === 'Angular') {
    generateAngular(options);
  }
  if (options.project_type === 'Vue') {
    console.log('Generation vue project...');
  }
}

function generateAngular(opts) {
  const res = opts.style.match(/(^[A-z]+)\s?/);
  const style = res[1].toLowerCase();
  const cmd = `ng new ${opts.project_name} --style=${style} --skipInstall=true --routing=${opts.routing}`;
  
  const child = spawn(cmd, { shell: true });

  console.log('');
  const spinner = ora('Creating angular project').start();
  
  child.on('close', (code) => {
    if (code !== 0) {
      console.log('Error');
    } else {
      spinner.succeed();
    }
  })
  
  child.on('error', (error) => {
    spinner.fail('Error occured');
  })
}