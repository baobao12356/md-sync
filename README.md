# md-sync

Multiple destinations syncing(sync local files or directories to multiple destinations).

## note

1. Currently, only support [gulp-ssh](https://github.com/teambition/gulp-ssh).

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
        }
    },
    // second destination
    ...
];
```

1. `src`: [gulp src](https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md)
2. `remotePath`: Remote server path.
3. `srcOptions`: [gulp src options](https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md)
4. `syncOptions`: Options for initializing syncing, see [gulp-ssh](https://github.com/teambition/gulp-ssh).

## do syncing

```
npm run sync
```
