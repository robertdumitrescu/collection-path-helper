'use strict';

const expect = require('chai').expect;

describe('CollectionPathHelper', () => {

    let CollectionPathHelper;
    before(() => {
        CollectionPathHelper = require('./path.Helper');
    });

    describe('-> getStartType', () => {
        it('should return unknown for undefined', async () => {

            let initial;

            let expected = 'unknown';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return object for path fragment with array notation', async () => {

            let initial = '[2]';

            let expected = 'array';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return object for path fragment with object notation', async () => {

            let initial = '.randomArrayOfObjects';

            let expected = 'object';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return array (simple path) - with dynamic element', async () => {

            let initial = '[{{x}}].randomArrayOfObjects[2]';

            let expected = 'array';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return object (complex path) (1)', async () => {

            let initial = '.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]';

            let expected = 'object';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return object (complex path) (2)', async () => {

            let initial = '.loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let expected = 'object';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return array (complex path) (3) - multiple arrays', async () => {

            let initial = '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]';

            let expected = 'array';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return object (complex path) (4) - multiple objects', async () => {

            let initial = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let expected = 'object';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should get the type for the path start when is starting with an object property', async () => {

            let initial = 'randomArrayOfObjects[2]';

            let expected = 'object';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an object property (with dot)', async () => {

            let initial = '.randomArrayOfObjects[2]';

            let expected = 'object';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an semi-closed interval start', async () => {

            let initial = '[2, 3)';

            let expected = 'object';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an semi-closed interval end', async () => {

            let initial = '(2, 3]';

            let expected = 'object';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an open interval', async () => {

            let initial = '(2, 3)';

            let expected = 'object';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an closed interval', async () => {

            let initial = '[2, 3]';

            let expected = 'object';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an semi-closed interval start - no blank', async () => {

            let initial = '[2,3)';

            let expected = 'object';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an semi-closed interval end - no blank', async () => {

            let initial = '(2,3]';

            let expected = 'object';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an open interval - no blank', async () => {

            let initial = '(2,3)';

            let expected = 'object';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an closed interval - no blank', async () => {

            let initial = '[2,3]';

            let expected = 'object';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should get the type for the path start when is starting with an array', async () => {

            let initial = '[2].randomArrayOfObjects[2]';

            let expected = 'array';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should get the type for the path start when is starting with an array (wtih dynamic values)', async () => {

            let initial = '[{{x}}].randomArrayOfObjects[2]';

            let expected = 'array';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should get the type for the path when path is an empty string', async () => {

            let initial = '';

            let expected = 'unknown';

            let actual = CollectionPathHelper.getStartType(initial);
            expect(actual).to.deep.equal(expected);

        });
    });

    describe('-> explodePath', () => {
        it('should return an exploded path (simple path) - with dynamic element', async () => {

            let initial = '[{{x}}].randomArrayOfObjects[2]';

            let expected = ['[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an exploded path (simple path) - consecutive object notations', async () => {

            let initial = '.lorem.ipsum.dolor.sit.amet';

            let expected = ['lorem', 'ipsum', 'dolor', 'sit', 'amet'];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an exploded path (simple path) - consecutive array notations', async () => {

            let initial = '[0][0][2][3][5]';

            let expected = ['[0]', '[0]', '[2]', '[3]', '[5]'];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an exploded path (complex path) (1)', async () => {

            let initial = '.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]';

            let expected = ['lorem', '[2]', '{{ipsum}}', '[3]', 'dolor', '[{{sit}}]', '[2, 3)', '[2]', '(2, 3)', '({{consecteur}},3]', '[2, {{amet}}]'];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (complex path) (2)', async () => {

            let initial = '.loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let expected = ['loremIpsum', 'lor22_{{dolorSit33_Amet}}55em', '[2]', '{{ipsum}}', '[3]', 'dolor', '[21{{dolorSit_Amet23}}32]', '[{{123lorem_33ipsumDolor}}321, sitAmet)', '[{{n_2_x}}]', '(2, 3)', '({{sitConsecteur34_dolor}},3]', '[2, {{amet}}]'];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an exploded path (complex path) (3) - multiple arrays', async () => {

            let initial = '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]';

            let expected = [
                '[{{123loremIpsum_dolor34SitAmet567}}]',
                '[3]',
                '[{{x_nx_23}}]',
                '[5]',
                '[loremIpsum]',
                '[{{123loremIpsum_dolor34SitAmet567}}]',
                '[3]',
                '[{{x_nx_23}}]',
                '[5]',
                '[loremIpsum]'
            ];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (complex path) (4) - multiple objects', async () => {

            let initial = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let expected = [
                'loremIpsum',
                'lor22_{{dolorSit33_Amet}}55em',
                '{{ipsum}}',
                'dolor',
                '[{{123lorem_33ipsumDolor}}321, sitAmet)',
                '(2, 3)',
                '({{sitConsecteur34_dolor}},3]',
                '[2, {{amet}}]',
                'loremIpsum',
                'lor22_{{dolorSit33_Amet}}55em',
                '{{ipsum}}',
                'dolor',
                '[{{123lorem_33ipsumDolor}}321, sitAmet)',
                '(2, 3)',
                '({{sitConsecteur34_dolor}},3]',
                '[2, {{amet}}]'
            ];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (simple path) - with semi-closed interval end', async () => {

            let initial = 'id3.(2, 3]';

            let expected = ['id3', '(2, 3]'];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (simple path) - with semi-closed interval start', async () => {

            let initial = 'id3.[2, 3)';

            let expected = ['id3', '[2, 3)'];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (simple path) - with open interval', async () => {

            let initial = 'id3.(2, 3)';

            let expected = ['id3', '(2, 3)'];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (simple path) - with closed interval', async () => {

            let initial = 'id3.[2, 3]';

            let expected = ['id3', '[2, 3]'];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (simple path) - with semi-closed interval end - no blank', async () => {

            let initial = 'id3.(2,3]';

            let expected = ['id3', '(2,3]'];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (simple path) - with semi-closed interval start - no blank', async () => {

            let initial = 'id3.[2,3)';

            let expected = ['id3', '[2,3)'];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (simple path) - with open interval - no blank', async () => {

            let initial = 'id3.(2,3)';

            let expected = ['id3', '(2,3)'];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (simple path) - with closed interval - no blank', async () => {

            let initial = 'id3.[2,3]';

            let expected = ['id3', '[2,3]'];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an exploded path (simple path) - with dynamic element (starting with object)', async () => {

            let initial = 'lorem[{{x}}].randomArrayOfObjects[2]';

            let expected = ['lorem', '[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an exploded path (simple path) - with dynamic element (starting with object) and having 2 arrays in a row', async () => {

            let initial = 'lorem[{{x}}].randomArrayOfObjects[2][5]';

            let expected = ['lorem', '[{{x}}]', 'randomArrayOfObjects', '[2]', '[5]'];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an exploded path (simple path) - with dynamic element (starting with object with dot)', async () => {

            let initial = '.lorem[{{x}}].randomArrayOfObjects[2]';

            let expected = ['lorem', '[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an exploded path (simple path) - with dynamic elements (starting with object with dot)', async () => {

            let initial = '.{{y}}[{{x}}].randomArrayOfObjects[2]';

            let expected = ['{{y}}', '[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an exploded path (simple path) - with dynamic elements (starting with object)', async () => {

            let initial = '{{y}}[{{x}}].randomArrayOfObjects[2]';

            let expected = ['{{y}}', '[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an exploded path (complex path) - with dynamic elements (starting with object)', async () => {

            let initial = '{{y}}[{{x}}].randomArrayOfObjects[2].{{z}}.{{t}}.lorem[{{n}}]';

            let expected = ['{{y}}', '[{{x}}]', 'randomArrayOfObjects', '[2]', '{{z}}', '{{t}}', 'lorem', '[{{n}}]'];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an empty array if path is an empty string', async () => {

            let initial = '';

            let expected = [];

            let actual = CollectionPathHelper.explodePath(initial);
            expect(actual).to.deep.equal(expected);

        });
    });

    describe('-> implodePath', () => {
        it('should return an imploded path (simple path) - with dynamic element', async () => {

            let expected = '[{{x}}].randomArrayOfObjects[2]';

            let initial = ['[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an imploded path (complex path) (1)', async () => {

            let initial = ['lorem', '[2]', '{{ipsum}}', '[3]', 'dolor', '[{{sit}}]', '[2, 3)', '[2]', '(2, 3)', '({{consecteur}},3]', '[2, {{amet}}]'];

            let expected = 'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]';

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an imploded path (complex path) (2)', async () => {


            let initial = ['loremIpsum', 'lor22_{{dolorSit33_Amet}}55em', '[2]', '{{ipsum}}', '[3]', 'dolor', '[21{{dolorSit_Amet23}}32]', '[{{123lorem_33ipsumDolor}}321, sitAmet)', '[{{n_2_x}}]', '(2, 3)', '({{sitConsecteur34_dolor}},3]', '[2, {{amet}}]'];

            let expected = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an imploded path (complex path) (3) - multiple arrays', async () => {

            let initial = ['[{{123loremIpsum_dolor34SitAmet567}}]', '[3]', '[{{x_nx_23}}]', '[5]', '[loremIpsum]', '[{{123loremIpsum_dolor34SitAmet567}}]', '[3]', '[{{x_nx_23}}]', '[5]', '[loremIpsum]'];

            let expected = '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]';

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an imploded path (complex path) (4) - multiple objects', async () => {

            let initial = ['loremIpsum', 'lor22_{{dolorSit33_Amet}}55em', '{{ipsum}}', 'dolor', '[{{123lorem_33ipsumDolor}}321, sitAmet)', '(2, 3)', '({{sitConsecteur34_dolor}},3]', '[2, {{amet}}]', 'loremIpsum', 'lor22_{{dolorSit33_Amet}}55em', '{{ipsum}}', 'dolor', '[{{123lorem_33ipsumDolor}}321, sitAmet)', '(2, 3)', '({{sitConsecteur34_dolor}},3]', '[2, {{amet}}]'];

            let expected = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an imploded path (simple path) - with semi-closed interval start', async () => {

            let expected = '[2].[2, 3)';

            let initial = ['[2]', '[2, 3)'];

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an imploded path (simple path) - with semi-closed interval end', async () => {

            let expected = '[2].(2, 3]';

            let initial = ['[2]', '(2, 3]'];

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an imploded path (simple path) - with open interval', async () => {

            let expected = '[2].(2, 3)';

            let initial = ['[2]', '(2, 3)'];

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an imploded path (simple path) - with closed interval', async () => {

            let expected = '[2].[2, 3]';

            let initial = ['[2]', '[2, 3]'];

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an imploded path (simple path) - with semi-closed interval start - no blank', async () => {

            let expected = '[2].[2,3)';

            let initial = ['[2]', '[2,3)'];

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an imploded path (simple path) - with semi-closed interval end - no blank', async () => {

            let expected = '[2].(2,3]';

            let initial = ['[2]', '(2,3]'];

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an imploded path (simple path) - with open interval - no blank', async () => {

            let expected = '[2].(2,3)';

            let initial = ['[2]', '(2,3)'];

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an imploded path (simple path) - with closed interval - no blank', async () => {

            let expected = '[2].[2,3]';

            let initial = ['[2]', '[2,3]'];

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an imploded path (simple path) - with dynamic element (starting with object)', async () => {

            let expected = 'lorem[{{x}}].randomArrayOfObjects[2]';

            let initial = ['lorem', '[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an imploded path (simple path) - with dynamic element (starting with object) and having 2 arrays in a row', async () => {

            let expected = 'lorem[{{x}}].randomArrayOfObjects[2][5]';

            let initial = ['lorem', '[{{x}}]', 'randomArrayOfObjects', '[2]', '[5]'];

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an imploded path (simple path) - with dynamic element (starting with object with dot)', async () => {

            let expected = 'lorem[{{x}}].randomArrayOfObjects[2]';

            let initial = ['lorem', '[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an imploded path (simple path) - with dynamic elements (starting with object with dot)', async () => {

            let expected = '{{y}}[{{x}}].randomArrayOfObjects[2]';

            let initial = ['{{y}}', '[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an imploded path (simple path) - with dynamic elements (starting with object)', async () => {

            let expected = '{{y}}[{{x}}].randomArrayOfObjects[2]';

            let initial = ['{{y}}', '[{{x}}]', 'randomArrayOfObjects', '[2]'];

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an imploded path (complex path) - with dynamic elements (starting with object)', async () => {

            let expected = '{{y}}[{{x}}].randomArrayOfObjects[2].{{z}}.{{t}}.lorem[{{n}}]';

            let initial = ['{{y}}', '[{{x}}]', 'randomArrayOfObjects', '[2]', '{{z}}', '{{t}}', 'lorem', '[{{n}}]'];

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an empty string if path is an empty array', async () => {

            let expected = '';

            let initial = [];

            let actual = CollectionPathHelper.implodePath(initial);
            expect(actual).to.deep.equal(expected);

        });
    });

    describe('-> removePathLevels', () => {
        it('should remove one level from the end if options are not specified when last level is array', async () => {

            let initial = 'randomArrayOfObjects[2].randomSubArray[1]';

            let expected = 'randomArrayOfObjects[2].randomSubArray';

            let actual = CollectionPathHelper.removePathLevels(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should remove one level from the end (complex path) (1)', async () => {

            let initial = 'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]';

            let expected = 'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3]';

            let actual = CollectionPathHelper.removePathLevels(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should remove one level from the start (complex path) (1)', async () => {

            let initial = 'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]';

            let expected = '[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]';

            let actual = CollectionPathHelper.removePathLevels(initial, {termination: 'start'});
            expect(actual).to.deep.equal(expected);

        });

        it('should remove one level from the end (complex path) (2)', async () => {

            let initial = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let expected = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3]';

            let actual = CollectionPathHelper.removePathLevels(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should remove one level from the start (complex path) (2)', async () => {

            let initial = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let expected = 'lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let actual = CollectionPathHelper.removePathLevels(initial, {termination: 'start'});
            expect(actual).to.deep.equal(expected);

        });

        it('should remove one level from the end (complex path) (3)', async () => {

            let initial = '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]';

            let expected = '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5]';

            let actual = CollectionPathHelper.removePathLevels(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should remove one level from the start (complex path) (3)', async () => {

            let initial = '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]';

            let expected = '[3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]';

            let actual = CollectionPathHelper.removePathLevels(initial, {termination: 'start'});
            expect(actual).to.deep.equal(expected);

        });

        it('should remove one level from the end (complex path) (4)', async () => {

            let initial = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let expected = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3]';

            let actual = CollectionPathHelper.removePathLevels(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should remove one level from the start (complex path) (4)', async () => {

            let initial = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let expected = 'lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let actual = CollectionPathHelper.removePathLevels(initial, {termination: 'start'});
            expect(actual).to.deep.equal(expected);

        });

        it('should remove one level from the end if options are not specified when last level is object', async () => {

            let initial = 'randomArrayOfObjects[2].randomSubArray[1].lorem';

            let expected = 'randomArrayOfObjects[2].randomSubArray[1]';

            let actual = CollectionPathHelper.removePathLevels(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should remove one level from the end if options are not specified when last level is dynamic object property', async () => {

            let initial = 'randomArrayOfObjects[2].randomSubArray[1].{{y}}';

            let expected = 'randomArrayOfObjects[2].randomSubArray[1]';

            let actual = CollectionPathHelper.removePathLevels(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should remove two levels from the end when last level is dynamic object property', async () => {

            let initial = 'randomArrayOfObjects[2].randomSubArray[1].{{y}}';

            let expected = 'randomArrayOfObjects[2].randomSubArray';

            let actual = CollectionPathHelper.removePathLevels(initial, {count: 2});
            expect(actual).to.deep.equal(expected);
        });

        it('should remove two levels from the end when last 2 levels are dynamic', async () => {

            let initial = 'randomArrayOfObjects[2].randomSubArray[{{x}}].{{y}}';

            let expected = 'randomArrayOfObjects[2].randomSubArray';

            let actual = CollectionPathHelper.removePathLevels(initial, {count: 2});
            expect(actual).to.deep.equal(expected);
        });

        it('should remove one level from the start if options are not specified when first level is array', async () => {

            let initial = '[1].randomArrayOfObjects[2].randomSubArray[1]';

            let expected = 'randomArrayOfObjects[2].randomSubArray[1]';

            let actual = CollectionPathHelper.removePathLevels(initial, {termination: 'start'});
            expect(actual).to.deep.equal(expected);
        });

        it('should remove one level from the start if options are not specified when first level is object', async () => {

            let initial = 'randomArrayOfObjects[2].randomSubArray[1].lorem';

            let expected = '[2].randomSubArray[1].lorem';

            let actual = CollectionPathHelper.removePathLevels(initial, {termination: 'start'});
            expect(actual).to.deep.equal(expected);
        });

        it('should remove one level from the start if options are not specified when first level is dynamic object property', async () => {

            let initial = '{{x}}[2].randomSubArray[1].{{y}}';

            let expected = '[2].randomSubArray[1].{{y}}';

            let actual = CollectionPathHelper.removePathLevels(initial, {termination: 'start'});
            expect(actual).to.deep.equal(expected);
        });

        it('should remove two levels from the start when first level is dynamic object property', async () => {

            let initial = '{{t}}[2].randomSubArray[1].{{y}}';

            let expected = 'randomSubArray[1].{{y}}';

            let actual = CollectionPathHelper.removePathLevels(initial, {count: 2, termination: 'start'});
            expect(actual).to.deep.equal(expected);
        });

        it('should remove two levels from the start when last 2 levels are dynamic', async () => {

            let initial = '{{t}}[{{z}}].randomSubArray[{{x}}].{{y}}';

            let expected = 'randomSubArray[{{x}}].{{y}}';

            let actual = CollectionPathHelper.removePathLevels(initial, {count: 2, termination: 'start'});
            expect(actual).to.deep.equal(expected);
        });

        it('should act on a real life example', async () => {

            let initial = '[0].title';

            let expected = '[0]';

            let actual = CollectionPathHelper.removePathLevels(initial);
            expect(actual).to.deep.equal(expected);
        });
    });

    describe('-> getFirstDynamicVariableName', () => {
        it('should return "x"', async () => {

            let initial = 'randomArrayOfObjects[2].{{x}}[1]';

            let expected = 'x';

            let actual = CollectionPathHelper.getFirstDynamicVariableName(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return "blabla"', async () => {

            let initial = '[2].randomArrayOfObjects[2].nanan[{{blabla}}]';

            let expected = 'blabla';

            let actual = CollectionPathHelper.getFirstDynamicVariableName(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return "lorem"', async () => {

            let initial = '[2].randomArrayOfObjects[{{lorem}}].nanan[{{blabla}}]';

            let expected = 'lorem';

            let actual = CollectionPathHelper.getFirstDynamicVariableName(initial);
            expect(actual).to.deep.equal(expected);
        });
    });

    describe('-> isPathStartDynamic', () => {
        it('should return true if the start is an object and is dynamic', async () => {

            let initial = '{{x}}[1].bla';

            let actual = CollectionPathHelper.isPathStartDynamic(initial);
            expect(actual).to.deep.equal(true);
        });

        it('should return true if the start is an object (with dot) and is dynamic', async () => {

            let initial = '.{{x}}[1].bla';

            let actual = CollectionPathHelper.isPathStartDynamic(initial);
            expect(actual).to.deep.equal(true);
        });

        it('should return true if the start is an array and is dynamic', async () => {

            let initial = '[{{x}}][1].bla';

            let actual = CollectionPathHelper.isPathStartDynamic(initial);
            expect(actual).to.deep.equal(true);
        });

        it('should return false if the start is an object and is not dynamic', async () => {

            let initial = 'lorem[1].bla';

            let actual = CollectionPathHelper.isPathStartDynamic(initial);
            expect(actual).to.deep.equal(false);
        });

        it('should return false if the start is an object (with dot) and is not dynamic', async () => {

            let initial = '.bla[1].bla';

            let actual = CollectionPathHelper.isPathStartDynamic(initial);
            expect(actual).to.deep.equal(false);
        });

        it('should return false if the start is an array and is not dynamic', async () => {

            let initial = '[2][1].bla';

            let actual = CollectionPathHelper.isPathStartDynamic(initial);
            expect(actual).to.deep.equal(false);
        });

        it('should return false if the start is an array and is not dynamic but path has dynamic fragments', async () => {

            let initial = '[2][1].bla[{{x}}]';

            let actual = CollectionPathHelper.isPathStartDynamic(initial);
            expect(actual).to.deep.equal(false);
        });

        it('should return false if the start is an object and is not dynamic but path has dynamic fragments', async () => {

            let initial = 'bla[1].bla[{{x}}]';

            let actual = CollectionPathHelper.isPathStartDynamic(initial);
            expect(actual).to.deep.equal(false);
        });
    });

    describe('-> get', () => {
        it('should a specific property from an object', async () => {

            let initial = {id: 3, id2: 'nana'};

            let expected = 'nana';

            let actual = CollectionPathHelper.get(initial, 'id2');
            expect(actual).to.deep.equal(expected);

        });

        it('should get for a path with special characters', async () => {

            let initial = {id: 3, id3: {'(2, 3]': 'bla'}};

            let expected = 'bla';

            let actual = CollectionPathHelper.get(initial, 'id3.(2, 3]');
            expect(actual).to.deep.equal(expected);

        });

        it('should a specific property from an object even when it starts with dot (.)', async () => {

            let initial = {id: 3, id2: 'nana'};

            let expected = 'nana';

            let actual = CollectionPathHelper.get(initial, '.id2');
            expect(actual).to.deep.equal(expected);

        });
        it('should a specific object from a collection', async () => {

            let initial = [
                {id: 1},
                {id: 'bla bla'},
                {id: 3, id2: 5},
                {id: 3, id2: 'nana'}
            ];

            let expected = {id: 3, id2: 'nana'};

            let actual = CollectionPathHelper.get(initial, '[3]');
            expect(actual).to.deep.equal(expected);
        });
        it('should get the collection if the path is an empty String', async () => {

            let initial = [
                {id: 1},
                {id: 'bla bla'},
                {id: 3, id2: 5},
                {id: 3, id2: 'nana'}
            ];

            let expected = initial;

            let actual = CollectionPathHelper.get(initial, '');
            expect(actual).to.deep.equal(expected);
        });
    });

    describe('-> set', () => {
        it('should set an empty path on object', async () => {

            let collection = {id: 3, id2: 'nana'};
            let value = [1, 2, 3];

            let expected = [1, 2, 3];

            let actual = CollectionPathHelper.set(collection, '', value);
            expect(actual).to.deep.equal(expected);
        });

        it('should set a specific path on object', async () => {

            let collection = {id: 3, id2: 'nana'};
            let value = [1, 2, 3];

            let expected = {id: 3, id2: [1, 2, 3]};

            let actual = CollectionPathHelper.set(collection, 'id2', value);
            expect(actual).to.deep.equal(expected);
        });

        it('should set a specific path on array', async () => {

            let collection = [1, 2, 3];
            let value = {id: 3, id2: 'nana'};

            let expected = [1, 2, {id: 3, id2: 'nana'}];

            let actual = CollectionPathHelper.set(collection, '[2]', value);
            expect(actual).to.deep.equal(expected);
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

            let expected = {
                isArray: true,
                '[0]': {
                    isArray: true
                },
                iterator: {
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
                },
                '(1, 2]': {
                    isArray: true
                }
            };

            let actual = CollectionPathHelper.set(collection, ['iterator'], value);
            expect(actual).to.deep.equal(expected);
        });
    });

    describe('-> getSubPaths', () => {
        it('should return an empty array if the property is not a string (number)', async () => {

            let property = 2;
            let expected = [];

            let actual = CollectionPathHelper.getSubPaths(property);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an empty array if the property is not a string (null)', async () => {

            let property = null;
            let expected = [];

            let actual = CollectionPathHelper.getSubPaths(property);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an empty array if the property is not a string (boolean)', async () => {

            let property = false;
            let expected = [];

            let actual = CollectionPathHelper.getSubPaths(property);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an array with an empty string if the property is an empty string', async () => {

            let property = '';
            let expected = [''];

            let actual = CollectionPathHelper.getSubPaths(property);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an empty array if the property is an empty string and ignoreRoot set to true', async () => {

            let property = '';
            let expected = [];

            let actual = CollectionPathHelper.getSubPaths(property, {ignoreRoot: true});
            expect(actual).to.deep.equal(expected);
        });

        it('should return an empty array if the property is an empty string and ignoreFull set to true', async () => {

            let property = '';
            let expected = [];

            let actual = CollectionPathHelper.getSubPaths(property, {ignoreFull: true});
            expect(actual).to.deep.equal(expected);
        });

        it('should return an empty array if the property is an empty string and ignoreRoot and ignoreFull set to true', async () => {

            let property = '';
            let expected = [];

            let actual = CollectionPathHelper.getSubPaths(property, {ignoreRoot: true, ignoreFull: true});
            expect(actual).to.deep.equal(expected);
        });

        it('should return an array with subpaths if path passed (1 element)', async () => {

            let property = 'lorem';
            let expected = ['', 'lorem'];

            let actual = CollectionPathHelper.getSubPaths(property);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an array with subpaths if path passed (1 element with dot at the start)', async () => {

            let property = '.lorem';
            let expected = ['', 'lorem'];

            let actual = CollectionPathHelper.getSubPaths(property);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an array with subpaths if path passed (2 element - double object)', async () => {

            let property = 'lorem.ipsum';
            let expected = ['', 'lorem', 'lorem.ipsum'];

            let actual = CollectionPathHelper.getSubPaths(property);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an array with subpaths if path passed (2 element - starting with array)', async () => {

            let property = '[2].ipsum';
            let expected = ['', '[2]', '[2].ipsum'];

            let actual = CollectionPathHelper.getSubPaths(property);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an array with subpaths if path passed (2 element - double array)', async () => {

            let property = '[2][3]';
            let expected = ['', '[2]', '[2][3]'];

            let actual = CollectionPathHelper.getSubPaths(property);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an array with subpaths if path passed (complex path with interpolations)', async () => {

            let property = 'lorem[2][5][{{aab}}].ipsum.foo.bar.{{aac}}[2][5000]';
            let expected = ['', 'lorem', 'lorem[2]', 'lorem[2][5]', 'lorem[2][5][{{aab}}]', 'lorem[2][5][{{aab}}].ipsum', 'lorem[2][5][{{aab}}].ipsum.foo', 'lorem[2][5][{{aab}}].ipsum.foo.bar', 'lorem[2][5][{{aab}}].ipsum.foo.bar.{{aac}}', 'lorem[2][5][{{aab}}].ipsum.foo.bar.{{aac}}[2]', 'lorem[2][5][{{aab}}].ipsum.foo.bar.{{aac}}[2][5000]'];

            let actual = CollectionPathHelper.getSubPaths(property);
            expect(actual).to.deep.equal(expected);
        });

        it('should return an array with subpaths if path passed (complex path with interpolations) - ignoreRoot set to true', async () => {

            let property = 'lorem[2][5][{{aab}}].ipsum.foo.bar.{{aac}}[2][5000]';
            let expected = ['lorem', 'lorem[2]', 'lorem[2][5]', 'lorem[2][5][{{aab}}]', 'lorem[2][5][{{aab}}].ipsum', 'lorem[2][5][{{aab}}].ipsum.foo', 'lorem[2][5][{{aab}}].ipsum.foo.bar', 'lorem[2][5][{{aab}}].ipsum.foo.bar.{{aac}}', 'lorem[2][5][{{aab}}].ipsum.foo.bar.{{aac}}[2]', 'lorem[2][5][{{aab}}].ipsum.foo.bar.{{aac}}[2][5000]'];

            let actual = CollectionPathHelper.getSubPaths(property, {ignoreRoot: true});
            expect(actual).to.deep.equal(expected);
        });

        it('should return an array with subpaths if path passed (complex path with interpolations) - ignoreFull set to true', async () => {

            let property = 'lorem[2][5][{{aab}}].ipsum.foo.bar.{{aac}}[2][5000]';
            let expected = ['', 'lorem', 'lorem[2]', 'lorem[2][5]', 'lorem[2][5][{{aab}}]', 'lorem[2][5][{{aab}}].ipsum', 'lorem[2][5][{{aab}}].ipsum.foo', 'lorem[2][5][{{aab}}].ipsum.foo.bar', 'lorem[2][5][{{aab}}].ipsum.foo.bar.{{aac}}', 'lorem[2][5][{{aab}}].ipsum.foo.bar.{{aac}}[2]'];

            let actual = CollectionPathHelper.getSubPaths(property, {ignoreFull: true});
            expect(actual).to.deep.equal(expected);
        });

        it('should return an array with subpaths if path passed (complex path with interpolations) - ignoreRoot and ignoreFull set to true', async () => {

            let property = 'lorem[2][5][{{aab}}].ipsum.foo.bar.{{aac}}[2][5000]';
            let expected = ['lorem', 'lorem[2]', 'lorem[2][5]', 'lorem[2][5][{{aab}}]', 'lorem[2][5][{{aab}}].ipsum', 'lorem[2][5][{{aab}}].ipsum.foo', 'lorem[2][5][{{aab}}].ipsum.foo.bar', 'lorem[2][5][{{aab}}].ipsum.foo.bar.{{aac}}', 'lorem[2][5][{{aab}}].ipsum.foo.bar.{{aac}}[2]'];

            let actual = CollectionPathHelper.getSubPaths(property, {ignoreRoot: true, ignoreFull: true});
            expect(actual).to.deep.equal(expected);
        });

        it('should return an array of subpaths (complex path) (1)', async () => {

            let initial = '.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]';

            let expected = [
                '',
                'lorem',
                'lorem[2]',
                'lorem[2].{{ipsum}}',
                'lorem[2].{{ipsum}}[3]',
                'lorem[2].{{ipsum}}[3].dolor',
                'lorem[2].{{ipsum}}[3].dolor[{{sit}}]',
                'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)',
                'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2]',
                'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3)',
                'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3]',
                'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]'
            ];

            let actual = CollectionPathHelper.getSubPaths(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an array of subpaths (complex path) (2)', async () => {

            let initial = '.loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let expected = [
                '',
                'loremIpsum',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2]',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3]',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32]',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}]',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3)',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3]',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]'
            ];

            let actual = CollectionPathHelper.getSubPaths(initial);
            expect(actual).to.deep.equal(expected);

        });

        it('should return an array of subpaths (complex path) (3)', async () => {

            let initial = '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]';

            let expected = [
                '',
                '[{{123loremIpsum_dolor34SitAmet567}}]',
                '[{{123loremIpsum_dolor34SitAmet567}}][3]',
                '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}]',
                '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5]',
                '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]',
                '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}]',
                '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}][3]',
                '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}]',
                '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5]',
                '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]'
            ];

            let actual = CollectionPathHelper.getSubPaths(initial);
            expect(actual).to.deep.equal(expected);

        });
        it('should return an array of subpaths (complex path) (4)', async () => {

            let initial = 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]';

            let expected = [
                '',
                'loremIpsum',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet)',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3)',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3]',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet)',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3)',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3]',
                'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]'
            ];

            let actual = CollectionPathHelper.getSubPaths(initial);
            expect(actual).to.deep.equal(expected);

        });
    });

    describe(' -> replacePathArraysWithString', () => {
        it('should not do anything if what was passed is an empty string', () => {

            let initial = '';

            let expected = '';

            let actual = CollectionPathHelper.replacePathArraysWithString(initial, {string: 'lorem'});
            expect(actual).to.deep.equal(expected);
        });

        it('should not do anything to a path of only objects starting with dot', () => {

            let initial = '.bla';

            let expected = 'bla';

            let actual = CollectionPathHelper.replacePathArraysWithString(initial, {string: 'lorem'});
            expect(actual).to.deep.equal(expected);
        });

        it('should not do anything to a path of only objects', () => {

            let initial = 'bla';

            let expected = 'bla';

            let actual = CollectionPathHelper.replacePathArraysWithString(initial, {string: 'lorem'});
            expect(actual).to.deep.equal(expected);
        });

        it('should replace all arrays occurrences with a certain string (path with dot)', () => {

            let initial = '.bla[0].randomArrayOfObjects[2].randomSubArray[1]';

            let expected = 'bla.lorem.randomArrayOfObjects.lorem.randomSubArray.lorem';

            let actual = CollectionPathHelper.replacePathArraysWithString(initial, {string: 'lorem'});
            expect(actual).to.deep.equal(expected);
        });

        it('should replace all arrays occurrences with a certain string (normal path)', () => {

            let initial = 'bla[0].randomArrayOfObjects[2].randomSubArray[1]';

            let expected = 'bla.lorem.randomArrayOfObjects.lorem.randomSubArray.lorem';

            let actual = CollectionPathHelper.replacePathArraysWithString(initial, {string: 'lorem'});
            expect(actual).to.deep.equal(expected);
        });

        it('should replace all arrays occurrences with a certain string (path with multiple consecutive arrays)', () => {

            let initial = 'bla[0][2].randomArrayOfObjects[2].randomSubArray[1]';

            let expected = 'bla.lorem.lorem.randomArrayOfObjects.lorem.randomSubArray.lorem';

            let actual = CollectionPathHelper.replacePathArraysWithString(initial, {string: 'lorem'});
            expect(actual).to.deep.equal(expected);
        });

        it('should replace all arrays occurrences with a certain string (path with interpolations)', () => {

            let initial = 'randomArrayOfObjects[2].{{y}}[1].lorem';

            let expected = 'randomArrayOfObjects.lorem.{{y}}.lorem.lorem';

            let actual = CollectionPathHelper.replacePathArraysWithString(initial, {string: 'lorem'});
            expect(actual).to.deep.equal(expected);
        });

        it('should replace all arrays occurrences with a certain string (path with interpolations in array)', () => {

            let initial = 'randomSubArray[{{x}}].{{y}}';

            let expected = 'randomSubArray.lorem.{{y}}';

            let actual = CollectionPathHelper.replacePathArraysWithString(initial, {string: 'lorem'});
            expect(actual).to.deep.equal(expected);
        });

        it('should replace all arrays occurrences with a certain string (path starting with array)', () => {

            let initial = '[0][1][3].randomArrayOfObjects[2].randomSubArray[1]';

            let expected = 'lorem.lorem.lorem.randomArrayOfObjects.lorem.randomSubArray.lorem';

            let actual = CollectionPathHelper.replacePathArraysWithString(initial, {string: 'lorem'});
            expect(actual).to.deep.equal(expected);
        });
    });


    /** @TODO WIP */
    // describe('-> filterOutPath', () => {
    //     it('should return an empty string if the initial path is not a string (undefined)', async () => {
    //
    //         let initial;
    //
    //         let expected = '';
    //
    //         let result = CollectionPathHelper.filterOutPath({path: initial, foArrayPath: true});
    //         expect(result).to.deep.equal(expected);
    //
    //     });
    //     it('should return an empty string if the initial path is not a string (number)', async () => {
    //
    //         let initial = 2;
    //
    //         let expected = '';
    //
    //         let result = CollectionPathHelper.filterOutPath({path: initial, foArrayPath: true});
    //         expect(result).to.deep.equal(expected);
    //
    //     });
    //     it('should return an empty string if the initial path is not a string (null)', async () => {
    //
    //         let initial = null;
    //
    //         let expected = '';
    //
    //         let result = CollectionPathHelper.filterOutPath({path: initial, foArrayPath: true});
    //         expect(result).to.deep.equal(expected);
    //
    //     });
    //     it('should return an empty string if the initial path is not a string (boolean)', async () => {
    //
    //         let initial = false;
    //
    //         let expected = '';
    //
    //         let result = CollectionPathHelper.filterOutPath({path: initial, foArrayPath: true});
    //         expect(result).to.deep.equal(expected);
    //
    //     });
    //     it('should return an empty string if the initial path is an empty string', async () => {
    //
    //         let initial = '';
    //
    //         let expected = '';
    //
    //         let result = CollectionPathHelper.filterOutPath({path: initial, foArrayPath: true});
    //         expect(result).to.deep.equal(expected);
    //
    //     });
    //     it('should filter out the array notation from a path', async () => {
    //
    //         let initial = 'randomArrayOfObjects[2].randomSubArray[1]';
    //
    //         let expected = 'randomArrayOfObjects.randomSubArray';
    //
    //         let result = CollectionPathHelper.filterOutPath({path: initial, foArrayPath: true});
    //         expect(result).to.deep.equal(expected);
    //
    //     });
    //
    //     it('should filter out the array notation from a path even when the first element is an array', async () => {
    //
    //         let initial = '[0]randomArrayOfObjects[2].randomSubArray[1]';
    //
    //         let expected = 'randomArrayOfObjects.randomSubArray';
    //
    //         let result = CollectionPathHelper.filterOutPath({path: initial, foArrayPath: true});
    //         expect(result).to.deep.equal(expected);
    //
    //     });
    //
    //     it('should filter out the object notation from a path', async () => {
    //
    //         let initial = '[0]randomArrayOfObjects[2].randomSubArray[1]';
    //
    //         let expected = '[0][2][1]';
    //
    //         let result = CollectionPathHelper.filterOutPath({path: initial, foObjectPath: true});
    //         expect(result).to.deep.equal(expected);
    //     });
    //
    //     it('should filter out the initial dot in a path', async () => {
    //
    //         let initial = '.bla[0].randomArrayOfObjects[2].randomSubArray[1]';
    //
    //         let expected = 'bla[0].randomArrayOfObjects[2].randomSubArray[1]';
    //
    //         let result = CollectionPathHelper.filterOutPath({path: initial, foInitialDot: true});
    //         expect(result).to.deep.equal(expected);
    //     });
    //
    //     it('should filter out the initial dot in a path just if it start with a dot', async () => {
    //
    //         let initial = '[0].randomArrayOfObjects[2].randomSubArray[1]';
    //
    //         let expected = '[0].randomArrayOfObjects[2].randomSubArray[1]';
    //
    //         let result = CollectionPathHelper.filterOutPath({path: initial, foInitialDot: true});
    //         expect(result).to.deep.equal(expected);
    //     });
    // });

    describe('-> getPathIterators', () => {
        it('should return empty string when path is not a string (undefined)', async () => {

            let initial = {path: undefined};

            let expected = {};

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });
        it('should return empty string when path is not a string (number)', async () => {

            let initial = {path: 2};

            let expected = {};

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });
        it('should return empty string when path is not a string (null)', async () => {

            let initial = {path: null};

            let expected = {};

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });
        it('should return empty string when path is not a string (boolean)', async () => {

            let initial = {path: false};

            let expected = {};

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });
        it('should return empty string for empty path', async () => {

            let initial = {path: ''};

            let expected = {};

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a path (complex path) (1)', async () => {

            let initial = {path: 'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]'};

            let expected = {
                itr0: 'lorem',
                itr1: 2,
                itr2: '{{ipsum}}',
                itr3: 3,
                itr4: 'dolor',
                itr5: '{{sit}}',
                itr6: '[2, 3)',
                itr7: 2,
                itr8: '(2, 3)',
                itr9: '({{consecteur}},3]',
                itr10: '[2, {{amet}}]',
            };

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a path (complex path) (2)', async () => {

            let initial = {path: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]'};

            let expected = {
                itr0: 'loremIpsum',
                itr1: 'lor22_{{dolorSit33_Amet}}55em',
                itr2: 2,
                itr3: '{{ipsum}}',
                itr4: 3,
                itr5: 'dolor',
                itr6: '21{{dolorSit_Amet23}}32',
                itr7: '[{{123lorem_33ipsumDolor}}321, sitAmet)',
                itr8: '{{n_2_x}}',
                itr9: '(2, 3)',
                itr10: '({{sitConsecteur34_dolor}},3]',
                itr11: '[2, {{amet}}]',
            };

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a path (complex path) (3)', async () => {

            let initial = {path: '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]'};

            let expected = {
                itr0: '{{123loremIpsum_dolor34SitAmet567}}',
                itr1: 3,
                itr2: '{{x_nx_23}}',
                itr3: 5,
                itr4: 'loremIpsum',
                itr5: '{{123loremIpsum_dolor34SitAmet567}}',
                itr6: 3,
                itr7: '{{x_nx_23}}',
                itr8: 5,
                itr9: 'loremIpsum'
            };

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a path (complex path) (4)', async () => {

            let initial = {path: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]'};

            let expected = {
                itr0: 'loremIpsum',
                itr1: 'lor22_{{dolorSit33_Amet}}55em',
                itr2: '{{ipsum}}',
                itr3: 'dolor',
                itr4: '[{{123lorem_33ipsumDolor}}321, sitAmet)',
                itr5: '(2, 3)',
                itr6: '({{sitConsecteur34_dolor}},3]',
                itr7: '[2, {{amet}}]',
                itr8: 'loremIpsum',
                itr9: 'lor22_{{dolorSit33_Amet}}55em',
                itr10: '{{ipsum}}',
                itr11: 'dolor',
                itr12: '[{{123lorem_33ipsumDolor}}321, sitAmet)',
                itr13: '(2, 3)',
                itr14: '({{sitConsecteur34_dolor}},3]',
                itr15: '[2, {{amet}}]',
            };

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a simple path - with semi-closed interval start', async () => {

            let initial = {path: '[2].[2, 3)'};

            let expected = {
                itr0: 2,
                itr1: '[2, 3)'
            };

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a simple path - with semi-closed interval end', async () => {

            let initial = {path: '[2].(2, 3]'};

            let expected = {
                itr0: 2,
                itr1: '(2, 3]'
            };

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a simple path - with open interval', async () => {

            let initial = {path: '[2].(2, 3)'};

            let expected = {
                itr0: 2,
                itr1: '(2, 3)'
            };

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a simple path - with closed interval', async () => {

            let initial = {path: '[2].[2, 3]'};

            let expected = {
                itr0: 2,
                itr1: '[2, 3]'
            };

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a simple path - with semi-closed interval start - no blank', async () => {

            let initial = {path: '[2].[2,3)'};

            let expected = {
                itr0: 2,
                itr1: '[2,3)'
            };

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a simple path - with semi-closed interval end - no blank', async () => {

            let initial = {path: '[2].(2,3]'};

            let expected = {
                itr0: 2,
                itr1: '(2,3]'
            };

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a simple path - with open interval - no blank', async () => {

            let initial = {path: '[2].(2,3)'};

            let expected = {
                itr0: 2,
                itr1: '(2,3)'
            };

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a simple path - with closed interval - no blank', async () => {

            let initial = {path: '[2].[2,3]'};

            let expected = {
                itr0: 2,
                itr1: '[2,3]'
            };

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a path', async () => {

            let initial = {path: 'lorem[1].bla'};

            let expected = {
                itr0: 'lorem',
                itr1: 1,
                itr2: 'bla'
            };

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a path (double object)', async () => {

            let initial = {path: 'lorem.ipsum[1].bla'};

            let expected = {
                itr0: 'lorem',
                itr1: 'ipsum',
                itr2: 1,
                itr3: 'bla'
            };

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a path (double array)', async () => {

            let initial = {path: 'lorem[1][3].bla'};

            let expected = {
                itr0: 'lorem',
                itr1: 1,
                itr2: 3,
                itr3: 'bla'
            };

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });


        it('should return empty string when path is not a string (undefined) (return array)', async () => {

            let initial = {path: undefined, returnArray: true};

            let expected = [];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });
        it('should return empty string when path is not a string (number) (return array)', async () => {

            let initial = {path: 2, returnArray: true};

            let expected = [];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });
        it('should return empty string when path is not a string (null) (return array)', async () => {

            let initial = {path: null, returnArray: true};

            let expected = [];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });
        it('should return empty string when path is not a string (boolean) (return array)', async () => {

            let initial = {path: false, returnArray: true};

            let expected = [];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });
        it('should return empty string for empty path (return array)', async () => {

            let initial = {path: '', returnArray: true};

            let expected = [];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a path (complex path) (1) (return array)', async () => {

            let initial = {path: 'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]', returnArray: true};

            let expected = [
                {
                    level: 0,
                    varName: 'itr0',
                    NPath: 'lorem',
                    value: 'lorem'
                },
                {
                    level: 1,
                    varName: 'itr1',
                    NPath: 'lorem[2]',
                    value: 2
                },
                {
                    level: 2,
                    varName: 'itr2',
                    NPath: 'lorem[2].{{ipsum}}',
                    value: '{{ipsum}}'
                },
                {
                    level: 3,
                    varName: 'itr3',
                    NPath: 'lorem[2].{{ipsum}}[3]',
                    value: 3
                },
                {
                    level: 4,
                    varName: 'itr4',
                    NPath: 'lorem[2].{{ipsum}}[3].dolor',
                    value: 'dolor'
                },
                {
                    level: 5,
                    varName: 'itr5',
                    NPath: 'lorem[2].{{ipsum}}[3].dolor[{{sit}}]',
                    value: '{{sit}}'
                },
                {
                    level: 6,
                    varName: 'itr6',
                    NPath: 'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)',
                    value: '[2, 3)'
                },
                {
                    level: 7,
                    varName: 'itr7',
                    NPath: 'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2]',
                    value: 2
                },
                {
                    level: 8,
                    varName: 'itr8',
                    NPath: 'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3)',
                    value: '(2, 3)'
                },
                {
                    level: 9,
                    varName: 'itr9',
                    NPath: 'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3]',
                    value: '({{consecteur}},3]'
                },
                {
                    level: 10,
                    varName: 'itr10',
                    NPath: 'lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]',
                    value: '[2, {{amet}}]'
                }
            ];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a path (complex path) (2) (return array)', async () => {

            let initial = {path: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]', returnArray: true};

            let expected = [
                {
                    level: 0,
                    varName: 'itr0',
                    NPath: 'loremIpsum',
                    value: 'loremIpsum'
                },
                {
                    level: 1,
                    varName: 'itr1',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em',
                    value: 'lor22_{{dolorSit33_Amet}}55em'
                },
                {
                    level: 2,
                    varName: 'itr2',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2]',
                    value: 2
                },
                {
                    level: 3,
                    varName: 'itr3',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}',
                    value: '{{ipsum}}'
                },
                {
                    level: 4,
                    varName: 'itr4',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3]',
                    value: 3
                },
                {
                    level: 5,
                    varName: 'itr5',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor',
                    value: 'dolor'
                },
                {
                    level: 6,
                    varName: 'itr6',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32]',
                    value: '21{{dolorSit_Amet23}}32'
                },
                {
                    level: 7,
                    varName: 'itr7',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)',
                    value: '[{{123lorem_33ipsumDolor}}321, sitAmet)'
                },
                {
                    level: 8,
                    varName: 'itr8',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}]',
                    value: '{{n_2_x}}'
                },
                {
                    level: 9,
                    varName: 'itr9',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3)',
                    value: '(2, 3)'
                },
                {
                    level: 10,
                    varName: 'itr10',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3]',
                    value: '({{sitConsecteur34_dolor}},3]'
                },
                {
                    level: 11,
                    varName: 'itr11',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]',
                    value: '[2, {{amet}}]'
                }
            ];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a path (complex path) (3) (return array)', async () => {

            let initial = {path: '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]', returnArray: true};

            let expected = [
                {
                    level: 0,
                    varName: 'itr0',
                    NPath: '[{{123loremIpsum_dolor34SitAmet567}}]',
                    value: '{{123loremIpsum_dolor34SitAmet567}}'
                },
                {
                    level: 1,
                    varName: 'itr1',
                    NPath: '[{{123loremIpsum_dolor34SitAmet567}}][3]',
                    value: 3
                },
                {
                    level: 2,
                    varName: 'itr2',
                    NPath: '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}]',
                    value: '{{x_nx_23}}'
                },
                {
                    level: 3,
                    varName: 'itr3',
                    NPath: '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5]',
                    value: 5
                },
                {
                    level: 4,
                    varName: 'itr4',
                    NPath: '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]',
                    value: 'loremIpsum'
                },
                {
                    level: 5,
                    varName: 'itr5',
                    NPath: '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}]',
                    value: '{{123loremIpsum_dolor34SitAmet567}}'
                },
                {
                    level: 6,
                    varName: 'itr6',
                    NPath: '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}][3]',
                    value: 3
                },
                {
                    level: 7,
                    varName: 'itr7',
                    NPath: '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}]',
                    value: '{{x_nx_23}}'
                },
                {
                    level: 8,
                    varName: 'itr8',
                    NPath: '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5]',
                    value: 5
                },
                {
                    level: 9,
                    varName: 'itr9',
                    NPath: '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]',
                    value: 'loremIpsum'
                }
            ];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a path (complex path) (4) (return array)', async () => {

            let initial = {path: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]', returnArray: true};

            let expected = [
                {
                    level: 0,
                    varName: 'itr0',
                    NPath: 'loremIpsum',
                    value: 'loremIpsum'
                },
                {
                    level: 1,
                    varName: 'itr1',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em',
                    value: 'lor22_{{dolorSit33_Amet}}55em'
                },
                {
                    level: 2,
                    varName: 'itr2',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}',
                    value: '{{ipsum}}'
                },
                {
                    level: 3,
                    varName: 'itr3',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor',
                    value: 'dolor'
                },
                {
                    level: 4,
                    varName: 'itr4',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet)',
                    value: '[{{123lorem_33ipsumDolor}}321, sitAmet)'
                },
                {
                    level: 5,
                    varName: 'itr5',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3)',
                    value: '(2, 3)'
                },
                {
                    level: 6,
                    varName: 'itr6',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3]',
                    value: '({{sitConsecteur34_dolor}},3]'
                },
                {
                    level: 7,
                    varName: 'itr7',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]',
                    value: '[2, {{amet}}]'
                },
                {
                    level: 8,
                    varName: 'itr8',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum',
                    value: 'loremIpsum'
                },
                {
                    level: 9,
                    varName: 'itr9',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em',
                    value: 'lor22_{{dolorSit33_Amet}}55em'
                },
                {
                    level: 10,
                    varName: 'itr10',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}',
                    value: '{{ipsum}}'
                },
                {
                    level: 11,
                    varName: 'itr11',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor',
                    value: 'dolor'
                },
                {
                    level: 12,
                    varName: 'itr12',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet)',
                    value: '[{{123lorem_33ipsumDolor}}321, sitAmet)'
                },
                {
                    level: 13,
                    varName: 'itr13',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3)',
                    value: '(2, 3)'
                },
                {
                    level: 14,
                    varName: 'itr14',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3]',
                    value: '({{sitConsecteur34_dolor}},3]'
                },
                {
                    level: 15,
                    varName: 'itr15',
                    NPath: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]',
                    value: '[2, {{amet}}]'
                }
            ];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a simple path - with semi-closed interval start (return array)', async () => {

            let initial = {path: '[2].[2, 3)', returnArray: true};

            let expected = [
                {
                    level: 0,
                    varName: 'itr0',
                    NPath: '[2]',
                    value: 2
                },
                {
                    level: 1,
                    varName: 'itr1',
                    NPath: '[2].[2, 3)',
                    value: '[2, 3)'
                }
            ];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a simple path - with semi-closed interval end (return array)', async () => {

            let initial = {path: '[2].(2, 3]', returnArray: true};

            let expected = [
                {
                    level: 0,
                    varName: 'itr0',
                    NPath: '[2]',
                    value: 2
                },
                {
                    level: 1,
                    varName: 'itr1',
                    NPath: '[2].(2, 3]',
                    value: '(2, 3]'
                }
            ];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a simple path - with open interval (return array)', async () => {

            let initial = {path: '[2].(2, 3)', returnArray: true};

            let expected = [
                {
                    level: 0,
                    varName: 'itr0',
                    NPath: '[2]',
                    value: 2
                },
                {
                    level: 1,
                    varName: 'itr1',
                    NPath: '[2].(2, 3)',
                    value: '(2, 3)'
                }
            ];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a simple path - with closed interval (return array)', async () => {

            let initial = {path: '[2].[2, 3]', returnArray: true};

            let expected = [
                {
                    level: 0,
                    varName: 'itr0',
                    NPath: '[2]',
                    value: 2
                },
                {
                    level: 1,
                    varName: 'itr1',
                    NPath: '[2].[2, 3]',
                    value: '[2, 3]'
                }
            ];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a simple path - with semi-closed interval start - no blank (return array)', async () => {

            let initial = {path: '[2].[2,3)', returnArray: true};

            let expected = [
                {
                    level: 0,
                    varName: 'itr0',
                    NPath: '[2]',
                    value: 2
                },
                {
                    level: 1,
                    varName: 'itr1',
                    NPath: '[2].[2,3)',
                    value: '[2,3)'
                }
            ];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a simple path - with semi-closed interval end - no blank (return array)', async () => {

            let initial = {path: '[2].(2,3]', returnArray: true};

            let expected = [
                {
                    level: 0,
                    varName: 'itr0',
                    NPath: '[2]',
                    value: 2
                },
                {
                    level: 1,
                    varName: 'itr1',
                    NPath: '[2].(2,3]',
                    value: '(2,3]'
                }
            ];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a simple path - with open interval - no blank (return array)', async () => {

            let initial = {path: '[2].(2,3)', returnArray: true};

            let expected = [
                {
                    level: 0,
                    varName: 'itr0',
                    NPath: '[2]',
                    value: 2
                },
                {
                    level: 1,
                    varName: 'itr1',
                    NPath: '[2].(2,3)',
                    value: '(2,3)'
                }
            ];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a simple path - with closed interval - no blank (return array)', async () => {

            let initial = {path: '[2].[2,3]', returnArray: true};

            let expected = [
                {
                    level: 0,
                    varName: 'itr0',
                    NPath: '[2]',
                    value: 2
                },
                {
                    level: 1,
                    varName: 'itr1',
                    NPath: '[2].[2,3]',
                    value: '[2,3]'
                }
            ];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a path (return array)', async () => {

            let initial = {path: 'lorem[1].bla', returnArray: true};

            let expected = [
                {
                    level: 0,
                    varName: 'itr0',
                    NPath: 'lorem',
                    value: 'lorem'
                },
                {
                    level: 1,
                    varName: 'itr1',
                    NPath: 'lorem[1]',
                    value: 1
                },
                {
                    level: 2,
                    varName: 'itr2',
                    NPath: 'lorem[1].bla',
                    value: 'bla'
                }
            ];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a path (double object) (return array)', async () => {

            let initial = {path: 'lorem.ipsum[1].bla', returnArray: true};

            let expected = [
                {
                    level: 0,
                    varName: 'itr0',
                    NPath: 'lorem',
                    value: 'lorem'
                },
                {
                    level: 1,
                    varName: 'itr1',
                    NPath: 'lorem.ipsum',
                    value: 'ipsum'
                },
                {
                    level: 2,
                    varName: 'itr2',
                    NPath: 'lorem.ipsum[1]',
                    value: 1
                },
                {
                    level: 3,
                    varName: 'itr3',
                    NPath: 'lorem.ipsum[1].bla',
                    value: 'bla'
                }
            ];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });

        it('should return iterators for a path (double array) (return array)', async () => {

            let initial = {path: 'lorem[1][3].bla', returnArray: true};

            let expected = [
                {
                    level: 0,
                    varName: 'itr0',
                    NPath: 'lorem',
                    value: 'lorem'
                },
                {
                    level: 1,
                    varName: 'itr1',
                    NPath: 'lorem[1]',
                    value: 1
                },
                {
                    level: 2,
                    varName: 'itr2',
                    NPath: 'lorem[1][3]',
                    value: 3
                },
                {
                    level: 3,
                    varName: 'itr3',
                    NPath: 'lorem[1][3].bla',
                    value: 'bla'
                }
            ];

            let actual = CollectionPathHelper.getPathIterators(initial);
            expect(actual).to.deep.equal(expected);
        });
    });


    describe('-> extractFromArrayNotation', () => {
        it('should not extract if array notation is invalid (interval)', () => {
            let actual = CollectionPathHelper.extractFromArrayNotation('(2]');
            expect(actual).to.be.equal('(2]');
        });

        it('should not extract if array notation is invalid (interval) - with semi-closed interval start', () => {
            let actual = CollectionPathHelper.extractFromArrayNotation('[2, 3)');
            expect(actual).to.be.equal('[2, 3)');
        });

        it('should not extract if array notation is invalid (interval) - with semi-closed interval end', () => {
            let actual = CollectionPathHelper.extractFromArrayNotation('(2, 3]');
            expect(actual).to.be.equal('(2, 3]');
        });

        it('should not extract if array notation is invalid (interval) - with open interval', () => {
            let actual = CollectionPathHelper.extractFromArrayNotation('(2, 3)');
            expect(actual).to.be.equal('(2, 3)');
        });

        it('should not extract if array notation is invalid (interval) - closed interval', () => {
            let actual = CollectionPathHelper.extractFromArrayNotation('[2, 3]');
            expect(actual).to.be.equal('[2, 3]');
        });

        it('should not extract if array notation is invalid (interval) - with semi-closed interval start - no blank', () => {
            let actual = CollectionPathHelper.extractFromArrayNotation('[2,3)');
            expect(actual).to.be.equal('[2,3)');
        });

        it('should not extract if array notation is invalid (interval) - with semi-closed interval end - no blank', () => {
            let actual = CollectionPathHelper.extractFromArrayNotation('(2,3]');
            expect(actual).to.be.equal('(2,3]');
        });

        it('should not extract if array notation is invalid (interval) - with open interval - no blank', () => {
            let actual = CollectionPathHelper.extractFromArrayNotation('(2,3)');
            expect(actual).to.be.equal('(2,3)');
        });

        it('should not extract if array notation is invalid (interval) - closed interval - no blank', () => {
            let actual = CollectionPathHelper.extractFromArrayNotation('[2,3]');
            expect(actual).to.be.equal('[2,3]');
        });

        it('should not extract if array notation is invalid (string)', () => {
            let actual = CollectionPathHelper.extractFromArrayNotation('lorem');
            expect(actual).to.be.equal('lorem');
        });

        it('should not extract if array notation is invalid (object)', () => {
            let actual = CollectionPathHelper.extractFromArrayNotation({});
            expect(actual).to.deep.equal({});
        });

        it('should not extract if array notation is invalid (array)', () => {
            let actual = CollectionPathHelper.extractFromArrayNotation([]);
            expect(actual).to.deep.equal([]);
        });

        it('should not extract if array notation is invalid (undefined)', () => {
            let actual = CollectionPathHelper.extractFromArrayNotation(undefined);
            expect(actual).to.be.equal(undefined);
        });
        it('should extract from array notation (string)', () => {
            let actual = CollectionPathHelper.extractFromArrayNotation('[bla]');
            expect(actual).to.be.equal('bla');
        });

        it('should extract from array notation (interpolation)', () => {
            let actual = CollectionPathHelper.extractFromArrayNotation('[{{x}}]');
            expect(actual).to.be.equal('{{x}}');
        });

        it('should extract from array notation (number)', () => {
            let actual = CollectionPathHelper.extractFromArrayNotation('[2]');
            expect(actual).to.be.equal(2);
        });
    });

    describe('-> getPathSignature', () => {
        it('should get an invalid signature out of a null', () => {
            let actual = CollectionPathHelper.getPathSignature({path: null});
            let expected = {length: 0, objects: 0, arrays: 0, schema: [], objProps: []};
            expect(actual).to.deep.equal(expected);
        });
        it('should get an invalid signature out of an empty object', () => {
            let actual = CollectionPathHelper.getPathSignature({path: {}});
            let expected = {length: 0, objects: 0, arrays: 0, schema: [], objProps: []};
            expect(actual).to.deep.equal(expected);
        });
        it('should get an invalid signature out of an empty array', () => {
            let actual = CollectionPathHelper.getPathSignature({path: []});
            let expected = {length: 0, objects: 0, arrays: 0, schema: [], objProps: []};
            expect(actual).to.deep.equal(expected);
        });
        it('should get an invalid signature out of an populated object', () => {
            let actual = CollectionPathHelper.getPathSignature({path: {lorem: 'ipsum'}});
            let expected = {length: 0, objects: 0, arrays: 0, schema: [], objProps: []};
            expect(actual).to.deep.equal(expected);
        });
        it('should get an invalid signature out of an populated array', () => {
            let actual = CollectionPathHelper.getPathSignature({path: [1, 2, 3]});
            let expected = {length: 0, objects: 0, arrays: 0, schema: [], objProps: []};
            expect(actual).to.deep.equal(expected);
        });
        it('should get an invalid signature out of undefined', () => {
            let actual = CollectionPathHelper.getPathSignature({path: undefined});
            let expected = {length: 0, objects: 0, arrays: 0, schema: [], objProps: []};
            expect(actual).to.deep.equal(expected);
        });
        it('should get an invalid signature out of false boolean', () => {
            let actual = CollectionPathHelper.getPathSignature({path: false});
            let expected = {length: 0, objects: 0, arrays: 0, schema: [], objProps: []};
            expect(actual).to.deep.equal(expected);
        });
        it('should get a signature out of an empty string', () => {
            let actual = CollectionPathHelper.getPathSignature({path: ''});
            let expected = {length: 0, objects: 0, arrays: 0, schema: [], objProps: []};
            expect(actual).to.deep.equal(expected);
        });
        it('should get a signature (interval) - with semi-closed interval start', () => {
            let actual = CollectionPathHelper.getPathSignature({path: '[2, 3)'});
            let expected = {length: 1, objects: 1, arrays: 0, schema: ['object'], objProps: ['[2, 3)']};
            expect(actual).to.deep.equal(expected);
        });
        it('should get a signature (interval) - with semi-closed interval end', () => {
            let actual = CollectionPathHelper.getPathSignature({path: '(2, 3]'});
            let expected = {length: 1, objects: 1, arrays: 0, schema: ['object'], objProps: ['(2, 3]']};
            expect(actual).to.deep.equal(expected);
        });
        it('should get a signature (interval) - with open interval', () => {
            let actual = CollectionPathHelper.getPathSignature({path: '(2, 3)'});
            let expected = {length: 1, objects: 1, arrays: 0, schema: ['object'], objProps: ['(2, 3)']};
            expect(actual).to.deep.equal(expected);
        });
        it('should get a signature (interval) - closed interval', () => {
            let actual = CollectionPathHelper.getPathSignature({path: '[2, 3]'});
            let expected = {length: 1, objects: 1, arrays: 0, schema: ['object'], objProps: ['[2, 3]']};
            expect(actual).to.deep.equal(expected);
        });
        it('should get a signature (interval) - with semi-closed interval start - no blank', () => {
            let actual = CollectionPathHelper.getPathSignature({path: '[2,3)'});
            let expected = {length: 1, objects: 1, arrays: 0, schema: ['object'], objProps: ['[2,3)']};
            expect(actual).to.deep.equal(expected);
        });
        it('should get a signature (interval) - with semi-closed interval end - no blank', () => {
            let actual = CollectionPathHelper.getPathSignature({path: '(2,3]'});
            let expected = {length: 1, objects: 1, arrays: 0, schema: ['object'], objProps: ['(2,3]']};
            expect(actual).to.deep.equal(expected);
        });
        it('should get a signature (interval) - with open interval - no blank', () => {
            let actual = CollectionPathHelper.getPathSignature({path: '(2,3)'});
            let expected = {length: 1, objects: 1, arrays: 0, schema: ['object'], objProps: ['(2,3)']};
            expect(actual).to.deep.equal(expected);
        });
        it('should get a signature (interval) - closed interval - no blank', () => {
            let actual = CollectionPathHelper.getPathSignature({path: '[2,3]'});
            let expected = {length: 1, objects: 1, arrays: 0, schema: ['object'], objProps: ['[2,3]']};
            expect(actual).to.deep.equal(expected);
        });

        it('should get a signature (interval) - closed interval - no blank with start interpolation', () => {
            let actual = CollectionPathHelper.getPathSignature({path: '[{{x}},3]'});
            let expected = {length: 1, objects: 1, arrays: 0, schema: ['object'], objProps: ['[{{x}},3]']};
            expect(actual).to.deep.equal(expected);
        });

        it('should get a signature (interval) - closed interval - no blank with end interpolation', () => {
            let actual = CollectionPathHelper.getPathSignature({path: '[2,{{x}}]'});
            let expected = {length: 1, objects: 1, arrays: 0, schema: ['object'], objProps: ['[2,{{x}}]']};
            expect(actual).to.deep.equal(expected);
        });

        it('should get a signature (interval) - closed interval - no blank with start and end interpolation', () => {
            let actual = CollectionPathHelper.getPathSignature({path: '[{{x}},{{y}}]'});
            let expected = {length: 1, objects: 1, arrays: 0, schema: ['object'], objProps: ['[{{x}},{{y}}]']};
            expect(actual).to.deep.equal(expected);
        });

        it('should get a signature from object notation', () => {
            let actual = CollectionPathHelper.getPathSignature({path: 'lorem'});
            let expected = {length: 1, objects: 1, arrays: 0, schema: ['object'], objProps: ['lorem']};
            expect(actual).to.deep.equal(expected);
        });

        it('should get a signature from object notation with dot', () => {
            let actual = CollectionPathHelper.getPathSignature({path: '.lorem'});
            let expected = {length: 1, objects: 1, arrays: 0, schema: ['object'], objProps: ['lorem']};
            expect(actual).to.deep.equal(expected);
        });

        it('should get a signature from object notation with dot and interpolation', () => {
            let actual = CollectionPathHelper.getPathSignature({path: '.{{x}}'});
            let expected = {length: 1, objects: 1, arrays: 0, schema: ['object'], objProps: ['{{x}}']};
            expect(actual).to.deep.equal(expected);
        });

        it('should get a signature from array notation', () => {
            let actual = CollectionPathHelper.getPathSignature({path: '[1]'});
            let expected = {length: 1, objects: 0, arrays: 1, schema: ['array'], objProps: []};
            expect(actual).to.deep.equal(expected);
        });

        it('should get a signature from array notation and interpolation', () => {
            let actual = CollectionPathHelper.getPathSignature({path: '[{{x}}]'});
            let expected = {length: 1, objects: 0, arrays: 1, schema: ['array'], objProps: []};
            expect(actual).to.deep.equal(expected);
        });
        it('should get a signature from a simple path', () => {
            let actual = CollectionPathHelper.getPathSignature({path: '[{{x}}].randomArrayOfObjects[2]'});
            let expected = {length: 3, objects: 1, arrays: 2, schema: ['array', 'object', 'array'], objProps: ['randomArrayOfObjects']};
            expect(actual).to.deep.equal(expected);
        });

        it('should get a signature from a complex path (1)', () => {
            let actual = CollectionPathHelper.getPathSignature({path: '.lorem[2].{{ipsum}}[3].dolor[{{sit}}].[2, 3)[2].(2, 3).({{consecteur}},3].[2, {{amet}}]'});
            let expected = {
                length: 11,
                objects: 7,
                arrays: 4,
                schema: [
                    'object',
                    'array',
                    'object',
                    'array',
                    'object',
                    'array',
                    'object',
                    'array',
                    'object',
                    'object',
                    'object'
                ],
                objProps: [
                    'lorem',
                    '{{ipsum}}',
                    'dolor',
                    '[2, 3)',
                    '(2, 3)',
                    '({{consecteur}},3]',
                    '[2, {{amet}}]'
                ]
            };
            expect(actual).to.deep.equal(expected);
        });

        it('should get a signature from a complex path (2)', () => {
            let actual = CollectionPathHelper.getPathSignature({path: '.loremIpsum.lor22_{{dolorSit33_Amet}}55em[2].{{ipsum}}[3].dolor[21{{dolorSit_Amet23}}32].[{{123lorem_33ipsumDolor}}321, sitAmet)[{{n_2_x}}].(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]'});
            let expected = {
                length: 12,
                objects: 8,
                arrays: 4,
                schema: [
                    'object',
                    'object',
                    'array',
                    'object',
                    'array',
                    'object',
                    'array',
                    'object',
                    'array',
                    'object',
                    'object',
                    'object'
                ],
                objProps: [
                    'loremIpsum',
                    'lor22_{{dolorSit33_Amet}}55em',
                    '{{ipsum}}',
                    'dolor',
                    '[{{123lorem_33ipsumDolor}}321, sitAmet)',
                    '(2, 3)',
                    '({{sitConsecteur34_dolor}},3]',
                    '[2, {{amet}}]'
                ]
            };
            expect(actual).to.deep.equal(expected);
        });

        it('should get a signature from a complex path (3)', () => {
            let actual = CollectionPathHelper.getPathSignature({path: '[{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum][{{123loremIpsum_dolor34SitAmet567}}][3][{{x_nx_23}}][5][loremIpsum]'});
            let expected = {
                length: 10,
                objects: 0,
                arrays: 10,
                schema: [
                    'array',
                    'array',
                    'array',
                    'array',
                    'array',
                    'array',
                    'array',
                    'array',
                    'array',
                    'array'
                ],
                objProps: []
            };
            expect(actual).to.deep.equal(expected);
        });

        it('should get a signature from a complex path (4)', () => {
            let actual = CollectionPathHelper.getPathSignature({path: 'loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}].loremIpsum.lor22_{{dolorSit33_Amet}}55em.{{ipsum}}.dolor.[{{123lorem_33ipsumDolor}}321, sitAmet).(2, 3).({{sitConsecteur34_dolor}},3].[2, {{amet}}]'});
            let expected = {
                length: 16,
                objects: 16,
                arrays: 0,
                schema: [
                    'object',
                    'object',
                    'object',
                    'object',
                    'object',
                    'object',
                    'object',
                    'object',
                    'object',
                    'object',
                    'object',
                    'object',
                    'object',
                    'object',
                    'object',
                    'object'
                ],
                objProps: [
                    'loremIpsum',
                    'lor22_{{dolorSit33_Amet}}55em',
                    '{{ipsum}}',
                    'dolor',
                    '[{{123lorem_33ipsumDolor}}321, sitAmet)',
                    '(2, 3)',
                    '({{sitConsecteur34_dolor}},3]',
                    '[2, {{amet}}]',
                    'loremIpsum',
                    'lor22_{{dolorSit33_Amet}}55em',
                    '{{ipsum}}',
                    'dolor',
                    '[{{123lorem_33ipsumDolor}}321, sitAmet)',
                    '(2, 3)',
                    '({{sitConsecteur34_dolor}},3]',
                    '[2, {{amet}}]'
                ]
            };
            expect(actual).to.deep.equal(expected);
        });


    });

    // describe('-> getAllPaths', () => {
    //     it('should not extract if array notation is invalid (interval)', () => {
    //         let actual = CollectionPathHelper.extractFromArrayNotation('(2]');
    //         expect(actual).to.be.equal('(2]');
    //     });
    //
    //     it('should not extract if array notation is invalid (interval) - with semi-closed interval start', () => {
    //         let actual = CollectionPathHelper.extractFromArrayNotation('[2, 3)');
    //         expect(actual).to.be.equal('[2, 3)');
    //     });
    //
    //     it('should not extract if array notation is invalid (interval) - with semi-closed interval end', () => {
    //         let actual = CollectionPathHelper.extractFromArrayNotation('(2, 3]');
    //         expect(actual).to.be.equal('(2, 3]');
    //     });
    //
    //     it('should not extract if array notation is invalid (interval) - with open interval', () => {
    //         let actual = CollectionPathHelper.extractFromArrayNotation('(2, 3)');
    //         expect(actual).to.be.equal('(2, 3)');
    //     });
    //
    //     it('should not extract if array notation is invalid (interval) - closed interval', () => {
    //         let actual = CollectionPathHelper.extractFromArrayNotation('[2, 3]');
    //         expect(actual).to.be.equal('[2, 3]');
    //     });
    //
    //     it('should not extract if array notation is invalid (interval) - with semi-closed interval start - no blank', () => {
    //         let actual = CollectionPathHelper.extractFromArrayNotation('[2,3)');
    //         expect(actual).to.be.equal('[2,3)');
    //     });
    //
    //     it('should not extract if array notation is invalid (interval) - with semi-closed interval end - no blank', () => {
    //         let actual = CollectionPathHelper.extractFromArrayNotation('(2,3]');
    //         expect(actual).to.be.equal('(2,3]');
    //     });
    //
    //     it('should not extract if array notation is invalid (interval) - with open interval - no blank', () => {
    //         let actual = CollectionPathHelper.extractFromArrayNotation('(2,3)');
    //         expect(actual).to.be.equal('(2,3)');
    //     });
    //
    //     it('should not extract if array notation is invalid (interval) - closed interval - no blank', () => {
    //         let actual = CollectionPathHelper.extractFromArrayNotation('[2,3]');
    //         expect(actual).to.be.equal('[2,3]');
    //     });
    //
    //     it('should not extract if array notation is invalid (string)', () => {
    //         let actual = CollectionPathHelper.extractFromArrayNotation('lorem');
    //         expect(actual).to.be.equal('lorem');
    //     });
    //
    //     it('should not extract if array notation is invalid (object)', () => {
    //         let actual = CollectionPathHelper.extractFromArrayNotation({});
    //         expect(actual).to.deep.equal({});
    //     });
    //
    //     it('should not extract if array notation is invalid (array)', () => {
    //         let actual = CollectionPathHelper.extractFromArrayNotation([]);
    //         expect(actual).to.deep.equal([]);
    //     });
    //
    //     it('should not extract if array notation is invalid (undefined)', () => {
    //         let actual = CollectionPathHelper.extractFromArrayNotation(undefined);
    //         expect(actual).to.be.equal(undefined);
    //     });
    //     it('should extract from array notation (string)', () => {
    //         let actual = CollectionPathHelper.extractFromArrayNotation('[bla]');
    //         expect(actual).to.be.equal('bla');
    //     });
    //
    //     it('should extract from array notation (interpolation)', () => {
    //         let actual = CollectionPathHelper.extractFromArrayNotation('[{{x}}]');
    //         expect(actual).to.be.equal('{{x}}');
    //     });
    //
    //     it('should extract from array notation (number)', () => {
    //         let actual = CollectionPathHelper.extractFromArrayNotation('[2]');
    //         expect(actual).to.be.equal(2);
    //     });
    // });
});
