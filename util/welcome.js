const asciify = require('asciify');

module.exports = async function() {
  console.log('');
  const image = await asciifyPromise('Electron-cli', { color: 'green', font: '3-d' });
  console.log(image);
}

const asciifyPromise = (text, options) => {
  return new Promise((resolve, reject) => {
      asciify(text, options, (error, res) => {
          error ? reject(error) : resolve(res);
      });
  });
}