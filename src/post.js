const path = require('path');
const fse = require('fs-extra');

const data = require('./data');

module.exports = config => {
  return function md_sync_post(cb) {
    if (config.cache) {
      fse.outputFileSync(
        path.join(data.workspace, `${config.cacheFile}.json`),
        JSON.stringify(data.record[config.cacheFile] || {})
      );
    }

    cb();
  };
};
