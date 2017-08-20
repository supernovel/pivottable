var path = require('path');

var pathToRoot = path.join(__dirname);
var pathToSrc = path.join(pathToRoot, 'src/');
var entry = {};

entry['build/pivotTable'] = path.join(pathToSrc, 'index.js');
entry['test/pivotTable'] = path.join(pathToSrc, 'index.js');

module.exports = {
    entry: entry,
    output: {
        path: pathToRoot,
        filename: '[name].js',
        libraryTarget: 'window',
        library: 'Pivot'
    }
};