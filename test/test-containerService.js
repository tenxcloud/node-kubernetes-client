/*
* Licensed Materials - Property of tenxcloud.com
* (C) Copyright 2015 TenX Cloud. All Rights Reserved.
*/
/**
 * test kubernetes nodes
 * @author huangqg
 * @date 2015-03-18
 */

var should = require('should');
var assert = require('assert');
var Client = require('../../../kubernetes/api');
var fs = require('fs');

describe('Test k8s nodes API', function() {
  this.timeout(5000);
  var client;
  var nodes = [];
  beforeEach(function() {
    client = new Client(require('./config.json').k8s);
  });

  it('should return the nodes list', function(done) {
    client.replicationControllers.create(require('./json/wordpress-controller.json'), function (err, rc) {
      if (!err) {
        console.log('rc: ' + JSON.stringify(rc));
        client.services.create(require('./json/wordpress-service.json'), function(err, service) {
          if (!err) {
            console.log('service: ' + JSON.stringify(service));
            done();
          } else {
            console.log(err);
            assert(false);
          }
        });
      } else {
        console.log(err);
        assert(false);
      }
    });
  });
});