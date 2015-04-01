/**
 * test kubernetes minions
 * @author huangqg
 * @date 2015-03-18
 */

var should = require('should');
var assert = require('assert');
var Client = require('../../../kubernetes/api');
var fs = require('fs');

describe('Test k8s proxy API', function() {
  this.timeout(5000);
  var client;
  beforeEach(function() {
    client = new Client(require('./config.json').k8s);
  });

  it('should return the proxy minions list', function(done) {
    client.proxyMinions.get('10.80.197.181', function (err, minionsArr) {
      if (!err) {
        console.log('minions: ' + JSON.stringify(minionsArr));
        // output results
        fs.writeFile("results/proxyMinions.json", JSON.stringify(minionsArr, null, 4));
        assert(minionsArr instanceof Array);
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });

});