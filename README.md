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
    - [filterOutPath](#filteroutpath)
    - [extractFromArrayNotation](#extractfromarraynotation)
    - [getPathIterators](#getpathiterators)
  - [License](#license)
    - [Commercial license](#commercial-license)
    - [Open-source license](#open-source-license)
  - [Benchmarks:](#benchmarks)

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

### filterOutPath
TBC

### extractFromArrayNotation
TBC

### getPathIterators
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

name                                                opsPerSec     error  testsRan    cycles  length
--------------------------------------------------  ------------  -----  ----------  ------  ------
getStartType (empty string)                         954880478.4   0.12   48103993    8       92
getStartType (object start)                         953778419.3   0.12   48050763    8       98
getStartType (array start)                          110113594.3   0.49   5802481     10      95
getStartType (complex path) (1)                     953354248.5   0.1    48057563    6       96
getStartType (complex path) (2)                     953302562.2   0.09   47979481    6       92
getStartType (complex path) (3)                     72004349.5    0.32   3698421     6       94
getStartType (complex path) (4)                     416991862.7   0.07   20965058    6       93
explodePath (complex path) (1)                      428285        0.23   21771       4       96
explodePath (complex path) (2)                      408220.1      0.26   21592       3       95
explodePath (complex path) (3)                      449628.9      0.72   22932       3       91
explodePath (complex path) (4)                      3301315.7     0.58   173906      6       92
implodePath (complex path) (1)                      3792054.3     0.35   197862      5       95
implodePath (complex path) (2)                      3474607       0.35   180280      7       97
implodePath (complex path) (3)                      5738709.8     0.51   298694      4       92
implodePath (complex path) (4)                      6579527.1     0.35   343273      5       93
removePathLevels (complex path) (1)                 348253        0.45   17837       5       92
removePathLevels (complex path) (2)                 330963.9      0.33   16948       3       97
removePathLevels (complex path) (3)                 375752.1      0.48   19200       3       93
removePathLevels (complex path) (4)                 1016589.4     0.32   52783       3       97
getSubPaths (complex path) (1)                      236206.2      0.66   12109       5       97
getSubPaths (complex path) (2)                      218058.5      0.63   11174       3       96
getSubPaths (complex path) (3)                      324962        0.41   16685       3       94
getSubPaths (complex path) (4)                      623177.4      0.73   34992       3       90
replacePathArraysWithString (simple path) (1)       362761.3      0.54   18747       5       95
replacePathArraysWithString (simple path) (2)       803480        0.31   41275       6       94
replacePathArraysWithString (complex path) (1)      332857.1      0.57   17131       3       94
replacePathArraysWithString (complex path) (2)      319126.5      0.64   16340       3       93
replacePathArraysWithString (complex path) (3)      368790.8      0.91   19079       3       97
replacePathArraysWithString (complex path) (4)      944442.8      0.27   48496       7       97
extractFromArrayNotation (string)                   8247700.9     0.3    427474      6       96
extractFromArrayNotation (interpolation)            8020125.8     0.27   412150      6       95
extractFromArrayNotation (number)                   10666928.4    0.39   554166      9       89
getPathIterators (complex path) (1)                 131353.8      0.52   6805        4       94
getPathIterators (complex path) (2)                 120311.2      0.82   6303        3       96
getPathIterators (complex path) (3)                 206244.3      0.41   10630       6       93
getPathIterators (complex path) (4)                 238903.7      0.33   12333       5       97
getPathIterators (complex path) (1) (return array)  106796.9      0.47   5556        5       96
getPathIterators (complex path) (2) (return array)  98609.6       0.49   5108        6       95
getPathIterators (complex path) (3) (return array)  182040.9      0.35   9349        4       97
getPathIterators (complex path) (4) (return array)  205822.5      0.43   10590       7       92
Lodash.get                                          6139392.5     0.99   325734      6       92
get                                                 4338614.8     0.6    227072      8       91
Average                                             106759669.74  0.44   5387479.43  5.17    94.29
```

## Where did it come from?
Proudly built with sweat and dedication in the European Union and UK by
- Robert Dumitrescu [GitHub](https://github.com/robertdumitrescu) / [LinkedIn](https://www.linkedin.com/in/robertdumitrescu/) / [Twitter](https://twitter.com/rodumitrescu)
- Bogdan Dumitrescu [GitHub](https://github.com/practiseo) / [LinkedIn](https://www.linkedin.com/in/bodudev/)

## Miscellaneous:
[Badges](https://badge.fury.io/for/gh/robertdumitrescu/collection-path-helper)
