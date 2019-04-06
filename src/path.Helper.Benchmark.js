'use strict';

const PathHelper = require('./path.Helper');
const Benchmark = require('benchmark');
const Lodash = require('lodash');
const cTable = require('console.table');
const suite = new Benchmark.Suite;

const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

let opsPerSecs = [];
let errors = [];
let testsRans = [];
let cycles = [];
let length = [];
let execs = [];

// add tests
suite.add('getStartType (empty string)', () => {
    PathHelper.getStartType('');
});
suite.add('getStartType (object start)', () => {
    PathHelper.getStartType('prop');
});
suite.add('getStartType (array start)', () => {
    PathHelper.getStartType('[1]');
});
suite.add('getStartType (complex path) (1)', () => {
    PathHelper.getStartType('.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]');
});
suite.add('getStartType (complex path) (2)', () => {
    PathHelper.getStartType('.loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]');
});
suite.add('getStartType (complex path) (3)', () => {
    PathHelper.getStartType('[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]');
});
suite.add('getStartType (complex path) (4)', () => {
    PathHelper.getStartType('loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]');
});
suite.add('explodePath (complex path) (1)', () => {
    PathHelper.explodePath('.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]');
});
suite.add('explodePath (complex path) (2)', () => {
    PathHelper.explodePath('.loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]');
});
suite.add('explodePath (complex path) (3)', () => {
    PathHelper.explodePath('[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]');
});
suite.add('explodePath (complex path) (4)', () => {
    PathHelper.explodePath('loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]');
});
suite.add('implodePath (complex path) (1)', () => {
    PathHelper.implodePath(['lorem', '[2]', '{{ipsum}}', '[3]', 'dolor', '[{{sit}}]', '[2, 3)', '[2]', '(2, 3)', '({{consecteur}},3]', '[2, {{amet}}]']);
});
suite.add('implodePath (complex path) (2)', () => {
    PathHelper.implodePath(['loremIpsum', 'lor22_{{dolorSit33_Amet}}55em', '[2]', '{{ipsum}}', '[3]', 'dolor', '[21{{dolorSit_Amet23}}32]', '[{{123lorem_33ipsumDolor}}321, sitAmet)', '[{{n_2_x}}]', '(2, 3)', '({{sitConsecteur34_dolor}},3]', '[2, {{amet}}]']);
});
suite.add('implodePath (complex path) (3)', () => {
    PathHelper.implodePath(['[{{123loremIpsum_dolor34SitAmet567}}]', '[3]', '[{{x_nx_23}}]', '[5]', '[loremIpsum]']);
});
suite.add('implodePath (complex path) (4)', () => {
    PathHelper.implodePath(['loremIpsum', 'lor22_{{dolorSit33_Amet}}55em', '{{ipsum}}', 'dolor', '[{{123lorem_33ipsumDolor}}321, sitAmet)', '(2, 3)', '({{sitConsecteur34_dolor}},3]', '[2, {{amet}}]']);
});
suite.add('removePathLevels (complex path) (1)', () => {
    PathHelper.removePathLevels('.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]');
});
suite.add('removePathLevels (complex path) (2)', () => {
    PathHelper.removePathLevels('.loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]');
});
suite.add('removePathLevels (complex path) (3)', () => {
    PathHelper.removePathLevels('[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]');
});
suite.add('removePathLevels (complex path) (4)', () => {
    PathHelper.removePathLevels('loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]');
});
suite.add('getSubPaths (complex path) (1)', () => {
    PathHelper.getSubPaths('.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]');
});
suite.add('getSubPaths (complex path) (2)', () => {
    PathHelper.getSubPaths('.loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]');
});
suite.add('getSubPaths (complex path) (3)', () => {
    PathHelper.getSubPaths('[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]');
});
suite.add('getSubPaths (complex path) (4)', () => {
    PathHelper.getSubPaths('loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]');
});
suite.add('replacePathArraysWithString (simple path) (1)', () => {
    PathHelper.replacePathArraysWithString('[0][1][3].randomArrayOfObjects[2].randomSubArray[1]', {string: 'lorem'});
});
suite.add('replacePathArraysWithString (simple path) (2)', () => {
    PathHelper.replacePathArraysWithString('randomSubArray[{{x}}].{{y}}', {string: 'lorem'});
});
suite.add('replacePathArraysWithString (complex path) (1)', () => {
    PathHelper.replacePathArraysWithString('.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]', {string: 'lorem'});
});
suite.add('replacePathArraysWithString (complex path) (2)', () => {
    PathHelper.replacePathArraysWithString('.loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]', {string: 'lorem'});
});
suite.add('replacePathArraysWithString (complex path) (3)', () => {
    PathHelper.replacePathArraysWithString('[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]', {string: 'lorem'});
});
suite.add('replacePathArraysWithString (complex path) (4)', () => {
    PathHelper.replacePathArraysWithString('loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]', {string: 'lorem'});
});
suite.add('Lodash.get', () => {
    let collection = {id: 3, id2: {id3: [1, 'nana']}};
    Lodash.get(collection, 'id2.id3[1]');
});
suite.add('get', () => {
    let collection = {id: 3, id2: {id3: [1, 'nana']}};
    PathHelper.get(collection, 'id2.id3[1]');
});

// add listeners
suite.on('cycle', (event) => {
    console.log(`"${event.target.name}": Executed ${event.target.count} times resulting ${event.target.hz} ops/s ±${Math.round(event.target.stats.rme * 100) / 100}% (Cycles: ${event.target.cycles}) (Length: ${event.target.stats.sample.length})`);

    opsPerSecs.push(Math.round(event.target.hz * 10) / 10);
    errors.push(Math.round(event.target.stats.rme * 100) / 100);
    testsRans.push(event.target.count);
    cycles.push(event.target.cycles);
    length.push(event.target.stats.sample.length);

    let exec = {
        name: event.target.name,
        opsPerSec: Math.round(event.target.hz * 10) / 10,
        error: Math.round(event.target.stats.rme * 100) / 100,
        testsRan: event.target.count,
        cycles: event.target.cycles,
        length: event.target.stats.sample.length
    };
    execs.push(exec);
});
suite.on('complete', () => {

    let avg = {
        name: 'Average',
        opsPerSec: Math.round(average(opsPerSecs) * 100) / 100,
        error: Math.round(average(errors) * 100) / 100,
        testsRan: Math.round(average(testsRans) * 100) / 100,
        cycles: Math.round(average(cycles) * 100) / 100,
        length: Math.round(average(length) * 100) / 100
    };
    execs.push(avg);

    console.table(execs);
    console.log('Complete');
});
// run async
suite.run({ async: true });
