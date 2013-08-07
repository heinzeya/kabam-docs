#!/usr/bin/env node

var commander = require('commander'),
  fs = require('fs'),
  path = require('path'),
  mwcdocAdd = require('./../lib/mwcdocAdd.js');

commander
  .version('0.0.1')
  .option('-m, --main-path [mpath]', 'Set main documentation [mpath]', './docs');

commander
  .command('add <new-path>')
  .description('add new ngdoc path')
  .action(function(newPath, options) {
    var mainPath = options.parent.mainPath;

    /* main path checking */
    if (mainPath[0] !== '/') {
      mainPath = path.join(process.cwd(), options.parent.mainPath);
    }
    if (!fs.existsSync(mainPath)) {
      console.error('Error: Main documentation path "%s" doesn\'t exist.', mainPath);
      process.exit(1);
    }
    var mainSetupFile = path.join(mainPath, 'js/docs-setup.js');
    if (!fs.existsSync(mainSetupFile)
                       || !fs.statSync(mainSetupFile).isFile()) {
      console.error('Error: Main documentation file %s doesn\'t exist', mainSetupFile);
      process.exit(1);
    }

    /* new path checking */
    if (newPath[0] !== '/') {
      newPath = path.join(process.cwd(), newPath);
    }
    if (!fs.existsSync(newPath)) {
      console.error('Error: New documentation path "%s" doesn\'t exist.', newPath);
      process.exit(1);
    }
    var newSetupFile = path.join(newPath, 'js/docs-setup.js');
    if (!fs.existsSync(newSetupFile)
                       || !fs.statSync(newSetupFile).isFile()) {
      console.error('Error: New documentation file %s doesn\'t exist', newSetupFile);
      process.exit(1);
    }

    mwcdocAdd.add(mainSetupFile, newSetupFile);
  });

commander
  .command('*')
  .action(function() {
    console.log('mwcdoc integrator');
    console.log('use mwcdoc add command');
  });

commander.parse(process.argv);
