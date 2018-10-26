const path = require('path');
const chalk = require('chalk');
const fse = require('fs-extra');

// Ensure `data` get `projectRoot`.
const data = require('./data');

console.log(
  chalk.green(`
  md-sync start syncing.
  `)
);

const argv = process.argv;

process.argv = [argv[0], argv[1], 'md-sync', '--gulpfile', path.join(__dirname, 'gulpfile.js')];

require('gulp-cli')(err => {
  if (err) {
    console.error(
      chalk.red(`
  Error occurred, you should resolve those errors, and try again.
  `)
    );
    console.error(chalk.red(err.stack || err));
  } else {
    // Flush record to file.
    Object.keys(data.record).forEach(key => {
      fse.outputFileSync(path.join(data.workspace, `${key}.json`), JSON.stringify(data.record[key] || {}));
    });

    console.log(
      chalk.green(`
  md-sync finish all syncing tasks successfully.
  `)
    );
  }
});
