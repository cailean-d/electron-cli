const program = require('commander');
const { version } = require('./package.json');

program
  .version(version, '-v, --version')
  // .allowUnknownOption()

program
  .command('create')
  .alias('generate')
  .description('Create electron project')
  .option('-m, --mode [type]', 'Type of application [angular]', 'angular')
  .action(require('./commands/create'))

program
  .command('build')
  .description('Build project')
  .action(require('./commands/build'))

program.on('option:verbose', function () {
  console.log('');
  program.help();
});

program.on('command:*', function () {
  console.log('');
  program.help();
});

program
  .parse(process.argv);