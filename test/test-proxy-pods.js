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

describe('Test k8s proxy pods API', function() {
  this.timeout(5000);
  var client;
  beforeEach(function() {
    client = new Client(require('./config.json').k8s);
  });

  it('should return the proxy nodes list', function(done) {
    client.proxyPods.get('slave2', function (err, pods) {
      if (!err) {
        //console.log('pods: ' + JSON.stringify(pods));
        // output results
        fs.writeFile("results/proxyPods.json", JSON.stringify(pods, null, 4));
        assert(pods instanceof Array);
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });

});