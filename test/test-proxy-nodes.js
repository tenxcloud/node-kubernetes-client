/*
* Licensed Materials - Property of tenxcloud.com
* (C) Copyright 2015 TenX Cloud. All Rights Reserved.
*/
/**
 * test kubernetes minions
 * @author huangqg
 * @date 2015-03-18
 */

var should = require('should');
var assert = require('assert');
var Client = require('../../../kubernetes/api');
var fs = require('fs');

describe('Test k8s proxy API', function() {
  this.timeout(5000);
  var client;
  beforeEach(function() {
    client = new Client(require('./config.json').k8s);
  });

  it('should return the proxy nodes list', function(done) {
    client.proxyNodes.get('slave2', function (err, nodesArr) {
      if (!err) {
        console.log('nodes: ' + JSON.stringify(nodesArr));
        // output results
        fs.writeFile("results/proxyNodes.json", JSON.stringify(nodesArr, null, 4));
        assert(nodesArr instanceof Array);
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });

});