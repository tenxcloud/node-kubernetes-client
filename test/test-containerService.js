/**
 * test kubernetes nodes
 * @author huangqg
 * @date 2015-03-18
 */

var should = require('should');
var assert = require('assert');
var Client = require('../');
var fs = require('fs');

describe('Test k8s nodes API', function() {
  this.timeout(5000);
  var client;
  var nodes = [];
  beforeEach(function() {
    client = new Client(require('./config.json').k8s);
  });

  it('should create rc and service', function(done) {
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
  
  it('should update the replicationControllers', function(done) {
    client.replicationControllers.get(require('./json/wordpress-controller.json').metadata.name, function (err, rc1) {
      if (!err) {
        rc1.spec.replicas = 1;
        client.replicationControllers.update(require('./json/wordpress-controller.json').metadata.name, rc1, function (err, rc) {
          if (!err) {
            console.log('rc: ' + JSON.stringify(rc));
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
  
  it('should delete rc and service', function(done) {
    client.replicationControllers.delete(require('./json/wordpress-controller.json').metadata.name, function (err, rc) {
      if (!err) {
        console.log('rc: ' + JSON.stringify(rc));
        client.services.delete(require('./json/wordpress-service.json').metadata.name, function(err, service) {
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