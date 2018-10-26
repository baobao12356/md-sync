let sshConfig = require('./md-sync.server.config');
let syncOptions = {
  ignoreErrors: true,
  sshConfig
};

let cache = undefined;
let cacheFile = 'cache-[index].json';
// let cacheFile = undefined;

module.exports = [
  {
    src: './src/**/*',
    remotePath: '/home/senntyou/space/www/ftp/src/',
    syncOptions,
    cache,
    cacheFile
  },
  {
    src: './src/dir1/**/*',
    remotePath: '/home/senntyou/space/www/ftp/dir1/',
    syncOptions,
    cache,
    cacheFile
  },
  {
    src: './src/dir2/**/*',
    remotePath: '/home/senntyou/space/www/ftp/dir2/',
    syncOptions,
    cache,
    cacheFile
  }
];
