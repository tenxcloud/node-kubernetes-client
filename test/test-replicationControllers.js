/**
 * test kubernetes replicationControllers
 * @author huangqg
 * @date 2015-03-18
 */

var should = require('should');
var assert = require('assert');
var fs = require('fs');
var Client = require('../../../kubernetes/api');

describe('Test k8s replicationControllers API', function() {
  this.timeout(50000);
  var client;
  var replicationControllers = [];
  beforeEach(function() {
    client = new Client(require('./config.json').k8s);
  });



  it('should create the replicationControllers', function(done) {
    client.replicationControllers.get("mywordpress-dlw", function (err, rc1) {
      if (!err) {
        rc1.desiredState.replicas = 1;
        client.replicationControllers.update('mywordpress-dlw', rc1, function (err, rc) {
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

/**
  it('should return the replicationControllers list', function(done) {
    client.replicationControllers.get("guestbook-controller", function (err, rc) {
      if (!err) {
        console.log('replicationControllers: ' + JSON.stringify(rc));
        // output results
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });


  it('should create the replicationControllers', function(done) {
    client.replicationControllers.create(require('./json/test.json'), function (err, rc) {
      if (!err) {
        console.log('rc: ' + JSON.stringify(rc));
        // output results
        fs.writeFile("results/replicationController.json", JSON.stringify(rc, null, 4), function(err) {
          if(err) {
            console.log(err);
          }
          done();
        });
      } else {
        console.log(err);
        assert(false);
      }
    });
  });

  it('should return the replicationControllers list', function(done) {
    client.replicationControllers.get("mywordpress-controller", function (err, rc) {
      if (!err) {
        console.log('replicationControllers: ' + JSON.stringify(rc));
        // output results
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });


  it('should return the replicationControllers list', function(done) {
    client.replicationControllers.get(function (err, replicationControllersArr) {
      if (!err) {
        console.log('replicationControllers: ' + JSON.stringify(replicationControllersArr));
        // output results
        fs.writeFile("results/replicationControllers.json", JSON.stringify(replicationControllersArr, null, 4), function(err) {
          if(err) {
            console.log(err);
          }
          assert(replicationControllersArr instanceof Array);
          replicationControllers = replicationControllersArr[0].items;
          done();
        });
      } else {
        console.log(err);
        assert(false);
      }
    });
  });

  it('should return the replicationControllers list', function(done) {
    client.replicationControllers.get('guestbook-controller', function (err, replicationControllersArr) {
      if (!err) {
        console.log('replicationControllers: ' + JSON.stringify(replicationControllersArr));
        // output results
        fs.writeFile("results/replicationController.json", JSON.stringify(replicationControllersArr, null, 4), function(err) {
          if(err) {
            console.log(err);
          }
          done();
        });
      } else {
        console.log(err);
        assert(false);
      }
    });
  });
  **/
});