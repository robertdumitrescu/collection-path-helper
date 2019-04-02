const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        globalObject: 'typeof self !== \'undefined\' ? self : this',
        library: 'collectionPathHelper',
        sourceMapFilename: 'collection-path-helper.map',
        libraryTarget: 'umd',
        filename: 'collection-path-helper.js',
        auxiliaryComment: 'Test Comment'
    },
    devtool: 'source-map'
};
