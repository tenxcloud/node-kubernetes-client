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

describe('Test k8s endpoints API', function() {
  this.timeout(5000);
  var client;
  beforeEach(function() {
    client = new Client(require('./config.json').k8s);
  });

  it('should return the endpoints list', function(done) {
    client.endpoints.get(function (err, endpoints) {
      if (!err) {
        console.log('endpoints: ' + JSON.stringify(endpoints));
        assert(endpoints instanceof Array);
        // output results
        fs.writeFile("results/endpoints.json", JSON.stringify(endpoints, null, 4));
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });
});