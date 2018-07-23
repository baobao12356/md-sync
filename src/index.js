const path = require('path');
const chalk = require('chalk');

// Ensure `data` get `projectRoot`.
require('./data');

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
    console.log(
      chalk.green(`
  md-sync finish all syncing tasks successfully.
  `)
    );
  }
});
