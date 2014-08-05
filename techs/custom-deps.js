var vow = require('vow');
var vowFs = require('enb/lib/fs/async-fs');
var yaml = require('js-yaml');

module.exports = require('enb/lib/build-flow').create()
    .name('custom-deps')
    .target('target', '?.custom-deps.js')
    .defineRequiredOption('key')
    .useFileList('deps.yaml')
    .builder(function (depFiles) {
        var depsIndex = {};
        var key = this._key;
        return vow.all(depFiles.map(function (fileInfo) {
            return vowFs.read(fileInfo.fullname, 'utf8').then(function (data) {
                yaml.safeLoad(data).forEach(function (dep) {
                    if (typeof dep === 'object' && dep[key]) {
                        ([].concat(dep[key])).forEach(function (feature) {
                            depsIndex[feature] = true;
                        });
                    }
                });
            });
        })).then(function () {
            return 'module.exports = ' + JSON.stringify(Object.keys(depsIndex)) + ';\n';
        });
    })
    .createTech();
