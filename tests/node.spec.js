const collectionPathHelper = require('./../dist/collection-path-helper');
var complexPath = '.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]';
console.log(`Initial path: ${complexPath}`);
console.log(collectionPathHelper.getStartType(complexPath));
let pathFragments = collectionPathHelper.explodePath(complexPath);
console.log(pathFragments);
let restoredPath = collectionPathHelper.implodePath(pathFragments);
console.log(restoredPath);
