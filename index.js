const program = require('commander');
const { version } = require('./package.json');

program
  .version(version, '-v, --version')
  // .allowUnknownOption()

program
  .command('create')
  .description('Create electron project')
  // .option('-m, --mode [type]', 'Type of application [angular]', 'angular')
  .action(require('./commands/create'))

program
  .command('build')
  .description('Build project')
  .action(require('./commands/build'))

program.on('option:*', showHelp);
program.on('command:*', showHelp);

program
  .parse(process.argv);

function showHelp() {
  console.log('');
  program.help();
}