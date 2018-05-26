
const path = require('path');
const ftp = require('vinyl-ftp');

const defaultSrcOption = { buffer: false };

/**
 * project config
 *
 * [
 *   {
 *     src: '',
 *     srcOption: {},
 *     dest: '',
 *     ftpOption: {}
 *   }
 * ]
 *
 * @type {*}
 */
let configs = require(path.join(process.cwd(), 'md-sync.config.js'));
!Array.isArray(configs) && (configs = [configs]);

const connections = [];
configs.forEach(item => {
    connections.push(ftp.create(item.ftpOption));
});

// current running connection index
let runIndex = 0;
let run = () => {
    let conn = connections[runIndex];
    let config = configs[runIndex];

    conn.src(config.src, config.srcOption || defaultSrcOption)
        .pipe(conn.dest(config.dest))
        .on('end', () => {
            // is the last conn
            if (runIndex >= configs.length - 1) return;

            runIndex += 1;
            run();
        });
};

run();
