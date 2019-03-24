'use strict';

const PathHelper = require('./path.Helper');
const Benchmark = require('benchmark');
const Lodash = require('lodash');
const suite = new Benchmark.Suite;

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

let execs = [];

// add tests
suite.add('PathHelper.getStartType (empty string)', () => {
    PathHelper.getStartType('');
});
suite.add('PathHelper.getStartType (object start)', () => {
    PathHelper.getStartType('prop');
});
suite.add('PathHelper.getStartType (array start)', () => {
    PathHelper.getStartType('[1]');
});
suite.add('PathHelper.getStartType (complex path) (1)', () => {
    PathHelper.getStartType('.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]');
});
suite.add('PathHelper.getStartType (complex path) (2)', () => {
    PathHelper.getStartType('.loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]');
});
suite.add('PathHelper.getStartType (complex path) (3)', () => {
    PathHelper.getStartType('[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]');
});
suite.add('PathHelper.getStartType (complex path) (4)', () => {
    PathHelper.getStartType('loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]');
});
suite.add('PathHelper.explodePath (complex path) (1)', () => {
    PathHelper.explodePath('.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]');
});
suite.add('PathHelper.explodePath (complex path) (2)', () => {
    PathHelper.explodePath('.loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]');
});
suite.add('PathHelper.explodePath (complex path) (3)', () => {
    PathHelper.explodePath('[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]');
});
suite.add('PathHelper.explodePath (complex path) (4)', () => {
    PathHelper.explodePath('loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]');
});
suite.add('PathHelper.implodePath (complex path) (1)', () => {
    PathHelper.implodePath(['lorem', '[2]', '{{ipsum}}', '[3]', 'dolor', '[{{sit}}]', '[2, 3)', '[2]', '(2, 3)', '({{consecteur}},3]', '[2, {{amet}}]']);
});
suite.add('PathHelper.implodePath (complex path) (2)', () => {
    PathHelper.implodePath(['loremIpsum', 'lor22_{{dolorSit33_Amet}}55em', '[2]', '{{ipsum}}', '[3]', 'dolor', '[21{{dolorSit_Amet23}}32]', '[{{123lorem_33ipsumDolor}}321, sitAmet)', '[{{n_2_x}}]', '(2, 3)', '({{sitConsecteur34_dolor}},3]', '[2, {{amet}}]']);
});
suite.add('PathHelper.implodePath (complex path) (3)', () => {
    PathHelper.implodePath(['[{{123loremIpsum_dolor34SitAmet567}}]', '[3]', '[{{x_nx_23}}]', '[5]', '[loremIpsum]']);
});
suite.add('PathHelper.implodePath (complex path) (4)', () => {
    PathHelper.implodePath(['loremIpsum', 'lor22_{{dolorSit33_Amet}}55em', '{{ipsum}}', 'dolor', '[{{123lorem_33ipsumDolor}}321, sitAmet)', '(2, 3)', '({{sitConsecteur34_dolor}},3]', '[2, {{amet}}]']);
});
suite.add('PathHelper.removePathLevels (complex path) (1)', () => {
    PathHelper.removePathLevels('.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]');
});
suite.add('PathHelper.removePathLevels (complex path) (2)', () => {
    PathHelper.removePathLevels('.loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]');
});
suite.add('PathHelper.removePathLevels (complex path) (3)', () => {
    PathHelper.removePathLevels('[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]');
});
suite.add('PathHelper.removePathLevels (complex path) (4)', () => {
    PathHelper.removePathLevels('loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]');
});
suite.add('PathHelper.getSubPaths (complex path) (1)', () => {
    PathHelper.getSubPaths('.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]');
});
suite.add('PathHelper.getSubPaths (complex path) (2)', () => {
    PathHelper.getSubPaths('.loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]');
});
suite.add('PathHelper.getSubPaths (complex path) (3)', () => {
    PathHelper.getSubPaths('[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]');
});
suite.add('PathHelper.getSubPaths (complex path) (4)', () => {
    PathHelper.getSubPaths('loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]');
});
suite.add('PathHelper.replacePathArraysWithString (simple path) (1)', () => {
    PathHelper.replacePathArraysWithString('[0][1][3].randomArrayOfObjects[2].randomSubArray[1]', {string: 'lorem'});
});
suite.add('PathHelper.replacePathArraysWithString (simple path) (2)', () => {
    PathHelper.replacePathArraysWithString('randomSubArray[{{x}}].{{y}}', {string: 'lorem'});
});
suite.add('PathHelper.replacePathArraysWithString (complex path) (1)', () => {
    PathHelper.replacePathArraysWithString('.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]', {string: 'lorem'});
});
suite.add('PathHelper.replacePathArraysWithString (complex path) (2)', () => {
    PathHelper.replacePathArraysWithString('.loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]', {string: 'lorem'});
});
suite.add('PathHelper.replacePathArraysWithString (complex path) (3)', () => {
    PathHelper.replacePathArraysWithString('[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]', {string: 'lorem'});
});
suite.add('PathHelper.replacePathArraysWithString (complex path) (4)', () => {
    PathHelper.replacePathArraysWithString('loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]', {string: 'lorem'});
});
suite.add('Lodash.get', () => {
    let collection = {id: 3, id2: {id3: [1, 'nana']}};
    Lodash.get(collection, 'id2.id3[1]');
});
suite.add('PathHelper.get', () => {
    let collection = {id: 3, id2: {id3: [1, 'nana']}};
    PathHelper.get(collection, 'id2.id3[1]');
});
// add listeners
suite.on('cycle', (event) => {
    console.log(`Executed for "${event.target.name}" for ${event.target.count} times (Cycles: ${event.target.cycles}) (Length: ${event.target.stats.sample.length}): ${event.target.hz} ops/s ±${event.target.stats.rme}%`);
    execs.push(event.target.hz);
});
suite.on('complete', () => {
    for (var i = 0; i < this.length; i++) {
        console.log(this[i].hz + ' ops/sec');
        console.log(this[i].stats.sample.length);
    }
    console.log(`Average execs/s for class ${average(execs)}`);
    console.log('Complete');
});
// run async
suite.run({ async: true });
