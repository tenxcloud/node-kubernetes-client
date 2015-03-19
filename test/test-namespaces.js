/*
* Licensed Materials - Property of tenxcloud.com
* (C) Copyright 2015 TenX Cloud. All Rights Reserved.
*/
/**
 * test kubernetes minions
 * @author huangqg
 * @date 2051-03-19
 */

var should = require('should');
var assert = require('assert');
var Client = require('../index');
var fs = require('fs');

describe('Test k8s namespaces API', function() {
  this.timeout(5000);
  var client;
  beforeEach(function() {
    client = new Client(require('./config.json').k8s);
  });

  it('should return the namespaces list', function(done) {
    client.namespaces.get(function (err, namespaces) {
      if (!err) {
        console.log('namespaces: ' + JSON.stringify(namespaces));
        assert(namespaces instanceof Array);
        // output results
        fs.writeFile("results/namespaces.json", JSON.stringify(namespaces, null, 4));
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });
});