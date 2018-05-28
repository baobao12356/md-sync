
let syncOptions = require('./md-sync.server.config');

module.exports = [
    {
        src: './src/**/*',
        syncOptions: {
            ...syncOptions,
            remotePath: '/home/senntyou/space/www/ftp/src/'
        }
    },
    {
        src: './src/dir1/**/*',
        syncOptions: {
            ...syncOptions,
            remotePath: '/home/senntyou/space/www/ftp/dir1/'
        }
    },
    {
        src: './src/dir2/**/*',
        syncOptions: {
            ...syncOptions,
            remotePath: '/home/senntyou/space/www/ftp/dir2/'
        }
    }
];
