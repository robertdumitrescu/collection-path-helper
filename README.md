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

```text
name                                                 opsPerSec    error  testsRan    cycles  length
---------------------------------------------------  -----------  -----  ----------  ------  ------
getStartType (empty string)                          945144515.5  0.24   47970031    7       94    
getStartType (object start)                          950588409.2  0.12   47888952    7       96    
getStartType (array start)                           106863541.3  0.53   5633201     7       90    
getStartType (complex path) (1)                      947489062.5  0.2    47879421    6       93    
getStartType (complex path) (2)                      948591546.4  0.13   47906246    8       95    
getStartType (complex path) (3)                      70311894.9   0.38   3649623     6       95    
getStartType (complex path) (4)                      414879395.9  0.13   20901102    9       97    
explodePath (complex path) (1)                       419294.2     0.36   21517       4       93    
explodePath (complex path) (2)                       399098.1     0.46   21363       3       94    
explodePath (complex path) (3)                       421099.4     0.59   22654       4       93    
explodePath (complex path) (4)                       3222742.2    0.48   167079      6       91    
implodePath (complex path) (1)                       3646287.6    0.75   191886      6       95    
implodePath (complex path) (2)                       3379090.2    0.38   176387      6       94    
implodePath (complex path) (3)                       5545949.4    0.42   291257      7       93    
implodePath (complex path) (4)                       6262703.9    0.48   329831      5       91    
removePathLevels (complex path) (1)                  340498       0.94   17606       6       95    
removePathLevels (complex path) (2)                  319459.3     1.72   16759       5       92    
removePathLevels (complex path) (3)                  367775.5     0.4    18968       3       95    
removePathLevels (complex path) (4)                  974181.1     0.48   50889       3       92    
getSubPaths (complex path) (1)                       215866.3     1.72   11721       7       92    
getSubPaths (complex path) (2)                       206838.8     1.29   11029       3       93    
getSubPaths (complex path) (3)                       277043.3     3.21   16271       6       85    
getSubPaths (complex path) (4)                       603070.7     0.56   33305       3       91    
replacePathArraysWithString (simple path) (1)        350466.8     1.13   18511       5       92    
replacePathArraysWithString (simple path) (2)        799287       0.44   45006       3       90    
replacePathArraysWithString (complex path) (1)       319753.5     1.17   16835       3       91    
replacePathArraysWithString (complex path) (2)       299233.3     1.52   16172       3       90    
replacePathArraysWithString (complex path) (3)       352864.7     1.69   18884       4       87    
replacePathArraysWithString (complex path) (4)       916354.6     0.44   47722       6       96    
extractFromArrayNotation (string)                    7882417.5    0.64   413785      5       93    
extractFromArrayNotation (interpolation)             7825620.8    0.43   405840      5       91    
extractFromArrayNotation (number)                    9140698.9    2.85   528958      5       83    
getPathIterators (complex path) (1)                  124239.3     1.28   6496        6       89    
getPathIterators (complex path) (2)                  112085.3     1.76   5997        3       91    
getPathIterators (complex path) (3)                  179751       2.24   10226       3       86    
getPathIterators (complex path) (4)                  189684.6     1.69   10817       4       84    
getPathIterators (complex path) (1) (return array)   87802.3      2.03   4971        4       89    
getPathIterators (complex path) (2) (return array)   79076.9      1.53   4391        3       89    
getPathIterators (complex path) (3) (return array)   146176.8     1.7    8179        4       87    
getPathIterators (complex path) (4) (return array)   159441       1.41   9344        5       86    
getPathSignature (complex path) (1)                  336470.5     2.12   18894       6       88    
getPathSignature (complex path) (2)                  325745.9     1.26   18263       3       87    
getPathSignature (complex path) (3)                  367434.3     1.55   20579       3       89    
getPathSignature (complex path) (4)                  1723962.1    1.14   101522      3       85    
getPathSignature (complex path) (1) (getPath: true)  270793.7     1.56   15480       8       88    
getPathSignature (complex path) (2) (getPath: true)  248891.8     1.64   14083       4       87    
getPathSignature (complex path) (3) (getPath: true)  304556.5     1.49   16910       4       88    
getPathSignature (complex path) (4) (getPath: true)  958127.2     1.49   53366       5       85    
isSubPath (complex path) (1)                         51990.7      1.68   2928        5       88    
isSubPath (complex path) (2)                         49185.4      2.43   2805        3       86    
isSubPath (complex path) (3)                         85161.3      2.48   4816        4       87    
isSubPath (complex path) (4)                         93414.7      2.05   5355        3       87    
getComposite (complex data) (1)                      2045.7       2.32   118         3       86    
getComposite (complex data) (2)                      1660.9       2.06   96          2       87    
getComposite (complex data) (3)                      1001.8       1.7    57          2       86    
Lodash.get                                           5268603.1    1.41   297240      5       85    
get                                                  3721828.2    1.53   208025      8       85    
Average                                              78127108.63  1.23   3957539.81  4.72    89.95 
```

## Where did it come from?
Proudly built with sweat and dedication in the European Union and UK by
- Robert Dumitrescu [GitHub](https://github.com/robertdumitrescu) / [LinkedIn](https://www.linkedin.com/in/robertdumitrescu/) / [Twitter](https://twitter.com/rodumitrescu)
- Bogdan Dumitrescu [GitHub](https://github.com/practiseo) / [LinkedIn](https://www.linkedin.com/in/bodudev/)

## Miscellaneous:
[Badges](https://badge.fury.io/for/gh/robertdumitrescu/collection-path-helper)
