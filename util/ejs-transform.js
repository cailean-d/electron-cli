const { Transform } = require('stream');
const ejs = require('ejs');

module.exports = class EjsTransform extends Transform {

  constructor(opts) {
    super();
    this.options = opts;
  }

  _transform(chunk, encoding, callback) {
    let template = ejs.compile(chunk.toString());
    let out = template({ 
      comments: this.options.comments, 
      default_menu: this.options.default_menu, 
      dev_tools: this.options.dev_tools
    });
    this.push(out);
    callback();
  }
}
