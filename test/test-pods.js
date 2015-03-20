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
  var pods, podId;
  beforeEach(function() {
    client = new Client(require('./config.json').k8s);
  });
  /**
  it('should return the pods list', function(done) {
    client.pods.get(function (err, podsArr) {
      if (!err) {
        console.log('pods: ' + JSON.stringify(podsArr));
        pods = podsArr[0].items;
        // output results
        fs.writeFile("results/pods.json", JSON.stringify(podsArr, null, 4), function(err) {
          if(err) {
            console.log(err);
          }
          console.log("The file was saved!");
          done();
        });
      } else {
        console.log(err);
        assert(false);
      }
    });
  });

  it('should return the pod with specified id', function(done) {
    client.pods.get(pods[0].id, function (err, pod) {
      if (!err) {
        console.log('pods ' + JSON.stringify(pod));
        // output results
        fs.writeFile("results/pod.json", JSON.stringify(pod, null, 4), function(err) {
          if(err) {
            console.log(err);
          }
          console.log("The file was saved!");
          done();
        });
      } else {
        console.log(err);
        assert(false);
      }
    });
  });
  **/
  it('should create a pod', function(done) {
    client.pods.create(require('./json/pod.json'), function (err, pod) {
      if (!err) {
        console.log('pod ' + JSON.stringify(pod));
        podId = pod.id;
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });
  /**
  it('should update a pod', function(done) {
    client.pods.update(podId || 'ubuntu2', require('./json/pod.json'), function (err, pod) {
      if (!err) {
        console.log('pod ' + JSON.stringify(pod));
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });


  it('should delete the pod', function(done) {
    client.pods.delete(podId || 'ubuntu2', function (err, pod) {
      if (!err) {
        console.log('pod ' + JSON.stringify(pod));
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });
**/

});