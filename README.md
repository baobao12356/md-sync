# md-sync

Multiple destinations syncing(sync local files or directories to multiple destinations).

## note

1. Currently, only support `sftp` protocol.

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

In `md-sync.config.js` of project root.

```
module.exports = [
    // first destination
    {
        src: './src/**/*',
        srcOptions: {
            ...
        },
        syncOptions: {
            host: 'host',
            user: 'user',
            pass: 'pass',
            remotePath: 'remotePath',
            ...
        }
    },
    // second destination
    ...
];
```

1. `src`: [gulp src](https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md)
2. `srcOptions`: [gulp src options](https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md)
3. `syncOptions`: options for initializing syncing
    1. `sftp`: [gulp sftp](https://github.com/gtg092x/gulp-sftp)

## do syncing

```
npm run sync
```
