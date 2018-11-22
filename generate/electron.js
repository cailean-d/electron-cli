const editJsonFile = require('edit-json-file');
const ncp = require('ncp').ncp;
const ora = require('ora');
const path = require('path');
const util = require('util');
const checkVersion = require('./../util/check-version');
const ejsTransform = require('./../util/ejs-transform');

ncpAsync = util.promisify(ncp);

let options;

module.exports = async function(opts) {
  options = opts;
  const spinner = ora('Generating electron files').start();
  try {
    const electronLatestVersion = await checkVersion('electron');
    editPackage(electronLatestVersion);
    await copyFiles();
    spinner.succeed();
  } catch (error) {
    spinner.fail();
    console.log(error);
  }
}

function editPackage(version) {
  let package = editJsonFile(path.join(options.project_path, 'package.json'));
  package.set("scripts.start", "electron .");
  package.set("devDependencies.electron", `^${version}`);
  package.save();
}

async function copyFiles() {

  let source = path.join(__dirname, `./../schematics/electron`);
  let destination = path.join(options.project_path);

  let opts = {
    filter: (filename) => {
      if (!options.default_menu && /main-menu\.js$/.test(filename)) {
        return false;
      }
      return true;
    },
    transform: (read, write) => {
      read
        .pipe(new ejsTransform(options))
        .pipe(write);
    }
  }

  await ncpAsync(source, destination, opts);
}