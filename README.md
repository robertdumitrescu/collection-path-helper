# Collection Path Helper
[![CircleCI](https://circleci.com/gh/robertdumitrescu/collection-path-helper.svg?style=svg)](https://circleci.com/gh/robertdumitrescu/collection-path-helper)
[![GitHub version](https://badge.fury.io/gh/robertdumitrescu%2Fcollection-path-helper.svg)](https://github.com/robertdumitrescu/collection-path-helper)
[![npm version](https://badge.fury.io/js/collection-path-helper.svg)](https://www.npmjs.com/package/collection-path-helper)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg?style=flat-square)](https://github-tools.github.io/github-release-notes/)

## Overview

Library for collection path manipulation. Blazing fast, lightweight and reliable. See [Benchmarks](#benchmarks). This library is mainly designed to work with path that are build based on Lodash get/set methods.

Example of path that would work with this library:

```text
[2].randomArrayOfObjects[2] - normal path
[2].(2, 5][2] - path with mathematical interval - exclusion start and inclustion end
[2].[2, 5][2] - path with mathematical interval - inclustion start and inclustion end
[{{x}}].randomArrayOfObjects[2] - path with interpolations
.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}] - complex path with multiple interpolations and mathematical intervals
```

Also it would work with empty paths ("") since those are valid collection paths that are pointing to the root object/array/* in the collection.

#### Install

##### Via NPM
To install via Node Package Manager (NPM) use the following command:
```bash
npm i collection-path-helper
```

##### Via Yarn
To install via Yarn use the following command:
```bash
yarn add collection-path-helper
```

#### Available methods
- [getStartType](#getstarttype) - Returns either "object", "array" or "unknown" based on the first element of the path.
    - "object" if the first element of the path is an object notation. (E.g "lorem[2].ipsum" -> lorem is an object representation, therefore, it will return "object")
    - "array" if the first element of the path is an array notation. (E.g "[2].lorem.ipsum" -> [2] is an array representation, therefore, it will return "array")
    - "unknown" This is returned when the passed path is an empty string. Although, an empty string is a valid path which points to the root object, we can't say certainly what the type is.
- [explodePath](#explodepath) - Explodes a path in path fragments. (E.g Given "lorem[2].ipsum", it will return ['lorem', '[2]', 'ipsum'])
- [implodePath](#implodepath) - Implodes an array of pathFragments into an string path (E.g Given ['lorem', '[2]', 'ipsum'], it will return "lorem[2].ipsum")
- [removePathLevels](#removepathlevels) - Removes from a collection string path certain level(s) or object properties either from the beginning or from the end based on arguments [EXPERIMENTAL]
- [getSubPaths](#getsubpaths) - For a given path, outputs an array with all the possible sub paths with the option to ignore the first or the last one [EXPERIMENTAL]
- [replacePathArraysWithString](#replacepatharrayswithstring) - Replaces all the array notations within a path with a chosen string. Particularly useful when this is used with string interpolations. [EXPERIMENTAL]

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
Although my libraries are completely free, if you are making the big bucks out of them, please consider donating to keep them free for the future. You can do this via the following methods:
- [Donate on Patreon](https://www.patreon.com/robertdumitrescu)
### Open-source license
This library is free for personal and non-commercial use under the GNU AGPLv3.

## Benchmarks:

The following results were obtained running the benchmarks on the following configuration:

- Processor: **Intel® Core™i7 Quad Core Processor i7-6700k (4.0GHz) 8MB Cache**
- RAM: **64GB HyperX IMPACT 2400MHz SODIMM DDR4 (4 x 16GB)**
- Graphics Card: **NVIDIA® GeForce® GTX 1080 - 8.0GB GDDR5 Video RAM**  (probably doesn't make any difference)
- Storage: **256GB SAMSUNG SM961 M.2, PCIe NVMe (up to 3100MB/R, 1400MB/W)**

```text
name                                            opsPerSec    error  testsRan    cycles  length
----------------------------------------------  -----------  -----  ----------  ------  ------
getStartType (empty string)                     954012840.3  0.17   48162000    8       91    
getStartType (object start)                     198029370    0.12   10000452    7       98    
getStartType (array start)                      63486405.9   0.44   3321440     7       93    
getStartType (complex path) (1)                 419326987.4  0.1    21166287    8       96    
getStartType (complex path) (2)                 419971538.9  0.15   21115078    6       99    
getStartType (complex path) (3)                 65284553.8   0.34   3333665     7       97    
getStartType (complex path) (4)                 419035336    0.13   21214015    6       93    
explodePath (complex path) (1)                  217456.7     0.17   11021       6       92    
explodePath (complex path) (2)                  196605.7     0.14   9955        5       97    
explodePath (complex path) (3)                  374500.4     0.16   19072       6       96    
explodePath (complex path) (4)                  339464.5     0.16   17317       3       95    
implodePath (complex path) (1)                  2088469.1    0.45   110190      5       95    
implodePath (complex path) (2)                  2030128.2    0.45   106430      5       94    
implodePath (complex path) (3)                  3026811.5    0.99   163659      8       93    
implodePath (complex path) (4)                  3044008.1    20.9   219890      5       69    
removePathLevels (complex path) (1)             161688.9     2.5    9125        7       83    
removePathLevels (complex path) (2)             162740.7     0.37   8400        4       96    
removePathLevels (complex path) (3)             299244.3     0.53   15575       4       89    
removePathLevels (complex path) (4)             283558.4     0.86   15010       3       94    
getSubPaths (complex path) (1)                  117303       0.69   6118        6       88    
getSubPaths (complex path) (2)                  104503.2     0.57   5406        4       91    
getSubPaths (complex path) (3)                  242104.4     0.39   12590       6       94    
getSubPaths (complex path) (4)                  221034.5     0.45   11406       3       94    
replacePathArraysWithString (simple path) (1)   241953.3     0.63   12567       6       95    
replacePathArraysWithString (simple path) (2)   458757.2     0.75   26543       3       87    
replacePathArraysWithString (complex path) (1)  170310.4     1.32   9033        4       93    
replacePathArraysWithString (complex path) (2)  159278.5     0.39   8216        3       96    
replacePathArraysWithString (complex path) (3)  295532.9     0.38   15257       5       92    
replacePathArraysWithString (complex path) (4)  269025.9     0.9    14154       3       95    
Lodash.get                                      6034730.3    1.01   318754      6       93    
get                                             4410790.6    0.53   230011      5       93    
Average                                         82712807.52  1.2    4183504.39  5.29    92.61 
```

## Build
TBC

#Test
```mermaid
sequenceDiagram
loop every day
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
end
```

## Where did it come from?
Proudly built with sweat and dedication in European Union (E.U) by
- Robert Dumitrescu [GitHub](https://github.com/robertdumitrescu) / [LinkedIn](https://www.linkedin.com/in/robertdumitrescu/) / [Twitter](https://twitter.com/rodumitrescu)
- Bogdan Dumitrescu [GitHub](https://github.com/practiseo) / [LinkedIn](https://www.linkedin.com/in/bodudev/)

## Miscellaneous:
[Badges](https://badge.fury.io/for/gh/robertdumitrescu/collection-path-helper)