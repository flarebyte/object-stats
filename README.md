# object-stats

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Downloads][download-badge]][npm-url]

> Analyse a javascript object to provide a statistical analysis of it

## Install

```sh
npm i -D object-stats
```

## Usage

```js
import objectStats from "object-stats"
const obj ={
    author:
    name: 'Charles Dickens',
    email: 'charles.dickens@website.com',
    url: 'http://charles-dickens.com'
  };

const stats = objectStats().analyse(obj); //some statistics
```

# Development Workflow

* Add code to `src/index.js` and tests to `test/index.js`.
* Lint, build and test a project with `npm run build`.
* Build and watch changes in `src/` with `npm run watch`
* Run only tests with `npm run test`.
* Check coverage with `npm run coverage`.
* Generate a TOC for the `CHANGELOG` with `npm run toc`
* Deploy to a remote origin with `npm run deploy`.
* Bump version and publish a package with `npm run major` or `minor/patch`

# TODO
 * Review code and check are the missing features

## License

MIT © [Olivier Huin](http://github.com/flarebyte)

[npm-url]: https://npmjs.org/package/object-stats
[npm-image]: https://img.shields.io/npm/v/object-stats.svg?style=flat-square

[travis-url]: https://travis-ci.org/flarebyte/object-stats
[travis-image]: https://img.shields.io/travis/flarebyte/object-stats.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/flarebyte/object-stats
[coveralls-image]: https://img.shields.io/coveralls/flarebyte/object-stats.svg?style=flat-square

[depstat-url]: https://david-dm.org/flarebyte/object-stats
[depstat-image]: https://david-dm.org/flarebyte/object-stats.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/object-stats.svg?style=flat-square
