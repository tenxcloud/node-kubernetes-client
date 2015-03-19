/*
* Licensed Materials - Property of tenxcloud.com
* (C) Copyright 2015 TenX Cloud. All Rights Reserved.
*/
/**
 * test kubernetes replicationControllers
 * @author huangqg
 * @date 2051-03-18
 */

var should = require('should');
var assert = require('assert');
var fs = require('fs');
var Client = require('../index');

describe('Test k8s replicationControllers API', function() {
  this.timeout(5000);
  var client;
  var replicationControllers = [];
  beforeEach(function() {
    client = new Client(require('./config.json').k8s);
  });

  it('should return the replicationControllers list', function(done) {
    client.replicationControllers.get(function (err, replicationControllersArr) {
      if (!err) {
        console.log('replicationControllers: ' + JSON.stringify(replicationControllersArr));
        // output results
        fs.writeFile("results/replicationControllers.json", JSON.stringify(replicationControllersArr, null, 4));
        assert(replicationControllersArr instanceof Array);
        replicationControllers = replicationControllersArr[0].items;
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });
});