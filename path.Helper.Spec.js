'use strict';

const expect = require('chai').expect;
let BoolValidator = process.nextTick(() => BoolValidator = require('./bool.Validator'));

describe('PathHelper', () => {

    let PathHelper;
    before(() => {
        PathHelper = require('./path.Helper');
    });

    describe('-> getStartType', () => {
        it('should return array (simple path) - with dynamic element', async () => {

            let path = '[{{x}}].randomArrayOfObjects[2]';

            let expected = 'array';

            let actual = PathHelper.getStartType(path);
            expect(actual).to.deep.equal(expected);

        });
        it('should return object (complex path) (1)', async () => {

            let path = '.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]';

            let expected = 'object';

            let actual = PathHelper.getStartType(path);
            expect(actual).to.deep.equal(expected);

        });
        it('should return object (complex path) (2)', async () => {

            let path = '.loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let expected = 'object';

            let actual = PathHelper.getStartType(path);
            expect(actual).to.deep.equal(expected);

        });

        it('should return array (complex path) (3) - multiple arrays', async () => {

            let path = '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]';

            let expected = 'array';

            let actual = PathHelper.getStartType(path);
            expect(actual).to.deep.equal(expected);

        });
        it('should return object (complex path) (4) - multiple objects', async () => {

            let path = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let expected = 'object';

            let actual = PathHelper.getStartType(path);
            expect(actual).to.deep.equal(expected);

        });
        it('should get the type for the path start when is starting with an object property', async () => {

            let path = 'randomArrayOfObjects[2]';

            let expected = 'object';

            let actual = PathHelper.getStartType(path);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an object property (with dot)', async () => {

            let path = '.randomArrayOfObjects[2]';

            let expected = 'object';

            let actual = PathHelper.getStartType(path);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an semi-closed interval start', async () => {

            let path = '[2, 3)';

            let expected = 'object';

            let actual = PathHelper.getStartType(path);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an semi-closed interval end', async () => {

            let path = '(2, 3]';

            let expected = 'object';

            let actual = PathHelper.getStartType(path);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an open interval', async () => {

            let path = '(2, 3)';

            let expected = 'object';

            let actual = PathHelper.getStartType(path);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an closed interval', async () => {

            let path = '[2, 3]';

            let expected = 'object';

            let actual = PathHelper.getStartType(path);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an semi-closed interval start - no blank', async () => {

            let path = '[2,3)';

            let expected = 'object';

            let actual = PathHelper.getStartType(path);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an semi-closed interval end - no blank', async () => {

            let path = '(2,3]';

            let expected = 'object';

            let actual = PathHelper.getStartType(path);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an open interval - no blank', async () => {

            let path = '(2,3)';

            let expected = 'object';

            let actual = PathHelper.getStartType(path);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an closed interval - no blank', async () => {

            let path = '[2,3]';

            let expected = 'object';

            let actual = PathHelper.getStartType(path);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an array', async () => {

            let path = '[2].randomArrayOfObjects[2]';

            let expected = 'array';

            let actual = PathHelper.getStartType(path);
            expect(actual).to.deep.equal(expected);

        });

        it('should get the type for the path start when is starting with an array (wtih dynamic values)', async () => {

            let path = '[{{x}}].randomArrayOfObjects[2]';

            let expected = 'array';

            let actual = PathHelper.getStartType(path);
            expect(actual).to.deep.equal(expected);

        });

        it('should get the type for the path when path is an empty string', async () => {

            let path = '';

            let expected = 'unknown';

            let actual = PathHelper.getStartType(path);
            expect(actual).to.deep.equal(expected);

        });
    });

    describe('-> explodePath', () => {
        it('should return an exploded path (simple path) - with dynamic element', async () => {

            let path = '[{{x}}].randomArrayOfObjects[2]';

            let expected = ['[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (complex path) (1)', async () => {

            let path = '.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]';

            let expected = ['lorem', '[2]', '{{ipsum}}', '[3]', 'dolor', '[{{sit}}]', '[2, 3)', '[2]', '(2, 3)', '({{consecteur}},3]', '[2, {{amet}}]'];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (complex path) (2)', async () => {

            let path = '.loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let expected = ['loremIpsum', 'lor22_{{dolorSit33_Amet}}55em', '[2]', '{{ipsum}}', '[3]', 'dolor', '[21{{dolorSit_Amet23}}32]', '[{{123lorem_33ipsumDolor}}321, sitAmet)', '[{{n_2_x}}]', '(2, 3)', '({{sitConsecteur34_dolor}},3]', '[2, {{amet}}]'];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an exploded path (complex path) (3) - multiple arrays', async () => {

            let path = '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]';

            let expected = ['[{{123loremIpsum_dolor34SitAmet567}}]', '[3]', '[{{x_nx_23}}]', '[5]', '[loremIpsum]'];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (complex path) (4) - multiple objects', async () => {

            let path = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let expected = ['loremIpsum', 'lor22_{{dolorSit33_Amet}}55em', '{{ipsum}}', 'dolor', '[{{123lorem_33ipsumDolor}}321, sitAmet)', '(2, 3)', '({{sitConsecteur34_dolor}},3]', '[2, {{amet}}]'];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (simple path) - with semi-closed interval end', async () => {

            let path = 'id3.(2, 3]';

            let expected = ['id3', '(2, 3]'];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (simple path) - with semi-closed interval start', async () => {

            let path = 'id3.[2, 3)';

            let expected = ['id3', '[2, 3)'];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (simple path) - with open interval', async () => {

            let path = 'id3.(2, 3)';

            let expected = ['id3', '(2, 3)'];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (simple path) - with closed interval', async () => {

            let path = 'id3.[2, 3]';

            let expected = ['id3', '[2, 3]'];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (simple path) - with semi-closed interval end - no blank', async () => {

            let path = 'id3.(2,3]';

            let expected = ['id3', '(2,3]'];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (simple path) - with semi-closed interval start - no blank', async () => {

            let path = 'id3.[2,3)';

            let expected = ['id3', '[2,3)'];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (simple path) - with open interval - no blank', async () => {

            let path = 'id3.(2,3)';

            let expected = ['id3', '(2,3)'];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (simple path) - with closed interval - no blank', async () => {

            let path = 'id3.[2,3]';

            let expected = ['id3', '[2,3]'];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (simple path) - with dynamic element (starting with object)', async () => {

            let path = 'lorem[{{x}}].randomArrayOfObjects[2]';

            let expected = ['lorem', '[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an exploded path (simple path) - with dynamic element (starting with object) and having 2 arrays in a row', async () => {

            let path = 'lorem[{{x}}].randomArrayOfObjects[2][5]';

            let expected = ['lorem', '[{{x}}]', 'randomArrayOfObjects', '[2]', '[5]'];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an exploded path (simple path) - with dynamic element (starting with object with dot)', async () => {

            let path = '.lorem[{{x}}].randomArrayOfObjects[2]';

            let expected = ['lorem', '[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an exploded path (simple path) - with dynamic elements (starting with object with dot)', async () => {

            let path = '.{{y}}[{{x}}].randomArrayOfObjects[2]';

            let expected = ['{{y}}', '[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an exploded path (simple path) - with dynamic elements (starting with object)', async () => {

            let path = '{{y}}[{{x}}].randomArrayOfObjects[2]';

            let expected = ['{{y}}', '[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an exploded path (complex path) - with dynamic elements (starting with object)', async () => {

            let path = '{{y}}[{{x}}].randomArrayOfObjects[2].{{z}}.{{t}}.lorem[{{n}}]';

            let expected = ['{{y}}', '[{{x}}]', 'randomArrayOfObjects', '[2]', '{{z}}', '{{t}}', 'lorem', '[{{n}}]'];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an empty array if path is an empty string', async () => {

            let path = '';

            let expected = [];

            let actual = PathHelper.explodePath(path);
            expect(actual).to.deep.equal(expected);

        });
    });

    describe('-> implodePath', () => {
        it('should return an imploded path (simple path) - with dynamic element', async () => {

            let expected = '[{{x}}].randomArrayOfObjects[2]';

            let initial = ['[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an imploded path (complex path) (1)', async () => {

            let initial = ['lorem', '[2]', '{{ipsum}}', '[3]', 'dolor', '[{{sit}}]', '[2, 3)', '[2]', '(2, 3)', '({{consecteur}},3]', '[2, {{amet}}]'];

            let expected = 'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]';

            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an imploded path (complex path) (2)', async () => {


            let initial = ['loremIpsum', 'lor22_{{dolorSit33_Amet}}55em', '[2]', '{{ipsum}}', '[3]', 'dolor', '[21{{dolorSit_Amet23}}32]', '[{{123lorem_33ipsumDolor}}321, sitAmet)', '[{{n_2_x}}]', '(2, 3)', '({{sitConsecteur34_dolor}},3]', '[2, {{amet}}]'];

            let expected = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an imploded path (complex path) (3) - multiple arrays', async () => {

            let initial = ['[{{123loremIpsum_dolor34SitAmet567}}]', '[3]', '[{{x_nx_23}}]', '[5]', '[loremIpsum]'];

            let expected = '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]';
            
            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an imploded path (complex path) (4) - multiple objects', async () => {

            let initial = ['loremIpsum', 'lor22_{{dolorSit33_Amet}}55em', '{{ipsum}}', 'dolor', '[{{123lorem_33ipsumDolor}}321, sitAmet)', '(2, 3)', '({{sitConsecteur34_dolor}},3]', '[2, {{amet}}]'];
            
            let expected = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });
        
        it('should return an imploded path (simple path) - with semi-closed interval start', async () => {

            let expected = '[2].[2, 3)';

            let initial = ['[2]', '[2, 3)'];

            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an imploded path (simple path) - with semi-closed interval end', async () => {

            let expected = '[2].(2, 3]';

            let initial = ['[2]', '(2, 3]'];

            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an imploded path (simple path) - with open interval', async () => {

            let expected = '[2].(2, 3)';

            let initial = ['[2]', '(2, 3)'];

            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an imploded path (simple path) - with closed interval', async () => {

            let expected = '[2].[2, 3]';

            let initial = ['[2]', '[2, 3]'];

            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an imploded path (simple path) - with semi-closed interval start - no blank', async () => {

            let expected = '[2].[2,3)';

            let initial = ['[2]', '[2,3)'];

            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an imploded path (simple path) - with semi-closed interval end - no blank', async () => {

            let expected = '[2].(2,3]';

            let initial = ['[2]', '(2,3]'];

            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an imploded path (simple path) - with open interval - no blank', async () => {

            let expected = '[2].(2,3)';

            let initial = ['[2]', '(2,3)'];

            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an imploded path (simple path) - with closed interval - no blank', async () => {

            let expected = '[2].[2,3]';

            let initial = ['[2]', '[2,3]'];

            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an imploded path (simple path) - with dynamic element (starting with object)', async () => {

            let expected = 'lorem[{{x}}].randomArrayOfObjects[2]';

            let initial = ['lorem', '[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an imploded path (simple path) - with dynamic element (starting with object) and having 2 arrays in a row', async () => {

            let expected = 'lorem[{{x}}].randomArrayOfObjects[2][5]';

            let initial = ['lorem', '[{{x}}]', 'randomArrayOfObjects', '[2]', '[5]'];

            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an imploded path (simple path) - with dynamic element (starting with object with dot)', async () => {

            let expected = 'lorem[{{x}}].randomArrayOfObjects[2]';

            let initial = ['lorem', '[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an imploded path (simple path) - with dynamic elements (starting with object with dot)', async () => {

            let expected = '{{y}}[{{x}}].randomArrayOfObjects[2]';

            let initial = ['{{y}}', '[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an imploded path (simple path) - with dynamic elements (starting with object)', async () => {

            let expected = '{{y}}[{{x}}].randomArrayOfObjects[2]';

            let initial = ['{{y}}', '[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an imploded path (complex path) - with dynamic elements (starting with object)', async () => {

            let expected = '{{y}}[{{x}}].randomArrayOfObjects[2].{{z}}.{{t}}.lorem[{{n}}]';

            let initial = ['{{y}}', '[{{x}}]', 'randomArrayOfObjects', '[2]', '{{z}}', '{{t}}', 'lorem', '[{{n}}]'];

            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an empty string if path is an empty array', async () => {

            let expected = '';

            let initial = [];

            let actual = PathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });
    });

    describe('-> removePathLevels', () => {
        it('should remove one level from the end if options are not specified when last level is array', async () => {

            let initial = 'randomArrayOfObjects[2].randomSubArray[1]';

            let expected = 'randomArrayOfObjects[2].randomSubArray';

            let result = PathHelper.removePathLevels(initial);
            expect(result).to.deep.equal(expected);
        });

        it('should remove one level from the end (complex path) (1)', async () => {

            let initial = 'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]';

            let expected = 'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3]';

            let actual = PathHelper.removePathLevels(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should remove one level from the start (complex path) (1)', async () => {

            let initial = 'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]';

            let expected = '[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]';

            let actual = PathHelper.removePathLevels(initial, {termination: 'start'});
            expect(actual).to.deep.equal(expected);

        });

        it('should remove one level from the end (complex path) (2)', async () => {

            let initial = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let expected = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3]';

            let actual = PathHelper.removePathLevels(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should remove one level from the start (complex path) (2)', async () => {

            let initial = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let expected = 'lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let actual = PathHelper.removePathLevels(initial, {termination: 'start'});
            expect(actual).to.deep.equal(expected);

        });

        it('should remove one level from the end (complex path) (3)', async () => {

            let initial = '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]';

            let expected = '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5]';

            let actual = PathHelper.removePathLevels(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should remove one level from the start (complex path) (3)', async () => {

            let initial = '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]';

            let expected = '[3][{{x_nx_23}}][5][loremIpsum]';

            let actual = PathHelper.removePathLevels(initial, {termination: 'start'});
            expect(actual).to.deep.equal(expected);

        });

        it('should remove one level from the end (complex path) (4)', async () => {

            let initial = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let expected = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3]';

            let actual = PathHelper.removePathLevels(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should remove one level from the start (complex path) (4)', async () => {

            let initial = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let expected = 'lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let actual = PathHelper.removePathLevels(initial, {termination: 'start'});
            expect(actual).to.deep.equal(expected);

        });

        it('should remove one level from the end if options are not specified when last level is object', async () => {

            let initial = 'randomArrayOfObjects[2].randomSubArray[1].lorem';

            let expected = 'randomArrayOfObjects[2].randomSubArray[1]';

            let result = PathHelper.removePathLevels(initial);
            expect(result).to.deep.equal(expected);
        });

        it('should remove one level from the end if options are not specified when last level is dynamic object property', async () => {

            let initial = 'randomArrayOfObjects[2].randomSubArray[1].{{y}}';

            let expected = 'randomArrayOfObjects[2].randomSubArray[1]';

            let result = PathHelper.removePathLevels(initial);
            expect(result).to.deep.equal(expected);
        });

        it('should remove two levels from the end when last level is dynamic object property', async () => {

            let initial = 'randomArrayOfObjects[2].randomSubArray[1].{{y}}';

            let expected = 'randomArrayOfObjects[2].randomSubArray';

            let result = PathHelper.removePathLevels(initial, {count: 2});
            expect(result).to.deep.equal(expected);
        });

        it('should remove two levels from the end when last 2 levels are dynamic', async () => {

            let initial = 'randomArrayOfObjects[2].randomSubArray[{{x}}].{{y}}';

            let expected = 'randomArrayOfObjects[2].randomSubArray';

            let result = PathHelper.removePathLevels(initial, {count: 2});
            expect(result).to.deep.equal(expected);
        });

        it('should remove one level from the start if options are not specified when first level is array', async () => {

            let initial = '[1].randomArrayOfObjects[2].randomSubArray[1]';

            let expected = 'randomArrayOfObjects[2].randomSubArray[1]';

            let result = PathHelper.removePathLevels(initial, {termination: 'start'});
            expect(result).to.deep.equal(expected);
        });

        it('should remove one level from the start if options are not specified when first level is object', async () => {

            let initial = 'randomArrayOfObjects[2].randomSubArray[1].lorem';

            let expected = '[2].randomSubArray[1].lorem';

            let result = PathHelper.removePathLevels(initial, {termination: 'start'});
            expect(result).to.deep.equal(expected);
        });

        it('should remove one level from the start if options are not specified when first level is dynamic object property', async () => {

            let initial = '{{x}}[2].randomSubArray[1].{{y}}';

            let expected = '[2].randomSubArray[1].{{y}}';

            let result = PathHelper.removePathLevels(initial, {termination: 'start'});
            expect(result).to.deep.equal(expected);
        });

        it('should remove two levels from the start when first level is dynamic object property', async () => {

            let initial = '{{t}}[2].randomSubArray[1].{{y}}';

            let expected = 'randomSubArray[1].{{y}}';

            let result = PathHelper.removePathLevels(initial, {count: 2, termination: 'start'});
            expect(result).to.deep.equal(expected);
        });

        it('should remove two levels from the start when last 2 levels are dynamic', async () => {

            let initial = '{{t}}[{{z}}].randomSubArray[{{x}}].{{y}}';

            let expected = 'randomSubArray[{{x}}].{{y}}';

            let result = PathHelper.removePathLevels(initial, {count: 2, termination: 'start'});
            expect(result).to.deep.equal(expected);
        });

        it('should act on a real life example', async () => {

            let initial = '[0].title';

            let expected = '[0]';

            let result = PathHelper.removePathLevels(initial);
            expect(result).to.deep.equal(expected);
        });
    });

    describe('-> getFirstDynamicVariableName', () => {
        it('should return "x"', async () => {

            let path = 'randomArrayOfObjects[2].{{x}}[1]';

            let expected = 'x';

            let actual = PathHelper.getFirstDynamicVariableName(path);
            expect(actual).to.deep.equal(expected);

        });

        it('should return "blabla"', async () => {

            let path = '[2].randomArrayOfObjects[2].nanan[{{blabla}}]';

            let expected = 'blabla';

            let actual = PathHelper.getFirstDynamicVariableName(path);
            expect(actual).to.deep.equal(expected);
        });

        it('should return "lorem"', async () => {

            let path = '[2].randomArrayOfObjects[{{lorem}}].nanan[{{blabla}}]';

            let expected = 'lorem';

            let actual = PathHelper.getFirstDynamicVariableName(path);
            expect(actual).to.deep.equal(expected);
        });
    });

    describe('-> isPathStartDynamic', () => {
        it('should return true if the start is an object and is dynamic', async () => {

            let path = '{{x}}[1].bla';

            let actual = PathHelper.isPathStartDynamic(path);
            expect(actual).to.deep.equal(true);
        });

        it('should return true if the start is an object (with dot) and is dynamic', async () => {

            let path = '.{{x}}[1].bla';

            let actual = PathHelper.isPathStartDynamic(path);
            expect(actual).to.deep.equal(true);
        });

        it('should return true if the start is an array and is dynamic', async () => {

            let path = '[{{x}}][1].bla';

            let actual = PathHelper.isPathStartDynamic(path);
            expect(actual).to.deep.equal(true);
        });

        it('should return false if the start is an object and is not dynamic', async () => {

            let path = 'lorem[1].bla';

            let actual = PathHelper.isPathStartDynamic(path);
            expect(actual).to.deep.equal(false);
        });

        it('should return false if the start is an object (with dot) and is not dynamic', async () => {

            let path = '.bla[1].bla';

            let actual = PathHelper.isPathStartDynamic(path);
            expect(actual).to.deep.equal(false);
        });

        it('should return false if the start is an array and is not dynamic', async () => {

            let path = '[2][1].bla';

            let actual = PathHelper.isPathStartDynamic(path);
            expect(actual).to.deep.equal(false);
        });

        it('should return false if the start is an array and is not dynamic but path has dynamic fragments', async () => {

            let path = '[2][1].bla[{{x}}]';

            let actual = PathHelper.isPathStartDynamic(path);
            expect(actual).to.deep.equal(false);
        });

        it('should return false if the start is an object and is not dynamic but path has dynamic fragments', async () => {

            let path = 'bla[1].bla[{{x}}]';

            let actual = PathHelper.isPathStartDynamic(path);
            expect(actual).to.deep.equal(false);
        });
    });

    describe('-> get', () => {
        it('should a specific property from an object', async () => {

            let initialCollection = {id: 3, id2: 'nana'};

            let expectedResult = 'nana';

            let result = PathHelper.get(initialCollection, 'id2');
            expect(result).to.deep.equal(expectedResult);

        });

        it('should get for a path with special characters', async () => {

            let initialCollection = {id: 3, id3: {'(2, 3]': 'bla'}};

            let expectedResult = 'bla';

            let result = PathHelper.get(initialCollection, 'id3.(2, 3]');
            expect(result).to.deep.equal(expectedResult);

        });

        it('should a specific property from an object even when it starts with dot (.)', async () => {

            let initialCollection = {id: 3, id2: 'nana'};

            let expectedResult = 'nana';

            let result = PathHelper.get(initialCollection, '.id2');
            expect(result).to.deep.equal(expectedResult);

        });
        it('should a specific object from a collection', async () => {

            let initialCollection = [
                {id: 1},
                {id: 'bla bla'},
                {id: 3, id2: 5},
                {id: 3, id2: 'nana'}
            ];

            let expectedResult = {id: 3, id2: 'nana'};

            let result = PathHelper.get(initialCollection, '[3]');
            expect(result).to.deep.equal(expectedResult);
        });
        it('should get the collection if the path is an empty String', async () => {

            let initialCollection = [
                {id: 1},
                {id: 'bla bla'},
                {id: 3, id2: 5},
                {id: 3, id2: 'nana'}
            ];

            let expectedResult = initialCollection;

            let result = PathHelper.get(initialCollection, '');
            expect(result).to.deep.equal(expectedResult);
        });
    });

    describe('-> set', () => {
        it('should set an empty path on object', async () => {

            let collection = {id: 3, id2: 'nana'};
            let value = [1, 2, 3];

            let expectedResult = [1, 2, 3];

            let result = PathHelper.set(collection, '', value);
            expect(result).to.deep.equal(expectedResult);
        });

        it('should set a specific path on object', async () => {

            let collection = {id: 3, id2: 'nana'};
            let value = [1, 2, 3];

            let expectedResult = {id: 3, id2: [1, 2, 3]};

            let result = PathHelper.set(collection, 'id2', value);
            expect(result).to.deep.equal(expectedResult);
        });

        it('should set a specific path on array', async () => {

            let collection = [1, 2, 3];
            let value = {id: 3, id2: 'nana'};

            let expectedResult = [1, 2, {id: 3, id2: 'nana'}];

            let result = PathHelper.set(collection, '[2]', value);
            expect(result).to.deep.equal(expectedResult);
        });

        it('should set a a real life collection', async () => {

            let collection = {
                isArray: true,
                '[0]': {
                    isArray: true
                },
                iterator: {
                    isArray: true,
                    '[0, +>{{count}} / 2 / 2<+]': {
                        isArray: true,
                        '(0, #>[0][1]<#]': {
                            stringProp: {
                                stringIsEmail: true
                            }
                        }
                    },
                    '[0]': {
                        isNull: true
                    },
                    '[0, 2]': {
                        isArray: true,
                        '(0, #>[0][1]<#]': {
                            stringProp: {
                                stringIsEmail: true
                            }
                        }
                    }
                },
                '(1, 2]': {
                    isArray: true
                }
            };
            let value = {
                isArray: true,
                '[0, 2]': {
                    isArray: true,
                    '(0, #>[0][1]<#]': {
                        stringProp: {
                            stringIsEmail: true
                        }
                    }
                },
                '[0]': {
                    isNull: true
                }
            };

            let expectedResult = [1, 2, {id: 3, id2: 'nana'}];

            let result = PathHelper.set(collection, ['iterator'], value);
            expect(result).to.deep.equal(expectedResult);
        });
    });
});
