# PHP Utils

[![publish](https://github.com/balboacodes/php-utils/actions/workflows/publish.yml/badge.svg)](https://github.com/balboacodes/php-utils/actions/workflows/publish.yml)

## About PHP Utils

PHP Utils is a fully-typed collection of native PHP functions ported to TypeScript. It was originally developed as part of [Stringable](https://github.com/balboacodes/stringable), but is now a standalone package. Some functions do not include all the functionality of their native versions, so if you see something missing or would like another function added, please submit a [pull request](https://github.com/balboacodes/php-utils/pulls)! You can find the full list of functions included [below](#functions).

## Installation

`npm i @balboacodes/php-utils`

## Usage

```ts
import { preg_split } from @balboacodes/php-utils;

const parts = preg_split('/[\\s,]+/', 'hypertext language, programming'); // ['hypertext', 'language', 'programming']
```

## Functions

- [array_filter](https://php.net/manual/en/function.array-filter.php)
- [array_map](https://php.net/manual/en/function.array-map.php)
- [array_reduce](https://php.net/manual/en/function.array-reduce.php)
- [array_reverse](https://php.net/manual/en/function.array-reverse.php)
- [array_shift](https://php.net/manual/en/function.array-shift.php)
- [base64_decode](https://php.net/manual/en/function.base64-decode.php)
- [base64_encode](https://php.net/manual/en/function.base64-encode.php)
- [basename](https://php.net/manual/en/function.basename.php)
- [ceil](https://php.net/manual/en/function.ceil.php)
- [count](https://php.net/manual/en/function.count.php)
- [ctype_lower](https://php.net/manual/en/function.ctype-lower.php)
- [dirname](https://php.net/manual/en/function.dirname.php)
- [empty](https://www.php.net/manual/en/function.empty.php)
- [explode](https://php.net/manual/en/function.explode.php)
- [filter_var](https://php.net/manual/en/function.filter-var.php)
- [hash](https://php.net/manual/en/function.hash.php)
- [implode](https://php.net/manual/en/function.implode.php)
- [in_array](https://php.net/manual/en/function.in-array.php)
- [isset](https://www.php.net/manual/en/function.isset.php)
- [lcfirst](https://php.net/manual/en/function.lcfirst.php)
- [ltrim](https://php.net/manual/en/function.ltrim.php)
- [max](https://php.net/manual/en/function.max.php)
- [mb_convert_case](https://php.net/manual/en/function.mb-convert-case.php)
- [mb_split](https://php.net/manual/en/function.mb-split.php)
- [mb_str_pad](https://www.php.net/manual/en/function.mb-str-pad.php)
- [mb_str_split](https://www.php.net/manual/en/function.mb-str-split.php)
- [mb_strimwidth](https://php.net/manual/en/function.mb-strimwidth.php)
- [mb_strlen](https://php.net/manual/en/function.mb-strlen.php)
- [mb_strpos](https://php.net/manual/en/function.mb-strpos.php)
- [mb_strrpos](https://php.net/manual/en/function.mb-strrpos.php)
- [mb_strtolower](https://php.net/manual/en/function.mb-strtolower.php)
- [mb_strtoupper](https://php.net/manual/en/function.mb-strtoupper.php)
- [mb_strwidth](https://php.net/manual/en/function.mb-strwidth.php)
- [mb_substr](https://php.net/manual/en/function.mb-substr.php)
- [preg_match](https://php.net/manual/en/function.preg-match.php)
- [preg_match_all](https://php.net/manual/en/function.preg-match-all.php)
- [preg_quote](https://php.net/manual/en/function.preg-quote.php)
- [preg_replace](https://php.net/manual/en/function.preg-replace.php)
- [preg_replace_callback](https://php.net/manual/en/function.preg-replace-callback.php)
- [preg_split](https://php.net/manual/en/function.preg-split.php)
- [random_bytes](https://php.net/manual/en/function.random-bytes.php)
- [random_int](https://php.net/manual/en/function.random-int.php)
- [rtrim](https://php.net/manual/en/function.rtrim.php)
- [sscanf](https://php.net/manual/en/function.sscanf.php)
- [str_contains](https://www.php.net/manual/en/function.str-contains.php)
- [str_ends_with](https://www.php.net/manual/en/function.str-ends-with.php)
- [str_ireplace](https://php.net/manual/en/function.str-ireplace.php)
- [str_repeat](https://php.net/manual/en/function.str-repeat.php)
- [str_replace](https://php.net/manual/en/function.str-replace.php)
- [str_starts_with](https://php.net/manual/en/function.str-starts-with.php)
- [str_word_count](https://php.net/manual/en/function.str-word-count.php)
- [strip_tags](https://php.net/manual/en/function.strip-tags.php)
- [strlen](https://php.net/manual/en/function.strlen.php)
- [strpos](https://php.net/manual/en/function.strpos.php)
- [strrpos](https://php.net/manual/en/function.strrpos.php)
- [strstr](https://php.net/manual/en/function.strstr.php)
- [strtr](https://php.net/manual/en/function.strtr.php)
- [substr](https://php.net/manual/en/function.substr.php)
- [substr_count](https://php.net/manual/en/function.substr-count.php)
- [substr_replace](https://php.net/manual/en/function.substr-replace.php)
- [trim](https://php.net/manual/en/function.trim.php)
- [ucwords](https://php.net/manual/en/function.ucwords.php)
- [wordwrap](https://php.net/manual/en/function.wordwrap.php)
