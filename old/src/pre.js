const chalk = require('chalk');

module.exports = host => {
  return function md_sync_pre(cb) {
    console.log(
      chalk.green(`
  md-sync start syncing to ${host}.
  `)
    );

    cb();
  };
};
