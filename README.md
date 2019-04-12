# Collection Path Helper
[![CircleCI](https://circleci.com/gh/robertdumitrescu/collection-path-helper.svg?style=svg)](https://circleci.com/gh/robertdumitrescu/collection-path-helper)
[![GitHub version](https://badge.fury.io/gh/robertdumitrescu%2Fcollection-path-helper.svg)](https://github.com/robertdumitrescu/collection-path-helper)
[![npm version](https://badge.fury.io/js/collection-path-helper.svg)](https://www.npmjs.com/package/collection-path-helper)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg?style=flat-square)](https://github-tools.github.io/github-release-notes/)

##### Sizes:

[![Minified](https://flat.badgen.net/bundlephobia/min/collection-path-helper)](https://bundlephobia.com/result?p=collection-path-helper)
[![Minified + GZIP](https://flat.badgen.net/bundlephobia/minzip/collection-path-helper)](https://bundlephobia.com/result?p=collection-path-helper)

## Overview

Library for collection path manipulation. Blazing fast, server and client side, lightweight and reliable. See [Benchmarks](#benchmarks) section for numbers. This library is mainly designed to work with paths that are build based on Lodash get/set methods.

Example of paths that would work with this library:

```javascript
[2].randomArrayOfObjects[2] // normal path
[2].(2, 5][2] // path with mathematical interval - exclusion start and inclustion end
[2].[2, 5][2] // path with mathematical interval - inclustion start and inclustion end
[{{x}}].randomArrayOfObjects[2] // path with interpolations
.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}] // complex path with multiple interpolations and mathematical intervals
```

Also it would work with empty paths ("") since those are valid collection paths that are pointing to the root object/array/* in the collection.

## Install

### Via NPM
To install via Node Package Manager (NPM) use the following command:

```bash
npm i collection-path-helper
```

NOTE: we guarantee compatibility down to NPM6 due to the construction that is fully synchronous, but we do use the stream api's for optimizations

### Via Yarn
To install via Yarn use the following command:

```bash
yarn add collection-path-helper
```

#### Available methods
- [Collection Path Helper](#collection-path-helper)
        - [Sizes:](#sizes)
  - [Overview](#overview)
  - [Install](#install)
    - [Via NPM](#via-npm)
    - [Via Yarn](#via-yarn)
      - [Available methods](#available-methods)
  - [Methods](#methods)
    - [getStartType](#getstarttype)
        - [Arguments](#arguments)
        - [Returns](#returns)
        - [Examples](#examples)
          - [Undefined path](#undefined-path)
          - [Empty string path](#empty-string-path)
          - [Path starting with array notation](#path-starting-with-array-notation)
          - [Path starting with object notation](#path-starting-with-object-notation)
          - [Path fragment which is array notation](#path-fragment-which-is-array-notation)
          - [Path fragment which is object notation](#path-fragment-which-is-object-notation)
    - [explodePath](#explodepath)
        - [Arguments](#arguments-1)
        - [Returns](#returns-1)
        - [Examples](#examples-1)
          - [Empty string path](#empty-string-path-1)
          - [Multiple consecutive object notations path](#multiple-consecutive-object-notations-path)
          - [Multiple consecutive array notations path](#multiple-consecutive-array-notations-path)
          - [Complex path with mixed notations, interpolations and mathematical notations](#complex-path-with-mixed-notations-interpolations-and-mathematical-notations)
    - [implodePath](#implodepath)
        - [Arguments](#arguments-2)
        - [Returns](#returns-2)
        - [Examples](#examples-2)
          - [Empty string path](#empty-string-path-2)
          - [Multiple consecutive object notations path](#multiple-consecutive-object-notations-path-1)
          - [Multiple consecutive array notations path](#multiple-consecutive-array-notations-path-1)
          - [Complex path with mixed notations, interpolations and mathematical notations](#complex-path-with-mixed-notations-interpolations-and-mathematical-notations-1)
    - [removePathLevels](#removepathlevels)
    - [getSubPaths](#getsubpaths)
    - [replacePathArraysWithString](#replacepatharrayswithstring)
  - [License](#license)
    - [Commercial license](#commercial-license)
    - [Open-source license](#open-source-license)
  - [Benchmarks:](#benchmarks)
  - [Where did it come from?](#where-did-it-come-from)
  - [Miscellaneous:](#miscellaneous)

## Methods


### getStartType
For a given collection path or for a string path fragment it will return the type of it or the type of the first fragment within the path.
It uses path explosion to separate various elements and then evaluates what type is the fragment in cause.

##### Arguments

- {String} (Default: "") path

##### Returns

It returns as a {String} one of the following values:
- "object" if the first fragment is pointing to an object
- "array" if the first fragment is pointing to an array
- "unknown" if path is not a string, or if the path is an empty string

##### Examples

###### Undefined path
```javascript
const PathHelper = require('collection-path-helper').PathHelper;

const path = undefined;
let result = PathHelper.getStartType(path);
console.log(result);
// =>>>> It will return "unknown"
```

###### Empty string path
```javascript
const PathHelper = require('collection-path-helper').PathHelper;

const path = '';
let result = PathHelper.getStartType(path);
console.log(result);
// =>>>> It will return "unknown"
```

###### Path starting with array notation
```javascript
const PathHelper = require('collection-path-helper').PathHelper;

const path = '[2].randomArrayOfObjects[2]';
let result = PathHelper.getStartType(path);
console.log(result);
// =>>>> It will return "array"
```

###### Path starting with object notation
```javascript
const PathHelper = require('collection-path-helper').PathHelper;

const path = '.randomArrayOfObjects[2]';
let result = PathHelper.getStartType(path);
console.log(result);
// =>>>> It will return "object"
```

###### Path fragment which is array notation
```javascript
const PathHelper = require('collection-path-helper').PathHelper;

const path = '[2]';
let result = PathHelper.getStartType(path);
console.log(result);
// =>>>> It will return "array"
```

###### Path fragment which is object notation
```javascript
const PathHelper = require('collection-path-helper').PathHelper;

const path = '.randomArrayOfObjects';
let result = PathHelper.getStartType(path);
console.log(result);
// =>>>> It will return "object"
```
### explodePath
For a given collection path, it returns an array of exploded path fragments.
This is mainly based on the Lodash internal stringToPath method which can be found here: [stringToPath](https://github.com/lodash/lodash/blob/master/.internal/stringToPath.js)
The big difference between the two is that this one supports string interpolations and mathematical notations such as intervals (inclusion, exclusion and mixed ones) whereas theirs don't.
Also if the path is not defined or is an empty string, an empty array will be returned.

##### Arguments

- {String} (Default: "") path

##### Returns

It returns as a {String[]} path fragments.

##### Examples

###### Empty string path
```javascript
const PathHelper = require('collection-path-helper').PathHelper;

const path = '';
let result = PathHelper.explodePath(path);
console.log(result);
// =>>>> It will return []
```

###### Multiple consecutive object notations path
```javascript
const PathHelper = require('collection-path-helper').PathHelper;

const path = '.lorem.ipsum.dolor.sit.amet';
let result = PathHelper.explodePath(path);
console.log(result);
// =>>>> It will return ['lorem', 'ipsum', 'dolor', 'sit', 'amet']
```

###### Multiple consecutive array notations path
```javascript
const PathHelper = require('collection-path-helper').PathHelper;

const path = '[0][0][2][3][5]';
let result = PathHelper.explodePath(path);
console.log(result);
// =>>>> It will return ['[0]', '[0]', '[2]', '[3]', '[5]']
```

###### Complex path with mixed notations, interpolations and mathematical notations
```javascript
const PathHelper = require('collection-path-helper').PathHelper;

const path = '.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]';
let result = PathHelper.explodePath(path);
console.log(result);
// =>>>> It will return ['lorem', '[2]', '{{ipsum}}', '[3]', 'dolor', '[{{sit}}]', '[2, 3)', '[2]', '(2, 3)', '({{consecteur}},3]', '[2, {{amet}}]']
```


### implodePath
Literally the opposite of [explodePath](#explodepath). For a given array of path fragments, it will return a composed (imploded) collection route/path.
INFO: If you pass a path like this '.lorem.ipsum.dolor' to explodePath and you get ['lorem', 'ipsum', 'dolor'], and pass this array back to implodePath, the method will return "lorem.ipsum.dolor".
This happens because the dot at the start is usually a parsing shortcoming rather than being part of the standard way of defining collection routes.

##### Arguments

- {String[]} (Default: "") pathFragments

##### Returns

It returns a path as a {String}.

##### Examples

###### Empty string path
```javascript
const PathHelper = require('collection-path-helper').PathHelper;

const pathFragments = [];
let result = PathHelper.implodePath(pathFragments);
console.log(result);
// =>>>> It will return ""
```

###### Multiple consecutive object notations path
```javascript
const PathHelper = require('collection-path-helper').PathHelper;

const pathFragments = ['lorem', 'ipsum', 'dolor', 'sit', 'amet'];
let result = PathHelper.implodePath(pathFragments);
console.log(result);
// =>>>> It will return "lorem.ipsum.dolor.sit.amet"
```

###### Multiple consecutive array notations path
```javascript
const PathHelper = require('collection-path-helper').PathHelper;

const pathFragments = ['[0]', '[0]', '[2]', '[3]', '[5]'];
let result = PathHelper.implodePath(pathFragments);
console.log(result);
// =>>>> It will return "[0][0][2][3][5]"
```

###### Complex path with mixed notations, interpolations and mathematical notations
```javascript
const PathHelper = require('collection-path-helper').PathHelper;

const pathFragments = ['lorem', '[2]', '{{ipsum}}', '[3]', 'dolor', '[{{sit}}]', '[2, 3)', '[2]', '(2, 3)', '({{consecteur}},3]', '[2, {{amet}}]'];
let result = PathHelper.implodePath(pathFragments);
console.log(result);
// =>>>> It will return "lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]"
```


### removePathLevels
TBC

### getSubPaths
TBC

### replacePathArraysWithString
TBC


## License

### Commercial license
Although the libraries are completely free, if you are using them in projects that generate revenue, please consider donating to keep them free for the future and for other developers. You can do this via the following methods:
- [Donate on Patreon](https://www.patreon.com/robertdumitrescu)

### Open-source license
This library is free for personal and non-commercial use under the GNU AGPLv3.

## Benchmarks:

The following results were obtained running the benchmarks on the following configuration:

- Processor: **Intel® Core™i7 Quad Core Processor i7-6700k (4.0GHz) 8MB Cache**
- RAM: **64GB HyperX IMPACT 2400MHz SODIMM DDR4 (4 x 16GB)**
- Graphics Card: **NVIDIA® GeForce® GTX 1080 - 8.0GB GDDR5 Video RAM**
- Storage: **256GB SAMSUNG SM961 M.2, PCIe NVMe (up to 3100MB/R, 1400MB/W)**
- OS: **64 bit *nix based OS**

```javascript
name                                            opsPerSec    error  testsRan    cycles  length
----------------------------------------------  -----------  -----  ----------  ------  ------
getStartType (empty string)                     958755179.1  0.11   48315046    6       99
getStartType (object start)                     198495861.1  0.28   10035291    6       92
getStartType (array start)                      66854952.5   0.87   3491450     6       89
getStartType (complex path) (1)                 415418628.8  0.3    20994108    6       96
getStartType (complex path) (2)                 415905245.5  0.28   20991778    7       95
getStartType (complex path) (3)                 68724726.5   0.43   3530065     7       95
getStartType (complex path) (4)                 415635099.4  0.31   21026318    6       99
explodePath (complex path) (1)                  430502.8     0.38   21883       4       96
explodePath (complex path) (2)                  410008.3     0.55   22044       3       93
explodePath (complex path) (3)                  458262.2     0.27   24617       3       94
explodePath (complex path) (4)                  3243170.7    0.84   168553      6       94
implodePath (complex path) (1)                  2299377      0.63   119499      5       85
implodePath (complex path) (2)                  2097520.7    1.07   110925      6       94
implodePath (complex path) (3)                  3310430.3    0.96   177971      6       90
implodePath (complex path) (4)                  4424384.8    1.02   234918      4       93
removePathLevels (complex path) (1)             310501.3     0.37   15954       5       91
removePathLevels (complex path) (2)             287284.2     1.06   15258       3       94
removePathLevels (complex path) (3)             319570.2     1.39   18157       3       89
removePathLevels (complex path) (4)             923437.3     0.8    50180       3       93
getSubPaths (complex path) (1)                  165839.6     0.96   8650        5       94
getSubPaths (complex path) (2)                  155422.2     0.41   8120        4       96
getSubPaths (complex path) (3)                  253834.6     1.29   14308       3       89
getSubPaths (complex path) (4)                  439624.9     0.76   23319       5       90
replacePathArraysWithString (simple path) (1)   334053.2     0.83   17152       4       96
replacePathArraysWithString (simple path) (2)   756796.2     0.62   39676       3       96
replacePathArraysWithString (complex path) (1)  289301.2     1.93   16513       3       88
replacePathArraysWithString (complex path) (2)  280882.9     0.86   15584       3       91
replacePathArraysWithString (complex path) (3)  333775.8     1.15   17735       4       90
replacePathArraysWithString (complex path) (4)  890591       1.03   49206       3       91
Lodash.get                                      6099310.1    1.18   327371      7       90
get                                             4383100.5    0.38   224738      6       94
Average                                         82989892.74  0.75   4197625.39  4.68    92.77
```

## Where did it come from?
Proudly built with sweat and dedication in European Union (E.U) by
- Robert Dumitrescu [GitHub](https://github.com/robertdumitrescu) / [LinkedIn](https://www.linkedin.com/in/robertdumitrescu/) / [Twitter](https://twitter.com/rodumitrescu)
- Bogdan Dumitrescu [GitHub](https://github.com/practiseo) / [LinkedIn](https://www.linkedin.com/in/bodudev/)

## Miscellaneous:
[Badges](https://badge.fury.io/for/gh/robertdumitrescu/collection-path-helper)