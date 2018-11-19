var project = 'test-proj', style = 'scss', install = 'false', routing = 'true';
var cmd = `ng new ${project} --style=${style} --skipInstall=${install} --routing=${routing}`;
// var path = require('path');

// const { execSync } = require('child_process');


// try {
// let stdout = execSync(`ng new ${project} --style=${style}`);
    
// // console.log(stdout.toString('utf8'));
// } catch (error) {
// console.log('error')    
// }

// const { execSync } = require('child_process');
// let stdout = execSync('npm root -g');


// var ss = path.join(stdout.toString('utf-8'), '/@angular/cli/bin/node');
// ss = ss.replace(/(\r\n\t|\n|\r\t)/gm,"");
// console.log(ss);


const spawn = require('cross-spawn');

// Spawn NPM asynchronously
const child = spawn('ng', ['new', 'test-proj']);


// var spawn = require('child_process').spawn;
// var child = spawn('ng');
// var child = spawn('cmd', ['/s', '/c', 'ngcd']);

child.stdout.on('data', function(chunk) {
  // output will be here in chunks
  console.log(chunk.toString());
});

child.stderr.on('data', function(chunk) {
  console.log(chunk.toString());
})

child.on('close', (code) => {
  if (code === 0) {
      console.log('Successully ended')
  }
  else {
      console.log('error')
  }
})

child.on('error', (error) => {
  console.log(error);
})
