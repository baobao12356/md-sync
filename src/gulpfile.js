const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const gulp = require('gulp');
const SSH = require('gulp-ssh');
const fse = require('fs-extra');

const pre = require('./pre');
const data = require('./data');
const cache = require('./cache');

fse.ensureDirSync(data.workspace);

// Pre-get existed cache records.
fs.readdirSync(data.workspace).filter(file => {
  data.record[file.split('.')[0]] = require(path.join(data.workspace, file));
});

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
  tasks.push(pre(configs[i].syncOptions.sshConfig.host), () => {
    let config = configs[i];

    let connect = new SSH(config.syncOptions);

    if (config.cache) {
      // Ensure `record[i]`.
      if (!data.record[i]) data.record[i] = {};

      return gulp
        .src(config.src, config.srcOptions || {})
        .pipe(cache({ mark: i }))
        .pipe(connect.dest(config.remotePath));
    }

    return gulp.src(config.src, config.srcOptions || {}).pipe(connect.dest(config.remotePath));
  });
}

tasks.push(cb => {
  console.log(
    chalk.green(`
  md-sync finish all syncing tasks successfully.
  `)
  );

  cb && cb();
});

gulp.task('md-sync', gulp.series(tasks));
