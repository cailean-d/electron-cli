const program = require('commander');
const { version } = require('./package.json');
const welcome = require('./util/welcome');

program
  .version(version, '-v, --version')
  .allowUnknownOption()

program
  .command('create')
  .description('Create electron project')
  .action(require('./commands/create'))

program
  .command('build')
  .description('Build project')
  .action(require('./commands/build'))

program.on('option:*', showHelp);
program.on('command:*', showHelp);

program
  .parse(process.argv);

async function showHelp() {
  await welcome();
  program.help();
}

if (process.argv.length <= 2) {
  showHelp();
}