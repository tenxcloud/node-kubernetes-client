/*
* Licensed Materials - Property of tenxcloud.com
* (C) Copyright 2014 TenX Cloud. All Rights Reserved.
*/
/**
 * integrate unit tests
 */
var Mocha = require('mocha');
var glob = require("glob");
var path = require('path');
var fs = require('fs');
var util = require('util');

var configFile = path.resolve(__dirname) + '/config.json';
var config = require(configFile);

var patterns = config.patterns;
var skip = config.skip;
var test_suite = [];
var skip_suite = [];
var mocha = new Mocha();

patterns.forEach(function(pattern) {
  glob(pattern, {
    sync : true
  }, function(er, matches) {
    matches.forEach(function(match) {
      if (skip.indexOf(match) > -1) {
        skip_suite.push(path.resolve(match));
      } else {
        test_suite.push(path.resolve(match));
      }
    });
  });
});
console.log("test_suite:" + test_suite);
console.log("skip_suite:" + skip_suite);
test_suite.forEach(function(testcase) {
  mocha.addFile(testcase);
});
mocha.reporter('spec').run();