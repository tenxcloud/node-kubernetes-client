/**
 * test kubernetes minions
 * @author huangqg
 * @date 2015-03-18
 */

//var should = require('should');
//var assert = require('assert');
//var Client = require('../');
//var fs = require('fs');
//
//describe('Test k8s watch pods API', function() {
//  this.timeout(20000);
//  var client;
//  beforeEach(function() {
//    client = new Client(require('./config.json').k8s);
//  });
//
//  it('should return the watch pods list', function(done) {
//    client.watchPods.get(function (err, pods) {
//      if (!err) {
//        console.log('pods: ' + JSON.stringify(pods));
//        // output results
//        fs.writeFile("results/watchPods.json", JSON.stringify(pods, null, 4));
//        assert(pods instanceof Array);
//        done();
//      } else {
//        console.log(err);
//        assert(false);
//      }
//    });
//  });
//});