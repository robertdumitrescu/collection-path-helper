const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env',
                            {
                                targets: {
                                    chrome: 52
                                }
                            }
                        ]
                    }
                }
            }
        ]
    },
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
