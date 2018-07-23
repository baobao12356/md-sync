const path = require('path');

module.exports = {
  projectRoot: process.cwd(),
  workspace: path.join(process.cwd(), '.md-sync'),
  record: {
    // mark -> json
  },
};
