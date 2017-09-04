/**
 * test kubernetes minions
 * @author huangqg
 * @date 2015-03-19
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
  
  it('should return the list of nodes', function(done) {
    client.nodes.get(function (err, data) {
      assert(err == null);
      data.should.be.an.instanceOf(Array)
      data[0].should.be.an.instanceOf(Object).and.have.properties(['kind', 'apiVersion', 'metadata', 'items']);
      data[0].items.should.be.an.instanceOf(Array)
      data[0].kind.should.be.equal('NodeList');
      nodes = data[0].items;
      done();
    });
  });

  it('should return the nodes with specified id', function(done) {
    var nsId = nodes[0].metadata.name;
    client.nodes.get(nsId, function (err, data) {
      assert(err == null);
      data.should.be.an.instanceOf(Object).and.have.properties(['kind', 'apiVersion', 'metadata']);
      data.metadata.name.should.be.equal(nodes[0].metadata.name);
      done();
    });
  });
  
});