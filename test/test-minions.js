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

describe('Test k8s minions API', function() {
  this.timeout(5000);
  var client;
  var minions = [];
  beforeEach(function() {
    var configPath = require('path').resolve(__dirname, 'config.json');
    client = new Client({
        protocol: 'https',
        host: '119.254.101.149:6443',
        version: 'v1beta1',
        token: 'BazzyRsm0xytyym7NIsrbcvVrjR01JGC'
    });
  });

  it('should return the minions list', function(done) {
    client.minions.get(function (err, minionsArr) {
      if (!err) {
        console.log('minions: ' + JSON.stringify(minionsArr));
        assert(minionsArr instanceof Array);
        minions = minionsArr[0].minions;
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });

  it('should return the minion with specified id', function(done) {
    var minionId = minions[1].id;
    client.minions.get(minionId, function (err, minionsArr) {
      if (!err) {
        console.log('minions ' + JSON.stringify(minionsArr));
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });
});