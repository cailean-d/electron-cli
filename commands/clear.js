const colors = require('colors');
const editJsonFile = require('edit-json-file');
const path = require('path');

module.exports = function() {
  clearPath();
  console.log('\nList of projects are successfully cleared'.green);
}

function clearPath() {
  let tmpPath = editJsonFile(path.join(__dirname, './../tmp/path.json'));
  let tmp_obj = tmpPath.toObject();
  tmp_obj.projects = [];
  tmpPath.set("projects", tmp_obj);
  tmpPath.save();
}
