'use strict';

const PathHelper = require('./path.Helper');
const Benchmark = require('benchmark');
const Lodash = require('lodash');
const suite = new Benchmark.Suite;

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

let execs = [];

// add tests
// suite.add('PathHelper.getStartType (empty string)', () => {
//     PathHelper.getStartType('');
// });
// suite.add('PathHelper.getStartType (object start)', () => {
//     PathHelper.getStartType('prop');
// });
// suite.add('PathHelper.getStartType (array start)', () => {
//     PathHelper.getStartType('[1]');
// });
suite.add('PathHelper.explodePath (simple path - dynamic)', () => {
    PathHelper.explodePath('[{{x}}].randomArrayOfObjects[2]');
});
suite.add('PathHelper.explodePath (simple path - dynamic - start with object)', () => {
    PathHelper.explodePath('lorem[{{x}}].randomArrayOfObjects[2]');
});
// suite.add('Lodash.get', () => {
//     let collection = {id: 3, id2: {id3: [1, 'nana']}};
//     Lodash.get(collection, 'id2.id3[1]');
// });
// add listeners
suite.on('cycle', (event) => {
    console.log('====================================================================');
    console.log(String(event.target));
    console.log(event.target.name);
    console.log(`${event.target.name} RME:                 ${event.target.stats.rme}`);
    console.log(`${event.target.name} Sample length:       ${event.target.stats.sample.length}`);
    console.log(`${event.target.name} tests executed:      ${event.target.count}`); // The number of times a test was executed.
    console.log(`${event.target.name} Cycles count:        ${event.target.cycles}`); // The number of cycles performed while benchmarking.
    console.log(`${event.target.name} Execs/s:             ${event.target.hz}`); // The number of executions per second.
    execs.push(event.target.hz);
});
suite.on('complete', () => {
    for (var i = 0; i < this.length; i++) {
        console.log(this[i].hz + ' ops/sec');
        console.log(this[i].stats.sample.length);
    }
    console.log(execs);
    console.log(`Average execs/s for class ${average(execs)}`);
    console.log('Complete');
});
// run async
suite.run({ async: true });
