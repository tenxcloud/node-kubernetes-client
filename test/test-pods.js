/*
* Licensed Materials - Property of tenxcloud.com
* (C) Copyright 2015 TenX Cloud. All Rights Reserved.
*/
/**
 * test kubernetes pods
 * @author huangqg
 * @date 2051-03-18
 */

var should = require('should');
var assert = require('assert');
var Client = require('../index');

describe('Test k8s pods API', function() {
  this.timeout(5000);
  var client;
  var pods = [];
  beforeEach(function() {
    var configPath = require('path').resolve(__dirname, 'config.json');
    client = new Client({
        protocol: 'https',
        host: '119.254.101.149:6443',
        version: 'v1beta1',
        token: 'BazzyRsm0xytyym7NIsrbcvVrjR01JGC'
    });
  });

  it('should return the pods list', function(done) {
    client.pods.get(function (err, podsArr) {
      if (!err) {
        console.log('pods: ' + JSON.stringify(podsArr));
        assert(podsArr instanceof Array);
        pods = podsArr[0].items;
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });

  it('should return the pod with specified id', function(done) {
    var podId = pods[0].id;
    client.pods.get(podId, function (err, podsArr) {
      if (!err) {
        console.log('pods ' + JSON.stringify(podsArr));
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });
});