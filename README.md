# md-sync

Multiple destinations syncing(sync local files or directories to multiple destinations).

## note

1.  Currently, only support [gulp-ssh](https://github.com/teambition/gulp-ssh).

## install

```
npm install --save-dev md-sync
```

## add command

```
# package.json

"scripts": {
    "sync": "md-sync"
}
```

## add config

Add `md-sync.config.js` file to your project root.

```
module.exports = [
    // first destination
    {
        src: './src/**/*',
        remotePath: 'remotePath',
        srcOptions: {
            ...
        },
        syncOptions: {
            ignoreErrors: true,
            sshConfig: {
                host: 'host',
                username: 'username',
                password: 'password'
            }
        },
        cache: true
    },
    // second destination
    ...
];
```

1.  `src`: [gulp src](https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md)
2.  `remotePath`: Remote server path.
3.  `srcOptions`: [gulp src options](https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md)
4.  `syncOptions`: Options for initializing syncing, see [gulp-ssh](https://github.com/teambition/gulp-ssh).
5.  `cache`: Whether cache files' changing record, thus next time only upload changed files.

## update `.gitignore`

```
# ignore md-sync workspace

.md-sync
```

## multiple server environments

If you need to support multiple server environments(test, gray, prod), you can do like this:

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

const envOptions = {
  test: testOptions,
  gray: grayOptions,
  prod: prodOptions
};

module.exports = envOptions[argv.env];
```

## do syncing

```
npm run sync
```
