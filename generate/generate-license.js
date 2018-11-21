const ora = require('ora');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const util = require('util');

fs.readFileAsync = util.promisify(fs.readFile);
fs.writeFileAsync = util.promisify(fs.writeFile);

module.exports = async function (opts) {
  const spinner = ora('Generating license').start();
  setTimeout(() => {
    let spin;
    if (!opts.author) spin = ora('No Author').start(); spin.warn();
    if (!opts.email) spin = ora('No Email').start(); spin.warn();
  }, 50);
  try {
    let out = await genLicense(opts, opts.license);
    await fs.writeFileAsync(path.join(opts.project_path, 'LICENSE.md'), out);
    spinner.succeed();    
  } catch (error) {
    spinner.fail();
    console.log(error);
  }
}

async function genLicense(opts, type) {
  let currentYear = (new Date()).getFullYear();
  let license = path.join(__dirname, `../schematics/license/${type}.md`);
  try {
    let src = await fs.readFileAsync(license, 'utf8');
    let template = ejs.compile(src);
    return template({ year: currentYear, author: opts.author || 'no-author', email: opts.email });
  } catch (error) {
    console.log(error)
  }
}
