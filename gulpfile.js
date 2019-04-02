/** A GulpFile is still needed since we are using Bleeding Edge Node.js features.
 * In order to make the library compatible with Node.js LTS versions, we need to transpile it for version 6-8 and then
 * build it via webpack, target 'umd' */

const { src, dest, parallel, series } = require('gulp');
const del = require('del');
const babel = require('@babel/core');
// const es2015 = require('babel-core');
const FileSystem = require('fs');


/**
 * Clean interpolator folder
 * @returns {*}
 */
function babelify() {

    return new Promise(((resolve, reject) => {

        let options = {
            babelrc: true
        };

        let result = babel.transformFileSync('src/path.Helper.js', options);

        console.log('here');
        console.log(result);
        console.log('bla');

        FileSystem.writeFileSync('lib/path.Helper.js', result.code, {encoding: 'utf8', flag: 'w'});

        // let folderStructures = [
        //     './the-interpolator/src',
        //     './the-interpolator/dist'
        // ];
        //
        // for (let i = 0; i < folderStructures.length; i++) {
        //     mkdirp(folderStructures[i], (err) => {
        //         if (err) {
        //             console.error(`${err}. The following path ${folderStructures[i]} was unable to be created`);
        //         } else {
        //             console.log(`${folderStructures[i]} was created successfully`);
        //         }
        //     });
        // }

        resolve();
    }));
}

exports.default = parallel(babelify);
