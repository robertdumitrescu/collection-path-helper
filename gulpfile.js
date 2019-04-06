/** A GulpFile is still needed since we are using Bleeding Edge Node.js features.
 * In order to make the library compatible with Node.js LTS versions, we need to transpile it for version 6-8 and then
 * build it via webpack, target 'umd' */

const { src, dest, parallel, series } = require('gulp');
const del = require('del');
const babel = require('@babel/core');
const FileSystem = require('fs');
const mkdirp = require('mkdirp');
const webpack = require('webpack');
const Terser = require('terser');
const util = require('util');
const sleep = util.promisify(setTimeout);
const ncp = require('ncp').ncp;
const Glob = require('glob').Glob;

class GulpHelper {
    static async cpFiles(entities) {

        for (let ei = 0; ei < entities.length; ei++) {
            ncp(entities[ei].from, entities[ei].to, (err) => {
                if (err) {
                    throw err;
                }

                console.log(`${entities[ei].from} was copied to ${entities[ei].to}`);
            });
        }

        await sleep(100);
    }

    static listFiles(path, options) {

        return new Promise(((resolve, reject) => {

            new Glob(path, options, ((error, files) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(files);
                }
            }));
        }));
    }

    static async babelify(path, options) {
        let files = await GulpHelper.listFiles(path, {nodir: true});
        console.log(files);

        for (let i = 0; i < files.length; i++) {
            let result = babel.transformFileSync(files[i], options);

            FileSystem.writeFileSync(files[i], result.code, {encoding: 'utf8', flag: 'w'});
        }
    }

    static async createFolderStructures(folderStructures) {

        for (let i = 0; i < folderStructures.length; i++) {
            mkdirp(folderStructures[i], (err) => {
                if (err) {
                    console.error(`${err}. The following path ${folderStructures[i]} was unable to be created`);
                } else {
                    console.log(`${folderStructures[i]} was created successfully`);
                }
            });
        }
    }
}


/**
 * Clean "dist" folder
 * @returns {void}
 */
function clean() {
    return del(['./dist']);
}

/**
 * Clean "temp" folder
 * @returns {void}
 */
function cleanTemp() {
    return del(['./dist/temp']);
}

/**
 * Creates folder structures out of an array of file/folder paths
 * */
async function createFolderStructures() {

    let folderStructures = [
        './dist',
        './dist/temp',
    ];

    return await GulpHelper.createFolderStructures(folderStructures);
}

function buildInitial() {
    return new Promise(((resolve, reject) => {

        webpack({
            mode: 'production',
            entry: './dist/temp/path.Helper.js',
            output: {
                path: __dirname + '/dist',
                globalObject: 'typeof self !== \'undefined\' ? self : this',
                library: 'CollectionPathHelper',
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
                console.log(err);
                console.log(stats);
                reject({err: err, stats: stats});
            }

            resolve();
        });

    }));
}

async function cpInitialFiles() {
    let entitites = [
        {
            from: 'src',
            to: 'dist/temp'
        }
    ];

    return await GulpHelper.cpFiles(entitites);
}

/**
 * Copies folder/files according to an array of object structures with "from" and "to"
 * */
async function cpFiles() {
    let entitites = [
        {
            from: 'dist/path.Helper.js',
            to: 'dist/path.Helper.min.js'
        },
        {
            from: 'dist/path.Helper.js.map',
            to: 'dist/path.Helper.min.js.map'
        }
    ];

    return await GulpHelper.cpFiles(entitites);
}


/**
 * Babelify file
 * @returns {*}
 */
async function babelify() {

    let options = {
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {
                        node: '6.17.0'
                    }
                }
            ]
        ],
        plugins: [
            '@babel/plugin-syntax-object-rest-spread',
            ['@babel/plugin-transform-runtime', {
                regenerator: true
            }]
        ]
    };

    await GulpHelper.babelify('dist/temp/*', options);
}

/**
 * Uglify file
 * @returns {*}
 */
function uglify() {

    return new Promise(((resolve, reject) => {

        let options = {
            compress: {
                passes: 3
            },
            sourceMap: {
                filename: 'path.Helper.min.js',
                url: 'path.Helper.min.js.map'
            }
        };

        let file = FileSystem.readFileSync('dist/path.Helper.min.js', 'utf8');

        var result = Terser.minify(file, options);

        // console.log(result);

        FileSystem.writeFileSync('dist/path.Helper.min.js', result.code, {encoding: 'utf8', flag: 'w'});
        FileSystem.writeFileSync('dist/path.Helper.min.js.map', result.map, {encoding: 'utf8', flag: 'w'});

        resolve();
    }));
}

exports.default = series(clean, createFolderStructures, cpInitialFiles, babelify, buildInitial, cpFiles, uglify, cleanTemp);
