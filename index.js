const program = require('commander');
const { version } = require('./package.json');

program
  .version(version, '-v, --version')
//   .option('-v, --version', 'Output CLI version')
//   .option('-P, --pineapple', 'Add pineapple')
//   .option('-b, --bbq-sauce', 'Add bbq sauce')
//   .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble');

// program
//   .command('version')
//   .description('Output CLI version')
//   .action(require('./commands/version'));

program
  .command('create')
  .option('-m, --mode [type]', 'Type of application [angular]', 'angular')
  .action(require('./commands/create'));

program
  .command('build')
//   .option('-m, --mode [type]', 'Type of application [angular]', 'angular')
  .action(require('./commands/build'));

program
  .parse(process.argv);

// console.log('you ordered a pizza with:');
// if (program.version) require('./commands/version')();
// if (program.pineapple) console.log('  - pineapple');
// if (program.bbqSauce) console.log('  - bbq');
// console.log('  - %s cheese', program.cheese);