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


var config = require('./config.json');

var pattern = config.pattern;
var skip = config.skip;
var test_suite = [];
var skip_suite = [];
var mocha = new Mocha();

glob(pattern, {
  sync : true
}, function(er, matches) {
  matches.forEach(function(match) {
    console.log(skip);
    if (match.indexOf(skip) >= 0) {
      skip_suite.push(path.resolve(match));
    } else {
      test_suite.push(path.resolve(match));
    }
  });
  console.log("test_suite:" + test_suite);
  console.log("skip_suite:" + skip_suite);
  test_suite.forEach(function(testcase) {
    mocha.addFile(testcase);
  });
  mocha.reporter('spec').run();
  //mocha.reporter('spec').ui('tdd').run();
});

/**
patterns.forEach(function(pattern) {
  console.log('pattern: ' + pattern);
  glob(pattern, {
    sync : true
  }, function(err, matches) {
    console.log('err: ' + err);
    console.log('matches: ' + matches);
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
**/