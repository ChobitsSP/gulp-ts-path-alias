// through2 是一个对 node 的 transform streams 简单封装
var through = require('through2');
var fs = require('fs');
var replacePath = require('./replace-path.js');

/**
 *
 * @param {String} baseUrl
 * @param {Object} paths
 * @returns
 */
function gulpPathAlias(baseUrl, paths) {
  return through.obj(function (file, enc, cb) {
    if (file.isBuffer()) {
      var code = file.contents.toString("utf-8");
      code = replacePath(code, file.path, baseUrl, paths);
      file.contents = Buffer.from(code, 'utf-8');
    } else if (file.isStream()) {
      var code = fs.readFileSync(file.path, "utf8");
      code = replacePath(code, file.path, baseUrl, paths);
      file.contents = Buffer.from(code, 'utf-8');
    }

    cb(null, file);
  });
};

module.exports = gulpPathAlias;