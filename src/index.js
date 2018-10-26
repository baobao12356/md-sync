import commander from 'commander';
import gulp from 'gulp';
import SSH from 'gulp-ssh';

import pkg from '../package.json';
import { cwd } from './app';
import runTask from './run';
import { log } from './logger';

const run = () => {
  const config = require(`${cwd}/md-sync.config.js`); // eslint-disable-line
  const configs = Array.isArray(config) ? config : [config];

  const tasks = [];

  configs.forEach(({ src, remotePath, server }, index) => {
    const name = `sync:${index + 1}`;

    gulp.task(name, () => {
      const connect = new SSH(server);

      return gulp.src(...src).pipe(connect.dest(remotePath));
    });

    tasks.push(name);
  });

  gulp.task('sync', gulp.series(...tasks));

  runTask('sync', () => {
    log(`
  done syncing
    `);
  });
};

commander
  .version(pkg.version)
  .allowUnknownOption()
  .action(run);

commander.parse(process.argv);
