const sshConfig = require('./md-sync.server.config');

const server = {
  ignoreErrors: true,
  sshConfig,
};

module.exports = [
  {
    src: ['./src/**/*'],
    remotePath: '/home/senntyou/space/www/ftp/src/',
    server,
  },
  {
    src: ['./src/dir1/**/*'],
    remotePath: '/home/senntyou/space/www/ftp/dir1/',
    server,
  },
  {
    src: ['./src/dir2/**/*'],
    remotePath: '/home/senntyou/space/www/ftp/dir2/',
    server,
  },
];
