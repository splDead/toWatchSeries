const path = require('path');
const pathRoot = path.normalize(__dirname + '/../..');

const directory = {
    root: pathRoot,
    distDir: pathRoot + '/dist',
    assetsDir: pathRoot + '/public'
};

module.exports = directory;
