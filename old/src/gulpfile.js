const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const SSH = require('gulp-ssh');
const fse = require('fs-extra');

const pre = require('./pre');
const post = require('./post');
const data = require('./data');
const cache = require('./cache');

if (fs.existsSync(data.workspace)) {
  // Pre-get existed cache records.
  fs.readdirSync(data.workspace).filter(file => {
    data.record[file.slice(0, -5)] = require(path.join(data.workspace, file));
  });
}

/**
 * Project config.
 *
 * [
 *   {
 *     src: '',
 *     remotePath: '',
 *     srcOptions: {},
 *     syncOptions: {},
 *     cache: true/false, // default: true
 *     cacheFile: '[index].json', // default: '[index].json'
 *   }
 * ]
 *
 * @type {*}
 */
let configs = require(path.join(data.projectRoot, 'md-sync.config.js'));
!Array.isArray(configs) && (configs = [configs]);

configs.forEach((item, index) => {
  if (typeof item.cache === 'undefined') item.cache = !0;
  if (typeof item.cacheFile === 'undefined') item.cacheFile = '[index].json';

  if (item.cacheFile.slice(-5) === '.json') item.cacheFile = item.cacheFile.slice(0, -5);

  item.cacheFile = item.cacheFile.replace('[index]', index);
});

let tasks = [];

for (let i = 0; i < configs.length; i++) {
  let config = configs[i];

  tasks.push(
    pre(config.syncOptions.sshConfig.host),
    function md_sync_upload() {
      // `gulp-cli` will modify process.cwd().
      config.src = path.join(data.projectRoot, config.src);

      let connect = new SSH(config.syncOptions);

      if (config.cache) {
        fse.ensureDirSync(data.workspace);

        // Ensure `record[i]`.
        if (!data.record[i]) data.record[i] = {};

        return gulp
          .src(config.src, config.srcOptions || {})
          .pipe(cache({ filename: config.cacheFile }))
          .pipe(connect.dest(config.remotePath));
      }

      return gulp.src(config.src, config.srcOptions || {}).pipe(connect.dest(config.remotePath));
    },
    post(config)
  );
}

gulp.task('md-sync', gulp.series(tasks));
