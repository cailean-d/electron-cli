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
      dev_tools: this.options.dev_tools,
      lang: this.options.lang,
      framework: this.options.project_type,
      name: this.options.project_name,
      angular_path: this.options.angular_path,
    });
    this.push(out);
    callback();
  }
}
