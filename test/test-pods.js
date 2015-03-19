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
var fs = require('fs');
var Client = require('../index');

describe('Test k8s pods API', function() {
  this.timeout(5000);
  var client;
  var pods = [];
  beforeEach(function() {
    client = new Client(require('./config.json').k8s);
  });

  it('should return the pods list', function(done) {
    client.pods.get(function (err, podsArr) {
      if (!err) {
        console.log('pods: ' + JSON.stringify(podsArr));
        // output results
        fs.writeFile("results/pods.json", JSON.stringify(podsArr, null, 4));
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
    client.pods.get(podId, function (err, pod) {
      if (!err) {
        console.log('pods ' + JSON.stringify(pod));
        // output results
        fs.writeFile("results/pod.json", JSON.stringify(pod, null, 4));
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });
});