let sshConfig = require('./md-sync.server.config');
let syncOptions = {
  ignoreErrors: true,
  sshConfig
};

let cache = !1;

module.exports = [
  {
    src: './src/**/*',
    remotePath: '/home/senntyou/space/www/ftp/src/',
    syncOptions,
    cache
  },
  {
    src: './src/dir1/**/*',
    remotePath: '/home/senntyou/space/www/ftp/dir1/',
    syncOptions,
    cache
  },
  {
    src: './src/dir2/**/*',
    remotePath: '/home/senntyou/space/www/ftp/dir2/',
    syncOptions,
    cache
  }
];
