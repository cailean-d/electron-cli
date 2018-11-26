const colors = require('colors');
const fs = require('fs');
const path = require('path');

const pathx = path.join(__dirname, './../tmp');

module.exports = function() {
  try {
    if (fs.existsSync(pathx)) {
      fs.readdirSync(pathx).forEach((file) => {
        fs.unlinkSync(path.join(pathx, file));
      })
      fs.rmdirSync(pathx);
      console.log('\nTemp files are successfully deleted.'.green);
    } else {
      console.log('\nThere aren\'t temp files.'.red);
    }
  } catch (error) {
    console.log(error);
  }
}
