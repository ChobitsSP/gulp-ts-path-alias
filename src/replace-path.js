var fs = require("fs");
var path = require("path");

/**
 * replacePath
 * @param {String} code
 * @param {String} filePath
 * @param {String} rootPath
 * @param {Object} targetPaths
 * @returns
 */
function replacePath(code, filePath, rootPath, targetPaths) {
  var tscpaths = Object.keys(targetPaths);

  var lines = code.split("\n");

  return lines.map((line) => {
    var matches = line.match(/require\(('|")(.*)('|")\)/g);
    //	var matches = line.match(/import ('|")(.*)('|")/g);

    if (matches == null) return line;

    // Go through each require statement
    for (var match of matches) {
      // Find each paths
      for (var tscpath of tscpaths) {
        // Find required module & check if its path matching what is described in the paths config.
        var requiredModules = match.match(new RegExp(tscpath, "g"));
        if (requiredModules == null) continue;

        // Skip if it resolves to the node_modules folder
        var modulePath = path.resolve('./node_modules/' + tscpath);
        if (fs.existsSync(modulePath)) continue;

        for (var requiredModule of requiredModules) {
          // Get relative path and replace
          var sourcePath = path.dirname(filePath);
          var targetPath = path.dirname(path.resolve(rootPath + "/" + targetPaths[tscpath]));

          var relativePath = path.relative(sourcePath, targetPath).replace(/\\/g, '/');
          line = line.replace(new RegExp(tscpath, "g"), "./" + relativePath + "/");
        }
      }
    }
    return line;
  }).join("\n");
};

module.exports = replacePath;