# JSS plugin that caches the rules.

This plugin will cache every rule and not recreate it over and over. It gives you insane performance.

It should be used as a __first__ plugin, to bail out before any unnecessary work is done!!!

## Caveats

1. When using it server-side - make sure you use a new JSS instance + setup for each request, because otherwise the memory footprint will grow accordingly the amount of new styles on every request.

1. If your `styles` objects are not static, they won't be cached. It adds a flag to the object to identify it and reuse a rule.

1. It expects you don't mutate your `styles`.

Make sure you read [how to use
plugins](https://github.com/cssinjs/jss/blob/master/docs/setup.md#setup-with-plugins)
in general.

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/cssinjs/lobby)

## Issues

File a bug against [cssinjs/jss prefixed with \[jss-cache\]](https://github.com/cssinjs/jss/issues/new?title=[jss-cache]%20).

## Run tests

```bash
npm i
npm run test
```

## License

MIT
