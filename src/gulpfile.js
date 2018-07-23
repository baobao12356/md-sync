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
    data.record[file.split('.')[0]] = require(path.join(data.workspace, file));
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
 *     syncOptions: {}
 *     cache: true/false
 *   }
 * ]
 *
 * @type {*}
 */
let configs = require(path.join(data.projectRoot, 'md-sync.config.js'));
!Array.isArray(configs) && (configs = [configs]);

let tasks = [];

for (let i = 0; i < configs.length; i++) {
  tasks.push(
    pre(configs[i].syncOptions.sshConfig.host),
    function md_sync_upload() {
      let config = configs[i];

      // `gulp-cli` will modify process.cwd().
      config.src = path.join(data.projectRoot, config.src);

      let connect = new SSH(config.syncOptions);

      if (config.cache) {
        fse.ensureDirSync(data.workspace);

        // Ensure `record[i]`.
        if (!data.record[i]) data.record[i] = {};

        return gulp
          .src(config.src, config.srcOptions || {})
          .pipe(cache({ mark: i }))
          .pipe(connect.dest(config.remotePath));
      }

      return gulp.src(config.src, config.srcOptions || {}).pipe(connect.dest(config.remotePath));
    },
    post(configs[i], i)
  );
}

gulp.task('md-sync', gulp.series(tasks));
