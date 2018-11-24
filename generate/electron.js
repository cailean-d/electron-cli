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
    await editPackage();
    await copyFiles();
    spinner.succeed();
  } catch (error) {
    spinner.fail();
    console.log(error);
  }
}

async function editPackage() {
  const el_ver = await checkVersion('electron');
  const tslint_ver = await checkVersion('tslint');
  const typescript_ver = await checkVersion('typescript');
  const builder_ver = await checkVersion('electron-builder');
  const reload_ver = await checkVersion('electron-reload');
  let package = editJsonFile(path.join(options.project_path, 'package.json'));
  package.set("devDependencies.electron", `^${el_ver}`);
  package.set("devDependencies.electron-builder", `^${builder_ver}`);
  package.set("devDependencies.electron-reload", `^${reload_ver}`);
  if (options.lang === 'TypeScript') {
    package.set("main", "./dist/main.js");
    package.set("devDependencies.tslint", `^${tslint_ver}`);
    package.set("devDependencies.typescript", `^${typescript_ver}`);
    package.set("scripts.build", "tsc");
    package.set("scripts.watch", "tsc -w");
    package.set("scripts.lint", "tslint -c tslint.json -p tsconfig.json");
    package.set("scripts.start", "ENV NODE_ENV=development npm run build && electron ./dist/main.js");
  } else if (options.lang === 'JavaScript') {
    package.set("scripts.start", "ENV NODE_ENV=development electron .");
    package.set("scripts.build:windows", "electron-builder build --windows");
    package.set("scripts.build:linux", "electron-builder build --linux");
    package.set("scripts.build:mac", "electron-builder build --mac");
  }
  package.save();
}

async function copyFiles() {

  let source = path.join(__dirname, `./../schematics/electron/${options.lang.toLowerCase()}`);
  let destination = path.join(options.project_path);

  let opts = {
    filter: (filename) => {
      if (!options.default_menu && /main-menu\.(j|t)s$/.test(filename)) {
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