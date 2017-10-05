var should = require('should');
var assert = require('assert');
var Client = require('../');
var fs = require('fs');
var testData = require('./json/horizontalpodautoscaler.json');

describe('Test k8s horizontalpodautoscaler API', function() {
  this.timeout(5000);
  var client, options;
  options = JSON.parse(JSON.stringify(require('./config.json').k8s))
  options.version = "autoscaling/v1";
  client = new Client(options);
  client.object = client.createCollection("horizontalpodautoscalers", null, null, { apiPrefix : "apis", namespaced: true });

  it('should create an hpa', function(done) {
    client.object.create(testData, function (err, data) {
      assert(err == null, JSON.stringify(err));
      data.should.be.an.instanceOf(Object).and.have.properties(['kind', 'apiVersion', 'metadata']);
      data.metadata.name.should.be.equal(testData.metadata.name);
      done();
    });
  });
  
  it('should return the list of hpas', function(done) {
    client.object.get(function (err, data) {
      assert(err == null);
      data.should.be.an.instanceOf(Array)
      data[0].should.be.an.instanceOf(Object).and.have.properties(['kind', 'apiVersion', 'metadata', 'items']);
      data[0].items.should.be.an.instanceOf(Array)
      data[0].kind.should.be.equal('HorizontalPodAutoscalerList');
      done();
    });
  });

  it('should return the hpa with specified id', function(done) {
    var nsId = testData.metadata.name;
    client.object.get(nsId, function (err, data) {
      assert(err == null);
      data.should.be.an.instanceOf(Object).and.have.properties(['kind', 'apiVersion', 'metadata']);
      data.metadata.name.should.be.equal(testData.metadata.name);
      done();
    });
  });
  
  it('should delete the hpa with specified id', function(done) {
    client.object.delete(testData.metadata.name, function (err, data) {
      assert(err == null);
      data.should.be.an.instanceOf(Object).and.have.properties(['kind', 'apiVersion', 'metadata', 'status']);
      data.status.should.be.equal('Success');
      done();
    });
  });
  
});