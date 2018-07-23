const chalk = require('chalk');

module.exports = host => {
  return cb => {
    console.log(
      chalk.green(`
  md-sync start syncing to ${host}.
  `)
    );

    cb();
  };
};
