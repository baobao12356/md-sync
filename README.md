# md-sync

Multiple destinations syncing(sync local files or directories to multiple destinations).

## install

```
npm install md-sync --save-dev
```

**_package.json_**

```
"scripts": {
  "sync": "md-sync"
}
```

## config

Add a `md-sync.config.js` file to your project root.

```
module.exports = [
  // first destination
  {
    src: [globs, options],
    remotePath: 'remotePath',
    server: {
      ignoreErrors: true,
      sshConfig: {
        host: 'host',
        username: 'username',
        password: 'password'
      }
    },
  },
  // second destination
  ...
];
```

1.  `src`: [gulp src](https://github.com/gulpjs/gulp/blob/v4.0.0/docs/API.md#gulpsrcglobs-options) args
2.  `remotePath`: remote server path
3.  `server`: options for [gulp-ssh](https://github.com/teambition/gulp-ssh)

**_multiple server environments_**

If you need to support multiple server environments(`test`, `gray`, `prod`), you can do like this:

```
# package.json

"scripts": {
  "sync:test": "md-sync --env test",
  "sync:gray": "md-sync --env gray",
  "sync:prod": "md-sync --env prod"
}
```

With [minimist](https://github.com/substack/minimist).

```
# md-sync.config.js

const argv = require('minimist')(process.argv.slice(2));

const configs = {
  test: [
    { ... },
    ...
  ],
  gray: [
    { ... },
    ...
  ],
  prod: [
    { ... },
    ...
  ],
};

module.exports = configs[argv.env];
```

## do syncing

```
npm run sync
```
