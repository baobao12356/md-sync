
const path = require('path');
const chalk = require('chalk');
const gulp = require('gulp');
const sftp = require('gulp-sftp');

/**
 * project config
 *
 * [
 *   {
 *     src: '',
 *     srcOptions: {},
 *     syncOptions: {}
 *   }
 * ]
 *
 * @type {*}
 */
let configs = require(path.join(process.cwd(), 'md-sync.config.js'));
!Array.isArray(configs) && (configs = [configs]);

let tasks = [cb => {
    console.log(chalk.green(`
    md-sync start syncing.
    `));

    cb && cb();
}];

for (let i = 0; i < configs.length; i++) {
    tasks.push(() => {
        let config = configs[i];

        return gulp.src(config.src, config.srcOptions || {})
            .pipe(sftp(config.syncOptions));
    });
}

tasks.push(cb => {
    // waiting for connection closing
    setTimeout(() => {
        console.log(chalk.green(`
    md-sync complete all syncing tasks successfully.
    `));

        cb && cb();
    }, 200);
});

gulp.series(tasks)();
