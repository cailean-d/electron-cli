const ora = require('ora');
const editJsonFile = require('edit-json-file');
const path = require('path');

module.exports = function (opts) {
  const spinner = ora('Editing package.json').start();
  let package = editJsonFile(path.join(opts.project_path, 'package.json'));
  package.set("name", opts.project_name);
  package.set("version", opts.version);
  package.set("main", "main.js");
  if (opts.description) package.set("description", opts.description);
  if (opts.author) package.set("author", opts.author);
  if (opts.license) package.set("license", opts.license);
  if (opts.keywords) package.set("keywords", opts.keywords.split(' '));
  if (opts.git) package.set("repository.type", "git");
  if (opts.git) package.set("repository.url", opts.git);
  package.save();
  spinner.succeed();
}