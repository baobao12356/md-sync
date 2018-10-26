import path from 'path';

const { join } = path;

export const cwd = process.cwd();
export const tmp = join(cwd, '.md-sync');
