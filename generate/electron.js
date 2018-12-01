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
  let dependencies = {};
  const el_ver = await checkVersion('electron');
  const tslint_ver = await checkVersion('tslint');
  const typescript_ver = await checkVersion('typescript');
  const builder_ver = await checkVersion('electron-builder');
  const reload_ver = await checkVersion('electron-reload');
  const run_all_ver = await checkVersion('npm-run-all');
  const del_ver = await checkVersion('rimraf');
  const waiton_ver = await checkVersion('wait-on');
  let package = editJsonFile(path.join(options.project_path, 'package.json'));
  setAngularPath(package);
  dependencies['electron'] = `^${el_ver}`;
  dependencies['electron-builder'] = `^${builder_ver}`;
  dependencies['electron-reload'] = `^${reload_ver}`;
  if (options.lang === 'TypeScript') {
    if (options.project_type === 'Angular') {
      dependencies['wait-on'] = `^${waiton_ver}`;
      dependencies = Object.assign({}, package.get('dependencies'), dependencies);
      package.unset('dependencies');
      package.set("scripts.postinstall:electron", "node postinstall");
      package.set("scripts.postinstall:web", "node postinstall-web");
      package.set("scripts.test", "npm run postinstall:web && ng test");
      package.set("scripts.e2e", "npm run postinstall:web && ng e2e");
      package.set("scripts.ng:serve", "ng serve");
      package.set("scripts.electron:tsc", "tsc -p ts-electron.json");
      package.set("scripts.electron:start", "ENV NODE_ENV=development electron ./dist/electron.js");
      package.set("scripts.electron:serve", "wait-on http-get://localhost:4200/ && npm run electron:tsc && npm run electron:start");
      package.set("scripts.build", "npm run postinstall:electron && ng build --prod --baseHref=./ && npm run electron:tsc");
      package.set("scripts.start", "npm run postinstall:electron && npm-run-all -p ng:serve electron:serve");
    } else {
      package.set("scripts.build", "tsc");
      package.set("scripts.start", "npm-run-all -p electron watch");
      package.set("scripts.watch", "tsc -w");
      package.set("scripts.lint", "tslint -c tslint.json -p tsconfig.json");
      package.set("scripts.electron", "npm run build && ENV NODE_ENV=development electron ./dist/electron.js");
      dependencies['tslint'] = `^${tslint_ver}`;
      dependencies['typescript'] = `^${typescript_ver}`;
    }
    package.set("main", "./dist/electron.js");
    dependencies['npm-run-all'] = `^${run_all_ver}`;
    dependencies['rimraf'] = `^${del_ver}`;
    package.set("scripts.build:windows", "npm run build && electron-builder build --windows && rimraf dist");
    package.set("scripts.build:linux", "npm run build && electron-builder build --linux && rimraf dist");
    package.set("scripts.build:mac", "npm run build && electron-builder build --mac && rimraf dist");
  } else if (options.lang === 'JavaScript') {
    package.set("main", "./src/electron.js");
    package.set("scripts.start", "ENV NODE_ENV=development electron ./src/electron.js");
    package.set("scripts.build:windows", "electron-builder build --windows");
    package.set("scripts.build:linux", "electron-builder build --linux");
    package.set("scripts.build:mac", "electron-builder build --mac");
  }
  package.set('devDependencies', dependencies);
  package.save();
}

async function copyFiles() {

  let source = path.join(__dirname, `./../schematics/electron/`);
  let destination = path.join(options.project_path);

  let opts = {
    filter: (filename) => {
      if (options.lang === "JavaScript") {
        if (/(\\ts(.(?!\\))+\.json)|((\\(.(?!\\))+\.ts$))$/.test(filename)) {
          return false;
        }
      } else if (options.lang === "TypeScript") {
        if (options.project_type === "Angular") {
          if (/(\\index(?!\\)\.html)|(\\renderer(?!\\)\.ts)$/.test(filename)) {
            return false;
          }
        }
        if (/\.js$/.test(filename) && !/\\postinstall.*(?!\\)\.js$/.test(filename)) {
          return false;
        }
      }
      if (options.project_type !== "Angular" 
      && /(\\postinstall.*(?!\\)\.js)|(\\ts-electron.*(?!\\)\.json)$/.test(filename)) {
        return false;
      }
      if (!options.default_menu && /main-menu\.(j|t)s$/.test(filename)) {
        return false;
      }
      return true;
    },
    transform: (read, write) => {
      read
        .pipe(new ejsTransform(options))
        .pipe(write);
    },
    clobber: false
  }

  await ncpAsync(source, destination, opts);
}

function setAngularPath(jsonEditor) {
  let a = jsonEditor.get('dependencies.@angular/core') || jsonEditor.get('devDependencies.@angular/core');
  if (!a) {
    options.angular_path = '';
  } else {
    options.angular_path = getPathFromVersion(a);
  }
}

function getPathFromVersion(version) {
  let match = version.match(/.?(\d{1})\..*/);
  if (+match[1] >= 6) {
    return options.project_name;
  } else {
    return '';
  }
}