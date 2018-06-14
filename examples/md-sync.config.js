
let sshConfig = require('./md-sync.server.config');
let syncOptions = {
    ignoreErrors: true,
    sshConfig
};

module.exports = [
    {
        src: './src/**/*',
        remotePath: '/home/senntyou/space/www/ftp/src/',
        syncOptions
    },
    {
        src: './src/dir1/**/*',
        remotePath: '/home/senntyou/space/www/ftp/dir1/',
        syncOptions
    },
    {
        src: './src/dir2/**/*',
        remotePath: '/home/senntyou/space/www/ftp/dir2/',
        syncOptions
    }
];
