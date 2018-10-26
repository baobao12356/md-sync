const path = require('path');
const md5 = require('crypto-md5');
const PluginError = require('plugin-error');
const through = require('through2');

const data = require('./data');

module.exports = options => {
  options = options || {};

  const { filename } = options;

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new PluginError('md-sync[cache]', 'Streams are not supported!'));
      return cb();
    }

    if (!data.record[filename]) data.record[filename] = {};

    const record = data.record[filename];
    const fileDisplay = path.relative(file.base, file.path);
    const hash = md5(file.contents, 'hex');

    // changed
    if (!record[fileDisplay] || record[fileDisplay] !== hash) {
      record[fileDisplay] = hash;
      this.push(file);
      return cb();
    }

    return cb();
  });
};
