/* eslint-disable no-undef */
var path = require('path');
// eslint-disable-next-line no-unused-vars
var webpack = require('webpack');
const env = require('yargs').argv.env; // use --env with webpack 2
const pkg = require('./package.json');

let libraryName = pkg.name;
let  outputFile;
if (env === 'build') {
    outputFile = libraryName + '.min.js';
} else {
    outputFile = libraryName + '.js';
}
const config = {
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/lib',
        filename: outputFile,
        library: libraryName
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./src')],
        extensions: ['.json', '.js']
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};

module.exports = config;