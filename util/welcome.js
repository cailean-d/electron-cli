const asciify = require('asciify');
const util = require('util');

const asciifyPromise = util.promisify(asciify);

module.exports = async function() {
  console.log('');
  const ascii_image = await asciifyPromise('Electron-cli', { color: 'green', font: '3-d' });
  console.log(ascii_image);
}