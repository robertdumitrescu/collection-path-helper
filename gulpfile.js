/** A GulpFile is still needed since we are using Bleeding Edge Node.js features.
 * In order to make the library compatible with Node.js LTS versions, we need to transpile it for version 6-8 and then
 * build it via webpack, target 'umd' */

const { src, dest, parallel, series } = require('gulp');
const del = require('del');
const babel = require('@babel/core');
// const es2015 = require('babel-core');
const FileSystem = require('fs');
const mkdirp = require('mkdirp');
const webpack = require('webpack');

/**
 * Clean "dist" folder
 * @returns {void}
 */
function clean() {
    return del(['./dist']);
}

/**
 * Creates folder structures out of an array of file/folder paths
 * */
function createFolderStructures() {

    return new Promise(((resolve, reject) => {

        let folderStructures = [
            './dist'
        ];

        for (let i = 0; i < folderStructures.length; i++) {
            mkdirp(folderStructures[i], (err) => {
                if (err) {
                    console.error(`${err}. The following path ${folderStructures[i]} was unable to be created`);
                } else {
                    console.log(`${folderStructures[i]} was created successfully`);
                }
            });
        }

        resolve();
    }));
}

function buildInitial() {
    return new Promise(((resolve, reject) => {

        webpack({
            mode: 'production',
            entry: './src/path.Helper.js',
            output: {
                path: __dirname + '/dist',
                globalObject: 'typeof self !== \'undefined\' ? self : this',
                library: 'CollectionPathHelper',
                sourceMapFilename: 'path.Helper.js.map',
                libraryTarget: 'umd',
                filename: 'path.Helper.js',
                auxiliaryComment: 'Test Comment'
            },
            devtool: 'source-map',
            optimization: {
                minimize: false
            }
        }, (err, stats) => { // Stats Object
            if (err || stats.hasErrors()) {
                reject({err: err, stats: stats});
            }

            resolve();
        });

    }));
}

/**
 * Copies folder/files according to an array of object structures with "from" and "to"
 * */
function cpFiles() {
    return new Promise(((resolve, reject) => {
        let entitites = [
            {
                from: 'src/path.Helper.js',
                to: 'dist/path.Helper.js'
            }
        ];

        for (let ei = 0; ei < entitites.length; ei++) {
            FileSystem.copyFile(entitites[ei].from, entitites[ei].to, (err) => {
                if (err) {
                    reject(err);
                }

                console.log(`${entitites[ei].from} was copied to ${entitites[ei].to}`);
            });
        }

        resolve();
    }));
}


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

        FileSystem.writeFileSync('dist/path.Helper.js', result.code, {encoding: 'utf8', flag: 'w'});

        resolve();
    }));
}

exports.default = series(clean, createFolderStructures, buildInitial);
