# path-helper

[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

## Overview

Library for collection path manipulation. Blazing fast, lightweight and reliable. See [Benchmarks](#benchmarks)

#### Available methods
- [getStartType](#getStartType) - Returns either "object", "array" or "unknown" based on the first element of the path.
    - "object" if the first element of the path is an object notation. (E.g "lorem[2].ipsum" -> lorem is an object representation, therefore, it will return "object")
    - "array" if the first element of the path is an array notation. (E.g "[2].lorem.ipsum" -> [2] is an array representation, therefore, it will return "array")
    - "unknown" This is returned when the passed path is an empty string. Although, an empty string is a valid path which points to the root object, we can't say certainly what the type is.
- [explodePath](#explodePath) - Explodes a path in path fragments. (E.g Given "lorem[2].ipsum", it will return ['lorem', '[2]', 'ipsum'])
- [implodePath](#implodePath) - Implodes an array of pathFragments into an string path (E.g Given ['lorem', '[2]', 'ipsum'], it will return "lorem[2].ipsum")

## Methods

#### getStartType
TBC
#### explodePath
TBC
#### implodePath
TBC

## License

### Commercial license
TBC
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