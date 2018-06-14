
const path = require('path');
const chalk = require('chalk');
const gulp = require('gulp');
const SSH = require('gulp-ssh');

/**
 * Project config.
 *
 * [
 *   {
 *     src: '',
 *     remotePath: '',
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

        let connect = new SSH(config.syncOptions);

        return gulp.src(config.src, config.srcOptions || {})
            .pipe(connect.dest(config.remotePath));
    });
}

tasks.push(cb => {
    console.log(chalk.green(`
    md-sync finish all syncing tasks successfully.
    `));

    cb && cb();
});

gulp.series(tasks)();
