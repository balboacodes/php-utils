# PHP Utils

[![publish](https://github.com/balboacodes/php-utils/actions/workflows/publish.yml/badge.svg)](https://github.com/balboacodes/php-utils/actions/workflows/publish.yml)

## About PHP Utils

PHP Utils is a fully-typed collection of native PHP functions ported to TypeScript. It was originally developed as part of [Stringable](https://github.com/balboacodes/stringable), but is now a standalone package. Some functions do not include all the functionality of their native versions, so if you see something missing or would like another function added, please submit a [pull request](https://github.com/balboacodes/php-utils/pulls)! The full list of functions is too many to list here, but you can check out the [src](https://github.com/balboacodes/php-utils/blob/main/src/index.ts) file and do a simple search to see what's available.

## Installation

`npm i @balboacodes/php-utils`

## Usage

```ts
import { preg_split } from @balboacodes/php-utils;

const parts = preg_split('/[\\s,]+/', 'hypertext language, programming'); // ['hypertext', 'language', 'programming']
```

## Related

If you like this package, be sure to check out our [other packages](https://www.npmjs.com/~balboacodes).
