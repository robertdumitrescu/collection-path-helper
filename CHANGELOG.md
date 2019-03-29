# Changelog

## v1.0.0 (29/03/2019)
## Features
Added the following methods: 
- **getStartType** - Returns either "object", "array" or "unknown" based on the first element of the path.
    - "object" if the first element of the path is an object notation. (E.g "lorem[2].ipsum" -> lorem is an object representation, therefore, it will return "object")
    - "array" if the first element of the path is an array notation. (E.g "[2].lorem.ipsum" -> [2] is an array representation, therefore, it will return "array")
    - "unknown" This is returned when the passed path is an empty string. Although, an empty string is a valid path which points to the root object, we can't say certainly what the type is.
- **explodePath** - Explodes a path in path fragments. (E.g Given "lorem[2].ipsum", it will return ['lorem', '[2]', 'ipsum'])
- **implodePath** - Implodes an array of pathFragments into an string path (E.g Given ['lorem', '[2]', 'ipsum'], it will return "lorem[2].ipsum")
