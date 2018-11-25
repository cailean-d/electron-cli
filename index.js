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

program
  .command('start [project]')
  .option("-l, --list", "Open list of exist projects")
  .description('Start project in development mode')
  .action(require('./commands/start'))

program
  .command('clear')
  .description('Clear list of projects')
  .action(require('./commands/clear'))

program
  .command('add [module]')
  .option("-l, --list", "Choose a project to add a module to")
  .description('Add module to electron project')
  .action(require('./commands/add'))

program
  .command('activate')
  .description('Choose a project to be an active')
  .action(require('./commands/activate'))

program
  .command('open')
  .option("-l, --list", "Choose a project to open vscode in")
  .description('Open active project in vscode')
  .action(require('./commands/open'))

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