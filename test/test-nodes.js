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
    client.nodes.get(function (err, nodesArr) {
      if (!err) {
        console.log('nodes: ' + JSON.stringify(nodesArr));
        // output results
        fs.writeFile("results/nodes.json", JSON.stringify(nodesArr, null, 4));
        assert(nodesArr instanceof Array);
        nodes = nodesArr[0].items;
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });

  it('should return the node with specified id', function(done) {
    var nodeId = nodes[0].id;
    client.nodes.get(nodeId, function (err, node) {
      if (!err) {
        console.log('node: ' + JSON.stringify(node));
        // output results
        fs.writeFile("results/node.json", JSON.stringify(node, null, 4));
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });
});