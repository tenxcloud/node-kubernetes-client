/*
* Licensed Materials - Property of tenxcloud.com
* (C) Copyright 2015 TenX Cloud. All Rights Reserved.
*/
/**
 * test kubernetes minions
 * @author huangqg
 * @date 2051-03-18
 */

var should = require('should');
var assert = require('assert');
var Client = require('../index');
var fs = require('fs');

describe('Test k8s minions API', function() {
  this.timeout(5000);
  var client;
  var minions = [];
  beforeEach(function() {
    client = new Client(require('./config.json').k8s);
  });

  it('should return the minions list', function(done) {
    client.minions.get(function (err, minionsArr) {
      if (!err) {
        //console.log('minions: ' + JSON.stringify(minionsArr));
        // output results
        fs.writeFile("results/minions.json", JSON.stringify(minionsArr, null, 4));
        assert(minionsArr instanceof Array);
        minions = minionsArr[0].items;
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });

  it('should return the minion with specified id', function(done) {
    var minionId = minions[0].id;
    client.minions.get(minionId, function (err, minion) {
      if (!err) {
        //console.log('minion: ' + JSON.stringify(minion));
        // output results
        fs.writeFile("results/minion.json", JSON.stringify(minion, null, 4));
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });
});