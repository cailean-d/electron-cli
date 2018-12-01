const asciify = require('asciify');
const util = require('util');

const asciifyPromise = util.promisify(asciify);

module.exports = async function() {
  console.log('');
  const ascii_image = await asciifyPromise('Electron CLI', { color: 'green', font: 'big' });
  console.log(ascii_image);
}