/**
 * test kubernetes minions
 * @author huangqg
 * @date 2015-03-19
 */

var should = require('should');
var assert = require('assert');
var Client = require('../');
var fs = require('fs');
var testData = require('./json/service.json');

describe('Test k8s services API', function() {
  this.timeout(5000);
  var client;
  beforeEach(function() {
    client = new Client(require('./config.json').k8s);
  });

  it('should create a service', function(done) {
    client.services.create(testData, function (err, data) {
      assert(err == null, JSON.stringify(err));
      data.should.be.an.instanceOf(Object).and.have.properties(['kind', 'apiVersion', 'metadata']);
      data.metadata.name.should.be.equal(testData.metadata.name);
      done();
    });
  });
  
  it('should return the list of services', function(done) {
    client.services.get(function (err, data) {
      assert(err == null);
      data.should.be.an.instanceOf(Array)
      data[0].should.be.an.instanceOf(Object).and.have.properties(['kind', 'apiVersion', 'metadata', 'items']);
      data[0].items.should.be.an.instanceOf(Array)
      data[0].kind.should.be.equal('ServiceList');
      done();
    });
  });

  it('should return the service with specified id', function(done) {
    var nsId = testData.metadata.name;
    client.services.get(nsId, function (err, data) {
      assert(err == null);
      data.should.be.an.instanceOf(Object).and.have.properties(['kind', 'apiVersion', 'metadata']);
      data.metadata.name.should.be.equal(testData.metadata.name);
      done();
    });
  });
  
  it('should delete the service with specified id', function(done) {
    client.services.delete(testData.metadata.name, function (err, data) {
      assert(err == null);
      data.should.be.an.instanceOf(Object).and.have.properties(['kind', 'apiVersion', 'metadata', 'status']);
      data.status.should.be.equal('Success');
      done();
    });
  });
  
});