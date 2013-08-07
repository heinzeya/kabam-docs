var fs = require('fs'),
  path = require('path'),
  _ = require('lodash'),
  wrench = require('wrench');

function readSetupFile(setupFilename) {
  var setupString = fs.readFileSync(setupFilename, { encoding: 'utf8' });
  setupString = setupString.trim();
  if (setupString.slice(0, 8) !== 'NG_DOCS=' || setupString.slice(-1) !== ';') {
    console.error('Error: Setup File %s is not valid', setupFilename);
    process.exit(1);
  }
  setupString = setupString.slice(8, -1);
  return JSON.parse(setupString);
};

function replacer(key, value) {
  if (key.substr(0,2) === '__') {
    return undefined;
  }
  return value;
}

exports.copyFiles = function(mainSetupPath, newSetupPath) {
  var directories = fs.readdirSync(path.join(newSetupPath, 'partials'));
  for (var i = 0; i < directories.length; i++) {
    wrench.copyDirSyncRecursive(path.join(newSetupPath, 'partials', directories[i]),
                                path.join(mainSetupPath, 'partials', directories[i]),
                              { forceDelete: true, preserveFiles: false });
  }
};

exports.add = function(mainSetupFile, newSetupFile) {
  console.log('Adding %s', path.join(newSetupFile, '../..'));

  var mainSetup = readSetupFile(mainSetupFile);

  var newSetup = readSetupFile(newSetupFile);

  var updatedSetup = mainSetup;
  updatedSetup.sections = _.merge(mainSetup.sections, newSetup.sections);
  updatedSetup.pages = _.union(mainSetup.pages, newSetup.pages);
  updatedSetup.apis = _.merge(mainSetup.apis, newSetup.apis);

  fs.writeFileSync(mainSetupFile, 'NG_DOCS=' + JSON.stringify(updatedSetup, replacer, 2) + ';',
                   { encoding: 'utf8' });

  exports.copyFiles(path.join(mainSetupFile, '../..'), path.join(newSetupFile, '../..'));
};
